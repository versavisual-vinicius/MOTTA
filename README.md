# Portal do Cliente — Barbearia Motta

Protótipo React, Vite e Tailwind CSS. Os dados e operações são demonstrativos: não há autenticação, API, pagamento ou persistência de produção. O PRD descreve o produto desejado; consulte [TODO.md](./TODO.md) e [AUDITORIA.md](./AUDITORIA.md) para o estado observado.

## Desenvolvimento

Requisitos: Node.js compatível com Vite 8, pnpm e dependências do lockfile. Na pasta do projeto:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

O servidor usa a porta `PORT`, ou `8443` por padrão. No Figma Make ele pode já estar em execução. Comandos de verificação:

```sh
pnpm exec tsc --noEmit
pnpm build
pnpm exec playwright test
```

O Playwright usa Chrome Beta no caminho definido em [playwright.config.ts](./playwright.config.ts); `CHROME_PATH` permite informar outro executável. Os testes usam a porta 5199 e podem reutilizar um servidor existente. A suíte atual possui falhas conhecidas; não interprete resultados históricos como validação da versão atual.

## Organização

- [src/](./src/): aplicação; `App.tsx` monta as rotas e telas ativas, `app-state.tsx` mantém estado em memória, `data.ts` contém dados e rotas, `pages-extra.tsx` reúne páginas adicionais e `components/figma/` contém as telas mobile atuais.
- [public/](./public/): assets servidos diretamente. Preserve os nomes: referências existentes dependem deles.
- [.figma/make/](./.figma/make/): configuração usada pelo Vite e exportações de referência do Figma. O SVG completo não é um asset de produção.
- [e2e/](./e2e/): testes Playwright; há seletores e expectativas da interface anterior que precisam de revisão.
- `dist/`, `node_modules/` e `test-results/`: saída de build, dependências locais e resultados de testes, respectivamente. Não editar manualmente. Um resultado antigo já é rastreado pelo Git; ignorar o diretório não remove esse arquivo do índice.
- [vite.config.ts](./vite.config.ts): configuração e integrações do Figma Make; [PRD.md](./PRD.md) registra requisitos, não garantia de implementação.

Fontes e algumas imagens são carregadas de terceiros. O desenvolvimento de um SaaS real exige, entre outros itens, autenticação, isolamento entre clientes, persistência, validação no servidor e políticas de privacidade.
