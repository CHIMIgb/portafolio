import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const haloFont = localFont({
  src: "../../public/fonts/halo/Halo.ttf",
  variable: "--font-halo",
  display: "swap",
});

const covenantFont = localFont({
  src: "../../public/fonts/covenant/Halo Covenant.ttf",
  variable: "--font-covenant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CHIMI - Backend Developer",
  description: "Portafolio de CHIMI - Desarrollador de Soluciones Digitales. Experiencia inmersiva 3D con proyectos web innovadores.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${haloFont.variable} ${covenantFont.variable}`}>{children}</body>
    </html>
  );
}
