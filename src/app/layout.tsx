import "./globals.css";
import { Suspense } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pixonline.com.br"),
  title: {
    default: "PIX Online - Gerador de QR Code PIX",
    template: "%s | PIX Online"
  },
  description: "Gerador de QR Code PIX - Crie códigos para pagamentos PIX facilmente e de forma gratuita",
  applicationName: "PIX Online",
  authors: [{ name: "PIX Online Team" }],
  generator: "Next.js",
  keywords: ["pix", "qr code", "pagamento", "transferência", "banco central", "gerador pix"],
  referrer: "origin-when-cross-origin",
  creator: "PIX Online",
  publisher: "PIX Online",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  verification: {
    google: "google-site-verification-code",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://pixonline.com.br" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Suspense fallback={<div className="w-full text-center py-10">Carregando...</div>}>
            {children}
          </Suspense>
        </ThemeProvider>
        
        {/* Estruturados para SEO - Schema.org */}
        <Script id="schema-org" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "PIX Online - Gerador de QR Code PIX",
              "description": "Crie códigos PIX personalizados gratuitamente online. Ferramenta completa para gerar QR Code PIX.",
              "url": "https://pixonline.com.br",
              "applicationCategory": "FinanceApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "BRL"
              }
            }
          `}
        </Script>
      </body>
    </html>
  );
}
