"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { PixProvider } from "@/context/PixContext";

export default function Home() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    const nome = formData.get("nome") as string;
    const chave = formData.get("chave") as string;
    const valor = formData.get("valor") as string;
    const cidade = formData.get("cidade") as string;
    const identificacao = formData.get("identificacao") as string;
    let url = `/placa?nome=${encodeURIComponent(nome)}&chave=${encodeURIComponent(chave)}`;
    if (valor) url += `&valor=${encodeURIComponent(valor)}`;
    if (cidade) url += `&cidade=${encodeURIComponent(cidade)}`;
    if (identificacao) url += `&identificacao=${encodeURIComponent(identificacao)}`;
    router.push(url);
  }

  return (
    <PixProvider>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black p-4">
        <main className="w-full max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-center">Gerar Placa Pix</h1>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow"
            autoComplete="off"
          >
            <label className="flex flex-col gap-1">
              <span className="font-semibold">Nome do recebedor</span>
              <input name="nome" required className="input input-bordered rounded px-3 py-2" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-semibold">Chave Pix</span>
              <input name="chave" required className="input input-bordered rounded px-3 py-2" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-semibold">Valor (opcional)</span>
              <input name="valor" type="number" step="0.01" min="0" className="input input-bordered rounded px-3 py-2" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-semibold">Cidade (opcional)</span>
              <input name="cidade" className="input input-bordered rounded px-3 py-2" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-semibold">Identificação (opcional)</span>
              <input name="identificacao" className="input input-bordered rounded px-3 py-2" />
            </label>
            <button type="submit" className="mt-2 rounded-full bg-foreground text-background font-semibold py-2 px-6 hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors">Gerar Placa Pix</button>
          </form>
        </main>
      </div>
    </PixProvider>
  );
}
