import "./globals.css";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: {
    default: "LP Ma'arif NU PBNU - Lembaga Pendidikan Ma'arif NU",
    template: "%s | LP Ma'arif NU PBNU",
  },
  description: "Lembaga Pendidikan Ma'arif Nahdlatul Ulama Pengurus Besar Nahdlatul Ulama - Berkomitmen mengembangkan pendidikan Islam berkualitas di Indonesia",
  keywords: ["LP Maarif NU", "Pendidikan NU", "Nahdlatul Ulama", "Pendidikan Islam", "Ma'arif NU"],
  authors: [{ name: "LP Ma'arif NU PBNU" }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "LP Ma'arif NU PBNU",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="antialiased">
        <Header fixed={true} />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
