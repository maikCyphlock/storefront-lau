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
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Playfair+Display:ital@1&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
