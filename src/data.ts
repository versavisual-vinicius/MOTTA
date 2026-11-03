import type { Appointment, Page, Plan, Professional, Service } from "./types"

export const A = "/assets"

export const services: Service[] = [
  {
    name: "Selagem Capilar",
    note: "Tratamento para selar cutículas e recuperar fios danificados.",
    price: 120,
    time: 45,
    image: "da17f.png",
    category: "Tratamentos",
  },
  {
    name: "Corte Kids (até 8 anos)",
    note: "Corte infantil com atendimento especializado.",
    price: 60,
    time: 30,
    image: "680b0.png",
    category: "Corte & Cabelo",
  },
  {
    name: "Corte Masculino Tradicional",
    note: "Corte sob medida com lavagem e finalização.",
    price: 55,
    time: 35,
    image: "554bc.png",
    category: "Corte & Cabelo",
  },
  {
    name: "Barba Terapia c/ Toalha Quente",
    note: "Ritual completo de barba, aromaterapia e navalhete.",
    price: 28,
    time: 30,
    image: "ab2bf.png",
    category: "Barba & Rituais",
  },
  {
    name: "Acabamento / Pezinho",
    note: "Alinhamento de contornos com navalha e hidratação.",
    price: 20,
    time: 15,
    image: "554bc.png",
    category: "Corte & Cabelo",
  },
  {
    name: "Corte na Tesoura",
    note: "Técnica clássica com acabamento artesanal e preciso.",
    price: 65,
    time: 40,
    image: "42a3a.png",
    category: "Corte & Cabelo",
  },
  {
    name: "Barba Simples",
    note: "Alinhamento e desenho de barba com máquina e navalha.",
    price: 22,
    time: 20,
    image: "ab2bf.png",
    category: "Barba & Rituais",
  },
  {
    name: "Hidratação Profunda Capilar",
    note: "Tratamento intensivo de nutrição e brilho aos fios.",
    price: 35,
    time: 25,
    image: "da17f.png",
    category: "Tratamentos",
  },
  {
    name: "Camuflagem de Cabelos Brancos",
    note: "Tonalização suave e natural para fios grisalhos.",
    price: 45,
    time: 30,
    image: "da17f.png",
    category: "Tratamentos",
  },
  {
    name: "Camuflagem de Barba",
    note: "Correção uniforme do tom da barba com efeito natural.",
    price: 35,
    time: 25,
    image: "ab2bf.png",
    category: "Barba & Rituais",
  },
  {
    name: "Platinado Global",
    note: "Descoloração completa com matização e proteção térmica.",
    price: 180,
    time: 120,
    image: "da17f.png",
    category: "Tratamentos",
  },
  {
    name: "Design de Sobrancelha (Navalha)",
    note: "Limpeza e alinhamento do contorno das sobrancelhas.",
    price: 18,
    time: 15,
    image: "554bc.png",
    category: "Estética & Cuidados",
  },
  {
    name: "Limpeza de Pele Express",
    note: "Esfoliação, extração suave e hidratação facial com toalha morna.",
    price: 50,
    time: 30,
    image: "554bc.png",
    category: "Estética & Cuidados",
  },
  {
    name: "Massagem Craniana Relaxante",
    note: "Alívio de tensão e estímulo da circulação no couro cabeludo.",
    price: 30,
    time: 20,
    image: "554bc.png",
    category: "Estética & Cuidados",
  },
  {
    name: "Corte + Barba (Combo Clássico)",
    note: "Experiência completa com desconto exclusivo.",
    price: 75,
    time: 60,
    image: "554bc.png",
    category: "Corte & Cabelo",
  },
  {
    name: "Ritual Completo Motta",
    note: "Corte na tesoura, barba terapia, hidratação e massagem.",
    price: 140,
    time: 90,
    image: "554bc.png",
    category: "Tratamentos",
  },
  ...[
    ["Sobrancelha (Navalha)", 20, 15, "Estética & Cuidados"],
    ["Pezinho / Acabamento", 20, 10, "Corte & Cabelo"],
    ["Lavagem Capilar (Simples)", 15, 10, "Corte & Cabelo"],
    ["Lavagem de Barba", 15, 10, "Barba & Rituais"],
  ].map(([name, price, time, category]) => ({
    name: String(name),
    price: Number(price),
    time: Number(time),
    category: String(category),
    note: "Cuidado personalizado na Barbearia Motta.",
    image: "554bc.png",
  })),
]

export const professionals: Professional[] = [
  {
    name: "Michel Nogueira",
    role: "Barbeiro Master & Visagista",
    rating: "4.9",
    image: "michel-nogueira.png",
    time: "Hoje às 15:30",
  },
  {
    name: "Maycon Angelo",
    role: "Barbeiro Master",
    rating: "5.0",
    image: "maycon-angelo.png",
    time: "Hoje às 16:15",
  },
  {
    name: "Bruno Oliveira",
    role: "Barbeiro Sênior",
    rating: "4.9",
    image: "bruno-oliveira.png",
    time: "Amanhã às 10:00",
  },
  {
    name: "Matheus Ferreira",
    role: "Barbeiro Estilista",
    rating: "4.8",
    image: "matheus-ferreira.png",
    time: "Amanhã às 17:30",
  },
  {
    name: "Orlando Junior",
    role: "Barbeiro Master",
    rating: "5.0",
    image: "orlando-junior.png",
    time: "Hoje às 17:00",
  },
  {
    name: "Wanderson Mota",
    role: "Barbeiro Sênior",
    rating: "4.9",
    image: "wanderson-mota.png",
    time: "Amanhã às 14:00",
  },
  {
    name: "Alexandre Bernardo",
    role: "Barbeiro Especialista",
    rating: "4.9",
    image: "alexandre-bernardo.png",
    time: "Hoje às 18:00",
  },
]

export const plans: Plan[] = [
  {
    id: "gold-3",
    name: "Clube Gold 3",
    type: "Corte & barba ilimitado",
    price: "229,99",
    featured: true,
    perks: ["Corte ilimitado", "Barba ilimitada", "Taxa de R$ 7,00"],
  },
  {
    id: "gold-2",
    name: "Clube Gold 2",
    type: "Barba ilimitada",
    price: "129,99",
    perks: ["Barba ilimitada", "Taxa de R$ 7,00"],
  },
  {
    id: "gold-1",
    name: "Clube Gold 1",
    type: "Corte limitado",
    price: "125,99",
    perks: ["Corte ilimitado", "Taxa de R$ 7,00"],
  },
  {
    id: "black-1",
    name: "Clube Black",
    type: "Corte limitado",
    price: "159,99",
    dark: true,
    perks: ["Corte ilimitado", "Taxa de R$ 7,00", "4 vagas"],
  },
  {
    id: "black-2",
    name: "Clube Black",
    type: "Corte & barba ilimitados",
    price: "299,99",
    dark: true,
    perks: ["Corte ilimitado", "Barba ilimitada", "14 vagas"],
  },
]

export function money(value: number) {
  return `R$ ${value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export const serviceLabel = (a: Appointment) =>
  a.svc.length
    ? a.svc
        .map((i) => services[i]?.name)
        .filter(Boolean)
        .join(", ")
    : (a.label ?? "")

export const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`

export const upcomingDays = (n = 7) =>
  Array.from({ length: n }, (_, i) => {
    const d = new Date()
    d.setHours(12, 0, 0, 0)
    d.setDate(d.getDate() + i + 1)
    return d
  })

export const parseDate = (value: string) => new Date(`${value}T12:00:00`)

export const fmtLong = (value: string) => {
  const text = parseDate(value).toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export const startsAt = (a: Appointment) => new Date(`${a.date}T${a.time}:00`)

/** Regra do PRD: reagendar/cancelar até 2h antes. */
export const canModify = (a: Appointment) =>
  a.status === "scheduled" &&
  startsAt(a).getTime() - Date.now() >= 2 * 60 * 60 * 1000

export const routeTable: [Page, string][] = [
  ["home", "/"],
  ["appointments", "/agendamentos"],
  ["booking", "/agendamentos/novo"],
  ["appointment", "/agendamentos/:id"],
  ["membership", "/clube"],
  ["club", "/clube/produtos"],
  ["benefits", "/clube/beneficios"],
  ["plans", "/planos"],
  ["plan", "/planos/:id"],
  ["checkout", "/checkout"],
  ["profile", "/perfil"],
  ["security", "/perfil/seguranca"],
]

export function parsePath(path: string): { page: Page; id?: string } {
  const clean = path.replace(/\/+$/, "") || "/"
  const segs = clean.split("/").filter(Boolean)
  for (const [page, pattern] of routeTable) {
    const p = pattern.split("/").filter(Boolean)
    if (p.length !== segs.length) continue
    let id: string | undefined
    const ok = p.every((part, i) => {
      if (part.startsWith(":")) {
        id = decodeURIComponent(segs[i])
        return true
      }
      return part === segs[i]
    })
    if (ok) return { page, id }
  }
  return { page: "notfound" }
}

export function pathFor(page: Page, id?: string, query?: string) {
  const pattern = routeTable.find(([p]) => p === page)?.[1] ?? "/"
  const path = pattern.replace(":id", encodeURIComponent(id ?? ""))
  return query ? `${path}?${query}` : path
}

export const legacyHash: Record<string, Page> = {
  club: "club",
  membership: "membership",
  plans: "plans",
  appointments: "appointments",
  benefits: "benefits",
  profile: "profile",
  booking: "booking",
}
