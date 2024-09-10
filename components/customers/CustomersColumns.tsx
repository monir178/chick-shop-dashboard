"use client";

import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TCustomerType>[] = [
  {
    accessorKey: "clerkId",
    header: "Clerk ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];
