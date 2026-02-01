"use server";
import db from "@/utils/db";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  imageSchema,
  productSchema,
  reviewSchema,
  validateWithZodSchema,
} from "./schemas";
import { deleteImage, uploadImage } from "./supabase";
import { revalidatePath } from "next/cache";
import { Cart } from "@prisma/client";
import prisma from "@/utils/db";

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    return redirect("/");
  }
  return user;
};

const getAdminUser = async () => {
  const user = await getAuthUser();
  if (user.id !== process.env.ADMIN_USER_ID) redirect("/");
  return user;
};

const renderError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : "There was an error...",
  };
};

export const fetchFeaturedProducts = async () => {
  const products = await db.product.findMany({
    where: {
      featured: true,
    },
  });
  return products;
};

export const fetchAllProducts = async ({ search = "" }: { search: string }) => {
  return db.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const fetchSingleProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) redirect("/products");
  return product;
};

export const createProductAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const file = formData.get("image") as File;
    const validatedFields = validateWithZodSchema(productSchema, rawData);
    const validatedFile = validateWithZodSchema(imageSchema, { image: file });

    // Extract quantity from form data and convert to number
    const quantity = validatedFields.quantity;

    // Check if product with same name and company already exists
    const existingProduct = await db.product.findFirst({
      where: {
        name: validatedFields.name,
        company: validatedFields.company,
        clerkId: user.id,
      },
    });

    if (existingProduct) {
      // Product exists, update quantity
      await db.product.update({
        where: {
          id: existingProduct.id,
        },
        data: {
          quantity: existingProduct.quantity + quantity,
        },
      });

      return { message: "Product quantity updated successfully" };
    } else {
      // Product doesn't exist, create new product
      const fullPath = await uploadImage(validatedFile.image);

      await db.product.create({
        data: {
          ...validatedFields,
          image: fullPath,
          clerkId: user.id,
          quantity: quantity,
        },
      });

      return { message: "Product created successfully" };
    }
  } catch (error) {
    return renderError(error);
  }

  redirect("/admin/products");
};
export const fetchAdminProducts = async () => {
  await getAdminUser();
  const products = await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
};

export const deleteProductAction = async (prevState: { productId: string }) => {
  const { productId } = prevState;
  await getAdminUser();

  try {
    const product = await db.product.delete({
      where: {
        id: productId,
      },
    });
    await deleteImage(product.image);
    revalidatePath("/admin/products");
    return { message: "product removed" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchAdminProductDetails = async (productId: string) => {
  await getAdminUser();
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) redirect("/admin/products");
  return product;
};

export const updateProductAction = async (
  prevState: any,
  formData: FormData
) => {
  await getAdminUser();
  try {
    const productId = formData.get("id") as string;
    const rawData = Object.fromEntries(formData);

    const validatedFields = validateWithZodSchema(productSchema, rawData);

    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        ...validatedFields,
      },
    });
    revalidatePath(`/admin/products/${productId}/edit`);
    return { message: "Product updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const updateProductImageAction = async (
  prevState: any,
  formData: FormData
) => {
  await getAuthUser();
  try {
    const image = formData.get("image") as File;
    const productId = formData.get("id") as string;
    const oldImageUrl = formData.get("url") as string;

    const validatedFile = validateWithZodSchema(imageSchema, { image });
    const fullPath = await uploadImage(validatedFile.image);
    await deleteImage(oldImageUrl);
    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        image: fullPath,
      },
    });
    revalidatePath(`/admin/products/${productId}/edit`);
    return { message: "Product Image updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchFavoriteId = async ({ productId }: { productId: string }) => {
  const user = await getAuthUser();
  const favorite = await db.favorite.findFirst({
    where: {
      productId,
      clerkId: user.id,
    },
    select: {
      id: true,
    },
  });
  return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
  productId: string;
  favoriteId: string | null;
  pathname: string;
}) => {
  const user = await getAuthUser();
  const { productId, favoriteId, pathname } = prevState;
  try {
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await db.favorite.create({
        data: {
          productId,
          clerkId: user.id,
        },
      });
    }
    revalidatePath(pathname);
    return { message: favoriteId ? "Removed from Faves" : "Added to Faves" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchUserFavorites = async () => {
  const user = await getAuthUser();
  const favorites = await db.favorite.findMany({
    where: {
      clerkId: user.id,
    },
    include: {
      product: true,
    },
  });
  return favorites;
};

export const createReviewAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const user = await getAuthUser();
    const rawData = Object.fromEntries(formData);

    const validatedFields = validateWithZodSchema(reviewSchema, rawData);

    await db.review.create({
      data: {
        ...validatedFields,
        clerkId: user.id,
      },
    });
    revalidatePath(`/products/${validatedFields.productId}`);
    return { message: "Review submitted successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchProductReviews = async (productId: string) => {
  const reviews = await db.review.findMany({
    where: {
      productId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return reviews;
};

export const fetchProductReviewsByUser = async () => {
  const user = await getAuthUser();
  const reviews = await db.review.findMany({
    where: {
      clerkId: user.id,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      product: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  });
  return reviews;
};

export const deleteReviewAction = async (prevState: { reviewId: string }) => {
  const { reviewId } = prevState;
  const user = await getAuthUser();

  try {
    await db.review.delete({
      where: {
        id: reviewId,
        clerkId: user.id,
      },
    });

    revalidatePath("/reviews");
    return { message: "Review deleted successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const findExistingReview = async (userId: string, productId: string) => {
  return db.review.findFirst({
    where: {
      clerkId: userId,
      productId,
    },
  });
};

export const fetchProductRating = async (productId: string) => {
  const result = await db.review.groupBy({
    by: ["productId"],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: {
      productId,
    },
  });

  // empty array if no reviews
  return {
    rating: result[0]?._avg.rating?.toFixed(1) ?? 0,
    count: result[0]?._count.rating ?? 0,
  };
};

{
  /* CART */
}

export const fetchCartItems = async () => {
  const { userId } = auth();

  const cart = await db.cart.findFirst({
    where: {
      clerkId: userId ?? "",
    },
    select: {
      numItemsInCart: true,
    },
  });
  return cart?.numItemsInCart || 0;
};

const fetchProduct = async (productId: string) => {
  console.log("productId : ", productId.length);
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

const includeProductClause = {
  cartItems: {
    include: {
      product: true,
    },
  },
};

export const fetchOrCreateCart = async ({
  userId,
  errorOnFailure = false,
}: {
  userId: string;
  errorOnFailure?: boolean;
}) => {
  let cart = await db.cart.findFirst({
    where: {
      clerkId: userId,
    },
    include: includeProductClause,
  });

  if (!cart && errorOnFailure) {
    throw new Error("Cart not found");
  }

  if (!cart) {
    cart = await db.cart.create({
      data: {
        clerkId: userId,
      },
      include: includeProductClause,
    });
  }

  return cart;
};

const updateOrCreateCartItem = async ({
  productId,
  cartId,
  amount,
}: {
  productId: string;
  cartId: string;
  amount: number;
}) => {
  let cartItem = await db.cartItem.findFirst({
    where: {
      productId,
      cartId,
    },
  });

  if (cartItem) {
    cartItem = await db.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        amount: cartItem.amount + amount,
      },
    });
  } else {
    cartItem = await db.cartItem.create({
      data: { amount, productId, cartId },
    });
  }
};

export const updateCart = async (cart: Cart) => {
  const cartItems = await db.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
    include: {
      product: true, // Include the related product
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  let numItemsInCart = 0;
  let cartTotal = 0;

  for (const item of cartItems) {
    numItemsInCart += item.amount;
    cartTotal += item.amount * item.product.price;
  }
  const tax = cart.taxRate * cartTotal;
  const shipping = cartTotal ? cart.shipping : 0;
  const orderTotal = cartTotal + tax + shipping;

  const currentCart = await db.cart.update({
    where: {
      id: cart.id,
    },

    data: {
      numItemsInCart,
      cartTotal,
      tax,
      orderTotal,
    },
    include: includeProductClause,
  });
  return { currentCart, cartItems };
};

export const addToCartAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser();
  try {
    const productId = formData.get("productId") as string;
    const amount = Number(formData.get("amount"));
    await fetchProduct(productId);
    const cart = await fetchOrCreateCart({ userId: user.id });
    await updateOrCreateCartItem({ productId, cartId: cart.id, amount });
    await updateCart(cart);
  } catch (error) {
    return renderError(error);
  }
  redirect("/cart");
};

export const removeCartItemAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getAuthUser();
  try {
    const cartItemId = formData.get("id") as string;
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });

    // Check if the cart item exists before attempting to delete
    const cartItem = await db.cartItem.findUnique({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
    });

    if (!cartItem) {
      // Item doesn't exist, but we can still consider this a "success"
      // since the end result is what the user wanted (item not in cart)
      revalidatePath("/cart");
      return { message: "Item not found in cart" };
    }

    await db.cartItem.delete({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
    });

    await updateCart(cart);
    revalidatePath("/cart");
    return { message: "Item removed from cart" };
  } catch (error) {
    return renderError(error);
  }
};

export const updateCartItemAction = async ({
  amount,
  cartItemId,
}: {
  amount: number;
  cartItemId: string;
}) => {
  const user = await getAuthUser();

  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });
    await db.cartItem.update({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
      data: {
        amount,
      },
    });
    await updateCart(cart);
    revalidatePath("/cart");
    return { message: "cart updated" };
  } catch (error) {
    return renderError(error);
  }
};

{
  /* ORDER */
}

export const createOrderAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser();
  let orderId: null | string = null;
  let cartId: null | string = null;
  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });
    cartId = cart.id;
    await db.order.deleteMany({
      where: {
        clerkId: user.id,
        isPaid: false,
      },
    });

    const order = await db.order.create({
      data: {
        clerkId: user.id,
        products: cart.numItemsInCart,
        orderTotal: cart.orderTotal,
        tax: cart.tax,
        shipping: cart.shipping,
        email: user.emailAddresses[0].emailAddress,
      },
    });
    orderId = order.id;
  } catch (error) {
    return renderError(error);
  }
  redirect(`/checkout?orderId=${orderId}&cartId=${cartId}`);
};

export const fetchUserOrders = async () => {
  const user = await getAuthUser();
  const orders = await db.order.findMany({
    where: {
      clerkId: user.id,
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return orders;
};

export const fetchAdminOrders = async () => {
  const user = await getAdminUser();

  const orders = await db.order.findMany({
    where: {
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return orders;
};

export const getTodayProductsSold = async () => {
  try {
    // Get current date (start of day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get end of today
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Aggregate products for paid orders created today
    const result = await prisma.order.aggregate({
      _sum: {
        products: true,
      },
      where: {
        isPaid: true,
        createdAt: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    // Return the sum, defaulting to 0 if null
    return result._sum.products || 0;
  } catch (error) {
    console.error("Error aggregating today's products:", error);
    return 0;
  } finally {
    await prisma.$disconnect();
  }
};

export async function getTodayOrderTotal() {
  try {
    // Get current date (start of day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get end of today
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Aggregate orderTotal for paid orders created today
    const result = await prisma.order.aggregate({
      _sum: {
        orderTotal: true,
      },
      where: {
        isPaid: true,
        createdAt: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    // Return the sum, defaulting to 0 if null
    return result._sum.orderTotal || 0;
  } catch (error) {
    console.error("Error aggregating today's order total:", error);
    return 0;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getTotalOrderRevenue() {
  try {
    // Aggregate orderTotal for all paid orders
    const result = await prisma.order.aggregate({
      _sum: {
        orderTotal: true,
      },
      where: {
        isPaid: true,
      },
    });

    // Return the sum, defaulting to 0 if null
    return result._sum.orderTotal || 0;
  } catch (error) {
    console.error("Error aggregating total order revenue:", error);
    return 0;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getRevenueGrowth(period = "month") {
  try {
    const today = new Date();
    let currentPeriodStart, previousPeriodStart, previousPeriodEnd;

    // Set up date ranges based on period
    if (period === "month") {
      // Current month
      currentPeriodStart = new Date(today.getFullYear(), today.getMonth(), 1);

      // Previous month
      previousPeriodStart = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        1
      );
      previousPeriodEnd = new Date(today.getFullYear(), today.getMonth(), 0);
    } else if (period === "week") {
      // Current week (starting from Sunday)
      const dayOfWeek = today.getDay();
      currentPeriodStart = new Date(today);
      currentPeriodStart.setDate(today.getDate() - dayOfWeek);
      currentPeriodStart.setHours(0, 0, 0, 0);

      // Previous week
      previousPeriodStart = new Date(currentPeriodStart);
      previousPeriodStart.setDate(currentPeriodStart.getDate() - 7);
      previousPeriodEnd = new Date(currentPeriodStart);
      previousPeriodEnd.setDate(previousPeriodEnd.getDate() - 1);
      previousPeriodEnd.setHours(23, 59, 59, 999);
    } else if (period === "day") {
      // Today
      currentPeriodStart = new Date(today);
      currentPeriodStart.setHours(0, 0, 0, 0);

      // Yesterday
      previousPeriodStart = new Date(today);
      previousPeriodStart.setDate(today.getDate() - 1);
      previousPeriodStart.setHours(0, 0, 0, 0);
      previousPeriodEnd = new Date(today);
      previousPeriodEnd.setDate(today.getDate() - 1);
      previousPeriodEnd.setHours(23, 59, 59, 999);
    }

    // Get current period revenue
    const currentRevenue = await prisma.order.aggregate({
      _sum: {
        orderTotal: true,
      },
      where: {
        isPaid: true,
        createdAt: {
          gte: currentPeriodStart,
        },
      },
    });

    // Get previous period revenue
    const previousRevenue = await prisma.order.aggregate({
      _sum: {
        orderTotal: true,
      },
      where: {
        isPaid: true,
        createdAt: {
          gte: previousPeriodStart,
          lte:
            previousPeriodEnd ||
            (currentPeriodStart
              ? new Date(currentPeriodStart.getTime() - 1)
              : new Date()),
        },
      },
    });

    // Calculate growth rate
    const currentValue = currentRevenue._sum.orderTotal || 0;
    const previousValue = previousRevenue._sum.orderTotal || 0;

    let growthRate = 0;
    if (previousValue > 0) {
      growthRate = ((currentValue - previousValue) / previousValue) * 100;
    } else if (currentValue > 0) {
      // If previous period had zero revenue but current has some,
      // we can consider it infinite growth, but let's cap it
      growthRate = 100;
    }

    return Number(growthRate.toFixed(1));
  } catch (error) {
    console.error(`Error calculating ${period} revenue growth:`, error);
    return 0;
  } finally {
    await prisma.$disconnect();
  }
}

export const getTotalProductsSold = async () => {
  try {
    // Aggregate products for all paid orders
    const result = await prisma.order.aggregate({
      _sum: {
        products: true,
      },
      where: {
        isPaid: true,
      },
    });

    // Return the sum, defaulting to 0 if null
    return result._sum.products || 0;
  } catch (error) {
    console.error("Error aggregating total products:", error);
    return 0;
  } finally {
    await prisma.$disconnect();
  }
};

export const getTotalLoyalCustomer = async () => {
  try {
    // Count all entries in the User schema
    const totalUsers = await prisma.user.count();

    // Return the total count
    return totalUsers;
  } catch (error) {
    console.error("Error counting total users:", error);
    return 0;
  } finally {
    await prisma.$disconnect();
  }
};

export const fetchLoyalCustomers = async () => {
  // Get all users from the database
  const users = await prisma.user.findMany({
    orderBy: {
      points: "desc", // Order by points in descending order
    },
  });

  // For each user, fetch their Clerk data to get name and email
  const customers = [];

  for (const user of users) {
    try {
      // Fetch user data from Clerk using the clerkId
      const clerkUser = await clerkClient.users.getUser(user.clerkId);

      customers.push({
        id: user.id.toString(),
        name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
        email: clerkUser.emailAddresses[0]?.emailAddress || "No email",
        points: user.points,
      });
    } catch (error) {
      console.error(
        `Error fetching Clerk user for clerkId ${user.clerkId}:`,
        error
      );
      // Add user with placeholder data if Clerk fetch fails
      customers.push({
        id: user.id.toString(),
        name: "Unknown User",
        email: "N/A",
        points: user.points,
      });
    }
  }

  return customers;
};
