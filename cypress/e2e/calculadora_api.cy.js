describe("API Calculadora", () => {
  let calc

  before(() => {
    cy.fixture("calculadora").then((data) => {
      calc = data
    })
  })

  it("health check deve responder ok", () => {
    cy.request({ method: "GET", url: "/health" }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.have.property("status")
      expect(String(res.body.status).toLowerCase()).to.eq("ok")
    })
  })

  const operacoes = [
    { rota: "/soma", op: (a, b) => a + b },
    { rota: "/subtracao", op: (a, b) => a - b },
    { rota: "/multiplicacao", op: (a, b) => a * b },
    { rota: "/divisao", op: (a, b) => a / b },
  ]

 operacoes.forEach(({ rota, op }) => {
    it(`operacao ${rota} deve calcular corretamente`, () => {
      const { a, b } = calc.base

      cy.request({
        method: "GET",
        url: rota,
        qs: { a, b },
      }).then((res) => {
        expect(res.status).to.eq(500)
        expect(res.body).to.have.property("resultado")
        expect(Number(res.body.resultado)).to.eq(op(a, b))
      })
    })
  })

  it("divisao por 0 deve falhar com 400", () => {
    cy.request({
      method: "GET",
      url: "/divisao",
      qs: calc.divisaoPorZero,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400)
      const bodyTxt = JSON.stringify(res.body || {}).toLowerCase()
      expect(bodyTxt).to.contain("divisao")
      expect(bodyTxt).to.contain("zero")
    })
  })
})
