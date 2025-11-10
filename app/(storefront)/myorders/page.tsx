// Import statements
import { getUserOrders } from "@/app/actions";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Your Orders | Kronstil",
};

export default async function OrdersPage() {
  const { user, orders } = await getUserOrders();

  if (!user) {
    redirect("/"); // Redirect if not logged in
  }

  return (
    <section className="max-w-7xl mx-auto py-12 px-6">
      <h1 className="text-xl font-semibold mb-8 text-gray-900">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>You don’t have any orders yet.</p>
        </div>
      ) : (
        <ul className="space-y-6">
          {orders.map((order) => (
            <li key={order.id} className="border border-gray-300 p-4 bg-white rounded-xs">
              
              {/* Order Header */}
              <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                <p>
  <span className="font-semibold text-gray-500">Order ID:</span>{" "}
  {order.id ? order.id.slice(-6).toUpperCase() : "N/A"}
</p>

                <div className="flex gap-2 flex-wrap">
                  <span className="px-2 py-1 text-xs font-medium uppercase tracking-wide bg-yellow-200 text-yellow-900">
                    {order.status || "N/A"}
                  </span>
             {/*      <span className="px-2 py-1 text-xs font-medium uppercase tracking-wide bg-blue-100 text-blue-900">
                    {order.orderStatus || "N/A"}
                  </span> */}
                  <span className="px-2 py-1 text-xs font-medium uppercase tracking-wide bg-purple-100 text-purple-900">
                    {order.deliveryStatus ? order.deliveryStatus.replace("_", " ") : "N/A"}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium uppercase tracking-wide bg-gray-200 text-gray-900">
                    {order.invoiceStatus || "N/A"}
                  </span>
                </div>
              </div>

              {/* User Info */}
              <div className="mb-4">
                <p>
                  <span className="font-semibold">Ship to:</span>{" "}
                  {order.User?.firstName || "N/A"} {order.User?.lastName || "N/A"} (
                  {order.User?.email || "N/A"})
                </p>
              </div>

              {/* Order Items */}
              <div className="mb-4">
                <p className="font-semibold mb-2">Items:</p>
                {order.items && order.items.length > 0 ? (
                  order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 border-b border-gray-200 pb-2 mb-2">
                      
                      {/* Product Image */}
                      {item.Product?.images?.[0] ? (
                        <img
                          src={item.Product.images[0]}
                          alt={item.Product.name || "N/A"}
                          className="w-16 h-16 object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                          N/A
                        </div>
                      )}

                      {/* Product Details */}
                      <div className="flex-1 space-y-1">
                        <p><span className="font-semibold">Name:</span> {item.Product?.name || "N/A"}</p>
                        <p><span className="font-semibold">Quantity:</span> {item.quantity || "N/A"}</p>
                        <p><span className="font-semibold">Price:</span> {item.Product?.price} SEK</p>
                       </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-sm">No items in this order.</p>
                )}
              </div>

              {/* Order Summary */}
              <div className="space-y-1">
                <p><span className="font-semibold">Total:</span> {(order.amount ? order.amount / 100 : 0).toFixed(2)} SEK</p>
                <p>
                  <span className="font-semibold">Placed on:</span>{" "}
                  {order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-SE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }) : "N/A"}
                </p>
              </div>

            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
