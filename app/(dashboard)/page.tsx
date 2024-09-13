import DashboardCard from "@/components/customUi/DashboardCard";
import SalesChart from "@/components/customUi/SalesChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import {
  getSalesPerMonth,
  getTotalCustomers,
  getTotalSales,
} from "@/lib/actions/actions";

export default async function Home() {
  const totalRevenue = await getTotalSales().then((data) => data.totalRevenue);
  const totalOrders = await getTotalSales().then((data) => data.totalOrders);
  const totalCustomers = await getTotalCustomers();
  const graphData = await getSalesPerMonth();

  return (
    <div className="px-4 lg:px-12 py-8 bg-gray-50 min-h-screen">
      <p className="text-heading2-bold  text-gray-600">Dashboard</p>
      <Separator className="my-8 bg-gray-300" />

      <div className="grid grid-cols-2 md:grid-cols-3  gap-2 md:gap-6 lg:gap-10">
        <DashboardCard
          title="Total Revenue"
          amount={`$ ${parseFloat(totalRevenue.toFixed(2))}`}
          icon="CircleDollarSign"
        />
        <DashboardCard
          title="Total Orders"
          icon="ShoppingBag"
          amount={totalOrders}
        />
        <DashboardCard
          title="Total Customers"
          icon="Users"
          amount={totalCustomers}
        />
      </div>
      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Sales Chart ($)</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesChart data={graphData} />
        </CardContent>
      </Card>
    </div>
  );
}

export const dynamic = "force-dynamic";
