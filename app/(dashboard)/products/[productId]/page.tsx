"use client";

import CustomLoader from "@/components/customUi/CustomLoader";
import ProductForm from "@/components/products/ProductForm";
import { useEffect, useState } from "react";

const ProductDetails = ({ params }: { params: { productId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState<TProductType | null>(
    null
  );

  const getProductDetails = async () => {
    try {
      const res = await fetch(`/api/products/${params.productId}`, {
        method: "GET",
      });

      const data: any = await res.json();
      setProductDetails(data);
      setLoading(false);
    } catch (error) {
      console.log("productId_GET", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  return loading ? (
    <CustomLoader />
  ) : (
    <ProductForm initialData={productDetails} />
  );
};

export default ProductDetails;
