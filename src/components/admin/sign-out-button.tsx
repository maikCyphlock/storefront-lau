"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function SignOutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() =>
        startTransition(async () => {
          await fetch("/api/auth/sign-out", {
            method: "POST",
            credentials: "include",
          });

          router.push("/admin/login");
          router.refresh();
        })
      }
      className="rounded-full border border-white/15 bg-white/4 px-4 py-2 text-[10px] tracking-[0.24em] text-zinc-200 uppercase transition hover:border-pink-200/40 hover:bg-pink-200/12 hover:text-pink-50"
    >
      {isPending ? "Saliendo..." : "Cerrar sesion"}
    </button>
  );
}
