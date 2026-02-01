import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import SectionTitle from "@/components/global/SectionTitle";
import { fetchUserOrders } from "@/utils/action";
import { formatCurrency, formatDate } from "@/utils/format";
import { Card, CardContent } from "@/components/ui/card";

const OrderPage = async () => {
  const orders = await fetchUserOrders();

  return (
    <>
      <SectionTitle text="Your Orders" />
      <Card
        className="bg-[#072611]/60 dark:bg-slate-900/80 backdrop-blur-sm
                border border-emerald-700/30 dark:border-blue-300/20 
                shadow-[0_4px_12px_rgba(34,139,34,0.15)] dark:shadow-[0_4px_12px_rgba(30,144,255,0.2)] mt-12"
      >
        <CardContent>
          <Table>
            <TableCaption className="text-gray-300">
              Total orders : {orders.length}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-300">Products</TableHead>
                <TableHead className="text-gray-300">Order Total</TableHead>
                <TableHead className="text-gray-300">Tax</TableHead>
                <TableHead className="text-gray-300">Shipping</TableHead>
                <TableHead className="text-gray-300">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => {
                const { id, products, orderTotal, tax, shipping, createdAt } =
                  order;

                return (
                  <TableRow key={id}>
                    <TableCell>{products}</TableCell>
                    <TableCell>{formatCurrency(orderTotal)}</TableCell>
                    <TableCell>{formatCurrency(tax)}</TableCell>
                    <TableCell>{formatCurrency(shipping)}</TableCell>
                    <TableCell>{formatDate(createdAt)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default OrderPage;
