# Centralização das Configurações do Site

Este documento descreve as alterações feitas para centralizar todas as informações do site como nome, URL, descrições e metadados em um único local.

## Arquivos Criados

1. **`src/config/site.ts`**: Arquivo central de configurações com todos os valores do site
   - Usa variáveis de ambiente com fallbacks para valores padrão
   - Centraliza nome do site, URL, descrições, palavras-chave, etc.

2. **`.env.example`**: Arquivo de exemplo para variáveis de ambiente
   - Demonstra como substituir as configurações via variáveis de ambiente
   - Serve como documentação para as variáveis disponíveis

## Arquivos Modificados

1. **`src/app/layout.tsx`**:
   - Atualizado para usar as configurações centralizadas no metadata
   - Atualizado no Schema.org para manter consistência

2. **`src/app/page.tsx`**:
   - Metadados atualizados para usar configurações centralizadas
   - Título e conteúdo atualizados para referenciar o nome do site dinamicamente
   - Rodapé atualizado para usar copyright e disclaimer dinâmicos

3. **`src/app/pix/page.tsx`**:
   - Adicionado o rodapé com copyright
   - Melhorada a mensagem de compartilhamento incluindo o nome do site

4. **`README.md`**:
   - Adicionada documentação sobre o sistema de configurações centralizadas
   - Atualizada a estrutura de pastas para incluir a pasta `config`

5. **`.gitignore`**:
   - Modificado para incluir a exceção do arquivo `.env.example`

6. **`package.json`**:
   - Adicionados scripts para gerenciar facilmente as configurações

## Benefícios das Mudanças

1. **Manutenção Simplificada**: Alterar informações do site em apenas um local
2. **Consistência**: Garante que o nome e URLs do site sejam consistentes em toda a aplicação
3. **Flexibilidade**: Permite substituir configurações via variáveis de ambiente
4. **Documentação**: Código mais limpo e autoexplicativo
5. **Facilidade para Rebrand**: Caso seja necessário mudar o nome do site ou URL, basta alterar em um único local

## Como Utilizar

1. Para desenvolvimento local:
   - Copie `.env.example` para `.env.local` usando `npm run config:setup`
   - Personalize as variáveis conforme necessário

2. Para produção:
   - Configure as variáveis de ambiente no servidor ou plataforma de hospedagem
   - Ou ajuste os valores padrão em `config/site.ts`

3. Para usar as configurações em componentes:
   ```tsx
   import { siteConfig } from "../../config/site";
   
   // Usar em qualquer lugar do código
   <h1>{siteConfig.name}</h1>
   ```
