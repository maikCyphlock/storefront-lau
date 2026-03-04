"use client";

import { FormEvent, useMemo, useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import {
  buildOrderMessage,
  buildWhatsAppLink,
  DeliveryMethod,
  OrderType,
} from "@/lib/whatsapp";
import { formatUsd } from "@/lib/format";

const checkoutSchema = z
  .object({
    fullName: z.string().min(3, "Ingresa nombre y apellido"),
    phone: z
      .string()
      .min(10, "Ingresa un telefono valido")
      .regex(/^[0-9+\-\s()]+$/, "Solo caracteres de telefono"),
    deliveryMethod: z.enum(["Delivery Acarigua", "Retiro en punto", "Envio nacional"]),
    orderType: z.enum(["Catalogo", "Diseno personalizado"]),
    customBrief: z.string().max(240, "Maximo 240 caracteres").optional(),
    notes: z.string().max(200, "Maximo 200 caracteres").optional(),
  })
  .superRefine((data, ctx) => {
    if (data.orderType === "Diseno personalizado" && !data.customBrief?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["customBrief"],
        message: "Describe tu idea para el diseno personalizado",
      });
    }
  });

type FormType = {
  fullName: string;
  phone: string;
  deliveryMethod: DeliveryMethod;
  orderType: OrderType;
  customBrief: string;
  notes: string;
};

type FormErrors = Partial<Record<keyof z.infer<typeof checkoutSchema>, string>>;

export function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.totalPrice());

  const [errors, setErrors] = useState<FormErrors>({});
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

    if (items.length === 0 && form.orderType === "Catalogo") {
      setErrors({ fullName: "Agrega productos al carrito antes de continuar" });
      return;
    }

    const result = checkoutSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const path = issue.path[0] as keyof FormErrors;
        fieldErrors[path] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    const message = buildOrderMessage(result.data, items);
    const wa = buildWhatsAppLink(message);

    router.push(`/pedido-en-espera?wa=${encodeURIComponent(wa)}&total=${total}&advance=${advance}`);
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

      <button
        type="submit"
        className="mt-4 w-full rounded-xl border border-pink-200/50 bg-pink-200/15 px-4 py-3 text-[10px] tracking-[0.2em] text-pink-100 uppercase transition hover:bg-pink-200/25"
      >
        Confirmar y abrir WhatsApp
      </button>
    </form>
  );
}
