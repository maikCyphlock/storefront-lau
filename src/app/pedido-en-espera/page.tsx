import { PendingOrder } from "@/components/store/pending-order";

type PendingParams = {
  id?: string;
  wa?: string;
  total?: string;
  advance?: string;
};

type PendingOrderPageProps = {
  searchParams: Promise<PendingParams>;
};

export default async function PendingOrderPage({ searchParams }: PendingOrderPageProps) {
  const params = await searchParams;
  const orderId = params.id;
  const waLink = params.wa
    ? decodeURIComponent(params.wa)
    : "https://wa.me/584120000000";
  const total = Number(params.total ?? 0);
  const advance = Number(params.advance ?? 0);

  return <PendingOrder orderId={orderId} waLink={waLink} total={total} advance={advance} />;
}
