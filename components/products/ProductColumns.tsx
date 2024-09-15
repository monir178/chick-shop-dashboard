"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../customUi/Delete";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";

export const columns = (isAdmin: boolean): ColumnDef<TProductType>[] => [
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
    cell: ({ row }) => (
      <div className="flex gap-2">
        {!isAdmin ? (
          <Button
            onClick={() => toast.error("You don't have permission to Delete")}
            className="bg-red-500 hover:bg-red-400">
            <Trash />
          </Button>
        ) : (
          <Delete item="product" id={row.original._id} />
        )}
      </div>
    ),
  },
];
