"use client";

import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LeftSideBar = () => {
  const pathname = usePathname();

  return (
    <div className="h-screen sticky left-0 top-0 ps-10 pt-10 flex flex-col gap-16 bg-orange-100 shadow-xl max-lg:hidden w-full max-w-[20rem]">
      <Link href="/">
        <div className="flex gap-2  items-center">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          <h1 className="text-xl font-bold">Chick Shop</h1>
        </div>
      </Link>

      <div className="flex flex-col gap-12">
        {navLinks.map((link) => (
          <Link
            className={cn("flex gap-4 text-lg font-medium", {
              "text-red-600 font-bold": pathname === link.url,
            })}
            key={link.label}
            href={link.url}>
            {link.icon}
            <p>{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="flex gap-4 font-medium text-lg">
        <UserButton />
        <p>Edit Profile</p>
      </div>
    </div>
  );
};

export default LeftSideBar;
