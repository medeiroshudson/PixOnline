import { Metadata } from "next";
import GeneratorForm from "../components/GeneratorForm";
import FaqSection from "../components/FaqSection";
import ThemeSwitcher from "../components/ThemeSwitcher";
import ContrastAlert from "../components/ContrastAlert";
import { siteConfig } from "../../config/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} - Gerador de QR Code PIX Grátis`,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  openGraph: {
    title: `${siteConfig.name} - Gerador de QR Code PIX Grátis`,
    description: siteConfig.shortDescription,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.images.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Gerador de QR Code PIX`
      }
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - Gerador de QR Code PIX Grátis`,
    description: siteConfig.shortDescription,
    images: [siteConfig.images.twitterImage],
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function Home() {
  return (    <>
      <ContrastAlert />      <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-black dark:via-gray-900 dark:to-gray-800">        <header className="w-full py-8 bg-white/50 dark:bg-black/50 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-6xl mx-auto px-4 relative">
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex items-center gap-3">
              {/* Botões de autenticação */}
              <div className="hidden sm:flex items-center gap-2">
                <a 
                  href="/login"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm border border-blue-600"
                >
                  Login
                </a>
                <button 
                  disabled
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-500 cursor-not-allowed shadow-sm border border-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600"
                >
                  Cadastrar
                </button>
              </div>
              <ThemeSwitcher />
            </div>            <h1 className="text-4xl font-extrabold text-center text-foreground dark:text-white drop-shadow">
              {siteConfig.name} <span className="text-blue-600 dark:text-blue-400">Gerador Grátis</span>
            </h1>
          </div>
        </header>
        
        {/* Botões de autenticação para mobile */}
        <div className="sm:hidden flex justify-center gap-3 py-3 bg-white/90 dark:bg-gray-900/90 shadow-sm">
          <a 
            href="/login"
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm border border-blue-600 flex-1 max-w-[160px] text-center"
          >
            Login
          </a>
          <button 
            disabled
            className="px-6 py-2 rounded-lg bg-gray-200 text-gray-500 cursor-not-allowed shadow-sm border border-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600 flex-1 max-w-[160px]"
          >
            Cadastrar
          </button>
        </div>

        <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-12 items-start">          <section className="flex flex-col gap-6">
            <div className="prose dark:prose-invert">              <h2 className="text-3xl font-bold dark:text-white mb-6">Gere códigos PIX facilmente</h2>              <p className="text-lg text-gray-700 dark:text-gray-200">
                Com o {siteConfig.name}, você pode criar códigos PIX personalizados em segundos.
                Seja para cobranças, doações ou pagamentos recorrentes, nossa ferramenta 
                garante transações seguras e eficientes.
              </p>
                <h3 className="text-xl font-semibold mt-10 mb-4 dark:text-white">Vantagens do {siteConfig.name}</h3>
              <ul className="space-y-2 dark:text-gray-200">
                <li>✅ Totalmente grátis e sem cadastro</li>
                <li>✅ Geração instantânea de QR Code</li>
                <li>✅ Compartilhamento via link</li>                <li>✅ Valores personalizáveis</li>
                <li>✅ Funciona com todas as chaves PIX</li>
              </ul>                <h3 className="text-xl font-semibold mt-10 mb-4 dark:text-white">Como funciona?</h3>
              <div className="space-y-4 dark:text-gray-200">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-bold">1</div>
                  <div>
                    <strong className="dark:text-white">Preencha os dados</strong>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">Informe o nome, chave PIX e valor (opcional) para gerar seu código de pagamento.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-bold">2</div>
                  <div>
                    <strong className="dark:text-white">Gere o QR Code</strong>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">Clique em &quot;Gerar Link de Pagamento&quot; e seu QR Code será criado instantaneamente.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-bold">3</div>
                  <div>
                    <strong className="dark:text-white">Compartilhe</strong>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">Envie o link ou código &quot;Copia e Cola&quot; para quem vai fazer o pagamento.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-bold">4</div>
                  <div>
                    <strong className="dark:text-white">Receba o pagamento</strong>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">O valor será creditado instantaneamente na conta vinculada à chave PIX informada.</p>
                  </div>
                </div>
              </div>
            </div>
              <div className="bg-blue-50 dark:bg-blue-900/50 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
              <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-3">Segurança Garantida</h3>
              <p className="text-gray-700 dark:text-gray-200">
                Seus dados estão seguros! Nenhuma informação é salva em nossos servidores.
                Todo o processamento acontece localmente no seu navegador.
              </p>
            </div>
          </section>
            <section className="bg-white/90 dark:bg-gray-900/90 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 sticky top-8">
            <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Crie seu PIX agora</h2>
            <GeneratorForm />            <p className="mt-6 text-center text-gray-500 text-xs dark:text-gray-300">
              Nenhuma informação é salva. Tudo é gerado localmente e compartilhado via link.
            </p>
          </section>
        </main>
        
        <FaqSection />
          <footer className="w-full py-8 bg-white/50 dark:bg-black/50 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800">          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {siteConfig.copyright}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-300 mt-2">
              {siteConfig.disclaimer}
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
