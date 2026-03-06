"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";

type AuthFormProps = {
  mode: "login" | "register";
  allowRegistration?: boolean;
};

export function AuthForm({ mode, allowRegistration = true }: AuthFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submitLabel =
    mode === "login" ? "Entrar al admin" : "Crear acceso admin";
  const endpoint =
    mode === "login" ? "/api/auth/sign-in/email" : "/api/auth/sign-up/email";

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (mode === "register" && !allowRegistration) {
      setError("El registro publico ya fue deshabilitado.");
      return;
    }

    startTransition(async () => {
      const payload =
        mode === "login"
          ? {
              email: form.email,
              password: form.password,
            }
          : {
              name: form.name,
              email: form.email,
              password: form.password,
            };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (!response.ok) {
        setError(
          data?.message ??
            "No fue posible completar la autenticacion.",
        );
        return;
      }

      router.push("/admin");
      router.refresh();
    });
  };

  return (
    <section className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-black/50 shadow-[0_30px_120px_rgba(0,0,0,0.4)] backdrop-blur xl:grid-cols-[1.1fr_0.9fr]">
      <div className="relative hidden min-h-[620px] overflow-hidden border-r border-white/10 xl:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(248,200,211,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.12),transparent_25%),linear-gradient(180deg,rgba(15,15,15,0.86),rgba(8,8,8,0.96))]" />
        <div className="relative flex h-full flex-col justify-between p-8">
          <div>
            <p className="text-[10px] tracking-[0.35em] text-zinc-500 uppercase">
              OverSizeByLau Admin
            </p>
            <h1 className="font-bebas mt-6 text-[5.5rem] leading-[0.88] tracking-[0.02em] text-zinc-50 uppercase">
              Control
              <br />
              Room
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-7 text-zinc-300">
              Un acceso sobrio para revisar pedidos, validar anticipos y mover
              la produccion sin salir del flujo de la tienda.
            </p>
          </div>

          <div className="grid gap-3">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
              <p className="text-[10px] tracking-[0.24em] text-zinc-500 uppercase">
                Vista
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-200">
                Pedidos, usuarios y estados en un solo tablero.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-pink-200/20 bg-pink-200/8 p-4">
              <p className="text-[10px] tracking-[0.24em] text-pink-100/70 uppercase">
                Metodo
              </p>
              <p className="mt-2 text-sm leading-6 text-pink-50">
                El backend persiste en Turso y la sesion corre con Better Auth.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative p-6 sm:p-8 xl:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(248,200,211,0.16),transparent_30%)]" />
        <div className="relative">
          <p className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase">
            {mode === "login" ? "Ingreso protegido" : "Registro inicial"}
          </p>
          <h2 className="font-bebas mt-4 text-6xl leading-none tracking-[0.04em] text-zinc-50 uppercase">
            {mode === "login" ? "Entrar" : "Crear acceso"}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-zinc-300">
            {mode === "login"
              ? "Accede al panel para revisar ordenes, anticipos y el estado operacional."
              : "Registra el primer admin o el correo definido en ADMIN_EMAIL para habilitar el panel."}
          </p>

          <form className="mt-8 space-y-4" onSubmit={onSubmit}>
            {mode === "register" ? (
              <div>
                <label className="mb-2 block text-[10px] tracking-[0.2em] text-zinc-400 uppercase">
                  Nombre
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, name: event.target.value }))
                  }
                  className="w-full rounded-[1.25rem] border border-white/10 bg-zinc-950/90 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-pink-200/50 focus:bg-black"
                />
              </div>
            ) : null}

            <div>
              <label className="mb-2 block text-[10px] tracking-[0.2em] text-zinc-400 uppercase">
                Email
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm((current) => ({ ...current, email: event.target.value }))
                }
                className="w-full rounded-[1.25rem] border border-white/10 bg-zinc-950/90 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-pink-200/50 focus:bg-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-[10px] tracking-[0.2em] text-zinc-400 uppercase">
                Password
              </label>
              <input
                required
                minLength={8}
                type="password"
                value={form.password}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    password: event.target.value,
                  }))
                }
                className="w-full rounded-[1.25rem] border border-white/10 bg-zinc-950/90 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-pink-200/50 focus:bg-black"
              />
            </div>

            {error ? (
              <p className="rounded-[1.25rem] border border-red-200/20 bg-red-300/10 px-4 py-3 text-sm text-red-100">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isPending || (mode === "register" && !allowRegistration)}
              className="w-full rounded-[1.25rem] border border-pink-200/35 bg-pink-200/12 px-4 py-3 text-[11px] tracking-[0.28em] text-pink-50 uppercase transition hover:bg-pink-200/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Procesando..." : submitLabel}
            </button>
          </form>

          <div className="mt-6 rounded-[1.5rem] border border-white/8 bg-white/4 px-4 py-4 text-sm leading-6 text-zinc-300">
            {mode === "login" ? (
              <p>
                Si aun no existe un admin, usa{" "}
                <Link
                  className="text-pink-100 underline decoration-pink-200/40 underline-offset-4"
                  href="/admin/register"
                >
                  el registro inicial
                </Link>
                .
              </p>
            ) : (
              <p>
                Si ya tienes acceso, entra desde{" "}
                <Link
                  className="text-pink-100 underline decoration-pink-200/40 underline-offset-4"
                  href="/admin/login"
                >
                  login
                </Link>
                .
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
