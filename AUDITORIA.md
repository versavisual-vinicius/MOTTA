# Auditoria de organização e estado — 3 de novembro de 2026

Esta é uma auditoria de estrutura, configuração e pontos críticos da implementação, não uma revisão linha a linha de todas as dependências, imagens, exportações ou código gerado. Os arquivos existentes foram preservados. Tamanhos aproximados no ambiente local: `.figma/make/` 20 MB; `dist/` 19 MB; `node_modules/` 100 MB; `public/` 18 MB; `src/` 752 KB.

## Prioridade alta

1. **Fluxo de agendamento:** [BookingFlow.tsx](./src/components/figma/BookingFlow.tsx) inicializa serviço, profissional, data e horário fixos. Os seletores dessas variáveis não são chamados pela interface observada; confirmação grava valor e duração fixos em memória. A aparência de escolha não comprova uma reserva real.
2. **Dados e segurança:** [app-state.tsx](./src/app-state.tsx) contém dados de perfil preenchidos e estado em memória. Não usar dados pessoais reais como seed nem publicar o protótipo como produto operacional. [`.mcp.json`](./.mcp.json) contém um valor com formato de credencial em configuração versionada; verificar se é válido, revogar/rotacionar caso seja, e migrar para um mecanismo de segredo apropriado. Não repetir o valor em documentação.
3. **Documentação versus implementação:** [PRD.md](./PRD.md) é um alvo de produto; cita `src/services`, ausente no checkout. [App.tsx](./src/App.tsx) renderiza a mesma tela inicial nas rotas de clube, assinatura e benefícios; o shell ativo também é limitado a 430 px. Não afirmar paridade funcional ou desktop com base no PRD.
4. **Testes:** na execução parcial de 03/11/2026, 10 testes passaram, o deep link de perfil falhou por campos React com `value` sem `onChange` ou `readOnly`, e a execução foi interrompida no teste seguinte; 14 não rodaram. A suíte contém expectativas da interface anterior, inclusive no fluxo de agendamento. Corrigir os fluxos e atualizar os testes com base no comportamento esperado antes de declarar a suíte verde.

## Organização por área

| Área | Papel e observação |
| --- | --- |
| `src/` | Fonte principal. Telas exportadas têm arquivos extensos e controles estáticos; separar gradualmente por fluxo após definir contratos e testes, sem reescrita mecânica. |
| `public/assets/` | 458 arquivos (401 SVG e 57 PNG). Alguns nomes são opacos ou parecem variantes; dependências dinâmicas impedem concluir que arquivos não referenciados podem ser excluídos. |
| `.figma/make/` | Seis arquivos de configuração e referência. `site.json` é importado pelo Vite; os quatro arquivos mobile são material de referência, inclusive um SVG grande. |
| `e2e/` | Uma suíte de 26 testes com contratos parcialmente desatualizados. A configuração local depende de caminho específico de navegador, com opção `CHROME_PATH`. |
| `dist/` | Saída regenerável de build, ignorada pelo Git; inclui cópias dos assets públicos. Não é fonte. |
| `node_modules/` | Dependências instaladas, ignoradas pelo Git; não revisar nem alterar pacotes instalados como código do produto. |
| `test-results/` | Saída de execução. Ignorada para novos arquivos; `.last-run.json` já é rastreado e permanece no índice até uma decisão explícita de removê-lo. |
| Configuração e documentos da raiz | `package.json` e lockfile definem dependências; `tsconfig.json` verifica fontes e configuração Vite; `index.html` carrega fontes externas; `CLAUDE.md` aponta para `AGENTS.md`. |

## Verificações e limites

- `pnpm exec tsc --noEmit`: passou.
- `pnpm build`: passou na alteração anterior, com aviso de chunk JavaScript acima de 500 kB.
- A verificação parcial de Playwright acima não equivale à execução completa nem a uma auditoria de acessibilidade ou segurança.
- Nenhum asset, dependência, exportação ou arquivo rastreado foi removido. O resultado rastreado anterior foi restaurado após o Playwright recriá-lo; diagnósticos gerados pela execução permanecem em `test-results/`.
