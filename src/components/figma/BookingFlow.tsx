import React, { useState } from "react"
import { useStore } from "../../app-state"
import { services, professionals } from "../../data"
import type { Navigate } from "../../types"

export function BookingFlow({
  onFinish,
  onHome,
}: {
  onFinish: () => void
  onHome: () => void
}) {
  const { save, notify } = useStore()
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1)
  const [selectedServices, setSelectedServices] = useState<number[]>([2, 3])
  const [selectedPro, setSelectedPro] = useState<number>(0)
  const [selectedDate, setSelectedDate] = useState("2026-11-05")
  const [selectedTime, setSelectedTime] = useState("15:00")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")

  const nextStep = () => {
    if (step === 1) {
      if (selectedServices.length === 0) {
        setAlertMsg("Selecione ao menos um serviço para continuar.")
        return
      }
      setAlertMsg("")
      setStep(2)
    } else if (step === 2) {
      setAlertMsg("")
      setStep(3)
    } else if (step === 3) {
      if (!selectedTime) {
        setAlertMsg("Selecione um horário disponível.")
        return
      }
      setAlertMsg("")
      setStep(4)
    } else if (step === 4) {
      if (!termsAccepted) {
        setAlertMsg("É necessário o aceite das políticas de cancelamento.")
        return
      }
      setAlertMsg("")
      save({
        id: "ag-" + Date.now(),
        date: selectedDate,
        time: selectedTime,
        pro: selectedPro,
        svc: selectedServices,
        total: 32.30,
        minutes: 65,
        status: "scheduled",
      })
      notify("Agendamento simulado com sucesso!")
      setStep(5)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep((s) => (s - 1) as any)
      setAlertMsg("")
    } else {
      onHome()
    }
  }

  return (
    <div className="flex flex-col w-full pb-20 booking-layout">
      {alertMsg && (
        <div role="alert" className="mx-4 mt-3 p-3 bg-error-container text-semantic-danger rounded-xl text-xs font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined text-base">warning</span>
          <span>{alertMsg}</span>
        </div>
      )}

      {step === 1 && (
        <div className="w-full">

            <div className="flex flex-col w-full pb-32">
                {/*  Stepper Header  */}
                <section className="w-full pt-3 pb-4">
                    <div className="flex items-center justify-between px-1 mb-2">
                        <span
                            className="font-label-md text-label-md text-brand-700 tracking-wide uppercase"
                            >Etapa 1 de 5</span
                        >
                        <span className="font-caption text-caption text-neutral-500"
                            >Escolha os Serviços • Seleção de Serviços</span
                        >
                    </div>
                    {/*  Progress Indicator Dots & Bar  */}
                    <div className="grid grid-cols-5 gap-1.5 w-full mb-3">
                        <div className="h-1.5 rounded-full bg-brand-700"></div>
                        <div
                            className="h-1.5 rounded-full bg-surface-container-highest"
                        ></div>
                        <div
                            className="h-1.5 rounded-full bg-surface-container-highest"
                        ></div>
                        <div
                            className="h-1.5 rounded-full bg-surface-container-highest"
                        ></div>
                        <div
                            className="h-1.5 rounded-full bg-surface-container-highest"
                        ></div>
                    </div>
                    {/*  Scrollable Mini Stepper Labels  */}
                    <div
                        className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 text-nowrap"
                    >
                        <div
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-container text-on-primary shadow-sm"
                        >
                            <span
                                className="w-4 h-4 rounded-full bg-surface-card text-brand-900 font-label-md text-caption flex items-center justify-center font-bold"
                                >1</span
                            >
                            <span
                                className="font-label-md text-label-md font-semibold"
                                >Serviços</span
                            >
                        </div>
                        <div
                            className="flex items-center gap-1.5 px-2 py-1 text-neutral-500"
                        >
                            <span
                                className="w-4 h-4 rounded-full bg-surface-container-high text-neutral-700 font-label-md text-caption flex items-center justify-center"
                                >2</span
                            >
                            <span className="font-body-sm text-body-sm"
                                >Profissional</span
                            >
                        </div>
                        <div
                            className="flex items-center gap-1.5 px-2 py-1 text-neutral-500 opacity-60"
                        >
                            <span
                                className="w-4 h-4 rounded-full bg-surface-container-high text-neutral-700 font-label-md text-caption flex items-center justify-center"
                                >3</span
                            >
                            <span className="font-body-sm text-body-sm"
                                >Data e Hora</span
                            >
                        </div>
                        <div
                            className="flex items-center gap-1.5 px-2 py-1 text-neutral-500 opacity-60"
                        >
                            <span
                                className="w-4 h-4 rounded-full bg-surface-container-high text-neutral-700 font-label-md text-caption flex items-center justify-center"
                                >4</span
                            >
                            <span className="font-body-sm text-body-sm"
                                >Revisão</span
                            >
                        </div>
                        <div
                            className="flex items-center gap-1.5 px-2 py-1 text-neutral-500 opacity-40"
                        >
                            <span
                                className="w-4 h-4 rounded-full bg-surface-container-high text-neutral-700 font-label-md text-caption flex items-center justify-center"
                                >5</span
                            >
                            <span className="font-body-sm text-body-sm"
                                >Confirmação</span
                            >
                        </div>
                    </div>
                </section>
                {/*  Search and Club Badge Bar  */}
                <section className="flex flex-col gap-3 mb-4">
                    {/*  Club Motta Recognition Banner  */}
                    <div
                        className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-surface-container-low shadow-sm"
                    >
                        <div className="flex items-center gap-2.5 min-w-0">
                            <div
                                className="w-7 h-7 rounded-full bg-tertiary-fixed flex items-center justify-center shrink-0 text-on-tertiary-fixed"
                            >
                                <span
                                    className="material-symbols-outlined text-[18px]"
                                    style={{"fontVariationSettings": "\"FILL\" 1"}}
                                    >workspace_premium</span
                                >
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span
                                    className="font-label-md text-label-md text-brand-950 font-semibold truncate"
                                    >Plano Black Ativo</span
                                >
                                <span
                                    className="font-caption text-caption text-neutral-700 truncate"
                                    >100% OFF em Cortes • 15% em Rituais</span
                                >
                            </div>
                        </div>
                        <span
                            className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-md text-caption font-semibold shrink-0"
                        >
                            Benefício Aplicado
                        </span>
                    </div>
                    {/*  Search Input  */}
                    <div className="relative w-full">
                        <div
                            className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500"
                        >
                            <span className="material-symbols-outlined text-[20px]"
                                >search</span
                            >
                        </div>
                        <input
                            className="w-full h-12 pl-11 pr-10 rounded-xl bg-surface-card text-on-surface font-body-md text-body-md placeholder:text-neutral-500 shadow-sm focus:outline-none focus:bg-surface-card transition-all"
                            id="service-search"
                            placeholder="Buscar serviço ou ritual..."
                            type="search"
                        />
                        <button
                            className="hidden absolute inset-y-0 right-0 pr-3.5 items-center text-neutral-500 hover:text-brand-950"
                            id="clear-search"
                            type="button"
                        >
                            <span className="material-symbols-outlined text-[18px]"
                                >cancel</span
                            >
                        </button>
                    </div>
                    {/*  Category Pills  */}
                    <div
                        className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1"
                    >
                        <button
                            className="filter-chip px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all active:scale-95 bg-brand-700 text-on-primary shadow-sm"
                            data-category="todos"
                            type="button"
                        >
                            Todos
                        </button>
                        <button
                            className="filter-chip px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all active:scale-95 bg-surface-card text-neutral-700 shadow-sm hover:bg-surface-container"
                            data-category="cabelo"
                            type="button"
                        >
                            Corte & Cabelo
                        </button>
                        <button
                            className="filter-chip px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all active:scale-95 bg-surface-card text-neutral-700 shadow-sm hover:bg-surface-container"
                            data-category="barba"
                            type="button"
                        >
                            Barba & Rituais
                        </button>
                        <button
                            className="filter-chip px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all active:scale-95 bg-surface-card text-neutral-700 shadow-sm hover:bg-surface-container"
                            data-category="combos"
                            type="button"
                        >
                            Combos Especiais
                        </button>
                    </div>
                </section>
                {/*  Service List  */}
                <section className="flex flex-col gap-3.5" id="services-container">
                    {/*  Item 1: Corte Tradicional (Selected)  */}
                    <article
                        className="service-card relative rounded-2xl bg-surface-card p-4 shadow-sm flex flex-col gap-3 transition-all cursor-pointer"
                        data-category="cabelo"
                        data-duration="35"
                        data-id="1"
                        data-original-price="45"
                        data-price="0"
                        data-selected="true"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex gap-3 min-w-0">
                                <div
                                    className="w-16 h-16 rounded-xl overflow-hidden shrink-0 relative"
                                >
                                    <img
                                        className="w-full h-full object-cover"
                                        data-alt="Close up of classic barber haircut styling with textured scissors cut, warm natural salon lighting, vintage leather chair in background, rich warm tones"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhHKdNYiW0osM0uUmPGXebiV0OE3RWbfIYo5-1yTgmPIocBTKX0y8x_Qo3FJuReewrzzXvtBwZgrfzMYThe4LmpyQxjY0WQC44EfAef-JBzDQtkYWwbJcPBPc_2V9jxETPZ1qvcSNm7ATlAZtfEuJPCaxWmX1jxUlkJhte-Oc_A7mY2f4vDgEeO5l2L5azZhHA_vqelONoMLE0VTxdMrFPWGVsepctTxmk_Cc3gP7Q"
                                    />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <div
                                        className="flex items-center gap-1.5 mb-0.5"
                                    >
                                        <span
                                            className="px-2 py-0.5 rounded-full bg-brand-100 text-brand-800 font-label-md text-caption font-semibold"
                                        >
                                            Plano Black
                                        </span>
                                        <span
                                            className="font-caption text-caption text-neutral-500"
                                            >• 35 min</span
                                        >
                                    </div>
                                    <h2
                                        className="font-headline-sm-mobile text-headline-sm-mobile text-brand-950 font-semibold truncate leading-snug"
                                    >
                                        Corte Masculino Tradicional
                                    </h2>
                                    <p
                                        className="font-body-sm text-body-sm text-neutral-700 line-clamp-1 mt-0.5"
                                    >
                                        Lavagem especial, corte na tesoura e
                                        máquina, finalização com pomada matte.
                                    </p>
                                </div>
                            </div>
                            {/*  Toggle Action  */}
                            <button
                                aria-label="Desmarcar Corte Masculino"
                                className="toggle-btn shrink-0 w-8 h-8 rounded-full bg-brand-700 text-on-primary flex items-center justify-center shadow-sm transition-transform active:scale-90"
                                type="button"
                            >
                                <span
                                    className="material-symbols-outlined text-[20px]"
                                    >check</span
                                >
                            </button>
                        </div>
                        {/*  Pricing and Benefit Row  */}
                        <div
                            className="flex items-center justify-between pt-2 rounded-xl px-2.5 py-1.5 bg-brand-50"
                        >
                            <div className="flex items-center gap-2">
                                <span
                                    className="font-caption text-caption text-neutral-500 line-through"
                                    >R$ 45,00</span
                                >
                                <span
                                    className="font-headline-sm-mobile text-headline-sm-mobile text-brand-800 font-bold"
                                    >R$ 0,00</span
                                >
                                <span
                                    className="font-label-md text-caption text-brand-700 font-semibold"
                                    >(100% OFF)</span
                                >
                            </div>
                            <div className="flex items-center gap-1 text-brand-700">
                                <span
                                    className="material-symbols-outlined text-[16px]"
                                    style={{"fontVariationSettings": "\"FILL\" 1"}}
                                    >check_circle</span
                                >
                                <span
                                    className="font-label-md text-caption font-semibold"
                                    >Incluso</span
                                >
                            </div>
                        </div>
                    </article>
                    {/*  Item 2: Barba Terapia (Selected)  */}
                    <article
                        className="service-card relative rounded-2xl bg-surface-card p-4 shadow-sm flex flex-col gap-3 transition-all cursor-pointer"
                        data-category="barba"
                        data-duration="30"
                        data-id="2"
                        data-original-price="38"
                        data-price="32.30"
                        data-selected="true"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex gap-3 min-w-0">
                                <div
                                    className="w-16 h-16 rounded-xl overflow-hidden shrink-0 relative"
                                >
                                    <img
                                        className="w-full h-full object-cover"
                                        data-alt="Hot towel treatment on bearded man face during traditional shaving therapy ritual, serene expression, warm barbershop ambiance, cedarwood tones"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdtuTPlR8kI4RVtz6FrcoB0ps7mR_JiGJU5ltEuUqGrD3rpznq4szxUfS0h5jexQu6Jomsgca8cSQhdeHBK9vE5vlKADtGH8n8TRKpMiyChoXTxyT63rtB7xG0vdqkxiQSSSyKo0R5SHPgYmQs7mTR-VLoBYJLu8PrJlp1ZJsrSqQolYQkCSdIe2LDwX1sq6zpZ-jjtk_6UTlorSIgUkc111Apd8S-8HLAiAYydjvq"
                                    />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <div
                                        className="flex items-center gap-1.5 mb-0.5"
                                    >
                                        <span
                                            className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-md text-caption font-semibold"
                                        >
                                            15% OFF Clube
                                        </span>
                                        <span
                                            className="font-caption text-caption text-neutral-500"
                                            >• 30 min</span
                                        >
                                    </div>
                                    <h2
                                        className="font-headline-sm-mobile text-headline-sm-mobile text-brand-950 font-semibold truncate leading-snug"
                                    >
                                        Barba Terapia Toalha Quente
                                    </h2>
                                    <p
                                        className="font-body-sm text-body-sm text-neutral-700 line-clamp-1 mt-0.5"
                                    >
                                        Vapor de ozônio, óleos essenciais,
                                        massagem facial e navalhete de precisão.
                                    </p>
                                </div>
                            </div>
                            {/*  Toggle Action  */}
                            <button
                                aria-label="Desmarcar Barba Terapia"
                                className="toggle-btn shrink-0 w-8 h-8 rounded-full bg-brand-700 text-on-primary flex items-center justify-center shadow-sm transition-transform active:scale-90"
                                type="button"
                            >
                                <span
                                    className="material-symbols-outlined text-[20px]"
                                    >check</span
                                >
                            </button>
                        </div>
                        {/*  Pricing and Benefit Row  */}
                        <div
                            className="flex items-center justify-between pt-2 rounded-xl px-2.5 py-1.5 bg-surface-container-low"
                        >
                            <div className="flex items-center gap-2">
                                <span
                                    className="font-caption text-caption text-neutral-500 line-through"
                                    >R$ 38,00</span
                                >
                                <span
                                    className="font-headline-sm-mobile text-headline-sm-mobile text-brand-950 font-bold"
                                    >R$ 32,30</span
                                >
                            </div>
                            <div
                                className="flex items-center gap-1 text-on-tertiary-container"
                            >
                                <span
                                    className="material-symbols-outlined text-[16px]"
                                    >loyalty</span
                                >
                                <span
                                    className="font-label-md text-caption font-semibold text-neutral-700"
                                    >Clube Motta</span
                                >
                            </div>
                        </div>
                    </article>
                    {/*  Item 3: Acabamento de Sobrancelha (Not Selected)  */}
                    <article
                        className="service-card relative rounded-2xl bg-surface-card p-4 shadow-sm flex flex-col gap-3 transition-all cursor-pointer"
                        data-category="barba"
                        data-duration="15"
                        data-id="3"
                        data-original-price="20"
                        data-price="20"
                        data-selected="false"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex gap-3 min-w-0">
                                <div
                                    className="w-16 h-16 rounded-xl overflow-hidden shrink-0 relative"
                                >
                                    <img
                                        className="w-full h-full object-cover"
                                        data-alt="Barber precisely detailing male eyebrow with traditional straight razor blade, sharp professional grooming environment, clean macro shot"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKNfPzeinCzgnvMqVnnGitXz4u5qGOEtKkiME5irdCAWjyCc5hIwcQcdKqPp1mN-z-HlqWlFYVdTZZdaKFxvdsYaj8HK_rk1Px0y2HcG6ZYSM9hqa11rBfDXWpSqCtngcfvxUWh-LKArdPhB9mtImLiSKAbJzttWKlmgE9zCyzNSa0d7ePt_tX7YjPDFE_nQq2ja4-1skguDXGR-1D58YZA7uTe2QrWMaADlgBymQf"
                                    />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <div
                                        className="flex items-center gap-1.5 mb-0.5"
                                    >
                                        <span
                                            className="px-2 py-0.5 rounded-full bg-surface-container-high text-neutral-700 font-label-md text-caption font-semibold"
                                        >
                                            Rápido
                                        </span>
                                        <span
                                            className="font-caption text-caption text-neutral-500"
                                            >• 15 min</span
                                        >
                                    </div>
                                    <h2
                                        className="font-headline-sm-mobile text-headline-sm-mobile text-brand-950 font-semibold truncate leading-snug"
                                    >
                                        Sobrancelha na Navalha
                                    </h2>
                                    <p
                                        className="font-body-sm text-body-sm text-neutral-700 line-clamp-1 mt-0.5"
                                    >
                                        Alinhamento sutil preservando o
                                        arqueamento natural masculino.
                                    </p>
                                </div>
                            </div>
                            {/*  Toggle Action  */}
                            <button
                                aria-label="Adicionar Sobrancelha"
                                className="toggle-btn shrink-0 w-8 h-8 rounded-full bg-surface-container text-brand-950 hover:bg-brand-700 hover:text-on-primary flex items-center justify-center transition-transform active:scale-90"
                                type="button"
                            >
                                <span
                                    className="material-symbols-outlined text-[20px]"
                                    >add</span
                                >
                            </button>
                        </div>
                        {/*  Pricing Row  */}
                        <div
                            className="flex items-center justify-between pt-2 rounded-xl px-2.5 py-1.5 bg-surface-container-low"
                        >
                            <span
                                className="font-headline-sm-mobile text-headline-sm-mobile text-brand-950 font-bold"
                                >R$ 20,00</span
                            >
                            <span
                                className="font-label-md text-caption text-neutral-500"
                                >Avulso</span
                            >
                        </div>
                    </article>
                    {/*  Item 4: Combo Motta Completo (Not Selected)  */}
                    <article
                        className="service-card relative rounded-2xl bg-surface-card p-4 shadow-sm flex flex-col gap-3 transition-all cursor-pointer"
                        data-category="combos"
                        data-duration="60"
                        data-id="4"
                        data-original-price="105"
                        data-price="75"
                        data-selected="false"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex gap-3 min-w-0">
                                <div
                                    className="w-16 h-16 rounded-xl overflow-hidden shrink-0 relative"
                                >
                                    <img
                                        className="w-full h-full object-cover"
                                        data-alt="Complete male luxury grooming session, barber applying post shave facial care tonic to client in artisanal barbershop with dark wood shelves"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDItKWbjEw61ASuPfglFIIcFGmpEnURW8M_0TnOMKlav6FB36SC4MFKFvwvGlKp9ykUp_9sAK63v5ME-Zp9ZP2TjO4Nrq0LmWwFVMDlVexyya4Mg-MoHzssAK3yp7c47AX7OSUDyt-waVkKEIZOSFd161WI77PLR8IqugkSDEuUi7zqFRDFLTs6o6ERfJRfKK4wZF6uW-g5pKUuzjAZR3x-m-zcHu4mpE7125qQ5_bh"
                                    />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <div
                                        className="flex items-center gap-1.5 mb-0.5"
                                    >
                                        <span
                                            className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-md text-caption font-semibold"
                                        >
                                            Mais Vendido
                                        </span>
                                        <span
                                            className="font-caption text-caption text-neutral-500"
                                            >• 60 min</span
                                        >
                                    </div>
                                    <h2
                                        className="font-headline-sm-mobile text-headline-sm-mobile text-brand-950 font-semibold truncate leading-snug"
                                    >
                                        Combo Motta Premium
                                    </h2>
                                    <p
                                        className="font-body-sm text-body-sm text-neutral-700 line-clamp-1 mt-0.5"
                                    >
                                        Corte Completo + Barba Terapia +
                                        Esfoliação Facial & Toalha quente.
                                    </p>
                                </div>
                            </div>
                            {/*  Toggle Action  */}
                            <button
                                aria-label="Adicionar Combo Motta"
                                className="toggle-btn shrink-0 w-8 h-8 rounded-full bg-surface-container text-brand-950 hover:bg-brand-700 hover:text-on-primary flex items-center justify-center transition-transform active:scale-90"
                                type="button"
                            >
                                <span
                                    className="material-symbols-outlined text-[20px]"
                                    >add</span
                                >
                            </button>
                        </div>
                        {/*  Pricing Row  */}
                        <div
                            className="flex items-center justify-between pt-2 rounded-xl px-2.5 py-1.5 bg-surface-container-low"
                        >
                            <div className="flex items-center gap-2">
                                <span
                                    className="font-caption text-caption text-neutral-500 line-through"
                                    >R$ 105,00</span
                                >
                                <span
                                    className="font-headline-sm-mobile text-headline-sm-mobile text-brand-950 font-bold"
                                    >R$ 75,00</span
                                >
                                <span
                                    className="font-label-md text-caption text-semantic-success font-semibold"
                                    >(Economize R$ 30)</span
                                >
                            </div>
                            <span
                                className="font-label-md text-caption text-brand-700 font-semibold"
                                >Experiência VIP</span
                            >
                        </div>
                    </article>
                </section>
                {/*  Sticky Bottom Summary Bar  */}
                <aside
                    className="fixed bottom-0 left-0 right-0 z-40 bg-surface-card/95 backdrop-blur-md shadow-[0_-4px_24px_rgba(7,30,19,0.08)] px-gutter-mobile pt-3 pb-safe"
                >
                    <div className="max-w-md mx-auto flex flex-col gap-2.5">
                        {/*  Info Row  */}
                        <div className="flex items-center justify-between px-1">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-2 h-2 rounded-full bg-brand-600 animate-pulse"
                                ></div>
                                <span
                                    className="font-label-md text-label-md text-neutral-700"
                                    id="summary-meta"
                                >
                                    2 serviços • 1h 05min
                                </span>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span
                                    className="font-caption text-caption text-neutral-500"
                                    >Total:</span
                                >
                                <span
                                    className="font-headline-sm-mobile text-headline-sm-mobile text-brand-950 font-bold"
                                    id="summary-price"
                                >
                                    R$ 32,30
                                </span>
                            </div>
                        </div>
                        {/*  Main Action CTA  */}
                        <button
                            className="w-full h-12 rounded-xl bg-brand-700 hover:bg-brand-800 active:scale-[0.99] text-on-primary font-headline-sm-mobile text-body-md font-semibold flex items-center justify-center gap-2 shadow-md transition-all"
                            id="continue-button"
                            type="button"
                        >
                            <span>Continuar para Profissional</span>
                            <span className="material-symbols-outlined text-[20px]"
                                >arrow_forward</span
                            >
                        </button>
                    </div>
                </aside>
            </div>
            
        
          <aside className="booking-summary fixed bottom-0 inset-x-0 z-40 bg-surface-canvas/95 backdrop-blur-xl border-t border-neutral-300/40 p-4 max-w-[430px] mx-auto shadow-lg flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-[11px] text-neutral-500 font-medium">65 min • Total</span>
              <strong className="text-base font-headline text-brand-950">R$ 32,30 <span className="text-xs text-neutral-400 line-through">R$ 83,00</span></strong>
            </div>
            <button
              onClick={nextStep}
              className="primary px-5 py-3 rounded-xl bg-brand-700 text-on-primary text-xs font-semibold shadow-md hover:bg-brand-800 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span>Continuar</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </aside>
        </div>
      )}

      {step === 2 && (
        <div className="w-full">

            <div className="flex flex-col w-full pb-36">
                {/*  Stepper de Progresso & Contexto da Unidade  */}
                <section className="px-4 pt-3 pb-2 flex flex-col gap-3">
                    {/*  Badge da Unidade  */}
                    <div className="flex items-center justify-between">
                        <div
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold shadow-sm"
                        >
                            <span
                                className="material-symbols-outlined text-[15px] text-primary"
                                >storefront</span
                            >
                            <span>Unidade Sol & Mar (Macaé - RJ)</span>
                        </div>
                        <span
                            className="text-xs font-medium text-on-surface-variant"
                            >Etapa 2 de 5 • 40% Concluído</span
                        >
                    </div>
                    {/*  Stepper Visual  */}
                    <div className="flex flex-col gap-1.5">
                        <div className="grid grid-cols-5 gap-1.5">
                            <div className="h-1.5 rounded-full bg-primary"></div>
                            <div
                                className="h-1.5 rounded-full bg-primary relative overflow-hidden"
                            >
                                <div
                                    className="absolute inset-0 bg-primary-fixed/40"
                                ></div>
                            </div>
                            <div
                                className="h-1.5 rounded-full bg-surface-container-high"
                            ></div>
                            <div
                                className="h-1.5 rounded-full bg-surface-container-high"
                            ></div>
                            <div
                                className="h-1.5 rounded-full bg-surface-container-high"
                            ></div>
                        </div>
                        <div
                            className="flex justify-between items-center text-[11px] text-on-surface-variant font-medium"
                        >
                            <span
                                className="text-primary font-semibold flex items-center gap-0.5"
                            >
                                <span
                                    className="material-symbols-outlined text-[13px]"
                                    >check_circle</span
                                >
                                Serviços
                            </span>
                            <span className="text-primary font-bold"
                                >2. Profissional</span
                            >
                            <span>3. Data/Hora</span>
                            <span>4. Revisão</span>
                            <span>5. Confirmação</span>
                        </div>
                    </div>
                </section>
                {/*  Cabeçalho Editorial  */}
                <section className="px-4 pt-2 pb-3">
                    <h2
                        className="font-headline text-2xl text-on-surface tracking-tight leading-snug"
                    >
                        Escolha o Profissional
                    </h2>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                        Selecione o especialista de sua confiança na unidade Sol
                        & Mar.
                    </p>
                </section>
                {/*  Card Destaque: Sem Preferência (Mais Rápido)  */}
                <section className="px-4 pb-4">
                    <div
                        className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-4 shadow-sm gap-3"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                                <div
                                    className="w-10 h-10 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0 shadow-sm"
                                >
                                    <span
                                        className="material-symbols-outlined text-[22px]"
                                        >bolt</span
                                    >
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5">
                                        <h3
                                            className="font-semibold text-sm text-on-surface"
                                        >
                                            Sem Preferência
                                        </h3>
                                        <span
                                            className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold tracking-wider uppercase"
                                            >Mais Rápido</span
                                        >
                                    </div>
                                    <p
                                        className="text-xs text-on-surface-variant mt-1 leading-relaxed"
                                    >
                                        Alocamos o barbeiro sênior ou master com
                                        a vaga mais próxima no horário da sua
                                        escolha. Padrão Motta de precisão
                                        garantido.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                            <div
                                className="flex items-center gap-1.5 text-xs font-semibold text-primary"
                            >
                                <span
                                    className="material-symbols-outlined text-[16px]"
                                    >schedule</span
                                >
                                <span>Próximo livre: Hoje às 14:40</span>
                            </div>
                            <button
                                className="px-4 py-2 rounded-xl bg-surface-container-high text-on-surface text-xs font-semibold hover:bg-surface-container-highest transition-colors active:scale-95"
                                type="button"
                            >
                                Selecionar
                            </button>
                        </div>
                    </div>
                </section>
                {/*  Filtros Horizontais Deslizantes  */}
                <section className="pb-3">
                    <div
                        className="flex items-center gap-2 overflow-x-auto px-4 no-scrollbar"
                    >
                        <button
                            className="whitespace-nowrap px-3.5 py-1.5 rounded-full bg-primary text-on-primary text-xs font-semibold shadow-sm"
                            type="button"
                        >
                            Todos os Profissionais (7)
                        </button>
                        <button
                            className="whitespace-nowrap px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface-variant text-xs font-semibold hover:bg-surface-container-high transition-colors"
                            type="button"
                        >
                            Barbeiros Master
                        </button>
                        <button
                            className="whitespace-nowrap px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface-variant text-xs font-semibold hover:bg-surface-container-high transition-colors"
                            type="button"
                        >
                            Especialistas em Barba
                        </button>
                        <button
                            className="whitespace-nowrap px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface-variant text-xs font-semibold hover:bg-surface-container-high transition-colors"
                            type="button"
                        >
                            Destaques do Mês
                        </button>
                    </div>
                </section>
                {/*  Lista de Profissionais  */}
                <section className="px-4 flex flex-col gap-3">
                    {/*  1. Michel Nogueira (SELECIONADO)  */}
                    <article
                        className="relative rounded-2xl bg-surface-container-lowest p-3.5 shadow-md flex flex-col gap-3"
                    >
                        {/*  Indicador visual superior sutil de card ativo  */}
                        <div className="flex items-start gap-3">
                            <div className="relative shrink-0">
                                <img
                                    alt="Michel Nogueira"
                                    className="w-20 h-24 rounded-xl object-cover shadow-inner"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0J-klYfPmDXTu_9nDJgyWCuYkAw7_5dWiWxh1e9xFyrkUAJRsk2BJusEumRvdABHK90-EeeGEoGDc6fNRaorRG3MMxXuTfz0HsTS0j2Bnd5DjVIvRkNP9jk5PBCfuQorOTauvYFh2UaZeCHX9DRF2pvAHud8X0lY1W7V95cZb2Vmgy1gwdLr-w1AAvurK7FZPPWuqJ90LaNlJnBZfpJQO_YOSl35tP-eGYvVMSbcu7A5-SgYmWbVi0g"
                                />
                                <span
                                    className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md"
                                >
                                    <span
                                        className="material-symbols-outlined text-[15px]"
                                        >check</span
                                    >
                                </span>
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col">
                                <div
                                    className="flex items-start justify-between gap-1"
                                >
                                    <div>
                                        <h3
                                            className="font-bold text-base text-on-surface truncate"
                                        >
                                            Michel Nogueira
                                        </h3>
                                        <p
                                            className="text-xs font-medium text-on-surface-variant truncate"
                                        >
                                            Barbeiro Master & Visagista
                                        </p>
                                    </div>
                                    <div
                                        className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold shrink-0"
                                    >
                                        <span
                                            className="material-symbols-outlined text-[13px] text-tertiary"
                                            >star</span
                                        >
                                        <span className="tabular-nums">4.9</span>
                                        <span
                                            className="text-[10px] font-normal opacity-80"
                                            >(198)</span
                                        >
                                    </div>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-1">
                                    <span
                                        className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface text-[10px] font-medium"
                                        >Degradê & Visagismo</span
                                    >
                                    <span
                                        className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface text-[10px] font-medium"
                                        >Barboterapia</span
                                    >
                                </div>
                                <div
                                    className="mt-2 flex items-center gap-3 text-xs text-on-surface-variant"
                                >
                                    <span
                                        className="flex items-center gap-1 font-semibold text-primary"
                                    >
                                        <span
                                            className="material-symbols-outlined text-[14px]"
                                            >event_available</span
                                        >
                                        <span>Hoje às 15:30</span>
                                    </span>
                                    <span className="text-[11px]"
                                        >• 7 anos exp.</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                            <span
                                className="text-xs font-semibold text-primary flex items-center gap-1"
                            >
                                <span
                                    className="material-symbols-outlined text-[16px]"
                                    >verified</span
                                >
                                Especialista Selecionado
                            </span>
                            <button
                                className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform"
                                type="button"
                            >
                                <span>Selecionado</span>
                                <span
                                    className="material-symbols-outlined text-[16px]"
                                    >check</span
                                >
                            </button>
                        </div>
                    </article>
                    {/*  2. Maycon Angelo  */}
                    <article
                        className="rounded-2xl bg-surface-container-lowest p-3.5 shadow-sm flex flex-col gap-3"
                    >
                        <div className="flex items-start gap-3">
                            <img
                                alt="Maycon Angelo"
                                className="w-20 h-24 rounded-xl object-cover shrink-0"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxwQ1QH401aY8bIjhDrqTLhUKLufcNx9OffvQF_FWyB22ojwU6pk7jwujVgrAsVCvidbuyWvFKgfccideMZaN2yPUfiDVuYti6RHQZ3KjE-pSR5hB93QP1FlqN0EPy-f_rIlSwi8cpC9f101lW0vQpnK9ZrfSTlyvfsbad0skV4AUVZIZynsBhlO3haWjnGScQ90PKEAiefXzlm47vYQudgIIZaxbXuc5-2qXx2RNmKvvOIKa706XITg"
                            />
                            <div className="flex-1 min-w-0 flex flex-col">
                                <div
                                    className="flex items-start justify-between gap-1"
                                >
                                    <div>
                                        <h3
                                            className="font-bold text-base text-on-surface truncate"
                                        >
                                            Maycon Angelo
                                        </h3>
                                        <p
                                            className="text-xs font-medium text-on-surface-variant truncate"
                                        >
                                            Barbeiro Master
                                        </p>
                                    </div>
                                    <div
                                        className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-surface-container text-on-surface text-xs font-bold shrink-0"
                                    >
                                        <span
                                            className="material-symbols-outlined text-[13px] text-tertiary"
                                            >star</span
                                        >
                                        <span className="tabular-nums">5.0</span>
                                        <span
                                            className="text-[10px] font-normal opacity-70"
                                            >(342)</span
                                        >
                                    </div>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-1">
                                    <span
                                        className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface text-[10px] font-medium"
                                        >Clube Motta</span
                                    >
                                    <span
                                        className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface text-[10px] font-medium"
                                        >Tesoura Clássica</span
                                    >
                                </div>
                                <div
                                    className="mt-2 flex items-center gap-1 text-xs text-on-surface-variant font-medium"
                                >
                                    <span
                                        className="material-symbols-outlined text-[14px] text-secondary"
                                        >schedule</span
                                    >
                                    <span
                                        >Próximo livre:
                                        <strong className="text-on-surface"
                                            >Hoje às 16:15</strong
                                        ></span
                                    >
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                            <span className="text-xs text-on-surface-variant"
                                >Taxa padrão de serviço</span
                            >
                            <button
                                className="px-4 py-2 rounded-xl bg-surface-container-high text-on-surface text-xs font-semibold hover:bg-surface-container-highest transition-colors active:scale-95"
                                type="button"
                            >
                                Selecionar
                            </button>
                        </div>
                    </article>
                    {/*  3. Bruno Oliveira  */}
                    <article
                        className="rounded-2xl bg-surface-container-lowest p-3.5 shadow-sm flex flex-col gap-3"
                    >
                        <div className="flex items-start gap-3">
                            <img
                                alt="Bruno Oliveira"
                                className="w-20 h-24 rounded-xl object-cover shrink-0"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXJHjYU24v9qJmmk6cHXkTFlRI0JCKvGeHt1__A4ISch2OnFvk_TdqPOMiKy9kpHmqQiI8kiimivGVZEpeY1xkxZV7_jH3ZrAZj-VTUJMLT68D4bBS31PNdx6F5kOLgcySHAmiK-s9M6rKWvZsty9M4PCXmlNj_BwcxBw0Gca0JBGrSNTSfmCHWMlP-C2Y518Hh1u07EGHd6dEh1G_b6OwHO6MqMVUjFrjG64qMiBkHRudqertJzeiyA"
                            />
                            <div className="flex-1 min-w-0 flex flex-col">
                                <div
                                    className="flex items-start justify-between gap-1"
                                >
                                    <div>
                                        <h3
                                            className="font-bold text-base text-on-surface truncate"
                                        >
                                            Bruno Oliveira
                                        </h3>
                                        <p
                                            className="text-xs font-medium text-on-surface-variant truncate"
                                        >
                                            Barbeiro Sênior
                                        </p>
                                    </div>
                                    <div
                                        className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-surface-container text-on-surface text-xs font-bold shrink-0"
                                    >
                                        <span
                                            className="material-symbols-outlined text-[13px] text-tertiary"
                                            >star</span
                                        >
                                        <span className="tabular-nums">4.9</span>
                                        <span
                                            className="text-[10px] font-normal opacity-70"
                                            >(220)</span
                                        >
                                    </div>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-1">
                                    <span
                                        className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface text-[10px] font-medium"
                                        >Corte Social</span
                                    >
                                    <span
                                        className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface text-[10px] font-medium"
                                        >Barba Alinhada</span
                                    >
                                </div>
                                <div
                                    className="mt-2 flex items-center gap-1 text-xs text-on-surface-variant font-medium"
                                >
                                    <span
                                        className="material-symbols-outlined text-[14px] text-secondary"
                                        >calendar_today</span
                                    >
                                    <span
                                        >Próximo livre:
                                        <strong className="text-on-surface"
                                            >Amanhã às 10:00</strong
                                        ></span
                                    >
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                            <span className="text-xs text-on-surface-variant"
                                >Avaliação de excelência</span
                            >
                            <button
                                className="px-4 py-2 rounded-xl bg-surface-container-high text-on-surface text-xs font-semibold hover:bg-surface-container-highest transition-colors active:scale-95"
                                type="button"
                            >
                                Selecionar
                            </button>
                        </div>
                    </article>
                    {/*  4. Matheus Ferreira  */}
                    <article
                        className="rounded-2xl bg-surface-container-lowest p-3.5 shadow-sm flex flex-col gap-3"
                    >
                        <div className="flex items-start gap-3">
                            <img
                                alt="Matheus Ferreira"
                                className="w-20 h-24 rounded-xl object-cover shrink-0"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZ6OqLE3rjG1wnCh5ycvpHHhneqvnSL8BcmnRYAM6-B19Vh53ms-a1-zw8M0VjeEVcpXgvYGvVLeRZaH_I16ituyS4p3jrEYsBsoMyX5nyqfcIJ81tvEWoRX5Ic4AAW7FqO4JJVEpGhlRjfNGDRGKZh41qqjs04MdpfH9V2gn3KuZHqob67Ld5ZOLSiL-PwU8isW4u1SfqbO89WYd_M9ajAagdlYbv1W23cGCjQa6E1nkwKg5KBjhNdg"
                            />
                            <div className="flex-1 min-w-0 flex flex-col">
                                <div
                                    className="flex items-start justify-between gap-1"
                                >
                                    <div>
                                        <h3
                                            className="font-bold text-base text-on-surface truncate"
                                        >
                                            Matheus Ferreira
                                        </h3>
                                        <p
                                            className="text-xs font-medium text-on-surface-variant truncate"
                                        >
                                            Barbeiro Estilista
                                        </p>
                                    </div>
                                    <div
                                        className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-surface-container text-on-surface text-xs font-bold shrink-0"
                                    >
                                        <span
                                            className="material-symbols-outlined text-[13px] text-tertiary"
                                            >star</span
                                        >
                                        <span className="tabular-nums">4.8</span>
                                        <span
                                            className="text-[10px] font-normal opacity-70"
                                            >(158)</span
                                        >
                                    </div>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-1">
                                    <span
                                        className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface text-[10px] font-medium"
                                        >Freestyle & Linhas</span
                                    >
                                    <span
                                        className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface text-[10px] font-medium"
                                        >Tratamento Capilar</span
                                    >
                                </div>
                                <div
                                    className="mt-2 flex items-center gap-1 text-xs text-on-surface-variant font-medium"
                                >
                                    <span
                                        className="material-symbols-outlined text-[14px] text-secondary"
                                        >calendar_today</span
                                    >
                                    <span
                                        >Próximo livre:
                                        <strong className="text-on-surface"
                                            >Amanhã às 11:30</strong
                                        ></span
                                    >
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                            <span className="text-xs text-on-surface-variant"
                                >Design Contemporâneo</span
                            >
                            <button
                                className="px-4 py-2 rounded-xl bg-surface-container-high text-on-surface text-xs font-semibold hover:bg-surface-container-highest transition-colors active:scale-95"
                                type="button"
                            >
                                Selecionar
                            </button>
                        </div>
                    </article>
                    {/*  5. Orlando Junior  */}
                    <article
                        className="rounded-2xl bg-surface-container-lowest p-3.5 shadow-sm flex flex-col gap-3"
                    >
                        <div className="flex items-start gap-3">
                            <img
                                alt="Orlando Junior"
                                className="w-20 h-24 rounded-xl object-cover shrink-0"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOVVhbFBE_ThxBI5z6XBoYC8kU4FLWspgRxKZsr5ymVFEjFqP6OsYMljsaHoAD__zLJz9vLHGRZkmDm8j9LXaezXedVCROHJJYG7LIvgSS89O97ZDPltA242BT3i8B0ytJlD5qfbW-aRzR91I9K8BrsdDF32mBgIWEHqRLXqjfxT4rZEkhivbhGeQ6a_DgCzkHHrvyR-z69gflXiBHpBa_Dnk6o9qhasOjVlzft5Ea2IHif3NKiPU63g"
                            />
                            <div className="flex-1 min-w-0 flex flex-col">
                                <div
                                    className="flex items-start justify-between gap-1"
                                >
                                    <div>
                                        <h3
                                            className="font-bold text-base text-on-surface truncate"
                                        >
                                            Orlando Junior
                                        </h3>
                                        <p
                                            className="text-xs font-medium text-on-surface-variant truncate"
                                        >
                                            Barbeiro Master
                                        </p>
                                    </div>
                                    <div
                                        className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-surface-container text-on-surface text-xs font-bold shrink-0"
                                    >
                                        <span
                                            className="material-symbols-outlined text-[13px] text-tertiary"
                                            >star</span
                                        >
                                        <span className="tabular-nums">5.0</span>
                                        <span
                                            className="text-[10px] font-normal opacity-70"
                                            >(312)</span
                                        >
                                    </div>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-1">
                                    <span
                                        className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface text-[10px] font-medium"
                                        >Navalha Tradicional</span
                                    >
                                    <span
                                        className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface text-[10px] font-medium"
                                        >Barba Terapia</span
                                    >
                                </div>
                                <div
                                    className="mt-2 flex items-center gap-1 text-xs text-on-surface-variant font-medium"
                                >
                                    <span
                                        className="material-symbols-outlined text-[14px] text-secondary"
                                        >schedule</span
                                    >
                                    <span
                                        >Próximo livre:
                                        <strong className="text-on-surface"
                                            >Hoje às 17:00</strong
                                        ></span
                                    >
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                            <span className="text-xs text-on-surface-variant"
                                >Especialista em Navalha</span
                            >
                            <button
                                className="px-4 py-2 rounded-xl bg-surface-container-high text-on-surface text-xs font-semibold hover:bg-surface-container-highest transition-colors active:scale-95"
                                type="button"
                            >
                                Selecionar
                            </button>
                        </div>
                    </article>
                    {/*  6. Wanderson Mota  */}
                    <article
                        className="rounded-2xl bg-surface-container-lowest p-3.5 shadow-sm flex flex-col gap-3"
                    >
                        <div className="flex items-start gap-3">
                            <img
                                alt="Wanderson Mota"
                                className="w-20 h-24 rounded-xl object-cover shrink-0"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDc_doDUExinTJ-0XdiQEkhzdw1crclpriRj728CQVV3rWt70z4_XhVQgEGaB8kh21asD-sTJGKKJpW7hM1bTvKAs8rdJA07Q4qA92NS707pPcCJm3Y6B2_KAJ5UqxjwUWNflKA4lFyB0LEjHG6VxcZWKfbS_trKEJooC_xfAU2mgwJAVik7msbsCzcuNFym6t1er3s3UN8A4KN8p50PPTT2WJ0YCaXkuvqmB9qFYLiexz4BG_0GZN6kA"
                            />
                            <div className="flex-1 min-w-0 flex flex-col">
                                <div
                                    className="flex items-start justify-between gap-1"
                                >
                                    <div>
                                        <h3
                                            className="font-bold text-base text-on-surface truncate"
                                        >
                                            Wanderson Mota
                                        </h3>
                                        <p
                                            className="text-xs font-medium text-on-surface-variant truncate"
                                        >
                                            Barbeiro Sênior
                                        </p>
                                    </div>
                                    <div
                                        className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-surface-container text-on-surface text-xs font-bold shrink-0"
                                    >
                                        <span
                                            className="material-symbols-outlined text-[13px] text-tertiary"
                                            >star</span
                                        >
                                        <span className="tabular-nums">4.9</span>
                                        <span
                                            className="text-[10px] font-normal opacity-70"
                                            >(204)</span
                                        >
                                    </div>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-1">
                                    <span
                                        className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface text-[10px] font-medium"
                                        >Corte Executivo</span
                                    >
                                    <span
                                        className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface text-[10px] font-medium"
                                        >Bigode & Cavanhaque</span
                                    >
                                </div>
                                <div
                                    className="mt-2 flex items-center gap-1 text-xs text-on-surface-variant font-medium"
                                >
                                    <span
                                        className="material-symbols-outlined text-[14px] text-secondary"
                                        >calendar_today</span
                                    >
                                    <span
                                        >Próximo livre:
                                        <strong className="text-on-surface"
                                            >Amanhã às 14:00</strong
                                        ></span
                                    >
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                            <span className="text-xs text-on-surface-variant"
                                >Atendimento Personalizado</span
                            >
                            <button
                                className="px-4 py-2 rounded-xl bg-surface-container-high text-on-surface text-xs font-semibold hover:bg-surface-container-highest transition-colors active:scale-95"
                                type="button"
                            >
                                Selecionar
                            </button>
                        </div>
                    </article>
                    {/*  7. Alexandre Bernardo  */}
                    <article
                        className="rounded-2xl bg-surface-container-lowest p-3.5 shadow-sm flex flex-col gap-3"
                    >
                        <div className="flex items-start gap-3">
                            <img
                                alt="Alexandre Bernardo"
                                className="w-20 h-24 rounded-xl object-cover shrink-0"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOSEryiADQrVjSF4fMblhr1QSMcRRUJI5DVeIJmJI-6Bb3aw0kV3k8LCMRD54yOyU422KUIHUy_Wxaubr06wtV0y6Fa_IqNkAAOwwp3yO9U2t01qqDvvGIej-bXUGsOIGNeAWnEi-ZPu4t-b-hl18DjWMNiviete12MCKcK9qiEvSF7sZr-XGNUd6X1QbRKqcRAJ4oFednNGL5JcaRP-G7HmSzmibnKB2HC1Ke6P1GcXnbGlQ7AoHV3w"
                            />
                            <div className="flex-1 min-w-0 flex flex-col">
                                <div
                                    className="flex items-start justify-between gap-1"
                                >
                                    <div>
                                        <h3
                                            className="font-bold text-base text-on-surface truncate"
                                        >
                                            Alexandre Bernardo
                                        </h3>
                                        <p
                                            className="text-xs font-medium text-on-surface-variant truncate"
                                        >
                                            Barbeiro Especialista
                                        </p>
                                    </div>
                                    <div
                                        className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-surface-container text-on-surface text-xs font-bold shrink-0"
                                    >
                                        <span
                                            className="material-symbols-outlined text-[13px] text-tertiary"
                                            >star</span
                                        >
                                        <span className="tabular-nums">4.9</span>
                                        <span
                                            className="text-[10px] font-normal opacity-70"
                                            >(176)</span
                                        >
                                    </div>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-1">
                                    <span
                                        className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface text-[10px] font-medium"
                                        >Barba Modelada</span
                                    >
                                    <span
                                        className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface text-[10px] font-medium"
                                        >Acabamento Fino</span
                                    >
                                </div>
                                <div
                                    className="mt-2 flex items-center gap-1 text-xs text-on-surface-variant font-medium"
                                >
                                    <span
                                        className="material-symbols-outlined text-[14px] text-secondary"
                                        >schedule</span
                                    >
                                    <span
                                        >Próximo livre:
                                        <strong className="text-on-surface"
                                            >Hoje às 18:20</strong
                                        ></span
                                    >
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                            <span className="text-xs text-on-surface-variant"
                                >Precisão e Estilo</span
                            >
                            <button
                                className="px-4 py-2 rounded-xl bg-surface-container-high text-on-surface text-xs font-semibold hover:bg-surface-container-highest transition-colors active:scale-95"
                                type="button"
                            >
                                Selecionar
                            </button>
                        </div>
                    </article>
                </section>
                {/*  Hospitalidade & Experiência Motta  */}
                <section className="px-4 pt-4 pb-2">
                    <div
                        className="p-3.5 rounded-2xl bg-surface-container-low flex items-center gap-3"
                    >
                        <div
                            className="w-9 h-9 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0"
                        >
                            <span className="material-symbols-outlined text-[18px]"
                                >local_cafe</span
                            >
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-semibold text-on-surface"
                                >Hospitalidade Exclusiva Motta</span
                            >
                            <p
                                className="text-[11px] text-on-surface-variant leading-tight"
                            >
                                Café Nespresso cortesia, toalha quente com óleos
                                essenciais e chopp artesanal gelado durante o
                                seu atendimento.
                            </p>
                        </div>
                    </div>
                    {/*  Aviso Ético Rodapé  */}
                    <p
                        className="text-[10px] text-center text-on-surface-variant/60 mt-3"
                    >
                        Dados demonstrativos para testes de interface •
                        Barbearia Motta © 2025
                    </p>
                </section>
                {/*  Bottom Bar Fixa Flutuante com Resumo e Ação Primária  */}
                <div
                    className="fixed bottom-0 inset-x-0 z-40 bg-surface/95 backdrop-blur-xl px-4 pt-3 pb-safe shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
                >
                    <div className="max-w-md mx-auto flex flex-col gap-2.5 pb-2">
                        {/*  Resumo do Agendamento Atual  */}
                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1.5 min-w-0">
                                <span
                                    className="w-2 h-2 rounded-full bg-primary shrink-0"
                                ></span>
                                <span
                                    className="text-on-surface font-semibold truncate"
                                    >Michel Nogueira</span
                                >
                                <span className="text-on-surface-variant truncate"
                                    >• 2 serviços (1h 05min)</span
                                >
                            </div>
                            <span
                                className="font-bold text-on-surface tabular-nums shrink-0 ml-2"
                                >R$ 32,30</span
                            >
                        </div>
                        {/*  Botão Primário Largo (48px)  */}
                        <button
                            className="w-full h-12 rounded-xl bg-primary text-on-primary font-semibold text-sm flex items-center justify-center gap-2 shadow-md hover:bg-primary-container active:scale-[0.99] transition-all"
                            type="button"
                        >
                            <span>Continuar para Data e Horário</span>
                            <span className="material-symbols-outlined text-[20px]"
                                >arrow_forward</span
                            >
                        </button>
                    </div>
                </div>
            </div>
        
          <aside className="booking-summary fixed bottom-0 inset-x-0 z-40 bg-surface-canvas/95 backdrop-blur-xl border-t border-neutral-300/40 p-4 max-w-[430px] mx-auto shadow-lg flex items-center justify-between gap-3">
            <button
              onClick={prevStep}
              className="px-4 py-3 rounded-xl bg-surface-container-high text-on-surface text-xs font-medium hover:bg-surface-container-highest transition-colors"
            >
              Voltar
            </button>
            <button
              onClick={nextStep}
              className="primary px-5 py-3 rounded-xl bg-brand-700 text-on-primary text-xs font-semibold shadow-md hover:bg-brand-800 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span>Continuar</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </aside>
        </div>
      )}

      {step === 3 && (
        <div className="w-full">

            <div className="flex flex-col w-full pb-32">
                {/*  Stepper de Progresso  */}
                <section className="px-4 pt-3 pb-2 bg-surface-container-low">
                    <div className="flex items-center justify-between mb-2">
                        <span
                            className="text-xs font-semibold tracking-wide uppercase text-on-surface-variant"
                            >Etapa 3 de 5</span
                        >
                        <span className="text-xs font-semibold text-primary"
                            >60% Concluído</span
                        >
                    </div>
                    {/*  Barra de progresso multi-etapa  */}
                    <div className="grid grid-cols-5 gap-1.5 mb-2">
                        <div className="h-1.5 rounded-full bg-primary"></div>
                        <div className="h-1.5 rounded-full bg-primary"></div>
                        <div className="h-1.5 rounded-full bg-primary"></div>
                        <div
                            className="h-1.5 rounded-full bg-surface-container-highest"
                        ></div>
                        <div
                            className="h-1.5 rounded-full bg-surface-container-highest"
                        ></div>
                    </div>
                    {/*  Rótulos de etapas com scroll sutil  */}
                    <div
                        className="flex items-center justify-between text-[11px] font-medium text-on-surface-variant pt-0.5"
                    >
                        <span
                            className="flex items-center gap-0.5 text-primary font-semibold"
                        >
                            <span
                                className="material-symbols-outlined text-[13px]"
                                style={{"fontVariationSettings": "\"FILL\" 1"}}
                                >check_circle</span
                            >Serviços
                        </span>
                        <span
                            className="flex items-center gap-0.5 text-primary font-semibold"
                        >
                            <span
                                className="material-symbols-outlined text-[13px]"
                                style={{"fontVariationSettings": "\"FILL\" 1"}}
                                >check_circle</span
                            >Profissional
                        </span>
                        <span className="text-primary font-bold"
                            >Data & Horário</span
                        >
                        <span className="opacity-60">Revisão</span>
                        <span className="opacity-60">Confirmação</span>
                    </div>
                </section>
                {/*  Context Card: Unidade e Profissional  */}
                <section className="px-4 py-3 bg-surface">
                    <div
                        className="bg-surface-container-lowest p-3.5 rounded-xl shadow-sm flex flex-col gap-3"
                    >
                        {/*  Unidade  */}
                        <div className="flex items-start gap-2.5">
                            <div
                                className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center shrink-0 text-primary"
                            >
                                <span
                                    className="material-symbols-outlined text-[19px]"
                                    >store</span
                                >
                            </div>
                            <div className="min-w-0 flex-1">
                                <p
                                    className="text-[11px] uppercase tracking-wider font-semibold text-on-surface-variant"
                                >
                                    Unidade Selecionada
                                </p>
                                <p
                                    className="text-xs font-semibold text-on-surface truncate"
                                >
                                    Unidade Sol & Mar
                                </p>
                                <p
                                    className="text-[11px] text-on-surface-variant truncate"
                                >
                                    Av. Carlos Augusto T. Garcia, 2040 - Macaé -
                                    RJ
                                </p>
                            </div>
                        </div>
                        <div
                            className="h-px bg-surface-container-high w-full"
                        ></div>
                        {/*  Profissional Selecionado  */}
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="relative shrink-0">
                                    <img
                                        alt="Michel Nogueira"
                                        className="w-11 h-11 rounded-full object-cover shadow-inner"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0J-klYfPmDXTu_9nDJgyWCuYkAw7_5dWiWxh1e9xFyrkUAJRsk2BJusEumRvdABHK90-EeeGEoGDc6fNRaorRG3MMxXuTfz0HsTS0j2Bnd5DjVIvRkNP9jk5PBCfuQorOTauvYFh2UaZeCHX9DRF2pvAHud8X0lY1W7V95cZb2Vmgy1gwdLr-w1AAvurK7FZPPWuqJ90LaNlJnBZfpJQO_YOSl35tP-eGYvVMSbcu7A5-SgYmWbVi0g"
                                    />
                                    <span
                                        className="absolute bottom-0 right-0 w-3 h-3 bg-primary-container rounded-full ring-2 ring-surface-container-lowest flex items-center justify-center"
                                    >
                                        <span
                                            className="w-1.5 h-1.5 rounded-full bg-primary-fixed"
                                        ></span>
                                    </span>
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-1.5">
                                        <span
                                            className="text-sm font-semibold text-on-surface truncate"
                                            >Michel Nogueira</span
                                        >
                                        <span
                                            className="px-1.5 py-0.2 text-[10px] font-semibold bg-tertiary-fixed text-on-tertiary-fixed rounded-full"
                                            >Master</span
                                        >
                                    </div>
                                    <p
                                        className="text-[11px] text-on-surface-variant truncate"
                                    >
                                        Barbeiro Master & Visagista
                                    </p>
                                </div>
                            </div>
                            <button
                                className="shrink-0 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-primary hover:bg-surface-container transition-colors"
                                type="button"
                            >
                                Alterar
                            </button>
                        </div>
                    </div>
                </section>
                {/*  Cabeçalho Editorial da Etapa  */}
                <section className="px-4 pt-2 pb-1">
                    <h2
                        className="font-headline text-2xl text-on-surface font-normal leading-tight"
                    >
                        Escolha Data e Horário
                    </h2>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                        Consulte os horários disponíveis em tempo real com
                        Michel Nogueira
                    </p>
                </section>
                {/*  Seletor de Data  */}
                <section className="mt-3">
                    {/*  Cabeçalho Mês  */}
                    <div className="px-4 flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-on-surface"
                                >Outubro 2026</span
                            >
                            <button
                                aria-label="Abrir calendário mensal"
                                className="text-primary hover:text-primary-container p-1 rounded-full flex items-center justify-center"
                            >
                                <span
                                    className="material-symbols-outlined text-[18px]"
                                    >calendar_month</span
                                >
                            </button>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                aria-label="Mês anterior"
                                className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
                            >
                                <span
                                    className="material-symbols-outlined text-[16px]"
                                    >chevron_left</span
                                >
                            </button>
                            <button
                                aria-label="Próximo mês"
                                className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
                            >
                                <span
                                    className="material-symbols-outlined text-[16px]"
                                    >chevron_right</span
                                >
                            </button>
                        </div>
                    </div>
                    {/*  Fita deslizante de dias  */}
                    <div
                        className="flex gap-2 overflow-x-auto px-4 py-1.5 no-scrollbar scroll-smooth"
                        id="daysStrip"
                    >
                        {/*  Seg 26  */}
                        <button
                            className="day-chip flex flex-col items-center justify-center min-w-15.5 py-2.5 px-1.5 rounded-xl bg-surface-container-lowest text-on-surface shadow-sm transition-all focus:outline-none shrink-0"
                            type="button"
                        >
                            <span
                                className="text-[11px] font-medium text-on-surface-variant uppercase"
                                >Seg</span
                            >
                            <span
                                className="text-base font-bold my-0.5"
                                style={{"fontVariantNumeric": "tabular-nums"}}
                                >26</span
                            >
                            <span
                                className="text-[9px] font-medium text-primary px-1 rounded-full bg-secondary-container"
                                >Livre</span
                            >
                        </button>
                        {/*  Ter 27  */}
                        <button
                            className="day-chip flex flex-col items-center justify-center min-w-15.5 py-2.5 px-1.5 rounded-xl bg-surface-container-lowest text-on-surface shadow-sm transition-all focus:outline-none shrink-0"
                            type="button"
                        >
                            <span
                                className="text-[11px] font-medium text-on-surface-variant uppercase"
                                >Ter</span
                            >
                            <span
                                className="text-base font-bold my-0.5"
                                style={{"fontVariantNumeric": "tabular-nums"}}
                                >27</span
                            >
                            <span
                                className="text-[9px] font-medium text-primary px-1 rounded-full bg-secondary-container"
                                >Livre</span
                            >
                        </button>
                        {/*  Qua 28 [HOJE - SELECIONADO]  */}
                        <button
                            className="day-chip flex flex-col items-center justify-center min-w-16.5 py-2.5 px-1.5 rounded-xl bg-primary text-on-primary shadow-md transition-all focus:outline-none shrink-0 transform scale-[1.02]"
                            type="button"
                        >
                            <span
                                className="text-[10px] font-semibold uppercase tracking-wider text-primary-fixed"
                                >Hoje • Qua</span
                            >
                            <span
                                className="text-lg font-bold my-0.5 text-on-primary"
                                style={{"fontVariantNumeric": "tabular-nums"}}
                                >28</span
                            >
                            <span
                                className="text-[9px] font-medium text-on-primary bg-primary-container px-1.5 py-0.2 rounded-full"
                                >Selecionado</span
                            >
                        </button>
                        {/*  Qui 29  */}
                        <button
                            className="day-chip flex flex-col items-center justify-center min-w-15.5 py-2.5 px-1.5 rounded-xl bg-surface-container-lowest text-on-surface shadow-sm transition-all focus:outline-none shrink-0"
                            type="button"
                        >
                            <span
                                className="text-[11px] font-medium text-on-surface-variant uppercase"
                                >Qui</span
                            >
                            <span
                                className="text-base font-bold my-0.5"
                                style={{"fontVariantNumeric": "tabular-nums"}}
                                >29</span
                            >
                            <span
                                className="text-[9px] font-medium text-primary px-1 rounded-full bg-secondary-container"
                                >Livre</span
                            >
                        </button>
                        {/*  Sex 30  */}
                        <button
                            className="day-chip flex flex-col items-center justify-center min-w-15.5 py-2.5 px-1.5 rounded-xl bg-surface-container-lowest text-on-surface shadow-sm transition-all focus:outline-none shrink-0"
                            type="button"
                        >
                            <span
                                className="text-[11px] font-medium text-on-surface-variant uppercase"
                                >Sex</span
                            >
                            <span
                                className="text-base font-bold my-0.5"
                                style={{"fontVariantNumeric": "tabular-nums"}}
                                >30</span
                            >
                            <span
                                className="text-[9px] font-medium text-tertiary px-1 rounded-full bg-tertiary-fixed"
                                >Poucos</span
                            >
                        </button>
                        {/*  Sáb 31  */}
                        <button
                            className="day-chip flex flex-col items-center justify-center min-w-15.5 py-2.5 px-1.5 rounded-xl bg-surface-container-lowest text-on-surface shadow-sm transition-all focus:outline-none shrink-0"
                            type="button"
                        >
                            <span
                                className="text-[11px] font-medium text-on-surface-variant uppercase"
                                >Sáb</span
                            >
                            <span
                                className="text-base font-bold my-0.5"
                                style={{"fontVariantNumeric": "tabular-nums"}}
                                >31</span
                            >
                            <span
                                className="text-[9px] font-medium text-tertiary px-1 rounded-full bg-tertiary-fixed"
                                >Poucos</span
                            >
                        </button>
                        {/*  Dom 01 (Fechado)  */}
                        <button
                            className="day-chip flex flex-col items-center justify-center min-w-15.5 py-2.5 px-1.5 rounded-xl bg-surface-container-low text-on-surface-variant opacity-45 cursor-not-allowed shrink-0"
                            disabled
                            type="button"
                        >
                            <span className="text-[11px] font-medium uppercase"
                                >Dom</span
                            >
                            <span
                                className="text-base font-bold my-0.5"
                                style={{"fontVariantNumeric": "tabular-nums"}}
                                >01</span
                            >
                            <span
                                className="text-[9px] font-medium px-1 rounded-full bg-surface-container-high text-on-surface-variant"
                                >Fechado</span
                            >
                        </button>
                    </div>
                </section>
                {/*  Badge Pulsante de Atualização em Tempo Real  */}
                <section className="px-4 mt-3">
                    <div
                        className="flex items-center gap-2 py-2 px-3 rounded-lg bg-surface-container-low text-on-surface text-xs"
                    >
                        <span className="relative flex h-2.5 w-2.5">
                            <span
                                className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-fixed-dim opacity-75"
                            ></span>
                            <span
                                className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"
                            ></span>
                        </span>
                        <span
                            className="font-medium text-[11px] text-on-surface-variant"
                            >Disponibilidade em tempo real atualizada para
                            <strong className="text-on-surface font-semibold"
                                >Qua, 28 de Outubro</strong
                            ></span
                        >
                    </div>
                </section>
                {/*  Grade de Horários por Turno  */}
                <section className="px-4 mt-4 space-y-4">
                    {/*  Turno Manhã  */}
                    <div
                        className="bg-surface-container-lowest p-3.5 rounded-xl shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-2.5">
                            <div className="flex items-center gap-2">
                                <span
                                    className="material-symbols-outlined text-[18px] text-on-surface-variant"
                                    >wb_twilight</span
                                >
                                <h3
                                    className="text-xs font-semibold uppercase tracking-wider text-on-surface"
                                >
                                    Manhã
                                </h3>
                            </div>
                            <span className="text-[11px] text-on-surface-variant"
                                >08:00 às 12:00</span
                            >
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {/*  09:00 - Ocupado  */}
                            <button
                                className="h-11 rounded-xl bg-surface-container-low text-on-surface-variant opacity-40 line-through text-xs font-medium flex items-center justify-center cursor-not-allowed"
                                disabled
                                style={{"fontVariantNumeric": "tabular-nums"}}
                            >
                                09:00
                            </button>
                            {/*  09:45 - Ocupado  */}
                            <button
                                className="h-11 rounded-xl bg-surface-container-low text-on-surface-variant opacity-40 line-through text-xs font-medium flex items-center justify-center cursor-not-allowed"
                                disabled
                                style={{"fontVariantNumeric": "tabular-nums"}}
                            >
                                09:45
                            </button>
                            {/*  10:30 - Ocupado  */}
                            <button
                                className="h-11 rounded-xl bg-surface-container-low text-on-surface-variant opacity-40 line-through text-xs font-medium flex items-center justify-center cursor-not-allowed"
                                disabled
                                style={{"fontVariantNumeric": "tabular-nums"}}
                            >
                                10:30
                            </button>
                            {/*  11:15 - Disponível  */}
                            <button
                                className="time-slot h-11 rounded-xl bg-surface-container hover:bg-secondary-container text-on-surface text-xs font-medium flex items-center justify-center transition-colors"
                                style={{"fontVariantNumeric": "tabular-nums"}}
                                type="button"
                            >
                                11:15
                            </button>
                        </div>
                    </div>
                    {/*  Turno Tarde  */}
                    <div
                        className="bg-surface-container-lowest p-3.5 rounded-xl shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-2.5">
                            <div className="flex items-center gap-2">
                                <span
                                    className="material-symbols-outlined text-[18px] text-tertiary"
                                    >wb_sunny</span
                                >
                                <h3
                                    className="text-xs font-semibold uppercase tracking-wider text-on-surface"
                                >
                                    Tarde
                                </h3>
                            </div>
                            <span className="text-[11px] text-on-surface-variant"
                                >12:00 às 18:00</span
                            >
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            <button
                                className="time-slot h-11 rounded-xl bg-surface-container hover:bg-secondary-container text-on-surface text-xs font-medium flex items-center justify-center transition-colors"
                                style={{"fontVariantNumeric": "tabular-nums"}}
                                type="button"
                            >
                                13:30
                            </button>
                            <button
                                className="time-slot h-11 rounded-xl bg-surface-container hover:bg-secondary-container text-on-surface text-xs font-medium flex items-center justify-center transition-colors"
                                style={{"fontVariantNumeric": "tabular-nums"}}
                                type="button"
                            >
                                14:15
                            </button>
                            {/*  15:00 - SELECIONADO  */}
                            <button
                                className="time-slot selected-slot h-11 rounded-xl bg-primary text-on-primary text-xs font-semibold flex items-center justify-center gap-1 shadow-sm transition-all"
                                style={{"fontVariantNumeric": "tabular-nums"}}
                                type="button"
                            >
                                <span
                                    className="material-symbols-outlined text-[15px]"
                                    style={{"fontVariationSettings": "\"FILL\" 1"}}
                                    >check</span
                                >
                                15:00
                            </button>
                            <button
                                className="time-slot h-11 rounded-xl bg-surface-container hover:bg-secondary-container text-on-surface text-xs font-medium flex items-center justify-center transition-colors"
                                style={{"fontVariantNumeric": "tabular-nums"}}
                                type="button"
                            >
                                15:45
                            </button>
                            <button
                                className="time-slot h-11 rounded-xl bg-surface-container hover:bg-secondary-container text-on-surface text-xs font-medium flex items-center justify-center transition-colors"
                                style={{"fontVariantNumeric": "tabular-nums"}}
                                type="button"
                            >
                                16:30
                            </button>
                            <button
                                className="time-slot h-11 rounded-xl bg-surface-container hover:bg-secondary-container text-on-surface text-xs font-medium flex items-center justify-center transition-colors"
                                style={{"fontVariantNumeric": "tabular-nums"}}
                                type="button"
                            >
                                17:15
                            </button>
                        </div>
                    </div>
                    {/*  Turno Noite  */}
                    <div
                        className="bg-surface-container-lowest p-3.5 rounded-xl shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-2.5">
                            <div className="flex items-center gap-2">
                                <span
                                    className="material-symbols-outlined text-[18px] text-secondary"
                                    >dark_mode</span
                                >
                                <h3
                                    className="text-xs font-semibold uppercase tracking-wider text-on-surface"
                                >
                                    Noite
                                </h3>
                            </div>
                            <span className="text-[11px] text-on-surface-variant"
                                >18:00 às 21:00</span
                            >
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            <button
                                className="time-slot h-11 rounded-xl bg-surface-container hover:bg-secondary-container text-on-surface text-xs font-medium flex items-center justify-center transition-colors"
                                style={{"fontVariantNumeric": "tabular-nums"}}
                                type="button"
                            >
                                18:00
                            </button>
                            <button
                                className="time-slot h-11 rounded-xl bg-surface-container hover:bg-secondary-container text-on-surface text-xs font-medium flex items-center justify-center transition-colors"
                                style={{"fontVariantNumeric": "tabular-nums"}}
                                type="button"
                            >
                                18:45
                            </button>
                            <button
                                className="time-slot h-11 rounded-xl bg-surface-container hover:bg-secondary-container text-on-surface text-xs font-medium flex items-center justify-center transition-colors"
                                style={{"fontVariantNumeric": "tabular-nums"}}
                                type="button"
                            >
                                19:30
                            </button>
                            <button
                                className="time-slot h-11 rounded-xl bg-surface-container hover:bg-secondary-container text-on-surface text-xs font-medium flex items-center justify-center transition-colors"
                                style={{"fontVariantNumeric": "tabular-nums"}}
                                type="button"
                            >
                                20:15
                            </button>
                        </div>
                    </div>
                </section>
                {/*  Regra de Antecedência e Política  */}
                <section className="px-4 mt-4">
                    <div
                        className="bg-surface-container-low p-3.5 rounded-xl flex items-start gap-3"
                    >
                        <div
                            className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 mt-0.5"
                        >
                            <span className="material-symbols-outlined text-[18px]"
                                >info</span
                            >
                        </div>
                        <div className="flex-1">
                            <p
                                className="text-xs font-semibold text-on-surface mb-0.5"
                            >
                                Pontualidade & Cancelamentos
                            </p>
                            <p
                                className="text-[11px] leading-relaxed text-on-surface-variant"
                            >
                                Tolerância máxima de 15 minutos no
                                comparecimento. Cancelamento ou reagendamento
                                sem custo com até 2 horas de antecedência pelo
                                aplicativo.
                            </p>
                        </div>
                    </div>
                </section>
                {/*  Aviso Ético de Rodapé  */}
                <div className="px-4 mt-6 text-center">
                    <p className="text-[10px] text-on-surface-variant opacity-70">
                        Protótipo interativo Barbearia Motta • Dados
                        ilustrativos para conferência de fluxo de agendamento.
                    </p>
                </div>
                {/*  Bottom Bar Fixa Flutuante com Resumo e CTA  */}
                <aside
                    className="fixed bottom-0 inset-x-0 z-40 bg-surface-container-lowest/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-safe"
                >
                    <div className="px-4 py-3 flex flex-col gap-2">
                        {/*  Resumo Rápido  */}
                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1.5 truncate">
                                <span
                                    className="material-symbols-outlined text-[16px] text-primary"
                                    style={{"fontVariationSettings": "\"FILL\" 1"}}
                                    >event_available</span
                                >
                                <span
                                    className="font-semibold text-on-surface truncate"
                                    id="selectedSummary"
                                    >Qua, 28 Out às 15:00</span
                                >
                                <span className="text-on-surface-variant"
                                    >• Michel Nogueira</span
                                >
                            </div>
                            <span
                                className="font-bold text-on-surface text-sm shrink-0"
                                style={{"fontVariantNumeric": "tabular-nums"}}
                                >R$ 32,30</span
                            >
                        </div>
                        {/*  Botão CTA Principal  */}
                        <button
                            className="w-full h-12 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
                            type="button"
                        >
                            <span>Prosseguir para Revisão</span>
                            <span className="material-symbols-outlined text-[18px]"
                                >arrow_forward</span
                            >
                        </button>
                    </div>
                </aside>
            </div>
            
        
          <aside className="booking-summary fixed bottom-0 inset-x-0 z-40 bg-surface-canvas/95 backdrop-blur-xl border-t border-neutral-300/40 p-4 max-w-[430px] mx-auto shadow-lg flex items-center justify-between gap-3">
            <button
              onClick={prevStep}
              className="px-4 py-3 rounded-xl bg-surface-container-high text-on-surface text-xs font-medium hover:bg-surface-container-highest transition-colors"
            >
              Voltar
            </button>
            <button
              onClick={nextStep}
              className="primary px-5 py-3 rounded-xl bg-brand-700 text-on-primary text-xs font-semibold shadow-md hover:bg-brand-800 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span>Revisar Agendamento</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </aside>
        </div>
      )}

      {step === 4 && (
        <div className="w-full review-cards">

            <div className="flex flex-col w-full text-on-surface">
                {/*  Stepper de Progresso  */}
                <section
                    className="px-4 pt-3 pb-4 bg-surface-container-lowest shadow-sm flex flex-col gap-2.5"
                >
                    <div className="flex items-center justify-between text-xs">
                        <span
                            className="font-medium text-primary flex items-center gap-1.5"
                        >
                            <span
                                className="w-2 h-2 rounded-full bg-primary animate-pulse"
                            ></span>
                            Etapa 4 de 5 • 80% Concluído
                        </span>
                        <span
                            className="text-on-surface-variant font-label text-[11px] tracking-wide uppercase"
                            >Revisão</span
                        >
                    </div>
                    {/*  Stepper Bars  */}
                    <div className="grid grid-cols-5 gap-1.5 w-full">
                        <div
                            className="h-1.5 rounded-full bg-primary"
                            title="1. Serviços"
                        ></div>
                        <div
                            className="h-1.5 rounded-full bg-primary"
                            title="2. Profissional"
                        ></div>
                        <div
                            className="h-1.5 rounded-full bg-primary"
                            title="3. Data e Hora"
                        ></div>
                        <div
                            className="h-1.5 rounded-full bg-primary"
                            title="4. Revisão"
                        ></div>
                        <div
                            className="h-1.5 rounded-full bg-surface-container-high"
                            title="5. Confirmação"
                        ></div>
                    </div>
                    {/*  Status textual resumido dos passos  */}
                    <div
                        className="flex items-center justify-between text-[11px] text-on-surface-variant px-0.5"
                    >
                        <span
                            className="text-primary font-medium flex items-center gap-0.5"
                        >
                            <span className="material-symbols-outlined text-[13px]"
                                >check_circle</span
                            >Serviços
                        </span>
                        <span
                            className="text-primary font-medium flex items-center gap-0.5"
                        >
                            <span className="material-symbols-outlined text-[13px]"
                                >check_circle</span
                            >Especialista
                        </span>
                        <span
                            className="text-primary font-medium flex items-center gap-0.5"
                        >
                            <span className="material-symbols-outlined text-[13px]"
                                >check_circle</span
                            >Horário
                        </span>
                        <span className="text-primary font-bold">4. Revisão</span>
                        <span className="opacity-50">5. Conclusão</span>
                    </div>
                </section>
                {/*  Alerta de Reserva Temporária / Countdown  */}
                <section className="px-4 py-3">
                    <div
                        className="rounded-xl bg-tertiary-fixed text-on-tertiary-fixed p-3 shadow-sm flex items-center justify-between gap-3"
                    >
                        <div className="flex items-center gap-2.5 min-w-0">
                            <div
                                className="w-8 h-8 rounded-full bg-on-tertiary-fixed/10 flex items-center justify-center shrink-0"
                            >
                                <span
                                    className="material-symbols-outlined text-[20px] text-tertiary"
                                    style={{"fontVariationSettings": "\"FILL\" 1"}}
                                    >timer</span
                                >
                            </div>
                            <div className="min-w-0">
                                <p
                                    className="text-xs font-semibold leading-tight text-on-tertiary-fixed"
                                >
                                    Slot reservado temporariamente
                                </p>
                                <p
                                    className="text-[11px] text-on-tertiary-fixed/80 truncate"
                                >
                                    Conclua o agendamento antes que expire
                                </p>
                            </div>
                        </div>
                        <div
                            className="shrink-0 bg-surface-container-lowest text-primary font-bold text-xs px-2.5 py-1.5 rounded-lg shadow-inner flex items-center gap-1 font-mono"
                        >
                            <span className="material-symbols-outlined text-[14px]"
                                >lock_clock</span
                            >
                            <span id="countdown-timer">11:55</span>
                        </div>
                    </div>
                </section>
                {/*  Cabeçalho Editorial da Página  */}
                <header className="px-4 pt-1 pb-3 flex flex-col gap-1">
                    <h2
                        className="font-headline text-2xl text-on-surface leading-tight"
                    >
                        Revisão e Confirmação
                    </h2>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                        Confira todos os dados do seu agendamento, condições
                        financeiras e políticas antes de finalizar.
                    </p>
                </header>
                {/*  Conteúdo Principal / Cards de Revisão  */}
                <div className="px-4 flex flex-col gap-3 pb-32">
                    {/*  Card 1: Quando & Onde  */}
                    <div
                        className="rounded-2xl bg-surface-container-lowest p-4 shadow-[0_8px_24px_rgba(10,30,19,0.05)] flex flex-col gap-3.5"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-7 h-7 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center"
                                >
                                    <span
                                        className="material-symbols-outlined text-[17px]"
                                        >event_available</span
                                    >
                                </div>
                                <span
                                    className="text-xs font-bold uppercase tracking-wider text-secondary"
                                    >Quando & Onde</span
                                >
                            </div>
                            <button
                                className="text-xs font-semibold text-primary hover:underline flex items-center gap-0.5"
                                type="button"
                            >
                                <span>Alterar</span>
                                <span
                                    className="material-symbols-outlined text-[14px]"
                                    >edit</span
                                >
                            </button>
                        </div>
                        <div
                            className="flex flex-col gap-2.5 bg-surface-container-low/70 p-3 rounded-xl"
                        >
                            <div className="flex items-start gap-2.5">
                                <span
                                    className="material-symbols-outlined text-primary text-[19px] mt-0.5 shrink-0"
                                    >calendar_month</span
                                >
                                <div>
                                    <p
                                        className="text-sm font-semibold text-on-surface"
                                    >
                                        Quarta-feira, 28 de Outubro de 2026
                                    </p>
                                    <p
                                        className="text-xs text-on-surface-variant font-mono flex items-center gap-1 mt-0.5"
                                    >
                                        <span className="font-medium text-primary"
                                            >15:00 às 16:05</span
                                        >
                                        <span>•</span>
                                        <span>Duração total: 65 min</span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2.5 pt-2">
                                <span
                                    className="material-symbols-outlined text-primary text-[19px] mt-0.5 shrink-0"
                                    >storefront</span
                                >
                                <div className="min-w-0">
                                    <p
                                        className="text-xs font-semibold text-on-surface"
                                    >
                                        Unidade Sol & Mar
                                    </p>
                                    <p
                                        className="text-xs text-on-surface-variant leading-snug"
                                    >
                                        Av. Carlos Augusto T. Garcia, 2040 - Sol
                                        e Mar - Macaé - RJ
                                    </p>
                                    <div
                                        className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-medium"
                                    >
                                        <span
                                            className="material-symbols-outlined text-[13px]"
                                            style={{"fontVariationSettings": "\"FILL\" 1"}}
                                            >local_parking</span
                                        >
                                        Valet cortesia incluso no Clube Gold /
                                        Black
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*  Card 2: Profissional Especialista  */}
                    <div
                        className="rounded-2xl bg-surface-container-lowest p-4 shadow-[0_8px_24px_rgba(10,30,19,0.05)] flex flex-col gap-3"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-7 h-7 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center"
                                >
                                    <span
                                        className="material-symbols-outlined text-[17px]"
                                        >content_cut</span
                                    >
                                </div>
                                <span
                                    className="text-xs font-bold uppercase tracking-wider text-secondary"
                                    >Profissional Especialista</span
                                >
                            </div>
                            <button
                                className="text-xs font-semibold text-primary hover:underline flex items-center gap-0.5"
                                type="button"
                            >
                                <span>Alterar</span>
                                <span
                                    className="material-symbols-outlined text-[14px]"
                                    >edit</span
                                >
                            </button>
                        </div>
                        <div
                            className="flex items-center gap-3.5 bg-surface-container-low/70 p-3 rounded-xl"
                        >
                            <div className="relative shrink-0">
                                <img
                                    alt="Michel Nogueira - Barbeiro Especialista"
                                    className="w-14 h-14 rounded-full object-cover shadow-sm ring-2 ring-primary/20"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0J-klYfPmDXTu_9nDJgyWCuYkAw7_5dWiWxh1e9xFyrkUAJRsk2BJusEumRvdABHK90-EeeGEoGDc6fNRaorRG3MMxXuTfz0HsTS0j2Bnd5DjVIvRkNP9jk5PBCfuQorOTauvYFh2UaZeCHX9DRF2pvAHud8X0lY1W7V95cZb2Vmgy1gwdLr-w1AAvurK7FZPPWuqJ90LaNlJnBZfpJQO_YOSl35tP-eGYvVMSbcu7A5-SgYmWbVi0g"
                                />
                                <span
                                    className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center text-[10px]"
                                >
                                    <span
                                        className="material-symbols-outlined text-[12px]"
                                        style={{"fontVariationSettings": "\"FILL\" 1"}}
                                        >verified</span
                                    >
                                </span>
                            </div>
                            <div className="min-w-0 flex-1">
                                <div
                                    className="flex items-center gap-1.5 justify-between"
                                >
                                    <h3
                                        className="text-sm font-bold text-on-surface truncate"
                                    >
                                        Michel Nogueira
                                    </h3>
                                    <span
                                        className="inline-flex items-center gap-0.5 text-xs font-bold text-tertiary bg-tertiary-fixed px-2 py-0.5 rounded-full shrink-0"
                                    >
                                        <span
                                            className="material-symbols-outlined text-[13px]"
                                            style={{"fontVariationSettings": "\"FILL\" 1"}}
                                            >star</span
                                        >
                                        4.9
                                    </span>
                                </div>
                                <p
                                    className="text-xs text-on-surface-variant truncate mt-0.5"
                                >
                                    Barbeiro Master & Visagista Capilar
                                </p>
                                <p
                                    className="text-[11px] text-secondary font-medium mt-1 flex items-center gap-1"
                                >
                                    <span
                                        className="material-symbols-outlined text-[13px]"
                                        >military_tech</span
                                    >
                                    Especialista em Navalhete & Barboterapia
                                </p>
                            </div>
                        </div>
                    </div>
                    {/*  Card 3: Procedimentos Selecionados  */}
                    <div
                        className="rounded-2xl bg-surface-container-lowest p-4 shadow-[0_8px_24px_rgba(10,30,19,0.05)] flex flex-col gap-3"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-7 h-7 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center"
                                >
                                    <span
                                        className="material-symbols-outlined text-[17px]"
                                        >checklist</span
                                    >
                                </div>
                                <span
                                    className="text-xs font-bold uppercase tracking-wider text-secondary"
                                    >Procedimentos Selecionados (2)</span
                                >
                            </div>
                            <button
                                className="text-xs font-semibold text-primary hover:underline flex items-center gap-0.5"
                                type="button"
                            >
                                <span>Alterar</span>
                                <span
                                    className="material-symbols-outlined text-[14px]"
                                    >edit</span
                                >
                            </button>
                        </div>
                        {/*  Item 1: Corte  */}
                        <div
                            className="bg-surface-container-low/70 rounded-xl p-3 flex flex-col gap-2"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0 flex-1">
                                    <div
                                        className="flex items-center gap-1.5 flex-wrap"
                                    >
                                        <h4
                                            className="text-xs font-bold text-on-surface"
                                        >
                                            Corte Masculino Tradicional
                                        </h4>
                                        <span
                                            className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary text-on-primary"
                                        >
                                            Plano Black/Gold
                                        </span>
                                    </div>
                                    <p
                                        className="text-[11px] text-on-surface-variant mt-0.5 flex items-center gap-1"
                                    >
                                        <span
                                            className="material-symbols-outlined text-[12px]"
                                            >schedule</span
                                        >
                                        35 min • Tesoura & Máquina com
                                        Visagismo
                                    </p>
                                </div>
                                <div className="text-right shrink-0">
                                    <p
                                        className="text-[11px] text-on-surface-variant line-through font-mono"
                                    >
                                        R$ 45,00
                                    </p>
                                    <p
                                        className="text-sm font-bold text-primary font-mono"
                                    >
                                        R$ 0,00
                                    </p>
                                </div>
                            </div>
                            <div
                                className="flex items-center justify-between pt-1.5 text-[11px] text-primary font-medium bg-surface-container-lowest/80 px-2.5 py-1 rounded-lg"
                            >
                                <span className="flex items-center gap-1">
                                    <span
                                        className="material-symbols-outlined text-[14px]"
                                        >verified</span
                                    >
                                    Coberto 100% pelo plano
                                </span>
                                <span className="font-semibold font-mono"
                                    >Cota mensal ativa</span
                                >
                            </div>
                        </div>
                        {/*  Item 2: Barboterapia  */}
                        <div
                            className="bg-surface-container-low/70 rounded-xl p-3 flex flex-col gap-2"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0 flex-1">
                                    <div
                                        className="flex items-center gap-1.5 flex-wrap"
                                    >
                                        <h4
                                            className="text-xs font-bold text-on-surface"
                                        >
                                            Barba Terapia com Toalha Quente
                                        </h4>
                                        <span
                                            className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-tertiary-fixed text-on-tertiary-fixed"
                                        >
                                            15% OFF Fidelidade
                                        </span>
                                    </div>
                                    <p
                                        className="text-[11px] text-on-surface-variant mt-0.5 flex items-center gap-1"
                                    >
                                        <span
                                            className="material-symbols-outlined text-[12px]"
                                            >schedule</span
                                        >
                                        30 min • Óleos essenciais, massagem
                                        & navalha
                                    </p>
                                </div>
                                <div className="text-right shrink-0">
                                    <p
                                        className="text-[11px] text-on-surface-variant line-through font-mono"
                                    >
                                        R$ 38,00
                                    </p>
                                    <p
                                        className="text-sm font-bold text-on-surface font-mono"
                                    >
                                        R$ 32,30
                                    </p>
                                </div>
                            </div>
                            <div
                                className="flex items-center justify-between pt-1.5 text-[11px] text-on-surface-variant bg-surface-container-lowest/80 px-2.5 py-1 rounded-lg"
                            >
                                <span
                                    className="flex items-center gap-1 text-primary"
                                >
                                    <span
                                        className="material-symbols-outlined text-[14px]"
                                        >savings</span
                                    >
                                    Economia do Clube
                                </span>
                                <span className="font-bold text-primary font-mono"
                                    >- R$ 5,70</span
                                >
                            </div>
                        </div>
                    </div>
                    {/*  Card 4: Resumo Financeiro Detalhado  */}
                    <div
                        className="rounded-2xl bg-surface-container-lowest p-4 shadow-[0_8px_24px_rgba(10,30,19,0.05)] flex flex-col gap-3"
                    >
                        <div className="flex items-center gap-2">
                            <div
                                className="w-7 h-7 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center"
                            >
                                <span
                                    className="material-symbols-outlined text-[17px]"
                                    >receipt_long</span
                                >
                            </div>
                            <span
                                className="text-xs font-bold uppercase tracking-wider text-secondary"
                                >Resumo de Valores</span
                            >
                        </div>
                        <div className="flex flex-col gap-2 text-xs">
                            <div
                                className="flex justify-between items-center text-on-surface-variant"
                            >
                                <span>Subtotal de tabela (2 serviços)</span>
                                <span
                                    className="font-mono tabular-nums text-on-surface font-medium"
                                    >R$ 83,00</span
                                >
                            </div>
                            <div
                                className="flex justify-between items-center text-primary font-medium"
                            >
                                <span className="flex items-center gap-1">
                                    <span
                                        className="material-symbols-outlined text-[15px]"
                                        >card_membership</span
                                    >
                                    Cota Clube (Corte Masculino)
                                </span>
                                <span
                                    className="font-mono tabular-nums font-semibold"
                                    >- R$ 45,00</span
                                >
                            </div>
                            <div
                                className="flex justify-between items-center text-primary font-medium"
                            >
                                <span className="flex items-center gap-1">
                                    <span
                                        className="material-symbols-outlined text-[15px]"
                                        >loyalty</span
                                    >
                                    Desconto Membro (Barboterapia 15%)
                                </span>
                                <span
                                    className="font-mono tabular-nums font-semibold"
                                    >- R$ 5,70</span
                                >
                            </div>
                            <div
                                className="flex justify-between items-center text-on-surface-variant"
                            >
                                <span>Taxa de Agendamento Online</span>
                                <span
                                    className="font-mono tabular-nums text-primary font-semibold"
                                    >Isenta</span
                                >
                            </div>
                            {/*  Banner com a economia total  */}
                            <div
                                className="bg-secondary-container/60 text-on-secondary-container p-2.5 rounded-xl flex items-center justify-between mt-1"
                            >
                                <div
                                    className="flex items-center gap-1.5 text-xs font-medium"
                                >
                                    <span
                                        className="material-symbols-outlined text-[17px] text-primary"
                                        style={{"fontVariationSettings": "\"FILL\" 1"}}
                                        >stars</span
                                    >
                                    <span>Economia total aplicada</span>
                                </div>
                                <span
                                    className="font-mono font-bold tabular-nums text-primary text-xs"
                                    >R$ 50,70</span
                                >
                            </div>
                            {/*  Linha de Total  */}
                            <div
                                className="bg-surface-container-low p-3 rounded-xl flex items-center justify-between mt-1"
                            >
                                <div>
                                    <span
                                        className="text-[11px] uppercase tracking-wider font-bold text-on-surface-variant block"
                                        >Total a Liquidar</span
                                    >
                                    <span
                                        className="text-[11px] text-on-surface-variant"
                                        >Acerto conforme modalidade abaixo</span
                                    >
                                </div>
                                <div className="text-right">
                                    <div
                                        className="font-headline text-2xl text-primary font-bold font-mono tabular-nums leading-none"
                                    >
                                        R$ 32,30
                                    </div>
                                    <span
                                        className="text-[10px] text-on-surface-variant"
                                        >em até 1x sem juros</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*  Card 5: Opção de Pagamento  */}
                    <div
                        className="rounded-2xl bg-surface-container-lowest p-4 shadow-[0_8px_24px_rgba(10,30,19,0.05)] flex flex-col gap-3"
                    >
                        <div className="flex items-center gap-2">
                            <div
                                className="w-7 h-7 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center"
                            >
                                <span
                                    className="material-symbols-outlined text-[17px]"
                                    >payments</span
                                >
                            </div>
                            <span
                                className="text-xs font-bold uppercase tracking-wider text-secondary"
                                >Forma de Pagamento</span
                            >
                        </div>
                        <div className="flex flex-col gap-2.5">
                            {/*  Radio 1: Na Barbearia (Padrão Ativo)  */}
                            <label
                                className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-low cursor-pointer transition-all"
                            >
                                <input
                                    defaultChecked
                                    className="mt-1 w-4 h-4 text-primary accent-primary cursor-pointer shrink-0"
                                    name="payment_method"
                                    type="radio"
                                    value="in_store"
                                />
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="text-xs font-bold text-on-surface"
                                            >Pagar na Recepção da
                                            Barbearia</span
                                        >
                                        <span
                                            className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary-fixed text-on-primary-fixed"
                                            >Recomendado</span
                                        >
                                    </div>
                                    <p
                                        className="text-[11px] text-on-surface-variant mt-0.5 leading-snug"
                                    >
                                        PIX com QR Code dinâmico, Cartão de
                                        Crédito/Débito ou Dinheiro em espécie ao
                                        término dos atendimentos.
                                    </p>
                                </div>
                            </label>
                            {/*  Radio 2: No Cartão do Clube  */}
                            <label
                                className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-low/50 hover:bg-surface-container-low cursor-pointer transition-all"
                            >
                                <input
                                    className="mt-1 w-4 h-4 text-primary accent-primary cursor-pointer shrink-0"
                                    name="payment_method"
                                    type="radio"
                                    value="card_on_file"
                                />
                                <div className="min-w-0">
                                    <span
                                        className="text-xs font-bold text-on-surface block"
                                        >Debitar no Cartão da Assinatura</span
                                    >
                                    <p
                                        className="text-[11px] text-on-surface-variant mt-0.5 flex items-center gap-1.5"
                                    >
                                        <span
                                            className="material-symbols-outlined text-[15px]"
                                            >credit_card</span
                                        >
                                        <span>Mastercard final •••• 9241</span>
                                        <span
                                            className="text-primary font-medium font-mono text-[10px]"
                                            >• Cobrança instantânea</span
                                        >
                                    </p>
                                </div>
                            </label>
                        </div>
                    </div>
                    {/*  Card 6: Termos, Tolerância e Políticas  */}
                    <div
                        className="rounded-2xl bg-surface-container-lowest p-4 shadow-[0_8px_24px_rgba(10,30,19,0.05)] flex flex-col gap-3"
                    >
                        <div className="flex items-center gap-2">
                            <div
                                className="w-7 h-7 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center"
                            >
                                <span
                                    className="material-symbols-outlined text-[17px]"
                                    >policy</span
                                >
                            </div>
                            <span
                                className="text-xs font-bold uppercase tracking-wider text-secondary"
                                >Termos & Experiência Motta</span
                            >
                        </div>
                        {/*  Políticas em Grid  */}
                        <div className="grid grid-cols-1 gap-2 text-xs">
                            <div
                                className="flex items-center gap-2.5 p-2 rounded-lg bg-surface-container-low/50"
                            >
                                <span
                                    className="material-symbols-outlined text-primary text-[18px] shrink-0"
                                    >pace</span
                                >
                                <p className="text-[11px] text-on-surface-variant">
                                    <strong className="text-on-surface"
                                        >Tolerância de 15 minutos:</strong
                                    >
                                    Seu horário é reservado com exclusividade.
                                </p>
                            </div>
                            <div
                                className="flex items-center gap-2.5 p-2 rounded-lg bg-surface-container-low/50"
                            >
                                <span
                                    className="material-symbols-outlined text-primary text-[18px] shrink-0"
                                    >event_repeat</span
                                >
                                <p className="text-[11px] text-on-surface-variant">
                                    <strong className="text-on-surface"
                                        >Cancelamento sem multa:</strong
                                    >
                                    Reagende gratuitamente com até 2h de
                                    antecedência.
                                </p>
                            </div>
                            <div
                                className="flex items-center gap-2.5 p-2 rounded-lg bg-surface-container-low/50"
                            >
                                <span
                                    className="material-symbols-outlined text-tertiary text-[18px] shrink-0"
                                    >sports_bar</span
                                >
                                <p className="text-[11px] text-on-surface-variant">
                                    <strong className="text-on-surface"
                                        >Lounge & Bar:</strong
                                    >
                                    Café espresso gourmet e chopp artesanal
                                    cortesia no acolhimento.
                                </p>
                            </div>
                        </div>
                        {/*  Checkbox Obrigatório  */}
                        <label
                            className="flex items-start gap-2.5 pt-2 cursor-pointer select-none"
                        >
                            <input
                                defaultChecked
                                className="mt-0.5 w-4 h-4 rounded text-primary accent-primary cursor-pointer shrink-0"
                                id="terms-check"
                                type="checkbox"
                            />
                            <span
                                className="text-[11px] text-on-surface leading-tight"
                            >
                                Li e concordo com os termos de comparecimento,
                                tolerância de 15 minutos e política de
                                cancelamento da Barbearia Motta.
                            </span>
                        </label>
                    </div>
                    {/*  Aviso Ético e Legal  */}
                    <div className="px-2 py-1 text-center">
                        <p
                            className="text-[10px] text-on-surface-variant/70 leading-relaxed"
                        >
                            Barbearia Motta Ateliê & Estética • Todos os
                            direitos reservados.
                            <br />
                            Ambiente de pré-reserva com criptografia SSL 256-bit
                            ativa. Dados ilustrativos para validação visual.
                        </p>
                    </div>
                </div>
                {/*  Bottom Bar de Ação Fixa com Safe-Area  */}
                <div
                    className="fixed bottom-0 inset-x-0 bg-surface/95 backdrop-blur-md shadow-[0_-8px_24px_rgba(0,0,0,0.06)] pb-safe z-40"
                >
                    <div className="px-4 py-3 flex flex-col gap-2 max-w-lg mx-auto">
                        {/*  Selo de Segurança em Linha  */}
                        <div
                            className="flex items-center justify-center gap-1.5 text-[11px] text-primary font-medium"
                        >
                            <span className="material-symbols-outlined text-[14px]"
                                >encrypted</span
                            >
                            <span
                                >Ambiente seguro com criptografia de ponta a
                                ponta</span
                            >
                        </div>
                        {/*  Botão Primário Largo  */}
                        <button
                            className="w-full h-12 bg-primary hover:bg-primary-container active:scale-[0.99] text-on-primary font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                            id="btn-confirm"
                            type="button"
                        >
                            <span>Confirmar Agendamento</span>
                            <span className="material-symbols-outlined text-[18px]"
                                >arrow_forward</span
                            >
                        </button>
                        {/*  Botão Secundário para Retorno  */}
                        <button
                            className="w-full py-1 text-xs text-on-surface-variant hover:text-on-surface font-medium transition-colors text-center"
                            
                            type="button"
                        >
                            Voltar e Modificar Dados
                        </button>
                    </div>
                </div>
            </div>
            {/*  Micro-Interações JS Client-side: Countdown Timer e Validação do Botão  */}
            
        
          <div className="px-4 py-3 bg-surface-container-low mx-4 rounded-xl mb-4 border border-outline-variant/30 flex items-start gap-2.5">
            <input
              type="checkbox"
              id="accept-terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-1 w-4 h-4 rounded text-brand-700 focus:ring-brand-700"
            />
            <label htmlFor="accept-terms" className="text-xs text-neutral-700 leading-snug cursor-pointer">
              Li e concordo com a política de tolerância de 15 minutos e cancelamento com restituição de cota até 2 horas antes do atendimento.
            </label>
          </div>

          <aside className="booking-summary fixed bottom-0 inset-x-0 z-40 bg-surface-canvas/95 backdrop-blur-xl border-t border-neutral-300/40 p-4 max-w-[430px] mx-auto shadow-lg flex items-center justify-between gap-3">
            <button
              onClick={prevStep}
              className="px-4 py-3 rounded-xl bg-surface-container-high text-on-surface text-xs font-medium hover:bg-surface-container-highest transition-colors"
            >
              Voltar
            </button>
            <button
              onClick={nextStep}
              className="primary px-6 py-3 rounded-xl bg-brand-700 text-on-primary text-xs font-semibold shadow-md hover:bg-brand-800 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span>Confirmar Agendamento</span>
              <span className="material-symbols-outlined text-[16px]">check</span>
            </button>
          </aside>
        </div>
      )}

      {step === 5 && (
        <div className="w-full">

            <div className="flex flex-col w-full">
                {/*  Status & Dismiss Header Bar  */}
                <div
                    className="px-4 py-3 bg-surface-container-low flex items-center justify-between"
                >
                    <div className="flex items-center gap-2">
                        <span
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-secondary-container text-on-secondary-container"
                        >
                            <span
                                className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"
                            ></span>
                            Reserva Confirmada
                        </span>
                    </div>
                    <button
                        aria-label="Fechar e ir para o Início"
                        className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
                        
                    >
                        <span className="material-symbols-outlined text-[18px]"
                            >close</span
                        >
                    </button>
                </div>
                {/*  Stepper: Etapa 5 de 5 (100% Concluído)  */}
                <div
                    className="px-4 py-3 bg-surface-container-lowest shadow-sm flex flex-col gap-2"
                >
                    <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-primary"
                            >Etapa 5 de 5 • Conclusão e Voucher</span
                        >
                        <span
                            className="font-medium text-on-surface-variant tabular-nums"
                            >100% Concluído</span
                        >
                    </div>
                    <div className="grid grid-cols-5 gap-1.5 items-center">
                        <div
                            className="h-1.5 rounded-full bg-primary flex items-center justify-center"
                        ></div>
                        <div
                            className="h-1.5 rounded-full bg-primary flex items-center justify-center"
                        ></div>
                        <div
                            className="h-1.5 rounded-full bg-primary flex items-center justify-center"
                        ></div>
                        <div
                            className="h-1.5 rounded-full bg-primary flex items-center justify-center"
                        ></div>
                        <div
                            className="h-1.5 rounded-full bg-primary flex items-center justify-center"
                        ></div>
                    </div>
                    <div
                        className="flex items-center justify-between px-0.5 pt-0.5 text-[11px] text-on-surface-variant"
                    >
                        <span
                            className="flex items-center gap-0.5 font-medium text-primary"
                            ><span className="material-symbols-outlined text-[13px]"
                                >check_circle</span
                            >
                            Serviço</span
                        >
                        <span
                            className="flex items-center gap-0.5 font-medium text-primary"
                            ><span className="material-symbols-outlined text-[13px]"
                                >check_circle</span
                            >
                            Barbeiro</span
                        >
                        <span
                            className="flex items-center gap-0.5 font-medium text-primary"
                            ><span className="material-symbols-outlined text-[13px]"
                                >check_circle</span
                            >
                            Horário</span
                        >
                        <span
                            className="flex items-center gap-0.5 font-medium text-primary"
                            ><span className="material-symbols-outlined text-[13px]"
                                >check_circle</span
                            >
                            Revisão</span
                        >
                        <span
                            className="flex items-center gap-0.5 font-semibold text-primary"
                            ><span className="material-symbols-outlined text-[13px]"
                                >verified</span
                            >
                            Voucher</span
                        >
                    </div>
                </div>
                {/*  Hero de Sucesso  */}
                <div
                    className="px-4 pt-6 pb-5 flex flex-col items-center text-center"
                >
                    <div className="relative flex items-center justify-center mb-4">
                        <div
                            className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center shadow-md"
                        >
                            <span
                                className="material-symbols-outlined text-primary text-[36px]"
                                style={{"fontVariationSettings": "\"FILL\" 1"}}
                                >check_circle</span
                            >
                        </div>
                        <span className="absolute -top-1 -right-1 flex h-4 w-4">
                            <span
                                className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"
                            ></span>
                            <span
                                className="relative inline-flex rounded-full h-4 w-4 bg-primary"
                            ></span>
                        </span>
                    </div>
                    <div
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-semibold tracking-wider uppercase mb-2"
                    >
                        <span className="material-symbols-outlined text-[14px]"
                            >stars</span
                        >
                        Motta Club Priority • #MOTTA-2026-8849
                    </div>
                    <h2
                        className="font-headline text-3xl font-normal text-on-surface tracking-tight leading-tight mb-2"
                    >
                        Agendamento Confirmado!
                    </h2>
                    <p
                        className="text-xs text-on-surface-variant max-w-sm leading-relaxed mb-5"
                    >
                        Sua reserva foi processada com sucesso no sistema
                        central da Barbearia Motta. Apresente seu voucher
                        digital ao chegar no balcão da unidade Sol & Mar.
                    </p>
                    {/*  Quick Export Row  */}
                    <div className="grid grid-cols-3 gap-2 w-full max-w-sm">
                        <button
                            className="flex flex-col items-center justify-center py-2.5 px-2 bg-surface-container-lowest rounded-xl shadow-sm hover:bg-surface-container-low transition-colors"
                        >
                            <span
                                className="material-symbols-outlined text-primary text-[20px] mb-1"
                                >event</span
                            >
                            <span
                                className="text-[11px] font-semibold text-on-surface"
                                >Google Agenda</span
                            >
                        </button>
                        <button
                            className="flex flex-col items-center justify-center py-2.5 px-2 bg-surface-container-lowest rounded-xl shadow-sm hover:bg-surface-container-low transition-colors"
                        >
                            <span
                                className="material-symbols-outlined text-primary text-[20px] mb-1"
                                >calendar_add_on</span
                            >
                            <span
                                className="text-[11px] font-semibold text-on-surface"
                                >Download .ICS</span
                            >
                        </button>
                        <button
                            className="flex flex-col items-center justify-center py-2.5 px-2 bg-surface-container-lowest rounded-xl shadow-sm hover:bg-surface-container-low transition-colors"
                        >
                            <span
                                className="material-symbols-outlined text-primary text-[20px] mb-1"
                                >picture_as_pdf</span
                            >
                            <span
                                className="text-[11px] font-semibold text-on-surface"
                                >Baixar PDF</span
                            >
                        </button>
                    </div>
                </div>
                {/*  Voucher Digital Oficial (Bilhete Premium)  */}
                <div className="px-4 mb-6">
                    <div
                        className="bg-surface-container-lowest rounded-2xl shadow-md overflow-hidden"
                    >
                        {/*  Top Ticket Header with Image Background & Scrim  */}
                        <div className="relative h-44 w-full bg-inverse-surface">
                            <img
                                alt="Barbearia Motta Sol e Mar"
                                className="w-full h-full object-cover opacity-85"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxjrFfR-8L6iDKD867xC0I_6hrj_zwqPtuyWIi_WKiXXAXr6_x2hhs1Iui7okmntAkztoFGnSZF0ivxxxOxbuXy9XlnRmbDrx8xtUffUJUtc1Fu1QDitWVyKXROHiKinFBEODOne4l6qdh6xU1qfRRFIJuO4JL6pVXtDufLQfFw2cXXCgZDkR3Yc7ej5gUJ4YYzGr0M6Rv-dAIURuGAcgUI2ly2vBOHMBNloneonBhEqxkAIwVrqvF_g"
                            />
                            <div
                                className="absolute inset-0 bg-linear-to-t from-inverse-surface via-inverse-surface/40 to-transparent"
                            ></div>
                            <div
                                className="absolute top-3 inset-x-3 flex items-center justify-between"
                            >
                                <span
                                    className="px-2.5 py-1 rounded-full bg-primary-container/90 text-on-primary-container text-[11px] font-semibold tracking-wide backdrop-blur-md"
                                >
                                    Voucher Oficial • #MOTTA-2026-8849
                                </span>
                                <span
                                    className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 text-primary text-[11px] font-bold shadow-sm backdrop-blur-md flex items-center gap-1"
                                >
                                    <span
                                        className="material-symbols-outlined text-[13px]"
                                        >verified</span
                                    >
                                    Confirmado
                                </span>
                            </div>
                            <div
                                className="absolute bottom-3 left-3 right-3 text-inverse-on-surface"
                            >
                                <p
                                    className="text-xs uppercase tracking-wider text-secondary-fixed opacity-90"
                                >
                                    Unidade Macaé
                                </p>
                                <h3 className="font-headline text-xl leading-snug">
                                    Barbearia Motta — Sol & Mar
                                </h3>
                            </div>
                        </div>
                        {/*  Ticket Notch Divider  */}
                        <div
                            className="relative flex items-center justify-between px-3 py-1 bg-surface-container-lowest"
                        >
                            <div
                                className="w-4 h-6 rounded-r-full bg-surface -ml-3"
                            ></div>
                            <div
                                className="-1 mx-2 items-center justify-center overflow-hidden"
                            >
                                <div
                                    className="w-full flex justify-between gap-1.5 opacity-30 text-outline"
                                >
                                    <span className="text-xs tracking-widest"
                                        >• • • • • • • • • • • • • • • • • • • •
                                        • • • • • • • •</span
                                    >
                                </div>
                            </div>
                            <div
                                className="w-4 h-6 rounded-l-full bg-surface -mr-3"
                            ></div>
                        </div>
                        {/*  QR Code Fast Check-in Section  */}
                        <div
                            className="px-5 py-4 bg-surface-container-lowest flex flex-col items-center text-center"
                        >
                            <div
                                className="p-3 bg-surface-container-lowest rounded-2xl shadow-inner mb-2 inline-flex items-center justify-center"
                            >
                                {/*  Stylized Modern SVG QR Code Placeholder  */}
                                <svg
                                    className="w-36 h-36"
                                    fill="none"
                                    viewBox="0 0 140 140"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect
                                        fill="#F8F7F3"
                                        height="140"
                                        rx="8"
                                        width="140"
                                    ></rect>
                                    {/*  Corner Finder 1  */}
                                    <rect
                                        fill="none"
                                        height="34"
                                        rx="6"
                                        stroke="#003d1b"
                                        strokeWidth="5"
                                        width="34"
                                        x="14"
                                        y="14"
                                    ></rect>
                                    <rect
                                        fill="#003d1b"
                                        height="16"
                                        rx="3"
                                        width="16"
                                        x="23"
                                        y="23"
                                    ></rect>
                                    {/*  Corner Finder 2  */}
                                    <rect
                                        fill="none"
                                        height="34"
                                        rx="6"
                                        stroke="#003d1b"
                                        strokeWidth="5"
                                        width="34"
                                        x="92"
                                        y="14"
                                    ></rect>
                                    <rect
                                        fill="#003d1b"
                                        height="16"
                                        rx="3"
                                        width="16"
                                        x="101"
                                        y="23"
                                    ></rect>
                                    {/*  Corner Finder 3  */}
                                    <rect
                                        fill="none"
                                        height="34"
                                        rx="6"
                                        stroke="#003d1b"
                                        strokeWidth="5"
                                        width="34"
                                        x="14"
                                        y="92"
                                    ></rect>
                                    <rect
                                        fill="#003d1b"
                                        height="16"
                                        rx="3"
                                        width="16"
                                        x="23"
                                        y="101"
                                    ></rect>
                                    {/*  Stylized Matrix Data Patterns  */}
                                    <rect
                                        fill="#15552d"
                                        height="6"
                                        rx="1.5"
                                        width="6"
                                        x="56"
                                        y="16"
                                    ></rect>
                                    <rect
                                        fill="#15552d"
                                        height="6"
                                        rx="1.5"
                                        width="6"
                                        x="68"
                                        y="16"
                                    ></rect>
                                    <rect
                                        fill="#15552d"
                                        height="6"
                                        rx="1.5"
                                        width="6"
                                        x="78"
                                        y="24"
                                    ></rect>
                                    <rect
                                        fill="#15552d"
                                        height="12"
                                        rx="1.5"
                                        width="6"
                                        x="56"
                                        y="28"
                                    ></rect>
                                    <rect
                                        fill="#15552d"
                                        height="6"
                                        rx="1.5"
                                        width="6"
                                        x="68"
                                        y="34"
                                    ></rect>
                                    <rect
                                        fill="#15552d"
                                        height="6"
                                        rx="1.5"
                                        width="12"
                                        x="20"
                                        y="56"
                                    ></rect>
                                    <rect
                                        fill="#15552d"
                                        height="12"
                                        rx="1.5"
                                        width="6"
                                        x="38"
                                        y="56"
                                    ></rect>
                                    <rect
                                        fill="#003d1b"
                                        height="10"
                                        rx="2"
                                        width="10"
                                        x="52"
                                        y="52"
                                    ></rect>
                                    <rect
                                        fill="#15552d"
                                        height="6"
                                        rx="1.5"
                                        width="8"
                                        x="68"
                                        y="52"
                                    ></rect>
                                    <rect
                                        fill="#15552d"
                                        height="6"
                                        rx="1.5"
                                        width="12"
                                        x="82"
                                        y="56"
                                    ></rect>
                                    <rect
                                        fill="#15552d"
                                        height="8"
                                        rx="1.5"
                                        width="8"
                                        x="102"
                                        y="56"
                                    ></rect>
                                    <rect
                                        fill="#15552d"
                                        height="6"
                                        rx="1.5"
                                        width="8"
                                        x="118"
                                        y="56"
                                    ></rect>
                                    <rect
                                        fill="#15552d"
                                        height="14"
                                        rx="1.5"
                                        width="8"
                                        x="52"
                                        y="68"
                                    ></rect>
                                    <rect
                                        fill="#003d1b"
                                        height="8"
                                        rx="1.5"
                                        width="14"
                                        x="68"
                                        y="66"
                                    ></rect>
                                    <rect
                                        fill="#15552d"
                                        height="12"
                                        rx="1.5"
                                        width="8"
                                        x="88"
                                        y="70"
                                    ></rect>
                                    <rect
                                        fill="#15552d"
                                        height="6"
                                        rx="1.5"
                                        width="18"
                                        x="104"
                                        y="70"
                                    ></rect>
                                    <rect
                                        fill="#15552d"
                                        height="6"
                                        rx="1.5"
                                        width="14"
                                        x="16"
                                        y="76"
                                    ></rect>
                                    <rect
                                        fill="#15552d"
                                        height="8"
                                        rx="1.5"
                                        width="8"
                                        x="36"
                                        y="74"
                                    ></rect>
                                    <rect
                                        fill="#15552d"
                                        height="14"
                                        rx="1.5"
                                        width="6"
                                        x="56"
                                        y="90"
                                    ></rect>
                                    <rect
                                        fill="#15552d"
                                        height="6"
                                        rx="1.5"
                                        width="14"
                                        x="68"
                                        y="86"
                                    ></rect>
                                    <rect
                                        fill="#15552d"
                                        height="10"
                                        rx="1.5"
                                        width="6"
                                        x="88"
                                        y="90"
                                    ></rect>
                                    <rect
                                        fill="#15552d"
                                        height="8"
                                        rx="1.5"
                                        width="8"
                                        x="100"
                                        y="86"
                                    ></rect>
                                    <rect
                                        fill="#003d1b"
                                        height="10"
                                        rx="1.5"
                                        width="10"
                                        x="116"
                                        y="90"
                                    ></rect>
                                    <rect
                                        fill="#15552d"
                                        height="6"
                                        rx="1.5"
                                        width="12"
                                        x="56"
                                        y="112"
                                    ></rect>
                                    <rect
                                        fill="#15552d"
                                        height="14"
                                        rx="1.5"
                                        width="8"
                                        x="74"
                                        y="104"
                                    ></rect>
                                    <rect
                                        fill="#15552d"
                                        height="6"
                                        rx="1.5"
                                        width="14"
                                        x="90"
                                        y="110"
                                    ></rect>
                                    <rect
                                        fill="#15552d"
                                        height="6"
                                        rx="1.5"
                                        width="14"
                                        x="110"
                                        y="112"
                                    ></rect>
                                    <rect
                                        fill="#15552d"
                                        height="6"
                                        rx="1.5"
                                        width="18"
                                        x="64"
                                        y="124"
                                    ></rect>
                                    <rect
                                        fill="#15552d"
                                        height="8"
                                        rx="1.5"
                                        width="8"
                                        x="90"
                                        y="122"
                                    ></rect>
                                    <rect
                                        fill="#15552d"
                                        height="6"
                                        rx="1.5"
                                        width="12"
                                        x="104"
                                        y="124"
                                    ></rect>
                                </svg>
                            </div>
                            <p
                                className="text-[11px] text-on-surface-variant font-medium leading-relaxed max-w-xs"
                            >
                                Ao chegar, aponte a tela no leitor do balcão ou
                                totem para avisar
                                <span className="font-semibold text-on-surface"
                                    >Michel Nogueira</span
                                >
                                sobre sua presença imediata.
                            </p>
                        </div>
                        {/*  Service Details Grid  */}
                        <div className="px-5 pb-5 flex flex-col gap-4">
                            {/*  Service Info  */}
                            <div
                                className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-low"
                            >
                                <div
                                    className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center shrink-0 text-primary"
                                >
                                    <span
                                        className="material-symbols-outlined text-[20px]"
                                        >content_cut</span
                                    >
                                </div>
                                <div className="min-w-0 flex-1">
                                    <span
                                        className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant"
                                        >Serviço Selecionado</span
                                    >
                                    <p
                                        className="text-sm font-semibold text-on-surface truncate"
                                    >
                                        Combo Corte Tradicional & Barba
                                        Terapia
                                    </p>
                                    <p
                                        className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5"
                                    >
                                        <span
                                            className="material-symbols-outlined text-[14px]"
                                            >schedule</span
                                        >
                                        60 minutos de atendimento
                                    </p>
                                </div>
                            </div>
                            {/*  Barber Card  */}
                            <div
                                className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low"
                            >
                                <img
                                    alt="Michel Nogueira"
                                    className="w-12 h-12 rounded-xl object-cover shadow-sm shrink-0"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0J-klYfPmDXTu_9nDJgyWCuYkAw7_5dWiWxh1e9xFyrkUAJRsk2BJusEumRvdABHK90-EeeGEoGDc6fNRaorRG3MMxXuTfz0HsTS0j2Bnd5DjVIvRkNP9jk5PBCfuQorOTauvYFh2UaZeCHX9DRF2pvAHud8X0lY1W7V95cZb2Vmgy1gwdLr-w1AAvurK7FZPPWuqJ90LaNlJnBZfpJQO_YOSl35tP-eGYvVMSbcu7A5-SgYmWbVi0g"
                                />
                                <div className="min-w-0 flex-1">
                                    <span
                                        className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant"
                                        >Profissional Designado</span
                                    >
                                    <p
                                        className="text-sm font-semibold text-on-surface truncate"
                                    >
                                        Michel Nogueira
                                    </p>
                                    <p
                                        className="text-xs text-on-surface-variant flex items-center gap-1"
                                    >
                                        <span
                                            className="material-symbols-outlined text-[13px] text-tertiary"
                                            >workspace_premium</span
                                        >
                                        Barbeiro Master & Visagista •
                                        Cadeira 02
                                    </p>
                                </div>
                            </div>
                            {/*  Date & Time Card  */}
                            <div
                                className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-low"
                            >
                                <div
                                    className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center shrink-0 text-primary"
                                >
                                    <span
                                        className="material-symbols-outlined text-[20px]"
                                        >calendar_today</span
                                    >
                                </div>
                                <div className="min-w-0 flex-1">
                                    <span
                                        className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant"
                                        >Data & Horário Reservado</span
                                    >
                                    <p
                                        className="text-sm font-semibold text-on-surface"
                                    >
                                        Quarta, 28 de Outubro, 2026
                                    </p>
                                    <p
                                        className="text-xs font-semibold text-primary flex items-center gap-1 mt-0.5"
                                    >
                                        <span
                                            className="material-symbols-outlined text-[14px]"
                                            >alarm</span
                                        >
                                        15:00h (Comparecimento Pontual)
                                    </p>
                                </div>
                            </div>
                            {/*  Location Card  */}
                            <div
                                className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-low"
                            >
                                <div
                                    className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center shrink-0 text-primary"
                                >
                                    <span
                                        className="material-symbols-outlined text-[20px]"
                                        >location_on</span
                                    >
                                </div>
                                <div className="min-w-0 flex-1">
                                    <span
                                        className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant"
                                        >Unidade Sol & Mar (Macaé)</span
                                    >
                                    <p
                                        className="text-xs text-on-surface leading-snug"
                                    >
                                        Av. Carlos Augusto T. Garcia, 2040 - Sol
                                        e Mar, Macaé - RJ
                                    </p>
                                </div>
                            </div>
                            {/*  Financial Breakdown  */}
                            <div
                                className="p-3.5 rounded-xl bg-secondary-container/50 flex flex-col gap-1.5"
                            >
                                <div
                                    className="flex justify-between items-center text-xs text-on-secondary-container"
                                >
                                    <span>Preço Regular do Serviço:</span>
                                    <span className="font-medium tabular-nums"
                                        >R$ 83,00</span
                                    >
                                </div>
                                <div
                                    className="flex justify-between items-center text-xs text-on-secondary-container"
                                >
                                    <span className="flex items-center gap-1">
                                        <span
                                            className="material-symbols-outlined text-[13px]"
                                            >loyalty</span
                                        >
                                        Crédito Membro Motta Aplicado:
                                    </span>
                                    <span
                                        className="font-semibold text-primary tabular-nums"
                                        >- R$ 50,70</span
                                    >
                                </div>
                                <div
                                    className="pt-2 mt-0.5 flex justify-between items-baseline bg-surface-container-lowest/60 p-2.5 rounded-lg"
                                >
                                    <span
                                        className="text-xs font-semibold text-on-surface"
                                        >A Pagar no Local (Checkout):</span
                                    >
                                    <span
                                        className="text-base font-bold text-primary tabular-nums"
                                        >R$ 32,30</span
                                    >
                                </div>
                            </div>
                            {/*  Voucher Action Buttons  */}
                            <div className="grid grid-cols-2 gap-2 pt-1">
                                <button
                                    className="h-11 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1.5 text-xs font-semibold text-on-surface"
                                >
                                    <span
                                        className="material-symbols-outlined text-[17px]"
                                        >share</span
                                    >
                                    Compartilhar
                                </button>
                                <button
                                    className="h-11 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1.5 text-xs font-semibold text-on-surface"
                                >
                                    <span
                                        className="material-symbols-outlined text-[17px]"
                                        >directions</span
                                    >
                                    Como Chegar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  Diretrizes e Regras do Atendimento  */}
                <div className="px-4 mb-6">
                    <div
                        className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm flex flex-col gap-3"
                    >
                        <div className="flex items-center gap-2 mb-0.5">
                            <span
                                className="material-symbols-outlined text-primary text-[20px]"
                                >info</span
                            >
                            <h4 className="font-headline text-base text-on-surface">
                                Diretrizes do Seu Atendimento
                            </h4>
                        </div>
                        <div className="flex items-start gap-2.5">
                            <span
                                className="w-5 h-5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5"
                                >1</span
                            >
                            <p
                                className="text-xs text-on-surface-variant leading-relaxed"
                            >
                                <strong className="text-on-surface font-semibold"
                                    >Chegue com 10 min de antecedência:</strong
                                >
                                Desfrute do ambiente, escolha sua bebida no
                                lounge e relaxe antes da cadeira.
                            </p>
                        </div>
                        <div className="flex items-start gap-2.5">
                            <span
                                className="w-5 h-5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5"
                                >2</span
                            >
                            <p
                                className="text-xs text-on-surface-variant leading-relaxed"
                            >
                                <strong className="text-on-surface font-semibold"
                                    >Tolerância de 15 minutos:</strong
                                >
                                Para preservar a agenda dos próximos
                                cavalheiros, atrasos superiores podem exigir
                                readequação de etapas.
                            </p>
                        </div>
                        <div className="flex items-start gap-2.5">
                            <span
                                className="w-5 h-5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5"
                                >3</span
                            >
                            <p
                                className="text-xs text-on-surface-variant leading-relaxed"
                            >
                                <strong className="text-on-surface font-semibold"
                                    >Reagendamento sem multas:</strong
                                >
                                Flexibilidade total pelo app até 2 horas antes
                                do horário marcado.
                            </p>
                        </div>
                    </div>
                </div>
                {/*  Hospitalidade do Lounge Sol & Mar  */}
                <div className="px-4 mb-6">
                    <div className="bg-surface-container-low rounded-2xl p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <span
                                    className="material-symbols-outlined text-tertiary text-[20px]"
                                    >local_bar</span
                                >
                                <h4
                                    className="font-headline text-base text-on-surface"
                                >
                                    Hospitalidade do Lounge Sol & Mar
                                </h4>
                            </div>
                            <span
                                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed"
                                >Incluso</span
                            >
                        </div>
                        <div className="grid grid-cols-2 gap-2.5">
                            <div
                                className="bg-surface-container-lowest p-3 rounded-xl flex items-center gap-2.5"
                            >
                                <span
                                    className="material-symbols-outlined text-primary text-[20px]"
                                    >sports_bar</span
                                >
                                <div className="min-w-0">
                                    <p
                                        className="text-xs font-semibold text-on-surface leading-tight"
                                    >
                                        Chopp Artesanal
                                    </p>
                                    <p
                                        className="text-[10px] text-on-surface-variant"
                                    >
                                        Torneira cortesia
                                    </p>
                                </div>
                            </div>
                            <div
                                className="bg-surface-container-lowest p-3 rounded-xl flex items-center gap-2.5"
                            >
                                <span
                                    className="material-symbols-outlined text-primary text-[20px]"
                                    >coffee</span
                                >
                                <div className="min-w-0">
                                    <p
                                        className="text-xs font-semibold text-on-surface leading-tight"
                                    >
                                        Café Especial
                                    </p>
                                    <p
                                        className="text-[10px] text-on-surface-variant"
                                    >
                                        Grãos selecionados
                                    </p>
                                </div>
                            </div>
                            <div
                                className="bg-surface-container-lowest p-3 rounded-xl flex items-center gap-2.5"
                            >
                                <span
                                    className="material-symbols-outlined text-primary text-[20px]"
                                    >directions_car</span
                                >
                                <div className="min-w-0">
                                    <p
                                        className="text-xs font-semibold text-on-surface leading-tight"
                                    >
                                        Valet Gratuito
                                    </p>
                                    <p
                                        className="text-[10px] text-on-surface-variant"
                                    >
                                        Entrada assistida
                                    </p>
                                </div>
                            </div>
                            <div
                                className="bg-surface-container-lowest p-3 rounded-xl flex items-center gap-2.5"
                            >
                                <span
                                    className="material-symbols-outlined text-primary text-[20px]"
                                    >wifi</span
                                >
                                <div className="min-w-0">
                                    <p
                                        className="text-xs font-semibold text-on-surface leading-tight"
                                    >
                                        Wi-Fi VIP
                                    </p>
                                    <p
                                        className="text-[10px] text-on-surface-variant"
                                    >
                                        Conexão dedicada
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  Canal Direto com o Concierge (WhatsApp)  */}
                <div className="px-4 mb-6">
                    <div
                        className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm flex flex-col gap-3"
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0"
                            >
                                <span
                                    className="material-symbols-outlined text-primary text-[22px]"
                                    >support_agent</span
                                >
                            </div>
                            <div className="min-w-0 flex-1">
                                <h4
                                    className="text-xs font-bold uppercase tracking-wider text-on-surface"
                                >
                                    Concierge Sol & Mar (Macaé)
                                </h4>
                                <p className="text-xs text-on-surface-variant">
                                    Atendimento humanizado direto para
                                    preferências ou dúvidas
                                </p>
                            </div>
                        </div>
                        <a
                            className="h-11 w-full bg-primary hover:bg-primary-container text-on-primary rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                            href="https://wa.me/5522999999999"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <span className="material-symbols-outlined text-[18px]"
                                >chat</span
                            >
                            Falar com Concierge no WhatsApp
                        </a>
                    </div>
                </div>
                {/*  Botões de Saída da Jornada  */}
                <div className="px-4 pb-4 flex flex-col gap-2.5">
                    <button
                        className="h-12 w-full bg-primary hover:bg-primary-container text-on-primary rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
                    >
                        <span className="material-symbols-outlined text-[18px]"
                            >calendar_month</span
                        >
                        Ver Meus Agendamentos
                    </button>
                    <button
                        className="h-11 w-full bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[16px]"
                            >arrow_back</span
                        >
                        Voltar ao Início
                    </button>
                </div>
                {/*  Aviso Ético de Rodapé  */}
                <div className="px-4 py-4 text-center">
                    <p
                        className="text-[10px] text-outline leading-normal max-w-xs mx-auto"
                    >
                        Protótipo demonstrativo • Dados e valores ilustrativos
                        para validação visual da Barbearia Motta Macaé.
                    </p>
                </div>
            </div>
        
          <div className="px-4 py-6 flex flex-col gap-3">
            <button
              onClick={onFinish}
              className="w-full h-12 rounded-xl bg-brand-700 text-on-primary font-semibold text-sm shadow-md hover:bg-brand-800 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">calendar_today</span>
              Ver meus agendamentos
            </button>
            <button
              onClick={onHome}
              className="w-full h-11 rounded-xl bg-surface-container-high text-on-surface font-medium text-xs hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">home</span>
              Voltar ao Início
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
