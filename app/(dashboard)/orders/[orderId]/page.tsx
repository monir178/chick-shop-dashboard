import { DataTable } from "@/components/customUi/DataTable";
import { columns } from "@/components/orderItems/OrderItemsColumns";

const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/${params.orderId}`
  );

  const { orderDetails, customer } = await res.json();

  console.log({ orderDetails });

  const { street, city, state, postalCode, country } =
    orderDetails.shippingAddress;

  return (
    <div className=" p-4 lg:p-10">
      <div className="flex flex-col p-8 gap-5 bg-orange-100 rounded-lg">
        <p className="text-base-bold  text-gray-900">
          Order Details ID:{" "}
          <span className="text-base-medium text-gray-700">
            {orderDetails._id}
          </span>
        </p>
        <p className="text-base-bold text-gray-900">
          Customer name:{" "}
          <span className="text-base-medium text-gray-700">
            {customer.name}
          </span>
        </p>
        <p className="text-base-bold text-gray-900">
          Shipping Address:{" "}
          <span className="text-base-medium text-gray-700">
            {street}, {city}, {state}, {postalCode}, {country}
          </span>
        </p>
        <p className="text-base-bold text-gray-900">
          Total Paid:{" "}
          <span className="text-base-medium text-gray-700">
            ${orderDetails.totalAmount}
          </span>
        </p>
        <p className="text-base-bold text-gray-900">
          Shipping rate ID:{" "}
          <span className="text-base-medium text-gray-700">
            {orderDetails.shippingRate}
          </span>
        </p>
      </div>
      <DataTable
        columns={columns}
        data={orderDetails.products.map((item: any) => ({
          ...item,
          productTitle: item.product.title,
        }))}
        searchKey="productTitle"
      />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default OrderDetails;
