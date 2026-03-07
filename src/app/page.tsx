import { Storefront } from "@/components/store/storefront";
import { getStoreProducts } from "@/lib/products";

export default async function Home() {
  const products = await getStoreProducts();

  return (
    <>
      <Storefront products={products} />
    </>
  );
}
