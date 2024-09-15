"use client";

import CustomLoader from "@/components/customUi/CustomLoader";
import { DataTable } from "@/components/customUi/DataTable";
import { columns } from "@/components/products/ProductColumns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProductsPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<TProductType[]>([]);

  const getProducts = async () => {
    try {
      const res = await fetch("api/products", {
        method: "GET",
      });

      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log("products_GET =>", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return loading ? (
    <CustomLoader />
  ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold text-gray-600">Products</p>
        <Button onClick={() => router.push("/products/new")}>
          <Plus className="size-6 mr-2" />
          Create Product
        </Button>
      </div>
      <Separator className="bg-gray-500 my-4" />
      <DataTable searchKey="title" columns={columns(isAdmin)} data={products} />
    </div>
  );
};

export default ProductsPage;
