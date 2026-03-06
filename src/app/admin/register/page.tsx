import { count } from "drizzle-orm";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/admin/auth-form";
import { getSession } from "@/lib/auth-session";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export default async function AdminRegisterPage() {
  const session = await getSession();

  if (session?.user?.role === "admin") {
    redirect("/admin");
  }

  const [{ value: existingUsers }] = await db
    .select({ value: count() })
    .from(users);

  const allowRegistration =
    existingUsers === 0 || Boolean(process.env.ADMIN_EMAIL);

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 px-4 py-10 sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(248,200,211,0.18),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.08),transparent_22%),linear-gradient(180deg,#111111_0%,#090909_100%)]" />
      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center">
        <AuthForm mode="register" allowRegistration={allowRegistration} />
      </div>
    </main>
  );
}
