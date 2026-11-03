import React, { useState } from "react"
import { useStore } from "../../app-state"
import type { Navigate } from "../../types"

export function PlanosScreen({ onNavigate }: { onNavigate: Navigate }) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  return (
    <div className="flex flex-col w-full pb-24">
      {selectedPlan ? (
        <div>
          <div className="px-4 pt-3">
            <button
              onClick={() => setSelectedPlan(null)}
              className="flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-950 transition-colors"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              Voltar ao catálogo
            </button>
          </div>

            <div className="flex flex-col w-full pb-8 space-y-5">
                {/*  Header / Breadcrumb contextual  */}
                <div className="flex flex-col space-y-1">
                    <div className="flex items-center gap-1.5 text-accent-gold">
                        <span className="material-symbols-outlined text-[16px]"
                            >workspace_premium</span
                        >
                        <span
                            className="font-caption text-caption uppercase tracking-wider font-semibold text-brand-700"
                            >Plano Selecionado</span
                        >
                    </div>
                    <div className="flex items-center justify-between">
                        <h1
                            className="font-headline-md-mobile text-headline-md-mobile text-brand-950 font-normal tracking-tight"
                        >
                            Benefícios do Plano
                        </h1>
                        <span
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-caption font-semibold bg-brand-100 text-brand-700"
                            >Membro Ativo</span
                        >
                    </div>
                    <p className="font-body-sm text-body-sm text-neutral-500">
                        Conheça cada serviço, cortesias e descontos exclusivos
                        inclusos na sua assinatura.
                    </p>
                </div>
                {/*  Horizontal Segment Navigation (Scrollable pills)  */}
                <div
                    className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none"
                    id="planNavTabs"
                >
                    <button
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-full font-label-md text-label-md bg-brand-700 text-on-primary shadow-sm shrink-0 transition-transform active:scale-95"
                    >
                        <span className="material-symbols-outlined text-[18px]"
                            >verified</span
                        >
                        <span>Benefícios</span>
                    </button>
                    <button
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-full font-label-md text-label-md bg-surface-container-high text-neutral-700 hover:text-brand-950 shrink-0 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[18px]"
                            >badge</span
                        >
                        <span>Meu plano</span>
                    </button>
                    <button
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-full font-label-md text-label-md bg-surface-container-high text-neutral-700 hover:text-brand-950 shrink-0 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[18px]"
                            >balance</span
                        >
                        <span>Comparar</span>
                    </button>
                    <button
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-full font-label-md text-label-md bg-surface-container-high text-neutral-700 hover:text-brand-950 shrink-0 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[18px]"
                            >help_outline</span
                        >
                        <span>Dúvidas</span>
                    </button>
                </div>
                {/*  Hero Banner: Clube Motta Card with Shaving Brush / Barber Vibe  */}
                <div
                    className="relative overflow-hidden rounded-2xl bg-linear-to-br from-brand-950 via-brand-900 to-brand-800 text-on-primary shadow-md p-4"
                >
                    {/*  Ambient decorative glow  */}
                    <div
                        className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-accent-gold/15 blur-2xl pointer-events-none"
                    ></div>
                    <div
                        className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-brand-600/20 blur-xl pointer-events-none"
                    ></div>
                    <div className="relative z-10 flex flex-col space-y-3.5">
                        <div className="flex items-start justify-between">
                            <div className="space-y-1">
                                <div
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent-gold/20 text-accent-gold font-caption text-caption font-semibold"
                                >
                                    <span
                                        className="w-1.5 h-1.5 rounded-full bg-accent-gold"
                                    ></span>
                                    Plano Selecionado
                                </div>
                                <h2
                                    className="font-headline-lg-mobile text-headline-lg-mobile font-normal tracking-wide text-surface-card"
                                >
                                    Clube Motta
                                </h2>
                                <p
                                    className="font-caption text-caption text-neutral-300"
                                >
                                    Experiência completa de barbearia com
                                    serviços ilimitados e mimos exclusivos.
                                </p>
                            </div>
                            {/*  Thumbnail Image of Vintage Barber Brush / Brass Detail  */}
                            <div
                                className="w-16 h-16 rounded-xl overflow-hidden shadow-sm shrink-0 bg-brand-900/60 ml-2"
                            >
                                <img
                                    className="w-full h-full object-cover"
                                    data-alt="Traditional luxury barber badger shaving brush with polished wood and gold brass handle resting beside vintage grooming razor in dramatic moody warm ambient lighting, deep green and golden reflections."
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3zw2waVHSf-0SGbFEfcq1_Vd5rRLWcvw_Rppl7yK1cKv5zTCJm68lsmZATn465sXc2v0pI_v1v2lOIWondnBSiYD2EFgydea-SSOtNTyRB7gcpxS31b1yd5xxeg5ZnwHhSrsD644QDSToEwpCHkZdxoH7wCDSCjFSimizj4FSU9ojj5TvIhK-DYhOj0mxoDd-sR746NhdZ-PzVJcJ13Zc2Rs0Tj3giiDSxeAim9p7"
                                />
                            </div>
                        </div>
                        {/*  Quick Metrics Grid  */}
                        <div className="grid grid-cols-4 gap-1.5 pt-1">
                            <div
                                className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/5 backdrop-blur-sm text-center"
                            >
                                <span
                                    className="material-symbols-outlined text-[18px] text-accent-gold mb-0.5"
                                    >content_cut</span
                                >
                                <span
                                    className="font-caption text-caption text-[10px] leading-tight text-neutral-300 font-semibold"
                                    >Serviços Grátis</span
                                >
                            </div>
                            <div
                                className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/5 backdrop-blur-sm text-center"
                            >
                                <span
                                    className="material-symbols-outlined text-[18px] text-accent-gold mb-0.5"
                                    >local_offer</span
                                >
                                <span
                                    className="font-caption text-caption text-[10px] leading-tight text-neutral-300 font-semibold"
                                    >Descontos VIP</span
                                >
                            </div>
                            <div
                                className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/5 backdrop-blur-sm text-center"
                            >
                                <span
                                    className="material-symbols-outlined text-[18px] text-accent-gold mb-0.5"
                                    >calendar_month</span
                                >
                                <span
                                    className="font-caption text-caption text-[10px] leading-tight text-neutral-300 font-semibold"
                                    >100 / mês</span
                                >
                            </div>
                            <div
                                className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/5 backdrop-blur-sm text-center"
                            >
                                <span
                                    className="material-symbols-outlined text-[18px] text-accent-gold mb-0.5"
                                    >all_inclusive</span
                                >
                                <span
                                    className="font-caption text-caption text-[10px] leading-tight text-neutral-300 font-semibold"
                                    >Extras -15%</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
                {/*  Snapshot Bento Mini Cards  */}
                <div className="grid grid-cols-2 gap-2.5">
                    <div
                        className="flex items-center gap-3 p-3 rounded-xl bg-surface-card shadow-sm"
                    >
                        <div
                            className="w-9 h-9 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center shrink-0"
                        >
                            <span className="material-symbols-outlined text-[20px]"
                                >featured_seasonal_and_gifts</span
                            >
                        </div>
                        <div className="min-w-0">
                            <div
                                className="font-label-md text-label-md text-brand-950 font-bold truncate"
                            >
                                100 Cortesias
                            </div>
                            <div
                                className="font-caption text-caption text-neutral-500 text-[11px] truncate"
                            >
                                Serviços por mês
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex items-center gap-3 p-3 rounded-xl bg-surface-card shadow-sm"
                    >
                        <div
                            className="w-9 h-9 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center shrink-0"
                        >
                            <span className="material-symbols-outlined text-[20px]"
                                >percent</span
                            >
                        </div>
                        <div className="min-w-0">
                            <div
                                className="font-label-md text-label-md text-brand-950 font-bold truncate"
                            >
                                Até 100% OFF
                            </div>
                            <div
                                className="font-caption text-caption text-neutral-500 text-[11px] truncate"
                            >
                                Nos carros-chefes
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex items-center gap-3 p-3 rounded-xl bg-surface-card shadow-sm"
                    >
                        <div
                            className="w-9 h-9 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center shrink-0"
                        >
                            <span className="material-symbols-outlined text-[20px]"
                                >event_repeat</span
                            >
                        </div>
                        <div className="min-w-0">
                            <div
                                className="font-label-md text-label-md text-brand-950 font-bold truncate"
                            >
                                Franquia Livre
                            </div>
                            <div
                                className="font-caption text-caption text-neutral-500 text-[11px] truncate"
                            >
                                Renova todo dia 1º
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex items-center gap-3 p-3 rounded-xl bg-surface-card shadow-sm"
                    >
                        <div
                            className="w-9 h-9 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center shrink-0"
                        >
                            <span className="material-symbols-outlined text-[20px]"
                                >inventory_2</span
                            >
                        </div>
                        <div className="min-w-0">
                            <div
                                className="font-label-md text-label-md text-brand-950 font-bold truncate"
                            >
                                Produtos -15%
                            </div>
                            <div
                                className="font-caption text-caption text-neutral-500 text-[11px] truncate"
                            >
                                Pomadas e óleos
                            </div>
                        </div>
                    </div>
                </div>
                {/*  Search & Filter Bar  */}
                <div className="flex flex-col space-y-2.5 pt-1">
                    <div className="flex items-center justify-between">
                        <h3
                            className="font-headline-sm-mobile text-headline-sm-mobile text-brand-950"
                        >
                            Serviços do Plano
                        </h3>
                        <span
                            className="font-caption text-caption text-neutral-500"
                            id="serviceCount"
                            >6 disponíveis</span
                        >
                    </div>
                    {/*  Search Input  */}
                    <div className="relative w-full">
                        <span
                            className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-neutral-500"
                        >
                            <span className="material-symbols-outlined text-[20px]"
                                >search</span
                            >
                        </span>
                        <input
                            className="w-full h-11 pl-10 pr-3 rounded-xl bg-surface-card text-on-surface font-body-sm text-body-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-700 placeholder-neutral-500"
                            id="serviceSearch"
                            placeholder="Buscar barba, corte, terapia..."
                            type="text"
                        />
                    </div>
                    {/*  Category Filters  */}
                    <div
                        className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none"
                        id="filterChips"
                    >
                        <button
                            className="filter-chip active-filter px-3 py-1.5 rounded-full font-label-md text-label-md bg-brand-700 text-on-primary shrink-0 transition-all"
                            data-filter="all"
                        >
                            Todos
                        </button>
                        <button
                            className="filter-chip px-3 py-1.5 rounded-full font-label-md text-label-md bg-surface-card text-neutral-700 hover:text-brand-950 shrink-0 transition-all"
                            data-filter="free"
                        >
                            Gratuitos (100%)
                        </button>
                        <button
                            className="filter-chip px-3 py-1.5 rounded-full font-label-md text-label-md bg-surface-card text-neutral-700 hover:text-brand-950 shrink-0 transition-all"
                            data-filter="discount"
                        >
                            Com Desconto
                        </button>
                    </div>
                </div>
                {/*  Services List  */}
                <div className="flex flex-col space-y-2.5" id="servicesList">
                    {/*  Item: Barba  */}
                    <div
                        className="service-item bg-surface-card rounded-2xl p-3.5 shadow-sm flex flex-col space-y-2.5 transition-transform active:scale-[0.99]"
                        data-category="free"
                        data-name="barba aparar modelar"
                    >
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-3 min-w-0">
                                <div
                                    className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center shrink-0"
                                >
                                    <span
                                        className="material-symbols-outlined text-[22px]"
                                        >content_cut</span
                                    >
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h4
                                            className="font-headline-sm-mobile text-headline-sm-mobile text-[16px] text-brand-950 font-semibold truncate"
                                        >
                                            Barba Completa
                                        </h4>
                                        <span
                                            className="px-1.5 py-0.5 rounded-full bg-brand-100 text-brand-700 font-caption text-caption text-[10px] font-bold"
                                            >100% OFF</span
                                        >
                                    </div>
                                    <p
                                        className="font-body-sm text-body-sm text-neutral-500 text-[13px] line-clamp-1"
                                    >
                                        Aparar, alinhar linhas finas e hidratar
                                        a barba.
                                    </p>
                                </div>
                            </div>
                            <div className="text-right shrink-0">
                                <span
                                    className="font-caption text-caption line-through text-neutral-500 block text-[11px]"
                                    >R$ 49,90</span
                                >
                                <span
                                    className="font-label-md text-label-md text-brand-700 font-bold"
                                    >R$ 0,00</span
                                >
                            </div>
                        </div>
                        <div
                            className="flex items-center justify-between pt-1 border-t border-surface-container-high/40 text-neutral-700"
                        >
                            <div
                                className="flex items-center gap-1.5 font-caption text-caption text-[11px] text-neutral-500"
                            >
                                <span
                                    className="material-symbols-outlined text-[15px] text-accent-gold"
                                    >event_available</span
                                >
                                <span>100 serviços por mês</span>
                            </div>
                            <button
                                className="inline-flex items-center gap-1 text-brand-700 font-label-md text-label-md text-[12px] font-semibold hover:underline"
                            >
                                <span>Agendar</span>
                                <span
                                    className="material-symbols-outlined text-[16px]"
                                    >chevron_right</span
                                >
                            </button>
                        </div>
                    </div>
                    {/*  Item: Barba Express  */}
                    <div
                        className="service-item bg-surface-card rounded-2xl p-3.5 shadow-sm flex flex-col space-y-2.5 transition-transform active:scale-[0.99]"
                        data-category="free"
                        data-name="barba express maquina"
                    >
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-3 min-w-0">
                                <div
                                    className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center shrink-0"
                                >
                                    <span
                                        className="material-symbols-outlined text-[22px]"
                                        >brush</span
                                    >
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h4
                                            className="font-headline-sm-mobile text-headline-sm-mobile text-[16px] text-brand-950 font-semibold truncate"
                                        >
                                            Barba Express
                                        </h4>
                                        <span
                                            className="px-1.5 py-0.5 rounded-full bg-brand-100 text-brand-700 font-caption text-caption text-[10px] font-bold"
                                            >100% OFF</span
                                        >
                                    </div>
                                    <p
                                        className="font-body-sm text-body-sm text-neutral-500 text-[13px] line-clamp-1"
                                    >
                                        Barba aparada exclusivamente na máquina
                                        rápida.
                                    </p>
                                </div>
                            </div>
                            <div className="text-right shrink-0">
                                <span
                                    className="font-caption text-caption line-through text-neutral-500 block text-[11px]"
                                    >R$ 35,00</span
                                >
                                <span
                                    className="font-label-md text-label-md text-brand-700 font-bold"
                                    >R$ 0,00</span
                                >
                            </div>
                        </div>
                        <div
                            className="flex items-center justify-between pt-1 text-neutral-700"
                        >
                            <div
                                className="flex items-center gap-1.5 font-caption text-caption text-[11px] text-neutral-500"
                            >
                                <span
                                    className="material-symbols-outlined text-[15px] text-accent-gold"
                                    >event_available</span
                                >
                                <span>100 serviços por mês</span>
                            </div>
                            <button
                                className="inline-flex items-center gap-1 text-brand-700 font-label-md text-label-md text-[12px] font-semibold hover:underline"
                            >
                                <span>Agendar</span>
                                <span
                                    className="material-symbols-outlined text-[16px]"
                                    >chevron_right</span
                                >
                            </button>
                        </div>
                    </div>
                    {/*  Item: Corte  */}
                    <div
                        className="service-item bg-surface-card rounded-2xl p-3.5 shadow-sm flex flex-col space-y-2.5 transition-transform active:scale-[0.99]"
                        data-category="free"
                        data-name="corte de cabelo tesoura navalha degradê"
                    >
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-3 min-w-0">
                                <div
                                    className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center shrink-0"
                                >
                                    <span
                                        className="material-symbols-outlined text-[22px]"
                                        >face</span
                                    >
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h4
                                            className="font-headline-sm-mobile text-headline-sm-mobile text-[16px] text-brand-950 font-semibold truncate"
                                        >
                                            Corte Masculino
                                        </h4>
                                        <span
                                            className="px-1.5 py-0.5 rounded-full bg-brand-100 text-brand-700 font-caption text-caption text-[10px] font-bold"
                                            >100% OFF</span
                                        >
                                    </div>
                                    <p
                                        className="font-body-sm text-body-sm text-neutral-500 text-[13px] line-clamp-1"
                                    >
                                        Corte completo tesoura/máquina com
                                        lavatório.
                                    </p>
                                </div>
                            </div>
                            <div className="text-right shrink-0">
                                <span
                                    className="font-caption text-caption line-through text-neutral-500 block text-[11px]"
                                    >R$ 49,99</span
                                >
                                <span
                                    className="font-label-md text-label-md text-brand-700 font-bold"
                                    >R$ 0,00</span
                                >
                            </div>
                        </div>
                        <div
                            className="flex items-center justify-between pt-1 text-neutral-700"
                        >
                            <div
                                className="flex items-center gap-1.5 font-caption text-caption text-[11px] text-neutral-500"
                            >
                                <span
                                    className="material-symbols-outlined text-[15px] text-accent-gold"
                                    >event_available</span
                                >
                                <span>100 serviços por mês</span>
                            </div>
                            <button
                                className="inline-flex items-center gap-1 text-brand-700 font-label-md text-label-md text-[12px] font-semibold hover:underline"
                            >
                                <span>Agendar</span>
                                <span
                                    className="material-symbols-outlined text-[16px]"
                                    >chevron_right</span
                                >
                            </button>
                        </div>
                    </div>
                    {/*  Item: Pente Único  */}
                    <div
                        className="service-item bg-surface-card rounded-2xl p-3.5 shadow-sm flex flex-col space-y-2.5 transition-transform active:scale-[0.99]"
                        data-category="free"
                        data-name="pente unico rapido"
                    >
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-3 min-w-0">
                                <div
                                    className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center shrink-0"
                                >
                                    <span
                                        className="material-symbols-outlined text-[22px]"
                                        >straighten</span
                                    >
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h4
                                            className="font-headline-sm-mobile text-headline-sm-mobile text-[16px] text-brand-950 font-semibold truncate"
                                        >
                                            Pente Único
                                        </h4>
                                        <span
                                            className="px-1.5 py-0.5 rounded-full bg-brand-100 text-brand-700 font-caption text-caption text-[10px] font-bold"
                                            >100% OFF</span
                                        >
                                    </div>
                                    <p
                                        className="font-body-sm text-body-sm text-neutral-500 text-[13px] line-clamp-1"
                                    >
                                        Raspagem uniforme com uma única lâmina.
                                    </p>
                                </div>
                            </div>
                            <div className="text-right shrink-0">
                                <span
                                    className="font-caption text-caption line-through text-neutral-500 block text-[11px]"
                                    >R$ 40,00</span
                                >
                                <span
                                    className="font-label-md text-label-md text-brand-700 font-bold"
                                    >R$ 0,00</span
                                >
                            </div>
                        </div>
                        <div
                            className="flex items-center justify-between pt-1 text-neutral-700"
                        >
                            <div
                                className="flex items-center gap-1.5 font-caption text-caption text-[11px] text-neutral-500"
                            >
                                <span
                                    className="material-symbols-outlined text-[15px] text-accent-gold"
                                    >event_available</span
                                >
                                <span>100 serviços por mês</span>
                            </div>
                            <button
                                className="inline-flex items-center gap-1 text-brand-700 font-label-md text-label-md text-[12px] font-semibold hover:underline"
                            >
                                <span>Agendar</span>
                                <span
                                    className="material-symbols-outlined text-[16px]"
                                    >chevron_right</span
                                >
                            </button>
                        </div>
                    </div>
                    {/*  Item: Barboterapia (Discount 50%)  */}
                    <div
                        className="service-item bg-surface-card rounded-2xl p-3.5 shadow-sm flex flex-col space-y-2.5 transition-transform active:scale-[0.99]"
                        data-category="discount"
                        data-name="barboterapia spa toalha quente vapor de ozonio"
                    >
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-3 min-w-0">
                                <div
                                    className="w-10 h-10 rounded-xl bg-accent-gold/15 text-accent-gold flex items-center justify-center shrink-0"
                                >
                                    <span
                                        className="material-symbols-outlined text-[22px]"
                                        >spa</span
                                    >
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h4
                                            className="font-headline-sm-mobile text-headline-sm-mobile text-[16px] text-brand-950 font-semibold truncate"
                                        >
                                            Barboterapia Spa
                                        </h4>
                                        <span
                                            className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-caption text-caption text-[10px] font-bold"
                                            >50% OFF</span
                                        >
                                    </div>
                                    <p
                                        className="font-body-sm text-body-sm text-neutral-500 text-[13px] line-clamp-1"
                                    >
                                        Toalha quente, vapor de ozônio e óleos
                                        finos.
                                    </p>
                                </div>
                            </div>
                            <div className="text-right shrink-0">
                                <span
                                    className="font-caption text-caption line-through text-neutral-500 block text-[11px]"
                                    >R$ 65,00</span
                                >
                                <span
                                    className="font-label-md text-label-md text-brand-950 font-bold"
                                    >R$ 32,50</span
                                >
                            </div>
                        </div>
                        <div
                            className="flex items-center justify-between pt-1 text-neutral-700"
                        >
                            <div
                                className="flex items-center gap-1.5 font-caption text-caption text-[11px] text-neutral-500"
                            >
                                <span
                                    className="material-symbols-outlined text-[15px] text-accent-gold"
                                    >event_available</span
                                >
                                <span>100 serviços por mês</span>
                            </div>
                            <button
                                className="inline-flex items-center gap-1 text-brand-700 font-label-md text-label-md text-[12px] font-semibold hover:underline"
                            >
                                <span>Agendar</span>
                                <span
                                    className="material-symbols-outlined text-[16px]"
                                    >chevron_right</span
                                >
                            </button>
                        </div>
                    </div>
                    {/*  Item: Pezinho / Acabamento  */}
                    <div
                        className="service-item bg-surface-card rounded-2xl p-3.5 shadow-sm flex flex-col space-y-2.5 transition-transform active:scale-[0.99]"
                        data-category="free"
                        data-name="pezinho acabamento contorno nuca"
                    >
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-3 min-w-0">
                                <div
                                    className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center shrink-0"
                                >
                                    <span
                                        className="material-symbols-outlined text-[22px]"
                                        >crop_free</span
                                    >
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h4
                                            className="font-headline-sm-mobile text-headline-sm-mobile text-[16px] text-brand-950 font-semibold truncate"
                                        >
                                            Pezinho / Acabamento
                                        </h4>
                                        <span
                                            className="px-1.5 py-0.5 rounded-full bg-brand-100 text-brand-700 font-caption text-caption text-[10px] font-bold"
                                            >100% OFF</span
                                        >
                                    </div>
                                    <p
                                        className="font-body-sm text-body-sm text-neutral-500 text-[13px] line-clamp-1"
                                    >
                                        Alinhamento da nuca e costeletas na
                                        navalha.
                                    </p>
                                </div>
                            </div>
                            <div className="text-right shrink-0">
                                <span
                                    className="font-caption text-caption line-through text-neutral-500 block text-[11px]"
                                    >R$ 20,00</span
                                >
                                <span
                                    className="font-label-md text-label-md text-brand-700 font-bold"
                                    >R$ 0,00</span
                                >
                            </div>
                        </div>
                        <div
                            className="flex items-center justify-between pt-1 text-neutral-700"
                        >
                            <div
                                className="flex items-center gap-1.5 font-caption text-caption text-[11px] text-neutral-500"
                            >
                                <span
                                    className="material-symbols-outlined text-[15px] text-accent-gold"
                                    >event_available</span
                                >
                                <span>100 serviços por mês</span>
                            </div>
                            <button
                                className="inline-flex items-center gap-1 text-brand-700 font-label-md text-label-md text-[12px] font-semibold hover:underline"
                            >
                                <span>Agendar</span>
                                <span
                                    className="material-symbols-outlined text-[16px]"
                                    >chevron_right</span
                                >
                            </button>
                        </div>
                    </div>
                </div>
                {/*  Empty state fallback for search  */}
                <div
                    className="hidden items-center justify-center p-6 text-center bg-surface-card rounded-2xl shadow-sm"
                    id="noResultsState"
                >
                    <div
                        className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-neutral-500 mb-2"
                    >
                        <span className="material-symbols-outlined text-[24px]"
                            >search_off</span
                        >
                    </div>
                    <p
                        className="font-label-md text-label-md text-brand-950 font-semibold"
                    >
                        Nenhum serviço localizado
                    </p>
                    <p
                        className="font-body-sm text-body-sm text-neutral-500 text-[13px]"
                    >
                        Tente buscar por corte, barba ou consulte nossos
                        parceiros.
                    </p>
                </div>
                {/*  Collapsible Services / Products Extra Discounts Card  */}
                <div
                    className="bg-surface-card rounded-2xl p-4 shadow-sm space-y-3"
                >
                    <div
                        className="flex items-center justify-between cursor-pointer"
                        id="toggleExtraServices"
                    >
                        <div className="flex items-center gap-2.5">
                            <div
                                className="w-8 h-8 rounded-lg bg-surface-container text-neutral-700 flex items-center justify-center"
                            >
                                <span
                                    className="material-symbols-outlined text-[18px]"
                                    >shopping_bag</span
                                >
                            </div>
                            <div>
                                <h4
                                    className="font-label-md text-label-md text-brand-950 font-bold"
                                >
                                    Produtos & Mimos Adicionais
                                </h4>
                                <p
                                    className="font-caption text-caption text-neutral-500 text-[11px]"
                                >
                                    Descontos no balcão e linhas parceiras
                                </p>
                            </div>
                        </div>
                        <span
                            className="material-symbols-outlined text-neutral-500 text-[20px] transition-transform duration-200"
                            id="extraServicesIcon"
                            >expand_more</span
                        >
                    </div>
                    {/*  Collapsible content  */}
                    <div className="space-y-2 pt-1" id="extraServicesContent">
                        <div
                            className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low"
                        >
                            <div className="flex items-center gap-2">
                                <span
                                    className="material-symbols-outlined text-brand-700 text-[18px]"
                                    >verified</span
                                >
                                <span
                                    className="font-body-sm text-body-sm text-[13px] text-brand-950 font-medium"
                                    >Serviços Estéticos Extras</span
                                >
                            </div>
                            <span
                                className="font-label-md text-label-md text-brand-700 font-bold text-[12px]"
                                >15% OFF</span
                            >
                        </div>
                        <div
                            className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low"
                        >
                            <div className="flex items-center gap-2">
                                <span
                                    className="material-symbols-outlined text-accent-gold text-[18px]"
                                    >star</span
                                >
                                <span
                                    className="font-body-sm text-body-sm text-[13px] text-brand-950 font-medium"
                                    >Produtos Don Alcides</span
                                >
                            </div>
                            <span
                                className="font-label-md text-label-md text-brand-700 font-bold text-[12px]"
                                >5% OFF</span
                            >
                        </div>
                        <div
                            className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low"
                        >
                            <div className="flex items-center gap-2">
                                <span
                                    className="material-symbols-outlined text-accent-gold text-[18px]"
                                    >star</span
                                >
                                <span
                                    className="font-body-sm text-body-sm text-[13px] text-brand-950 font-medium"
                                    >Linha Red Nek</span
                                >
                            </div>
                            <span
                                className="font-label-md text-label-md text-brand-700 font-bold text-[12px]"
                                >5% OFF</span
                            >
                        </div>
                        <div
                            className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low"
                        >
                            <div className="flex items-center gap-2">
                                <span
                                    className="material-symbols-outlined text-accent-gold text-[18px]"
                                    >star</span
                                >
                                <span
                                    className="font-body-sm text-body-sm text-[13px] text-brand-950 font-medium"
                                    >Linha B.Urb Barber</span
                                >
                            </div>
                            <span
                                className="font-label-md text-label-md text-brand-700 font-bold text-[12px]"
                                >5% OFF</span
                            >
                        </div>
                    </div>
                </div>
                {/*  Plano Summary / Checklist Card  */}
                <div
                    className="bg-surface-card rounded-2xl p-4 shadow-sm space-y-3"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span
                                className="material-symbols-outlined text-brand-700 text-[20px]"
                                >workspace_premium</span
                            >
                            <h4
                                className="font-label-md text-label-md text-brand-950 font-bold"
                            >
                                Vantagens Inclusas
                            </h4>
                        </div>
                        <span
                            className="px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 font-caption text-caption text-[11px] font-semibold"
                            >Tudo ativo</span
                        >
                    </div>
                    <ul
                        className="space-y-2 pt-1 font-body-sm text-body-sm text-[13px] text-neutral-700"
                    >
                        <li className="flex items-center gap-2.5">
                            <span
                                className="material-symbols-outlined text-brand-700 text-[18px] shrink-0"
                                >check_circle</span
                            >
                            <span>100 serviços gratuitos por mês</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                            <span
                                className="material-symbols-outlined text-brand-700 text-[18px] shrink-0"
                                >check_circle</span
                            >
                            <span>Descontos de até 100% em procedimentos</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                            <span
                                className="material-symbols-outlined text-brand-700 text-[18px] shrink-0"
                                >check_circle</span
                            >
                            <span>Serviços adicionais com até 15% OFF</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                            <span
                                className="material-symbols-outlined text-brand-700 text-[18px] shrink-0"
                                >check_circle</span
                            >
                            <span>Prioridade na fila e horários premium</span>
                        </li>
                    </ul>
                </div>
                {/*  Barber Ambient Showcase Photo Card  */}
                <div
                    className="relative overflow-hidden rounded-2xl shadow-sm bg-brand-950 h-32"
                >
                    <img
                        className="w-full h-full object-cover opacity-60"
                        data-alt="Sophisticated modern barber shop with emerald green leather reclining chairs, brass golden mirrors, warm amber lighting and vintage wooden shelves, client hospitality area."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvBNF-0xXfrOM9BR89YxVzpunIy10sDF_Rug_V6IprlaiGzjjClaWJq-KRwieIB9njIU6QfAN5RQPrED0tm2bZEFM-jOvVc7PIPjU58KtwbhgcEeEhzFfQz-jGEhEmFvbsp8lZ1sXg3Nfq5OXs8AdUiLfPWjMz2S25u2EWIw3Vis6eJqX9bGM81i6k2_02dHnO0DvhI8Sypxj4YWDm0BIWXT9XYvk9-q2AAZBRoFbR"
                    />
                    <div
                        className="absolute inset-0 bg-linear-to-t from-brand-950/90 via-brand-950/40 to-transparent flex items-end p-4"
                    >
                        <div className="flex items-center justify-between w-full">
                            <div>
                                <span
                                    className="font-caption text-caption text-accent-gold uppercase font-bold tracking-widest text-[9px] block"
                                    >Ambiente Exclusivo</span
                                >
                                <span
                                    className="font-label-md text-label-md text-surface-card"
                                    >Cerveja artesanal e café cortesia</span
                                >
                            </div>
                            <span
                                className="material-symbols-outlined text-accent-gold text-[20px]"
                                >local_bar</span
                            >
                        </div>
                    </div>
                </div>
                {/*  Primary Sticky Action Anchor  */}
                <div className="pt-2">
                    <button
                        className="w-full h-12 rounded-xl bg-brand-700 hover:bg-brand-800 text-on-primary font-label-md text-label-md flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
                        id="ctaSubscribe"
                    >
                        <span
                            className="material-symbols-outlined text-[20px] text-accent-gold"
                            >workspace_premium</span
                        >
                        <span>Contratar este plano</span>
                    </button>
                    <p
                        className="font-caption text-caption text-neutral-500 text-center mt-2 text-[11px]"
                    >
                        Sem fidelidade forçada. Cancele a qualquer momento no
                        app.
                    </p>
                </div>
            </div>
            
        
        </div>
      ) : (
        <div>

            <div className="flex flex-col w-full gap-space-lg">
                {/*  Header Text Section  */}
                <section className="flex flex-col gap-space-xs pt-space-xs">
                    <div
                        className="flex items-center gap-space-xs text-neutral-500 font-label-md text-label-md uppercase tracking-wider"
                    >
                        <span className="">Planos e Assinaturas — Escolha o seu plano</span>
                        <span
                            className="w-1.5 h-1.5 rounded-full bg-accent-gold"
                        ></span>
                        <span className="text-brand-700">Motta Club</span>
                    </div>
                    <div className="flex items-center justify-between gap-space-sm">
                        <h1
                            className="font-headline-md-mobile text-headline-md-mobile text-brand-950 flex items-center gap-1.5"
                        >
                            Escolha o seu plano ideal!
                            <span className="text-accent-gold inline-block"
                                >✂️</span
                            >
                        </h1>
                        <button
                            aria-label="Comparar planos de assinatura"
                            className="flex items-center gap-1 text-brand-700 hover:text-brand-800 transition-colors py-1.5 px-2.5 rounded-lg bg-surface-container-low shrink-0 active:scale-95"
                            type="button"
                        >
                            <span className="material-symbols-outlined text-[18px]"
                                >balance</span
                            >
                            <span
                                className="font-label-md text-label-md hidden sm:inline"
                                >Comparar</span
                            >
                        </button>
                    </div>
                    <p className="font-body-sm text-body-sm text-neutral-700">
                        Faça parte do Clube Motta e tenha mais praticidade,
                        economia e benefícios exclusivos para cuidar do seu
                        estilo o mês todo.
                    </p>
                </section>
                {/*  Advantage Pill Carousel  */}
                <section
                    className="w-full -mx-gutter-mobile px-gutter-mobile overflow-x-auto no-scrollbar py-1"
                >
                    <div className="flex items-center gap-space-sm min-w-max">
                        {/*  Item 1  */}
                        <div
                            className="flex items-center gap-2.5 bg-surface-card rounded-xl px-3.5 py-2.5 shadow-sm"
                        >
                            <div
                                className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-brand-700 shrink-0"
                            >
                                <span
                                    className="material-symbols-outlined text-[19px]"
                                    >sell</span
                                >
                            </div>
                            <div className="flex flex-col">
                                <span
                                    className="font-label-md text-label-md text-neutral-950 leading-tight"
                                    >Economia real</span
                                >
                                <span
                                    className="font-caption text-caption text-neutral-500"
                                    >Até 100% OFF em serviços</span
                                >
                            </div>
                        </div>
                        {/*  Item 2  */}
                        <div
                            className="flex items-center gap-2.5 bg-surface-card rounded-xl px-3.5 py-2.5 shadow-sm"
                        >
                            <div
                                className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-brand-700 shrink-0"
                            >
                                <span
                                    className="material-symbols-outlined text-[19px]"
                                    >featured_seasonal_and_gifts</span
                                >
                            </div>
                            <div className="flex flex-col">
                                <span
                                    className="font-label-md text-label-md text-neutral-950 leading-tight"
                                    >Benefícios exclusivos</span
                                >
                                <span
                                    className="font-caption text-caption text-neutral-500"
                                    >Vantagens só do clube</span
                                >
                            </div>
                        </div>
                        {/*  Item 3  */}
                        <div
                            className="flex items-center gap-2.5 bg-surface-card rounded-xl px-3.5 py-2.5 shadow-sm"
                        >
                            <div
                                className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-brand-700 shrink-0"
                            >
                                <span
                                    className="material-symbols-outlined text-[19px]"
                                    >event_available</span
                                >
                            </div>
                            <div className="flex flex-col">
                                <span
                                    className="font-label-md text-label-md text-neutral-950 leading-tight"
                                    >Mais praticidade</span
                                >
                                <span
                                    className="font-caption text-caption text-neutral-500"
                                    >Agendamentos rápidos</span
                                >
                            </div>
                        </div>
                        {/*  Item 4  */}
                        <div
                            className="flex items-center gap-2.5 bg-surface-card rounded-xl px-3.5 py-2.5 shadow-sm"
                        >
                            <div
                                className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-accent-gold shrink-0"
                            >
                                <span
                                    className="material-symbols-outlined text-[19px]"
                                    >shield_person</span
                                >
                            </div>
                            <div className="flex flex-col">
                                <span
                                    className="font-label-md text-label-md text-neutral-950 leading-tight"
                                    >Cuidado contínuo</span
                                >
                                <span
                                    className="font-caption text-caption text-neutral-500"
                                    >Seu visual sempre impecável</span
                                >
                            </div>
                        </div>
                    </div>
                </section>
                {/*  Section 1: Linha Gold  */}
                <section className="flex flex-col gap-space-md">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-space-xs">
                            <span
                                className="material-symbols-outlined text-accent-gold text-[22px]"
                                style={{"fontVariationSettings": "\"FILL\" 1"}}
                                >stars</span
                            >
                            <h2
                                className="font-headline-sm-mobile text-headline-sm-mobile text-brand-950 font-semibold"
                            >
                                Planos Clube Gold
                            </h2>
                        </div>
                        <span className="font-caption text-caption text-neutral-500"
                            >3 opções</span
                        >
                    </div>
                    {/*  Card 1: Clube Gold 3 (Featured Hero Dark Emerald Card)  */}
                    <article
                        className="relative overflow-hidden rounded-xl bg-linear-to-br from-brand-900 via-brand-950 to-neutral-950 text-surface p-space-md shadow-xl gap-space-md"
                    >
                        {/*  Ambient Image Decorative Overlay  */}
                        <div
                            className="absolute -right-8 -top-8 w-44 h-44 rounded-full opacity-20 pointer-events-none bg-cover bg-center"
                            data-alt="High quality vintage shaving badger brush with golden metallic collar on dark emerald wood background in soft directional studio illumination"
                            style={{"backgroundImage": "url(\"https://lh3.googleusercontent.com/aida-public/AB6AXuAcMo2mk8IOzZMuNTCXmACv9hn_fHGNV8L1Sci53fWD4wDEd5C26TGlzZrDVLORwE5cItBktfjZ-Ub0LWwuGf3EXyfNg6VScUKYa08frkXVh3DkeygYQSsHVlBR9GAyhkfYF3c1PpI0KuputROcUDdCR-yIm_QnkoBlBeCxEiEesSvD6UcUL4_oey7fxpNPTG4WzXOpL-vJNQBwrxSLu79pit2qRvjx_Id9o7MsnY07\")"}}
                        ></div>
                        {/*  Top Row with Pill Badge & Title  */}
                        <div className="flex flex-col gap-space-xs relative z-10">
                            <div className="flex items-center justify-between">
                                <span
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent-gold text-brand-950 font-label-md text-label-md font-bold shadow-sm"
                                >
                                    <span
                                        className="material-symbols-outlined text-[15px]"
                                        style={{"fontVariationSettings": "\"FILL\" 1"}}
                                        >local_fire_department</span
                                    >
                                    Mais vendido
                                </span>
                                <div
                                    className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-accent-gold"
                                >
                                    <span
                                        className="material-symbols-outlined text-[17px]"
                                        >crown</span
                                    >
                                </div>
                            </div>
                            <div className="flex flex-col mt-1">
                                <h3
                                    className="font-headline-md-mobile text-headline-md-mobile text-white tracking-tight"
                                >
                                    Clube Gold 3
                                </h3>
                                <span
                                    className="font-label-md text-label-md text-accent-gold font-medium"
                                    >Corte & Barba ilimitado</span
                                >
                            </div>
                            <p
                                className="font-body-sm text-body-sm text-neutral-300"
                            >
                                O plano mais completo do Clube Gold. Corte e
                                barba ilimitados com a melhor economia para sua
                                rotina.
                            </p>
                        </div>
                        {/*  Price Block & Vigência  */}
                        <div
                            className="flex items-end justify-between bg-black/30 backdrop-blur-md rounded-xl p-3.5 relative z-10"
                        >
                            <div className="flex flex-col">
                                <div className="flex items-baseline gap-1">
                                    <span
                                        className="font-body-sm text-body-sm text-neutral-300"
                                        >R$</span
                                    >
                                    <span
                                        className="font-display-mobile text-display-mobile font-semibold text-white leading-none"
                                        >229,99</span
                                    >
                                </div>
                                <span
                                    className="font-caption text-caption text-neutral-400 mt-1"
                                    >por mês via recorrência</span
                                >
                            </div>
                            <div
                                className="flex items-center gap-1.5 text-neutral-300 bg-white/10 px-2.5 py-1 rounded-lg"
                            >
                                <span
                                    className="material-symbols-outlined text-[16px] text-accent-gold"
                                    >event_repeat</span
                                >
                                <div className="flex flex-col">
                                    <span
                                        className="font-caption text-caption text-[10px] uppercase text-neutral-400 leading-none"
                                        >Vigência</span
                                    >
                                    <span
                                        className="font-label-md text-label-md leading-tight text-white"
                                        >Indeterminada</span
                                    >
                                </div>
                            </div>
                        </div>
                        {/*  Service Highlights Pills  */}
                        <div className="grid grid-cols-3 gap-2 relative z-10">
                            <div
                                className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/10 backdrop-blur-sm text-center"
                            >
                                <span
                                    className="material-symbols-outlined text-[20px] text-accent-gold"
                                    >content_cut</span
                                >
                                <span
                                    className="font-caption text-caption font-medium text-neutral-100 mt-1"
                                    >Corte ilimitado</span
                                >
                            </div>
                            <div
                                className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/10 backdrop-blur-sm text-center"
                            >
                                <span
                                    className="material-symbols-outlined text-[20px] text-accent-gold"
                                    >face_retouching_natural</span
                                >
                                <span
                                    className="font-caption text-caption font-medium text-neutral-100 mt-1"
                                    >Barba ilimitada</span
                                >
                            </div>
                            <div
                                className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/10 backdrop-blur-sm text-center"
                            >
                                <span
                                    className="material-symbols-outlined text-[20px] text-primary-fixed"
                                    >bolt</span
                                >
                                <span
                                    className="font-caption text-caption font-medium text-neutral-100 mt-1"
                                    >Taxa de ativação R$ 7,00 (1º mês)</span
                                >
                            </div>
                        </div>
                        {/*  Action Buttons  */}
                        <div className="flex items-center gap-2 pt-1 relative z-10">
                            <button
                                className="flex-1 py-3 px-3 rounded-lg bg-white/10 hover:bg-white/15 active:scale-95 text-white font-label-md text-label-md flex items-center justify-center gap-1 transition-all"
                                type="button"
                            >
                                <span className="">Vantagens</span>
                                <span
                                    className="material-symbols-outlined text-[17px]"
                                    >arrow_forward</span
                                >
                            </button>
                            <button
                                className="flex-[1.4] py-3 px-3 rounded-lg bg-brand-700 hover:bg-brand-600 active:scale-95 text-white font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-brand-950/30 transition-all"
                                type="button"
                            >
                                <span
                                    className="material-symbols-outlined text-[18px]"
                                    >shopping_bag</span
                                >
                                <span className="">Assinar Agora</span>
                            </button>
                        </div>
                    </article>
                    {/*  Card 2: Clube Gold 2 (Barba Ilimitada)  */}
                    <article
                        className="rounded-xl bg-surface-card text-on-surface p-space-md shadow-md flex flex-col gap-space-md"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex flex-col">
                                <div
                                    className="flex items-center gap-1.5 text-accent-gold"
                                >
                                    <span
                                        className="material-symbols-outlined text-[18px]"
                                        >crown</span
                                    >
                                    <span
                                        className="font-label-md text-label-md text-neutral-500 uppercase tracking-wider"
                                        >Clube Gold</span
                                    >
                                </div>
                                <h3
                                    className="font-headline-sm-mobile text-headline-sm-mobile text-neutral-950 font-bold mt-0.5"
                                >
                                    Clube Gold 2
                                </h3>
                                <span
                                    className="font-label-md text-label-md text-brand-700"
                                    >Barba ilimitado</span
                                >
                            </div>
                            <div
                                className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-neutral-700"
                            >
                                <span
                                    className="material-symbols-outlined text-[20px]"
                                    >face_retouching_natural</span
                                >
                            </div>
                        </div>
                        <p
                            className="font-body-sm text-body-sm text-neutral-700 -mt-2"
                        >
                            Ideal para quem busca praticidade e quer manter a
                            barba sempre alinhada e impecável.
                        </p>
                        <div
                            className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low"
                        >
                            <div className="flex flex-col">
                                <div className="flex items-baseline gap-1">
                                    <span
                                        className="font-body-sm text-body-sm text-neutral-500"
                                        >R$</span
                                    >
                                    <span
                                        className="font-headline-md-mobile text-headline-md-mobile font-semibold text-brand-900 leading-none"
                                        >129,99</span
                                    >
                                </div>
                                <span
                                    className="font-caption text-caption text-neutral-500"
                                    >por mês</span
                                >
                            </div>
                            <div
                                className="flex items-center gap-1 text-neutral-700 text-caption font-caption"
                            >
                                <span
                                    className="material-symbols-outlined text-[16px] text-neutral-500"
                                    >event_repeat</span
                                >
                                <span className="">Vigência Indeterminada</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div
                                className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-surface-container-low text-neutral-700"
                            >
                                <span
                                    className="material-symbols-outlined text-[17px] text-brand-700"
                                    >check_circle</span
                                >
                                <span
                                    className="font-caption text-caption font-medium"
                                    >Barba ilimitada</span
                                >
                            </div>
                            <div
                                className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-surface-container-low text-neutral-700"
                            >
                                <span
                                    className="material-symbols-outlined text-[17px] text-brand-700"
                                    >bolt</span
                                >
                                <span
                                    className="font-caption text-caption font-medium"
                                    >Taxa de ativação R$ 7,00 (1º mês)</span
                                >
                            </div>
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                            <button
                                className="flex-1 py-3 px-3 rounded-lg bg-surface-container-low hover:bg-surface-container active:scale-95 text-neutral-950 font-label-md text-label-md flex items-center justify-center gap-1 transition-all"
                                type="button"
                            >
                                <span className="">Vantagens</span>
                                <span
                                    className="material-symbols-outlined text-[17px]"
                                    >arrow_forward</span
                                >
                            </button>
                            <button
                                className="flex-1 py-3 px-3 rounded-lg bg-brand-700 hover:bg-brand-800 active:scale-95 text-white font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 transition-all"
                                type="button"
                            >
                                <span
                                    className="material-symbols-outlined text-[18px]"
                                    >shopping_bag</span
                                >
                                <span className="">Comprar</span>
                            </button>
                        </div>
                    </article>
                    {/*  Card 3: Clube Gold 1 (Corte Ilimitado)  */}
                    <article
                        className="rounded-xl bg-surface-card text-on-surface p-space-md shadow-md flex flex-col gap-space-md"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex flex-col">
                                <div
                                    className="flex items-center gap-1.5 text-accent-gold"
                                >
                                    <span
                                        className="material-symbols-outlined text-[18px]"
                                        >crown</span
                                    >
                                    <span
                                        className="font-label-md text-label-md text-neutral-500 uppercase tracking-wider"
                                        >Clube Gold</span
                                    >
                                </div>
                                <h3
                                    className="font-headline-sm-mobile text-headline-sm-mobile text-neutral-950 font-bold mt-0.5"
                                >
                                    Clube Gold 1
                                </h3>
                                <span
                                    className="font-label-md text-label-md text-brand-700"
                                    >Corte ilimitado</span
                                >
                            </div>
                            <div
                                className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-neutral-700"
                            >
                                <span
                                    className="material-symbols-outlined text-[20px]"
                                    >content_cut</span
                                >
                            </div>
                        </div>
                        <p
                            className="font-body-sm text-body-sm text-neutral-700 -mt-2"
                        >
                            Cortes ilimitados para manter seu corte em dia e o
                            degradê fresco todas as semanas.
                        </p>
                        <div
                            className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low"
                        >
                            <div className="flex flex-col">
                                <div className="flex items-baseline gap-1">
                                    <span
                                        className="font-body-sm text-body-sm text-neutral-500"
                                        >R$</span
                                    >
                                    <span
                                        className="font-headline-md-mobile text-headline-md-mobile font-semibold text-brand-900 leading-none"
                                        >125,99</span
                                    >
                                </div>
                                <span
                                    className="font-caption text-caption text-neutral-500"
                                    >por mês</span
                                >
                            </div>
                            <div
                                className="flex items-center gap-1 text-neutral-700 text-caption font-caption"
                            >
                                <span
                                    className="material-symbols-outlined text-[16px] text-neutral-500"
                                    >event_repeat</span
                                >
                                <span className="">Vigência Indeterminada</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div
                                className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-surface-container-low text-neutral-700"
                            >
                                <span
                                    className="material-symbols-outlined text-[17px] text-brand-700"
                                    >check_circle</span
                                >
                                <span
                                    className="font-caption text-caption font-medium"
                                    >Corte ilimitado</span
                                >
                            </div>
                            <div
                                className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-surface-container-low text-neutral-700"
                            >
                                <span
                                    className="material-symbols-outlined text-[17px] text-brand-700"
                                    >bolt</span
                                >
                                <span
                                    className="font-caption text-caption font-medium"
                                    >Taxa de ativação R$ 7,00 (1º mês)</span
                                >
                            </div>
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                            <button
                                className="flex-1 py-3 px-3 rounded-lg bg-surface-container-low hover:bg-surface-container active:scale-95 text-neutral-950 font-label-md text-label-md flex items-center justify-center gap-1 transition-all"
                                type="button"
                            >
                                <span className="">Vantagens</span>
                                <span
                                    className="material-symbols-outlined text-[17px]"
                                    >arrow_forward</span
                                >
                            </button>
                            <button
                                className="flex-1 py-3 px-3 rounded-lg bg-brand-700 hover:bg-brand-800 active:scale-95 text-white font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 transition-all"
                                type="button"
                            >
                                <span
                                    className="material-symbols-outlined text-[18px]"
                                    >shopping_bag</span
                                >
                                <span className="">Comprar</span>
                            </button>
                        </div>
                    </article>
                </section>
                {/*  Section 2: Linha Black (Luxury Matte Black & Leather Style)  */}
                <section className="flex flex-col gap-space-md pt-space-xs">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-space-xs">
                            <div
                                className="w-3.5 h-3.5 rounded-full bg-accent-black shadow-inner"
                            ></div>
                            <h2
                                className="font-headline-sm-mobile text-headline-sm-mobile text-neutral-950 font-bold"
                            >
                                Experiência Clube Black
                            </h2>
                        </div>
                        <span
                            className="px-2 py-0.5 rounded-full bg-error-container text-semantic-danger font-label-md text-[11px] font-bold"
                        >
                            Vagas Limitadas
                        </span>
                    </div>
                    {/*  Black Card 1: Corte Ilimitado (R$ 159,99)  */}
                    <article
                        className="relative overflow-hidden rounded-xl bg-accent-black text-white p-space-md shadow-xl gap-space-md"
                    >
                        {/*  Ambient Image Background  */}
                        <div
                            className="absolute right-0 bottom-0 w-36 h-36 opacity-15 pointer-events-none bg-cover bg-center rounded-tl-full"
                            data-alt="Dark artisan black leather texture with antique metallic barber shears in sharp contrast lighting"
                            style={{"backgroundImage": "url(\"https://lh3.googleusercontent.com/aida-public/AB6AXuAUYDE7R1wx_lTmlsxen2eCi8vsL8wlCR1Jmyy1BV0nDD-tOcbFpRdF3BtUvSQwyGXpuaybRY5JAgY-ZC7kkK2ifeBSMJrD2Rwt0JE_4OJoT4WgP3Ho-BbfUtYUwSOmR9W3PJEEP7gddYd6W9pneVTnrN7Zek3dR1bVUXKHZzyY-0YIeM_BhvIEeRLbCJQSS5hfC24GktW-dyf80pb6NZZraLWRwKR8f8HqP_jbznUq\")"}}
                        ></div>
                        <div className="flex flex-col gap-space-xs relative z-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <span
                                        className="w-2.5 h-2.5 rounded-full bg-accent-gold"
                                    ></span>
                                    <span
                                        className="font-label-md text-label-md text-accent-gold uppercase tracking-wider font-semibold"
                                        >Clube Black</span
                                    >
                                </div>
                                <span
                                    className="px-2 py-0.5 rounded-md bg-white/10 text-neutral-300 font-caption text-caption flex items-center gap-1"
                                >
                                    <span
                                        className="material-symbols-outlined text-[14px]"
                                        >lock</span
                                    >
                                    Exclusivo
                                </span>
                            </div>
                            <h3
                                className="font-headline-md-mobile text-headline-md-mobile text-white tracking-tight"
                            >
                                Corte Ilimitado Black
                            </h3>
                            <p
                                className="font-body-sm text-body-sm text-neutral-400"
                            >
                                Alta performance para quem prioriza o corte
                                sempre em dia, com atendimento prioritário e
                                lavagem especial.
                            </p>
                        </div>
                        {/*  Price & Badge Status  */}
                        <div
                            className="flex items-center justify-between p-3 rounded-lg bg-white/5 backdrop-blur-sm relative z-10"
                        >
                            <div className="flex flex-col">
                                <div className="flex items-baseline gap-1">
                                    <span
                                        className="font-body-sm text-body-sm text-neutral-400"
                                        >R$</span
                                    >
                                    <span
                                        className="font-display-mobile text-display-mobile font-semibold text-white leading-none"
                                        >159,99</span
                                    >
                                </div>
                                <span
                                    className="font-caption text-caption text-neutral-400 mt-1"
                                    >por mês</span
                                >
                            </div>
                            <div
                                className="flex items-center gap-1 text-semantic-danger bg-semantic-danger/10 px-2.5 py-1.5 rounded-lg"
                            >
                                <span
                                    className="material-symbols-outlined text-[16px]"
                                    >hourglass_empty</span
                                >
                                <span
                                    className="font-caption text-caption font-bold"
                                    >Resta 4 vaga(s)</span
                                >
                            </div>
                        </div>
                        {/*  Features Pill  */}
                        <div className="grid grid-cols-2 gap-2 relative z-10">
                            <div
                                className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white/5 text-neutral-200"
                            >
                                <span
                                    className="material-symbols-outlined text-[17px] text-accent-gold"
                                    >content_cut</span
                                >
                                <span className="font-caption text-caption"
                                    >Corte ilimitado</span
                                >
                            </div>
                            <div
                                className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white/5 text-neutral-200"
                            >
                                <span
                                    className="material-symbols-outlined text-[17px] text-accent-gold"
                                    >bolt</span
                                >
                                <span className="font-caption text-caption"
                                    >Taxa de ativação R$ 7,00 (1º mês)</span
                                >
                            </div>
                        </div>
                        {/*  Action Buttons  */}
                        <div className="flex items-center gap-2 pt-1 relative z-10">
                            <button
                                className="flex-1 py-3 px-3 rounded-lg bg-white/10 hover:bg-white/15 active:scale-95 text-white font-label-md text-label-md flex items-center justify-center gap-1 transition-all"
                                type="button"
                            >
                                <span className="">Vantagens</span>
                                <span
                                    className="material-symbols-outlined text-[17px]"
                                    >arrow_forward</span
                                >
                            </button>
                            <button
                                className="flex-[1.3] py-3 px-3 rounded-lg bg-brand-700 hover:bg-brand-600 active:scale-95 text-white font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 shadow-md transition-all"
                                type="button"
                            >
                                <span
                                    className="material-symbols-outlined text-[18px]"
                                    >shopping_bag</span
                                >
                                <span className="">Garantir Vaga</span>
                            </button>
                        </div>
                    </article>
                    <article
                        className="relative overflow-hidden rounded-xl bg-accent-black text-white p-space-md shadow-xl gap-space-md"
                    >
                        <div className="flex flex-col gap-space-xs relative z-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <span
                                        className="w-2.5 h-2.5 rounded-full bg-accent-gold"
                                    ></span>
                                    <span
                                        className="font-label-md text-label-md text-accent-gold uppercase tracking-wider font-semibold"
                                        >Clube Black</span
                                    >
                                </div>
                                <span
                                    className="px-2 py-0.5 rounded-md bg-white/10 text-neutral-300 font-caption text-caption flex items-center gap-1"
                                >
                                    <span
                                        className="material-symbols-outlined text-[14px]"
                                        >lock</span
                                    >
                                    Exclusivo
                                </span>
                            </div>
                            <h3
                                className="font-headline-md-mobile text-headline-md-mobile text-white tracking-tight"
                            >
                                Barba Ilimitada Black
                            </h3>
                            <p
                                className="font-body-sm text-body-sm text-neutral-400"
                            >
                                Alinhamento, toalha quente e barba impecável
                                sempre com produtos premium da linha Black.
                            </p>
                        </div>
                        <div
                            className="flex items-center justify-between p-3 rounded-lg bg-white/5 backdrop-blur-sm relative z-10"
                        >
                            <div className="flex flex-col">
                                <div className="flex items-baseline gap-1">
                                    <span
                                        className="font-body-sm text-body-sm text-neutral-400"
                                        >R$</span
                                    >
                                    <span
                                        className="font-display-mobile text-display-mobile font-semibold text-white leading-none"
                                        >159,99</span
                                    >
                                </div>
                                <span
                                    className="font-caption text-caption text-neutral-400 mt-1"
                                    >por mês</span
                                >
                            </div>
                            <div
                                className="flex items-center gap-1 text-semantic-danger bg-semantic-danger/10 px-2.5 py-1.5 rounded-lg"
                            >
                                <span
                                    className="material-symbols-outlined text-[16px]"
                                    >hourglass_empty</span
                                >
                                <span
                                    className="font-caption text-caption font-bold"
                                    >Resta 1 vaga(s)</span
                                >
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 relative z-10">
                            <div
                                className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white/5 text-neutral-200"
                            >
                                <span
                                    className="material-symbols-outlined text-[17px] text-accent-gold"
                                    >face_retouching_natural</span
                                >
                                <span className="font-caption text-caption"
                                    >Barba ilimitada</span
                                >
                            </div>
                            <div
                                className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white/5 text-neutral-200"
                            >
                                <span
                                    className="material-symbols-outlined text-[17px] text-accent-gold"
                                    >bolt</span
                                >
                                <span className="font-caption text-caption"
                                    >Taxa de ativação R$ 7,00 (1º mês)</span
                                >
                            </div>
                        </div>
                        <div className="flex items-center gap-2 pt-1 relative z-10">
                            <button
                                className="flex-1 py-3 px-3 rounded-lg bg-white/10 hover:bg-white/15 active:scale-95 text-white font-label-md text-label-md flex items-center justify-center gap-1 transition-all"
                                type="button"
                            >
                                <span className="">Vantagens</span>
                                <span
                                    className="material-symbols-outlined text-[17px]"
                                    >arrow_forward</span
                                >
                            </button>
                            <button
                                className="flex-[1.3] py-3 px-3 rounded-lg bg-brand-700 hover:bg-brand-600 active:scale-95 text-white font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 shadow-md transition-all"
                                type="button"
                            >
                                <span
                                    className="material-symbols-outlined text-[18px]"
                                    >shopping_bag</span
                                >
                                <span className="">Garantir Vaga</span>
                            </button>
                        </div>
                    </article>
                    {/*  Black Card 2: Corte & Barba Ilimitados (R$ 299,99)  */}
                    <article
                        className="relative overflow-hidden rounded-xl bg-linear-to-b from-neutral-950 to-neutral-900 text-white p-space-md shadow-xl gap-space-md"
                    >
                        {/*  Ambient Image Background  */}
                        <div
                            className="absolute right-0 bottom-0 w-40 h-40 opacity-15 pointer-events-none bg-cover bg-center rounded-tl-full"
                            data-alt="Golden professional cordless hair trimmer clipper on black marble surface with atmospheric warm side lights"
                            style={{"backgroundImage": "url(\"https://lh3.googleusercontent.com/aida-public/AB6AXuACY40c5zjG7iH0PGwjKtFGdN0rDfB-9d_0NiI64Zso9UX70vybe1rWAymuARvEF7D7cL6-9774e7dubUP-okYsbNlrt_MKN-LrNRNlHwDFcY5-0BAuyvh0BNRvucW64elk3NMfKMdoENctLLlSyYtl0f6douVYI72_RZpLh_FZYwk_dFo9-jr4ArUNL25oQREMSjZBGRPrVmYT_rDax_U0wGmV3spSyg3PXbmo5w3A\")"}}
                        ></div>
                        <div className="flex flex-col gap-space-xs relative z-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <span
                                        className="w-2.5 h-2.5 rounded-full bg-accent-gold"
                                    ></span>
                                    <span
                                        className="font-label-md text-label-md text-accent-gold uppercase tracking-wider font-semibold"
                                        >Clube Black Prime</span
                                    >
                                </div>
                                <span
                                    className="px-2 py-0.5 rounded-full bg-semantic-warning/20 text-tertiary-fixed font-caption text-[11px] font-bold flex items-center gap-1"
                                >
                                    <span
                                        className="material-symbols-outlined text-[13px]"
                                        >alarm</span
                                    >
                                    Poucas Vagas
                                </span>
                            </div>
                            <h3
                                className="font-headline-md-mobile text-headline-md-mobile text-white tracking-tight"
                            >
                                Corte & Barba Black
                            </h3>
                            <p
                                className="font-body-sm text-body-sm text-neutral-400"
                            >
                                O plano mais completo da linha Black, com total
                                liberdade para barba e corte, bebidas de
                                cortesia e horário flexível.
                            </p>
                        </div>
                        {/*  Price & Badge Status  */}
                        <div
                            className="flex items-center justify-between p-3 rounded-lg bg-white/5 backdrop-blur-sm relative z-10"
                        >
                            <div className="flex flex-col">
                                <div className="flex items-baseline gap-1">
                                    <span
                                        className="font-body-sm text-body-sm text-neutral-400"
                                        >R$</span
                                    >
                                    <span
                                        className="font-display-mobile text-display-mobile font-semibold text-white leading-none"
                                        >299,99</span
                                    >
                                </div>
                                <span
                                    className="font-caption text-caption text-neutral-400 mt-1"
                                    >por mês na assinatura</span
                                >
                            </div>
                            <div
                                className="flex items-center gap-1 text-semantic-danger bg-semantic-danger/10 px-2.5 py-1.5 rounded-lg"
                            >
                                <span
                                    className="material-symbols-outlined text-[16px]"
                                    >priority_high</span
                                >
                                <span
                                    className="font-caption text-caption font-bold"
                                    >Resta 14 vaga(s)</span
                                >
                            </div>
                        </div>
                        {/*  Features Pill  */}
                        <div className="grid grid-cols-3 gap-2 relative z-10">
                            <div
                                className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/5 text-center"
                            >
                                <span
                                    className="material-symbols-outlined text-[18px] text-accent-gold"
                                    >content_cut</span
                                >
                                <span
                                    className="font-caption text-caption font-medium text-neutral-200 mt-1"
                                    >Corte livre</span
                                >
                            </div>
                            <div
                                className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/5 text-center"
                            >
                                <span
                                    className="material-symbols-outlined text-[18px] text-accent-gold"
                                    >face_retouching_natural</span
                                >
                                <span
                                    className="font-caption text-caption font-medium text-neutral-200 mt-1"
                                    >Taxa de ativação R$ 7,00 (1º mês)</span
                                >
                            </div>
                            <div
                                className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/5 text-center"
                            >
                                <span
                                    className="material-symbols-outlined text-[18px] text-accent-gold"
                                    >bolt</span
                                >
                                <span
                                    className="font-caption text-caption font-medium text-neutral-200 mt-1"
                                    >Taxa de ativação R$ 7,00 (1º mês)</span
                                >
                            </div>
                        </div>
                        {/*  Action Buttons  */}
                        <div className="flex items-center gap-2 pt-1 relative z-10">
                            <button
                                className="flex-1 py-3 px-3 rounded-lg bg-white/10 hover:bg-white/15 active:scale-95 text-white font-label-md text-label-md flex items-center justify-center gap-1 transition-all"
                                type="button"
                            >
                                <span className="">Vantagens</span>
                                <span
                                    className="material-symbols-outlined text-[17px]"
                                    >arrow_forward</span
                                >
                            </button>
                            <button
                                className="flex-[1.3] py-3 px-3 rounded-lg bg-brand-700 hover:bg-brand-600 active:scale-95 text-white font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 shadow-md transition-all"
                                type="button"
                            >
                                <span
                                    className="material-symbols-outlined text-[18px]"
                                    >shopping_bag</span
                                >
                                <span className="">Garantir Vaga</span>
                            </button>
                        </div>
                    </article>
                </section>
                {/*  Help & Assurance Section  */}
                <section
                    className="rounded-xl bg-surface-container-low p-space-md flex items-center gap-space-md mt-space-xs"
                >
                    <div
                        className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-700 shrink-0"
                    >
                        <span className="material-symbols-outlined text-[24px]"
                            >verified_user</span
                        >
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <h4
                            className="font-label-md text-label-md text-neutral-950 font-bold"
                        >
                            Sem carência ou multas
                        </h4>
                        <p className="font-caption text-caption text-neutral-500">
                            Cancele ou pause sua assinatura quando quiser
                            através do aplicativo.
                        </p>
                    </div>
                </section>
            </div>
            
        
        </div>
      )}
    </div>
  )
}
