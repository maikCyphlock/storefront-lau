import { count, desc, eq } from "drizzle-orm";
import { SignOutButton } from "@/components/admin/sign-out-button";
import { updateOrderStatus } from "@/app/admin/actions";
import { requireAdminSession } from "@/lib/auth-session";
import { formatUsd } from "@/lib/format";
import { orderStatuses } from "@/lib/orders";
import { db } from "@/lib/db";
import { orders, users } from "@/lib/db/schema";

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("es-VE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

function formatStatus(status: string) {
  return status.replaceAll("-", " ");
}

export default async function AdminPage() {
  const session = await requireAdminSession();

  const [recentOrders, recentUsers, orderCount, pendingCount, userCount] =
    await Promise.all([
      db.query.orders.findMany({
        with: {
          items: true,
        },
        orderBy: (table, { desc: orderDesc }) => [orderDesc(table.createdAt)],
        limit: 24,
      }),
      db
        .select({
          id: users.id,
          name: users.name,
          email: users.email,
          role: users.role,
          createdAt: users.createdAt,
        })
        .from(users)
        .orderBy(desc(users.createdAt))
        .limit(10),
      db.select({ value: count() }).from(orders),
      db
        .select({ value: count() })
        .from(orders)
        .where(eq(orders.status, "pending")),
      db.select({ value: count() }).from(users),
    ]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 px-4 py-5 text-zinc-100 sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(248,200,211,0.16),transparent_28%),radial-gradient(circle_at_85%_12%,rgba(255,255,255,0.06),transparent_20%),linear-gradient(180deg,#101010_0%,#090909_100%)]" />
      <section className="relative mx-auto max-w-7xl space-y-5">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/30">
          <div className="grid gap-6 p-6 lg:grid-cols-[1.3fr_0.7fr] lg:p-8">
            <div>
              <p className="text-[10px] tracking-[0.35em] text-zinc-500 uppercase">
                Operations Console
              </p>
              <h1 className="font-bebas mt-5 text-6xl leading-[0.88] tracking-[0.03em] text-zinc-50 uppercase sm:text-7xl">
                Admin
                <br />
                Control Room
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-300">
                Panel interno para leer pedidos entrantes, verificar anticipos y
                mover el estado de produccion con una vista mas editorial y
                menos dashboard generico.
              </p>
            </div>

            <div className="flex flex-col justify-between gap-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
              <div>
                <p className="text-[10px] tracking-[0.26em] text-zinc-500 uppercase">
                  Sesion activa
                </p>
                <p className="mt-3 text-lg text-zinc-50">{session.user.name}</p>
                <p className="mt-1 text-sm text-zinc-400">{session.user.email}</p>
              </div>
              <SignOutButton />
            </div>
          </div>

          <div className="grid gap-px border-t border-white/10 bg-white/10 md:grid-cols-3">
            <article className="bg-black/35 p-5">
              <p className="text-[10px] tracking-[0.24em] text-zinc-500 uppercase">
                Ordenes totales
              </p>
              <p className="mt-3 font-bebas text-6xl leading-none tracking-[0.04em] text-zinc-50">
                {orderCount[0]?.value ?? 0}
              </p>
            </article>
            <article className="bg-pink-200/10 p-5">
              <p className="text-[10px] tracking-[0.24em] text-pink-100/70 uppercase">
                En espera
              </p>
              <p className="mt-3 font-bebas text-6xl leading-none tracking-[0.04em] text-pink-50">
                {pendingCount[0]?.value ?? 0}
              </p>
            </article>
            <article className="bg-black/35 p-5">
              <p className="text-[10px] tracking-[0.24em] text-zinc-500 uppercase">
                Usuarios
              </p>
              <p className="mt-3 font-bebas text-6xl leading-none tracking-[0.04em] text-zinc-50">
                {userCount[0]?.value ?? 0}
              </p>
            </article>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.8fr_0.95fr]">
          <section className="rounded-[2rem] border border-white/10 bg-black/28 p-5 backdrop-blur">
            <div className="flex items-end justify-between gap-4 border-b border-white/8 pb-4">
              <div>
                <p className="text-[10px] tracking-[0.28em] text-zinc-500 uppercase">
                  Flujo
                </p>
                <h2 className="font-bebas mt-3 text-4xl tracking-[0.04em] text-zinc-50 uppercase">
                  Pedidos recientes
                </h2>
              </div>
              <p className="max-w-xs text-right text-xs leading-6 text-zinc-400">
                Vista cronologica con update rapido de estado.
              </p>
            </div>

            <div className="mt-5 space-y-4">
              {recentOrders.map((order) => (
                <article
                  key={order.id}
                  className="rounded-[1.75rem] border border-white/10 bg-zinc-950/85 p-4"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-pink-200/20 bg-pink-200/10 px-3 py-1 text-[10px] tracking-[0.2em] text-pink-50 uppercase">
                          {formatStatus(order.status)}
                        </span>
                        <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] tracking-[0.2em] text-zinc-400 uppercase">
                          {order.id.slice(0, 8)}
                        </span>
                      </div>

                      <h3 className="mt-4 text-lg text-zinc-50">
                        {order.customerName}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-zinc-400">
                        {order.customerPhone} · {order.deliveryMethod} ·{" "}
                        {order.orderType}
                      </p>
                      <p className="mt-1 text-xs tracking-[0.14em] text-zinc-500 uppercase">
                        {formatDate(order.createdAt)}
                      </p>

                      {order.customBrief ? (
                        <p className="mt-4 text-sm leading-6 text-zinc-300">
                          Brief: {order.customBrief}
                        </p>
                      ) : null}

                      {order.notes ? (
                        <p className="mt-2 text-sm leading-6 text-zinc-300">
                          Notas: {order.notes}
                        </p>
                      ) : null}
                    </div>

                    <div className="w-full max-w-sm rounded-[1.5rem] border border-white/10 bg-white/4 p-4">
                      <form action={updateOrderStatus} className="space-y-3">
                        <input type="hidden" name="orderId" value={order.id} />
                        <label className="block text-[10px] tracking-[0.22em] text-zinc-500 uppercase">
                          Cambiar estado
                        </label>
                        <select
                          name="status"
                          defaultValue={order.status}
                          className="w-full rounded-[1rem] border border-white/10 bg-black/50 px-4 py-3 text-sm text-zinc-100 outline-none"
                        >
                          {orderStatuses.map((status) => (
                            <option key={status} value={status}>
                              {formatStatus(status)}
                            </option>
                          ))}
                        </select>
                        <button
                          type="submit"
                          className="w-full rounded-[1rem] border border-pink-200/30 bg-pink-200/12 px-4 py-3 text-[10px] tracking-[0.25em] text-pink-50 uppercase transition hover:bg-pink-200/18"
                        >
                          Actualizar
                        </button>
                      </form>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 lg:grid-cols-[1.4fr_0.6fr]">
                    <div className="rounded-[1.35rem] border border-white/8 bg-white/3 p-4">
                      <p className="text-[10px] tracking-[0.22em] text-zinc-500 uppercase">
                        Items
                      </p>
                      <div className="mt-3 space-y-2">
                        {order.items.length > 0 ? (
                          order.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between gap-4 rounded-[1rem] bg-black/30 px-3 py-3 text-sm text-zinc-300"
                            >
                              <span>
                                {item.productName} · {item.size} · x{item.quantity}
                              </span>
                              <span className="text-zinc-100">
                                {formatUsd(item.lineTotal)}
                              </span>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-zinc-500">
                            Pedido sin items de catalogo.
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="rounded-[1.35rem] border border-pink-200/18 bg-pink-200/8 p-4">
                      <p className="text-[10px] tracking-[0.22em] text-pink-100/70 uppercase">
                        Cobro
                      </p>
                      <p className="mt-4 text-sm text-pink-50">
                        Total: {formatUsd(order.total)}
                      </p>
                      <p className="mt-2 text-sm text-pink-50">
                        Anticipo: {formatUsd(order.advance)}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="rounded-[2rem] border border-white/10 bg-black/28 p-5 backdrop-blur">
            <p className="text-[10px] tracking-[0.28em] text-zinc-500 uppercase">
              Equipo
            </p>
            <h2 className="font-bebas mt-3 text-4xl tracking-[0.04em] text-zinc-50 uppercase">
              Usuarios recientes
            </h2>

            <div className="mt-5 space-y-3">
              {recentUsers.map((user) => (
                <article
                  key={user.id}
                  className="rounded-[1.5rem] border border-white/10 bg-zinc-950/90 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-base text-zinc-100">{user.name}</p>
                      <p className="mt-1 text-sm text-zinc-400">{user.email}</p>
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] tracking-[0.2em] text-zinc-400 uppercase">
                      {user.role ?? "user"}
                    </span>
                  </div>
                  <p className="mt-4 text-xs tracking-[0.16em] text-zinc-500 uppercase">
                    {formatDate(user.createdAt)}
                  </p>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
