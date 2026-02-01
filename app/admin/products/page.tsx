import EmptyList from "@/components/global/EmptyList";
import Link from "next/link";

import { formatCurrency } from "@/utils/format";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteProductAction, fetchAdminProducts } from "@/utils/action";
import { IconButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import { Card, CardContent } from "@/components/ui/card";

const ItemsPage = async () => {
  const items = await fetchAdminProducts();
  if (items.length === 0) return <EmptyList heading="No items found." />;
  return (
    <Card
      className="bg-[#072611]/60 dark:bg-slate-900/80 backdrop-blur-sm
                border border-emerald-700/30 dark:border-blue-300/20 
                shadow-[0_4px_12px_rgba(34,139,34,0.15)] dark:shadow-[0_4px_12px_rgba(30,144,255,0.2)] text-white"
    >
      <CardContent>
        <Table>
          <TableCaption className="capitalize text-gray-300">
            total products : {items.length}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-300">Product Name</TableHead>
              <TableHead className="text-gray-300">Company</TableHead>
              <TableHead className="text-gray-300">Unit Price</TableHead>
              <TableHead className="text-gray-300">Stock</TableHead>
              <TableHead className="text-gray-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => {
              const { id: productId, name, company, price, quantity } = item;
              return (
                <TableRow key={productId}>
                  <TableCell>
                    <Link
                      href={`/products/${productId}`}
                      className="underline tracking-wide capitalize"
                    >
                      {name}
                    </Link>
                  </TableCell>
                  <TableCell>{company}</TableCell>
                  <TableCell>{formatCurrency(price)}</TableCell>
                  <TableCell>{quantity}</TableCell>
                  <TableCell className="flex items-center gap-x-2">
                    <Link href={`/admin/products/${productId}/edit`}>
                      <IconButton actionType="edit"></IconButton>
                    </Link>
                    <DeleteProduct productId={productId} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

function DeleteProduct({ productId }: { productId: string }) {
  const deleteProduct = deleteProductAction.bind(null, { productId });
  return (
    <FormContainer action={deleteProduct}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
}

export default ItemsPage;
