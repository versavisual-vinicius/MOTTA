import React, { useState } from "react"
import { useStore } from "../../app-state"
import type { Navigate } from "../../types"

export function PerfilScreen({ onNavigate }: { onNavigate: Navigate }) {
  const { profile, updateProfile, notify } = useStore()
  const [name, setName] = useState(profile.name)
  const [phone, setPhone] = useState(profile.phone)
  const [email, setEmail] = useState(profile.email)
  const [birth, setBirth] = useState(profile.birth || "15/04/1992")
  const [cpf, setCpf] = useState("123.456.789-00")
  const [cep, setCep] = useState(profile.cep || "01310-100")
  const [street, setStreet] = useState(profile.street || "Avenida Paulista")
  const [number, setNumber] = useState(profile.number || "1000")
  const [complement, setComplement] = useState(profile.complement || "")
  const [district, setDistrict] = useState(profile.district || "Bela Vista")
  const [city, setCity] = useState(profile.city || "São Paulo")
  const [stateUf, setStateUf] = useState("SP")

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile({
      ...profile,
      name,
      phone,
      email,
      birth,
      cep,
      street,
      number,
      complement,
      district,
      city,
    })
    notify("Perfil atualizado com sucesso!")
  }

  return (
    <div className="flex flex-col w-full pb-24">

            <div className="flex flex-col w-full gap-space-lg pb-8">
                <div className="flex flex-col gap-1">
                    <span
                        className="font-caption text-caption text-neutral-500 uppercase tracking-widest text-[10px] font-semibold"
                        >Configurações da Conta</span
                    >
                    <h1
                        className="font-headline-md-mobile text-headline-md-mobile text-brand-950 font-normal"
                    >
                        Seu perfil
                    </h1>
                    <p className="font-body-sm text-body-sm text-neutral-700">
                        Gerencie suas informações pessoais, endereço e
                        preferências da sua conta na Barbearia Motta.
                    </p>
                </div>
                <section
                    className="relative overflow-hidden rounded-xl bg-brand-900 text-on-primary shadow-[0_8px_24px_rgba(7,30,19,0.18)] p-space-md items-center justify-between"
                >
                    <div
                        className="absolute -right-10 -bottom-8 w-36 h-36 opacity-15 rounded-full bg-accent-gold pointer-events-none blur-2xl"
                    ></div>
                    <div className="flex items-center gap-space-md z-10">
                        <div className="relative shrink-0">
                            <div
                                className="w-16 h-16 rounded-full p-0.5 bg-accent-gold/40 shadow-md overflow-hidden"
                            >
                                <img
                                    className="w-full h-full rounded-full object-cover"
                                    data-alt="Foto de perfil do cliente no lounge da barbearia"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuATws1CwQa312w_JQ_SaHx4zBc4UByUaTh1AjfzFXSCMvdo1LFIcQK0INrlvVN5iEfrQT0Nc6nSAXIeVXIMg5zTRHVDMJCzMT-UxfwVw1ykmmRM8siDQwtNgdsgujzxtWGh2pdvqcQEjZ2W-24Neg3fT_dCr1a-YA_UKE5SuDXrL9D8mi626B4I2Bn_8-oWcnaP6GK0Xmxu_k0o4cfFq_9sNdZ-fzXEIrZqdyR9Lh2j"
                                />
                            </div>
                            <button
                                aria-label="Alterar foto de perfil"
                                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-accent-black text-accent-gold flex items-center justify-center shadow-md active:scale-95 transition-transform"
                                type="button"
                            >
                                <span
                                    className="material-symbols-outlined text-[14px]"
                                    >photo_camera</span
                                >
                            </button>
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span
                                className="font-caption text-caption uppercase tracking-wider text-accent-gold text-[10px] font-semibold"
                                >Seu Perfil</span
                            >
                            <h2
                                className="font-headline-sm-mobile text-headline-sm-mobile text-on-primary truncate font-medium"
                            >
                                {profile.name}
                            </h2>
                            <div
                                className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-800/80 w-fit"
                            >
                                <span
                                    className="w-1.5 h-1.5 rounded-full bg-semantic-success animate-pulse"
                                ></span>
                                <span
                                    className="font-caption text-caption text-brand-100 text-[11px]"
                                    >Cliente desde out/2023</span
                                >
                            </div>
                        </div>
                    </div>
                    <div className="hidden sm:block z-10 w-16 h-16 opacity-85">
                        <img
                            className="w-full h-full object-contain"
                            data-alt="Artistic still life of an authentic luxury badger hair shaving brush and chrome safety razor rest on an aged marble and mahogany barbershop counter with warm backlighting."
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxGtbr0cw8Bf7CBdkswfEKYURdcbgujzJ1rHnnloOiOlKVyq3gITBxHvNHCRa-T_PFhzcwQYMvCOUx4MGZdcBsJ6eqlUPNwwC4O45686HrGeBsaiCtShQVd2M9zgiLf6JDl-2K35XQi40pt6n439HjkEjMjeVEeSSxRbN_IiJolFvEYDK2-AXkTDH_b-Z59EqsG-art_gjaTYE64YsRw1jScX9wrC7elFx6QPBnNN-"
                        />
                    </div>
                </section>
                <form
                    className="flex flex-col gap-space-lg"
                    id="profile-form"
                    onSubmit={handleSave}
                >
                    {/*  Informações Pessoais  */}
                    <section
                        className="bg-surface-card rounded-xl p-space-md shadow-[0_4px_16px_rgba(7,30,19,0.04)] flex flex-col gap-space-md"
                    >
                        <div className="flex items-start gap-space-sm pb-1">
                            <div
                                className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-brand-700 shrink-0"
                            >
                                <span
                                    className="material-symbols-outlined text-[20px]"
                                    >person</span
                                >
                            </div>
                            <div className="flex flex-col">
                                <h3
                                    className="font-headline-sm-mobile text-headline-sm-mobile text-brand-950 font-semibold leading-tight"
                                >
                                    Informações pessoais
                                </h3>
                                <p
                                    className="font-caption text-caption text-neutral-500"
                                >
                                    Seus dados de identificação e contato.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-space-sm">
                            <div
                                className="flex flex-col bg-surface-container-low rounded-lg p-2.5 focus-within:bg-surface-container transition-colors"
                            >
                                <label
                                    className="font-caption text-caption text-neutral-500 text-[11px] font-medium"
                                    htmlFor="fullname"
                                    >Nome completo *</label
                                >
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span
                                        className="material-symbols-outlined text-[18px] text-neutral-700"
                                        >badge</span
                                    >
                                    <input
                                        className="w-full bg-transparent font-body-sm text-body-sm text-neutral-950 outline-none"
                                        id="fullname"
                                        required
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div
                                className="flex flex-col bg-surface-container-low rounded-lg p-2.5 focus-within:bg-surface-container transition-colors"
                            >
                                <label
                                    className="font-caption text-caption text-neutral-500 text-[11px] font-medium"
                                    htmlFor="phone"
                                    >Telefone *</label
                                >
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span
                                        className="material-symbols-outlined text-[18px] text-neutral-700"
                                        >call</span
                                    >
                                    <input
                                        className="w-full bg-transparent font-body-sm text-body-sm text-neutral-950 outline-none"
                                        id="phone"
                                        required
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div
                                className="flex flex-col bg-surface-container-low rounded-lg p-2.5 focus-within:bg-surface-container transition-colors"
                            >
                                <label
                                    className="font-caption text-caption text-neutral-500 text-[11px] font-medium"
                                    htmlFor="email"
                                    >E-mail *</label
                                >
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span
                                        className="material-symbols-outlined text-[18px] text-neutral-700"
                                        >mail</span
                                    >
                                    <input
                                        className="w-full bg-transparent font-body-sm text-body-sm text-neutral-950 outline-none"
                                        id="email"
                                        required
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-space-sm">
                                <div
                                    className="flex flex-col bg-surface-container-low rounded-lg p-2.5 focus-within:bg-surface-container transition-colors"
                                >
                                    <label
                                        className="font-caption text-caption text-neutral-500 text-[11px] font-medium"
                                        htmlFor="birthdate"
                                        >Data de nascimento *</label
                                    >
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span
                                            className="material-symbols-outlined text-[18px] text-neutral-700"
                                            >calendar_today</span
                                        >
                                        <input
                                            className="w-full bg-transparent font-body-sm text-body-sm text-neutral-950 outline-none"
                                            id="birthdate"
                                            type="text"
                                            value={birth}
                                            onChange={(e) => setBirth(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div
                                    className="flex flex-col bg-surface-container-low rounded-lg p-2.5 focus-within:bg-surface-container transition-colors"
                                >
                                    <label
                                        className="font-caption text-caption text-neutral-500 text-[11px] font-medium"
                                        htmlFor="cpf"
                                        >CPF *</label
                                    >
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span
                                            className="material-symbols-outlined text-[18px] text-neutral-700"
                                            >pin</span
                                        >
                                        <input
                                            className="w-full bg-transparent font-body-sm text-body-sm text-neutral-950 outline-none"
                                            id="cpf"
                                            type="text"
                                            value={cpf}
                                            onChange={(e) => setCpf(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*  Endereço  */}
                    <section
                        className="bg-surface-card rounded-xl p-space-md shadow-[0_4px_16px_rgba(7,30,19,0.04)] flex flex-col gap-space-md"
                    >
                        <div className="flex items-start gap-space-sm pb-1">
                            <div
                                className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-brand-700 shrink-0"
                            >
                                <span
                                    className="material-symbols-outlined text-[20px]"
                                    >location_on</span
                                >
                            </div>
                            <div className="flex flex-col">
                                <h3
                                    className="font-headline-sm-mobile text-headline-sm-mobile text-brand-950 font-semibold leading-tight"
                                >
                                    Endereço
                                </h3>
                                <p
                                    className="font-caption text-caption text-neutral-500"
                                >
                                    Onde você mora.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-space-sm">
                            <div className="grid grid-cols-3 gap-space-sm">
                                <div
                                    className="col-span-1 flex flex-col bg-surface-container-low rounded-lg p-2.5 focus-within:bg-surface-container transition-colors"
                                >
                                    <label
                                        className="font-caption text-caption text-neutral-500 text-[11px] font-medium"
                                        htmlFor="cep"
                                        >CEP *</label
                                    >
                                    <div className="flex items-center gap-1 mt-0.5">
                                        <input
                                            className="w-full bg-transparent font-body-sm text-body-sm text-neutral-950 outline-none"
                                            id="cep"
                                            type="text"
                                            value={cep}
                                            onChange={(e) => setCep(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div
                                    className="col-span-2 flex flex-col bg-surface-container-low rounded-lg p-2.5 focus-within:bg-surface-container transition-colors"
                                >
                                    <label
                                        className="font-caption text-caption text-neutral-500 text-[11px] font-medium"
                                        htmlFor="rua"
                                        >Rua *</label
                                    >
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span
                                            className="material-symbols-outlined text-[18px] text-neutral-700"
                                            >home</span
                                        >
                                        <input
                                            className="w-full bg-transparent font-body-sm text-body-sm text-neutral-950 outline-none"
                                            id="rua"
                                            type="text"
                                            value={street}
                                            onChange={(e) => setStreet(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-space-sm">
                                <div
                                    className="col-span-1 flex flex-col bg-surface-container-low rounded-lg p-2.5 focus-within:bg-surface-container transition-colors"
                                >
                                    <label
                                        className="font-caption text-caption text-neutral-500 text-[11px] font-medium"
                                        htmlFor="numero"
                                        >Número *</label
                                    >
                                    <div className="flex items-center gap-1 mt-0.5">
                                        <input
                                            className="w-full bg-transparent font-body-sm text-body-sm text-neutral-950 outline-none"
                                            id="numero"
                                            type="text"
                                            value={number}
                                            onChange={(e) => setNumber(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div
                                    className="col-span-2 flex flex-col bg-surface-container-low rounded-lg p-2.5 focus-within:bg-surface-container transition-colors"
                                >
                                    <label
                                        className="font-caption text-caption text-neutral-500 text-[11px] font-medium"
                                        htmlFor="complemento"
                                        >Complemento</label
                                    >
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <input
                                            className="w-full bg-transparent font-body-sm text-body-sm text-neutral-950 placeholder-neutral-500 outline-none"
                                            id="complemento"
                                            placeholder="Ex.: Apto, Bloco, Sala"
                                            type="text"
                                            value={complement}
                                            onChange={(e) => setComplement(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-12 gap-space-sm">
                                <div
                                    className="col-span-5 flex flex-col bg-surface-container-low rounded-lg p-2.5 focus-within:bg-surface-container transition-colors"
                                >
                                    <label
                                        className="font-caption text-caption text-neutral-500 text-[11px] font-medium"
                                        htmlFor="bairro"
                                        >Bairro *</label
                                    >
                                    <input
                                        className="w-full bg-transparent font-body-sm text-body-sm text-neutral-950 outline-none mt-0.5"
                                        id="bairro"
                                        type="text"
                                        value={district}
                                        onChange={(e) => setDistrict(e.target.value)}
                                    />
                                </div>
                                <div
                                    className="col-span-4 flex flex-col bg-surface-container-low rounded-lg p-2.5 focus-within:bg-surface-container transition-colors"
                                >
                                    <label
                                        className="font-caption text-caption text-neutral-500 text-[11px] font-medium"
                                        htmlFor="cidade"
                                        >Cidade *</label
                                    >
                                    <input
                                        className="w-full bg-transparent font-body-sm text-body-sm text-neutral-950 outline-none mt-0.5"
                                        id="cidade"
                                        type="text"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                </div>
                                <div
                                    className="col-span-3 flex flex-col bg-surface-container-low rounded-lg p-2.5 focus-within:bg-surface-container transition-colors"
                                >
                                    <label
                                        className="font-caption text-caption text-neutral-500 text-[11px] font-medium"
                                        htmlFor="estado"
                                        >UF *</label
                                    >
                                    <div
                                        className="flex items-center justify-between mt-0.5"
                                    >
                                        <input
                                            className="w-full bg-transparent font-body-sm text-body-sm text-neutral-950 outline-none"
                                            id="estado"
                                            maxLength={2}
                                            type="text"
                                            value={stateUf}
                                            onChange={(e) => setStateUf(e.target.value)}
                                        />
                                        <span
                                            className="material-symbols-outlined text-[16px] text-neutral-500 pointer-events-none"
                                            >expand_more</span
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*  Segurança da Conta  */}
                    <section
                        className="bg-surface-card rounded-xl p-space-md shadow-[0_4px_16px_rgba(7,30,19,0.04)] flex flex-col gap-space-md"
                    >
                        <div className="flex items-start gap-space-sm pb-1">
                            <div
                                className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-brand-700 shrink-0"
                            >
                                <span
                                    className="material-symbols-outlined text-[20px]"
                                    >security</span
                                >
                            </div>
                            <div className="flex flex-col">
                                <h3
                                    className="font-headline-sm-mobile text-headline-sm-mobile text-brand-950 font-semibold leading-tight"
                                >
                                    Segurança da conta
                                </h3>
                                <p
                                    className="font-caption text-caption text-neutral-500"
                                >
                                    Proteja sua conta e mantenha seus dados
                                    seguros.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button
                                className="w-full flex items-center justify-between p-3 rounded-lg bg-surface-container-low hover:bg-surface-container active:scale-[0.99] transition-all text-left"
                                type="button"
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-8 h-8 rounded-full bg-surface-card flex items-center justify-center text-brand-700 shadow-sm"
                                    >
                                        <span
                                            className="material-symbols-outlined text-[18px]"
                                            >lock</span
                                        >
                                    </div>
                                    <div className="flex flex-col">
                                        <span
                                            className="font-label-md text-label-md text-neutral-950"
                                            >Senha</span
                                        >
                                        <span
                                            className="font-caption text-caption text-neutral-500"
                                            >Altere sua senha e mantenha sua
                                            conta protegida.</span
                                        >
                                    </div>
                                </div>
                                <span
                                    className="material-symbols-outlined text-[20px] text-neutral-500"
                                    >chevron_right</span
                                >
                            </button>
                            <div
                                className="w-full flex items-center justify-between p-3 rounded-lg bg-surface-container-low"
                            >
                                <div className="flex items-center gap-3 pr-2">
                                    <div
                                        className="w-8 h-8 rounded-full bg-surface-card flex items-center justify-center text-brand-700 shadow-sm shrink-0"
                                    >
                                        <span
                                            className="material-symbols-outlined text-[18px]"
                                            >verified_user</span
                                        >
                                    </div>
                                    <div className="flex flex-col">
                                        <span
                                            className="font-label-md text-label-md text-neutral-950"
                                            >Autenticação em dois fatores</span
                                        >
                                        <span
                                            className="font-caption text-caption text-neutral-500"
                                            >Adicione uma camada extra de
                                            segurança.</span
                                        >
                                    </div>
                                </div>
                                <button
                                    aria-checked="true"
                                    className="toggle-btn relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full bg-brand-700 p-0.5 transition-colors duration-200 ease-in-out focus:outline-none"
                                    
                                    role="switch"
                                    type="button"
                                >
                                    <span
                                        className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-on-primary shadow ring-0 transition duration-200 ease-in-out"
                                    ></span>
                                </button>
                            </div>
                        </div>
                    </section>
                    {/*  Integrações  */}
                    <section
                        className="bg-surface-card rounded-xl p-space-md shadow-[0_4px_16px_rgba(7,30,19,0.04)] flex flex-col gap-space-md"
                    >
                        <div className="flex items-start gap-space-sm pb-1">
                            <div
                                className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-brand-700 shrink-0"
                            >
                                <span
                                    className="material-symbols-outlined text-[20px]"
                                    >hub</span
                                >
                            </div>
                            <div className="flex flex-col">
                                <h3
                                    className="font-headline-sm-mobile text-headline-sm-mobile text-brand-950 font-semibold leading-tight"
                                >
                                    Integrações
                                </h3>
                                <p
                                    className="font-caption text-caption text-neutral-500"
                                >
                                    Conecte sua conta a outros serviços.
                                </p>
                            </div>
                        </div>
                        <button
                            className="w-full flex items-center justify-between p-3 rounded-lg bg-surface-container-low hover:bg-surface-container active:scale-[0.99] transition-all text-left"
                            type="button"
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-8 h-8 rounded-full bg-surface-card flex items-center justify-center shadow-sm text-semantic-info shrink-0"
                                >
                                    <span
                                        className="material-symbols-outlined text-[19px]"
                                        >event_repeat</span
                                    >
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1.5">
                                        <span
                                            className="font-label-md text-label-md text-neutral-950"
                                            >Google Agenda</span
                                        >
                                        <span
                                            className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-brand-100 text-brand-700"
                                            >Ativo</span
                                        >
                                    </div>
                                    <span
                                        className="font-caption text-caption text-neutral-500"
                                        >Sincronize seus agendamentos
                                        automaticamente.</span
                                    >
                                </div>
                            </div>
                            <span
                                className="material-symbols-outlined text-[20px] text-neutral-500"
                                >chevron_right</span
                            >
                        </button>
                    </section>
                    {/*  Notificações  */}
                    <section
                        className="bg-surface-card rounded-xl p-space-md shadow-[0_4px_16px_rgba(7,30,19,0.04)] flex flex-col gap-space-md"
                    >
                        <div className="flex items-start gap-space-sm pb-1">
                            <div
                                className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-brand-700 shrink-0"
                            >
                                <span
                                    className="material-symbols-outlined text-[20px]"
                                    >notifications_active</span
                                >
                            </div>
                            <div className="flex flex-col">
                                <h3
                                    className="font-headline-sm-mobile text-headline-sm-mobile text-brand-950 font-semibold leading-tight"
                                >
                                    Notificações
                                </h3>
                                <p
                                    className="font-caption text-caption text-neutral-500"
                                >
                                    Escolha como e o que deseja receber.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div
                                className="w-full flex items-center justify-between p-3 rounded-lg bg-surface-container-low"
                            >
                                <div className="flex items-center gap-3 pr-2">
                                    <div
                                        className="w-8 h-8 rounded-full bg-surface-card flex items-center justify-center text-brand-700 shadow-sm shrink-0"
                                    >
                                        <span
                                            className="material-symbols-outlined text-[18px]"
                                            >calendar_month</span
                                        >
                                    </div>
                                    <div className="flex flex-col">
                                        <span
                                            className="font-label-md text-label-md text-neutral-950"
                                            >Lembretes de agendamento</span
                                        >
                                        <span
                                            className="font-caption text-caption text-neutral-500"
                                            >Receba avisos sobre seus serviços
                                            agendados via WhatsApp.</span
                                        >
                                    </div>
                                </div>
                                <button
                                    aria-checked="true"
                                    className="toggle-btn relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full bg-brand-700 p-0.5 transition-colors duration-200 ease-in-out focus:outline-none"
                                    
                                    role="switch"
                                    type="button"
                                >
                                    <span
                                        className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-on-primary shadow ring-0 transition duration-200 ease-in-out"
                                    ></span>
                                </button>
                            </div>
                            <div
                                className="w-full flex items-center justify-between p-3 rounded-lg bg-surface-container-low"
                            >
                                <div className="flex items-center gap-3 pr-2">
                                    <div
                                        className="w-8 h-8 rounded-full bg-surface-card flex items-center justify-center text-brand-700 shadow-sm shrink-0"
                                    >
                                        <span
                                            className="material-symbols-outlined text-[18px]"
                                            >loyalty</span
                                        >
                                    </div>
                                    <div className="flex flex-col">
                                        <span
                                            className="font-label-md text-label-md text-neutral-950"
                                            >Novidades e promoções</span
                                        >
                                        <span
                                            className="font-caption text-caption text-neutral-500"
                                            >Seja o primeiro a saber sobre
                                            ofertas e benefícios do Clube.</span
                                        >
                                    </div>
                                </div>
                                <button
                                    aria-checked="true"
                                    className="toggle-btn relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full bg-brand-700 p-0.5 transition-colors duration-200 ease-in-out focus:outline-none"
                                    
                                    role="switch"
                                    type="button"
                                >
                                    <span
                                        className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-on-primary shadow ring-0 transition duration-200 ease-in-out"
                                    ></span>
                                </button>
                            </div>
                        </div>
                    </section>
                    {/*  Feedback Toast Container  */}
                    <div
                        className="hidden fixed bottom-20 left-4 right-4 z-50 p-3 bg-brand-950 text-on-primary rounded-xl shadow-xl items-center justify-between animate-fade-in"
                        id="toast"
                    >
                        <div className="flex items-center gap-2">
                            <span
                                className="material-symbols-outlined text-semantic-success text-[20px]"
                                >check_circle</span
                            >
                            <span
                                className="font-body-sm text-body-sm text-brand-100"
                                >Alterações salvas com sucesso!</span
                            >
                        </div>
                        <button
                            className="text-neutral-500 hover:text-on-primary"
                            
                            type="button"
                        >
                            <span className="material-symbols-outlined text-[18px]"
                                >close</span
                            >
                        </button>
                    </div>
                    {/*  Actions Footer  */}
                    <div className="flex items-center gap-space-sm pt-2">
                        <button
                            className="flex-1 h-12 rounded-xl bg-surface-card text-neutral-950 font-label-md text-label-md flex items-center justify-center gap-1.5 shadow-[0_2px_8px_rgba(7,30,19,0.06)] active:scale-[0.98] transition-transform"
                            onClick={() => onNavigate("home")}
                            type="button"
                        >
                            <span
                                className="material-symbols-outlined text-[18px] text-neutral-700"
                                >close</span
                            >
                            Cancelar
                        </button>
                        <button
                            className="flex-[1.8] h-12 rounded-xl bg-brand-700 hover:bg-brand-800 text-on-primary font-label-md text-label-md flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(21,85,45,0.25)] active:scale-[0.98] transition-transform"
                            
                            type="submit"
                        >
                            <span className="material-symbols-outlined text-[19px]"
                                >save</span
                            >
                            Salvar alterações
                        </button>
                    </div>
                </form>
            </div>
            
        
    </div>
  )
}
