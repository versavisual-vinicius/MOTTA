export type Page = "home" | "appointments" | "booking" | "appointment" | "membership" | "club" | "benefits" | "plans" | "plan" | "checkout" | "profile" | "security" | "notfound"

export type Navigate = (page: Page, id?: string, query?: string) => void

export type Appointment = {
  id: string
  date: string // yyyy-mm-dd
  time: string // HH:mm
  pro: number
  svc: number[]
  label?: string
  total: number
  minutes: number
  status: "scheduled" | "cancelled" | "done"
}

export type Profile = {
  name: string
  phone: string
  email: string
  birth: string
  cep: string
  street: string
  number: string
  complement: string
  district: string
  city: string
}

export type Plan = {
  id: string
  name: string
  type: string
  price: string
  featured?: boolean
  dark?: boolean
  perks: string[]
}

export type Service = {
  name: string
  note: string
  price: number
  time: number
  image: string
  category: string
}

export type Professional = {
  name: string
  role: string
  rating: string
  image: string
  time: string
}
