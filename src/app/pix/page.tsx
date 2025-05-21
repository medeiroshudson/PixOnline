"use client";
import { useSearchParams } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import { gerarPayloadPix } from "@/utils/pixUtils";
import { useState, useEffect } from "react";
import { usePix } from "@/context/PixContext";
import type { Pix } from "@/types/pix";

export default function PixPage() {
  const searchParams = useSearchParams();
  const nome = searchParams.get("nome") || "";
  const chave = searchParams.get("chave") || "";
  const valor = searchParams.get("valor") || "";
  const cidade = searchParams.get("cidade") || "";
  const identificacao = searchParams.get("identificacao") || "";
  const descricao = searchParams.get("descricao") || "";

  const { setPix } = usePix();

  const pix: Pix = {
    nome,
    chave,
    valor,
    cidade,
    identificacao,
    descricao,
  };

  useEffect(() => {
    setPix(pix);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nome, chave, valor, cidade, identificacao, descricao]);

  const payload = gerarPayloadPix(pix);
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-black dark:via-gray-900 dark:to-gray-800 p-4">
      <main className="w-full max-w-md mx-auto">
        <div className="flex flex-col items-center gap-4">
          <QRCodeCanvas
            value={payload}
            size={180}
            className="mx-auto w-full max-w-[180px] h-auto"
          />
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
                <span className="break-all text-xs bg-white dark:bg-black border rounded p-2 select-all flex-1 overflow-x-auto max-w-[calc(100vw-100px)] text-gray-900 dark:text-white">
                  {payload}
                </span>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1 rounded bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                  type="button"
                >
                  {copied ? "Copiado!" : "Copiar"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-6 text-center text-gray-500 text-xs dark:text-gray-400">
          Nenhuma informação é salva. Tudo é gerado localmente e compartilhado via
          link.
        </p>
      </main>
    </div>
  );
}
