"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";

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
    const descricao = formData.get("descricao") as string;
    let url = `/pix?nome=${encodeURIComponent(nome)}&chave=${encodeURIComponent(chave)}`;
    if (valor) url += `&valor=${encodeURIComponent(valor)}`;
    if (cidade) url += `&cidade=${encodeURIComponent(cidade)}`;
    if (identificacao) url += `&identificacao=${encodeURIComponent(identificacao)}`;
    if (descricao) url += `&descricao=${encodeURIComponent(descricao)}`;
    router.push(url);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-black dark:via-gray-900 dark:to-gray-800 p-4">
      <main className="w-full max-w-md mx-auto">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-foreground dark:text-white drop-shadow">Gerar Placa Pix</h1>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-white/90 dark:bg-gray-900/90 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800"
          autoComplete="off"
        >
          <label className="flex flex-col gap-1">
            <span className="font-semibold text-gray-700 dark:text-gray-200">Nome do recebedor</span>
            <input name="nome" required className="input input-bordered rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white" placeholder="Ex: João da Silva" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-semibold text-gray-700 dark:text-gray-200">Chave Pix</span>
            <input name="chave" required className="input input-bordered rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white" placeholder="Ex: email, telefone ou chave aleatória" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-semibold text-gray-700 dark:text-gray-200">Valor (opcional)</span>
            <input name="valor" type="number" step="0.01" min="0" className="input input-bordered rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white" placeholder="Ex: 25.00" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-semibold text-gray-700 dark:text-gray-200">Cidade (opcional)</span>
            <input name="cidade" className="input input-bordered rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white" placeholder="Ex: São Paulo" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-semibold text-gray-700 dark:text-gray-200">Identificação (opcional)</span>
            <input name="identificacao" className="input input-bordered rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white" placeholder="Ex: Pedido123" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-semibold text-gray-700 dark:text-gray-200">Descrição (opcional)</span>
            <textarea name="descricao" rows={2} className="input input-bordered rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white resize-none" placeholder="Ex: Pagamento referente ao pedido 001" />
          </label>
          <button type="submit" className="mt-2 rounded-full bg-blue-600 text-white font-semibold py-2 px-6 hover:bg-blue-700 transition-colors shadow">Gerar Placa Pix</button>
        </form>
        <p className="mt-6 text-center text-gray-500 text-xs dark:text-gray-400">Nenhuma informação é salva. Tudo é gerado localmente e compartilhado via link.</p>
      </main>
    </div>
  );
}
