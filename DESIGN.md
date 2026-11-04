<header align="center">
  <p><strong>BARBEARIA MOTTA · PORTAL DO CLIENTE</strong></p>
  <h1>Design System</h1>
  <p>Guia visual e de experiência da versão 2.0</p>
</header>

<hr />

<nav aria-label="Índice do documento">
  <ol>
    <li><a href="#direcao">Direção visual</a></li>
    <li><a href="#cores">Cores</a></li>
    <li><a href="#tipografia">Tipografia</a></li>
    <li><a href="#espacamento">Espaçamento e composição</a></li>
    <li><a href="#componentes">Componentes</a></li>
    <li><a href="#estados">Estados e feedback</a></li>
    <li><a href="#responsividade">Responsividade</a></li>
    <li><a href="#acessibilidade">Acessibilidade</a></li>
    <li><a href="#voz">Voz e conteúdo</a></li>
  </ol>
</nav>

<section id="direcao">
  <h2>1. Direção visual</h2>
  <p>
    O Portal do Cliente da Barbearia Motta combina a tradição de uma barbearia premium com a objetividade de um produto digital de serviço. A experiência deve transmitir <strong>confiança, precisão, hospitalidade e elegância contida</strong>, mantendo as ações principais acima de qualquer recurso decorativo.
  </p>
  <ul>
    <li><strong>Ação antes de decoração:</strong> agendar, consultar cotas e gerenciar reservas são sempre prioridades.</li>
    <li><strong>Elegância contida:</strong> verde profundo, superfícies claras, dourado pontual e composição editorial.</li>
    <li><strong>Clareza financeira:</strong> mensalidade, taxa de reserva, descontos e total nunca são agrupados de forma ambígua.</li>
    <li><strong>Hospitalidade digital:</strong> a interface é acolhedora, direta e segura, sem parecer excessivamente corporativa.</li>
    <li><strong>Consistência:</strong> os mesmos padrões visuais e comportamentais devem existir no desktop e no mobile.</li>
  </ul>
</section>

<section id="cores">
  <h2>2. Cores</h2>

  <h3>Paleta de marca</h3>
  <table>
    <thead>
      <tr><th>Token</th><th>Valor</th><th>Uso</th></tr>
    </thead>
    <tbody>
      <tr><td><code>brand-950</code></td><td><code>#071E13</code></td><td>Sidebar, fundos institucionais e contraste máximo.</td></tr>
      <tr><td><code>brand-900</code></td><td><code>#0B2C1C</code></td><td>Estados ativos e superfícies verdes elevadas.</td></tr>
      <tr><td><code>brand-700</code></td><td><code>#15552D</code></td><td>Botões primários, links e indicadores selecionados.</td></tr>
      <tr><td><code>brand-600</code></td><td><code>#1A6B3A</code></td><td>Ênfase e feedback positivo sobre fundos claros.</td></tr>
      <tr><td><code>brand-100</code></td><td><code>#E6F1E5</code></td><td>Fundos suaves, ícones e badges de benefício.</td></tr>
      <tr><td><code>accent-gold</code></td><td><code>#C7A566</code></td><td>Detalhes premium, plano do cliente e destaques pontuais.</td></tr>
    </tbody>
  </table>

  <h3>Superfícies e neutros</h3>
  <table>
    <thead>
      <tr><th>Token</th><th>Valor</th><th>Uso</th></tr>
    </thead>
    <tbody>
      <tr><td><code>surface-canvas</code></td><td><code>#F8F7F3</code></td><td>Canvas principal acolhedor.</td></tr>
      <tr><td><code>surface-card</code></td><td><code>#FFFFFF</code></td><td>Cards, formulários, modais e topbar.</td></tr>
      <tr><td><code>neutral-950</code></td><td><code>#171B18</code></td><td>Texto principal.</td></tr>
      <tr><td><code>neutral-700</code></td><td><code>#4B544E</code></td><td>Texto secundário.</td></tr>
      <tr><td><code>neutral-500</code></td><td><code>#717B75</code></td><td>Legendas e metadados.</td></tr>
      <tr><td><code>neutral-300</code></td><td><code>#D4DAD4</code></td><td>Bordas, divisores e controles desabilitados.</td></tr>
    </tbody>
  </table>

  <h3>Cores semânticas</h3>
  <ul>
    <li><strong>Sucesso:</strong> <code>#187044</code> — confirmações e benefícios disponíveis.</li>
    <li><strong>Aviso:</strong> <code>#986315</code> — prazos, cotas próximas do fim e atenção.</li>
    <li><strong>Erro:</strong> <code>#B53438</code> — falhas, cancelamentos e validações impeditivas.</li>
    <li><strong>Informação:</strong> <code>#285E88</code> — mensagens neutras e orientações.</li>
  </ul>

  <blockquote>
    <p>O dourado não substitui ações primárias. Ele funciona como assinatura premium e deve ser usado com parcimônia.</p>
  </blockquote>
</section>

<section id="tipografia">
  <h2>3. Tipografia</h2>
  <table>
    <thead>
      <tr><th>Família</th><th>Função</th><th>Aplicação</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>DM Serif Display</strong></td><td>Editorial</td><td>Heroes, títulos especiais, vouchers e estados vazios.</td></tr>
      <tr><td><strong>Inter</strong></td><td>Interface</td><td>Corpo, formulários, navegação, botões, tabelas e dados.</td></tr>
      <tr><td><strong>Plus Jakarta Sans</strong></td><td>Destaque funcional</td><td>Títulos de página e números de alta relevância.</td></tr>
    </tbody>
  </table>

  <h3>Escala recomendada</h3>
  <ul>
    <li><strong>Display:</strong> 32–40 px, entrelinha de 1.05 a 1.18.</li>
    <li><strong>Título de página:</strong> 28–34 px, peso 700, tracking negativo discreto.</li>
    <li><strong>Título de seção:</strong> 20–24 px, peso 600 ou 700.</li>
    <li><strong>Corpo principal:</strong> 16 px / 24 px.</li>
    <li><strong>Corpo secundário:</strong> 14 px / 20 px.</li>
    <li><strong>Label:</strong> 13 px / 18 px, peso 600.</li>
    <li><strong>Legenda:</strong> 12 px / 16 px.</li>
  </ul>

  <p>Evitar caixa alta em textos longos. Caixa alta é reservada para <em>eyebrows</em>, categorias e metadados curtos, com espaçamento entre letras.</p>
</section>

<section id="espacamento">
  <h2>4. Espaçamento e composição</h2>
  <p>A interface usa uma escala baseada em múltiplos de 4 px:</p>
  <table>
    <thead>
      <tr><th>Token</th><th>Valor</th><th>Uso típico</th></tr>
    </thead>
    <tbody>
      <tr><td><code>space-xs</code></td><td>4 px</td><td>Relações muito próximas.</td></tr>
      <tr><td><code>space-sm</code></td><td>8 px</td><td>Ícone e label, campos compactos.</td></tr>
      <tr><td><code>space-md</code></td><td>16 px</td><td>Padding de controles e cards pequenos.</td></tr>
      <tr><td><code>space-lg</code></td><td>24 px</td><td>Cards, grupos de formulário e seções compactas.</td></tr>
      <tr><td><code>space-xl</code></td><td>32 px</td><td>Separação entre seções.</td></tr>
    </tbody>
  </table>
  <ul>
    <li>Conteúdo desktop com largura máxima de <strong>1320 px</strong>.</li>
    <li>Sidebar desktop com <strong>248 px</strong>.</li>
    <li>Gutter de <strong>24–32 px</strong> no desktop e <strong>16 px</strong> no mobile.</li>
    <li>Cards usam raios entre <strong>12 e 24 px</strong>, conforme hierarquia.</li>
    <li>Sombras são suaves e verdes/neutras; nunca devem criar aparência flutuante excessiva.</li>
  </ul>
</section>

<section id="componentes">
  <h2>5. Componentes</h2>

  <h3>Botões</h3>
  <ul>
    <li><strong>Primário:</strong> fundo <code>brand-700</code>, texto branco e altura mínima de 44 px.</li>
    <li><strong>Secundário:</strong> fundo branco, borda neutra e texto verde profundo.</li>
    <li><strong>Destrutivo:</strong> somente em cancelamentos ou exclusões, sempre acompanhado de confirmação.</li>
    <li><strong>Loading:</strong> bloqueia novos cliques, preserva a largura e comunica o progresso.</li>
    <li><strong>Foco:</strong> anel visível de 2 px com contraste suficiente.</li>
  </ul>

  <h3>Cards</h3>
  <ul>
    <li>Usar superfície branca sobre canvas claro, borda sutil e sombra baixa.</li>
    <li>Evitar cards dentro de cards sem necessidade hierárquica.</li>
    <li>Informações acionáveis devem manter título, contexto, status e ação claramente separados.</li>
    <li>Cards de plano podem usar fundos verdes ou escuros, mas preservam contraste AA.</li>
  </ul>

  <h3>Formulários</h3>
  <ul>
    <li>Labels visíveis; placeholder nunca substitui label.</li>
    <li>Altura mínima de 44 px e área de toque de 48 px no mobile.</li>
    <li>Erro próximo ao campo, com texto explicativo e não apenas mudança de cor.</li>
    <li>Dados sensíveis, como CPF, devem aparecer mascarados quando não estiverem em edição.</li>
  </ul>

  <h3>Navegação</h3>
  <ul>
    <li><strong>Desktop:</strong> sidebar persistente e topbar contextual.</li>
    <li><strong>Mobile:</strong> navegação inferior para os quatro destinos principais e drawer para ações secundárias.</li>
    <li>O item atual usa <code>aria-current="page"</code> e diferenciação visual além da cor.</li>
  </ul>

  <h3>Fluxo de agendamento</h3>
  <ol>
    <li>Unidade e serviços.</li>
    <li>Profissional.</li>
    <li>Data e horário.</li>
    <li>Revisão financeira.</li>
    <li>Confirmação e voucher.</li>
  </ol>
  <p>O resumo permanece visível no desktop e recolhível no mobile. O usuário pode retornar às etapas anteriores sem perder escolhas válidas.</p>
</section>

<section id="estados">
  <h2>6. Estados e feedback</h2>
  <table>
    <thead>
      <tr><th>Estado</th><th>Diretriz</th></tr>
    </thead>
    <tbody>
      <tr><td>Carregando</td><td>Skeletons discretos que preservam o espaço do conteúdo; botões exibem progresso.</td></tr>
      <tr><td>Vazio</td><td>Mensagem acolhedora, contexto curto e uma ação principal evidente.</td></tr>
      <tr><td>Erro</td><td>Explicar o problema, preservar dados preenchidos e oferecer recuperação.</td></tr>
      <tr><td>Sucesso</td><td>Confirmar o resultado e indicar a próxima ação relevante.</td></tr>
      <tr><td>Desabilitado</td><td>Reduzir ênfase sem comprometer legibilidade; explicar o motivo quando necessário.</td></tr>
      <tr><td>Conflito de horário</td><td>Informar que o horário ficou indisponível e retornar à seleção com alternativas.</td></tr>
    </tbody>
  </table>
</section>

<section id="responsividade">
  <h2>7. Responsividade</h2>
  <ul>
    <li><strong>Mobile — até 767 px:</strong> coluna única, bottom navigation, áreas de toque de 48 px e safe areas.</li>
    <li><strong>Tablet — 768 a 1199 px:</strong> grids reduzidos, resumo adaptável e navegação compacta.</li>
    <li><strong>Desktop — a partir de 1200 px:</strong> sidebar fixa, topbar, conteúdo amplo e resumos laterais.</li>
  </ul>
  <p>Não reduzir a versão desktop por escala. Cada breakpoint deve reorganizar hierarquia, densidade e fluxo. Conteúdo financeiro e ações críticas nunca podem ficar fora da viewport por posicionamento absoluto.</p>
</section>

<section id="acessibilidade">
  <h2>8. Acessibilidade</h2>
  <ul>
    <li>Conformidade alvo: <strong>WCAG 2.2 AA</strong>.</li>
    <li>Contraste mínimo de 4.5:1 para texto normal e 3:1 para texto grande e componentes.</li>
    <li>Navegação completa por teclado, com ordem de foco previsível.</li>
    <li>Foco visível em links, botões, campos, tabs e controles customizados.</li>
    <li>Alvos de toque de pelo menos 44 × 44 px; preferencialmente 48 × 48 px no mobile.</li>
    <li>Ícones decorativos usam <code>aria-hidden="true"</code>; botões somente com ícone recebem <code>aria-label</code>.</li>
    <li>Mensagens de status importantes são anunciadas por tecnologias assistivas.</li>
    <li>Não comunicar estado exclusivamente por cor, posição ou animação.</li>
    <li>Respeitar <code>prefers-reduced-motion</code>.</li>
  </ul>
</section>

<section id="voz">
  <h2>9. Voz e conteúdo</h2>
  <ul>
    <li><strong>Tom:</strong> elegante, humano, direto e prestativo.</li>
    <li><strong>Idioma:</strong> português do Brasil.</li>
    <li><strong>Moeda:</strong> Real brasileiro, como <code>R$ 70,00</code>.</li>
    <li><strong>Datas:</strong> <code>05/11/2026</code> ou “5 de novembro”.</li>
    <li><strong>Ações:</strong> verbos objetivos — “Agendar horário”, “Reagendar”, “Ver benefícios”.</li>
    <li><strong>Erros:</strong> explicar o que aconteceu e como resolver, sem culpar o usuário.</li>
  </ul>

  <h3>Exemplos canônicos</h3>
  <blockquote>
    <p>“Não encontramos horários para esta data. Escolha outro dia.”</p>
  </blockquote>
  <blockquote>
    <p>“Você não tem agendamentos marcados.”</p>
  </blockquote>
  <blockquote>
    <p>“Agendamento confirmado!”</p>
  </blockquote>
  <p>Evitar jargão interno, promessas vagas, frases promocionais genéricas e textos que escondam regras financeiras.</p>
</section>

<hr />

<footer>
  <p><small>Documento derivado da implementação atual e do PRD v2.0 da Barbearia Motta. Atualizado em novembro de 2026.</small></p>
</footer>
