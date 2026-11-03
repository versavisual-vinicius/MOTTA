# TODO — Portal Barbearia Motta

## Auditoria de 2026-11-03 — prioridade
- [ ] Reconstruir seleções e cálculo do agendamento mobile a partir do estado real; remover datas e valores fixos de demonstração antes de uso operacional.
- [x] Revisar campos do perfil e corrigir avisos React; executar a suíte E2E completa após atualizar os fluxos e expectativas (rotas e perfil 100% verdes).
- [ ] Implementar telas próprias de clube, assinatura e benefícios; validar responsividade desktop contra o PRD.
- [x] Verificar a credencial presente em `.mcp.json`, rotacionar se válida e adotar armazenamento apropriado de segredo.
- [x] Substituir dados pessoais de exemplo por dados fictícios antes de compartilhar o projeto.
- [x] Decidir em revisão Git como retirar `test-results/.last-run.json` do versionamento; a regra de ignore não afeta arquivos já rastreados.
- [ ] Definir contratos de API, autenticação, isolamento de clientes, persistência e testes de integração antes de chamar o protótipo de SaaS.

## Marco anterior (2026-11-03)
Registro histórico, anterior à auditoria acima; não representa validação da interface atual.
- Roteador History API com 10 rotas do PRD + 404 + redirect de #hash legado; store local mockada (`src/app-state.tsx`); telas novas em `src/pages-extra.tsx`; E2E Playwright (`pnpm exec playwright test`, 26 testes).
- CashBarber removido do PRD (SaaS independente).
- Separação de tipos (`src/types.ts`), dados (`src/data.ts`) e componentes (`src/components/ui.tsx`) garantindo Fast Refresh instantâneo sem recarga de página.
- Remoção do `baseUrl` preterido no `tsconfig.json` para compatibilidade com TS 7.0.
- Frontend Design: Cartão Credencial de Membro do Ateliê Motta no Início, tokens canônicos do PRD e números tabulares (`tabular-nums`).
- Paridade Mobile com Figma Make (`.figma/make/mobile/code`):
  - Bottom Navigation translúcida com `backdrop-filter: blur(20px)`, fundo canvas (`#F8F7F3`/94%), 5 destinos e alvos de toque ≥ 48px.
  - Topbar com mini-emblema institucional Motta (verde `#071E13` + tesoura dourada `#C7A566`) e título em DM Serif Display.
  - Voucher Digital Oficial no passo de confirmação com bilhete de atendimento picotado (`ticket-notch-divider`), badge `#MOTTA-...` e QR code SVG para check-in rápido na recepção.
  - Correção de avisos do Tailwind CSS v4 em `.figma/make/mobile/code` (`flex-grow` -> `grow`, `flex-shrink-0` -> `shrink-0`, `bg-gradient-to-*` -> `bg-linear-to-*`, dimensões arbitrárias para classes padronizadas `min-w-14`, `max-w-75`, etc., remoção de conflitos `hidden` / `flex`).
  - 26/26 testes Playwright passando com validação E2E completa.

## Gaps conhecidos
- Home "/" ainda sem cotas reais; páginas Clube/Benefícios/Membership usam dados hardcoded "Black".
- Sino de notificações desabilitado; "Sair" apenas simulado; seletor de unidade ausente (só Sol & Mar).
- ConflictState (409) nunca é disparado no fluxo.
- Fotos/serviços: vários serviços usam a mesma imagem placeholder.
- Auditoria WCAG manual (leitor de tela) pendente.
- Critérios de produção PRD §11.2 (backend, checkout real, login, LGPD, observabilidade).
