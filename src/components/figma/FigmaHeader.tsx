import React from "react"
import { useStore } from "../../app-state"
import type { Page, Navigate } from "../../types"

export function FigmaHeader({
  page,
  onBack,
  onNavigate,
}: {
  page: Page
  onBack?: () => void
  onNavigate: Navigate
}) {
  const { profile } = useStore()

  if (page === "booking") {
    return (
      <header className="figma-mobile-header sticky top-0 inset-x-0 z-50 backdrop-blur-xl pt-safe">
        <div className="h-16 px-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={onBack}
              aria-label="Voltar"
              className="w-10 h-10 -ml-1 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-2xl">arrow_back</span>
            </button>
            <div className="flex flex-col min-w-0">
              <h1 className="font-headline-sm-mobile text-headline-sm-mobile text-on-surface truncate">
                Novo Agendamento
              </h1>
              <span className="font-caption text-caption text-neutral-500">
                Unidade Sol &amp; Mar
              </span>
            </div>
          </div>
          <button
            onClick={() => onNavigate("profile")}
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary overflow-hidden shadow-sm"
            aria-label="Meu perfil"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>
        </div>
      </header>
    )
  }

  return (
    <header className="figma-mobile-header sticky top-0 inset-x-0 z-50 pt-safe backdrop-blur-xl">
      <div className="h-16 px-gutter-mobile flex items-center justify-between">
        <div
          onClick={() => onNavigate("home")}
          role="button"
          tabIndex={0}
          className="flex items-center gap-space-sm cursor-pointer select-none"
        >
          <div className="w-9 h-9 rounded-lg bg-brand-950 flex items-center justify-center text-accent-gold shadow-[0_2px_8px_rgba(7,30,19,0.2)]">
            <span className="material-symbols-outlined text-[20px]">content_cut</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-[18px] tracking-tight text-brand-950 leading-none">
              Motta
            </span>
            <span className="font-caption text-caption text-neutral-500 uppercase tracking-widest text-[9px] -mt-0.5 font-semibold">
              Portal do Cliente
            </span>
          </div>
        </div>

        <div className="flex items-center gap-space-xs">
          <button
            aria-label="Notificações: nenhuma nova"
            className="w-11 h-11 flex items-center justify-center rounded-full text-neutral-700 hover:text-brand-950 active:scale-95 transition-all"
            title="Sem notificações"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
          </button>
          <div className="flex items-center gap-space-xs pl-space-xs">
            <button
              onClick={() => onNavigate("profile")}
              className="user-chip flex items-center gap-2 p-1 rounded-full hover:bg-surface-container active:scale-95 transition-all"
              aria-label="Meu perfil"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary overflow-hidden shadow-sm">
                <span className="material-symbols-outlined text-[18px]">person</span>
              </div>
              <span className="hidden text-xs font-semibold text-neutral-950 pr-2">
                {profile.name}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
