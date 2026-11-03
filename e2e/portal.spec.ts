import { expect, test, type Page } from "@playwright/test"

const routes = [
  ["/", /Olá/],
  ["/agendamentos", /Gerencie seus agendamentos/],
  ["/agendamentos/novo", /Escolha os Serviços/],
  ["/agendamentos/ag-1001", /Detalhes do agendamento/],
  ["/clube", /./],
  ["/planos", /Escolha o seu plano/],
  ["/planos/gold-3", /Clube Gold 3/],
  ["/checkout?plano=gold-3", /Revise e confirme/],
  ["/perfil", /Seu perfil/],
  ["/perfil/seguranca", /Segurança e notificações/],
] as const

test.describe("rotas", () => {
  for (const [path, text] of routes) {
    test(`deep link ${path}`, async ({ page }) => {
      const errors: string[] = []
      page.on("pageerror", (e) => errors.push(e.message))
      page.on("console", (m) => m.type() === "error" && errors.push(m.text()))
      await page.goto(path)
      await expect(page.locator("main.page")).toContainText(text)
      expect(errors).toEqual([])
    })
  }

  test("404 e id inexistente", async ({ page }) => {
    await page.goto("/rota-inexistente")
    await expect(page.getByText("Página não encontrada")).toBeVisible()
    await page.goto("/agendamentos/xxx")
    await expect(page.getByText("Agendamento não encontrada")).toBeVisible()
    await page.goto("/planos/xxx")
    await expect(page.getByText("Plano não encontrada")).toBeVisible()
  })

  test("voltar/avançar e hash legado", async ({ page }) => {
    await page.goto("/")
    await page
      .getByRole("navigation", { name: "Navegação principal" })
      .getByRole("button", { name: "Agendamentos" })
      .click()
    await expect(page).toHaveURL(/\/agendamentos$/)
    await page
      .getByRole("navigation", { name: "Navegação principal" })
      .getByRole("button", { name: "Planos" })
      .click()
    await expect(page).toHaveURL(/\/planos$/)
    await page.goBack()
    await expect(page).toHaveURL(/\/agendamentos$/)
    await page.goForward()
    await expect(page).toHaveURL(/\/planos$/)
    await page.goto("/#plans")
    await expect(page).toHaveURL(/\/planos$/)
  })

  test("aria-current na navegação", async ({ page }) => {
    await page.goto("/planos")
    await expect(
      page.getByRole("navigation", { name: "Navegação principal" }).locator("button[aria-current=page]"),
    ).toHaveText(/Planos/)
  })
})

async function pickServices(page: Page) {
  await page
    .getByRole("button", { name: /Corte Masculino Tradicional/ })
    .click()
  await page.getByRole("button", { name: /Barba Terapia/ }).click()
}
const next = (page: Page) =>
  page.locator("aside.booking-summary button.primary")

async function toStep4(page: Page) {
  await page.goto("/agendamentos/novo")
  await pickServices(page)
  await next(page).click()
  await page.getByRole("button", { name: /Maycon Angelo/ }).click()
  await next(page).click()
  await page.locator(".date-row button").nth(1).click()
  await page.locator(".times button", { hasText: "15:00" }).click()
  await next(page).click()
}

test.describe("agendamento", () => {
  test("AG01 sem serviço", async ({ page }) => {
    await page.goto("/agendamentos/novo")
    await next(page).click()
    await expect(page.getByRole("alert")).toContainText("Selecione ao menos")
    await expect(page.getByText("Escolha os Serviços")).toBeVisible()
  })

  test("AG02 múltiplos serviços", async ({ page }) => {
    await page.goto("/agendamentos/novo")
    await pickServices(page)
    const summary = page.locator("aside.booking-summary")
    await expect(summary).toContainText("65 min")
    await expect(summary).toContainText("83,00")
    await expect(summary).toContainText("32,30")
    await page.getByRole("button", { name: /Barba Terapia/ }).click()
    await expect(summary).toContainText("35 min")
  })

  test("AG03 sem barbeiro", async ({ page }) => {
    await page.goto("/agendamentos/novo")
    await pickServices(page)
    await next(page).click()
    await next(page).click()
    await expect(page.getByRole("alert")).toContainText("profissional")
  })

  test("AG04 resumo fiel", async ({ page }) => {
    await toStep4(page)
    const d = new Date()
    d.setDate(d.getDate() + 2)
    const main = page.locator(".review-cards")
    await expect(main).toContainText("15:00")
    await expect(main).toContainText("Maycon Angelo")
    await expect(main).toContainText(String(d.getDate()))
    await expect(main).toContainText("Corte Masculino Tradicional")
  })

  test("AG05/AG06 aceite e criação", async ({ page }) => {
    await toStep4(page)
    await next(page).click()
    await expect(page.getByRole("alert")).toContainText("aceite")
    await expect(page.getByText("Revisão e Confirmação")).toBeVisible()
    await page.getByRole("checkbox").check()
    await next(page).click()
    await expect(page.getByText("Agendamento simulado!")).toBeVisible()
    await page.getByRole("button", { name: "Ver meus agendamentos" }).click()
    await expect(page.locator(".upcoming-card")).toHaveCount(2)
  })

  test("AG07 reagendar", async ({ page }) => {
    await page.goto("/agendamentos")
    await page.getByRole("button", { name: "Reagendar" }).first().click()
    await expect(page).toHaveURL(/agendamentos\/novo/)
    const summary = page.locator("aside.booking-summary")
    await expect(summary).toContainText("Michel Nogueira")
    await expect(summary).toContainText("Corte Masculino Tradicional")
    await next(page).click()
    await expect(page.getByRole("alert")).toContainText("data")
    await page.locator(".date-row button").nth(3).click()
    await page.locator(".times button", { hasText: "10:30" }).click()
    await next(page).click()
    await page.getByRole("checkbox").check()
    await next(page).click()
    await expect(page.getByText("Reagendamento simulado!")).toBeVisible()
    await page.getByRole("button", { name: "Ver meus agendamentos" }).click()
    await expect(page.locator(".upcoming-card")).toHaveCount(1)
    await expect(page.locator(".upcoming-card")).toContainText("10:30")
  })

  test("AG08 cancelar", async ({ page }) => {
    await page.goto("/agendamentos")
    await page.getByRole("button", { name: "Cancelar", exact: true }).click()
    await expect(page.getByRole("dialog")).toBeVisible()
    await page.getByRole("button", { name: /Confirmar cancelamento/ }).click()
    await expect(page.getByText("Você ainda não tem nenhum")).toBeVisible()
    await page.getByRole("button", { name: "Anteriores" }).click()
    await expect(page.getByText("Cancelado").first()).toBeVisible()
  })
})

test.describe("assinatura e perfil", () => {
  test("AS01 selecionar plano", async ({ page }) => {
    await page.goto("/planos")
    await page.getByRole("button", { name: "Comprar plano" }).first().click()
    await expect(page).toHaveURL(/checkout\?plano=gold-3/)
    await expect(page.locator("main.page")).toContainText("Clube Gold 3")
    await expect(page.locator("main.page")).toContainText("229,99")
  })

  test("AS02/AS03 checkout", async ({ page }) => {
    const requests: string[] = []
    page.on("request", (r) => {
      if (r.method() !== "GET") requests.push(r.url())
    })
    await page.goto("/checkout?plano=gold-2")
    const confirm = page.getByRole("button", { name: /Confirmar assinatura/ })
    await confirm.click()
    await expect(page.getByRole("alert")).toContainText("aceite")
    await page.getByRole("checkbox").check()
    await confirm.click()
    await expect(page.getByText("Assinatura simulada ativada")).toBeVisible()
    expect(requests).toEqual([])
  })

  test("PR01 perfil", async ({ page }) => {
    await page.goto("/perfil")
    await page.getByLabel("Nome completo").fill("Fulano Teste")
    await page.getByRole("button", { name: "Salvar alterações" }).click()
    await expect(page.locator(".profile-hero h2")).toHaveText("Fulano Teste")
    await expect(page.locator(".user-chip")).toContainText("Fulano Teste")
  })
})

test.describe("responsivo e acessibilidade", () => {
  test("RS01 375px", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 })
    await page.goto("/agendamentos/novo")
    const sidebar = await page.locator("aside.sidebar").boundingBox()
    expect(sidebar!.y + sidebar!.height).toBeGreaterThan(780)
    expect(sidebar!.width).toBeGreaterThan(360)
    const cols = await page
      .locator(".booking-layout")
      .evaluate(
        (el) => getComputedStyle(el).gridTemplateColumns.split(" ").length,
      )
    expect(cols).toBe(1)
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    )
    expect(overflow).toBe(false)
  })

  test("AC01 teclado e foco visível", async ({ page }) => {
    await page.goto("/")
    for (let i = 0; i < 4; i++) await page.keyboard.press("Tab")
    const outline = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement
      return {
        tag: el.tagName,
        width: getComputedStyle(el).outlineWidth,
        style: getComputedStyle(el).outlineStyle,
      }
    })
    expect(["BUTTON", "A", "INPUT"]).toContain(outline.tag)
    expect(outline.style).not.toBe("none")
    await page.keyboard.press("Enter")
  })

  test("AC02 reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" })
    await page.goto("/")
    const d = await page
      .locator("button")
      .first()
      .evaluate((el) => getComputedStyle(el).transitionDuration)
    expect(parseFloat(d)).toBeLessThan(0.01)
  })
})
