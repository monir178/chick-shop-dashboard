import { DataTable } from "@/components/customUi/DataTable";
import { columns } from "@/components/orderItems/OrderItemsColumns";

const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/${params.orderId}`
  );

  const { orderDetails, customer } = await res.json();

  // console.log({ orderDetails }, { customer });

  const { street, city, state, postalCode, country } =
    orderDetails.shippingAddress;

  return (
    <div className="flex flex-col p-10 gap-5">
      <p className="text-base-bold text-gray-900">
        orderDetails ID:{" "}
        <span className="text-base-medium text-gray-700">
          {orderDetails._id}
        </span>
      </p>
      <p className="text-base-bold text-gray-900">
        Customer name:{" "}
        <span className="text-base-medium text-gray-700">{customer.name}</span>
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
      <DataTable
        columns={columns}
        data={orderDetails.products}
        searchKey="product"
      />
    </div>
  );
};

export default OrderDetails;
