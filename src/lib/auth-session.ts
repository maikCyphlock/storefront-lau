import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireAdminSession() {
  const session = await getSession();

  if (!session?.user || session.user.role !== "admin") {
    redirect("/admin/login");
  }

  return session;
}
