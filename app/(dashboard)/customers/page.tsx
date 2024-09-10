import { columns } from "@/components/customers/CustomersColumns";
import { DataTable } from "@/components/customUi/DataTable";
import { Separator } from "@/components/ui/separator";
import Customer from "@/lib/models/Customer";
import { connectToDB } from "@/lib/mongoDB";

const Customers = async () => {
  await connectToDB();

  const customers = await Customer.find().sort({ createdAt: "desc" });

  return (
    <div className="px-10 py-5">
      <p className="text-heading2-bold text-gray-700">Customers</p>
      <Separator className="my-5 bg-gray-300" />
      <DataTable columns={columns} data={customers} searchKey="name" />
    </div>
  );
};

export default Customers;
