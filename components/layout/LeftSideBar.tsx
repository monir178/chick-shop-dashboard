import { navLinks } from "@/lib/constants";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const LeftSideBar = () => {
  return (
    <div className="h-screen sticky left-0 top-0 ps-10 pt-10 flex flex-col gap-16 bg-orange-200 shadow-xl max-lg:hidden w-full max-w-sm">
      <div className="flex gap-2  items-center">
        <Image src="/logo.png" alt="logo" width={40} height={40} />
        <h1 className="text-xl font-bold">Chick Shop</h1>
      </div>

      <div className="flex flex-col gap-12">
        {navLinks.map((link) => (
          <Link
            className="flex gap-4 text-lg font-medium"
            key={link.label}
            href={link.url}>
            {" "}
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
