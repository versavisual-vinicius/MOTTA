import React from "react"
import type { Page, Navigate } from "../../types"

interface TabItem {
  id: Page
  label: string
  icon: string
  subPages?: Page[]
}

const tabs: TabItem[] = [
  { id: "home", label: "Início", icon: "home" },
  { id: "appointments", label: "Agendamentos", icon: "calendar_today", subPages: ["appointment"] },
  { id: "membership", label: "Clube", icon: "workspace_premium", subPages: ["club", "benefits"] },
  { id: "plans", label: "Planos", icon: "loyalty", subPages: ["plan", "checkout"] },
  { id: "profile", label: "Perfil", icon: "person", subPages: ["security"] },
]

export function FigmaBottomNav({
  page,
  onNavigate,
}: {
  page: Page
  onNavigate: Navigate
}) {
  const isTabActive = (item: TabItem) =>
    item.id === page || (item.subPages && item.subPages.includes(page))

  return (
    <aside className="figma-bottom-nav fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 pb-safe backdrop-blur-xl">
      <nav
        aria-label="Navegação principal"
        className="flex justify-between items-center h-16 w-full px-space-xs"
      >
        {tabs.map((tab) => {
          const active = isTabActive(tab)
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              aria-label={tab.label}
              aria-current={active ? "page" : undefined}
              className={`flex-1 flex flex-col items-center justify-center h-full gap-0.5 transition-colors ${
                active
                  ? "text-brand-700 font-semibold"
                  : "text-neutral-500 hover:text-neutral-950"
              }`}
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={active ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {tab.icon}
              </span>
              <span className="font-caption text-caption text-[11px] leading-tight">
                {tab.label}
              </span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
