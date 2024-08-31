import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { navLinks } from "@/lib/constants";
import { UserButton } from "@clerk/nextjs";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const TopBar = () => {
  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-orange-200 shadow-xl lg:hidden">
      <div className="flex gap-2  items-center">
        <Image src="/logo.png" alt="logo" width={40} height={40} />
        <h1 className="text-xl font-bold">Chick Shop</h1>
      </div>

      <div className="flex gap-8 max-md:hidden">
        {navLinks.map((link) => (
          <Link
            className="flex gap-4 text-lg font-medium"
            key={link.label}
            href={link.url}>
            <p>{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="flex gap-4 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MenuIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {navLinks.map((link) => (
              <DropdownMenuItem asChild key={link.label}>
                <Link href={link.url}>{link.label}</Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>

        <UserButton />
      </div>
    </div>
  );
};

export default TopBar;
