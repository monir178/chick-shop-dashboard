"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export const columns: ColumnDef<TOrderColumnType>[] = [
  {
    accessorKey: "_id",
    header: "Order",
    cell: ({ row }) => (
      <Link
        className={buttonVariants({
          variant: "link",
        })}
        href={`/orders/${row.original._id}`}>
        {row.original._id}
      </Link>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "totalAmount",
    header: "Total ($)",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
];
