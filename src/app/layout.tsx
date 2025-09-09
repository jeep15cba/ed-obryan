import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { getNavigationData } from "@/lib/sanity-queries";

export const metadata: Metadata = {
  title: "OrthoSurgeon - Expert Orthopaedic Care",
  description: "Expert orthopaedic care with comprehensive treatment for all musculoskeletal conditions. Joint replacement, sports medicine, spine care, and more.",
  keywords: "orthopaedic surgeon, joint replacement, sports medicine, spine care, orthopedic doctor",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Pre-fetch navigation data at server level
  let navigationData = null;
  try {
    navigationData = await getNavigationData();
  } catch (error) {
    console.warn('Failed to pre-fetch navigation data:', error);
  }

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="antialiased">
        <Header initialNavigationData={navigationData} />
        <main className="pt-32">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
