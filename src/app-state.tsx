"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import useSWR from "swr"
import { legacyHash, parsePath, pathFor } from "./data"
import type { Appointment, Navigate, Profile } from "./types"

const emptyProfile: Profile = { name: "", phone: "", email: "", birth: "", cep: "", street: "", number: "", complement: "", district: "", city: "" }
type PortalData = { appointments: Appointment[]; plan: string | null; profile: Profile }
type Store = PortalData & { rescheduleId: string | null; toast: string; save: (a: Appointment) => void; cancel: (id: string) => void; startReschedule: (id: string | null) => void; activatePlan: (id: string) => void; updateProfile: (p: Profile) => void; notify: (message: string) => void }

const StoreContext = createContext<Store | null>(null)
const fetcher = (url: string) => fetch(url).then(async (response) => { if (!response.ok) throw new Error("Falha ao carregar portal"); return response.json() as Promise<PortalData> })
async function mutatePortal(body: object) { const response = await fetch("/api/portal", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }); if (!response.ok) throw new Error("Não foi possível salvar") }

export function useStore() { const ctx = useContext(StoreContext); if (!ctx) throw new Error("useStore fora do StoreProvider"); return ctx }

export function StoreProvider({ children }: { children: ReactNode }) {
  const { data, mutate } = useSWR<PortalData>("/api/portal", fetcher)
  const [rescheduleId, setRescheduleId] = useState<string | null>(null)
  const [toast, setToast] = useState("")
  const notify = useCallback((message: string) => { setToast(message); window.setTimeout(() => setToast(""), 4000) }, [])
  const update = useCallback(async (body: object, optimisticData: PortalData) => {
    try { await mutate(mutatePortal(body).then(() => optimisticData), { optimisticData, rollbackOnError: true, revalidate: true }) }
    catch { notify("Não foi possível salvar. Tente novamente.") }
  }, [mutate, notify])
  const portal = data ?? { appointments: [], plan: null, profile: emptyProfile }
  const value = useMemo<Store>(() => ({ ...portal, rescheduleId, toast,
    save: (appointment) => update({ action: "saveAppointment", appointment }, { ...portal, appointments: portal.appointments.some((item) => item.id === appointment.id) ? portal.appointments.map((item) => item.id === appointment.id ? appointment : item) : [appointment, ...portal.appointments] }),
    cancel: (id) => update({ action: "cancelAppointment", id }, { ...portal, appointments: portal.appointments.map((item) => item.id === id ? { ...item, status: "cancelled" } : item) }),
    startReschedule: setRescheduleId,
    activatePlan: (planId) => update({ action: "activatePlan", planId }, { ...portal, plan: planId }),
    updateProfile: (profile) => update({ action: "updateProfile", profile }, { ...portal, profile }),
    notify,
  }), [portal, rescheduleId, toast, update, notify])
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useRouter() {
  const [loc, setLoc] = useState(() => { const hash = window.location.hash.slice(1); if (legacyHash[hash]) window.history.replaceState(null, "", pathFor(legacyHash[hash])); return { path: window.location.pathname, search: window.location.search } })
  useEffect(() => { const sync = () => setLoc({ path: window.location.pathname, search: window.location.search }); window.addEventListener("popstate", sync); return () => window.removeEventListener("popstate", sync) }, [])
  const navigate = useCallback<Navigate>((page, id, query) => { const url = pathFor(page, id, query); window.history.pushState(null, "", url); setLoc({ path: window.location.pathname, search: window.location.search }); window.scrollTo({ top: 0 }); window.setTimeout(() => document.querySelector<HTMLElement>("main.page")?.focus(), 0) }, [])
  return { ...parsePath(loc.path), search: loc.search, navigate }
}
