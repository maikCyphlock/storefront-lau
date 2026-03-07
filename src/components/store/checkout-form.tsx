"use client";

import { FormEvent, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { getProductPrice } from "@/lib/product-utils";
import { useCartStore } from "@/store/cart-store";
import { DeliveryMethod, OrderType } from "@/lib/whatsapp";
import { formatUsd } from "@/lib/format";
import { checkoutOrderSchema } from "@/lib/orders";

type FormType = {
  fullName: string;
  phone: string;
  deliveryMethod: DeliveryMethod;
  orderType: OrderType;
  customBrief: string;
  notes: string;
};

type FormErrors = Partial<Record<keyof FormType | "items" | "form", string>>;

export function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.totalPrice());
  const clearCart = useCartStore((state) => state.clearCart);

  const [errors, setErrors] = useState<FormErrors>({});
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState<FormType>({
    fullName: "",
    phone: "",
    deliveryMethod: "Delivery Acarigua",
    orderType: "Catalogo",
    customBrief: "",
    notes: "",
  });

  const advance = useMemo(() => Math.ceil(total * 0.5), [total]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      ...form,
      items: items.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.image,
        size: item.size,
        quantity: item.quantity,
        unitPrice: getProductPrice(item.product, item.size),
      })),
    };
    const result = checkoutOrderSchema.safeParse(payload);

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const path = (issue.path[0] as keyof FormErrors | undefined) ?? "form";
        fieldErrors[path] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    startTransition(async () => {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data),
      });

      const data = (await response.json().catch(() => null)) as
        | {
            id?: string;
            total?: number;
            advance?: number;
            whatsappLink?: string;
            message?: string;
          }
        | null;

      if (!response.ok || !data?.id || !data.whatsappLink) {
        setErrors({
          form:
            data?.message ??
            "No se pudo registrar el pedido. Intenta de nuevo.",
        });
        return;
      }

      clearCart();
      router.push(
        `/pedido-en-espera?id=${data.id}&wa=${encodeURIComponent(data.whatsappLink)}&total=${data.total ?? total}&advance=${data.advance ?? advance}`,
      );
    });
  };

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 bg-zinc-900/45 p-5">
      <p className="mb-1 text-[10px] tracking-[0.2em] text-zinc-500 uppercase">Finalizar pedido</p>
      <h2 className="font-display mb-5 text-xl text-zinc-100 uppercase">Catalogo + Personalizado</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="fullName" className="mb-2 block text-[10px] tracking-[0.2em] text-zinc-300 uppercase">
            Nombre completo
          </label>
          <input
            id="fullName"
            value={form.fullName}
            onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
            className="w-full rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-pink-200/40"
          />
          {errors.fullName && <p className="mt-1 text-xs text-red-300">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-[10px] tracking-[0.2em] text-zinc-300 uppercase">
            Telefono
          </label>
          <input
            id="phone"
            value={form.phone}
            onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
            placeholder="+58 412 000 0000"
            className="w-full rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-pink-200/40"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-300">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="orderType" className="mb-2 block text-[10px] tracking-[0.2em] text-zinc-300 uppercase">
            Tipo de pedido
          </label>
          <select
            id="orderType"
            value={form.orderType}
            onChange={(event) => setForm((prev) => ({ ...prev, orderType: event.target.value as OrderType }))}
            className="w-full rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-pink-200/40"
          >
            <option value="Catalogo">Catalogo</option>
            <option value="Diseno personalizado">Diseno personalizado</option>
          </select>
          {errors.orderType && <p className="mt-1 text-xs text-red-300">{errors.orderType}</p>}
        </div>

        {form.orderType === "Diseno personalizado" && (
          <div>
            <label htmlFor="customBrief" className="mb-2 block text-[10px] tracking-[0.2em] text-zinc-300 uppercase">
              Brief creativo
            </label>
            <textarea
              id="customBrief"
              rows={3}
              value={form.customBrief}
              onChange={(event) => setForm((prev) => ({ ...prev, customBrief: event.target.value }))}
              placeholder="Ej: hoodie negro oversized con personaje Hello Kitty minimal"
              className="w-full resize-none rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-pink-200/40"
            />
            {errors.customBrief && <p className="mt-1 text-xs text-red-300">{errors.customBrief}</p>}
          </div>
        )}

        <div>
          <label htmlFor="deliveryMethod" className="mb-2 block text-[10px] tracking-[0.2em] text-zinc-300 uppercase">
            Metodo de entrega
          </label>
          <select
            id="deliveryMethod"
            value={form.deliveryMethod}
            onChange={(event) => setForm((prev) => ({ ...prev, deliveryMethod: event.target.value as DeliveryMethod }))}
            className="w-full rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-pink-200/40"
          >
            <option>Delivery Acarigua</option>
            <option>Retiro en punto</option>
            <option>Envio nacional</option>
          </select>
          {errors.deliveryMethod && <p className="mt-1 text-xs text-red-300">{errors.deliveryMethod}</p>}
        </div>

        <div>
          <label htmlFor="notes" className="mb-2 block text-[10px] tracking-[0.2em] text-zinc-300 uppercase">
            Nota (opcional)
          </label>
          <textarea
            id="notes"
            rows={3}
            value={form.notes}
            onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
            className="w-full resize-none rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-pink-200/40"
          />
          {errors.notes && <p className="mt-1 text-xs text-red-300">{errors.notes}</p>}
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-pink-200/35 bg-pink-200/10 p-3 text-xs text-pink-100">
        Pedido en espera hasta completar anticipo obligatorio del 50%. Total: {formatUsd(total)}. Anticipo: {formatUsd(advance)}.
      </div>
      {errors.items && <p className="mt-3 text-xs text-red-300">{errors.items}</p>}
      {errors.form && <p className="mt-3 text-xs text-red-300">{errors.form}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="mt-4 w-full rounded-xl border border-pink-200/50 bg-pink-200/15 px-4 py-3 text-[10px] tracking-[0.2em] text-pink-100 uppercase transition hover:bg-pink-200/25"
      >
        {isPending ? "Guardando pedido..." : "Confirmar y abrir WhatsApp"}
      </button>
    </form>
  );
}
