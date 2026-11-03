import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { iso, legacyHash, parsePath, pathFor } from "./data"
import type { Appointment, Navigate, Page, Profile } from "./types"

const seedAppointments = (): Appointment[] => {
  const d = new Date()
  d.setDate(d.getDate() + 2)
  return [
    {
      id: "ag-1001",
      date: iso(d),
      time: "15:30",
      pro: 0,
      svc: [2, 3],
      total: 83,
      minutes: 65,
      status: "scheduled",
    },
    {
      id: "h1",
      date: "2024-10-05",
      time: "10:00",
      pro: 0,
      svc: [],
      label: "Sobrancelha, Hidratação Capilar, Corte",
      total: 109.99,
      minutes: 60,
      status: "done",
    },
    {
      id: "h2",
      date: "2024-09-05",
      time: "11:00",
      pro: 1,
      svc: [],
      label: "Corte",
      total: 49.99,
      minutes: 35,
      status: "done",
    },
    {
      id: "h3",
      date: "2024-08-05",
      time: "14:15",
      pro: 4,
      svc: [],
      label: "Corte",
      total: 49.99,
      minutes: 35,
      status: "done",
    },
    {
      id: "h4",
      date: "2024-06-05",
      time: "16:30",
      pro: 5,
      svc: [],
      label: "Sobrancelha, Corte",
      total: 72,
      minutes: 50,
      status: "done",
    },
    {
      id: "h5",
      date: "2024-05-05",
      time: "09:45",
      pro: 6,
      svc: [],
      label: "Hidratação Capilar, Corte",
      total: 75,
      minutes: 55,
      status: "done",
    },
  ]
}

const seedProfile: Profile = {
  name: "Carlos Eduardo Silva",
  phone: "(11) 98765-4321",
  email: "carlos.silva@exemplo.com",
  birth: "15/04/1992",
  cep: "01310-100",
  street: "Avenida Paulista",
  number: "1000",
  complement: "Apto 42",
  district: "Bela Vista",
  city: "São Paulo",
}

/* ---------- Store ---------- */

type Store = {
  appointments: Appointment[]
  plan: string | null
  profile: Profile
  rescheduleId: string | null
  toast: string
  save: (a: Appointment) => void
  cancel: (id: string) => void
  startReschedule: (id: string | null) => void
  activatePlan: (id: string) => void
  updateProfile: (p: Profile) => void
  notify: (message: string) => void
}

const StoreContext = createContext<Store | null>(null)

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error("useStore fora do StoreProvider")
  return ctx
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState(seedAppointments)
  const [plan, setPlan] = useState<string | null>("black-2")
  const [profile, setProfile] = useState(seedProfile)
  const [rescheduleId, setRescheduleId] = useState<string | null>(null)
  const [toast, setToast] = useState("")

  const notify = useCallback((message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(""), 4000)
  }, [])

  const value = useMemo<Store>(
    () => ({
      appointments,
      plan,
      profile,
      rescheduleId,
      toast,
      save: (a) =>
        setAppointments((old) =>
          old.some((x) => x.id === a.id)
            ? old.map((x) => (x.id === a.id ? a : x))
            : [a, ...old],
        ),
      cancel: (id) =>
        setAppointments((old) =>
          old.map((x) => (x.id === id ? { ...x, status: "cancelled" } : x)),
        ),
      startReschedule: setRescheduleId,
      activatePlan: setPlan,
      updateProfile: setProfile,
      notify,
    }),
    [appointments, plan, profile, rescheduleId, toast, notify],
  )
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

/* ---------- Hook de roteamento ---------- */

export function useRouter() {
  const [loc, setLoc] = useState(() => {
    const hash = window.location.hash.slice(1)
    if (legacyHash[hash]) {
      const path = pathFor(legacyHash[hash])
      window.history.replaceState(null, "", path)
    }
    return {
      path: window.location.pathname,
      search: window.location.search,
    }
  })
  useEffect(() => {
    const sync = () =>
      setLoc({
        path: window.location.pathname,
        search: window.location.search,
      })
    window.addEventListener("popstate", sync)
    return () => window.removeEventListener("popstate", sync)
  }, [])
  const navigate = useCallback<Navigate>((page, id, query) => {
    const url = pathFor(page, id, query)
    window.history.pushState(null, "", url)
    setLoc({
      path: window.location.pathname,
      search: window.location.search,
    })
    window.scrollTo({ top: 0 })
    window.setTimeout(
      () => document.querySelector<HTMLElement>("main.page")?.focus(),
      0,
    )
  }, [])
  const route = parsePath(loc.path)
  return { ...route, search: loc.search, navigate }
}
