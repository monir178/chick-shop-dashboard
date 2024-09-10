"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TopBar = () => {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-2 md:py-1 bg-orange-100 shadow-lg lg:hidden">
      <Link href="/">
        <div className="flex md:flex-col  items-center">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          <h1 className="text-xl tracking-tighter text-red-600 font-bold">
            Chick Shop
          </h1>
        </div>
      </Link>

      {/* Medium Devices Topbar */}
      <div className="flex gap-8 max-md:hidden">
        {navLinks.map((link) => (
          <Link
            className={cn("flex gap-4 text-lg font-medium", {
              "text-red-600 font-bold": pathname === link.url,
            })}
            key={link.label}
            href={link.url}>
            <p>{link.label}</p>
          </Link>
        ))}
      </div>

      {/* Mobile Topbar */}
      <div className="flex gap-4 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MenuIcon className="md:hidden" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {navLinks.map((link) => (
              <DropdownMenuItem asChild key={link.label}>
                <Link
                  className={cn("flex gap-4 text-lg font-medium", {
                    "text-red-600 font-bold": pathname === link.url,
                  })}
                  href={link.url}>
                  {link.label}
                </Link>
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
