# PixOnline

Gere links e placas Pix customizadas de forma simples e rápida!

## Funcionalidades
- Formulário para gerar QR Code Pix e código copia e cola.
- Compartilhamento via link com todos os dados do Pix na URL.
- Visualização responsiva e moderna com Tailwind CSS.
- Dashboard para usuários autenticados com gerenciamento de PIXs.
- Sistema de autenticação com Supabase (email/senha).
- Área protegida para visualizar histórico e estatísticas.

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
- **Zustand** para gerenciamento de estado global
- **Supabase** para autenticação e armazenamento
- **React Hook Form** + **Zod** para validação de formulários

## Autenticação
O sistema possui dois provedores de autenticação intercambiáveis:

1. **Supabase Auth** (padrão para produção) - autenticação com email/senha através do Supabase
2. **Mock Auth Provider** (para desenvolvimento) - simulação de autenticação para desenvolvimento e testes

Para configurar, defina a variável de ambiente `NEXT_PUBLIC_AUTH_PROVIDER` como:
- `SUPABASE_AUTH_PROVIDER` para usar o Supabase
- `MOCK_AUTH_PROVIDER` para usar o provedor de simulação
- **IoC Container** para alternar implementações de geração de payload Pix
- **Configuração Centralizada** para valores de site e metadados

## Configurações do Site

Todas as informações do site como nome, URL, e descrições estão centralizadas em `config/site.ts`. 
Você pode personalizar estas informações de duas formas:

1. **Variáveis de ambiente**: Crie um arquivo `.env.local` baseado no `.env.example` e defina os valores.
2. **Edição direta**: Altere os valores padrão no arquivo `config/site.ts`.

### Exemplo de uso:

```tsx
import { siteConfig } from "../../config/site";

// Usar o nome do site
<h1>{siteConfig.name}</h1>

// Usar a URL
<a href={siteConfig.url}>Visite o site</a>
```

## Geração de Payload Pix
- Implementação própria (default)
- Implementação alternativa usando biblioteca consolidada (ver código em `src/utils/pixUtils.ts`)

## Estrutura de Pastas
- `config` - Configurações centralizadas do site
- `src/app` - Páginas e layout
- `src/components` - Componentes reutilizáveis
- `src/core` - Lógica principal e IoC Container
- `src/store` - Estado global da aplicação
- `src/types` - Tipos TypeScript
- `src/utils` - Utilitários e funções auxiliares

## Observações
- O projeto não salva dados em banco ou cookies.
- O código Pix é gerado localmente e pode ser compartilhado via link.

## Scripts Úteis

```bash
# Iniciar em modo desenvolvimento
npm run dev

# Build para produção
npm run build
npm run start
```

Para mais detalhes sobre o sistema de configuração centralizada, consulte [SITE_CONFIG.md](./SITE_CONFIG.md).

---

Feito com ❤️ para facilitar pagamentos instantâneos!
