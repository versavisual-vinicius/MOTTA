import { and, desc, eq } from "drizzle-orm"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { appointments, memberships, profiles } from "@/lib/db/schema"
import { services } from "@/src/data"
import type { Appointment, Profile } from "@/src/types"

async function getSession() {
  return auth.api.getSession({ headers: await headers() })
}

export async function GET() {
  const session = await getSession()
  if (!session?.user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  const userId = session.user.id
  const [storedAppointments, storedProfiles, storedMemberships] = await Promise.all([
    db.select().from(appointments).where(eq(appointments.userId, userId)).orderBy(desc(appointments.date)),
    db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1),
    db.select().from(memberships).where(eq(memberships.userId, userId)).limit(1),
  ])
  const profile = storedProfiles[0] ?? {
    userId, name: session.user.name, email: session.user.email, phone: "", birth: "", cep: "", street: "", number: "", complement: "", district: "", city: "",
  }
  return NextResponse.json({
    appointments: storedAppointments.map((item) => ({ id: item.id, date: item.date, time: item.time, pro: item.professional, svc: item.services, label: item.label ?? undefined, total: Number(item.total), minutes: item.minutes, status: item.status })),
    profile: { name: profile.name, email: profile.email, phone: profile.phone, birth: profile.birth, cep: profile.cep, street: profile.street, number: profile.number, complement: profile.complement, district: profile.district, city: profile.city },
    plan: storedMemberships[0]?.planId ?? null,
  })
}

export async function POST(request: Request) {
  const session = await getSession()
  if (!session?.user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  const userId = session.user.id
  const body = await request.json() as { action?: string; appointment?: Appointment; id?: string; planId?: string; profile?: Profile }

  if (body.action === "saveAppointment" && body.appointment) {
    const appointment = body.appointment
    if (!appointment.id || !/^\d{4}-\d{2}-\d{2}$/.test(appointment.date) || !/^\d{2}:\d{2}$/.test(appointment.time) || !Array.isArray(appointment.svc)) {
      return NextResponse.json({ error: "Agendamento inválido" }, { status: 400 })
    }
    const selected = appointment.svc.map((index) => services[index]).filter(Boolean)
    if (selected.length !== appointment.svc.length || selected.length === 0) return NextResponse.json({ error: "Serviços inválidos" }, { status: 400 })
    const total = selected.reduce((sum, service) => sum + service.price, 0)
    const minutes = selected.reduce((sum, service) => sum + service.time, 0)
    await db.insert(appointments).values({ id: appointment.id, userId, date: appointment.date, time: appointment.time, professional: appointment.pro, services: appointment.svc, label: appointment.label, total: String(total), minutes, status: appointment.status }).onConflictDoUpdate({ target: appointments.id, set: { date: appointment.date, time: appointment.time, professional: appointment.pro, services: appointment.svc, label: appointment.label, total: String(total), minutes, status: appointment.status, updatedAt: new Date() } })
    return NextResponse.json({ ok: true, total, minutes })
  }

  if (body.action === "cancelAppointment" && body.id) {
    await db.update(appointments).set({ status: "cancelled", updatedAt: new Date() }).where(and(eq(appointments.id, body.id), eq(appointments.userId, userId)))
    return NextResponse.json({ ok: true })
  }

  if (body.action === "activatePlan" && body.planId) {
    await db.insert(memberships).values({ userId, planId: body.planId }).onConflictDoUpdate({ target: memberships.userId, set: { planId: body.planId, status: "active", updatedAt: new Date() } })
    return NextResponse.json({ ok: true })
  }

  if (body.action === "updateProfile" && body.profile) {
    const profile = body.profile
    if (!profile.name?.trim() || !profile.email?.includes("@")) return NextResponse.json({ error: "Perfil inválido" }, { status: 400 })
    await db.insert(profiles).values({ userId, ...profile }).onConflictDoUpdate({ target: profiles.userId, set: { ...profile, updatedAt: new Date() } })
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ error: "Ação inválida" }, { status: 400 })
}
