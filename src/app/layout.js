import "./globals.css";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FaviconUpdater from "@/components/shared/FaviconUpdater";
import { Toaster } from 'react-hot-toast';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://maarifnu.or.id'),
  title: {
    default: "LP Ma'arif NU PBNU - Lembaga Pendidikan Ma'arif NU",
    template: "%s | LP Ma'arif NU PBNU",
  },
  description: "Lembaga Pendidikan Ma'arif Nahdlatul Ulama Pengurus Besar Nahdlatul Ulama - Berkomitmen mengembangkan pendidikan Islam berkualitas di Indonesia",
  keywords: ["LP Maarif NU", "Pendidikan NU", "Nahdlatul Ulama", "Pendidikan Islam", "Ma'arif NU"],
  authors: [{ name: "LP Ma'arif NU PBNU" }],
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/icon.png',
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "LP Ma'arif NU PBNU",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: "LP Ma'arif NU PBNU",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "LP Ma'arif NU PBNU - Lembaga Pendidikan Ma'arif NU",
    description: "Lembaga Pendidikan Ma'arif Nahdlatul Ulama Pengurus Besar Nahdlatul Ulama",
    images: ['/og-image.png'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="antialiased">
        <FaviconUpdater />
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
