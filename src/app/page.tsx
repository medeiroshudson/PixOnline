"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

const pixSchema = z.object({
  nome: z.string().min(1, "O nome é obrigatório."),
  chave: z.string().min(1, "A chave Pix é obrigatória."),
  valor: z
    .string()
    .optional()
    .refine(
      (v) => !v || /^\d{1,8},\d{2}$/.test(v),
      { message: "Informe um valor válido no formato 0,00." }
    ),
  cidade: z.string().optional(),
  identificacao: z.string().optional(),
  descricao: z.string().optional(),
});

export default function Home() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [valorMasked, setValorMasked] = useState("");
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  function handleValorChange(e: React.ChangeEvent<HTMLInputElement>) {
    let v = e.target.value.replace(/\D/g, "");
    if (!v) {
      setValorMasked("");
      return;
    }
    v = (Number(v) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    setValorMasked(v);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const formData = new FormData(formRef.current!);
    const nome = formData.get("nome")?.toString().trim() || "";
    const chave = formData.get("chave")?.toString().trim() || "";
    const valor = valorMasked;
    const cidade = formData.get("cidade")?.toString().trim() || "";
    const identificacao = formData.get("identificacao")?.toString().trim() || "";
    const descricao = formData.get("descricao")?.toString().trim() || "";
    const result = pixSchema.safeParse({ nome, chave, valor, cidade, identificacao, descricao });
    if (!result.success) {
      const fieldErrors: { [k: string]: string } = {};
      for (const err of result.error.errors) {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      }
      setErrors(fieldErrors);
      return;
    }
    let url = `/pix?nome=${encodeURIComponent(nome)}&chave=${encodeURIComponent(chave)}`;
    if (valor) url += `&valor=${encodeURIComponent(valor.replace(",", "."))}`;
    if (cidade) url += `&cidade=${encodeURIComponent(cidade)}`;
    if (identificacao) url += `&identificacao=${encodeURIComponent(identificacao)}`;
    if (descricao) url += `&descricao=${encodeURIComponent(descricao)}`;
    router.push(url);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-black dark:via-gray-900 dark:to-gray-800 p-4">
      <main className="w-full max-w-md mx-auto">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-foreground dark:text-white drop-shadow">Pix Online</h1>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-white/90 dark:bg-gray-900/90 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800"
          autoComplete="off"
        >
          <label className="flex flex-col gap-1">
            <span className="font-semibold text-gray-700 dark:text-gray-200">Nome do recebedor</span>
            <input
              name="nome"
              required={false}
              autoComplete="off"
              className={`input input-bordered rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white w-full ${errors.nome ? "!border-red-500 !ring-1 !ring-red-500 focus:!ring-red-500" : ""}`}
              placeholder="Ex: João da Silva"
            />
            {errors.nome && <span className="text-xs text-red-600 mt-1">{errors.nome}</span>}
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-semibold text-gray-700 dark:text-gray-200">Chave Pix</span>
            <input
              name="chave"
              required={false}
              autoComplete="off"
              className={`input input-bordered rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white w-full ${errors.chave ? "!border-red-500 !ring-1 !ring-red-500 focus:!ring-red-500" : ""}`}
              placeholder="Ex: email, telefone ou chave aleatória"
            />
            {errors.chave && <span className="text-xs text-red-600 mt-1">{errors.chave}</span>}
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-semibold text-gray-700 dark:text-gray-200">Valor</span>
            <div className="relative w-full">
              <input
                name="valor"
                type="text"
                inputMode="numeric"
                value={valorMasked}
                onChange={handleValorChange}
                className={`input input-bordered rounded pl-12 pr-3 py-2 focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white w-full ${errors.valor ? "!border-red-500 !ring-1 !ring-red-500 focus:!ring-red-500" : ""}`}
                placeholder="Ex: 25,00"
                maxLength={12}
                autoComplete="off"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none select-none">R$</span>
            </div>
            {errors.valor && <span className="text-xs text-red-600 mt-1">{errors.valor}</span>}
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
          <button type="submit" className="mt-2 rounded-full bg-blue-600 text-white font-semibold py-2 px-6 hover:bg-blue-700 transition-colors shadow">Gerar Link</button>
        </form>
        <p className="mt-6 text-center text-gray-500 text-xs dark:text-gray-400">Nenhuma informação é salva. Tudo é gerado localmente e compartilhado via link.</p>
      </main>
    </div>
  );
}
