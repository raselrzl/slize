// Server component – async is allowed
import InvoiceStatusClient from "./InvoiceStatusClient";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function UpdateInvoicePage({ params }: Props) {
  const { id } = await params; // await the promise

  return <InvoiceStatusClient orderId={id} />;
}
