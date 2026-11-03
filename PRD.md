# Product Requirement Document (PRD) & Project Brief
## Portal do Cliente — Barbearia Motta VERSAO 2.0

**Versão:** 2.0  
**Status:** Aprovado para Engenharia / Desenvolvimento  
**Data:** Novembro de 2026  
**Produto:** Portal Web do Cliente (Desktop-First com paridade Mobile total)  
**Idioma:** pt-BR  
- **Backend próprio (SaaS independente):** API própria multitenant a definir; no protótipo, dados mockados tipados atrás de uma camada de serviço neutra (`src/services`).

---

## 1. Visão Geral do Produto e Objetivos Estratégicos

### 1.1 Contexto e Problema de Negócio
A **Barbearia Motta** é uma marca de referência em estética masculina tradicional, cuidados de alta precisão e hospitalidade executiva (fundada com legado desde 1978 / 2018). Com unidades físicas estruturadas (ex.: **Unidade Recreio** — Av. das Américas, 16.691 e **Unidade Barra da Tijuca** — Av. Olegário Maciel, 440) e um ecossistema consolidado de assinaturas (**Clube Gold** e **Clube Black**), a operação demandava a superação dos gargalos do agendamento manual via mensagens.

Os principais desafios a sanar no portal do cliente são:
1. **Fricção e Espera no Agendamento:** Eliminar trocas lentas de mensagens, oferecendo reserva imediata com concorrência em tempo real.
2. **Opacidade de Cotas e Benefícios:** Tornar visível e auditável o saldo mensal de serviços inclusos nos planos de assinatura, evitando atritos no caixa.
3. **Clareza Financeira Estrita:** Distinguir com transparência absoluta a mensalidade da assinatura, a taxa de agendamento/reserva por atendimento (ex.: R$ 7,00 quando aplicável ao plano), serviços 100% cobertos e procedimentos avulsos com desconto.
4. **Autonomia do Cliente com Políticas Transparentes:** Permitir reagendamentos e cancelamentos self-service com até 2 horas de antecedência e tolerância de pontualidade de 15 minutos, respeitando regras contra faltas injustificadas (*no-show*).

### 1.2 Princípios de Design e Engenharia (Invariantes de Produto)
O portal é regido por 5 princípios fundamentais:
1. **Ação Antes de Decoração:** Agendar, consultar saldo e gerenciar reservas são ações prioritárias e visíveis de imediato; layouts e fotografias nunca competem com decisões funcionais.
2. **Elegância Contida:** Paleta nobre em verde profundo (`#071E13` e `#0B2C1C`), superfícies acolhedoras em canvas claro (`#F8F7F3`), tipografia editorial refinada (`DM Serif Display`) e interface limpa (`Inter`).
3. **Clareza Financeira Absoluta:** Mensalidade ≠ taxa por agendamento. Serviços inclusos, percentuais de desconto e valores residuais sempre são discriminados antes de qualquer cobrança ou confirmação.
4. **Confiança, Controle e Prevenção de Erros:** Diálogos explícitos para ações irreversíveis, bloqueio de botões em submissão para evitar duplo clique e tolerância a falhas na rede.
5. **Acessibilidade Real (WCAG 2.2 AA):** Contraste rigoroso (mínimo 4.5:1), alvos de toque ≥ 44×44px (48px no mobile), suporte integral a teclado e leitor de tela sem dependência de cor ou hover.

### 1.3 Metas Mensuráveis de Sucesso (KPIs)
- **Tempo de Conclusão de Agendamento:** < 60 segundos do início à emissão do voucher.
- **Taxa de Conflito de Horário (Race Condition):** < 0,1% com mecanismo de lock transitório e tratamento 409 amigável.
- **Adoção Self-Service do Clube Motta:** > 80% das consultas de benefícios e cotas feitas sem acionamento de atendentes humanos.
- **Performance Web (Core Web Vitals):** First Contentful Paint (FCP) < 1,2s, Largest Contentful Paint (LCP) < 2,0s e Cumulative Layout Shift (CLS) < 0,05.

---

## 2. Personas e Cenários de Uso

### Persona 1: O Membro Assinante ("Vinícius")
- **Perfil:** Cliente recorrente (Clube Gold ou Black) que frequenta a barbearia semanal ou quinzenalmente.
- **Necessidades:**
  - Visualizar instantaneamente o próximo horário agendado e a contagem regressiva no Dashboard.
  - Conhecer o saldo de cotas de corte/barba restantes no ciclo mensal antes de expirar a renovação.
  - Reservar horário com seu barbeiro de preferência em sua unidade habitual em menos de 1 minuto.
  - Acessar o voucher e as cortesias do lounge (café especial, chope artesanal, valet cortesia).

### Persona 2: O Cliente Avulso / Não-Assinante ("Gabriel")
- **Perfil:** Cliente esporádico ou novo na região que busca atendimento premium de alta conveniência.
- **Necessidades:**
  - Agendamento simples sem obrigatoriedade inicial de assinatura.
  - Visualização clara dos preços avulsos ao lado da economia projetada caso assine o Clube Motta.
  - Compreensão transparente das taxas e formas de pagamento (na recepção ou online).
  - Onboarding amigável para contratação de planos sem interrupção do agendamento em curso.

### Persona 3: O Cliente com Restrição de Agenda ("Horário Urgente")
- **Perfil:** Executivo com agenda volátil que precisa de encaixe imediato para o mesmo dia ou dia seguinte.
- **Necessidades:**
  - Opção rápida **"Sem preferência"** (qualquer profissional qualificado disponível).
  - Comparação ágil de slots entre a Unidade Recreio e Unidade Barra da Tijuca.
  - Antecedência mínima respeitada (mínimo 10 minutos do horário atual) com confirmação instantânea.

---

## 3. Arquitetura de Informação, Roteamento & Navegação

### 3.1 Mapa de Rotas Oficiais

| Rota | Página / Módulo | Finalidade e Descrição Funcional |
|---|---|---|
| `/` | **Início (Dashboard)** | Próximo agendamento ativo com contagem regressiva, resumo do plano/cotas (ou CTA de contratação caso sem plano ativo), atalhos de agendamento e regalias do lounge. |
| `/agendamentos` | **Meus Agendamentos** | Gestão de reservas com abas separadas (*Agendados* e *Anteriores*), filtros combinados por profissional, unidade e período, e ações contextuais. |
| `/agendamentos/novo` | **Novo Agendamento** | Fluxo guiado em esteira de 5 etapas com validação de filial, profissional, serviços, slots e revisão financeira. |
| `/agendamentos/:id` | **Detalhes do Agendamento** | Ficha completa da reserva: unidade, barbeiro, serviços, valor, status, mapa/GPS, atalho para Concierge, ações de reagendar e cancelar. |
| `/clube` | **Clube Motta & Vantagens** | Painel de controle do membro: ciclo de faturamento, cotas consumidas vs. inclusas, descontos em serviços extras e parcerias homologadas. |
| `/planos` | **Catálogo de Planos** | Comparativo das modalidades Clube Gold e Clube Black, com regras de uso, periodicidade e taxas explicitadas. |
| `/planos/:id` | **Detalhes do Plano** | Especificação aprofundada de um plano específico: franquias inclusas, tabela de descontos, taxas de reserva/adesão e termos de adesão. |
| `/checkout` | **Contratação de Assinatura** | Fluxo seguro de adesão: dados de cobrança, seleção de pagamento (cartão recorrente/Pix) e aceite legal sem taxas ocultas. |
| `/perfil` | **Perfil do Cliente** | Dados cadastrais, identificação com CPF mascarado (LGPD), contatos, endereço e histórico de fidelidade. |
| `/perfil/seguranca` | **Segurança & Notificações** | Gestão de credenciais, autenticação em dois fatores (2FA), sessões ativas e preferências de comunicação (WhatsApp/E-mail). |

### 3.2 Shell de Navegação e Responsividade
- **`AppSidebar` (Desktop ≥ 1200px):**
  - Largura fixa de `248px`, background `brand-950` (`#071E13`), contorno direito sutil.
  - Logotipo institucional oficial no topo.
  - Links de navegação: *Início*, *Agendamentos*, *Clube Motta*, *Planos*, *Perfil* e botão de encerramento de sessão (*Sair*).
  - Item ativo indicado com fundo verde `brand-900` (`#0B2C1C`), acento visual e atributo de acessibilidade `aria-current="page"`.
  - Rodapé com identificação de versão de compilação.
- **`MobileNav` & Drawer (Mobile < 768px):**
  - Barra de navegação inferior compacta com os 4 destinos mais frequentes (*Início*, *Agendamentos*, *Clube*, *Perfil*).
  - Menu lateral convertido em Drawer acessível acionado por botão de menu com foco gerenciado e backdrop modal.
  - Áreas seguras (*safe-area-inset-bottom*) respeitadas para dispositivos iOS e Android.
- **`Topbar` Global:**
  - Identificação de filial contextual (seletor de unidade com endereço), indicador de notificações e avatar/menu do cliente autenticado.

---

## 4. Requisitos Funcionais Detalhados por Módulo

### 4.1 Fluxo de Novo Agendamento (Esteira de 5 Etapas)

O fluxo segue esteira rígida e sequencial com barra de progresso (`Stepper`), permitindo retorno a etapas anteriores e bloqueando avanço em etapas incompletas.

#### Etapa 1 — Unidade e Serviços
- **Seleção de Unidade / Filial:**
  - O cliente seleciona a unidade de atendimento: **Unidade Recreio** (Av. das Américas, 16.691) ou **Unidade Barra da Tijuca** (Av. Olegário Maciel, 440).
  - Unidade padrão sugerida automaticamente a partir da última visita gravada no perfil.
- **Seleção de Serviços:**
  - Cards interativos contendo: nome do serviço, duração estimada em minutos, preço avulso de tabela e preço para membros (ex.: 100% OFF com cota inclusa ou 15% OFF avulso).
  - Suporte a seleção múltipla (ex.: Corte Masculino + Barboterapia + Acabamento).
  - **Validação de Incompatibilidade:** Integração com validação de backend (`POST /:tenant/web/users/check/servicos`). Se dois serviços forem incompatíveis no mesmo atendimento, o sistema emite alerta inline imediato solicitando agendamentos separados.
  - Painel de Resumo persistente no desktop (recolhível no mobile) atualizando em tempo real: lista de itens, tempo total acumulado e subtotal estimado.
  - CTA **Continuar** habilitado apenas com pelo menos 1 serviço válido selecionado.

#### Etapa 2 — Profissional
- **Opção Prioritária "Sem Preferência" / "Qualquer Profissional":**
  - Destacada no topo para clientes que buscam a vaga mais próxima no tempo.
  - O backend resolve o barbeiro automaticamente no momento da escolha do slot (`POST /:tenant/web/users/aleatorio`).
- **Cards de Barbeiros da Unidade:**
  - Listagem dos barbeiros vinculados à filial escolhida com foto/avatar, iniciais, selo de destaque (*Barbeiro Master / Destaque*), avaliação média em estrelas e quantidade de avaliações.
  - Indicação do próximo horário livre de cada profissional para facilitar a escolha.
  - Validação de competência: exibe somente profissionais habilitados para os serviços selecionados na Etapa 1.

#### Etapa 3 — Data e Horário (Calendário e Slots)
- **Calendário Mensal & Fita Rápida de Dias:**
  - Consulta dinâmica de disponibilidade (`POST /:tenant/web/users/disponibilidade/dias`).
  - Bloqueio automático e visualmente nítido de domingos, feriados, folgas e datas sem disponibilidade.
- **Grade de Horários (Slots):**
  - Consulta de horários livres (`POST /:tenant/web/users/disponibilidade/ocupados`).
  - Agrupamento em 3 turnos: *Manhã* (08:00 – 12:00), *Tarde* (12:00 – 18:00) e *Noite* (18:00 – 21:00).
  - **Regra de Antecedência Mínima:** Slots a menos de 10 minutos do horário atual são obrigatoriamente desabilitados pelo frontend e backend.
  - **Tratamento de Vazio:** Caso não existam vagas no dia, apresentar microcopy padronizada: *"Não encontramos horários para esta data. Escolha outro dia."*

#### Etapa 4 — Revisão Financeira e Regras de Negócio
- **Consolidação Transparente dos Dados:**
  - Exibição de: Unidade física com endereço completo, Profissional designado, Data e faixa de horário, Duração total prevista.
- **Discriminação Financeira Estrita:**
  - **Subtotal de Tabela:** Soma dos preços regulares em centavos.
  - **Benefício de Assinatura:** Desconto discriminado (ex.: "Cota do Clube Gold aplicada: -R$ 70,00" ou "Desconto de Membro 15%: -R$ 10,50").
  - **Taxa de Agendamento/Reserva:** Identificada explicitamente (ex.: R$ 7,00) **somente se e quando se aplicar** às regras do plano contratado, nunca embutida disfarçadamente na mensalidade.
  - **Total Líquido:** Valor exato a pagar (R$ 0,00 caso totalmente coberto por cota, ou o valor residual).
- **Opção de Pagamento:**
  - Pagamento direto na recepção/lounge ou cobrança no cartão cadastrado da assinatura.
- **Políticas e Tolerâncias:**
  - Informação explícita: tolerância de até 15 minutos de atraso no comparecimento; cancelamento e reagendamento sem custo com até 2 horas de antecedência.
- **Bloqueio por Ausência Prévia (*No-Show*):**
  - Caso o cliente possua bloqueio ativo por faltas anteriores, exibir data de liberação e instruções de desbloqueio via Concierge.
- **Proteção de Submissão:**
  - Bloqueio imediato do botão (*loading state* desabilitado) para impedir submissões duplicadas no clique.
  - Lock transitório do slot (10 a 15 minutos) garantindo reserva temporária enquanto o usuário revisa.

#### Etapa 5 — Confirmação e Voucher Digital
- **Confirmação Transacional:**
  - Execução bem-sucedida do POST com retorno do identificador oficial (ex.: `#MOTTA-2026-8849`).
  - Microcopy padronizada: *"Agendamento confirmado!"*.
- **Voucher Digital e Hospitalidade:**
  - Card editorial com resumo completo, QR Code para validação na recepção e botão para download de comprovante em PDF.
  - Botões de integração com calendários externos: **Google Agenda** e download de arquivo `.ics` para Apple Calendar e Outlook.
  - Atalho de rota direta via Waze e Google Maps para o endereço da unidade.
  - Apresentação dos mimos do lounge: café especial moído na hora, chope artesanal cortesia para membros e serviço de valet.
  - Atalho direto para falar com o Concierge da unidade via WhatsApp.

---

### 4.2 Gestão de Agendamentos, Histórico e Estados

- **Aba "Agendados" (Futuros):**
  - Lista de agendamentos pendentes ou confirmados em ordem cronológica crescente.
  - Cada card exibe: data com dia da semana, horário de início e término, unidade, barbeiro, serviços, valor final e badge de status.
  - Ações contextuais por card:
    - **Ver Detalhes (`/agendamentos/:id`):** Abre a página dedicada com todas as informações.
    - **Reagendar:** Inicia o fluxo de agendamento com serviços e profissional pré-selecionados, exigindo obrigatoriamente nova escolha de data/hora e confirmação transacional. A reserva original só é substituída após a confirmação bem-sucedida da nova.
    - **Cancelar:** Dispara diálogo modal (`Dialog`) alertando sobre as políticas de prazo (mínimo 2 horas). A confirmação do cancelamento requer aceite explícito.
- **Aba "Anteriores" (Histórico):**
  - Histórico de serviços concluídos ou cancelados, agrupados mensalmente.
  - Ação de **Repetir Agendamento** (recompra rápida) que carrega os mesmos serviços e profissional para nova data.
  - Opção para avaliar o atendimento recebido (avaliação de 1 a 5 estrelas e comentário confidencial).
- **Tratamento de Estado Vazio (*Empty State*):**
  - Quando não houver agendamentos, apresentar ilustração editorial limpa com a mensagem canônica:
    > *"Você não tem agendamentos marcados."*
  - Ação primária imediata: botão **Novo agendamento** em destaque.
  - **Invariante de Voz:** Proibido utilizar frases de gestão interna de salão ou atração de público (ex.: "conquiste mais clientes") no portal do consumidor.

---

### 4.3 Módulo Clube Motta & Gestão de Benefícios

- **Dashboard do Membro Ativo:**
  - Identificação visual do plano atual (**Clube Gold** ou **Clube Black**).
  - Status da assinatura: *Ativa*, *Em processamento*, *Pendente de regularização* ou *Cancelada*.
  - Indicador de ciclo: data de início, data de renovação automática e valor da mensalidade recorrente.
- **Contador Transparente de Cotas:**
  - Gráficos de progresso exibindo serviços inclusos utilizados vs. disponíveis no mês (ex.: 3 de 4 cortes utilizados no ciclo vigente).
  - Proibição estrita de dados fictícios ou incoerentes (ex.: "100 serviços gratuitos").
- **Catálogo Estruturado de Benefícios (4 Categorias Canônicas):**
  1. **Serviços Inclusos na Mensalidade:** Serviços com 100% de desconto na franquia do plano (ex.: Cortes de cabelo e barboterapia regulares).
  2. **Serviços Extras com Desconto:** Procedimentos adicionais com desconto exclusivo de membro (ex.: 15% OFF em coloração, sobrancelha e tratamentos capilares).
  3. **Produtos de Marcas Parceiras:** Desconto exclusivo de 5% a 10% na linha de cosméticos homologados (Red Nek, Don Alcides, B.URB), resgatáveis via cupom digital na barbearia.
  4. **Regalias do Lounge & Hospitalidade:** Chopp artesanal liberado durante o atendimento, café expresso gourmet e valet cortesia.
- **Tratamento para Não-Assinantes:**
  - Usuários sem plano ativo visualizam o hero promocional convidativo:
    > *"Você ainda não tem um plano ativo. Conheça o Clube Motta e aproveite os benefícios exclusivos."*
  - CTA direto para `/planos`. Nunca simular planos ativos para clientes que não os possuem.
- **Fluxo de Cancelamento Orientado a Valor:**
  - Gestão de assinatura com exibição transparente de cotas remanescentes até o fim do ciclo pago.
  - Informação clara sobre ausência de taxas de fidelidade ou multas de rescisão.

---

### 4.4 Catálogo de Planos e Checkout de Assinatura

- **Catálogo de Assinaturas (`/planos`):**
  - **Modalidades Clube Gold:** Planos Gold 1, Gold 2 e Gold 3 estruturados por frequência mensal (1, 2 ou 3 cortes/mês), descontos de 15% em serviços extras e taxa de agendamento discriminada.
  - **Modalidades Clube Black:** Planos Black Corte Ilimitado e Black Total (Corte & Barba Ilimitados), com intervalo mínimo regulamentar entre visitas (ex.: 48h) e taxa de agendamento por atendimento explicitada.
  - Destaques éticos: selos de *"Mais Escolhido"* ou *"Vagas Limitadas"* somente quando suportados por dados reais de capacidade das unidades.
- **Detalhes do Plano (`/planos/:id`):**
  - Detalhamento de todas as cláusulas contratuais, franquias, taxas de ativação (quando houver) e política de renovação.
- **Fluxo de Checkout Transacional (`/checkout`):**
  1. **Resumo da Contratação:** Valor da mensalidade, data da primeira cobrança, taxa de ativação (se houver) e resumo dos benefícios inclusos.
  2. **Dados Cadastrais e Faturamento:** CPF do titular, endereço de cobrança e telefone para confirmações.
  3. **Formas de Pagamento:** Cartão de crédito recorrente (sem travar o limite total anual) e Pix com confirmação instantânea.
  4. **Aceite Legal:** Checkbox obrigatório de ciência dos termos de renovação mensal e política de cancelamento.
  5. **Processamento:** Indicador de carregamento visual desabilitando novas tentativas durante a requisição ao gateway.
  6. **Retorno Claro:** Telas de *Aprovado* (com ativação imediata das cotas), *Pendente/Em Análise* (*"Seu pagamento está em análise."*) ou *Recusado* (com motivo amigável e opção de trocar método de pagamento).

---

### 4.5 Perfil do Cliente, Segurança e Comunicação

- **Identificação e Contato (`/perfil`):**
  - Dados pessoais: Nome completo, data de nascimento e gênero (opcional).
  - Proteção e Mascaramento LGPD: CPF mascarado na interface (`***.456.789-**`) para evitar vazamentos visuais em telas públicas.
  - Telefone celular com máscara pt-BR `(XX) XXXXX-XXXX` e e-mail com indicador de verificação.
  - Endereço completo com autopreenchimento por CEP.
- **Segurança da Conta (`/perfil/seguranca`):**
  - Alteração de senha com validador visual de força (mínimo 8 caracteres, maiúsculas, minúsculas, números e caracteres especiais).
  - Autenticação em Dois Fatores (2FA) via SMS/WhatsApp com toggle ativador.
  - Painel de sessões ativas e botão para desconectar outros dispositivos.
- **Preferências de Notificação:**
  - Configuração de canais autorizados: Lembretes automáticos via WhatsApp e E-mail (24h e 2h antes do atendimento).
  - Avisos de renovação de cotas do Clube e promoções exclusivas do lounge.

---

## 5. Diretrizes de Design, UI Tokens & Componentes

Baseado na especificação oficial de tokens (`tokens.css`) e no Design System da Barbearia Motta:

### 5.1 Paleta de Cores e Tokens CSS

```css
:root {
  /* Identidade da Marca (Brand) */
  --brand-950: #071E13; /* Sidebar nobre e áreas mais escuras */
  --brand-900: #0B2C1C; /* Hero premium, fundos nobres */
  --brand-800: #123D26; /* Hover de botões escuros, gradientes */
  --brand-700: #15552D; /* Botão primário oficial (texto branco) */
  --brand-600: #1A6B3A; /* Destaques interativos em canvas claro */
  --brand-100: #E6F1E5; /* Badges de sucesso e fundos de desconto */
  --brand-50:  #F2F7EF; /* Fundo sutil de ícones e acentos */

  /* Tons Neutros de Interface */
  --neutral-950: #171B18; /* Tipografia principal */
  --neutral-700: #4B544E; /* Tipografia secundária e labels de apoio */
  --neutral-500: #717B75; /* Metadados, legendas e placeholders */
  --neutral-300: #D4DAD4; /* Linhas de contorno e bordas sutis */
  --neutral-100: #F3F4F1; /* Superfícies auxiliares desabilitadas */

  /* Superfícies Estruturais */
  --surface-canvas: #F8F7F3; /* Fundo acolhedor geral do portal */
  --surface-card:   #FFFFFF; /* Cartões, modais e containers */

  /* Acentos de Linha e Clubes */
  --accent-gold:  #C7A566; /* Destaque nobre para a linha Clube Gold */
  --accent-black: #1D1D1C; /* Acento premium para a linha Clube Black */

  /* Feedback Semântico */
  --semantic-success: #187044; /* Confirmações e horários concluídos */
  --semantic-warning: #986315; /* Alertas de antecedência e vagas escassas */
  --semantic-danger:  #B53438; /* Ações destrutivas, cancelamentos e erros */
  --semantic-info:    #285E88; /* Mensagens contextuais e informativas */
}
```

> **Regra de Ouro Visual:** Nunca utilizar verde-claro com texto branco em botões primários, garantindo contraste mínimo de 4.5:1 exigido pela WCAG 2.2 AA.

### 5.2 Tipografia Oficial e Hierarquia

| Estilo | Fonte | Desktop | Mobile | Peso / Altura de Linha | Aplicação |
|---|---|---|---|---|---|
| **Display** | `DM Serif Display` | 40px | 32px | Regular (400) / 1.15 | Títulos de heros e saudações principais |
| **H1** | `DM Serif Display` | 34px | 28px | Regular (400) / 1.20 | Título de página e seções de destaque |
| **H2** | `DM Serif Display` | 26px | 23px | Regular (400) / 1.25 | Cabeçalhos de cards e etapas do stepper |
| **H3** | `Inter` | 20px | 19px | SemiBold (600) / 1.30 | Subtítulos e nomes de serviços |
| **Body** | `Inter` | 16px | 16px | Regular (400) / 1.50 | Texto de leitura corrente e descrições |
| **Body Small** | `Inter` | 14px | 14px | Regular (400) / 1.45 | Detalhes secundários e resumos laterais |
| **Label** | `Inter` | 13px | 13px | SemiBold (600) / 1.35 | Rótulos de formulário e filtros |
| **Caption** | `Inter` | 12px | 12px | Regular (400) / 1.40 | Metadados, datas auxiliares e notas de rodapé |

- **Números e Valores Monetários:** Obrigatoriamente com a propriedade CSS `font-variant-numeric: tabular-nums` para alinhamento uniforme em colunas e resumos financeiros.
- **Proibições:** Proibido o uso de fontes serifadas em campos de entrada, botões ou textos explicativos longos.

### 5.3 Espaçamentos, Dimensões e Raios

- **Escala de Espaçamento (Base 4px):**
  - `--space-1`: 4px | `--space-2`: 8px | `--space-3`: 12px | `--space-4`: 16px
  - `--space-5`: 20px | `--space-6`: 24px | `--space-8`: 32px | `--space-10`: 40px
  - `--space-12`: 48px | `--space-16`: 64px
- **Raios de Curvatura:**
  - `--radius-field`: 12px (Campos de entrada e selects)
  - `--radius-button`: 12px (Botões de ação primária e secundária)
  - `--radius-card`: 18px (Cartões de serviços, profissionais e agendamentos)
  - `--radius-hero`: 24px (Banners principais e heros)
  - `--radius-pill`: 999px (Badges de status, tags e pills de filtro)
- **Sombras de Elevação:**
  - `--shadow-card`: `0 8px 28px rgba(10, 30, 19, 0.07)`
  - `--shadow-elevated`: `0 18px 48px rgba(10, 30, 19, 0.12)`
- **Alvos de Clique Mínimos:** Mínimo de 44×44px no desktop e 48×48px no mobile.

### 5.4 Biblioteca de Componentes Canônicos

1. **`Button`:**
   - Variantes: `primary` (fundo `brand-700`, hover `brand-800`), `secondary` (contorno neutro e hover sutil), `ghost` (sem contorno para ações secundárias), `destructive` (fundo `semantic-danger` para confirmação de cancelamento).
   - Estados: `default`, `hover`, `active`, `focus-visible`, `loading` (com spinner acessível), `disabled`.
2. **`Stepper`:**
   - Indicador sequencial com número da etapa, linha conectora e ícone de check (`Check`) para etapas validadas. Bloqueia salto direto para etapas à frente.
3. **`StatusBadge`:**
   - Badges para agendamentos: *Confirmado* (fundo `brand-100`, texto `semantic-success`), *Pendente*, *Concluído*, *Cancelado*. Sempre associando símbolo visual + texto descritivo.
4. **`PriceBlock`:**
   - Preço atual em destaque tipográfico, preço de tabela riscado (quando com desconto de membro), discriminação de taxa de agendamento e unidade de periodicidade.
5. **`Dialog` Modal:**
   - Foco retido no container, fechamento via tecla `Escape` ou clique no backdrop, título semântico e botões de confirmação/cancelamento explícitos.
6. **`EmptyState`:**
   - Ícone suave, título objetivo, texto descritivo acolhedor e CTA dominante.

---

## 6. Dicionário Oficial de Microcopy

Comunicação em **pt-BR**, polida, assertiva e livre de jargões técnicos:

| Contexto / Cenário | Microcopy Oficial Padronizada |
|---|---|
| **Sem Agendamentos Ativos** | *"Você não tem agendamentos marcados."* |
| **Sem Vagas na Data** | *"Não encontramos horários para esta data. Escolha outro dia."* |
| **Concorrência / Slot Ocupado** | *"Este horário acabou de ficar indisponível. Escolha outro horário."* |
| **Reserva Confirmada** | *"Agendamento confirmado!"* |
| **Falha ao Gravar Dados** | *"Não foi possível salvar suas alterações. Tente novamente."* |
| **Sem Assinatura Ativa** | *"Você ainda não tem um plano ativo."* |
| **Pagamento em Processamento** | *"Seu pagamento está em análise."* |
| **Diálogo de Cancelamento** | *"Deseja cancelar este agendamento? Confira as condições antes de confirmar."* |
| **Tolerância de Chegada** | *"Tolerância de 15 minutos de atraso para o seu atendimento."* |
| **Regra de Cancelamento** | *"Cancelamento sem custo permitido até 2 horas antes do horário marcado."* |

---

## 7. Contratos de Dados de Interface (Modelos TypeScript)

Para garantir integridade arquitetural entre frontend e backend, os modelos operam com valores monetários em centavos de Real (`Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })` aplicado somente na renderização visual):

```ts
/** Unidade física da barbearia */
export interface Branch {
  id: number;
  name: string;
  neighborhood: string;
  address: string;
  phone: string;
  isActive: boolean;
}

/** Especialista / Barbeiro */
export interface Barber {
  id: string; // ID numérico ou 'random' para "Sem preferência"
  name: string;
  initials: string;
  avatarUrl?: string;
  branchId: number;
  isFeatured?: boolean;
  rating: number;
  reviewCount: number;
  specialties: string[];
}

/** Procedimento / Serviço oferecido */
export interface Service {
  id: number;
  name: string;
  durationMinutes: number;
  priceCents: number; // Preço avulso regular em centavos (ex.: 7000 = R$ 70,00)
  memberPriceCents: number; // Preço com plano ou 0 se coberto por cota
  isPopular?: boolean;
  description?: string;
  category: 'corte' | 'barba' | 'combo' | 'estetica';
}

/** Slot de horário na agenda */
export interface TimeSlot {
  startsAt: string; // ISO 8601 com offset regional
  endsAt: string;
  isAvailable: boolean;
  shift: 'morning' | 'afternoon' | 'evening';
}

/** Ficha completa de Agendamento */
export interface Appointment {
  id: string; // Ex.: "MOTTA-2026-8849"
  startsAt: string; // ISO 8601
  endsAt: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  branch: Branch;
  barber: Barber;
  services: Service[];
  totalCents: number;
  discountCents: number;
  bookingFeeCents: number; // Taxa de agendamento (ex.: 700 = R$ 7,00 quando houver)
  netAmountCents: number;
  paymentMethod: 'reception' | 'subscription_card' | 'pix';
  canCancel: boolean;
  canReschedule: boolean;
  cancellationDeadline: string;
}

/** Benefício associado a um plano */
export interface Benefit {
  id: string;
  title: string;
  kind: 'included' | 'service_discount' | 'product_discount' | 'perk';
  discountPercent?: number;
  monthlyLimit?: number; // Ex.: 4 cortes no mês
  remainingUses?: number; // Saldo de cotas não consumidas
  description: string;
}

/** Plano de Assinatura do Clube Motta */
export interface Plan {
  id: string;
  name: string;
  tier: 'gold' | 'black';
  monthlyPriceCents: number;
  activationFeeCents?: number;
  bookingFeeCents?: number; // Taxa cobrada por atendimento agendado
  minIntervalHours?: number; // Para planos ilimitados Black (ex.: 48h entre atendimentos)
  benefits: Benefit[];
  isAvailable: boolean;
  featuredBadge?: string;
}
```

---

## 8. Requisitos Não Funcionais & Engenharia

### 8.1 Performance e Carregamento
- **Métricas:** FCP < 1,2s; LCP < 2,0s; CLS < 0,05 em redes 4G estáveis.
- **Estratégia de Assets:** Fotografias em formatos modernos comprimidos (WebP e AVIF com srcset responsivo), ícones vetoriais SVG inline e fontes com `font-display: swap`.
- **Bundle Limpo:** Zero bibliotecas visuais pesadas desnecessárias; uso de CSS baseado em tokens nativos e componentes desacoplados.

### 8.2 Segurança, LGPD e Privacidade
- **Mascaramento Protetivo:** CPF exibido com mascaramento obrigatório (`***.456.789-**`) e cartões salvos exibindo apenas os 4 últimos dígitos (`•••• 4242`).
- **Sanitização:** Bloqueio de logs contendo tokens de sessão, credenciais ou dados pessoais sensíveis no console do cliente.
- **Autenticação Segura:** Sessão com tokens JWT renovados via rota `/auth/refresh` e expiração controlada com redirecionamento limpo para o login.

### 8.3 Resiliência e Concorrência de Horários
- **Lock Transitório de Vagas:** Bloqueio atômico temporário do slot selecionado por 10 a 15 minutos a partir da entrada na Etapa 4 (Revisão).
- **Tratamento Elegante de Conflito (409 Conflict):** Se dois usuários confirmarem simultaneamente o mesmo slot, a requisição concorrente recebe mensagem humanizada (*"Este horário acabou de ficar indisponível. Escolha outro horário."*), mantendo filial, profissional e serviços preservados no formulário para nova escolha de data sem perda de contexto.
- **Idempotência de Agendamento:** Desabilitação instantânea do botão de confirmação acompanhada de indicador de carregamento para inviabilizar requisições duplicadas.

### 8.4 Integrações Externas e Arquitetura de API
- **Backend próprio (SaaS independente):** API própria multitenant a definir; no protótipo, dados mockados tipados atrás de uma camada de serviço neutra (`src/services`).
- **Sincronização de Calendários:** Geração de deep-links do Google Calendar e download de payloads de eventos `.ics` compatíveis com Apple iCal e Microsoft Outlook.
- **Notificações Transacionais:** Disparos automatizados via WhatsApp Business API e Webhooks para confirmação e lembretes com 24h e 2h de antecedência.

---

## 9. Matriz de Estados Obrigatórios por Componente

| Módulo / Componente | Estados Mínimos Requeridos para Aceite |
|---|---|
| **Listagem de Agendamentos** | `Carregando (Skeleton)` • `Com dados` • `Vazio (EmptyState)` • `Erro de API` • `Sem resultados de busca` |
| **Seletor de Horários (Slots)** | `Carregando` • `Disponível` • `Selecionado` • `Esgotado/Indisponível` • `Expirado (<10 min)` • `Erro de concorrência (409)` |
| **Ficha de Reserva** | `Confirmada` • `Pendente` • `Concluída` • `Cancelada` • `Reagendamento em curso` |
| **Cards de Planos** | `Disponível` • `Plano Atual` • `Vagas Esgotadas` • `Carregando` |
| **Checkout de Assinatura** | `Preenchimento` • `Validando dados` • `Processando gateway` • `Sucesso (Ativado)` • `Em análise` • `Recusado (Erro de cartão)` |
| **Campos de Formulário** | `Default` • `Hover` • `Foco ativo (Outline 2px)` • `Preenchido com sucesso` • `Inválido (Erro inline)` • `Desabilitado` |
| **Notificações e Diálogos** | `Toast informativo não crítico` • `Alerta inline crítico` • `Diálogo modal destrutivo` |

---

## 10. Checklist de Aceite e Critérios de Qualidade (Handoff)

Para homologação e aceite do portal em produção:
- [ ] **Paridade de Design:** Todas as telas utilizam estritamente os tokens de `tokens.css`, paleta oficial e tipografia com tabular-nums nos valores.
- [ ] **Validação de Filial:** É possível selecionar e alternar entre a Unidade Recreio e Unidade Barra da Tijuca, com profissionais e horários atualizados dinamicamente.
- [ ] **Validação de Incompatibilidade:** A esteira rejeita combinações de serviços conflitantes com aviso orientador.
- [ ] **Antecedência e Ausência:** O motor impede agendamentos com menos de 10 minutos de antecedência e valida clientes com bloqueio de *no-show*.
- [ ] **Transparência de Taxas:** A mensalidade está rigorosamente separada da taxa de reserva de R$ 7,00 (quando aplicável ao plano).
- [ ] **Cotas Reais do Clube:** O saldo mensal de cotas do assinante bate exatamente com os atendimentos realizados no ciclo.
- [ ] **Prevenção de Duplo Clique:** Botões de envio entram em loading e desabilitam no primeiro clique.
- [ ] **Responsividade Testada:** Fluxo completo operável em desktop (1320px), tablet (768px) e smartphones (375px a 414px) com drawer e safe area.
- [ ] **Acessibilidade WCAG 2.2 AA:** Navegação de ponta a ponta funcional exclusivamente via teclado (Tab/Shift+Tab/Enter/Space/Esc) com foco visível.
- [ ] **Segurança e LGPD:** CPF devidamente mascarado em telas de resumo e dados sensíveis omitidos do console de desenvolvimento.

---

## 11. Plano de Validação — UX, Acessibilidade, Integração e QA

### 11.1 Cenários Críticos

| ID | Cenário | Resultado esperado |
|---|---|---|
| AG01 | Continuar sem selecionar serviço | Impedir avanço e orientar seleção |
| AG02 | Selecionar múltiplos serviços | Total/duração recalculados corretamente |
| AG03 | Continuar sem barbeiro | Impedir avanço |
| AG04 | Escolher data futura e horário | Exibir resumo fiel às seleções |
| AG05 | Confirmar sem aceite da demonstração | Impedir conclusão |
| AG06 | Confirmar com aceite | Criar item local e mostrar sucesso |
| AG07 | Reagendar item | Preservar serviços e profissional; pedir nova data |
| AG08 | Cancelar item | Solicitar confirmação e mover ao histórico |
| AS01 | Selecionar plano | Exibir nome e preço correspondente |
| AS02 | Checkout sem aceite | Impedir simulação |
| AS03 | Confirmar checkout com aceite | Ativar estado simulado sem enviar pagamento |
| PR01 | Atualizar perfil | Atualizar interface na sessão; sem servidor |
| RS01 | Reduzir a 375 px | Layout em coluna única e navegação inferior |
| AC01 | Navegação só por teclado | Controles com foco visível e acessíveis |
| AC02 | `prefers-reduced-motion` | Remover efeitos animados intensos |

### 11.2 Critérios de Aceite Antes de Produção

1. Dados reais de agenda e preço consultados do backend próprio; conflitos evitados transacionalmente.
2. Cotação do carrinho com identificador e expiração, taxas explícitas e confirmação do preço no servidor.
3. Checkout com provedor certificado e webhook seguro; idempotência; nenhum dado financeiro no frontend próprio.
4. Login real, autorização por recurso, consentimento LGPD e políticas de retenção.
5. Logs e métricas sem PII desnecessária; monitoramento de erro e desempenho.
6. E2E em mobile e desktop, testes manuais por teclado/leitor de tela e auditoria WCAG 2.2 AA.
7. Revisão de conteúdo e condições comerciais com a Barbearia Motta.
