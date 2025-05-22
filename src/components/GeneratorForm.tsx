"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { pixSchema } from "../types/pix";
import { siteConfig } from "../../config/site";

export default function GeneratorForm() {
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

  function normalizeNome(nome: string) {
    return nome.normalize("NFD").replace(/[^\w\s]/gi, "").replace(/_/g, "");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const formData = new FormData(formRef.current!);
    let nome = formData.get("nome")?.toString().trim() || "";
    const chave = formData.get("chave")?.toString().trim() || "";
    const valor = valorMasked;
    const cidade = formData.get("cidade")?.toString().trim() || "";
    const identificacao = formData.get("identificacao")?.toString().trim() || "";
    const descricao = formData.get("descricao")?.toString().trim() || "";
    nome = normalizeNome(nome);
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
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      autoComplete="off"
    >
      <label className="flex flex-col gap-1">
        <span className="font-semibold text-gray-700 dark:text-gray-200">Nome do recebedor</span>        <input
          name="nome"
          required={false}
          autoComplete="off"
          className={`input input-bordered rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white dark:border-gray-600 w-full ${errors.nome ? "!border-red-500 !ring-1 !ring-red-500 focus:!ring-red-500" : ""}`}
          placeholder="Ex: João da Silva"
          aria-label="Nome do recebedor"
          aria-required="true"
          aria-invalid={errors.nome ? "true" : "false"}
        />
        {errors.nome && <span className="text-xs text-red-600 dark:text-red-400 font-medium mt-1" role="alert">{errors.nome}</span>}
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-semibold text-gray-700 dark:text-gray-200">Chave Pix</span>        <input
          name="chave"
          required={false}
          autoComplete="off"
          className={`input input-bordered rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white dark:border-gray-600 w-full ${errors.chave ? "!border-red-500 !ring-1 !ring-red-500 focus:!ring-red-500" : ""}`}
          placeholder="Ex: email, telefone ou chave aleatória"
          aria-label="Chave Pix"
          aria-required="true"
          aria-invalid={errors.chave ? "true" : "false"}
        />
        {errors.chave && <span className="text-xs text-red-600 dark:text-red-400 font-medium mt-1" role="alert">{errors.chave}</span>}
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-semibold text-gray-700 dark:text-gray-200">Valor</span>
        <div className="relative w-full">          <input
            name="valor"
            type="text"
            inputMode="numeric"
            value={valorMasked}
            onChange={handleValorChange}
            className={`input input-bordered rounded pl-12 pr-3 py-2 focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white dark:border-gray-600 w-full ${errors.valor ? "!border-red-500 !ring-1 !ring-red-500 focus:!ring-red-500" : ""}`}
            placeholder="Ex: 25,00"
            maxLength={12}
            autoComplete="off"
            aria-label="Valor do Pix"
            aria-invalid={errors.valor ? "true" : "false"}
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300 pointer-events-none select-none">R$</span>
        </div>
        {errors.valor && <span className="text-xs text-red-600 dark:text-red-400 font-medium mt-1" role="alert">{errors.valor}</span>}
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-semibold text-gray-700 dark:text-gray-200">Cidade (opcional)</span>        <input 
          name="cidade" 
          className="input input-bordered rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white dark:border-gray-600" 
          placeholder="Ex: São Paulo" 
          aria-label="Cidade (opcional)"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-semibold text-gray-700 dark:text-gray-200">Identificação (opcional)</span>        <input 
          name="identificacao" 
          className="input input-bordered rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white dark:border-gray-600" 
          placeholder="Ex: Pedido #001" 
          aria-label="Identificação (opcional)"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-semibold text-gray-700 dark:text-gray-200">Descrição (opcional)</span>        <textarea 
          name="descricao" 
          rows={2} 
          className="input input-bordered rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white dark:border-gray-600 resize-none" 
          placeholder="Ex: Pagamento referente ao pedido 001" 
          aria-label="Descrição (opcional)"
        />
      </label>      <button 
        type="submit" 
        className="mt-2 rounded-full bg-blue-600 text-white font-semibold py-3 px-6 hover:bg-blue-500 transition-colors shadow"
        aria-label="Gerar Link de Pagamento Pix"
      >
        Gerar Link de Pagamento
      </button>
    </form>
  );
}
