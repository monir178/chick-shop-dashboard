"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export const columns: ColumnDef<TOrderItemType>[] = [
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => (
      <Link
        className={buttonVariants({
          variant: "link",
        })}
        href={`/products/${row.original.product._id}`}>
        {row.original.product.title}
      </Link>
    ),
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
];
