"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { QRCodeCanvas } from "qrcode.react";
import { gerarPayloadPix } from "@/utils/pixUtils";
import { useState, useEffect } from "react";
import { usePix } from "@/context/PixContext";
import type { Pix } from "@/types/pix";

export default function PlacaPix() {
  const searchParams = useSearchParams();
  const nome = searchParams.get("nome") || "";
  const chave = searchParams.get("chave") || "";
  const valor = searchParams.get("valor") || "";
  const cidade = searchParams.get("cidade") || "";
  const identificacao = searchParams.get("identificacao") || "";

  const { setPix } = usePix();

  const pix: Pix = {
    nome,
    chave,
    valor,
    cidade,
    identificacao,
  };

  // Atualiza o contexto Pix ao montar
  useEffect(() => {
    setPix(pix);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nome, chave, valor, cidade, identificacao]);

  const payload = gerarPayloadPix(pix);

  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2 sm:p-4 gap-4 bg-white dark:bg-black">
      <button
        onClick={() => window.history.back()}
        className="self-start mb-2 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-sm font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        type="button"
      >
        ← Voltar
      </button>
      <h1 className="text-xl sm:text-2xl font-bold mb-2 text-center">Placa Pix</h1>
      <QRCodeCanvas value={payload} size={180} className="mx-auto w-full max-w-[180px] h-auto" />
      <div className="w-full max-w-md bg-gray-100 dark:bg-gray-800 rounded-lg p-3 sm:p-4 flex flex-col gap-2 shadow-md">
        <div className="flex flex-col gap-1 text-sm sm:text-base">
          <span className="font-semibold">Nome:</span>
          <span className="truncate">{nome}</span>
        </div>
        <div className="flex flex-col gap-1 text-sm sm:text-base">
          <span className="font-semibold">Chave Pix:</span>
          <span className="break-all">{chave}</span>
        </div>
        {valor && (
          <div className="flex flex-col gap-1 text-sm sm:text-base">
            <span className="font-semibold">Valor:</span>
            <span>R$ {valor}</span>
          </div>
        )}
        {identificacao && (
          <div className="flex flex-col gap-1 text-sm sm:text-base">
            <span className="font-semibold">Identificação:</span>
            <span className="break-all">{identificacao}</span>
          </div>
        )}
        <div className="flex flex-col gap-1 text-sm sm:text-base">
          <span className="font-semibold">Código Copia e Cola:</span>
          <div className="flex items-center gap-2">
            <span className="break-all text-xs bg-white dark:bg-black border rounded p-2 select-all flex-1 overflow-x-auto max-w-[calc(100vw-100px)]">{payload}</span>
            <button
              onClick={handleCopy}
              className="px-3 py-1 rounded bg-foreground text-background text-xs font-semibold hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors"
              type="button"
            >
              {copied ? "Copiado!" : "Copiar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
