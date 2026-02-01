import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import { redirect } from "next/navigation";

import { type NextRequest } from "next/server";
import db from "@/utils/db";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get("session_id") as string;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    // console.log(session);

    const orderId = session.metadata?.orderId;
    const cartId = session.metadata?.cartId;
    if (session.status === "complete") {
      // First, get the cart with all its items before deleting it
      const cart = await db.cart.findUnique({
        where: { id: cartId },
        include: {
          cartItems: {
            include: {
              product: true,
            },
          },
        },
      });

      // Get the order to access the customer clerkId and orderTotal
      const order = await db.order.findUnique({
        where: { id: orderId },
      });

      if (!order) {
        throw new Error("Order not found");
      }

      // Calculate loyalty points (orderTotal / 10)
      const pointsToAdd = Math.floor(order.orderTotal / 10);

      // Get the clerkId from the order
      const clerkId = order.clerkId;

      // Check if user exists
      const existingUser = await db.user.findUnique({
        where: { clerkId },
      });

      if (existingUser) {
        // Update existing user's points
        await db.user.update({
          where: { clerkId },
          data: {
            points: { increment: pointsToAdd },
          },
        });
      } else {
        // Create new user with initial points
        await db.user.create({
          data: {
            clerkId,
            points: pointsToAdd,
          },
        });
      }

      if (cart) {
        // Update product quantities
        for (const cartItem of cart.cartItems) {
          await db.product.update({
            where: { id: cartItem.productId },
            data: {
              // Reduce the product quantity by the purchased amount
              // Make sure it doesn't go below 0
              quantity: {
                decrement: cartItem.amount,
              },
            },
          });
        }
      }

      // Update order status
      await db.order.update({
        where: {
          id: orderId,
        },
        data: {
          isPaid: true,
        },
      });

      // Delete the cart
      await db.cart.delete({
        where: {
          id: cartId,
        },
      });
    }
  } catch (err) {
    console.log(err);
    return Response.json(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
  redirect("/orders");
};
