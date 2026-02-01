import { auth } from "@clerk/nextjs/server";
import { CardSignInButton } from "../form/Buttons";
import { fetchFavoriteId } from "@/utils/action";
import FavoriteToggleForm from "./FavoriteToggleForm";

const FavoriteToggleButton = async ({
  productId,
  className,
}: {
  productId: string;
  className?: string;
}) => {
  const { userId } = auth();
  if (!userId) return <CardSignInButton />;
  const favoriteId = await fetchFavoriteId({ productId });
  return (
    <FavoriteToggleForm
      favoriteId={favoriteId}
      productId={productId}
      className={className}
    />
  );
};

export default FavoriteToggleButton;
