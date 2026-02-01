import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { IconButton } from "@/components/form/Buttons";
import { Card, CardContent } from "@/components/ui/card";

// Define the Supplier type
interface Supplier {
  id: string;
  name: string;
  coordinator: string;
  email: string;
  phone: string;
  address: string;
}

// Dummy suppliers data with proper types
const suppliers: Supplier[] = [
  {
    id: "sup-001",
    name: "Tech Solutions Inc.",
    coordinator: "John Smith",
    email: "john@techsolutions.com",
    phone: "555-123-4567",
    address: "123 Tech Blvd, San Francisco, CA 94103",
  },
  {
    id: "sup-002",
    name: "Global Electronics",
    coordinator: "Sarah Johnson",
    email: "sarah@globalelectronics.com",
    phone: "555-987-6543",
    address: "456 Electronic Ave, Austin, TX 78701",
  },
  {
    id: "sup-003",
    name: "Office Supplies Co.",
    coordinator: "Michael Brown",
    email: "michael@officesupplies.com",
    phone: "555-456-7890",
    address: "789 Office Park, Chicago, IL 60601",
  },
  {
    id: "sup-004",
    name: "Premium Hardware Ltd.",
    coordinator: "Jessica Lee",
    email: "jessica@premiumhardware.com",
    phone: "555-321-6547",
    address: "321 Hardware St, Seattle, WA 98101",
  },
];

const SuppliersPage = () => {
  return (
    <Card
      className="text-white bg-[#072611]/60 dark:bg-slate-900/80 backdrop-blur-sm
                border border-emerald-700/30 dark:border-blue-300/20 
                shadow-[0_4px_12px_rgba(34,139,34,0.15)] dark:shadow-[0_4px_12px_rgba(30,144,255,0.2)]"
    >
      <CardContent>
        <Table>
          <TableCaption className="text-gray-300">
            Total suppliers: {suppliers.length}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-300">Name</TableHead>
              <TableHead className="text-gray-300">Coordinator</TableHead>
              <TableHead className="text-gray-300">Email</TableHead>
              <TableHead className="text-gray-300">Phone</TableHead>
              <TableHead className="text-gray-300">Address</TableHead>
              <TableHead className="text-gray-300">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.map((supplier) => {
              const { id, name, coordinator, email, phone, address } = supplier;

              return (
                <TableRow key={id}>
                  <TableCell>{name}</TableCell>
                  <TableCell>{coordinator}</TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>{phone}</TableCell>
                  <TableCell>{address}</TableCell>
                  <TableCell className="flex items-center gap-x-2">
                    <div>
                      <IconButton actionType="edit"></IconButton>
                    </div>
                    <div>
                      <IconButton actionType="delete"></IconButton>
                    </div>
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

// function DeleteProduct() {
//   const deleteProduct = async () => {
//     toast("Product deleted successfully.");
//     return Promise.resolve({ message: "Product deleted successfully." });
//   };
//   return (
//     <FormContainer action={deleteProduct}>
//       <IconButton actionType="delete" />
//     </FormContainer>
//   );
// }

// function DeleteProduct({ productId }: { productId: string }) {
//   const deleteProduct = deleteProductAction.bind(null, { productId });
//   return (
//     <FormContainer action={deleteProduct}>
//       <IconButton actionType="delete" />
//     </FormContainer>
//   );
// }

export default SuppliersPage;
