
import { getUserOrders } from "@/app/actions";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Your Orders | Kronstil",
};

export default async function OrdersPage() {
  const { user, orders } = await getUserOrders();

  if (!user) {
    redirect("/"); // Not logged in, go home or login
  }

  return (
    <section className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-semibold mb-6">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>You don’t have any orders yet.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="border rounded-md p-4 bg-white shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium">
                  <span className="text-gray-500">Order ID:</span>{" "}
                  {order.id.slice(0, 8)}...
                </p>
                <span
                  className={`px-2 py-1 rounded text-sm ${ 
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-gray-700">
                Total Amount:{" "}
                <span className="font-semibold">
                  {(order.amount / 100).toFixed(2)} SEK
                </span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
