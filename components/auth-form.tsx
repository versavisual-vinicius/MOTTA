"use client"

import Link from "next/link"
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"

export function AuthForm({ mode }: { mode: "sign-in" | "sign-up" }) {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")
  const isSignUp = mode === "sign-up"

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setError("")
    const data = new FormData(event.currentTarget)
    const email = String(data.get("email"))
    const password = String(data.get("password"))
    const result = isSignUp
      ? await authClient.signUp.email({ email, password, name: String(data.get("name")) })
      : await authClient.signIn.email({ email, password })
    setPending(false)
    if (result.error) {
      setError("Não foi possível acessar sua conta. Confira os dados e tente novamente.")
      return
    }
      window.location.assign("/")
  }

  return (
    <main className="auth-shell">
      <section className="auth-card" aria-labelledby="auth-title">
        <div className="auth-mark" aria-hidden="true">M</div>
        <p className="auth-eyebrow">Barbearia Motta</p>
        <h1 id="auth-title">{isSignUp ? "Crie sua conta" : "Bem-vindo de volta"}</h1>
        <p className="auth-copy">{isSignUp ? "Agende horários e acompanhe seus benefícios." : "Entre para gerenciar seus próximos horários."}</p>
        <form onSubmit={onSubmit} className="auth-form">
          {isSignUp ? <label>Nome completo<input name="name" autoComplete="name" required /></label> : null}
          <label>E-mail<input name="email" type="email" autoComplete="email" required /></label>
          <label>Senha<input name="password" type="password" autoComplete={isSignUp ? "new-password" : "current-password"} minLength={8} required /></label>
          {error ? <p className="auth-error" role="alert">{error}</p> : null}
          <button type="submit" disabled={pending}>{pending ? "Aguarde…" : isSignUp ? "Criar conta" : "Entrar"}</button>
        </form>
        <p className="auth-switch">{isSignUp ? "Já tem uma conta?" : "Ainda não tem conta?"} <Link href={isSignUp ? "/entrar" : "/criar-conta"}>{isSignUp ? "Entrar" : "Criar conta"}</Link></p>
      </section>
    </main>
  )
}
