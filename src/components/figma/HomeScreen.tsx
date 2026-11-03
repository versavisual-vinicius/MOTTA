import React from "react"
import { useStore } from "../../app-state"
import type { Navigate } from "../../types"

export function HomeScreen({ onNavigate }: { onNavigate: Navigate }) {
  const { profile } = useStore()
  return (
    <div className="flex flex-col w-full pb-24">
      {/* Greeting Banner */}
      <div className="px-4 pt-3 flex flex-col">
        <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest font-caption">Portal do Cliente • Barbearia Motta</span>
        <h1 className="text-2xl font-headline text-brand-950 leading-tight">Olá, {profile.name}</h1>
        <p className="text-xs text-neutral-600 font-body">Seu espaço exclusivo para gerenciar agendamentos, cotas de assinatura e hospitalidade do lounge.</p>
      </div>

      
            <div className="flex flex-col w-full pb-8">
                {/*  Top Headline & Quick Navigation Actions  */}
                <section className="px-4 pt-3 pb-2 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <span
                                className="text-[11px] font-label font-bold tracking-wider text-secondary uppercase"
                                >Assinatura Premium</span
                            >
                            <h2
                                className="text-[26px] font-headline text-on-surface leading-tight"
                            >
                                Meu Plano & Benefícios
                            </h2>
                        </div>
                        <div
                            className="h-10 w-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container"
                        >
                            <span className="material-symbols-outlined text-[22px]"
                                >workspace_premium</span
                            >
                        </div>
                    </div>
                    <p className="text-sm text-on-surface-variant font-body">
                        Acompanhe o saldo mensal de suas cotas, utilize cortes
                        inclusos e desfrute de privilégios exclusivos.
                    </p>
                    {/*  Quick action links  */}
                    <div className="flex items-center gap-2 pt-1">
                        <button
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface text-xs font-label font-medium hover:bg-surface-container-highest transition-colors"
                        >
                            <span
                                className="material-symbols-outlined text-[16px] text-primary"
                                >visibility</span
                            >
                            Ver catálogo de planos
                        </button>
                        <button
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface text-xs font-label font-medium hover:bg-surface-container-highest transition-colors"
                        >
                            <span
                                className="material-symbols-outlined text-[16px] text-primary"
                                >tune</span
                            >
                            Gerenciar plano
                        </button>
                    </div>
                </section>
                {/*  Hero Card: Active Membership Card  */}
                <section className="px-4 pt-3">
                    <div
                        className="relative w-full rounded-2xl bg-linear-to-br from-primary to-inverse-surface text-on-primary p-5 shadow-lg overflow-hidden"
                    >
                        {/*  Ambient subtle background decorative ring  */}
                        <div
                            className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-tertiary-container/20 blur-2xl pointer-events-none"
                        ></div>
                        <div
                            className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-primary-container/40 blur-xl pointer-events-none"
                        ></div>
                        {/*  Header row inside Card: Status + Digital Badge ID  */}
                        <div
                            className="relative z-10 flex items-center justify-between gap-2 pb-3"
                        >
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span
                                        className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-fixed opacity-75"
                                    ></span>
                                    <span
                                        className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-fixed"
                                    ></span>
                                </span>
                                <span
                                    className="text-[11px] font-label font-bold tracking-wider text-primary-fixed uppercase"
                                    >Plano Ativo</span
                                >
                                <span className="text-xs text-outline-variant"
                                    >•</span
                                >
                                <span
                                    className="inline-flex items-center gap-1 text-[11px] font-label font-semibold text-tertiary-fixed bg-tertiary-container/60 px-2 py-0.5 rounded-full"
                                >
                                    <span
                                        className="material-symbols-outlined text-[13px]"
                                        style={{"fontVariationSettings": "\"FILL\" 1"}}
                                        >stars</span
                                    >
                                    Nível Ouro
                                </span>
                            </div>
                            <button
                                aria-label="Abrir QR Code do Membro"
                                className="flex items-center gap-1 bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 px-2.5 py-1 rounded-lg text-[11px] font-label text-inverse-on-surface transition-colors backdrop-blur-sm"
                            >
                                <span
                                    className="material-symbols-outlined text-[15px]"
                                    >qr_code_2</span
                                >
                                <span
                                    className="font-mono text-[10px] tracking-tight"
                                    >#MOTTA-GOLD-8492</span
                                >
                            </button>
                        </div>
                        {/*  Plan Title and Membership Details  */}
                        <div className="relative z-10 pt-1 pb-4">
                            <h3
                                className="text-2xl font-headline text-on-primary font-normal tracking-wide"
                            >
                                Clube Gold 3 — Corte & Barba
                            </h3>
                            <p
                                className="text-xs text-outline-variant font-body mt-1"
                            >
                                Membro assíduo desde Out/2023 • Renovação
                                automática em 05/11/2026
                            </p>
                            <div className="mt-3 flex items-baseline gap-1.5">
                                <span
                                    className="text-xs text-outline-variant font-label"
                                    >Mensalidade:</span
                                >
                                <span
                                    className="text-xl font-bold font-body text-primary-fixed tracking-tight"
                                    style={{"fontVariantNumeric": "tabular-nums"}}
                                    >R$ 229,99</span
                                >
                                <span
                                    className="text-xs text-outline-variant font-label"
                                    >/mês</span
                                >
                            </div>
                        </div>
                        {/*  Quota Progress Meters  */}
                        <div
                            className="relative z-10 pt-3 flex flex-col gap-3.5 bg-surface-container-lowest/10 backdrop-blur-md rounded-xl p-3.5"
                        >
                            {/*  Cortes Quota  */}
                            <div>
                                <div
                                    className="flex items-center justify-between text-xs font-label mb-1.5"
                                >
                                    <span
                                        className="flex items-center gap-1.5 text-inverse-on-surface"
                                    >
                                        <span
                                            className="material-symbols-outlined text-[16px] text-tertiary-fixed"
                                            >content_cut</span
                                        >
                                        Cotas de Corte de Cabelo
                                    </span>
                                    <span
                                        className="font-semibold text-primary-fixed"
                                        style={{"fontVariantNumeric": "tabular-nums"}}
                                    >
                                        3 de 4 utilizados
                                        <span
                                            className="text-outline-variant font-normal"
                                            >(75%)</span
                                        >
                                    </span>
                                </div>
                                <div
                                    className="w-full h-2 rounded-full bg-surface-container-lowest/20 overflow-hidden"
                                >
                                    <div
                                        className="h-full bg-tertiary-fixed rounded-full transition-all duration-500"
                                        style={{"width": "75%"}}
                                    ></div>
                                </div>
                                <div
                                    className="flex items-center justify-between mt-1 text-[11px] text-outline-variant"
                                >
                                    <span>Resta 1 corte até 05/11</span>
                                    <span className="text-primary-fixed font-medium"
                                        >1 disponível</span
                                    >
                                </div>
                            </div>
                            {/*  Barboterapia Quota  */}
                            <div>
                                <div
                                    className="flex items-center justify-between text-xs font-label mb-1.5"
                                >
                                    <span
                                        className="flex items-center gap-1.5 text-inverse-on-surface"
                                    >
                                        <span
                                            className="material-symbols-outlined text-[16px] text-tertiary-fixed"
                                            >soap</span
                                        >
                                        Cotas de Barboterapia Ritual
                                    </span>
                                    <span
                                        className="font-semibold text-primary-fixed"
                                        style={{"fontVariantNumeric": "tabular-nums"}}
                                    >
                                        2 de 4 utilizados
                                        <span
                                            className="text-outline-variant font-normal"
                                            >(50%)</span
                                        >
                                    </span>
                                </div>
                                <div
                                    className="w-full h-2 rounded-full bg-surface-container-lowest/20 overflow-hidden"
                                >
                                    <div
                                        className="h-full bg-tertiary-fixed rounded-full transition-all duration-500"
                                        style={{"width": "50%"}}
                                    ></div>
                                </div>
                                <div
                                    className="flex items-center justify-between mt-1 text-[11px] text-outline-variant"
                                >
                                    <span>Restam 2 rituais até 05/11</span>
                                    <span className="text-primary-fixed font-medium"
                                        >2 disponíveis</span
                                    >
                                </div>
                            </div>
                            {/*  Metric highlights  */}
                            <div
                                className="pt-2 flex items-center justify-between text-xs text-inverse-on-surface"
                            >
                                <div
                                    className="flex items-center gap-1 text-[11px]"
                                >
                                    <span
                                        className="material-symbols-outlined text-[15px] text-tertiary-fixed"
                                        >percent</span
                                    >
                                    <span
                                        >Extras & Upgrades:
                                        <strong className="text-on-primary"
                                            >15% OFF</strong
                                        ></span
                                    >
                                </div>
                                <div
                                    className="flex items-center gap-1 text-[11px]"
                                >
                                    <span
                                        className="material-symbols-outlined text-[15px] text-primary-fixed"
                                        >savings</span
                                    >
                                    <span
                                        >Economia anual:
                                        <strong className="text-primary-fixed"
                                            >R$ 640,00</strong
                                        ></span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*  Quota Balance & Quick Redeem Action Cards  */}
                <section className="px-4 pt-6 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-headline text-on-surface">
                                Saldo e Utilização de Cotas
                            </h3>
                            <p
                                className="text-xs text-on-surface-variant font-body"
                            >
                                Ciclo vigente: 06/10 a 05/11
                            </p>
                        </div>
                        <span
                            className="text-xs font-label text-primary font-semibold flex items-center gap-0.5"
                        >
                            Renovação em 18 dias
                        </span>
                    </div>
                    {/*  Cut Quota Card  */}
                    <div
                        className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col gap-3"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex gap-3">
                                <div
                                    className="w-11 h-11 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0"
                                >
                                    <span
                                        className="material-symbols-outlined text-[24px]"
                                        >content_cut</span
                                    >
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h4
                                            className="text-sm font-semibold text-on-surface font-body truncate"
                                        >
                                            Corte Masculino Personalizado
                                        </h4>
                                    </div>
                                    <p
                                        className="text-xs text-on-surface-variant font-body"
                                    >
                                        Consultoria visagista, lavagem
                                        refrescante e styling
                                    </p>
                                    <span
                                        className="text-[11px] font-label text-primary font-semibold mt-1"
                                        >1 cota restante no ciclo</span
                                    >
                                </div>
                            </div>
                            <span
                                className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label text-[10px] font-bold uppercase shrink-0"
                            >
                                Incluso
                            </span>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                            <span
                                className="text-xs text-on-surface-variant font-label"
                                >Preço avulso:
                                <span className="line-through">R$ 75,00</span> •
                                <strong className="text-primary"
                                    >R$ 0,00</strong
                                ></span
                            >
                            <button
                                className="px-3.5 py-2 rounded-xl bg-primary text-on-primary text-xs font-label font-semibold flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform"
                            >
                                <span
                                    className="material-symbols-outlined text-[16px]"
                                    >calendar_today</span
                                >
                                Agendar com cota
                            </button>
                        </div>
                    </div>
                    {/*  Beard Quota Card  */}
                    <div
                        className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col gap-3"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex gap-3">
                                <div
                                    className="w-11 h-11 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0"
                                >
                                    <span
                                        className="material-symbols-outlined text-[24px]"
                                        >soap</span
                                    >
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h4
                                            className="text-sm font-semibold text-on-surface font-body truncate"
                                        >
                                            Barboterapia Ritual Tradicional
                                        </h4>
                                    </div>
                                    <p
                                        className="text-xs text-on-surface-variant font-body"
                                    >
                                        Toalha quente com óleos essenciais e
                                        navalhete esterilizado
                                    </p>
                                    <span
                                        className="text-[11px] font-label text-primary font-semibold mt-1"
                                        >2 cotas restantes no ciclo</span
                                    >
                                </div>
                            </div>
                            <span
                                className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label text-[10px] font-bold uppercase shrink-0"
                            >
                                Incluso
                            </span>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                            <span
                                className="text-xs text-on-surface-variant font-label"
                                >Preço avulso:
                                <span className="line-through">R$ 60,00</span> •
                                <strong className="text-primary"
                                    >R$ 0,00</strong
                                ></span
                            >
                            <button
                                className="px-3.5 py-2 rounded-xl bg-primary text-on-primary text-xs font-label font-semibold flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform"
                            >
                                <span
                                    className="material-symbols-outlined text-[16px]"
                                    >calendar_today</span
                                >
                                Agendar barba
                            </button>
                        </div>
                    </div>
                    {/*  Upgrade / Additional Service with 15% OFF  */}
                    <div
                        className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col gap-3"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex gap-3">
                                <div
                                    className="w-11 h-11 rounded-lg bg-surface-container flex items-center justify-center text-tertiary shrink-0"
                                >
                                    <span
                                        className="material-symbols-outlined text-[24px]"
                                        >spa</span
                                    >
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h4
                                            className="text-sm font-semibold text-on-surface font-body truncate"
                                        >
                                            Hidratação & Acabamento Facial
                                        </h4>
                                    </div>
                                    <p
                                        className="text-xs text-on-surface-variant font-body"
                                    >
                                        Tratamento capilar com argiloterapia ou
                                        máscara de carvão ativado
                                    </p>
                                    <span
                                        className="text-[11px] font-label text-tertiary font-semibold mt-1"
                                        >15% de desconto de assinante</span
                                    >
                                </div>
                            </div>
                            <span
                                className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label text-[10px] font-bold uppercase shrink-0"
                            >
                                15% OFF
                            </span>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                            <span
                                className="text-xs text-on-surface-variant font-label"
                                >De R$ 55,00 por
                                <strong className="text-on-surface"
                                    >R$ 46,75</strong
                                ></span
                            >
                            <button
                                className="px-3.5 py-2 rounded-xl bg-surface-container-high text-on-surface text-xs font-label font-semibold flex items-center gap-1.5 hover:bg-surface-container-highest active:scale-95 transition-all"
                            >
                                <span
                                    className="material-symbols-outlined text-[16px] text-tertiary"
                                    >add_circle</span
                                >
                                Agendar extra
                            </button>
                        </div>
                    </div>
                </section>
                {/*  Lifestyle & Partner Perks Section  */}
                <section className="px-4 pt-6 flex flex-col gap-3">
                    <div>
                        <h3 className="text-lg font-headline text-on-surface">
                            Benefícios & Parcerias Homologadas
                        </h3>
                        <p className="text-xs text-on-surface-variant font-body">
                            Privilégios garantidos pela sua categoria Clube Gold
                        </p>
                    </div>
                    {/*  2-column compact grid  */}
                    <div className="grid grid-cols-2 gap-2.5">
                        {/*  Perk 1  */}
                        <div
                            className="bg-surface-container-lowest p-3.5 rounded-xl shadow-sm flex flex-col gap-2"
                        >
                            <div
                                className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary"
                            >
                                <span
                                    className="material-symbols-outlined text-[18px]"
                                    >verified</span
                                >
                            </div>
                            <h5
                                className="text-xs font-bold text-on-surface font-label"
                            >
                                Serviços Inclusos
                            </h5>
                            <p
                                className="text-[11px] text-on-surface-variant leading-relaxed"
                            >
                                Cortes e barbas programados sem pagar taxa
                                avulsa a cada visita.
                            </p>
                        </div>
                        {/*  Perk 2  */}
                        <div
                            className="bg-surface-container-lowest p-3.5 rounded-xl shadow-sm flex flex-col gap-2"
                        >
                            <div
                                className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-tertiary"
                            >
                                <span
                                    className="material-symbols-outlined text-[18px]"
                                    >loyalty</span
                                >
                            </div>
                            <h5
                                className="text-xs font-bold text-on-surface font-label"
                            >
                                15% OFF em Extras
                            </h5>
                            <p
                                className="text-[11px] text-on-surface-variant leading-relaxed"
                            >
                                Válido para sobrancelha, selagem capilar,
                                camuflagem de grisalhos e manicure.
                            </p>
                        </div>
                        {/*  Perk 3  */}
                        <div
                            className="bg-surface-container-lowest p-3.5 rounded-xl shadow-sm flex flex-col gap-2"
                        >
                            <div
                                className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary"
                            >
                                <span
                                    className="material-symbols-outlined text-[18px]"
                                    >shopping_bag</span
                                >
                            </div>
                            <h5
                                className="text-xs font-bold text-on-surface font-label"
                            >
                                Cosméticos da Bancada
                            </h5>
                            <p
                                className="text-[11px] text-on-surface-variant leading-relaxed"
                            >
                                10% de desconto em pomadas, óleos e balms
                                homologados (Red Nek, Don Alcides).
                            </p>
                        </div>
                        {/*  Perk 4  */}
                        <div
                            className="bg-surface-container-lowest p-3.5 rounded-xl shadow-sm flex flex-col gap-2"
                        >
                            <div
                                className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-tertiary"
                            >
                                <span
                                    className="material-symbols-outlined text-[18px]"
                                    >local_bar</span
                                >
                            </div>
                            <h5
                                className="text-xs font-bold text-on-surface font-label"
                            >
                                Hospitality Bar & Valet
                            </h5>
                            <p
                                className="text-[11px] text-on-surface-variant leading-relaxed"
                            >
                                Chopp artesanal cortesia, café espresso
                                ilimitado e 1h de estacionamento conveniado.
                            </p>
                        </div>
                    </div>
                </section>
                {/*  Visual Lifestyle Banner  */}
                <section className="px-4 pt-5">
                    <div
                        className="relative rounded-2xl overflow-hidden shadow-sm h-36 bg-surface-container items-center"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            data-alt="Close-up of premium grooming essentials on warm dark oak wood counter, professional barber shear and antique leather razor case with warm ambient lighting in an authentic luxury barbershop atmosphere, botanical touches and emerald accents."
                            style={{"backgroundImage": "url(\"https://lh3.googleusercontent.com/aida-public/AB6AXuB0j-FL7p6MxTaBMMg0qpkBB9MT-r5C931L1gSU1s7O25ilQiwauJdMFf9zz8MvgbDu02-jh_les7XQbQBzA-YgkBm6tQFZ_6Z5i401uDWrL6BB4_3Nn6YsahpZSJa_PGsIQW_K0heiBpWpmanlxzXJU8qYJ1qFkwZufbqTgan1H3Xet7blYb84Of42qpkAHUp08H27-T8KHztFwv_6d8_15p7jhWSgIZdK6A7-L1By\")"}}
                        ></div>
                        <div
                            className="absolute inset-0 bg-linear-to-r from-primary/95 via-primary/75 to-transparent"
                        ></div>
                        <div
                            className="relative z-10 px-4 py-3 flex flex-col max-w-60"
                        >
                            <span
                                className="text-[10px] font-label font-bold text-primary-fixed uppercase tracking-wider"
                                >Ateliê & Confraria</span
                            >
                            <h4
                                className="text-base font-headline text-on-primary font-normal leading-snug mt-0.5"
                            >
                                Mais que um corte. O seu momento de pausa e
                                autocuidado.
                            </h4>
                            <span
                                className="text-[11px] text-outline-variant font-body mt-1"
                                >Confraria exclusiva para assinantes Motta</span
                            >
                        </div>
                    </div>
                </section>
                {/*  Subscription Billing & Management Section  */}
                <section className="px-4 pt-6 flex flex-col gap-3">
                    <h3 className="text-lg font-headline text-on-surface">
                        Gestão de Assinatura & Faturamento
                    </h3>
                    <div
                        className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col gap-3"
                    >
                        {/*  Payment card info  */}
                        <div className="flex items-center justify-between pb-3">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant"
                                >
                                    <span
                                        className="material-symbols-outlined text-[20px]"
                                        >credit_card</span
                                    >
                                </div>
                                <div className="flex flex-col">
                                    <span
                                        className="text-xs font-semibold text-on-surface font-body"
                                        >Mastercard final •••• 9241</span
                                    >
                                    <span
                                        className="text-[11px] text-on-surface-variant"
                                        >Próxima cobrança: 05/11/2026 (R$
                                        229,99)</span
                                    >
                                </div>
                            </div>
                            <span
                                className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold font-label uppercase"
                            >
                                Automática
                            </span>
                        </div>
                        {/*  Fair rules & transparency notice  */}
                        <div
                            className="bg-surface-container-low rounded-lg p-3 flex items-start gap-2.5"
                        >
                            <span
                                className="material-symbols-outlined text-[18px] text-primary shrink-0 mt-0.5"
                                >lock_open</span
                            >
                            <div
                                className="text-[11px] text-on-surface-variant font-body leading-relaxed"
                            >
                                <strong className="text-on-surface font-semibold"
                                    >Sem período de carência:</strong
                                >
                                pause ou cancele a qualquer momento antes da
                                data de renovação sem multas contratuais.
                            </div>
                        </div>
                        {/*  Action buttons  */}
                        <div className="flex flex-col gap-2 pt-1">
                            <button
                                className="w-full h-11 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-label font-semibold flex items-center justify-center gap-2 transition-colors"
                            >
                                <span
                                    className="material-symbols-outlined text-[17px] text-primary"
                                    >credit_card</span
                                >
                                Alterar forma de pagamento
                            </button>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    className="h-10 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-label font-medium flex items-center justify-center gap-1.5 transition-colors"
                                >
                                    <span
                                        className="material-symbols-outlined text-[16px] text-secondary"
                                        >swap_horiz</span
                                    >
                                    Trocar de plano
                                </button>
                                <button
                                    className="h-10 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface-variant text-xs font-label font-medium flex items-center justify-center gap-1.5 transition-colors"
                                >
                                    <span
                                        className="material-symbols-outlined text-[16px]"
                                        >pause_circle</span
                                    >
                                    Opções de pausa
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                {/*  Ethical Prototype Disclaimer  */}
                <footer className="px-6 pt-6 pb-2 text-center">
                    <p
                        className="text-[11px] text-outline font-label leading-relaxed"
                    >
                        Protótipo demonstrativo • Barbearia Motta Ateliê &
                        Cuidado Masculino.<br />
                        Valores de mensalidades, cotas e marcas parceiras são
                        meramente ilustrativos para validação de layout.
                    </p>
                </footer>
            </div>
            
        
    </div>
  )
}
