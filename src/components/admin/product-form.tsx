import { Product } from "@/types/store";

type ProductFormProps = {
  action: (formData: FormData) => Promise<void>;
  product?: Product;
  submitLabel: string;
};

function formatPriceBySize(priceBySize?: Record<string, number>) {
  if (!priceBySize) return "";

  return Object.entries(priceBySize)
    .map(([size, price]) => `${size}:${price}`)
    .join(", ");
}

export function ProductForm({
  action,
  product,
  submitLabel,
}: ProductFormProps) {
  return (
    <form action={action} className="space-y-4 rounded-[1.5rem] border border-white/10 bg-zinc-950/80 p-4">
      {product ? <input type="hidden" name="productId" value={product.id} /> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-[10px] tracking-[0.2em] text-zinc-400 uppercase">
            Nombre
          </label>
          <input
            name="name"
            required
            defaultValue={product?.name ?? ""}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-[10px] tracking-[0.2em] text-zinc-400 uppercase">
            Subtitulo
          </label>
          <input
            name="subtitle"
            required
            defaultValue={product?.subtitle ?? ""}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-[10px] tracking-[0.2em] text-zinc-400 uppercase">
          Descripcion
        </label>
        <textarea
          name="description"
          rows={3}
          defaultValue={product?.description ?? ""}
          className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-[10px] tracking-[0.2em] text-zinc-400 uppercase">
            Precio base
          </label>
          <input
            name="basePrice"
            type="number"
            min="0"
            step="0.01"
            required
            defaultValue={product?.price ?? ""}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-[10px] tracking-[0.2em] text-zinc-400 uppercase">
            Orden
          </label>
          <input
            name="sortOrder"
            type="number"
            min="0"
            defaultValue={product?.sortOrder ?? 0}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-[10px] tracking-[0.2em] text-zinc-400 uppercase">
            Tallas
          </label>
          <input
            name="sizes"
            required
            defaultValue={product?.sizes.join(", ") ?? "S, M, L, XL"}
            placeholder="S, M, L, XL"
            className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-[10px] tracking-[0.2em] text-zinc-400 uppercase">
            Precio por talla
          </label>
          <input
            name="priceBySize"
            defaultValue={formatPriceBySize(product?.priceBySize)}
            placeholder="S:18, M:18, XL:20"
            className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-[10px] tracking-[0.2em] text-zinc-400 uppercase">
          Media
        </label>
        <input
          name="media"
          type="file"
          accept="image/*,video/*"
          multiple
          className="w-full rounded-xl border border-dashed border-white/15 bg-black/30 px-3 py-3 text-sm text-zinc-300"
        />
        <p className="mt-2 text-xs text-zinc-500">
          Se sube a Telegram y se guarda la URL publica. Primer archivo = portada.
        </p>
      </div>

      {product?.media.length ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {product.media.map((media) => (
            <div key={media.id} className="overflow-hidden rounded-xl border border-white/10 bg-black/40">
              {media.type === "video" ? (
                <video src={media.url} className="h-32 w-full object-cover" controls />
              ) : (
                <img src={media.url} alt={product.name} className="h-32 w-full object-cover" />
              )}
            </div>
          ))}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-4 text-sm text-zinc-300">
        <label className="flex items-center gap-2">
          <input
            name="isActive"
            type="checkbox"
            defaultChecked={product ? product.isActive : true}
          />
          Activo en tienda
        </label>

        {product ? (
          <label className="flex items-center gap-2">
            <input name="replaceMedia" type="checkbox" />
            Reemplazar media actual
          </label>
        ) : null}
      </div>

      <button
        type="submit"
        className="w-full rounded-xl border border-pink-200/30 bg-pink-200/12 px-4 py-3 text-[10px] tracking-[0.25em] text-pink-50 uppercase transition hover:bg-pink-200/18"
      >
        {submitLabel}
      </button>
    </form>
  );
}
