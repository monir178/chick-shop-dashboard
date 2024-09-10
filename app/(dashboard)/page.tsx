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
    <div className="px-4 lg:px-10 py-10">
      <p>Home</p>
    </div>
  );
}
