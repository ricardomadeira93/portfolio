"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import { Footer } from "./footer"
import { useLanguage, type SiteLanguage } from "./language-provider"
import { SiteHeader } from "./site-header"

type Block = { title: string; body: ReactNode[] }

type Copy = {
  back: string
  title: string
  context: Block
  wrong: Block
  cause: Block
  fix: { title: string; items: string[] }
  safe: Block
  tests: Block
}

const rejected = <code className="font-mono text-[0.9em]">rejected</code>

const content: Record<SiteLanguage, Copy> = {
  en: {
    back: "Back to the portfolio",
    title: "A declined card retry cancelled an order that was paid for",
    context: {
      title: "Context",
      body: [
        "The store behind an online game community sells coins and packages through Mercado Pago's hosted checkout. Payments arrive as webhooks, and a fulfilment step marks the order paid and delivers it.",
      ],
    },
    wrong: {
      title: "What went wrong",
      body: [
        <>
          The hosted checkout lets a buyer retry a declined card on the same order. The webhook
          handler treated one {rejected} payment as the end of the order and cancelled it. When the
          approved retry arrived seconds later, fulfilment refused to act on a cancelled order. The
          buyer had paid and received nothing.
        </>,
      ],
    },
    cause: {
      title: "Where it came from",
      body: [
        "The cause was in the model, not the handler. An order and a payment attempt are different things. One order can have several attempts, and only some of them end it, yet the code let a single attempt decide the state of the whole order.",
      ],
    },
    fix: {
      title: "The fix",
      items: [
        "A rejected or cancelled payment no longer cancels the order. Only money reversals (refunded, charged back) settle it. Abandoned orders are still closed by the reconciliation job, which marks them expired.",
        "An approved payment is authoritative. Fulfilment can reopen and deliver a cancelled order, but never a refunded one. That case raises a staff alert instead of delivering again.",
        "A reopened order is delivered and flagged to staff, so a deliberate cancel or a fraud hold is not overridden unnoticed.",
        "The admin Sync action can recover a cancelled order, which is how the two orders already affected were delivered.",
      ],
    },
    safe: {
      title: "Why it is safe to run twice",
      body: [
        "Marking an order paid is one update that only applies when the order is in a fulfillable status (pending, expired or cancelled), so a repeated webhook finds nothing to change. Each ledger entry carries an idempotency key. Webhooks are checked against the provider's signature with a timing-safe comparison. A payment that cleared for the wrong amount or currency is recorded and sent to staff instead of being logged and forgotten.",
      ],
    },
    tests: {
      title: "Tests",
      body: [
        "Two regression tests cover it: an approved payment still delivers an order a declined attempt cancelled, and a declined payment webhook never cancels the order.",
      ],
    },
  },
  "pt-PT": {
    back: "Voltar ao portefólio",
    title: "Uma nova tentativa com um cartão recusado cancelou uma encomenda que estava paga",
    context: {
      title: "Contexto",
      body: [
        "A loja de uma comunidade de um jogo online vende moedas e pacotes através do checkout alojado do Mercado Pago. Os pagamentos chegam por webhooks e um passo de cumprimento marca a encomenda como paga e entrega-a.",
      ],
    },
    wrong: {
      title: "O que correu mal",
      body: [
        <>
          O checkout alojado deixa o comprador tentar de novo com um cartão recusado na mesma
          encomenda. O tratamento do webhook considerava um único pagamento {rejected} como o fim da
          encomenda e cancelava-a. Quando a nova tentativa aprovada chegava, segundos depois, o
          cumprimento recusava-se a agir sobre uma encomenda cancelada. O comprador tinha pago e não
          recebia nada.
        </>,
      ],
    },
    cause: {
      title: "De onde veio",
      body: [
        "A causa estava no modelo, não no tratamento do webhook. Uma encomenda e uma tentativa de pagamento são coisas diferentes. Uma encomenda pode ter várias tentativas, e só algumas a terminam, mas o código deixava uma única tentativa decidir o estado de toda a encomenda.",
      ],
    },
    fix: {
      title: "A correção",
      items: [
        "Um pagamento rejeitado ou cancelado já não cancela a encomenda. Só as reversões de dinheiro (reembolso ou chargeback) a encerram. As encomendas abandonadas continuam a ser fechadas pela tarefa de reconciliação, que as marca como expiradas.",
        "Um pagamento aprovado é determinante. O cumprimento pode reabrir e entregar uma encomenda cancelada, mas nunca uma reembolsada. Esse caso gera um alerta para a equipa em vez de entregar de novo.",
        "Uma encomenda reaberta é entregue e assinalada à equipa, para que um cancelamento deliberado ou um bloqueio por fraude não seja anulado sem ninguém reparar.",
        "A ação Sync do painel de administração consegue recuperar uma encomenda cancelada, e foi assim que as duas encomendas já afetadas foram entregues.",
      ],
    },
    safe: {
      title: "Porque é seguro correr duas vezes",
      body: [
        "Marcar uma encomenda como paga é uma única atualização que só se aplica quando a encomenda está num estado em que pode ser cumprida (pendente, expirada ou cancelada), por isso um webhook repetido não encontra nada para alterar. Cada registo do livro de pagamentos tem uma chave de idempotência. Os webhooks são verificados contra a assinatura do fornecedor com uma comparação em tempo constante. Um pagamento aprovado com valor ou moeda errados é registado e enviado à equipa, em vez de ficar só num log.",
      ],
    },
    tests: {
      title: "Testes",
      body: [
        "Dois testes de regressão cobrem o caso: um pagamento aprovado continua a entregar uma encomenda que uma tentativa recusada cancelou, e um webhook de pagamento recusado nunca cancela a encomenda.",
      ],
    },
  },
  es: {
    back: "Volver al portafolio",
    title: "Un reintento con una tarjeta rechazada canceló un pedido que estaba pagado",
    context: {
      title: "Contexto",
      body: [
        "La tienda de una comunidad de un juego online vende monedas y paquetes con el checkout alojado de Mercado Pago. Los pagos llegan por webhooks y un paso de cumplimiento marca el pedido como pagado y lo entrega.",
      ],
    },
    wrong: {
      title: "Qué salió mal",
      body: [
        <>
          El checkout alojado permite al comprador reintentar con una tarjeta rechazada en el mismo
          pedido. El manejador del webhook trataba un solo pago {rejected} como el final del pedido y
          lo cancelaba. Cuando llegaba el reintento aprobado, segundos después, el cumplimiento se
          negaba a actuar sobre un pedido cancelado. El comprador había pagado y no recibía nada.
        </>,
      ],
    },
    cause: {
      title: "De dónde venía",
      body: [
        "La causa estaba en el modelo, no en el manejador. Un pedido y un intento de pago son cosas distintas. Un pedido puede tener varios intentos y solo algunos lo terminan, pero el código dejaba que un único intento decidiera el estado de todo el pedido.",
      ],
    },
    fix: {
      title: "La corrección",
      items: [
        "Un pago rechazado o cancelado ya no cancela el pedido. Solo las reversiones de dinero (reembolso o contracargo) lo cierran. Los pedidos abandonados los sigue cerrando la tarea de conciliación, que los marca como expirados.",
        "Un pago aprobado es determinante. El cumplimiento puede reabrir y entregar un pedido cancelado, pero nunca uno reembolsado. Ese caso genera un aviso al equipo en lugar de entregar otra vez.",
        "Un pedido reabierto se entrega y se señala al equipo, para que una cancelación deliberada o un bloqueo por fraude no se anule sin que nadie lo note.",
        "La acción Sync del panel de administración puede recuperar un pedido cancelado, y así se entregaron los dos pedidos que ya estaban afectados.",
      ],
    },
    safe: {
      title: "Por qué es seguro ejecutarlo dos veces",
      body: [
        "Marcar un pedido como pagado es una única actualización que solo se aplica si el pedido está en un estado que permite cumplirlo (pendiente, expirado o cancelado), así que un webhook repetido no encuentra nada que cambiar. Cada asiento del libro de pagos lleva una clave de idempotencia. Los webhooks se comprueban contra la firma del proveedor con una comparación de tiempo constante. Un pago que se aprobó con un importe o una moneda incorrectos se registra y se avisa al equipo, en lugar de quedarse en un log.",
      ],
    },
    tests: {
      title: "Pruebas",
      body: [
        "Dos pruebas de regresión lo cubren: un pago aprobado sigue entregando un pedido que un intento rechazado canceló, y un webhook de pago rechazado nunca cancela el pedido.",
      ],
    },
  },
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-medium tracking-tight">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground">{children}</div>
    </section>
  )
}

export function PaymentRetriesCase() {
  const { language } = useLanguage()
  const t = content[language]

  return (
    <>
      <SiteHeader />
      <main>
        <article className="mx-auto max-w-2xl px-4 py-14 sm:px-6 md:py-20">
          <Link
            href="/#projects"
            className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            ← {t.back}
          </Link>

          <h1 className="mt-8 text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
            {t.title}
          </h1>

          <Section title={t.context.title}>
            {t.context.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Section>

          <Section title={t.wrong.title}>
            {t.wrong.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Section>

          <Section title={t.cause.title}>
            {t.cause.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Section>

          <Section title={t.fix.title}>
            <ul className="space-y-3">
              {t.fix.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 bg-accent"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title={t.safe.title}>
            {t.safe.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Section>

          <Section title={t.tests.title}>
            {t.tests.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Section>
        </article>
      </main>
      <Footer />
    </>
  )
}
