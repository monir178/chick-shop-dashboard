"use client";

import CustomLoader from "@/components/customUi/CustomLoader";
import { DataTable } from "@/components/customUi/DataTable";
import { columns } from "@/components/orders/OrderColumns";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

const OrdersPage = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.log("[orders_GET]", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return loading ? (
    <CustomLoader />
  ) : (
    <div className="px-10 py-5">
      <p className="text-heading2-bold">Orders</p>
      <Separator className="bg-gray-300 my-5" />
      <DataTable columns={columns} data={orders} searchKey="_id" />
    </div>
  );
};

export default OrdersPage;
