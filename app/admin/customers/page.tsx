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
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { fetchLoyalCustomers } from "@/utils/action";

// // Define the Customer type
// interface Customer {
//   id: string;
//   name: string;
//   phone: string;
//   email: string;
//   points: number;
//   type: "Regular" | "VIP" | "Wholesale" | "New";
// }

// // Dummy customers data with proper types
// const customers: Customer[] = [
//   {
//     id: "cust-001",
//     name: "Alice Johnson",
//     phone: "555-111-2222",
//     email: "alice@example.com",
//     points: 750,
//     type: "VIP",
//   },
//   {
//     id: "cust-002",
//     name: "Bob Williams",
//     phone: "555-222-3333",
//     email: "bob@example.com",
//     points: 230,
//     type: "Regular",
//   },
//   {
//     id: "cust-003",
//     name: "Carol Davis",
//     phone: "555-333-4444",
//     email: "carol@example.com",
//     points: 1250,
//     type: "VIP",
//   },
//   {
//     id: "cust-004",
//     name: "Dave Wilson",
//     phone: "555-444-5555",
//     email: "dave@example.com",
//     points: 0,
//     type: "New",
//   },
//   {
//     id: "cust-005",
//     name: "Evergreen Supply Co.",
//     phone: "555-555-6666",
//     email: "orders@evergreen.com",
//     points: 3200,
//     type: "Wholesale",
//   },
// ];

const CustomersPage = async () => {
  const customers = await fetchLoyalCustomers();
  return (
    <Card
      className="bg-[#072611]/60 dark:bg-slate-900/80 backdrop-blur-sm
                border border-emerald-700/30 dark:border-blue-300/20 
                shadow-[0_4px_12px_rgba(34,139,34,0.15)] dark:shadow-[0_4px_12px_rgba(30,144,255,0.2)] text-white"
    >
      <CardContent>
        <Table>
          <TableCaption className="text-gray-300">
            Total customers: {customers.length}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-300">Customer</TableHead>
              <TableHead className="text-gray-300">Email</TableHead>
              <TableHead className="text-gray-300">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => {
              const { id, name, email, points } = customer;

              return (
                <TableRow key={id}>
                  <TableCell>{name}</TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-x-1">
                      {points}
                      <Star
                        size={16}
                        className={
                          points > 0
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
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

export default CustomersPage;
