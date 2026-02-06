# Product Manager — Frontend Senior Test

# Imagens do projeto
<img width="1367" height="849" alt="Captura de Tela 2026-02-06 às 16 13 44" src="https://github.com/user-attachments/assets/89f98ee5-79f9-4839-bf0e-1110d907ca03" />

<img width="1318" height="863" alt="Captura de Tela 2026-02-06 às 16 15 19" src="https://github.com/user-attachments/assets/a15dab5a-3f9d-4ba0-9503-159d183cdd58" />

<img width="1365" height="790" alt="Captura de Tela 2026-02-06 às 16 16 27" src="https://github.com/user-attachments/assets/28af4dda-9108-4ef2-8fad-09e00ccaa305" />

<img width="447" height="907" alt="Captura de Tela 2026-02-06 às 16 16 53" src="https://github.com/user-attachments/assets/32043986-5ac2-4d20-8bb2-f2227156f30e" />

<img width="1318" height="813" alt="Captura de Tela 2026-02-06 às 16 17 18" src="https://github.com/user-attachments/assets/ca15473e-2375-4061-96ed-fa3ccfd5d59b" />

<img width="1046" height="763" alt="Captura de Tela 2026-02-06 às 16 17 50" src="https://github.com/user-attachments/assets/c01e7106-be19-430d-8eef-ead8b71b2faa" />


Aplicação web de gerenciamento de produtos desenvolvida com **Next.js + Clean Architecture**, focada em boas práticas de engenharia de software, escalabilidade e manutenibilidade.

> Este projeto foi estruturado seguindo princípios de arquitetura utilizados em ambientes de produção real.

---

# Stack utilizada

- **Next.js 15+ (App Router)**
- **TypeScript**
- **Zustand (state management)**
- **MSW (Mock Service Worker)**
- **Tailwind CSS**
- **Zod (validação)**
- **Clean Architecture**
- **Design System próprio**

# Arquitetura

O projeto segue **Clean Architecture + Feature First**, separando responsabilidades em camadas:

```
app/
 ├ domain/        → regras de negócio
 ├ infra/         → comunicação externa (api/msw)
 ├ features/      → lógica por feature
 ├ shared/        → design system + utils
 ├ store/         → estado global
```

### Camadas

**Domain**

- Entidades
- Use cases
- Interfaces de repositório

**Infra**

- Implementações de API
- MSW mock server

**Features**

- Hooks da feature
- Schemas (Zod)
- Componentes específicos

**Shared**

- Design system
- Componentes reutilizáveis
- Modal system
- Cards
- Inputs

# Funcionalidades

### Produtos

- Listagem
- Criação
- Edição
- Remoção com confirmação
- Busca por nome e preço
- Ordenação
- Persistência local

### UX/UI

- Modal com blur e animação
- Toast feedback
- Validação com Zod
- Design system consistente
- Responsivo

# Estratégia de API (Arquitetura Profissional)

Este projeto utiliza uma abordagem híbrida:

## Desenvolvimento local

Utiliza **MSW (Mock Service Worker)**
Intercepta requisições HTTP simulando backend real.

Vantagens:

- Não depende de backend
- Testável
- Isolado
- Simula latência

## Produção (Vercel)

Utiliza **Next API Routes** como fake backend.

Isso permite:

- Deploy funcional sem backend real
- Mesmo contrato de API
- Fácil substituição por backend real futuro

# Gerenciamento de Estado

Utilizado **Zustand com persistência**:

- Estado global de produtos
- Persistência em localStorage
- Sincronização com API mock

Motivo da escolha:

- Simples
- Performático
- Escalável
- Menos boilerplate que Redux

# Design System

Componentes reutilizáveis:

- Button
- Input
- Modal
- Card
- ProductCard
- ConfirmModal

Princípios:

- Single Responsibility
- Reutilização
- Consistência visual
- Fácil manutenção

# Validação

Utilizado **Zod**

Motivos:

- Tipagem segura
- Integração com TS
- Mensagens claras
- Validação client-side robusta

# 📦 Como rodar o projeto

```bash
yarn install
ysrn dev
```

Abrir:

```
http://localhost:3000
```

# Testes

Exemplo de snapshot test incluso:

```
tests/Home.test.tsx
```

Executar:

```bash
yarn test
```

# 🧠 Decisões técnicas

### Por que Clean Architecture?

Separação clara de responsabilidades
Facilita testes e manutenção
Escalável para backend real

### Por que MSW?

Permite desenvolvimento desacoplado
Simula backend real
Padrão usado em empresas grandes

### Por que Zustand?

Menos boilerplate
Alta performance
Escalável
Persistência simples

### Por que Next App Router?

SSR ready
Escalável
Padrão moderno React

#### Foco em:

- Arquitetura escalável
- Código limpo
- Experiência do usuário
- Boas práticas de mercado

# Conclusão

Este projeto demonstra:

- Capacidade de arquitetura frontend
- Organização de código profissional
- Domínio de React/Next
- Boas práticas de engenharia
- Pensamento de produto
