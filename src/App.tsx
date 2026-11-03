import { useEffect, useMemo, useRef, useState } from "react"
import { StoreProvider, useRouter, useStore } from "./app-state"
import { CancelAppointmentModal, PageHeading, Toggle } from "./components/ui"
import { FigmaHeader } from "./components/figma/FigmaHeader"
import { FigmaBottomNav } from "./components/figma/FigmaBottomNav"
import { HomeScreen } from "./components/figma/HomeScreen"
import { AgendamentosScreen } from "./components/figma/AgendamentosScreen"
import { PlanosScreen } from "./components/figma/PlanosScreen"
import { PerfilScreen } from "./components/figma/PerfilScreen"
import { BookingFlow } from "./components/figma/BookingFlow"
import {
  A,
  canModify,
  fmtLong,
  iso,
  money,
  plans,
  professionals,
  serviceLabel,
  services,
  startsAt,
  upcomingDays,
} from "./data"
import {
  AppointmentDetailPage,
  CheckoutPage,
  HomePage,
  NotFoundPage,
  PlanDetailPage,
  SecurityPage,
} from "./pages-extra"
import type { Appointment, Navigate, Page } from "./types"

const navItems: { id: Page; label: string; icon: string }[] = [
  { id: "home", label: "Início", icon: "9206d.svg" },
  { id: "appointments", label: "Agendamentos", icon: "40bc9.svg" },
  { id: "membership", label: "Clube Motta", icon: "e3af7.svg" },
  { id: "plans", label: "Planos", icon: "fbe04.svg" },
  { id: "profile", label: "Perfil", icon: "e77a8.svg" },
]

function Sidebar({ page, onNavigate }: { page: Page; onNavigate: Navigate }) {
  const { notify } = useStore()
  const section = (id: Page) =>
    id === page ||
    (id === "membership" && (page === "benefits" || page === "club")) ||
    (id === "appointments" && (page === "booking" || page === "appointment")) ||
    (id === "plans" && (page === "plan" || page === "checkout")) ||
    (id === "profile" && page === "security")
  return (
    <aside className="sidebar">
      <button
        className="brand"
        onClick={() => onNavigate("home")}
        aria-label="Ir para o início"
      >
        <img src={`${A}/motta-transparente.png`} alt="Barbearia Motta" />
      </button>
      <button className="new-booking" onClick={() => onNavigate("booking")}>
        ＋ Novo agendamento
      </button>
      <nav aria-label="Navegação principal">
        {navItems.map((item) => (
          <button
            key={item.id}
            aria-label={item.label}
            aria-current={section(item.id) ? "page" : undefined}
            className={section(item.id) ? "active" : ""}
            onClick={() => onNavigate(item.id)}
          >
            <img src={`${A}/${item.icon}`} alt="" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="side-foot">
        <button onClick={() => onNavigate("profile")}>
          <span>♙</span> Perfil
        </button>
        <button
          onClick={() =>
            notify("Demonstração: não há login real; sessão não encerrada.")
          }
        >
          <span>↪</span> Sair
        </button>
      </div>
    </aside>
  )
}

function Topbar({ page, onNavigate }: { page: Page; onNavigate: Navigate }) {
  const { profile, plan } = useStore()
  const current = plans.find((p) => p.id === plan)
  return (
    <header className="topbar">
      <div
        className="mobile-brand-emblem"
        onClick={() => onNavigate("home")}
        role="button"
        tabIndex={0}
        aria-label="Ir para o início"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onNavigate("home")
        }}
      >
        <div className="emblem-box">
          <span className="emblem-icon">✂</span>
        </div>
        <div className="emblem-text">
          <strong>Motta</strong>
          <small>Portal do Cliente</small>
        </div>
      </div>
      <div className="breadcrumbs">
        {page === "booking" ? "AGENDAMENTOS  ›  " : ""}
        <strong>
          {page === "booking" ? "NOVO AGENDAMENTO" : "PORTAL DO CLIENTE"}
        </strong>
      </div>
      <div className="top-actions">
        {page === "booking" && (
          <span className="location">▣ Unidade Sol &amp; Mar</span>
        )}
        <button
          className="bell"
          aria-label="Notificações: nenhuma nova"
          disabled
          title="Sem notificações nesta demonstração"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8a6 6 0 0 0-12 0c0 7-2.5 7-2.5 8.5h17C20.5 15 18 15 18 8Z" />
            <path d="M10 20a2 2 0 0 0 4 0" />
          </svg>
        </button>
        <button
          className="user-chip"
          aria-label="Abrir meu perfil"
          onClick={() => onNavigate("profile")}
        >
          <img src={`${A}/49533.png`} alt="" />
          <span>
            {profile.name}
            <small>
              {current ? `Membro ${current.name}` : "Sem plano ativo"}
            </small>
          </span>
          <b>⌄</b>
        </button>
      </div>
    </header>
  )
}

function ClubPage({ navigate }: { navigate: (p: Page) => void }) {
  const products = [
    {
      name: "Red Nek",
      note: "Produtos masculinos com alta performance e estilo.",
      image: "f3adb.png",
    },
    {
      name: "Don Alcides",
      note: "Cuidados completos para barba, cabelo e pele.",
      image: "effbc.png",
    },
    {
      name: "B.URB",
      note: "Beleza e bem-estar masculino com inovação.",
      image: "3facd.png",
    },
  ]
  return (
    <>
      <PageHeading
        eyebrow="CLUBE MOTTA"
        title="Produtos e benefícios"
        description="Aproveite descontos exclusivos em produtos selecionados e benefícios extras para cuidar do seu estilo."
      />
      <div className="subnav">
        <button className="selected">◇ Produtos e benefícios</button>
        <button onClick={() => navigate("benefits")}>▱ Meu plano</button>
        <button onClick={() => navigate("appointments")}>
          □ Meus agendamentos
        </button>
        <button onClick={() => navigate("profile")}>♙ Editar perfil</button>
      </div>
      <section className="club-hero">
        <div>
          <small>SEU PLANO</small>
          <h2>Clube Motta</h2>
          <p>
            Descontos em produtos e benefícios exclusivos para cuidar do seu
            estilo.
          </p>
          <span className="status">● Ativo</span>
        </div>
        <img
          src={`${A}/41114.png`}
          alt="Produtos de barbearia e cuidados masculinos"
        />
      </section>
      <section>
        <div className="section-title">
          <div>
            <h2>Descontos em produtos</h2>
            <p>Produtos de marcas parceiras para o seu cuidado diário.</p>
          </div>
          <button disabled title="Indisponível no momento">
            Ver todos os produtos parceiros →
          </button>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.name}>
              <div>
                <strong>{product.name}</strong>
                <span>{product.note}</span>
                <em>5% OFF</em>
              </div>
              <img
                src={`${A}/${product.image}`}
                alt={`Produtos ${product.name}`}
              />
            </article>
          ))}
        </div>
      </section>
      <section>
        <div className="section-title">
          <div>
            <h2>Outros benefícios do seu plano</h2>
            <p>
              Vantagens exclusivas que trazem mais praticidade, conforto e
              prioridade.
            </p>
          </div>
        </div>
        <div className="benefit-row">
          {[
            "Agendamento prioritário",
            "Descontos em serviços",
            "Serviços extras",
            "Atendimento exclusivo",
          ].map((x, i) => (
            <article key={x}>
              <i aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {
                    [
                      <>
                        <rect x="3" y="5" width="18" height="16" rx="2" />
                        <path d="M7 3v4M17 3v4M3 10h18M8 15l2 2 5-5" />
                      </>,
                      <>
                        <path d="M20 12 12 20 4 12V4h8l8 8Z" />
                        <circle cx="8.5" cy="8.5" r="1" />
                      </>,
                      <>
                        <path d="M12 3v18M3 12h18" />
                        <circle cx="12" cy="12" r="9" />
                      </>,
                      <>
                        <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
                      </>,
                    ][i]
                  }
                </svg>
              </i>
              <strong>{x}</strong>
              <p>Condições especiais para membros do Clube Motta.</p>
            </article>
          ))}
        </div>
      </section>
      <div className="wide-cta">
        <div>
          <strong>Aproveite todos os benefícios</strong>
          <span>Uma experiência completa na Barbearia Motta.</span>
        </div>
        <button onClick={() => navigate("benefits")}>
          Gerenciar meu plano →
        </button>
      </div>
    </>
  )
}

function MembershipPage({ navigate }: { navigate: (p: Page) => void }) {
  const quotas = [
    {
      icon: "✂",
      badge: "1 cota restante",
      title: "Corte Masculino Personalizado",
      text: "Consultoria de visagismo, lavatório com xampu artesanal, corte com tesoura ou máquina e finalização modeladora.",
      used: "3 de 4 cortes",
      until: "Até 05/11/2026",
      action: "Agendar com cota",
    },
    {
      icon: "♨",
      badge: "2 cotas restantes",
      title: "Barboterapia Ritual Tradicional",
      text: "Toalha quente com essência de eucalipto, navalhete esterilizado de uso único, hidratação profunda de fios e massagem facial.",
      used: "2 de 4 barbas",
      until: "Até 05/11/2026",
      action: "Agendar barba",
    },
    {
      icon: "⌁",
      badge: "15% OFF Ativo",
      title: "Hidratação & Acabamento",
      text: "Tratamento capilar com óleos nobres, esfoliação do couro cabeludo e alinhamento de sobrancelha na pinça ou cera.",
      used: "15% Automático",
      until: "Ilimitado por mês",
      action: "Agendar serviço extra",
    },
  ]
  return (
    <div className="membership-page">
      <div className="membership-heading">
        <PageHeading
          eyebrow="INÍCIO  /  CLUBE MOTTA  /  MEU PLANO"
          title={"Meu Plano\n& Benefícios"}
          description="Gerencie sua assinatura, consulte seu saldo de cotas do ciclo e explore regalias exclusivas de membro."
        />
        <div>
          <button onClick={() => navigate("plans")}>
            Ver catálogo de planos
          </button>
          <button disabled title="Indisponível no momento">
            Gerenciar assinatura
          </button>
        </div>
      </div>
      <section className="membership-hero">
        <div className="membership-title">
          <span>● PLANO ATIVO　•　♛ Nível Ouro</span>
          <h2>Clube Gold 3 — Corte & Barba</h2>
          <p>
            Membro desde Outubro/2023　•　Renovação automática em 05/11/2026
          </p>
        </div>
        <div className="digital-id">
          <svg
            className="digital-id-icon"
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
            <circle cx="8" cy="10" r="2" />
            <path d="M4.8 16c.5-1.8 1.7-2.7 3.2-2.7s2.7.9 3.2 2.7M14 9h4M14 13h4" />
          </svg>
          <span>
            IDENTIFICADOR DIGITAL<strong>#MOTTA-GOLD-8492</strong>
          </span>
        </div>
        <div className="membership-metrics">
          {[
            ["✂ Cotas do Ciclo", "3 de 4 cortes", "75%"],
            ["♨ Barboterapia", "2 de 4 barbas", "50%"],
            ["♧ Extras & Upgrades", "15% OFF", "ILIMITADO"],
            ["◎ Economia Atual", "R$ 640,00", "12 MESES"],
          ].map((metric) => (
            <article key={metric[0]}>
              <small>
                {metric[0]} <em>{metric[2]}</em>
              </small>
              <strong>{metric[1]}</strong>
              <span>Benefício aplicado neste ciclo</span>
            </article>
          ))}
        </div>
      </section>
      <section className="membership-section">
        <div className="section-title">
          <div>
            <h2>Saldo e Utilização de Cotas do Mês</h2>
            <p>
              Utilize seus créditos com facilidade antes do fechamento do ciclo
              atual.
            </p>
          </div>
          <small>Ciclo vigente: 06/10 a 05/11</small>
        </div>
        <div className="quota-grid">
          {quotas.map((quota) => (
            <article key={quota.title}>
              <header>
                <i>{quota.icon}</i>
                <em>{quota.badge}</em>
              </header>
              <h3>{quota.title}</h3>
              <p>{quota.text}</p>
              <dl>
                <div>
                  <dt>Utilizado no ciclo:</dt>
                  <dd>{quota.used}</dd>
                </div>
                <div>
                  <dt>Validade da cota:</dt>
                  <dd>{quota.until}</dd>
                </div>
              </dl>
              <button onClick={() => navigate("booking")}>
                □ {quota.action}
              </button>
            </article>
          ))}
        </div>
      </section>
      <section className="membership-section">
        <div className="section-title">
          <div>
            <h2>Benefícios e Parcerias Homologadas</h2>
            <p>
              Regalias exclusivas que acompanham a sua assinatura em todas as
              unidades da Barbearia Motta.
            </p>
          </div>
        </div>
        <div className="partner-grid">
          {[
            [
              "◉",
              "Serviços Inclusos na Mensalidade",
              "Cortes e barboterapias conforme suas cotas mensais sem cobrança adicional.",
            ],
            [
              "◇",
              "Extras com Desconto Exclusivo",
              "15% de redução garantida em camuflagem de fios brancos e tratamentos capilares.",
            ],
            [
              "▣",
              "Cosméticos de Alta Performance",
              "5% a 10% OFF em pomadas, bálsamos e óleos das marcas homologadas.",
            ],
            [
              "♨",
              "Lounge de Hospitalidade",
              "Chopp artesanal gelado, cortesia a cada visita, café espresso e Wi-Fi.",
            ],
          ].map((item) => (
            <article key={item[1]}>
              <i>{item[0]}</i>
              <h3>{item[1]}</h3>
              <p>{item[2]}</p>
              <strong>Incluído no plano →</strong>
            </article>
          ))}
        </div>
      </section>
      <section className="billing-card">
        <div className="section-title">
          <div>
            <h2>Gestão da Assinatura & Faturamento</h2>
            <p>
              Detalhes de pagamento, cobrança e termos de cancelamento sem
              burocracia.
            </p>
          </div>
        </div>
        <div>
          <article>
            <small>MENSALIDADE RECORRENTE</small>
            <strong>
              R$ 229,99 <em>/ mês</em>
            </strong>
            <p>Cobrado mensalmente de forma automática.</p>
          </article>
          <article>
            <small>FORMA DE PAGAMENTO</small>
            <strong>▣ Mastercard final •••• 9241</strong>
            <p>Próxima renovação: 05/11/2026</p>
          </article>
          <article>
            <small>● POLÍTICA CLARA & SEM FIDELIDADE</small>
            <p>
              Você tem total autonomia. Não cobramos multas rescisórias ou taxas
              ocultas.
            </p>
          </article>
        </div>
      </section>
    </div>
  )
}

function PlansPage({ navigate }: { navigate: Navigate }) {
  return (
    <>
      <PageHeading
        eyebrow="PLANOS E ASSINATURAS"
        title="Escolha o seu plano ideal!"
        description="Faça parte do Clube Motta e tenha mais praticidade, economia e benefícios exclusivos para cuidar do seu estilo o mês todo."
      />
      <div className="feature-strip">
        {[
          "Economia real",
          "Benefícios exclusivos",
          "Mais praticidade",
          "Cuidado contínuo",
        ].map((f, i) => (
          <div key={f}>
            <i>{["◇", "♧", "□", "◉"][i]}</i>
            <span>
              <strong>{f}</strong>
              <small>Vantagens só do clube</small>
            </span>
          </div>
        ))}
      </div>
      <div className="section-title plan-title">
        <h2>Planos do Clube Motta</h2>
        <span className="muted-note">Compare lado a lado nos cards abaixo</span>
      </div>
      <div className="plans-grid">
        {plans.map((plan) => (
          <article
            className={`plan-card ${plan.featured ? "featured" : ""} ${
              plan.dark ? "dark" : ""
            }`}
            key={plan.id}
          >
            {plan.featured && <em className="best">★ Mais vendido</em>}
            <h2>♛ {plan.name}</h2>
            <small>{plan.type}</small>
            <p>O plano mais completo para manter seu estilo sempre alinhado.</p>
            <div className="price">
              R$ {plan.price}
              <span>por mês</span>
            </div>
            <div className="perks">
              {plan.perks.map((x) => (
                <span key={x}>✓ {x}</span>
              ))}
            </div>
            <footer>
              <button onClick={() => navigate("plan", plan.id)}>
                Conferir vantagens →
              </button>
              <button
                className="primary"
                onClick={() =>
                  navigate("checkout", undefined, `plano=${plan.id}`)
                }
              >
                Comprar plano
              </button>
            </footer>
          </article>
        ))}
      </div>
    </>
  )
}

function AppointmentsPage({ navigate }: { navigate: Navigate }) {
  const { appointments, cancel, startReschedule, notify } = useStore()
  const [tab, setTab] = useState<"scheduled" | "history">("scheduled")
  const [syncError, setSyncError] = useState(false)
  const [cancelId, setCancelId] = useState<string | null>(null)
  const [pro, setPro] = useState("todos")
  const scheduled = appointments
    .filter((a) => a.status === "scheduled")
    .sort((a, b) => startsAt(a).getTime() - startsAt(b).getTime())
  const history = appointments
    .filter((a) => a.status !== "scheduled")
    .filter((a) => pro === "todos" || professionals[a.pro].name === pro)
    .sort((a, b) => b.date.localeCompare(a.date))
  const shortDate = (a: Appointment) => {
    const d = new Date(`${a.date}T12:00:00`)
    return {
      wd: d
        .toLocaleDateString("pt-BR", { weekday: "short" })
        .replace(".", "")
        .toUpperCase(),
      day: String(d.getDate()).padStart(2, "0"),
      mon: d
        .toLocaleDateString("pt-BR", { month: "short" })
        .replace(".", "")
        .toUpperCase(),
    }
  }
  return (
    <>
      <PageHeading
        eyebrow="AGENDAMENTOS"
        title={
          tab === "history"
            ? "Histórico de agendamentos"
            : "Gerencie seus agendamentos"
        }
        description="Organize sua agenda, acompanhe seus atendimentos e consulte seu histórico completo."
      />
      <div className="appointment-tabs">
        <button
          className={tab === "scheduled" ? "active" : ""}
          aria-pressed={tab === "scheduled"}
          onClick={() => setTab("scheduled")}
        >
          Agendados
        </button>
        <button
          className={tab === "history" ? "active" : ""}
          aria-pressed={tab === "history"}
          onClick={() => setTab("history")}
        >
          Anteriores
        </button>
        <button className="primary push" onClick={() => navigate("booking")}>
          ＋ Novo agendamento
        </button>
      </div>
      {tab === "history" && (
        <label className="check-row">
          Profissional
          <select value={pro} onChange={(e) => setPro(e.target.value)}>
            <option value="todos">Todos</option>
            {professionals.map((p) => (
              <option key={p.name}>{p.name}</option>
            ))}
          </select>
        </label>
      )}
      {tab === "scheduled" ? (
        syncError ? (
          <AppointmentsError
            retry={() => setSyncError(false)}
            home={() => navigate("home")}
          />
        ) : !scheduled.length ? (
          <div className="empty-state">
            <div>
              <h2>Você ainda não tem nenhum agendamento marcado</h2>
              <p>
                Que tal agendar seu próximo atendimento? Escolha o serviço,
                profissional e horário desejados.
              </p>
              <button className="primary" onClick={() => navigate("booking")}>
                ＋ Novo agendamento
              </button>
              <div>
                <button onClick={() => navigate("plans")}>
                  Explorar planos
                </button>
                <button onClick={() => setTab("history")}>Ver histórico</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="upcoming-wrap">
            {scheduled.map((a, idx) => {
              const d = shortDate(a)
              const editable = canModify(a)
              return (
                <article className="upcoming-card" key={a.id}>
                  <div className="upcoming-date">
                    <small>{d.wd}</small>
                    <strong>{d.day}</strong>
                    <span>{d.mon}</span>
                  </div>
                  <img
                    src={`${A}/${professionals[a.pro].image}`}
                    alt={professionals[a.pro].name}
                  />
                  <div>
                    <small>
                      {idx === 0 ? "PRÓXIMO AGENDAMENTO" : "AGENDAMENTO"}
                    </small>
                    <h2>{serviceLabel(a)}</h2>
                    <p>
                      {a.time} • {professionals[a.pro].name} • Unidade Sol &amp;
                      Mar
                    </p>
                  </div>
                  <span className="done">Confirmado</span>
                  <button onClick={() => navigate("appointment", a.id)}>
                    Ver detalhes
                  </button>
                  <button
                    disabled={!editable}
                    title={editable ? undefined : "Permitido até 2 horas antes"}
                    onClick={() => {
                      startReschedule(a.id)
                      navigate("booking")
                    }}
                  >
                    Reagendar
                  </button>
                  <button
                    className="danger-link"
                    disabled={!editable}
                    title={editable ? undefined : "Permitido até 2 horas antes"}
                    onClick={() => setCancelId(a.id)}
                  >
                    Cancelar
                  </button>
                </article>
              )
            })}
            <div className="appointment-info-grid">
              <article>
                <small>SUA UNIDADE</small>
                <h3>Unidade Sol &amp; Mar</h3>
                <img src={`${A}/2ae95.png`} alt="Unidade Sol & Mar" />
                <strong>08:00 — 20:00</strong>
              </article>
              <article>
                <small>POLÍTICAS DA CASA</small>
                <h3>Regras de Atendimento</h3>
                <p>◷ Tolerância de 15 minutos</p>
                <p>□ Cancelamento até 2 horas antes</p>
                <p>◎ Garantia Clube Motta</p>
              </article>
              <article>
                <small>CORTESIA ATELIÊ</small>
                <h3>Mimos do Lounge</h3>
                <p>☕ Café Especial　♨ Cerveja Artesanal</p>
                <p>⌁ Wi-Fi Estável　◇ Toalha Quente</p>
              </article>
            </div>
          </div>
        )
      ) : (
        <div className="history-list">
          {!history.length && (
            <p role="status">Nenhum atendimento encontrado.</p>
          )}
          {history.map((a) => {
            const d = shortDate(a)
            const month = new Date(`${a.date}T12:00:00`).toLocaleDateString(
              "pt-BR",
              { month: "long", year: "numeric" },
            )
            return (
              <section className="history-item" key={a.id}>
                <h3>□ {month.charAt(0).toUpperCase() + month.slice(1)}</h3>
                <article>
                  <time>
                    <strong>{d.day}</strong>
                    <small>{d.mon}</small>
                  </time>
                  <img src={`${A}/${professionals[a.pro].image}`} alt="" />
                  <div className="person">
                    <strong>{professionals[a.pro].name}</strong>
                    <span>Barbeiro</span>
                  </div>
                  <p>{serviceLabel(a)}</p>
                  <b>{money(a.total)}</b>
                  <span className="done">
                    {a.status === "cancelled" ? "✕ Cancelado" : "✓ Concluído"}
                  </span>
                  <button onClick={() => navigate("appointment", a.id)}>
                    Ver detalhes
                  </button>
                  <button
                    onClick={() => {
                      startReschedule(a.id)
                      navigate("booking")
                    }}
                  >
                    Agendar novamente
                  </button>
                </article>
              </section>
            )
          })}
        </div>
      )}
      {cancelId && (
        <CancelAppointmentModal
          close={() => setCancelId(null)}
          confirm={() => {
            cancel(cancelId)
            setCancelId(null)
            notify("Agendamento cancelado e movido ao histórico.")
          }}
        />
      )}
    </>
  )
}

function AppointmentsError({
  retry,
  home,
}: {
  retry: () => void
  home: () => void
}) {
  return (
    <div className="appointment-error">
      <div className="cloud-state">
        ⌁<b>×</b>
      </div>
      <span>Sincronização temporariamente indisponível</span>
      <h2>Não foi possível carregar seus agendamentos</h2>
      <p>
        Identificamos uma oscilação temporária de conexão com o banco de
        reservas da Barbearia Motta. Suas reservas já confirmadas e seus dados
        do Clube permanecem intactos e seguros.
      </p>
      <small>
        Verifique sua conexão ou tente atualizar a página em alguns instantes.
      </small>
      <div>
        <button className="primary" onClick={retry}>
          ↻ Tentar novamente
        </button>
        <button onClick={home}>← Voltar ao Início</button>
      </div>
      <footer>
        Precisa confirmar seu horário agora?　
        <u>Falar com o Concierge da Unidade Sol & Mar</u>
      </footer>
    </div>
  )
}

function BenefitsPage({ navigate }: { navigate: (page: Page) => void }) {
  const items = [
    ["Barba", "Aparar, modelar e finalizar a barba", "100% OFF", "R$ 0,00"],
    [
      "Barba Express (só máquina)",
      "Barba completa com máquina",
      "100% OFF",
      "R$ 0,00",
    ],
    ["Corte", "Corte de cabelo completo", "100% OFF", "R$ 0,00"],
    ["Pente Único", "Corte prático e uniforme", "100% OFF", "R$ 0,00"],
    [
      "Barboterapia",
      "Tratamento e cuidados para a barba",
      "50% OFF",
      "R$ 32,50",
    ],
    [
      "Pezinho / Acabamento",
      "Acabamento de nuca e contorno",
      "100% OFF",
      "R$ 0,00",
    ],
  ]
  return (
    <>
      <PageHeading
        eyebrow="PLANO"
        title="Benefícios do plano"
        description="Conheça todos os serviços, descontos e vantagens inclusos neste plano."
      />
      <div className="subnav">
        <button onClick={() => navigate("club")}>
          ◇ Produtos e benefícios
        </button>
        <button className="selected">▱ Meu plano</button>
        <button onClick={() => navigate("appointments")}>
          □ Meus agendamentos
        </button>
        <button onClick={() => navigate("profile")}>♙ Editar perfil</button>
      </div>
      <section className="plan-hero">
        <div>
          <h2>Clube Motta</h2>
          <span className="status">● Plano selecionado</span>
        </div>
        <div>
          {[
            "Descontos exclusivos",
            "Franquia mensal",
            "Serviços extra com desconto",
          ].map((x) => (
            <span key={x}>
              ◇<small>{x}</small>
            </span>
          ))}
        </div>
      </section>
      <div className="benefits-layout">
        <main>
          <div className="section-title">
            <h2 className="serif">Serviços do plano</h2>
            <div className="filters">
              <button className="active">Todos</button>
              <button>Gratuitos</button>
              <button>Com desconto</button>
            </div>
          </div>
          <div className="service-benefits">
            {items.map((x) => (
              <article key={x[0]}>
                <i>✣</i>
                <div>
                  <strong>{x[0]}</strong>
                  <span>{x[1]}</span>
                </div>
                <em>{x[2]}</em>
                <b>{x[3]}</b>
                <span>□ 100 por mês</span>
                <button>›</button>
              </article>
            ))}
          </div>
        </main>
        <aside>
          <section className="summary-card">
            <small>♛ SEU PLANO</small>
            <h2>Clube Motta</h2>
            <span className="status">● Ativo</span>
            <hr />
            <strong>PRINCIPAIS VANTAGENS</strong>
            {[
              "100 serviços gratuitos por mês",
              "Descontos de até 100% em serviços",
              "Serviços extra com até 15% OFF",
              "Prioridade no agendamento",
            ].map((x) => (
              <p key={x}>✓ {x}</p>
            ))}
          </section>
          <section className="summary-card">
            <h3>▱ Serviços extra</h3>
            <p>Outros serviços com desconto exclusivo para assinantes.</p>
            {[
              "Serviços extra",
              "Produtos Don Alcides",
              "Produtos Red Nek",
              "Produtos B.Urb",
            ].map((x) => (
              <div className="extra" key={x}>
                {x}
                <em>5% OFF</em>
              </div>
            ))}
          </section>
        </aside>
      </div>
    </>
  )
}

function ProfilePage({ navigate }: { navigate: Navigate }) {
  const { profile, updateProfile } = useStore()
  const [form, setForm] = useState(profile)
  const [saved, setSaved] = useState(false)
  const field = (
    key: keyof typeof profile,
    label: string,
    placeholder = "",
  ) => (
    <label key={key}>
      <span>{label}</span>
      <input
        value={form[key]}
        placeholder={placeholder}
        onChange={(e) => {
          setForm({ ...form, [key]: e.target.value })
          setSaved(false)
        }}
      />
    </label>
  )
  return (
    <>
      <PageHeading
        eyebrow="CONFIGURAÇÕES DA CONTA"
        title="Seu perfil"
        description="Gerencie suas informações pessoais, endereço e preferências da sua conta na Barbearia Motta."
        serif
      />
      <section className="profile-hero">
        <img src={`${A}/b8ded.png`} alt={profile.name} />
        <div>
          <small>SEU PERFIL</small>
          <h2>{profile.name}</h2>
          <span className="status">● Cliente desde out/2023</span>
        </div>
      </section>
      <div className="profile-grid">
        <div>
          <section className="form-card">
            <h2>♙ Informações pessoais</h2>
            <p>Seus dados de identificação e contato.</p>
            <div className="form-grid">
              {field("name", "Nome completo")}
              {field("phone", "Telefone")}
              {field("email", "E-mail")}
              {field("birth", "Data de nascimento")}
              <label>
                <span>CPF (protegido)</span>
                <input value="•••.•••.507–02" readOnly />
              </label>
            </div>
          </section>
          <section className="form-card">
            <h2>⌖ Endereço</h2>
            <p>Onde você mora.</p>
            <div className="form-grid">
              {field("cep", "CEP")}
              {field("street", "Rua")}
              {field("number", "Número")}
              {field("complement", "Complemento", "Ex.: Apto, Bloco, Sala")}
              {field("district", "Bairro")}
              {field("city", "Cidade")}
            </div>
          </section>
        </div>
        <aside>
          <section className="form-card">
            <h2>♢ Segurança da conta</h2>
            <div className="setting">
              <span>
                <strong>Senha e autenticação em dois fatores</strong>
                <small>Gerencie credenciais, sessões e comunicação.</small>
              </span>
              <button onClick={() => navigate("security")}>Gerenciar</button>
            </div>
          </section>
        </aside>
      </div>
      <div className="profile-actions">
        <p role="status">
          {saved
            ? "Alterações salvas apenas nesta sessão de demonstração."
            : "As alterações valem só para esta sessão (sem servidor)."}
        </p>
        <button
          className="primary"
          onClick={() => {
            updateProfile(form)
            setSaved(true)
          }}
        >
          Salvar alterações
        </button>
      </div>
    </>
  )
}

function Stepper({ step }: { step: number }) {
  const steps = [
    "Serviços",
    "Profissional",
    "Data & Horário",
    "Revisão",
    "Confirmação",
  ]
  return (
    <div className="stepper">
      {steps.map((name, i) => (
        <div
          key={name}
          className={
            i + 1 === step ? "current" : i + 1 < step ? "complete" : ""
          }
        >
          <i>{i + 1 < step ? "✓" : i + 1}</i>
          <span>
            <small>ETAPA 0{i + 1}</small>
            <b>{name}</b>
          </span>
        </div>
      ))}
    </div>
  )
}

function BookingPage({
  finish,
  home,
}: {
  finish: () => void
  home: () => void
}) {
  const { appointments, rescheduleId, save, startReschedule } = useStore()
  const [base] = useState(() => appointments.find((a) => a.id === rescheduleId))
  const editing = base?.status === "scheduled"
  const days = useMemo(() => upcomingDays(7), [])
  const [step, setStep] = useState(editing ? 3 : 1)
  const [selectedServices, setSelectedServices] = useState<number[]>(
    base?.svc ?? [],
  )
  const [professional, setProfessional] = useState<number | null>(
    base ? base.pro : null,
  )
  const [date, setDate] = useState<number | null>(null)
  const [time, setTime] = useState("")
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("Todos")
  const [conflict, setConflict] = useState(false)
  const [conflictResolved, setConflictResolved] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [error, setError] = useState("")
  const [saved, setSaved] = useState<Appointment | null>(null)
  useEffect(() => () => startReschedule(null), [startReschedule])
  const chosen = services.filter((_, i) => selectedServices.includes(i))
  const subtotal = chosen.reduce((sum, item) => sum + item.price, 0)
  const minutes = chosen.reduce((sum, item) => sum + item.time, 0)
  const { plan } = useStore()
  const discount = plan ? Math.min(subtotal, 50.7) : 0
  const total = Math.max(subtotal - discount, 0)
  const pro = professional === null ? null : professionals[professional]
  const dateIso = date === null ? "" : iso(days[date])
  const toggleService = (i: number) => {
    setError("")
    setSelectedServices((old) =>
      old.includes(i) ? old.filter((x) => x !== i) : [...old, i],
    )
  }
  const next = () => {
    if (step === 1 && !chosen.length)
      return setError("Selecione ao menos um serviço para continuar.")
    if (step === 2 && professional === null)
      return setError("Escolha um profissional para continuar.")
    if (step === 3 && (date === null || !time))
      return setError("Escolha uma data e um horário disponíveis.")
    if (step === 4) {
      if (!accepted)
        return setError(
          "Marque o aceite da demonstração para confirmar o agendamento.",
        )
      const appt: Appointment = {
        id: editing && base ? base.id : `ag-${Date.now().toString().slice(-6)}`,
        date: dateIso,
        time,
        pro: professional ?? 0,
        svc: selectedServices,
        label: selectedServices.length ? undefined : base?.label,
        total,
        minutes,
        status: "scheduled",
      }
      save(appt)
      setSaved(appt)
      setStep(5)
      return
    }
    setError("")
    setStep((value) => Math.min(5, value + 1))
  }
  const back = () => {
    setError("")
    setStep((value) => Math.max(1, value - 1))
  }
  const filteredServices = useMemo(
    () =>
      services.filter(
        (s) =>
          s.name.toLowerCase().includes(search.toLowerCase()) &&
          (category === "Todos" || s.category === category),
      ),
    [search, category],
  )
  if (step === 5 && saved)
    return (
      <ConfirmationVoucher
        appointment={saved}
        rescheduled={!!editing}
        finish={finish}
      />
    )
  return (
    <>
      <Stepper step={step} />
      <div className="booking-layout">
        <main>
          {step === 1 && (
            <>
              <BookingHeading
                step="01"
                title="Escolha os Serviços Desejados"
                text="Selecione um ou múltiplos cuidados para montar o seu ritual personalizado na Barbearia Motta."
              />
              <input
                className="search"
                aria-label="Buscar serviço ou ritual"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar serviço ou ritual..."
              />
              <div className="filter-pills">
                {[
                  "Todos",
                  "Corte & Cabelo",
                  "Barba & Rituais",
                  "Tratamentos",
                  "Estética & Cuidados",
                ].map((item) => (
                  <button
                    key={item}
                    className={category === item ? "active" : ""}
                    aria-pressed={category === item}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="service-list">
                {filteredServices.map((item) => {
                  const i = services.indexOf(item)
                  const selected = selectedServices.includes(i)
                  return (
                    <button
                      className={selected ? "selected" : ""}
                      aria-pressed={selected}
                      onClick={() => toggleService(i)}
                      key={item.name}
                    >
                      <i>{selected ? "✓" : "+"}</i>
                      <img src={`${A}/${item.image}`} alt="" />
                      <span>
                        <strong>{item.name}</strong>
                        <small>{item.note}</small>
                        <em>{item.time} min</em>
                      </span>
                      <b>{money(item.price)}</b>
                      <u>{selected ? "Remover" : "Adicionar"}</u>
                    </button>
                  )
                })}
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <BookingHeading
                step="02"
                title="Escolha o Profissional"
                text="Selecione o especialista da sua confiança ou opte por qualquer barbeiro qualificado para vagas mais imediatas."
              />
              <button
                className="no-preference"
                onClick={() => {
                  setProfessional(0)
                  setError("")
                }}
              >
                <i>ϟ</i>
                <span>
                  <strong>Sem Preferência</strong>
                  <small>
                    Alocamos o barbeiro sênior ou master com vaga mais próxima.
                  </small>
                </span>
                <b>MAIS RÁPIDO</b>
              </button>
              <div className="professionals">
                {professionals.map((p, i) => (
                  <button
                    className={professional === i ? "selected" : ""}
                    onClick={() => {
                      setProfessional(i)
                      setError("")
                    }}
                    aria-pressed={professional === i}
                    key={p.name}
                  >
                    <img src={`${A}/${p.image}`} alt="" />
                    <span>
                      <strong>{p.name}</strong>
                      <small>{p.role}</small>
                      <em>★ {p.rating} (318 avaliações)</em>
                    </span>
                    <div>
                      <small>Próximo horário livre:</small>
                      <b>{p.time}</b>
                    </div>
                    <u>{professional === i ? "Selecionado" : "Selecionar"}</u>
                  </button>
                ))}
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <BookingHeading
                step="03"
                title="Escolha Data e Horário"
                text={`Consulte os horários disponíveis em tempo real com ${pro?.name ?? "o profissional"} na Unidade Sol & Mar.`}
              />
              <section className="calendar">
                <div className="section-title">
                  <h2>
                    □{" "}
                    {days[0]
                      .toLocaleDateString("pt-BR", {
                        month: "long",
                        year: "numeric",
                      })
                      .replace(/^./, (c) => c.toUpperCase())}
                  </h2>
                </div>
                <div className="date-row">
                  {days.map((dayDate, i) => {
                    const day = dayDate
                      .toLocaleDateString("pt-BR", { weekday: "short" })
                      .replace(".", "")
                      .toUpperCase()
                    const num = String(dayDate.getDate()).padStart(2, "0")
                    return (
                      <button
                        className={date === i ? "selected" : ""}
                        aria-pressed={date === i}
                        onClick={() => {
                          setDate(i)
                          setTime("")
                          setError("")
                          setConflict(false)
                          setConflictResolved(false)
                        }}
                        key={num + day}
                      >
                        <small>{day}</small>
                        <b>{num}</b>
                        <span>
                          {i === 5 ? "ESGOTADO" : i > 3 ? "Poucos" : "Livre"}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </section>
              {date === null ? (
                <p role="status">Escolha uma data para ver os horários.</p>
              ) : date === 5 ? (
                <UnavailableDate
                  chooseAnother={() => {
                    setDate(0)
                    setTime("")
                  }}
                  nextDate={() => {
                    setDate(1)
                    setTime("")
                  }}
                />
              ) : (
                <section className="times">
                  <h2>
                    ◷ Horários Disponíveis{" "}
                    <em>● Disponibilidade em tempo real atualizada</em>
                  </h2>
                  {[
                    ["Manhã", "09:00", "09:45", "10:30", "11:15"],
                    [
                      "Tarde",
                      "13:30",
                      "14:15",
                      "15:00",
                      "15:45",
                      "16:30",
                      "17:15",
                    ],
                    ["Noite", "18:00", "18:45", "19:30", "20:15"],
                  ].map((group) => (
                    <div key={group[0]}>
                      <strong>{group[0]}</strong>
                      <div>
                        {group.slice(1).map((t) => (
                          <button
                            className={time === t ? "selected" : ""}
                            aria-pressed={time === t}
                            onClick={() => {
                              setTime(t)
                              setError("")
                              setConflict(false)
                              setConflictResolved(false)
                            }}
                            key={t}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </section>
              )}
            </>
          )}
          {step === 4 && (
            <>
              {conflict && (
                <ConflictState
                  professional={professionals[professional ?? 0]}
                  choose={(newTime) => {
                    setTime(newTime)
                    setConflict(false)
                    setConflictResolved(true)
                  }}
                  returnToCalendar={() => {
                    setConflict(false)
                    setStep(3)
                  }}
                />
              )}
              <BookingHeading
                step="04"
                title="Revisão e Confirmação"
                text="Confira todos os dados do seu agendamento, condições financeiras e políticas antes de finalizar."
              />
              <ReviewCards
                professional={pro}
                chosen={chosen}
                time={time}
                dateLabel={dateIso ? fmtLong(dateIso) : ""}
                minutes={minutes}
                editWhen={() => setStep(3)}
                editPro={() => setStep(2)}
              />
              <section className="house-rules">
                <h2>♢ Regras & Hospitalidade da Casa</h2>
                <div>
                  {[
                    ["Pontualidade", "Tolerância máxima de 15 minutos."],
                    [
                      "Cancelamento",
                      "Reagendamento sem custo com antecedência.",
                    ],
                    ["Lounge & Bar", "Chopp artesanal e cafés especiais."],
                  ].map((x) => (
                    <article key={x[0]}>
                      <strong>{x[0]}</strong>
                      <p>{x[1]}</p>
                    </article>
                  ))}
                </div>
              </section>
              <label className="check-row">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => {
                    setAccepted(e.target.checked)
                    setError("")
                  }}
                />
                Entendo que esta é uma demonstração: o agendamento fica salvo
                apenas nesta sessão e nenhum pagamento é cobrado.
              </label>
            </>
          )}
        </main>
        <BookingSummary
          chosen={chosen}
          subtotal={subtotal}
          total={total}
          professional={pro}
          time={time}
          minutes={minutes}
          discount={discount}
          planName={plans.find((x) => x.id === plan)?.name ?? ""}
          error={error}
          editing={!!editing}
          step={step}
          next={next}
          back={back}
          unavailable={date === 5 || conflict}
        />
      </div>
    </>
  )
}

function UnavailableDate({
  chooseAnother,
  nextDate,
}: {
  chooseAnother: () => void
  nextDate: () => void
}) {
  return (
    <>
      <section className="unavailable-date">
        <div className="unavailable-icon">
          □<b>×</b>
        </div>
        <span>DISPONIBILIDADE ESGOTADA</span>
        <h2>Não encontramos horários para esta data. Escolha outro dia.</h2>
        <p>
          Todas as cadeiras e horários de <strong>Michel Nogueira</strong> para
          <strong> Sábado, 31 de Outubro</strong> já foram preenchidos ou a
          unidade encerrou o expediente neste dia.
        </p>
        <div>
          <button className="primary" onClick={chooseAnother}>
            □ Escolher outra data
          </button>
          <button>♙ Ver outros profissionais disponíveis</button>
        </div>
        <aside>
          <i>♧</i>
          <span>
            <strong>LISTA DE ESPERA INTELIGENTE</strong>
            <small>
              Deseja ser avisado caso surja uma desistência neste dia?
            </small>
          </span>
          <button>Ativar aviso no WhatsApp</button>
        </aside>
      </section>
      <button className="next-opening" onClick={nextDate}>
        <span>
          <strong>Próxima vaga com Michel Nogueira:</strong>
          <small>Segunda-feira, 02 de Novembro às 09:30</small>
        </span>
        <b>Ir para 02 de Nov　→</b>
      </button>
    </>
  )
}

function ConflictState({
  professional,
  choose,
  returnToCalendar,
}: {
  professional: typeof professionals[0]
  choose: (time: string) => void
  returnToCalendar: () => void
}) {
  return (
    <>
      <section className="conflict-alert">
        <i>◷</i>
        <div>
          <span>CONFLITO DE DISPONIBILIDADE　•　CÓDIGO 409</span>
          <h2>
            Este horário acabou de ficar indisponível. Escolha outro horário.
          </h2>
          <p>
            O slot de Quarta-feira, 28 de Outubro às 15:00 foi reservado por
            outro cliente enquanto você revisava os dados.
          </p>
        </div>
        <button onClick={returnToCalendar}>
          □ Voltar e escolher outro horário
        </button>
      </section>
      <section className="suggested-times">
        <header>
          <span>SUGESTÃO IMEDIATA</span>
          <h3>Horários disponíveis com {professional.name} (Quarta, 28/10)</h3>
        </header>
        <div>
          {["15:30", "16:15", "17:00", "17:45", "18:30"].map((slot) => (
            <button key={slot} onClick={() => choose(slot)}>
              <strong>{slot}</strong>
              <small>{slot === "15:30" ? "HOJE • +30MIN" : "LIVRE"}</small>
            </button>
          ))}
        </div>
      </section>
    </>
  )
}

function ConfirmationVoucher({
  appointment,
  rescheduled,
  finish,
}: {
  appointment: Appointment
  rescheduled: boolean
  finish: () => void
}) {
  const pro = professionals[appointment.pro]
  return (
    <section className="confirmed reference-confirmation">
      <div className="ticket-voucher">
        <div className="ticket-header">
          <img src={`${A}/2ae95.png`} alt="Barbearia Motta Sol e Mar" />
          <div className="ticket-header-scrim" />
          <div className="ticket-header-badges">
            <span className="ticket-voucher-code">
              VOUCHER • #{appointment.id.toUpperCase()}
            </span>
            <span className="ticket-status-badge">✓ Confirmado</span>
          </div>
          <div className="ticket-header-title">
            <small>UNIDADE MACAÉ</small>
            <h3>Barbearia Motta — Sol &amp; Mar</h3>
          </div>
        </div>

        {/* Ticket Notch Divider */}
        <div className="ticket-notch-divider" aria-hidden="true">
          <div className="ticket-notch-left" />
          <div className="ticket-dashed-line" />
          <div className="ticket-notch-right" />
        </div>

        <div className="ticket-qr-section">
          <div className="ticket-qr-box">
            <svg
              className="w-28 h-28"
              viewBox="0 0 140 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Código QR para check-in no balcão"
            >
              <rect width="140" height="140" rx="8" fill="#F8F7F3" />
              {/* Corner Finders */}
              <rect
                x="14"
                y="14"
                width="34"
                height="34"
                rx="6"
                stroke="#003d1b"
                strokeWidth="5"
                fill="none"
              />
              <rect
                x="23"
                y="23"
                width="16"
                height="16"
                rx="3"
                fill="#003d1b"
              />
              <rect
                x="92"
                y="14"
                width="34"
                height="34"
                rx="6"
                stroke="#003d1b"
                strokeWidth="5"
                fill="none"
              />
              <rect
                x="101"
                y="23"
                width="16"
                height="16"
                rx="3"
                fill="#003d1b"
              />
              <rect
                x="14"
                y="92"
                width="34"
                height="34"
                rx="6"
                stroke="#003d1b"
                strokeWidth="5"
                fill="none"
              />
              <rect
                x="23"
                y="101"
                width="16"
                height="16"
                rx="3"
                fill="#003d1b"
              />
              {/* Pattern data dots */}
              <rect x="58" y="20" width="8" height="8" rx="2" fill="#15552D" />
              <rect x="74" y="20" width="8" height="8" rx="2" fill="#15552D" />
              <rect x="58" y="36" width="8" height="8" rx="2" fill="#15552D" />
              <rect x="74" y="36" width="8" height="8" rx="2" fill="#15552D" />
              <rect
                x="58"
                y="58"
                width="24"
                height="24"
                rx="4"
                fill="#C7A566"
              />
              <rect x="20" y="58" width="8" height="8" rx="2" fill="#15552D" />
              <rect x="36" y="58" width="8" height="8" rx="2" fill="#15552D" />
              <rect x="96" y="58" width="8" height="8" rx="2" fill="#15552D" />
              <rect x="112" y="58" width="8" height="8" rx="2" fill="#15552D" />
              <rect x="58" y="96" width="8" height="8" rx="2" fill="#15552D" />
              <rect x="74" y="96" width="8" height="8" rx="2" fill="#15552D" />
              <rect
                x="96"
                y="96"
                width="16"
                height="16"
                rx="3"
                fill="#003d1b"
              />
            </svg>
          </div>
          <p className="ticket-qr-hint">
            Apresente este código na recepção ao chegar para liberação do
            atendimento
          </p>

          <div className="ticket-details-grid">
            <div className="ticket-detail-item">
              <small>Data &amp; Horário</small>
              <strong>
                {fmtLong(appointment.date)}, {appointment.time}
              </strong>
            </div>
            <div className="ticket-detail-item">
              <small>Profissional</small>
              <strong>{pro?.name}</strong>
            </div>
            <div className="ticket-detail-item">
              <small>Procedimentos</small>
              <strong>{serviceLabel(appointment)}</strong>
            </div>
            <div className="ticket-detail-item">
              <small>Duração &amp; Total</small>
              <strong>
                {appointment.minutes} min • {money(appointment.total)}
              </strong>
            </div>
          </div>

          <div className="ticket-lounge-banner">
            ☕ Café especial, toalha quente e chopp artesanal inclusos como
            cortesia
          </div>
        </div>
      </div>

      <i aria-hidden="true">✓</i>
      <h1>
        {rescheduled ? "Reagendamento simulado!" : "Agendamento simulado!"}
      </h1>
      <p>
        {fmtLong(appointment.date)}, às {appointment.time}, com{" "}
        {professionals[appointment.pro].name}. Salvo apenas nesta sessão de
        demonstração.
      </p>
      <div>
        <button className="primary" onClick={finish}>
          Ver meus agendamentos
        </button>
      </div>
    </section>
  )
}

function BookingHeading({
  step,
  title,
  text,
}: {
  step: string
  title: string
  text: string
}) {
  return (
    <div className="booking-heading">
      <span>ETAPA {step} DE 05</span>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  )
}

function ReviewCards({
  professional,
  chosen,
  time,
  dateLabel,
  minutes,
  editWhen,
  editPro,
}: {
  professional: typeof professionals[0] | null
  chosen: typeof services
  time: string
  dateLabel: string
  minutes: number
  editWhen: () => void
  editPro: () => void
}) {
  return (
    <div className="review-cards">
      <section>
        <h2>
          □ Quando &amp; Onde <button onClick={editWhen}>Alterar</button>
        </h2>
        <div className="review-columns">
          <div>
            <small>DATA E HORÁRIO</small>
            <strong>{dateLabel}</strong>
            <span>
              ◷ {time} • {minutes} min
            </span>
          </div>
          <div>
            <small>UNIDADE DE ATENDIMENTO</small>
            <strong>Sol &amp; Mar</strong>
            <span>Av. Carlos Augusto T. Garcia, 2040</span>
          </div>
        </div>
      </section>
      {professional && (
        <section className="professional-review">
          <img src={`${A}/${professional.image}`} alt="" />
          <div>
            <small>PROFISSIONAL ESPECIALISTA</small>
            <strong>{professional.name}</strong>
            <span>{professional.role}</span>
          </div>
          <button onClick={editPro}>Alterar</button>
        </section>
      )}
      <section>
        <h2>
          ✂ Procedimentos Selecionados <small>{chosen.length} ITENS</small>
        </h2>
        {chosen.map((item) => (
          <div className="procedure" key={item.name}>
            <span>
              <strong>{item.name}</strong>
              <small>{item.note}</small>
            </span>
            <em>{item.time} min</em>
            <b>{money(item.price)}</b>
          </div>
        ))}
      </section>
    </div>
  )
}

function BookingSummary({
  chosen,
  subtotal,
  total,
  professional,
  time,
  minutes,
  discount,
  planName,
  error,
  editing,
  step,
  next,
  back,
  unavailable,
}: {
  chosen: typeof services
  subtotal: number
  total: number
  professional: typeof professionals[0] | null
  time: string
  minutes: number
  discount: number
  planName: string
  error: string
  editing: boolean
  step: number
  next: () => void
  back: () => void
  unavailable: boolean
}) {
  return (
    <aside className="booking-summary">
      <div className="summary-card">
        <h2>
          {step === 4 ? "Resumo Financeiro" : "Resumo da Reserva"}{" "}
          <small>{chosen.length} serviços</small>
        </h2>
        <div className="unit">
          <small>UNIDADE</small>
          <strong>Sol & Mar</strong>
          <span>Av. Carlos Augusto T. Garcia, 2040</span>
          <hr />
          {professional && <img src={`${A}/${professional.image}`} alt="" />}
          <span>
            <small>PROFISSIONAL</small>
            <strong>{professional?.name ?? "Não selecionado"}</strong>
            {time && ` • ${time}`}
          </span>
        </div>
        <h4>SERVIÇOS SELECIONADOS</h4>
        {chosen.length ? (
          chosen.map((item) => (
            <div className="summary-line" key={item.name}>
              <span>• {item.name}</span>
              <b>{money(item.price)}</b>
            </div>
          ))
        ) : (
          <p>Selecione pelo menos um serviço.</p>
        )}
        <hr />
        <div className="summary-line">
          <span>Subtotal dos serviços</span>
          <b>{money(subtotal)}</b>
        </div>
        <div className="summary-line">
          <span>Duração total</span>
          <b>{minutes} min</b>
        </div>
        {discount > 0 && (
          <div className="summary-line discount">
            <span>Benefício {planName}</span>
            <b>- {money(discount)}</b>
          </div>
        )}
        <div className="summary-total">
          <span>TOTAL A PAGAR</span>
          <b>{money(total)}</b>
        </div>
        <button className="primary" disabled={unavailable} onClick={next}>
          {step === 4
            ? editing
              ? "Confirmar Reagendamento"
              : "Confirmar Agendamento"
            : step === 3
              ? "Prosseguir para Revisão"
              : "Continuar"}{" "}
          →
        </button>
        {error && (
          <p className="alert-error" role="alert">
            {error}
          </p>
        )}
        {unavailable && (
          <p className="summary-warning">
            ⓘ Selecione um horário disponível para continuar
          </p>
        )}
        {step > 1 && (
          <button className="back" onClick={back}>
            ← Voltar
          </button>
        )}
      </div>
      <div className="points">
        ◎ PONTOS BARBEARIA MOTTA <strong>+65 pontos nesta sessão</strong>
      </div>
    </aside>
  )
}

function Shell() {
  const { page, id, search, navigate } = useRouter()
  const { toast } = useStore()
  const heading: Record<Page, string> = {
    home: "Início",
    appointments: "Meus agendamentos",
    booking: "Novo agendamento",
    appointment: "Detalhes do agendamento",
    membership: "Clube Motta",
    club: "Produtos e benefícios",
    benefits: "Meu plano",
    plans: "Planos",
    plan: "Detalhes do plano",
    checkout: "Contratação",
    profile: "Perfil",
    security: "Segurança",
    notfound: "Página não encontrada",
  }
  useEffect(() => {
    document.title = `${heading[page]} · Barbearia Motta`
  }, [page])
  return (
    <div className="w-full min-h-screen bg-surface-canvas text-on-surface antialiased flex flex-col items-center">
      <div className="w-full max-w-[430px] min-h-screen bg-surface-canvas relative flex flex-col shadow-2xl overflow-x-hidden border-x border-neutral-300/30">
        <FigmaHeader
          page={page}
          onBack={() => {
            if (page === "booking") navigate("home")
            else window.history.back()
          }}
          onNavigate={navigate}
        />
        <main
          tabIndex={-1}
          className={`page grow flex flex-col w-full ${page === "booking" ? "booking-page" : ""}`}
        >
          <p className="demo-notice hidden" role="note">
            Demonstração: agendamentos, cancelamentos e dados exibidos ficam
            apenas nesta sessão; nada é enviado ao servidor.
          </p>
          {toast && (
            <div
              className="fixed top-20 inset-x-4 z-50 p-3 bg-brand-950 text-accent-gold rounded-xl shadow-lg text-xs font-semibold text-center animate-fade-in"
              role="status"
            >
              {toast}
            </div>
          )}
          {page === "home" && <HomeScreen onNavigate={navigate} />}
          {page === "club" && <HomeScreen onNavigate={navigate} />}
          {page === "membership" && <HomeScreen onNavigate={navigate} />}
          {page === "benefits" && <HomeScreen onNavigate={navigate} />}
          {page === "plans" && <PlanosScreen onNavigate={navigate} />}
          {page === "plan" && <PlanDetailPage id={id} navigate={navigate} />}
          {page === "checkout" && (
            <CheckoutPage search={search} navigate={navigate} />
          )}
          {page === "appointments" && <AgendamentosScreen onNavigate={navigate} />}
          {page === "appointment" && (
            <AppointmentDetailPage id={id} navigate={navigate} />
          )}
          {page === "profile" && <PerfilScreen onNavigate={navigate} />}
          {page === "security" && <SecurityPage navigate={navigate} />}
          {page === "booking" && (
            <BookingFlow
              onFinish={() => navigate("appointments")}
              onHome={() => navigate("home")}
            />
          )}
          {page === "notfound" && <NotFoundPage navigate={navigate} />}
        </main>
        {page !== "booking" && <FigmaBottomNav page={page} onNavigate={navigate} />}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  )
}
