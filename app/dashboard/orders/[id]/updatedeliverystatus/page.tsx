import UpdateDeliveryStatusClient from "./UpdateDeliveryStatusClient";

// Server component – async is allowed
type Props = {
  params: Promise<{ id: string }>;
};

export default async function UpdateInvoicePage({ params }: Props) {
  const { id } = await params; // await the promise

  return <UpdateDeliveryStatusClient orderId={id} />;
}
