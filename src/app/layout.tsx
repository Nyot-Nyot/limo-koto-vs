import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "../components/LayoutWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Website Nagari - Sumatera Barat",
  description: "Portal informasi resmi Nagari di Sumatera Barat - Profil, Adat Istiadat, Berita, dan Statistik Penduduk",
  keywords: "nagari, sumatera barat, minangkabau, adat istiadat, berita, profil desa",
  authors: [{ name: "Tim IT Nagari" }],
  openGraph: {
    title: "Website Nagari - Sumatera Barat",
    description: "Portal informasi resmi Nagari di Sumatera Barat",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased bg-gray-50 text-gray-900">
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
