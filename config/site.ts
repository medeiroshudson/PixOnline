/**
 * Configurações centralizadas para o site
 * Valores definidos aqui podem ser sobrescritos por variáveis de ambiente
 */
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Faz Um PIX";

export const siteConfig = {
  // Informações básicas do site
  name: siteName,
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://pix-online.netlify.app",
  
  // Descrição e detalhes
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 
    "Crie códigos PIX personalizados gratuitamente online. Ferramenta completa para gerar QR Code PIX e link de pagamento para transferências instantâneas.",
  shortDescription: process.env.NEXT_PUBLIC_SITE_SHORT_DESCRIPTION || 
    "Crie códigos PIX personalizados gratuitamente online",
  
  // Informações de contato e legal
  copyright: process.env.NEXT_PUBLIC_SITE_COPYRIGHT || 
    `© ${new Date().getFullYear()} ${siteName} - Ferramenta gratuita para geração de QR Code PIX`,
  disclaimer: process.env.NEXT_PUBLIC_SITE_DISCLAIMER || 
    "PIX é uma marca registrada do Banco Central do Brasil",
  
  // Informações para SEO
  keywords: process.env.NEXT_PUBLIC_SITE_KEYWORDS || 
    "pix, qr code pix, gerador pix, pagamento pix, transferência pix, placa, qr code, código de pagamento, código de barras, pagamento instantâneo, gerador de qr code, qr code grátis, qr code online, qr code pix grátis, qr code pix online",
  
  // Redes sociais
  social: {
    twitter: process.env.NEXT_PUBLIC_TWITTER_HANDLE || "",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_PAGE || "",
  },
  
  // Imagens e assets
  images: {
    ogImage: process.env.NEXT_PUBLIC_OG_IMAGE || "/og-image.jpg",
    twitterImage: process.env.NEXT_PUBLIC_TWITTER_IMAGE || "/twitter-image.jpg",
    favicon: "/favicon.ico",
    icon: "/favicon.ico",
    appleIcon: "/apple-icon.png",
  }
};
