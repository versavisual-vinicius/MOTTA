import React, { useState } from "react"
import { useStore } from "../../app-state"
import type { Navigate } from "../../types"

export function AgendamentosScreen({ onNavigate }: { onNavigate: Navigate }) {
  const { appointments, cancel } = useStore()
  const [tab, setTab] = useState<"agendados" | "anteriores">("agendados")
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [targetId, setTargetId] = useState<string | null>(null)

  const activeAppts = appointments.filter((a) => a.status === "scheduled")
  const hasActive = activeAppts.length > 0

  const handleOpenCancel = (id: string) => {
    setTargetId(id)
    setShowCancelModal(true)
  }

  const handleConfirmCancel = () => {
    if (targetId) {
      cancel(targetId)
    } else if (activeAppts[0]) {
      cancel(activeAppts[0].id)
    }
    setShowCancelModal(false)
  }

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Top Segmented Controls */}
      <div className="px-4 pt-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTab("agendados")}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              tab === "agendados"
                ? "bg-brand-700 text-on-primary shadow-sm"
                : "bg-surface-container-low text-neutral-700 hover:bg-surface-container"
            }`}
          >
            Agendados ({activeAppts.length})
          </button>
          <button
            onClick={() => setTab("anteriores")}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              tab === "anteriores"
                ? "bg-brand-700 text-on-primary shadow-sm"
                : "bg-surface-container-low text-neutral-700 hover:bg-surface-container"
            }`}
          >
            Anteriores
          </button>
        </div>
        <button
          onClick={() => onNavigate("booking")}
          className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-brand-700 text-on-primary text-xs font-label font-semibold shadow-sm hover:bg-brand-800 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span>Novo</span>
        </button>
      </div>

      {tab === "agendados" ? (
        hasActive ? (
          <div>

            <div className="flex flex-col w-full pb-8">
                <div className="px-4 pt-4 pb-2 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <h2
                                className="text-2xl font-headline text-on-surface tracking-tight leading-snug"
                            >
                                Meus Agendamentos
                            </h2>
                            <p
                                className="text-xs font-label text-on-surface-variant"
                            >
                                Gerencie seus agendamentos e rituais de cuidado e estilo
                            </p>
                        </div>
                        <button
                            aria-label="Novo agendamento"
                            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-primary-container text-on-primary font-label text-xs font-semibold shadow-sm active:scale-95 transition-transform"
                        >
                            <span className="material-symbols-outlined text-[18px]"
                                >add</span
                            >
                            <span>Novo</span>
                        </button>
                    </div>
                    {/*  Navegação por Abas em Pílula  */}
                    <div
                        className="flex p-1 bg-surface-container rounded-full mt-1"
                    >
                        <button
                            className="flex-1 py-2 rounded-full bg-primary text-on-primary text-xs font-semibold font-label flex items-center justify-center gap-1.5 shadow-sm transition-all"
                            id="tab-upcoming"
                        >
                            <span className="material-symbols-outlined text-[15px]"
                                >event</span
                            >
                            <span>Agendados (2)</span>
                        </button>
                        <button
                            className="flex-1 py-2 rounded-full text-on-surface-variant hover:text-on-surface text-xs font-semibold font-label flex items-center justify-center gap-1.5 transition-all"
                            id="tab-past"
                        >
                            <span className="material-symbols-outlined text-[15px]"
                                >history</span
                            >
                            <span>Anteriores (12)</span>
                        </button>
                    </div>
                    {/*  Filtros Rápidos com Scroll Horizontal  */}
                    <div
                        className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 text-xs font-label"
                    >
                        <button
                            className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-container-highest text-on-surface font-medium hover:bg-secondary-container transition-colors"
                        >
                            <span>Todos os períodos</span>
                            <span className="material-symbols-outlined text-[15px]"
                                >expand_more</span
                            >
                        </button>
                        <button
                            className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container transition-colors"
                        >
                            <span>Todos os barbeiros</span>
                            <span className="material-symbols-outlined text-[15px]"
                                >expand_more</span
                            >
                        </button>
                        <button
                            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-semibold shadow-sm"
                        >
                            <span className="material-symbols-outlined text-[14px]"
                                >store</span
                            >
                            <span>Unidade Sol & Mar</span>
                            <span className="material-symbols-outlined text-[14px]"
                                >close</span
                            >
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-4 px-4 mt-2">
                    {/*  Card 1: Próximo Atendimento em Destaque  */}
                    <article
                        className="bg-surface-container-lowest rounded-xl shadow-md overflow-hidden relative"
                    >
                        <div
                            className="bg-primary px-4 py-2.5 flex items-center justify-between text-on-primary"
                        >
                            <div className="flex items-center gap-1.5">
                                <span
                                    className="material-symbols-outlined text-[16px] text-tertiary-fixed"
                                    >verified</span
                                >
                                <span
                                    className="text-[11px] font-bold font-label uppercase tracking-widest text-surface-container-highest"
                                    >Próximo Atendimento</span
                                >
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span
                                    className="bg-primary-container text-on-primary-container text-[11px] font-semibold px-2 py-0.5 rounded-full"
                                    >Confirmado</span
                                >
                                <span
                                    className="bg-tertiary-container text-tertiary-fixed text-[11px] font-semibold px-2 py-0.5 rounded-full"
                                    >Em 3 dias</span
                                >
                            </div>
                        </div>
                        <div className="p-4 flex flex-col gap-3.5">
                            {/*  Data e Horário  */}
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex flex-col">
                                    <h3
                                        className="font-headline text-lg text-on-surface leading-tight"
                                    >
                                        Sexta-feira, 24 de Outubro de 2026
                                    </h3>
                                    <div
                                        className="flex items-center gap-2 mt-1 text-on-surface-variant text-xs font-label"
                                    >
                                        <span
                                            className="flex items-center gap-1 text-primary font-bold"
                                        >
                                            <span
                                                className="material-symbols-outlined text-[16px]"
                                                >schedule</span
                                            >
                                            <span className="tabular-nums text-sm"
                                                >15:30</span
                                            >
                                        </span>
                                        <span
                                            className="w-1 h-1 rounded-full bg-outline-variant"
                                        ></span>
                                        <span className="tabular-nums"
                                            >Duração: 60 min</span
                                        >
                                    </div>
                                </div>
                                <div
                                    className="w-10 h-10 rounded-lg bg-surface-container flex flex-col items-center justify-center shrink-0 text-center"
                                >
                                    <span
                                        className="text-[10px] font-semibold text-secondary uppercase leading-none"
                                        >OUT</span
                                    >
                                    <span
                                        className="text-sm font-bold text-on-surface leading-tight tabular-nums"
                                        >24</span
                                    >
                                </div>
                            </div>
                            {/*  Barbeiro e Especialidade  */}
                            <div
                                className="flex items-center gap-3 p-2.5 rounded-lg bg-surface-container-low"
                            >
                                <img
                                    alt="Michel Nogueira"
                                    className="w-12 h-12 rounded-full object-cover shrink-0"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0J-klYfPmDXTu_9nDJgyWCuYkAw7_5dWiWxh1e9xFyrkUAJRsk2BJusEumRvdABHK90-EeeGEoGDc6fNRaorRG3MMxXuTfz0HsTS0j2Bnd5DjVIvRkNP9jk5PBCfuQorOTauvYFh2UaZeCHX9DRF2pvAHud8X0lY1W7V95cZb2Vmgy1gwdLr-w1AAvurK7FZPPWuqJ90LaNlJnBZfpJQO_YOSl35tP-eGYvVMSbcu7A5-SgYmWbVi0g"
                                />
                                <div className="flex flex-col min-w-0 flex-1">
                                    <div className="flex items-center gap-1.5">
                                        <span
                                            className="font-label text-sm font-semibold text-on-surface truncate"
                                            >Michel Nogueira</span
                                        >
                                        <span
                                            className="flex items-center text-[11px] text-tertiary-container font-bold gap-0.5"
                                        >
                                            <span
                                                className="material-symbols-outlined text-[13px] text-tertiary fill-current"
                                                style={{"fontVariationSettings": "\"FILL\" 1"}}
                                                >star</span
                                            >
                                            4.9
                                        </span>
                                    </div>
                                    <span
                                        className="text-xs text-on-surface-variant truncate"
                                        >Barbeiro Master & Visagista</span
                                    >
                                </div>
                                <button
                                    aria-label="Mensagem ao barbeiro"
                                    className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant"
                                >
                                    <span
                                        className="material-symbols-outlined text-[18px]"
                                        >chat</span
                                    >
                                </button>
                            </div>
                            {/*  Detalhes do Serviço  */}
                            <div className="flex flex-col gap-1.5">
                                <span
                                    className="text-[11px] font-label font-bold text-secondary uppercase tracking-wider"
                                    >Serviços Selecionados</span
                                >
                                <div className="flex flex-col gap-1">
                                    <div
                                        className="flex items-center justify-between text-xs"
                                    >
                                        <span
                                            className="text-on-surface font-medium"
                                            >Corte Masculino Degradê</span
                                        >
                                        <span
                                            className="tabular-nums text-on-surface-variant font-medium"
                                            >R$ 55,00</span
                                        >
                                    </div>
                                    <div
                                        className="flex items-center justify-between text-xs"
                                    >
                                        <span
                                            className="text-on-surface font-medium"
                                            >Barba Terapia com Toalha
                                            Quente</span
                                        >
                                        <span
                                            className="tabular-nums text-on-surface-variant font-medium"
                                            >R$ 28,00</span
                                        >
                                    </div>
                                </div>
                            </div>
                            {/*  Localização  */}
                            <div
                                className="flex items-start gap-2 p-2 rounded-lg bg-surface-container-lowest"
                            >
                                <span
                                    className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5"
                                    >location_on</span
                                >
                                <div
                                    className="flex flex-col text-xs leading-tight"
                                >
                                    <span className="font-semibold text-on-surface"
                                        >Unidade Sol & Mar</span
                                    >
                                    <span
                                        className="text-on-surface-variant text-[11px] mt-0.5"
                                        >Av. Carlos Augusto T. Garcia, 2040 -
                                        Sol e Mar - Macaé - RJ</span
                                    >
                                </div>
                            </div>
                            {/*  Resumo Financeiro & Clube Gold  */}
                            <div
                                className="p-3 rounded-lg bg-surface-container flex flex-col gap-1.5 text-xs"
                            >
                                <div
                                    className="flex items-center justify-between text-on-surface-variant"
                                >
                                    <span>Subtotal dos serviços</span>
                                    <span className="tabular-nums">R$ 83,00</span>
                                </div>
                                <div
                                    className="flex items-center justify-between text-primary font-medium"
                                >
                                    <span className="flex items-center gap-1">
                                        <span
                                            className="material-symbols-outlined text-[15px]"
                                            >stars</span
                                        >
                                        Cota Clube Gold
                                    </span>
                                    <span className="tabular-nums font-semibold"
                                        >- R$ 50,70</span
                                    >
                                </div>
                                <div
                                    className="flex items-center justify-between pt-1.5 mt-0.5 text-on-surface font-bold text-sm"
                                >
                                    <span>Total a pagar</span>
                                    <div className="flex flex-col items-end">
                                        <span className="tabular-nums text-primary"
                                            >R$ 32,30</span
                                        >
                                        <span
                                            className="text-[10px] font-normal text-on-surface-variant"
                                            >Pagamento presencial na
                                            recepção</span
                                        >
                                    </div>
                                </div>
                            </div>
                            {/*  Ações do Atendimento  */}
                            <div className="flex flex-col gap-2 pt-1">
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        className="h-11 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                                    >
                                        <span
                                            className="material-symbols-outlined text-[16px]"
                                            >visibility</span
                                        >
                                        Ver detalhes
                                    </button>
                                    <button
                                        className="h-11 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                                    >
                                        <span
                                            className="material-symbols-outlined text-[16px]"
                                            >save_as</span
                                        >
                                        Reagendar
                                    </button>
                                </div>
                                <button
                                    className="h-11 rounded-lg bg-surface-container-low text-error hover:bg-error-container hover:text-on-error-container font-label text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                                >
                                    <span
                                        className="material-symbols-outlined text-[16px]"
                                        >cancel</span
                                    >
                                    Cancelar agendamento
                                </button>
                            </div>
                        </div>
                    </article>
                    {/*  Card 2: Segundo Atendimento (Próximo Mês)  */}
                    <article
                        className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden"
                    >
                        <div className="p-4 flex flex-col gap-3.5">
                            <div className="flex items-start justify-between">
                                <div className="flex flex-col">
                                    <span
                                        className="text-[10px] font-bold font-label uppercase tracking-widest text-secondary"
                                        >Agendamento Futuro</span
                                    >
                                    <h3
                                        className="font-headline text-lg text-on-surface mt-0.5"
                                    >
                                        Sábado, 07 de Novembro de 2026
                                    </h3>
                                    <div
                                        className="flex items-center gap-2 mt-1 text-on-surface-variant text-xs font-label"
                                    >
                                        <span
                                            className="flex items-center gap-1 text-primary font-bold"
                                        >
                                            <span
                                                className="material-symbols-outlined text-[16px]"
                                                >schedule</span
                                            >
                                            <span className="tabular-nums text-sm"
                                                >11:00</span
                                            >
                                        </span>
                                        <span
                                            className="w-1 h-1 rounded-full bg-outline-variant"
                                        ></span>
                                        <span className="tabular-nums"
                                            >Duração: 45 min</span
                                        >
                                    </div>
                                </div>
                                <div
                                    className="w-10 h-10 rounded-lg bg-surface-container flex flex-col items-center justify-center shrink-0 text-center"
                                >
                                    <span
                                        className="text-[10px] font-semibold text-secondary uppercase leading-none"
                                        >NOV</span
                                    >
                                    <span
                                        className="text-sm font-bold text-on-surface leading-tight tabular-nums"
                                        >07</span
                                    >
                                </div>
                            </div>
                            {/*  Barbeiro  */}
                            <div
                                className="flex items-center gap-3 p-2.5 rounded-lg bg-surface-container-low"
                            >
                                <img
                                    alt="Maycon Angelo"
                                    className="w-12 h-12 rounded-full object-cover shrink-0"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxwQ1QH401aY8bIjhDrqTLhUKLufcNx9OffvQF_FWyB22ojwU6pk7jwujVgrAsVCvidbuyWvFKgfccideMZaN2yPUfiDVuYti6RHQZ3KjE-pSR5hB93QP1FlqN0EPy-f_rIlSwi8cpC9f101lW0vQpnK9ZrfSTlyvfsbad0skV4AUVZIZynsBhlO3haWjnGScQ90PKEAiefXzlm47vYQudgIIZaxbXuc5-2qXx2RNmKvvOIKa706XITg"
                                />
                                <div className="flex flex-col min-w-0 flex-1">
                                    <span
                                        className="font-label text-sm font-semibold text-on-surface truncate"
                                        >Maycon Angelo</span
                                    >
                                    <span
                                        className="text-xs text-on-surface-variant truncate"
                                        >Barbeiro Master</span
                                    >
                                </div>
                                <span
                                    className="material-symbols-outlined text-secondary text-[20px]"
                                    >content_cut</span
                                >
                            </div>
                            {/*  Serviço e Cobertura 100% Clube  */}
                            <div
                                className="p-3 rounded-lg bg-secondary-container/40 flex items-center justify-between"
                            >
                                <div className="flex flex-col min-w-0">
                                    <span
                                        className="text-xs font-semibold text-on-surface truncate"
                                        >Corte Masculino Tradicional</span
                                    >
                                    <span
                                        className="text-[11px] text-on-secondary-container font-medium flex items-center gap-1 mt-0.5"
                                    >
                                        <span
                                            className="material-symbols-outlined text-[14px]"
                                            >check_circle</span
                                        >
                                        100% Coberto por Cota do Clube Gold
                                    </span>
                                </div>
                                <span
                                    className="text-sm font-bold text-primary tabular-nums"
                                    >R$ 0,00</span
                                >
                            </div>
                            {/*  Localização Breve  */}
                            <div
                                className="flex items-center gap-1.5 text-xs text-on-surface-variant"
                            >
                                <span
                                    className="material-symbols-outlined text-secondary text-[16px]"
                                    >store</span
                                >
                                <span>Unidade Sol & Mar • Macaé - RJ</span>
                            </div>
                            {/*  Ações Compactas  */}
                            <div className="grid grid-cols-3 gap-2 pt-1">
                                <button
                                    className="h-11 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label text-xs font-semibold flex items-center justify-center transition-colors"
                                >
                                    Ver detalhes
                                </button>
                                <button
                                    className="h-11 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label text-xs font-semibold flex items-center justify-center transition-colors"
                                >
                                    Reagendar
                                </button>
                                <button
                                    className="h-11 rounded-lg bg-surface-container-low text-error hover:bg-error-container hover:text-on-error-container font-label text-xs font-semibold flex items-center justify-center transition-colors"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </article>
                    {/*  Lounge & Hospitalidade Exclusiva  */}
                    <div
                        className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-3"
                    >
                        <div className="flex items-center gap-2">
                            <span
                                className="material-symbols-outlined text-primary text-[20px]"
                                >room_service</span
                            >
                            <h4 className="font-headline text-base text-on-surface">
                                Hospitalidade Lounge Sol & Mar
                            </h4>
                        </div>
                        <p
                            className="text-xs text-on-surface-variant leading-relaxed"
                        >
                            Chegue alguns minutos antes para relaxar. Seu
                            atendimento inclui mimos de boas-vindas:
                        </p>
                        <div className="grid grid-cols-3 gap-2 text-center">
                            <div
                                className="p-2.5 rounded-lg bg-surface-container-lowest flex flex-col items-center gap-1"
                            >
                                <span
                                    className="material-symbols-outlined text-tertiary text-[20px]"
                                    >coffee</span
                                >
                                <span
                                    className="text-[11px] font-semibold text-on-surface"
                                    >Café Nespresso</span
                                >
                                <span className="text-[9px] text-on-surface-variant"
                                    >Grãos Selecionados</span
                                >
                            </div>
                            <div
                                className="p-2.5 rounded-lg bg-surface-container-lowest flex flex-col items-center gap-1"
                            >
                                <span
                                    className="material-symbols-outlined text-secondary text-[20px]"
                                    >sports_bar</span
                                >
                                <span
                                    className="text-[11px] font-semibold text-on-surface"
                                    >Chopp Artesanal</span
                                >
                                <span className="text-[9px] text-on-surface-variant"
                                    >Estupidamente Gelado</span
                                >
                            </div>
                            <div
                                className="p-2.5 rounded-lg bg-surface-container-lowest flex flex-col items-center gap-1"
                            >
                                <span
                                    className="material-symbols-outlined text-primary text-[20px]"
                                    >local_parking</span
                                >
                                <span
                                    className="text-[11px] font-semibold text-on-surface"
                                    >Valet Cortesia</span
                                >
                                <span className="text-[9px] text-on-surface-variant"
                                    >Segurança no Local</span
                                >
                            </div>
                        </div>
                    </div>
                    {/*  Políticas Oficiais da Unidade  */}
                    <div
                        className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-3"
                    >
                        <div className="flex items-center gap-2">
                            <span
                                className="material-symbols-outlined text-secondary text-[20px]"
                                >policy</span
                            >
                            <h4 className="font-headline text-base text-on-surface">
                                Políticas da Unidade
                            </h4>
                        </div>
                        <ul
                            className="flex flex-col gap-2 text-xs text-on-surface-variant"
                        >
                            <li className="flex items-start gap-2">
                                <span
                                    className="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5"
                                    >timer</span
                                >
                                <span
                                    ><strong>Tolerância de 15 minutos:</strong>
                                    Para garantir a excelência no atendimento de
                                    todos os clientes, atrasos superiores podem
                                    exigir readequação dos serviços.</span
                                >
                            </li>
                            <li className="flex items-start gap-2">
                                <span
                                    className="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5"
                                    >update</span
                                >
                                <span
                                    ><strong
                                        >Cancelamento e Reagendamento sem
                                        custo:</strong
                                    >
                                    Permitidos sem incidência de taxa até
                                    <strong>2 horas antes</strong> do horário
                                    agendado.</span
                                >
                            </li>
                            <li className="flex items-start gap-2">
                                <span
                                    className="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5"
                                    >event_busy</span
                                >
                                <span
                                    ><strong
                                        >Ausência sem aviso (No-show):</strong
                                    >
                                    O não comparecimento sem aviso prévio
                                    desconta automaticamente a cota mensal
                                    vinculada ao Clube Gold.</span
                                >
                            </li>
                        </ul>
                    </div>
                    {/*  Rodapé Ético Informativo  */}
                    <div className="pt-2 pb-4 text-center">
                        <p className="text-[11px] text-outline font-label">
                            Protótipo demonstrativo • Dados e valores
                            ilustrativos para validação visual
                        </p>
                    </div>
                </div>
            </div>
            
        
          </div>
        ) : (
          <div>

            <div className="flex flex-col w-full gap-space-lg">
                {/*  Sub-header & Segmented Switcher  */}
                <div className="flex flex-col gap-space-md">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span
                                className="font-caption text-caption text-neutral-500 uppercase tracking-widest text-[10px]"
                                >Agendamentos</span
                            >
                            <h1
                                className="font-headline-md-mobile text-headline-md-mobile text-brand-950 flex items-center gap-space-xs"
                            >
                                Sua Agenda
                                <span
                                    className="material-symbols-outlined text-[20px] text-brand-700"
                                    >calendar_month</span
                                >
                            </h1>
                        </div>
                        <div
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-100 text-brand-800"
                        >
                            <span
                                className="w-2 h-2 rounded-full bg-brand-600 animate-pulse"
                            ></span>
                            <span
                                className="font-label-md text-label-md text-[11px]"
                                >Em dia</span
                            >
                        </div>
                    </div>
                    {/*  Segmented Tabs (Agendados vs Anteriores)  */}
                    <div
                        className="flex bg-surface-container-high p-1 rounded-xl"
                        role="tablist"
                    >
                        <button
                            aria-selected="true"
                            className="flex-1 py-2.5 px-3 rounded-lg text-center font-label-md text-label-md transition-all duration-200 bg-surface-card text-brand-950 shadow-sm flex items-center justify-center gap-1.5"
                            id="tab-agendados"
                            
                            role="tab"
                        >
                            <span
                                className="material-symbols-outlined text-[17px] text-brand-700"
                                >event</span
                            >
                            <span>Agendados</span>
                            <span
                                className="ml-1 w-4 h-4 rounded-full bg-brand-50 text-brand-700 text-[10px] flex items-center justify-center font-bold"
                                >0</span
                            >
                        </button>
                        <button
                            aria-selected="false"
                            className="flex-1 py-2.5 px-3 rounded-lg text-center font-label-md text-label-md transition-all duration-200 text-neutral-500 hover:text-brand-950 flex items-center justify-center gap-1.5"
                            id="tab-anteriores"
                            
                            role="tab"
                        >
                            <span className="material-symbols-outlined text-[17px]"
                                >history</span
                            >
                            <span>Anteriores</span>
                        </button>
                    </div>
                </div>
                {/*  Empty State Main Card  */}
                <div
                    className="bg-surface-card rounded-[22px] shadow-[0_10px_32px_rgba(7,30,19,0.06)] overflow-hidden"
                    id="content-agendados"
                >
                    {/*  Editorial Atmosphere Image Container  */}
                    <div
                        className="relative w-full h-52 bg-surface-container-low overflow-hidden items-center justify-center"
                    >
                        <img
                            className="w-full h-full object-cover"
                            data-alt="Editorial close-up still life photograph of a luxurious barber shop ritual with an open standing calendar notebook, a fine badger hair shaving brush with wooden handle, and a rolled organic cotton towel resting on warm ivory linen surface. Soft natural morning side light casting deep green-tinted shadows, premium apothecary grooming aesthetic in deep forest green and warm gold tones."
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBuI6jqjDHH1c1C3HtdjdEGinuFZMkD46L0PZ3_MnVrtvpdtV3FoW7Fy52kLO9r2nDrGevtaa-4j8g7M6u40ylREvRzg-Hw88JsgC9NBavVn2P-7Opku3n_vLYH1spj26gmXFYYTextR7dyvgbqKS1l_fwT4RIESs3LdTg48cT9VagAQqDjGixMTxoaxAbrFcmTwQfoLOYDVIpgGglQ1xTW-oyQXpuf-mf_QtLwbVB"
                        />
                        {/*  Soft Gradient Scrim  */}
                        <div
                            className="absolute inset-0 bg-linear-to-t from-surface-card via-surface-card/20 to-transparent"
                        ></div>
                        {/*  Floating Badge of Craftsmanship  */}
                        <div
                            className="absolute bottom-3 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-surface-card/90 backdrop-blur-md shadow-sm"
                        >
                            <span
                                className="material-symbols-outlined text-accent-gold text-[16px]"
                                >content_cut</span
                            >
                            <span
                                className="font-caption text-caption text-brand-950 font-medium"
                                >Barbearia Motta • Sala Privada</span
                            >
                        </div>
                    </div>
                    {/*  Editorial Copy Block  */}
                    <div
                        className="p-space-lg flex flex-col items-center text-center -mt-2"
                    >
                        <div
                            className="w-10 h-10 rounded-full bg-brand-50 text-brand-700 flex items-center justify-center mb-space-sm shadow-inner"
                        >
                            <span className="material-symbols-outlined text-[22px]"
                                >event_available</span
                            >
                        </div>
                        <h2
                            className="font-headline-md-mobile text-headline-md-mobile text-brand-950 tracking-tight max-w-70"
                        >
                            Você ainda não tem nenhum agendamento
                        </h2>
                        <p
                            className="font-body-sm text-body-sm text-neutral-700 mt-2 max-w-75"
                        >
                            Que tal reservar seu próximo momento de cuidado?
                            Escolha o barbeiro da sua preferência e viva a
                            experiência completa Motta.
                        </p>
                        {/*  Primary Action CTA  */}
                        <div
                            className="w-full flex flex-col gap-space-sm mt-space-lg"
                        >
                            <button
                                className="w-full h-12 rounded-xl bg-brand-700 hover:bg-brand-800 active:scale-[0.99] text-on-primary font-label-md text-label-md flex items-center justify-center gap-space-xs shadow-[0_6px_20px_rgba(21,85,45,0.28)] transition-all"
                                
                                type="button"
                            >
                                <span
                                    className="material-symbols-outlined text-[20px]"
                                    >add</span
                                >
                                <span>Novo agendamento</span>
                            </button>
                            {/*  Secondary Actions in Dual Touch Tiles  */}
                            <div className="grid grid-cols-2 gap-space-sm w-full">
                                <button
                                    className="h-11 rounded-xl bg-surface-container-low hover:bg-surface-container text-neutral-950 font-label-md text-label-md flex items-center justify-center gap-1.5 transition-colors"
                                    
                                    type="button"
                                >
                                    <span
                                        className="material-symbols-outlined text-neutral-700 text-[18px]"
                                        >history</span
                                    >
                                    <span className="truncate">Ver histórico</span>
                                </button>
                                <a
                                    className="h-11 rounded-xl bg-surface-container-low hover:bg-surface-container text-neutral-950 font-label-md text-label-md flex items-center justify-center gap-1.5 transition-colors"
                                    href="#"
                                >
                                    <span
                                        className="material-symbols-outlined text-accent-gold text-[18px]"
                                        >workspace_premium</span
                                    >
                                    <span className="truncate">Clube Motta</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  Anteriores Tab Content (Hidden by default)  */}
                <div
                    className="hidden gap-space-md"
                    id="content-anteriores"
                >
                    <div
                        className="bg-surface-card rounded-[20px] p-space-md shadow-[0_6px_24px_rgba(7,30,19,0.05)] flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="w-12 h-12 rounded-xl bg-brand-50 flex flex-col items-center justify-center text-brand-800"
                            >
                                <span
                                    className="font-label-md text-label-md text-[11px] uppercase tracking-wider"
                                    >OUT</span
                                >
                                <span
                                    className="font-headline-sm-mobile text-headline-sm-mobile leading-none"
                                    >18</span
                                >
                            </div>
                            <div className="flex flex-col">
                                <span
                                    className="font-label-md text-label-md text-neutral-950"
                                    >Corte Clássico & Barba Terapia</span
                                >
                                <span
                                    className="font-caption text-caption text-neutral-500"
                                    >Mestre Barbeiro Rodrigo • 10:30</span
                                >
                            </div>
                        </div>
                        <span
                            className="px-2.5 py-1 rounded-full bg-surface-container text-neutral-700 font-caption text-caption text-[11px]"
                            >Concluído</span
                        >
                    </div>
                    <div
                        className="bg-surface-card rounded-[20px] p-space-md shadow-[0_6px_24px_rgba(7,30,19,0.05)] flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="w-12 h-12 rounded-xl bg-brand-50 flex flex-col items-center justify-center text-brand-800"
                            >
                                <span
                                    className="font-label-md text-label-md text-[11px] uppercase tracking-wider"
                                    >SET</span
                                >
                                <span
                                    className="font-headline-sm-mobile text-headline-sm-mobile leading-none"
                                    >24</span
                                >
                            </div>
                            <div className="flex flex-col">
                                <span
                                    className="font-label-md text-label-md text-neutral-950"
                                    >Aparar Barba & Alinhamento</span
                                >
                                <span
                                    className="font-caption text-caption text-neutral-500"
                                    >Mestre Barbeiro Rodrigo • 16:00</span
                                >
                            </div>
                        </div>
                        <span
                            className="px-2.5 py-1 rounded-full bg-surface-container text-neutral-700 font-caption text-caption text-[11px]"
                            >Concluído</span
                        >
                    </div>
                    <button
                        className="w-full py-3 rounded-xl bg-surface-card text-brand-700 font-label-md text-label-md flex items-center justify-center gap-2 shadow-sm hover:bg-surface-container-low transition-colors"
                        
                        type="button"
                    >
                        <span className="material-symbols-outlined text-[18px]"
                            >replay</span
                        >
                        <span>Repetir último serviço</span>
                    </button>
                </div>
                {/*  Pillars of the Motta Experience (Horizontal Stack on Mobile)  */}
                <div className="flex flex-col gap-space-sm pt-space-xs">
                    <div className="flex items-center justify-between px-1">
                        <span
                            className="font-label-md text-label-md text-neutral-950"
                            >Por que agendar pelo aplicativo?</span
                        >
                        <span
                            className="material-symbols-outlined text-accent-gold text-[18px]"
                            >star</span
                        >
                    </div>
                    <div className="flex flex-col gap-space-sm">
                        {/*  Item 1  */}
                        <div
                            className="p-3.5 bg-surface-card rounded-2xl shadow-[0_4px_16px_rgba(7,30,19,0.03)] flex items-start gap-3"
                        >
                            <div
                                className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 shrink-0 flex items-center justify-center"
                            >
                                <span
                                    className="material-symbols-outlined text-[20px]"
                                    >calendar_today</span
                                >
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span
                                    className="font-label-md text-label-md text-neutral-950"
                                    >Pontualidade e Praticidade</span
                                >
                                <span
                                    className="font-caption text-caption text-neutral-500 mt-0.5"
                                    >Sem filas. Seu horário é reservado
                                    exclusivamente com seu profissional de
                                    preferência.</span
                                >
                            </div>
                        </div>
                        {/*  Item 2  */}
                        <div
                            className="p-3.5 bg-surface-card rounded-2xl shadow-[0_4px_16px_rgba(7,30,19,0.03)] flex items-start gap-3"
                        >
                            <div
                                className="w-10 h-10 rounded-xl bg-surface-container-high text-secondary shrink-0 flex items-center justify-center"
                            >
                                <span
                                    className="material-symbols-outlined text-[20px]"
                                    >group</span
                                >
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span
                                    className="font-label-md text-label-md text-neutral-950"
                                    >Barbeiros Especialistas</span
                                >
                                <span
                                    className="font-caption text-caption text-neutral-500 mt-0.5"
                                    >Visagismo sob medida e consultoria de
                                    estilo pessoal a cada visita.</span
                                >
                            </div>
                        </div>
                        {/*  Item 3  */}
                        <div
                            className="p-3.5 bg-surface-card rounded-2xl shadow-[0_4px_16px_rgba(7,30,19,0.03)] flex items-start gap-3"
                        >
                            <div
                                className="w-10 h-10 rounded-xl bg-tertiary-fixed text-tertiary shrink-0 flex items-center justify-center"
                            >
                                <span
                                    className="material-symbols-outlined text-[20px]"
                                    >workspace_premium</span
                                >
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span
                                    className="font-label-md text-label-md text-neutral-950"
                                    >Vantagens Clube Motta</span
                                >
                                <span
                                    className="font-caption text-caption text-neutral-500 mt-0.5"
                                    >Membros acumulam créditos e desfrutam de
                                    bebidas premium de cortesia.</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
                {/*  Quick Barber Spotlight Preview  */}
                <div
                    className="p-space-md bg-brand-950 text-surface-card rounded-2xl shadow-lg relative overflow-hidden items-center justify-between"
                >
                    <div className="relative z-10 flex flex-col max-w-52.5">
                        <span
                            className="font-caption text-caption text-accent-gold uppercase tracking-widest text-[9px] font-semibold"
                            >Assinatura Mensal</span
                        >
                        <h3
                            className="font-headline-sm-mobile text-headline-sm-mobile text-on-primary mt-1"
                        >
                            Cortes Ilimitados?
                        </h3>
                        <p
                            className="font-caption text-caption text-neutral-300 mt-1"
                        >
                            Faça parte do Clube Motta e cuide do seu estilo toda
                            semana.
                        </p>
                        <a
                            className="mt-3 inline-flex items-center gap-1 font-label-md text-label-md text-accent-gold hover:underline"
                            href="#"
                        >
                            <span>Conhecer planos</span>
                            <span className="material-symbols-outlined text-[15px]"
                                >arrow_forward</span
                            >
                        </a>
                    </div>
                    {/*  Small Barber Silhouette / Icon Decor  */}
                    <div
                        className="relative z-10 w-16 h-16 rounded-full bg-brand-800/80 flex items-center justify-center text-accent-gold shadow-inner shrink-0"
                    >
                        <span className="material-symbols-outlined text-[32px]"
                            >shield_with_heart</span
                        >
                    </div>
                    {/*  Background Atmospheric Blob  */}
                    <div
                        className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-brand-800/30 blur-2xl pointer-events-none"
                    ></div>
                </div>
                {/*  Interactive Modal Drawer for Quick Booking Flow  */}
                <div
                    aria-labelledby="modal-title"
                    aria-modal="true"
                    className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-sm hidden justify-end transition-opacity duration-300"
                    id="quick-booking-modal"
                    role="dialog"
                >
                    <div
                        className="bg-surface-card w-full rounded-t-[28px] p-space-lg shadow-2xl max-h-187.75 overflow-y-auto flex flex-col gap-space-md"
                    >
                        {/*  Handle bar  */}
                        <div
                            className="w-12 h-1.5 rounded-full bg-neutral-300 mx-auto -mt-2"
                        ></div>
                        <div className="flex items-center justify-between">
                            <div>
                                <span
                                    className="font-caption text-caption text-neutral-500 uppercase tracking-widest text-[10px]"
                                    >Agendamento Rápido</span
                                >
                                <h2
                                    className="font-headline-sm-mobile text-headline-sm-mobile text-brand-950"
                                    id="modal-title"
                                >
                                    Selecione o Serviço
                                </h2>
                            </div>
                            <button
                                aria-label="Fechar"
                                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-neutral-700"
                                
                            >
                                <span
                                    className="material-symbols-outlined text-[20px]"
                                    >close</span
                                >
                            </button>
                        </div>
                        {/*  Quick Services List  */}
                        <div className="flex flex-col gap-2.5">
                            <button
                                className="service-option p-3.5 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-between text-left transition-colors"
                                
                            >
                                <div className="flex items-center gap-3">
                                    <span
                                        className="material-symbols-outlined text-brand-700 text-[22px]"
                                        >content_cut</span
                                    >
                                    <div>
                                        <p
                                            className="font-label-md text-label-md text-neutral-950"
                                        >
                                            Corte Clássico & Finalização
                                        </p>
                                        <p
                                            className="font-caption text-caption text-neutral-500"
                                        >
                                            45 minutos • Lavagem inclusa
                                        </p>
                                    </div>
                                </div>
                                <span
                                    className="font-label-md text-label-md text-brand-950"
                                    >R$ 75</span
                                >
                            </button>
                            <button
                                className="service-option p-3.5 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-between text-left transition-colors"
                                
                            >
                                <div className="flex items-center gap-3">
                                    <span
                                        className="material-symbols-outlined text-brand-700 text-[22px]"
                                        >face</span
                                    >
                                    <div>
                                        <p
                                            className="font-label-md text-label-md text-neutral-950"
                                        >
                                            Barba Terapia com Toalha Quente
                                        </p>
                                        <p
                                            className="font-caption text-caption text-neutral-500"
                                        >
                                            30 minutos • Óleos essenciais
                                        </p>
                                    </div>
                                </div>
                                <span
                                    className="font-label-md text-label-md text-brand-950"
                                    >R$ 60</span
                                >
                            </button>
                            <button
                                className="service-option p-3.5 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-between text-left transition-colors"
                                
                            >
                                <div className="flex items-center gap-3">
                                    <span
                                        className="material-symbols-outlined text-accent-gold text-[22px]"
                                        >stars</span
                                    >
                                    <div>
                                        <p
                                            className="font-label-md text-label-md text-neutral-950"
                                        >
                                            Combo Motta (Corte + Barba)
                                        </p>
                                        <p
                                            className="font-caption text-caption text-neutral-500"
                                        >
                                            1h 15 min • Massagem relaxante
                                        </p>
                                    </div>
                                </div>
                                <span
                                    className="font-label-md text-label-md text-brand-950"
                                    >R$ 120</span
                                >
                            </button>
                        </div>
                        {/*  Quick Date/Time Mock  */}
                        <div className="flex flex-col gap-2 pt-1">
                            <label
                                className="font-label-md text-label-md text-neutral-950"
                                >Data mais próxima sugerida</label
                            >
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    className="date-chip py-2 px-1 text-center rounded-xl bg-brand-700 text-on-primary font-label-md text-label-md flex flex-col items-center"
                                    type="button"
                                >
                                    <span
                                        className="text-[10px] opacity-80 uppercase"
                                        >Hoje</span
                                    >
                                    <span className="text-[15px] font-bold"
                                        >15:30</span
                                    >
                                </button>
                                <button
                                    className="date-chip py-2 px-1 text-center rounded-xl bg-surface-container-low text-neutral-950 font-label-md text-label-md flex flex-col items-center"
                                    type="button"
                                >
                                    <span
                                        className="text-[10px] text-neutral-500 uppercase"
                                        >Amanhã</span
                                    >
                                    <span className="text-[15px] font-bold"
                                        >11:00</span
                                    >
                                </button>
                                <button
                                    className="date-chip py-2 px-1 text-center rounded-xl bg-surface-container-low text-neutral-950 font-label-md text-label-md flex flex-col items-center"
                                    type="button"
                                >
                                    <span
                                        className="text-[10px] text-neutral-500 uppercase"
                                        >Quinta</span
                                    >
                                    <span className="text-[15px] font-bold"
                                        >14:00</span
                                    >
                                </button>
                            </div>
                        </div>
                        <button
                            className="w-full h-12 rounded-xl bg-brand-700 hover:bg-brand-800 active:scale-[0.99] text-on-primary font-label-md text-label-md flex items-center justify-center gap-2 mt-2 shadow-[0_6px_20px_rgba(21,85,45,0.28)] transition-all"
                            
                            type="button"
                        >
                            <span className="material-symbols-outlined text-[19px]"
                                >check_circle</span
                            >
                            <span>Confirmar Horário</span>
                        </button>
                    </div>
                </div>
            </div>
            
        
          </div>
        )
      ) : (
        <div>

            <div className="flex flex-col w-full space-y-5">
                {/*  Top Bar: Context Badge, Title & Main CTA  */}
                <section className="flex flex-col space-y-3 pt-1">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex flex-col">
                            <span
                                className="font-caption text-caption uppercase tracking-[0.16em] text-accent-gold font-semibold"
                                >Agenda Motta</span
                            >
                            <div className="flex items-center gap-2">
                                <h1
                                    className="font-headline-lg-mobile text-headline-lg-mobile text-brand-950 font-normal"
                                >
                                    Agendamentos
                                </h1>
                                <span className="text-brand-700 text-lg">📅</span>
                            </div>
                        </div>
                        <button
                            className="inline-flex items-center justify-center gap-1.5 px-4 h-11 rounded-xl bg-brand-700 text-on-primary font-label-md text-label-md active:bg-brand-800 shadow-[0_4px_16px_rgba(21,85,45,0.22)] active:scale-95 transition-all"
                            type="button"
                        >
                            <span className="material-symbols-outlined text-[18px]"
                                >add</span
                            >
                            <span className="">Novo</span>
                        </button>
                    </div>
                    {/*  Segmented Filter Control  */}
                    <div
                        className="p-1 rounded-xl bg-surface-container flex items-center gap-1 shadow-inner"
                    >
                        <button
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-neutral-700 font-label-md text-label-md hover:text-brand-900 transition-colors"
                            type="button"
                        >
                            <span className="material-symbols-outlined text-[18px]"
                                >calendar_today</span
                            >
                            <span className="">Agendados</span>
                            <span
                                className="ml-1 px-1.5 py-0.5 rounded-full bg-surface-container-highest text-neutral-700 font-caption text-caption text-xs font-semibold"
                                >1</span
                            >
                        </button>
                        <button
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-brand-900 text-on-primary font-label-md text-label-md shadow-sm"
                            type="button"
                        >
                            <span className="material-symbols-outlined text-[18px]"
                                >history</span
                            >
                            <span className="">Anteriores</span>
                            <span
                                className="ml-1 px-1.5 py-0.5 rounded-full bg-accent-gold text-brand-950 font-caption text-caption text-xs font-bold"
                                >12</span
                            >
                        </button>
                    </div>
                </section>
                {/*  Horizontal Filter Chips (Scrollable)  */}
                <section className="flex flex-col space-y-2">
                    <div
                        className="flex items-center gap-2 overflow-x-auto pb-1 -mx-margin-mobile px-margin-mobile scrollbar-none"
                    >
                        <button
                            className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-surface-card shadow-[0_2px_8px_rgba(10,30,19,0.04)] text-on-surface font-caption text-caption font-medium active:bg-surface-container transition-colors"
                            type="button"
                        >
                            <span
                                className="material-symbols-outlined text-[16px] text-brand-700"
                                >date_range</span
                            >
                            <span className="">Período: 2024</span>
                            <span
                                className="material-symbols-outlined text-[16px] text-neutral-500"
                                >expand_more</span
                            >
                        </button>
                        <button
                            className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-surface-card shadow-[0_2px_8px_rgba(10,30,19,0.04)] text-on-surface font-caption text-caption font-medium active:bg-surface-container transition-colors"
                            type="button"
                        >
                            <span
                                className="material-symbols-outlined text-[16px] text-brand-700"
                                >content_cut</span
                            >
                            <span className="">Serviço</span>
                            <span
                                className="material-symbols-outlined text-[16px] text-neutral-500"
                                >expand_more</span
                            >
                        </button>
                        <button
                            className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-surface-card shadow-[0_2px_8px_rgba(10,30,19,0.04)] text-on-surface font-caption text-caption font-medium active:bg-surface-container transition-colors"
                            type="button"
                        >
                            <span
                                className="material-symbols-outlined text-[16px] text-brand-700"
                                >person</span
                            >
                            <span className="">Barbeiro</span>
                            <span
                                className="material-symbols-outlined text-[16px] text-neutral-500"
                                >expand_more</span
                            >
                        </button>
                        <button
                            className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-surface-card shadow-[0_2px_8px_rgba(10,30,19,0.04)] text-on-surface font-caption text-caption font-medium active:bg-surface-container transition-colors"
                            type="button"
                        >
                            <span
                                className="material-symbols-outlined text-[16px] text-semantic-success"
                                >check_circle</span
                            >
                            <span className="">Status</span>
                            <span
                                className="material-symbols-outlined text-[16px] text-neutral-500"
                                >expand_more</span
                            >
                        </button>
                    </div>
                    {/*  Group Metadata Counter  */}
                    <div className="flex items-center justify-between pt-1">
                        <h2
                            className="font-headline-sm-mobile text-headline-sm-mobile text-brand-950"
                        >
                            Histórico de agendamentos
                        </h2>
                        <span className="font-caption text-caption text-neutral-500"
                            >12 visitas concluídas</span
                        >
                    </div>
                </section>
                {/*  Timeline Cards Grouped by Month  */}
                <section className="flex flex-col space-y-5">
                    {/*  Item 1: Outubro 2024  */}
                    <div className="flex flex-col space-y-2.5">
                        <div className="flex items-center gap-1.5 text-brand-800">
                            <span className="material-symbols-outlined text-[18px]"
                                >calendar_month</span
                            >
                            <span
                                className="font-label-md text-label-md uppercase tracking-wider font-semibold"
                                >Outubro 2024</span
                            >
                        </div>
                        <div
                            className="bg-surface-card rounded-2xl p-4 shadow-[0_8px_24px_rgba(10,30,19,0.06)] flex flex-col space-y-3.5"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3 min-w-0">
                                    {/*  Calendar Badge  */}
                                    <div
                                        className="w-14 h-14 rounded-xl bg-surface-container flex flex-col items-center justify-center shrink-0 text-center"
                                    >
                                        <span
                                            className="font-caption text-caption uppercase text-neutral-500 font-semibold tracking-wide leading-none"
                                            >SÁB</span
                                        >
                                        <span
                                            className="font-headline-sm-mobile text-headline-sm-mobile text-brand-950 font-bold leading-tight mt-0.5"
                                            >05</span
                                        >
                                        <span
                                            className="font-caption text-caption uppercase text-neutral-500 font-medium text-[10px] leading-none"
                                            >OUT</span
                                        >
                                    </div>
                                    {/*  Professional Info  */}
                                    <div
                                        className="flex items-center gap-2.5 min-w-0"
                                    >
                                        <img
                                            className="w-10 h-10 rounded-full object-cover shrink-0"
                                            data-alt="Portrait photo of Orlando Junior, professional male barber smiling warmly with a trimmed beard and clean haircut in a warm ambient barbershop background."
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjsgsbU60zpL-mhDjtLN7-eIkFkO-wKG1KLOHju-RUtbKekoiSglD1K0TlTVWVlvtIxPmxuVi5AkO3Sd8S4ATQclVcejFg1a2fU_ulYxxnPB5y17ZgIVZUs2_prBOsouAcKeYoIg4wcYvH9faAEpoDdujdzyO_rs6Qkuc63kZdsIznsYiZsLMq-pEqAhYykjlf1drcIjtKodsoGYaukMoMESozfmGh7AN15o2Oxb2o"
                                        />
                                        <div className="flex flex-col min-w-0">
                                            <span
                                                className="font-body-md text-body-md font-semibold text-brand-950 truncate"
                                                >Orlando Junior</span
                                            >
                                            <span
                                                className="font-caption text-caption text-neutral-500 truncate"
                                                >Barbeiro Master</span
                                            >
                                        </div>
                                    </div>
                                </div>
                                {/*  Status Badge  */}
                                <span
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-100 text-semantic-success font-caption text-caption font-semibold shrink-0"
                                >
                                    <span
                                        className="w-1.5 h-1.5 rounded-full bg-semantic-success"
                                    ></span>
                                    Concluído
                                </span>
                            </div>
                            {/*  Service & Value Breakdown  */}
                            <div
                                className="p-3 rounded-xl bg-surface-container-low flex flex-col space-y-1.5"
                            >
                                <div
                                    className="flex items-center gap-2 text-neutral-700"
                                >
                                    <span
                                        className="material-symbols-outlined text-[17px] text-brand-700 shrink-0"
                                        >content_cut</span
                                    >
                                    <span
                                        className="font-body-sm text-body-sm text-brand-950 font-medium line-clamp-1"
                                        >Sobrancelha, Hidratação Capilar,
                                        Corte</span
                                    >
                                </div>
                                <div
                                    className="flex items-center justify-between text-neutral-500 font-caption text-caption pt-0.5"
                                >
                                    <span className="">Duração: ~60 min</span>
                                    <span
                                        className="font-body-md text-body-md font-semibold text-brand-950"
                                        >R$ 109,99</span
                                    >
                                </div>
                            </div>
                            {/*  Card Bottom Actions  */}
                            <div className="grid grid-cols-2 gap-2 pt-0.5">
                                <button
                                    className="h-11 rounded-xl bg-surface-container text-neutral-950 font-label-md text-label-md flex items-center justify-center gap-1.5 active:bg-surface-container-high transition-colors"
                                    type="button"
                                >
                                    <span
                                        className="material-symbols-outlined text-[18px]"
                                        >visibility</span
                                    >
                                    <span className="">Detalhes</span>
                                </button>
                                <button
                                    className="h-11 rounded-xl bg-brand-700 text-on-primary font-label-md text-label-md flex items-center justify-center gap-1.5 active:bg-brand-800 transition-colors shadow-sm"
                                    type="button"
                                >
                                    <span
                                        className="material-symbols-outlined text-[18px]"
                                        >event_repeat</span
                                    >
                                    <span className="">Reagendar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/*  Item 2: Setembro 2024  */}
                    <div className="flex flex-col space-y-2.5">
                        <div className="flex items-center gap-1.5 text-brand-800">
                            <span className="material-symbols-outlined text-[18px]"
                                >calendar_month</span
                            >
                            <span
                                className="font-label-md text-label-md uppercase tracking-wider font-semibold"
                                >Setembro 2024</span
                            >
                        </div>
                        <div
                            className="bg-surface-card rounded-2xl p-4 shadow-[0_8px_24px_rgba(10,30,19,0.06)] flex flex-col space-y-3.5"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div
                                        className="w-14 h-14 rounded-xl bg-surface-container flex flex-col items-center justify-center shrink-0 text-center"
                                    >
                                        <span
                                            className="font-caption text-caption uppercase text-neutral-500 font-semibold tracking-wide leading-none"
                                            >QUI</span
                                        >
                                        <span
                                            className="font-headline-sm-mobile text-headline-sm-mobile text-brand-950 font-bold leading-tight mt-0.5"
                                            >05</span
                                        >
                                        <span
                                            className="font-caption text-caption uppercase text-neutral-500 font-medium text-[10px] leading-none"
                                            >SET</span
                                        >
                                    </div>
                                    <div
                                        className="flex items-center gap-2.5 min-w-0"
                                    >
                                        <img
                                            className="w-10 h-10 rounded-full object-cover shrink-0"
                                            data-alt="Portrait headshot of Matheus Albuquerque, young professional barber with classic vintage grooming style in an editorial barbershop lounge."
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAzEOx-EAg3M0lmGCVafYjzjuh1RAhjjPb0cnEIixbXWly4Km53SrvovGH2_GIJL48PHomHNWXCnLu85p0sMRnx89hGSNOGXDrR-GKRo8oVnRmPpS4lMbGP8vr-IwuJ1egK_gMir8fjX3bZL4erYEsJT14WfEI_1wM0G4_OwymYvbDlIvqnGVJ62sqrOVeKpsfoHkDa5FN_h8pb8SkdCq4DlcQKrzItntpaqcvncGl"
                                        />
                                        <div className="flex flex-col min-w-0">
                                            <span
                                                className="font-body-md text-body-md font-semibold text-brand-950 truncate"
                                                >Matheus Albuquerque</span
                                            >
                                            <span
                                                className="font-caption text-caption text-neutral-500 truncate"
                                                >Barbeiro Estilista</span
                                            >
                                        </div>
                                    </div>
                                </div>
                                <span
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-100 text-semantic-success font-caption text-caption font-semibold shrink-0"
                                >
                                    <span
                                        className="w-1.5 h-1.5 rounded-full bg-semantic-success"
                                    ></span>
                                    Concluído
                                </span>
                            </div>
                            <div
                                className="p-3 rounded-xl bg-surface-container-low flex flex-col space-y-1.5"
                            >
                                <div
                                    className="flex items-center gap-2 text-neutral-700"
                                >
                                    <span
                                        className="material-symbols-outlined text-[17px] text-brand-700 shrink-0"
                                        >content_cut</span
                                    >
                                    <span
                                        className="font-body-sm text-body-sm text-brand-950 font-medium line-clamp-1"
                                        >Corte Masculino Degradê</span
                                    >
                                </div>
                                <div
                                    className="flex items-center justify-between text-neutral-500 font-caption text-caption pt-0.5"
                                >
                                    <span className="">Duração: ~35 min</span>
                                    <span
                                        className="font-body-md text-body-md font-semibold text-brand-950"
                                        >R$ 49,99</span
                                    >
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 pt-0.5">
                                <button
                                    className="h-11 rounded-xl bg-surface-container text-neutral-950 font-label-md text-label-md flex items-center justify-center gap-1.5 active:bg-surface-container-high transition-colors"
                                    type="button"
                                >
                                    <span
                                        className="material-symbols-outlined text-[18px]"
                                        >visibility</span
                                    >
                                    <span className="">Detalhes</span>
                                </button>
                                <button
                                    className="h-11 rounded-xl bg-brand-700 text-on-primary font-label-md text-label-md flex items-center justify-center gap-1.5 active:bg-brand-800 transition-colors shadow-sm"
                                    type="button"
                                >
                                    <span
                                        className="material-symbols-outlined text-[18px]"
                                        >event_repeat</span
                                    >
                                    <span className="">Reagendar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/*  Item 3: Agosto 2024  */}
                    <div className="flex flex-col space-y-2.5">
                        <div className="flex items-center gap-1.5 text-brand-800">
                            <span className="material-symbols-outlined text-[18px]"
                                >calendar_month</span
                            >
                            <span
                                className="font-label-md text-label-md uppercase tracking-wider font-semibold"
                                >Agosto 2024</span
                            >
                        </div>
                        <div
                            className="bg-surface-card rounded-2xl p-4 shadow-[0_8px_24px_rgba(10,30,19,0.06)] flex flex-col space-y-3.5"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div
                                        className="w-14 h-14 rounded-xl bg-surface-container flex flex-col items-center justify-center shrink-0 text-center"
                                    >
                                        <span
                                            className="font-caption text-caption uppercase text-neutral-500 font-semibold tracking-wide leading-none"
                                            >DOM</span
                                        >
                                        <span
                                            className="font-headline-sm-mobile text-headline-sm-mobile text-brand-950 font-bold leading-tight mt-0.5"
                                            >04</span
                                        >
                                        <span
                                            className="font-caption text-caption uppercase text-neutral-500 font-medium text-[10px] leading-none"
                                            >AGO</span
                                        >
                                    </div>
                                    <div
                                        className="flex items-center gap-2.5 min-w-0"
                                    >
                                        <img
                                            className="w-10 h-10 rounded-full object-cover shrink-0"
                                            data-alt="Portrait photography of Wanderson Mota, senior master barber wearing dark bespoke apron against warm atmospheric leather and wooden barber shop salon."
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAy5gUUfShdoxUEG0cxtO35QCuRn3i2bA8fDurty91wOniGfyaoPfYDvj8E-VRqCeIrDdAeG653ONwBq4cQsgEc1sP6FRdoTVBfUES5oP4Tb497_GpKWPlixPkfK2AM4wZEPEqo9mNccGpwvm4BoP6yTkdocOx6o9uduabL1kpEpE2zGe_og0iMm30qwVKhX51t9yFtzdqQBIaFLUmh3qrFKRX8uvUhZfAI3FfOqd69"
                                        />
                                        <div className="flex flex-col min-w-0">
                                            <span
                                                className="font-body-md text-body-md font-semibold text-brand-950 truncate"
                                                >Wanderson Mota</span
                                            >
                                            <span
                                                className="font-caption text-caption text-neutral-500 truncate"
                                                >Barbeiro Sênior</span
                                            >
                                        </div>
                                    </div>
                                </div>
                                <span
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-100 text-semantic-success font-caption text-caption font-semibold shrink-0"
                                >
                                    <span
                                        className="w-1.5 h-1.5 rounded-full bg-semantic-success"
                                    ></span>
                                    Concluído
                                </span>
                            </div>
                            <div
                                className="p-3 rounded-xl bg-surface-container-low flex flex-col space-y-1.5"
                            >
                                <div
                                    className="flex items-center gap-2 text-neutral-700"
                                >
                                    <span
                                        className="material-symbols-outlined text-[17px] text-brand-700 shrink-0"
                                        >content_cut</span
                                    >
                                    <span
                                        className="font-body-sm text-body-sm text-brand-950 font-medium line-clamp-1"
                                        >Corte Tradicional na Tesoura</span
                                    >
                                </div>
                                <div
                                    className="flex items-center justify-between text-neutral-500 font-caption text-caption pt-0.5"
                                >
                                    <span className="">Duração: ~40 min</span>
                                    <span
                                        className="font-body-md text-body-md font-semibold text-brand-950"
                                        >R$ 49,99</span
                                    >
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 pt-0.5">
                                <button
                                    className="h-11 rounded-xl bg-surface-container text-neutral-950 font-label-md text-label-md flex items-center justify-center gap-1.5 active:bg-surface-container-high transition-colors"
                                    type="button"
                                >
                                    <span
                                        className="material-symbols-outlined text-[18px]"
                                        >visibility</span
                                    >
                                    <span className="">Detalhes</span>
                                </button>
                                <button
                                    className="h-11 rounded-xl bg-brand-700 text-on-primary font-label-md text-label-md flex items-center justify-center gap-1.5 active:bg-brand-800 transition-colors shadow-sm"
                                    type="button"
                                >
                                    <span
                                        className="material-symbols-outlined text-[18px]"
                                        >event_repeat</span
                                    >
                                    <span className="">Reagendar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/*  Item 4: Junho 2024  */}
                    <div className="flex flex-col space-y-2.5">
                        <div className="flex items-center gap-1.5 text-brand-800">
                            <span className="material-symbols-outlined text-[18px]"
                                >calendar_month</span
                            >
                            <span
                                className="font-label-md text-label-md uppercase tracking-wider font-semibold"
                                >Junho 2024</span
                            >
                        </div>
                        <div
                            className="bg-surface-card rounded-2xl p-4 shadow-[0_8px_24px_rgba(10,30,19,0.06)] flex flex-col space-y-3.5"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div
                                        className="w-14 h-14 rounded-xl bg-surface-container flex flex-col items-center justify-center shrink-0 text-center"
                                    >
                                        <span
                                            className="font-caption text-caption uppercase text-neutral-500 font-semibold tracking-wide leading-none"
                                            >QUA</span
                                        >
                                        <span
                                            className="font-headline-sm-mobile text-headline-sm-mobile text-brand-950 font-bold leading-tight mt-0.5"
                                            >12</span
                                        >
                                        <span
                                            className="font-caption text-caption uppercase text-neutral-500 font-medium text-[10px] leading-none"
                                            >JUN</span
                                        >
                                    </div>
                                    <div
                                        className="flex items-center gap-2.5 min-w-0"
                                    >
                                        <img
                                            className="w-10 h-10 rounded-full object-cover shrink-0"
                                            data-alt="Close-up portrait of Welerson Mota, confident barber stylist with modern haircut and stylish warm lighting in an upscale gentlemens salon."
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuARaQTkWYaQd-wrpvgN_ADN6ALsjtK_U9qE8b8127_ZEiiKYbzSYzHXCuMdFPHb-RD-h0K9l85dmRY3W_n4LDAhrDQb-Fry7vrnNTpRish8gyrbBPVaRC0mUikIxI1EMiKV3gbZvZZp4wmhZ69PHOn7nAB31tdkig9Fs0jdZMEmLWbYCI4hdC4hc2ciktRiehu1EWDbF-fIA5d0kpfFsScpF7ZCmAB31w3m4q478pM4"
                                        />
                                        <div className="flex flex-col min-w-0">
                                            <span
                                                className="font-body-md text-body-md font-semibold text-brand-950 truncate"
                                                >Welerson Mota</span
                                            >
                                            <span
                                                className="font-caption text-caption text-neutral-500 truncate"
                                                >Barbeiro Estilista</span
                                            >
                                        </div>
                                    </div>
                                </div>
                                <span
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-100 text-semantic-success font-caption text-caption font-semibold shrink-0"
                                >
                                    <span
                                        className="w-1.5 h-1.5 rounded-full bg-semantic-success"
                                    ></span>
                                    Concluído
                                </span>
                            </div>
                            <div
                                className="p-3 rounded-xl bg-surface-container-low flex flex-col space-y-1.5"
                            >
                                <div
                                    className="flex items-center gap-2 text-neutral-700"
                                >
                                    <span
                                        className="material-symbols-outlined text-[17px] text-brand-700 shrink-0"
                                        >content_cut</span
                                    >
                                    <span
                                        className="font-body-sm text-body-sm text-brand-950 font-medium line-clamp-1"
                                        >Design de Sobrancelha, Corte</span
                                    >
                                </div>
                                <div
                                    className="flex items-center justify-between text-neutral-500 font-caption text-caption pt-0.5"
                                >
                                    <span className="">Duração: ~45 min</span>
                                    <span
                                        className="font-body-md text-body-md font-semibold text-brand-950"
                                        >R$ 72,00</span
                                    >
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 pt-0.5">
                                <button
                                    className="h-11 rounded-xl bg-surface-container text-neutral-950 font-label-md text-label-md flex items-center justify-center gap-1.5 active:bg-surface-container-high transition-colors"
                                    type="button"
                                >
                                    <span
                                        className="material-symbols-outlined text-[18px]"
                                        >visibility</span
                                    >
                                    <span className="">Detalhes</span>
                                </button>
                                <button
                                    className="h-11 rounded-xl bg-brand-700 text-on-primary font-label-md text-label-md flex items-center justify-center gap-1.5 active:bg-brand-800 transition-colors shadow-sm"
                                    type="button"
                                >
                                    <span
                                        className="material-symbols-outlined text-[18px]"
                                        >event_repeat</span
                                    >
                                    <span className="">Reagendar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/*  Item 5: Maio 2024  */}
                    <div className="flex flex-col space-y-2.5">
                        <div className="flex items-center gap-1.5 text-brand-800">
                            <span className="material-symbols-outlined text-[18px]"
                                >calendar_month</span
                            >
                            <span
                                className="font-label-md text-label-md uppercase tracking-wider font-semibold"
                                >Maio 2024</span
                            >
                        </div>
                        <div
                            className="bg-surface-card rounded-2xl p-4 shadow-[0_8px_24px_rgba(10,30,19,0.06)] flex flex-col space-y-3.5"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div
                                        className="w-14 h-14 rounded-xl bg-surface-container flex flex-col items-center justify-center shrink-0 text-center"
                                    >
                                        <span
                                            className="font-caption text-caption uppercase text-neutral-500 font-semibold tracking-wide leading-none"
                                            >DOM</span
                                        >
                                        <span
                                            className="font-headline-sm-mobile text-headline-sm-mobile text-brand-950 font-bold leading-tight mt-0.5"
                                            >05</span
                                        >
                                        <span
                                            className="font-caption text-caption uppercase text-neutral-500 font-medium text-[10px] leading-none"
                                            >MAI</span
                                        >
                                    </div>
                                    <div
                                        className="flex items-center gap-2.5 min-w-0"
                                    >
                                        <img
                                            className="w-10 h-10 rounded-full object-cover shrink-0"
                                            data-alt="Portrait photo of Orlando Junior smiling with friendly hospitable barbershop atmosphere, warm natural bokeh lights in background."
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfS13qkd_weDP5lBnRo0qle5Sak6vLaypbbDRZnH3yD8mwsxNipdiFEkAn2kEYjzvMF13K4xMpGyrxmkIVxct_Fjzo7NszVJKwPdmn3nq7drm2ck8uMU1ofBzW1Tw3xtZ4X985eXFY1bEzYXDlDXNNGOlu4nzoWr6r5H0ybC_ppKoYkwKMiRPnUu43WKLIXrDkMjQbKBRf4iv98WC7rcljeBTLIW6aXQ-1JUJlQA1c"
                                        />
                                        <div className="flex flex-col min-w-0">
                                            <span
                                                className="font-body-md text-body-md font-semibold text-brand-950 truncate"
                                                >Orlando Junior</span
                                            >
                                            <span
                                                className="font-caption text-caption text-neutral-500 truncate"
                                                >Barbeiro Master</span
                                            >
                                        </div>
                                    </div>
                                </div>
                                <span
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-100 text-semantic-success font-caption text-caption font-semibold shrink-0"
                                >
                                    <span
                                        className="w-1.5 h-1.5 rounded-full bg-semantic-success"
                                    ></span>
                                    Concluído
                                </span>
                            </div>
                            <div
                                className="p-3 rounded-xl bg-surface-container-low flex flex-col space-y-1.5"
                            >
                                <div
                                    className="flex items-center gap-2 text-neutral-700"
                                >
                                    <span
                                        className="material-symbols-outlined text-[17px] text-brand-700 shrink-0"
                                        >content_cut</span
                                    >
                                    <span
                                        className="font-body-sm text-body-sm text-brand-950 font-medium line-clamp-1"
                                        >Hidratação Capilar, Corte</span
                                    >
                                </div>
                                <div
                                    className="flex items-center justify-between text-neutral-500 font-caption text-caption pt-0.5"
                                >
                                    <span className="">Duração: ~50 min</span>
                                    <span
                                        className="font-body-md text-body-md font-semibold text-brand-950"
                                        >R$ 75,00</span
                                    >
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 pt-0.5">
                                <button
                                    className="h-11 rounded-xl bg-surface-container text-neutral-950 font-label-md text-label-md flex items-center justify-center gap-1.5 active:bg-surface-container-high transition-colors"
                                    type="button"
                                >
                                    <span
                                        className="material-symbols-outlined text-[18px]"
                                        >visibility</span
                                    >
                                    <span className="">Detalhes</span>
                                </button>
                                <button
                                    className="h-11 rounded-xl bg-brand-700 text-on-primary font-label-md text-label-md flex items-center justify-center gap-1.5 active:bg-brand-800 transition-colors shadow-sm"
                                    type="button"
                                >
                                    <span
                                        className="material-symbols-outlined text-[18px]"
                                        >event_repeat</span
                                    >
                                    <span className="">Reagendar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                {/*  Loyalty Footer Callout Note  */}
                <footer className="pt-2 pb-1">
                    <div
                        className="p-3.5 rounded-xl bg-surface-card shadow-[0_4px_16px_rgba(10,30,19,0.04)] flex items-center gap-3"
                    >
                        <div
                            className="w-9 h-9 rounded-full bg-brand-50 flex items-center justify-center shrink-0 text-brand-700"
                        >
                            <span className="material-symbols-outlined text-[20px]"
                                >verified_user</span
                            >
                        </div>
                        <p
                            className="font-caption text-caption text-neutral-700 leading-snug"
                        >
                            <strong className="font-semibold text-brand-950"
                                >Visual sempre impecável:</strong
                            >
                            Você é membro assíduo do Clube Motta há 8 meses.
                        </p>
                    </div>
                </footer>
            </div>
            
        
        </div>
      )}

      {showCancelModal && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-brand-950/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-surface rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border border-outline-variant/30 flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <div className="w-12 h-1.5 bg-neutral-300 rounded-full mx-auto mb-2" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-error-container text-semantic-danger flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">event_busy</span>
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-headline text-on-surface">Confirmar cancelamento</h2>
                <span className="text-xs text-neutral-500">Unidade Sol &amp; Mar • Macaé - RJ</span>
              </div>
            </div>
            <p className="text-sm text-neutral-700 leading-relaxed">
              Tem certeza que deseja cancelar seu atendimento? Sua cota de corte será devolvida imediatamente ao seu saldo mensal.
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={handleConfirmCancel}
                className="w-full h-12 rounded-xl bg-semantic-danger text-on-primary font-semibold text-sm hover:opacity-90 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">delete</span>
                Confirmar cancelamento
              </button>
              <button
                onClick={() => setShowCancelModal(false)}
                className="w-full h-11 rounded-xl bg-surface-container-high text-on-surface font-medium text-sm hover:bg-surface-container-highest transition-colors"
              >
                Voltar e manter agendamento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
