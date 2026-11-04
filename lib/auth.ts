import { betterAuth } from "better-auth"
import { pool } from "@/lib/db"

function asOrigin(value?: string) {
  if (!value) return undefined
  const url = value.startsWith("http") ? value : `https://${value}`
  return new URL(url).origin
}

const localURL = `http://localhost:${process.env.PORT ?? "3000"}`
const baseURL =
  process.env.BETTER_AUTH_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined) ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ??
  process.env.V0_RUNTIME_URL ??
  (process.env.NODE_ENV === "development" ? localURL : undefined)

const developmentOrigins = [
  "http://localhost:3000",
  localURL,
  process.env.V0_RUNTIME_URL,
  process.env.V0_DEV_APP_URL,
  process.env.V0_BUILD_URL,
  process.env.V0_SANDBOX_URL,
].map(asOrigin).filter((origin): origin is string => Boolean(origin))

const productionOrigins = [process.env.VERCEL_URL, process.env.VERCEL_PROJECT_PRODUCTION_URL]
  .map(asOrigin).filter((origin): origin is string => Boolean(origin))

export const auth = betterAuth({
  database: pool,
  baseURL,
  trustedOrigins: process.env.NODE_ENV === "development" ? developmentOrigins : productionOrigins,
  emailAndPassword: { enabled: true, minPasswordLength: 8 },
  ...(process.env.NODE_ENV === "development"
    ? {
        advanced: {
          defaultCookieAttributes: {
            sameSite: "none" as const,
            secure: true,
          },
        },
      }
    : {}),
})
