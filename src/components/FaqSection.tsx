"use client";

import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    question: "O que é o PIX?",
    answer: "PIX é o sistema de pagamentos instantâneos criado pelo Banco Central do Brasil. Ele permite transferências e pagamentos em segundos, a qualquer hora do dia, todos os dias do ano, inclusive fins de semana e feriados."
  },
  {
    question: "O PIX Online é gratuito?",
    answer: "Sim, o PIX Online é totalmente gratuito! Nossa ferramenta para gerar QRCode PIX não tem nenhum custo ou limitação. Não há necessidade de cadastro ou instalação de aplicativos."
  },
  {
    question: "Como funciona o gerador de QRCode PIX?",
    answer: "Basta preencher o formulário com os dados necessários como nome do recebedor, chave PIX e valor (opcional). Após isso, o sistema gera automaticamente o QRCode que pode ser escaneado por qualquer aplicativo de banco que suporte PIX."
  },
  {
    question: "Meus dados estão seguros?",
    answer: "Sim! O PIX Online não armazena nenhum dado em servidores. Todo o processamento ocorre localmente no seu navegador. Seus dados são utilizados apenas para gerar o código PIX e não são compartilhados com terceiros."
  },
  {
    question: "Quais tipos de chaves PIX posso utilizar?",
    answer: "Você pode utilizar qualquer tipo de chave PIX: CPF/CNPJ, e-mail, telefone ou chave aleatória. O sistema funciona com todos os tipos de chaves aceitas pelo sistema PIX oficial."
  },
  {
    question: "Posso definir um valor específico para o pagamento?",
    answer: "Sim, você pode definir um valor específico que será exibido automaticamente quando o QRCode for lido, facilitando o pagamento. Isso é opcional, e caso não seja definido, o pagador poderá inserir o valor desejado."
  },
  {
    question: "Como compartilhar o QRCode PIX gerado?",
    answer: "Depois de gerar o QRCode, você pode salvá-lo como imagem, imprimir ou compartilhar diretamente o link fornecido. Esse link permite que outras pessoas visualizem o mesmo QRCode."
  },
];

export default function FaqSection() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <section className="w-full py-12" id="faq">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Perguntas Frequentes</h2>
        
        <div className="space-y-4">
          {faqItems.map((item, i) => (            <div 
              key={i}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleItem(i)}
                className="flex justify-between items-center w-full p-4 text-left bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                aria-expanded={openItem === i}
                aria-controls={`faq-content-${i}`}
              >
                <span className="font-medium text-lg text-gray-900 dark:text-gray-100">{item.question}</span>            <svg
              className={`w-5 h-5 transition-transform text-gray-700 dark:text-gray-300 ${openItem === i ? 'transform rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
              </button>              {openItem === i && (
                <div 
                  id={`faq-content-${i}`} 
                  className="p-4 bg-gray-50 dark:bg-gray-800/70 border-t border-gray-200 dark:border-gray-700"
                >
                  <p className="text-gray-700 dark:text-gray-200">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>        <div className="mt-8 text-center">
          <p className="text-lg text-gray-700 dark:text-gray-200">
            Ainda tem dúvidas? Entre em contato pelo <a href="mailto:contato@" className="text-blue-500 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300 hover:underline">medeiroshudson@outlook.com</a>
          </p>
        </div>
      </div>
    </section>
  );
}
