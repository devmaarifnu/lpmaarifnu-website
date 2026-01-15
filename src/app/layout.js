import "./globals.css";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from 'react-hot-toast';

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
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#059669',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        <Header />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
