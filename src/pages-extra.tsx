import { useEffect, useState } from "react"
import { useStore } from "./app-state"
import { CancelAppointmentModal, PageHeading, Toggle } from "./components/ui"
import {
  A,
  canModify,
  fmtLong,
  money,
  plans,
  professionals,
  serviceLabel,
  startsAt,
} from "./data"
import type { Navigate } from "./types"

type Nav = { navigate: Navigate }

function countdown(target: Date) {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return "em andamento"
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const mins = Math.floor((diff % 3600000) / 60000)
  return `${days ? `${days}d ` : ""}${hours}h ${mins}min`
}

export function HomePage({ navigate }: Nav) {
  const { appointments, plan, profile } = useStore()
  const [, tick] = useState(0)
  useEffect(() => {
    const id = window.setInterval(() => tick((n) => n + 1), 30000)
    return () => window.clearInterval(id)
  }, [])
  const next = appointments
    .filter((a) => a.status === "scheduled")
    .sort((a, b) => startsAt(a).getTime() - startsAt(b).getTime())[0]
  const current = plans.find((p) => p.id === plan)

  return (
    <>
      <PageHeading
        eyebrow="PORTAL DO CLIENTE • BARBEARIA MOTTA"
        title={`Olá, ${profile.name.split(" ")[0]}`}
        description="Seu espaço exclusivo para gerenciar agendamentos, cotas de assinatura e hospitalidade do lounge."
        serif
      />

      {/* Signature Element: Cartão Credencial de Membro do Ateliê Motta */}
      {next ? (
        <section className="member-credential-card" aria-labelledby="home-next">
          <div className="credential-top">
            <span className="credential-seal">
              <span className="seal-star">★</span> ATELIÊ MOTTA • DESDE 1978
            </span>
            <span className="credential-badge">
              <span className="pulse-dot" aria-hidden="true" />
              Inicia em {countdown(startsAt(next))}
            </span>
          </div>

          <div className="credential-body">
            <div className="credential-pro-avatar">
              <img
                src={`${A}/${professionals[next.pro]?.image}`}
                alt={professionals[next.pro]?.name}
              />
              <span className="pro-role-pill">Barbeiro Master</span>
            </div>

            <div className="credential-info">
              <small id="home-next">PRÓXIMO AGENDAMENTO CONFIRMADO</small>
              <h2>{serviceLabel(next)}</h2>
              <p className="credential-meta">
                <strong>
                  {fmtLong(next.date)} às {next.time}
                </strong>{" "}
                • com {professionals[next.pro]?.name} • Unidade Sol &amp; Mar
              </p>

              <div className="credential-perks">
                <span>☕ Café Especial</span>
                <span>♨ Toalha Quente</span>
                <span>🍺 Chopp Cortesia</span>
                <span>⌁ Wi-Fi Estável</span>
              </div>
            </div>
          </div>

          <div className="credential-actions">
            <button
              className="btn-credential-secondary"
              onClick={() => navigate("appointment", next.id)}
            >
              Ver detalhes do agendamento
            </button>
            <button
              className="btn-credential-primary"
              onClick={() => navigate("booking")}
            >
              ＋ Novo agendamento
            </button>
          </div>
        </section>
      ) : (
        <section
          className="member-credential-card empty"
          aria-labelledby="home-next"
        >
          <div className="credential-top">
            <span className="credential-seal">
              <span className="seal-star">★</span> ATELIÊ MOTTA • DESDE 1978
            </span>
          </div>
          <div className="credential-info">
            <small id="home-next">AGENDAMENTO ATIVO</small>
            <h2>Nenhum horário marcado no momento</h2>
            <p>
              Escolha seu barbeiro de confiança, selecione os serviços desejados
              e garanta sua vaga sem filas.
            </p>
          </div>
          <div className="credential-actions">
            <button
              className="btn-credential-primary"
              onClick={() => navigate("booking")}
            >
              ＋ Agendar atendimento agora
            </button>
          </div>
        </section>
      )}

      {/* Grid Executivo: Plano & Cotas + Hospitalidade do Lounge */}
      <div className="home-dashboard-grid">
        <section className="dashboard-card" aria-labelledby="home-plan">
          <div className="dash-card-header">
            <div>
              <small>ASSINATURA ATIVA</small>
              <h2 id="home-plan">{current ? current.name : "Clube Motta"}</h2>
            </div>
            {current?.dark && <span className="black-badge">BLACK</span>}
          </div>

          {current ? (
            <>
              <p className="dash-plan-desc">{current.type}</p>
              <div className="dash-quota-progress">
                <div className="quota-bar-header">
                  <span>Cotas utilizadas no ciclo</span>
                  <strong>2 de 4 utilizadas</strong>
                </div>
                <div
                  className="quota-track"
                  role="progressbar"
                  aria-valuenow={50}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div className="quota-fill" style={{ width: "50%" }} />
                </div>
                <small className="quota-hint">
                  Renovação mensal em 15 dias • Economia estimada de R$ 94,00
                </small>
              </div>
              <div className="dash-card-footer">
                <button
                  className="btn-dash-link"
                  onClick={() => navigate("benefits")}
                >
                  Conferir cotas e extrato →
                </button>
                <button
                  className="btn-dash-outline"
                  onClick={() => navigate("plans")}
                >
                  Mudar plano
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="dash-plan-desc">
                Cortes e barboterapia contínuos com até 40% de economia mensal.
              </p>
              <div className="dash-card-footer">
                <button className="primary" onClick={() => navigate("plans")}>
                  Conhecer os planos do Clube
                </button>
              </div>
            </>
          )}
        </section>

        <section className="dashboard-card" aria-labelledby="home-lounge">
          <div className="dash-card-header">
            <div>
              <small>HOSPITALIDADE &amp; CORTESIAS</small>
              <h2 id="home-lounge">Mimos do Lounge Motta</h2>
            </div>
            <span className="lounge-badge">EXCLUSIVO</span>
          </div>
          <p className="dash-plan-desc">
            Seu tempo na Barbearia Motta é um ritual de relaxamento e precisão.
          </p>
          <div className="lounge-perks-grid">
            <div className="lounge-item">
              <span className="lounge-icon" aria-hidden="true">
                ☕
              </span>
              <div>
                <strong>Café Blend Próprio</strong>
                <small>Grãos artesanais moídos na hora</small>
              </div>
            </div>
            <div className="lounge-item">
              <span className="lounge-icon" aria-hidden="true">
                🍺
              </span>
              <div>
                <strong>Chopp Artesanal</strong>
                <small>Torneira gelada cortesia da casa</small>
              </div>
            </div>
            <div className="lounge-item">
              <span className="lounge-icon" aria-hidden="true">
                ♨
              </span>
              <div>
                <strong>Toalha Quente &amp; Óleos</strong>
                <small>Aromaterapia relaxante pré-navalha</small>
              </div>
            </div>
            <div className="lounge-item">
              <span className="lounge-icon" aria-hidden="true">
                ◷
              </span>
              <div>
                <strong>Tolerância de 15 min</strong>
                <small>Conveniência para sua rotina</small>
              </div>
            </div>
          </div>
          <div className="dash-card-footer">
            <button className="btn-dash-link" onClick={() => navigate("club")}>
              Ver produtos e marcas parceiras →
            </button>
          </div>
        </section>
      </div>

      {/* Atalhos Rápidos */}
      <nav className="home-quick-links" aria-label="Acesso rápido">
        <button onClick={() => navigate("appointments")}>
          <span aria-hidden="true">□</span> Meus agendamentos
        </button>
        <button onClick={() => navigate("membership")}>
          <span aria-hidden="true">♕</span> Clube Motta
        </button>
        <button onClick={() => navigate("plans")}>
          <span aria-hidden="true">⚖</span> Comparar planos
        </button>
        <button onClick={() => navigate("profile")}>
          <span aria-hidden="true">♙</span> Meu perfil
        </button>
      </nav>
    </>
  )
}

export function AppointmentDetailPage({ id, navigate }: Nav & { id?: string }) {
  const { appointments, cancel, startReschedule, notify } = useStore()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const appt = appointments.find((a) => a.id === id)
  if (!appt) return <NotFoundPage navigate={navigate} what="Agendamento" />
  const pro = professionals[appt.pro]
  const editable = canModify(appt)
  const statusText = {
    scheduled: "Confirmado",
    cancelled: "Cancelado",
    done: "Concluído",
  }[appt.status]
  const address = "Av. Carlos Augusto T. Garcia, 2040 — Unidade Sol & Mar"
  return (
    <>
      <PageHeading
        eyebrow="AGENDAMENTOS"
        title="Detalhes do agendamento"
        description={`Reserva ${appt.id.toUpperCase()}`}
      />
      <section className="form-card">
        <h2>
          {fmtLong(appt.date)} às {appt.time}
        </h2>
        <p role="status">
          Status: <strong>{statusText}</strong>
        </p>
        {pro && (
          <p>
            <img
              src={`${A}/${pro.image}`}
              alt=""
              width={48}
              height={48}
              style={{
                borderRadius: 10,
                verticalAlign: "middle",
                marginRight: 8,
              }}
            />
            <strong>{pro.name}</strong> — {pro.role}
          </p>
        )}
        <p>Serviços: {serviceLabel(appt)}</p>
        <p>
          Duração: {appt.minutes} min · Total: <b>{money(appt.total)}</b>
        </p>
        <p>
          Unidade: {address} ·{" "}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
            target="_blank"
            rel="noreferrer"
          >
            Abrir no mapa
          </a>
        </p>
        {appt.status === "scheduled" && !editable && (
          <p role="note">
            Reagendamento e cancelamento são permitidos até 2 horas antes do
            horário.
          </p>
        )}
        <div className="profile-actions">
          <button onClick={() => navigate("appointments")}>← Voltar</button>
          {appt.status === "scheduled" && (
            <>
              <button
                disabled={!editable}
                onClick={() => {
                  startReschedule(appt.id)
                  navigate("booking")
                }}
              >
                Reagendar
              </button>
              <button
                className="danger-link"
                disabled={!editable}
                onClick={() => setConfirmOpen(true)}
              >
                Cancelar
              </button>
            </>
          )}
        </div>
      </section>
      {confirmOpen && (
        <CancelAppointmentModal
          close={() => setConfirmOpen(false)}
          confirm={() => {
            cancel(appt.id)
            setConfirmOpen(false)
            notify("Agendamento cancelado.")
          }}
        />
      )}
    </>
  )
}

export function PlanDetailPage({ id, navigate }: Nav & { id?: string }) {
  const plan = plans.find((p) => p.id === id)
  if (!plan) return <NotFoundPage navigate={navigate} what="Plano" />
  return (
    <>
      <PageHeading
        eyebrow="PLANOS E ASSINATURAS"
        title={plan.name}
        description={plan.type}
      />
      <section className="form-card">
        <h2>
          R$ {plan.price} <small>por mês</small>
        </h2>
        <h3>Franquias e vantagens</h3>
        <ul>
          {plan.perks.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <h3>Taxas e termos</h3>
        <p>
          Mensalidade e taxa de reserva por atendimento são cobradas
          separadamente e sempre exibidas antes da confirmação. Cancelamento da
          assinatura a qualquer momento, sem multa (condições comerciais a
          confirmar com a Barbearia Motta).
        </p>
        <div className="profile-actions">
          <button onClick={() => navigate("plans")}>← Todos os planos</button>
          <button
            className="primary"
            onClick={() => navigate("checkout", undefined, `plano=${plan.id}`)}
          >
            Comprar plano
          </button>
        </div>
      </section>
    </>
  )
}

export function CheckoutPage({ search, navigate }: Nav & { search: string }) {
  const { activatePlan, plan: active } = useStore()
  const planId = new URLSearchParams(search).get("plano")
  const plan = plans.find((p) => p.id === planId)
  const [accepted, setAccepted] = useState(false)
  const [error, setError] = useState("")
  const [done, setDone] = useState(false)
  if (!plan)
    return (
      <>
        <PageHeading
          eyebrow="CONTRATAÇÃO"
          title="Escolha um plano"
          description="Selecione um plano no catálogo para continuar."
        />
        <button className="primary" onClick={() => navigate("plans")}>
          Ver catálogo de planos
        </button>
      </>
    )
  if (done)
    return (
      <section className="confirmed reference-confirmation">
        <i aria-hidden="true">✓</i>
        <h1>Assinatura simulada ativada</h1>
        <p>
          {plan.name} está ativo apenas nesta sessão de demonstração. Nenhum
          pagamento foi enviado.
        </p>
        <div>
          <button className="primary" onClick={() => navigate("benefits")}>
            Ver meu plano
          </button>
        </div>
      </section>
    )
  return (
    <>
      <PageHeading
        eyebrow="CONTRATAÇÃO DE ASSINATURA"
        title="Revise e confirme"
        description="Sem taxas ocultas: confira os valores antes de confirmar."
      />
      <section className="form-card" aria-labelledby="co-plan">
        <h2 id="co-plan">{plan.name}</h2>
        <p>{plan.type}</p>
        <p>
          Mensalidade: <b>R$ {plan.price}</b>
        </p>
        {active === plan.id && (
          <p role="note">Este já é o seu plano atual (simulado).</p>
        )}
        <label className="check-row">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => {
              setAccepted(e.target.checked)
              setError("")
            }}
          />
          Entendo que esta é uma demonstração: nenhum pagamento é enviado ou
          cobrado.
        </label>
        {error && (
          <p className="alert-error" role="alert">
            {error}
          </p>
        )}
        <div className="profile-actions">
          <button onClick={() => navigate("plan", plan.id)}>← Voltar</button>
          <button
            className="primary"
            onClick={() => {
              if (!accepted) {
                setError("Marque o aceite da demonstração para continuar.")
                return
              }
              activatePlan(plan.id)
              setDone(true)
            }}
          >
            Confirmar assinatura (simulação)
          </button>
        </div>
      </section>
    </>
  )
}

export function SecurityPage({ navigate }: Nav) {
  const { notify } = useStore()
  const [sessions, setSessions] = useState([
    "Este dispositivo (atual)",
    "Chrome · Macaé, RJ",
  ])
  return (
    <>
      <PageHeading
        eyebrow="CONFIGURAÇÕES DA CONTA"
        title="Segurança e notificações"
        description="Credenciais, autenticação em dois fatores, sessões e preferências de comunicação."
        serif
      />
      <section className="form-card" aria-labelledby="sec-auth">
        <h2 id="sec-auth">Credenciais</h2>
        <div className="setting">
          <span>
            <strong>Senha</strong>
            <small>Disponível quando houver login real.</small>
          </span>
          <button
            onClick={() =>
              notify("Demonstração: a troca de senha ainda não é real.")
            }
          >
            Alterar
          </button>
        </div>
        <div className="setting">
          <span>
            <strong>Autenticação em dois fatores</strong>
            <small>Adicione uma camada extra de segurança.</small>
          </span>
          <Toggle label="Autenticação em dois fatores" initial={false} />
        </div>
      </section>
      <section className="form-card" aria-labelledby="sec-sess">
        <h2 id="sec-sess">Sessões ativas</h2>
        {sessions.map((s, i) => (
          <div className="setting" key={s}>
            <span>
              <strong>{s}</strong>
            </span>
            {i > 0 && (
              <button
                onClick={() => setSessions((o) => o.filter((x) => x !== s))}
              >
                Encerrar
              </button>
            )}
          </div>
        ))}
      </section>
      <section className="form-card" aria-labelledby="sec-not">
        <h2 id="sec-not">Comunicação</h2>
        {["WhatsApp", "E-mail"].map((c) => (
          <div className="setting" key={c}>
            <span>
              <strong>Lembretes por {c}</strong>
              <small>Receba avisos de agendamento.</small>
            </span>
            <Toggle label={`Lembretes por ${c}`} />
          </div>
        ))}
      </section>
      <div className="profile-actions">
        <button onClick={() => navigate("profile")}>← Voltar ao perfil</button>
      </div>
    </>
  )
}

export function NotFoundPage({
  navigate,
  what = "Página",
}: Nav & { what?: string }) {
  return (
    <div className="empty-state">
      <div>
        <h1>{what} não encontrada</h1>
        <p>O endereço acessado não existe ou foi removido.</p>
        <button className="primary" onClick={() => navigate("home")}>
          Ir para o início
        </button>
      </div>
    </div>
  )
}
