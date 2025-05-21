# PixOnline

Gere links e placas Pix customizadas de forma simples e rápida!

## Funcionalidades
- Formulário para gerar QR Code Pix e código copia e cola.
- Compartilhamento via link com todos os dados do Pix na URL.
- Visualização responsiva e moderna com Tailwind CSS.
- Não armazena nenhum dado do usuário.

## Como rodar localmente

1. Instale as dependências:

```bash
npm install
```

2. Rode o projeto em modo desenvolvimento:

```bash
npm run dev
```

3. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Arquitetura
- **Next.js 15** (App Router)
- **React 19**
- **Tailwind CSS 4**
- **Context API** para estado global
- **IoC Container** para alternar implementações de geração de payload Pix

## Geração de Payload Pix
- Implementação própria (default)
- Implementação alternativa usando biblioteca consolidada (ver código em `src/utils/pixUtils.ts`)

## Estrutura de Pastas
- `src/app` - Páginas e layout
- `src/context` - Contextos globais
- `src/types` - Tipos TypeScript
- `src/utils` - Utilitários e lógica Pix

## Observações
- O projeto não salva dados em banco ou cookies.
- O código Pix é gerado localmente e pode ser compartilhado via link.

---

Feito com ❤️ para facilitar pagamentos instantâneos!
