import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "OrthoSurgeon - Expert Orthopaedic Care",
  description: "Expert orthopaedic care with comprehensive treatment for all musculoskeletal conditions. Joint replacement, sports medicine, spine care, and more.",
  keywords: "orthopaedic surgeon, joint replacement, sports medicine, spine care, orthopedic doctor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main className="pt-32">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
