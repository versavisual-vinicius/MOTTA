import { boolean, integer, jsonb, numeric, pgTable, text, timestamp } from "drizzle-orm/pg-core"

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const session = pgTable("session", {
  id: text("id").primaryKey(), expiresAt: timestamp("expiresAt").notNull(), token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull().defaultNow(), updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  ipAddress: text("ipAddress"), userAgent: text("userAgent"),
  userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" }),
})

export const account = pgTable("account", {
  id: text("id").primaryKey(), accountId: text("accountId").notNull(), providerId: text("providerId").notNull(),
  userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"), refreshToken: text("refreshToken"), idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"), refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: text("scope"), password: text("password"), createdAt: timestamp("createdAt").notNull().defaultNow(), updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const verification = pgTable("verification", {
  id: text("id").primaryKey(), identifier: text("identifier").notNull(), value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(), createdAt: timestamp("createdAt").defaultNow(), updatedAt: timestamp("updatedAt").defaultNow(),
})

export const appointments = pgTable("appointments", {
  id: text("id").primaryKey(), userId: text("userId").notNull(), date: text("date").notNull(), time: text("time").notNull(),
  professional: integer("professional").notNull(), services: jsonb("services").$type<number[]>().notNull().default([]), label: text("label"),
  total: numeric("total", { precision: 10, scale: 2 }).notNull(), minutes: integer("minutes").notNull(), status: text("status").notNull().default("scheduled"),
  createdAt: timestamp("createdAt").notNull().defaultNow(), updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const profiles = pgTable("profiles", {
  userId: text("userId").primaryKey(), name: text("name").notNull(), phone: text("phone").notNull().default(""), email: text("email").notNull(),
  birth: text("birth").notNull().default(""), cep: text("cep").notNull().default(""), street: text("street").notNull().default(""),
  number: text("number").notNull().default(""), complement: text("complement").notNull().default(""), district: text("district").notNull().default(""),
  city: text("city").notNull().default(""), updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const memberships = pgTable("memberships", {
  userId: text("userId").primaryKey(), planId: text("planId").notNull(), status: text("status").notNull().default("active"),
  createdAt: timestamp("createdAt").notNull().defaultNow(), updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})
