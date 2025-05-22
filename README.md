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
