import { redirect } from "next/navigation";
import { AuthForm } from "@/components/admin/auth-form";
import { getSession } from "@/lib/auth-session";

export default async function AdminLoginPage() {
  const session = await getSession();

  if (session?.user?.role === "admin") {
    redirect("/admin");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 px-4 py-10 sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(248,200,211,0.14),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(240,236,228,0.08),transparent_20%),linear-gradient(180deg,#111111_0%,#090909_100%)]" />
      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center">
        <AuthForm mode="login" />
      </div>
    </main>
  );
}
