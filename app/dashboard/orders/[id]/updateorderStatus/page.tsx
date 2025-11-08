import OrderStatusClient from "./OrderStatusClient";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function UpdateOrderPage({ params }: Props) {
  const { id } = await params;
  return <OrderStatusClient orderId={id} />;
}
