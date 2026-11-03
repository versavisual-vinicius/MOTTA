import { useEffect, useRef, useState } from "react"
import { A } from "../data"

export function PageHeading({
  eyebrow,
  title,
  description,
  serif = false,
}: {
  eyebrow: string
  title: string
  description: string
  serif?: boolean
}) {
  return (
    <div className="page-heading">
      <p>{eyebrow}</p>
      <h1 className={serif ? "serif" : ""}>{title}</h1>
      <span>{description}</span>
    </div>
  )
}

export function Toggle({
  label,
  initial = true,
}: {
  label: string
  initial?: boolean
}) {
  const [on, setOn] = useState(initial)
  return (
    <button
      className={`toggle ${on ? "on" : ""}`}
      aria-pressed={on}
      aria-label={label}
      onClick={() => setOn(!on)}
    >
      <span />
    </button>
  )
}

export function CancelAppointmentModal({
  close,
  confirm,
}: {
  close: () => void
  confirm: () => void
}) {
  const dialogRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    const dialog = dialogRef.current
    dialog?.querySelector<HTMLButtonElement>("button")?.focus()
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        close()
        return
      }
      if (event.key !== "Tab" || !dialog) return
      const buttons = Array.from(
        dialog.querySelectorAll<HTMLButtonElement>("button:not(:disabled)"),
      )
      if (!buttons.length) return
      const first = buttons[0]
      const last = buttons[buttons.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => {
      window.removeEventListener("keydown", handleKey)
      previous?.focus()
    }
  }, [close])

  return (
    <div className="modal-backdrop" onClick={close}>
      <section
        className="cancel-modal"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cancel-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          aria-label="Fechar janela"
          onClick={close}
        >
          ✕
        </button>
        <header>
          <span className="warning-icon" aria-hidden="true">
            ⚠
          </span>
          <div>
            <h2 id="cancel-title">Cancelar este agendamento?</h2>
            <p>
              Ao confirmar, seu horário será liberado imediatamente para outros
              clientes.
            </p>
          </div>
        </header>
        <article className="modal-appointment-summary">
          <img src={`${A}/michel-nogueira.png`} alt="" />
          <div>
            <strong>Corte Masculino &amp; Barba Terapia</strong>
            <span>Sexta-feira, 24 de Outubro às 15:30 • Michel Nogueira</span>
          </div>
        </article>
        <div className="modal-policy-notice">
          <strong>Política de Cancelamento:</strong> Você pode cancelar
          gratuitamente com até 2 horas de antecedência.
        </div>
        <footer>
          <button onClick={close}>Voltar e manter agendamento</button>
          <button className="danger-button" onClick={confirm}>
            □ Confirmar cancelamento
          </button>
        </footer>
      </section>
    </div>
  )
}
