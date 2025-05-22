"use client";
import { useSearchParams } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useMemo, useState } from "react";
import { usePix } from "@/store/usePixStore";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Link from "next/link";

export default function PixPage() {
  const searchParams = useSearchParams();
  const nome = searchParams.get("nome") || "";
  const chave = searchParams.get("chave") || "";
  const valor = searchParams.get("valor") || "";
  const cidade = searchParams.get("cidade") || "";
  const identificacao = searchParams.get("identificacao") || "";
  const descricao = searchParams.get("descricao") || "";

  const setPix = usePix((state) => state.setPix);
  const gerarPayload = usePix((state) => state.gerarPayload);
  const payload = usePix((state) => state.payload);

  const pix = useMemo(
    () => ({
      nome,
      chave,
      valor,
      cidade,
      identificacao,
      descricao,
    }),
    [nome, chave, valor, cidade, identificacao, descricao]
  );

  useEffect(() => {
    setPix(pix);
    gerarPayload();
  }, [pix]);

  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  function handleCopy() {
    if (!payload) return;
    navigator.clipboard.writeText(payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  // Função para copiar o link da página atual
  function handleCopyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 1500);
  }

  // Função para compartilhar nas redes sociais
  function shareOnSocial(platform: string) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Faça um PIX para ${nome}!`);

    let shareUrl = "";
    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${text}%20${url}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      default:
        break;
    }

    if (shareUrl) window.open(shareUrl, "_blank");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-black dark:via-gray-900 dark:to-gray-800 p-4">
      <div className="fixed top-4 right-4 z-50">
        <ThemeSwitcher />
      </div>
      <main className="w-full max-w-md mx-auto">
        <div className="flex flex-col items-center gap-4">
          {payload && (
            <QRCodeCanvas
              value={payload}
              size={180}
              className="mx-auto w-full max-w-[180px] h-auto"
            />
          )}
          <div className="w-full bg-white/90 dark:bg-gray-900/90 rounded-2xl p-6 flex flex-col gap-4 shadow-xl border border-gray-200 dark:border-gray-800">
            <div className="flex flex-col gap-1 text-base">
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                Nome:
              </span>
              <span className="truncate text-gray-900 dark:text-white">
                {nome}
              </span>
            </div>
            <div className="flex flex-col gap-1 text-base">
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                Chave Pix:
              </span>
              <span className="break-all text-gray-900 dark:text-white">
                {chave}
              </span>
            </div>
            {valor && (
              <div className="flex flex-col gap-1 text-base">
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  Valor:
                </span>
                <span className="text-gray-900 dark:text-white">
                  R$ {valor}
                </span>
              </div>
            )}
            {identificacao && (
              <div className="flex flex-col gap-1 text-base">
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  Identificação:
                </span>
                <span className="break-all text-gray-900 dark:text-white">
                  {identificacao}
                </span>
              </div>
            )}
            {pix.descricao && (
              <div className="flex flex-col gap-1 text-base">
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  Descrição:
                </span>
                <span className="break-all text-gray-900 dark:text-white">
                  {pix.descricao}
                </span>
              </div>
            )}
            <div className="flex flex-col gap-1 text-base">
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                Código Copia e Cola:
              </span>
              <div className="flex items-center gap-2">
                <span className="break-all text-xs bg-white dark:bg-gray-950 border rounded p-2 select-all flex-1 overflow-x-auto max-w-[calc(100vw-100px)] text-gray-900 dark:text-gray-100">
                  {payload}
                </span>
                <button
                  onClick={handleCopy}
                  className="h-full px-3 py-2 rounded bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition-colors flex-shrink-0"
                  style={{ minHeight: "40px" }}
                  type="button"
                >
                  {copied ? "Copiado!" : "Copiar"}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Seção de compartilhamento */}
        <div className="w-full mt-6 bg-white/90 dark:bg-gray-900/90 rounded-2xl p-6 flex flex-col gap-4 shadow-xl border border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Compartilhe este PIX</h3>
          
          <div className="flex flex-col gap-3">
            {/* Botão para copiar link */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-blue-100 dark:bg-blue-900/40 hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors text-blue-700 dark:text-blue-300 font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                </svg>
                {linkCopied ? "Link copiado!" : "Copiar link para compartilhar"}
              </button>
            </div>
            
            {/* Botões para redes sociais */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => shareOnSocial('whatsapp')}
                className="flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 transition-colors text-green-700 dark:text-green-400 font-medium"
                aria-label="Compartilhar no WhatsApp"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="hidden sm:inline">WhatsApp</span>
              </button>
              
              <button
                onClick={() => shareOnSocial('facebook')}
                className="flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 transition-colors text-blue-700 dark:text-blue-400 font-medium"
                aria-label="Compartilhar no Facebook"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="hidden sm:inline">Facebook</span>
              </button>
              
              <button
                onClick={() => shareOnSocial('twitter')}
                className="flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 transition-colors text-blue-700 dark:text-blue-400 font-medium"
                aria-label="Compartilhar no X (Twitter)"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="hidden sm:inline">X (Twitter)</span>
              </button>
            </div>
          </div>
        </div>
          {/* Seção de convite para criar um link de pagamento */}
        <div className="w-full mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 flex flex-col gap-3 shadow-lg border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">Crie seu link de pagamento PIX</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Gere um QR Code e link de pagamento PIX para receber transferências de forma rápida e segura.
          </p>
          <Link 
            href="/"
            className="mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Criar link de pagamento
          </Link>
        </div>
        
        <p className="mt-6 mb-8 text-center text-gray-500 text-xs dark:text-gray-300">
          Nenhuma informação é salva. Tudo é gerado localmente e compartilhado via
          link.
        </p>
      </main>
    </div>
  );
}
