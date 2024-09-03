"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../customUi/Delete";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export const columns: ColumnDef<TProductType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        className={buttonVariants({
          variant: "link",
        })}
        href={`/products/${row.original._id}`}>
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "collections",
    header: "Collection",
    cell: ({ row }) =>
      row.original.collections.map((collection) => collection.title).join(", "),
  },
  {
    accessorKey: "price",
    header: "Price($)",
  },
  {
    accessorKey: "expense",
    header: "Expense ($)",
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete item="product" id={row.original._id} />,
  },
];
