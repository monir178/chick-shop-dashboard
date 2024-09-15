"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../customUi/Delete";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { toast } from "sonner";
import { Trash } from "lucide-react";

export const getColumns = (isAdmin: boolean): ColumnDef<TCollectionType>[] => [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        className={buttonVariants({
          variant: "link",
        })}
        href={`/collections/${row.original._id}`}>
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => <p>{row.original.products.length}</p>,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        {!isAdmin ? (
          <Button
            className="bg-red-500 hover:bg-red-400"
            onClick={() => toast.error("You don't have permission to Delete")}>
            <Trash />
          </Button>
        ) : (
          <Delete item="collection" id={row.original._id} />
        )}
      </div>
    ),
  },
];
