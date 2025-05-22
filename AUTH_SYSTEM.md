# Sistema de Autenticação do PixOnline

Este documento descreve a arquitetura do sistema de autenticação implementado no PixOnline,
utilizando um padrão de design desacoplado para permitir diferentes provedores de autenticação.

## Arquitetura

O sistema de autenticação é baseado em uma arquitetura de interfaces e implementações, similar ao padrão Strategy,
permitindo a troca fácil entre diferentes provedores de autenticação sem afetar o restante da aplicação.

### Componentes Principais

1. **Interface AuthProvider**:
   - Define os métodos padronizados para autenticação (login, registro, logout, etc.)
   - Localizada em `src/core/auth/AuthProvider.ts`

2. **Implementações de AuthProvider**:
   - **SupabaseAuthProvider**: Implementação usando Supabase Auth
   - **MockAuthProvider**: Implementação para desenvolvimento e testes

3. **Store de Autenticação**:
   - Gerencia o estado de autenticação usando Zustand
   - Escolhe dinamicamente qual provedor de autenticação usar com base nas variáveis de ambiente

4. **Componentes de Guarda**:
   - **AuthGuard**: Protege rotas que requerem autenticação
   - **GuestGuard**: Redireciona usuários autenticados para o dashboard

### Diagrama de Fluxo

```
Usuario -> Interação UI -> useAuthStore -> AuthProvider (Supabase/Mock) -> Autenticação
     ^                                                                        |
     |                                                                        v
     +------------------------------ Estado Atualizado <--------------------+
```

## Como Estender

### Adicionar Novo Provedor de Autenticação

1. Crie uma nova classe que implementa a interface `AuthProvider`
2. Adicione um novo valor ao enum `AuthProviderKey`
3. Registre a nova implementação no arquivo `src/core/container.ts`
4. Configure a variável de ambiente `NEXT_PUBLIC_AUTH_PROVIDER` para usar o novo provedor

Exemplo de nova implementação para OAuth:

```typescript
export class OAuthProvider implements AuthProvider {
  static providerKey = AuthProviderKey.OAUTH;
  
  // Implementar todos os métodos da interface AuthProvider
}
```

### Adicionando Novos Métodos de Autenticação

1. Atualize a interface `AuthProvider` com os novos métodos
2. Implemente os métodos em cada provedor de autenticação
3. Atualize o store `useAuthStore` para expor as novas funcionalidades

## Configuração

O sistema é configurado através das seguintes variáveis de ambiente:

- `NEXT_PUBLIC_AUTH_PROVIDER`: Define qual provedor de autenticação usar
  - Valores: `SUPABASE_AUTH_PROVIDER` ou `MOCK_AUTH_PROVIDER`
- `NEXT_PUBLIC_SUPABASE_URL`: URL do projeto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Chave anônima do Supabase

## Testes

Para desenvolvimento e testes, utilize o `MockAuthProvider` que simula a autenticação sem
necessidade de configuração de serviços externos.

Credenciais de teste:
- Email: `test@example.com`
- Senha: `password123`
