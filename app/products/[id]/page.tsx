// Alternative approach
import React from "react";
import { BreadCrumbs } from "@/components/single-product/BreadCrumbs";
import { fetchSingleProduct, findExistingReview } from "@/utils/action";
import Image from "next/image";
import { formatCurrency } from "@/utils/format";
import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
import { AddToCart } from "@/components/single-product/AddToCart";
import { ProductRating } from "@/components/single-product/ProductRating";
import ShareButton from "@/components/single-product/ShareButton";
import ProductReviews from "@/components/reviews/ProductReviews";
import SubmitReview from "@/components/reviews/SubmitReview";
import { auth } from "@clerk/nextjs/server";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const product = await fetchSingleProduct(id);
  const { name, image, company, description, price, quantity } = product;
  const dollarsAmount = formatCurrency(price);
  const { userId } = auth();
  const reviewDoesNotExist =
    userId && !(await findExistingReview(userId, product.id));

  return (
    <section>
      <BreadCrumbs name={name} />
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* IMAGE FIRST COL */}
        <div className="relative h-96 lg:h-full">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
            priority
            className="w-full rounded-md object-cover rounded-md"
          />
        </div>
        {/* PRODUCT INFO SECOND COL */}
        <div className="">
          <div className="flex gap-x-8 items-center dark:text-white/90">
            <h1 className="capitalize text-3xl font-bold">{name}</h1>
            <div className="flex items-center gap-x-2">
              <FavoriteToggleButton
                productId={id}
                className="bg-[#072611]/60 dark:bg-slate-900/80 backdrop-blur-sm
                border border-emerald-700/30 dark:border-blue-300/20 
                shadow-[0_4px_12px_rgba(34,139,34,0.15)] dark:shadow-[0_4px_12px_rgba(30,144,255,0.2)] dark:text-white/80"
              />
              <ShareButton name={product.name} productId={id} />
            </div>
          </div>
          <ProductRating productId={id} />
          <h4 className="text-xl mt-2">{company}</h4>
          <div className="flex gap-x-4">
            <p
              className="mt-3 text-md inline-block p-2 rounded-md bg-[#072611]/60 dark:bg-slate-900/80 backdrop-blur-sm
                border border-emerald-700/30 dark:border-blue-300/20 
                shadow-[0_4px_12px_rgba(34,139,34,0.15)] dark:shadow-[0_4px_12px_rgba(30,144,255,0.2)]"
            >
              {dollarsAmount}
            </p>
            <p
              className={`mt-3 text-md inline-block p-2 rounded-md bg-[#072611]/60 dark:bg-slate-900/80 backdrop-blur-sm
                border border-emerald-700/30 dark:border-blue-300/20 
                shadow-[0_4px_12px_rgba(34,139,34,0.15)] dark:shadow-[0_4px_12px_rgba(30,144,255,0.2)] ${
                  quantity > 0 ? "text-[#5DFFB3]" : "text-red-400/90"
                }`}
            >
              {quantity > 0 ? `Hurry! ${quantity} left` : "Out of Stock"}
            </p>
          </div>
          <p className="mt-6 leading-8">{description}</p>
          <AddToCart productId={id} quantity={quantity} />
        </div>
      </div>
      <ProductReviews productId={id} />
      {reviewDoesNotExist && <SubmitReview productId={id} />}
    </section>
  );
}
