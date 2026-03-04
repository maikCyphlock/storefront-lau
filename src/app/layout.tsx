import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OverSizeByLau | Aesthetic Store Acarigua",
  description:
    "Tienda de ropa aesthetic y diseno personalizado en Acarigua. Compra y confirma por WhatsApp con anticipo del 50%.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
