# Beni Climatização

Site institucional oficial da **Beni Climatização**, referência em instalação, manutenção preventiva/corretiva e higienização de ar-condicionado em Ivoti — Rio Grande do Sul e região.

Desenvolvido em **Astro 6**, **TypeScript**, **Tailwind CSS**, com foco em máxima performance (LCP otimizado), SEO técnico com schema `HVACBusiness` + `FAQPage`, acessibilidade (A11y) e design padrão AAA.

## Estrutura do Projeto

- `src/data/site.ts`: Catálogo centralizado de serviços, dados da empresa, FAQ e configurações de SEO.
- `src/layouts/BaseLayout.astro`: Layout base com metadados sociais, Google Fonts, JSON-LD schema e otimizações de fontes/imagens.
- `src/pages/index.astro`: Página principal estruturada em 16 seções completas.
- `src/scripts/site-interactions.ts`: Controladores de interações (header dinâmico, drawer mobile, modal de orçamento, preview de serviços e accordions).
- `src/styles/global.css`: Design system e utilitários Tailwind/CSS.

## Execução Local

```bash
# Instalar dependências (caso necessário)
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Validar tipagem e integridade Astro
npm run check

# Gerar build estática de produção
npm run build
```
