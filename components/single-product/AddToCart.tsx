"use client";
import { useState } from "react";
import SelectProductAmount from "./SelectProductAmount";
import { Mode } from "./SelectProductAmount";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/Buttons";
import { addToCartAction } from "@/utils/action";
import { useAuth } from "@clerk/nextjs";
import { ProductSignInButton } from "../form/Buttons";

export const AddToCart = ({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) => {
  console.log("productId from AddToCart : ", productId);
  const [amount, setAmount] = useState(1);
  const { userId } = useAuth();
  const isButtonDisabled = quantity === 0 || amount > quantity;
  const buttonText = isButtonDisabled
    ? quantity === 0
      ? "Out of Stock"
      : "Insufficient quantity"
    : "Add to cart";
  return (
    <div className="mt-4">
      <SelectProductAmount
        mode={Mode.SingleProduct}
        amount={amount}
        setAmount={setAmount}
      />
      {userId ? (
        <FormContainer action={addToCartAction}>
          <input type="hidden" name="productId" value={productId} />
          <input type="hidden" name="amount" value={amount} />
          <SubmitButton
            text={buttonText}
            size="default"
            className="mt-8"
            disabled={isButtonDisabled}
          />
        </FormContainer>
      ) : (
        <ProductSignInButton />
      )}
    </div>
  );
};
