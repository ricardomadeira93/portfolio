import type { Metadata } from "next"
import { PaymentRetriesCase } from "@/components/payment-retries-case"

export const metadata: Metadata = {
  title: "A declined card retry cancelled an order that was paid for | Ricardo Madeira",
  description:
    "A case study on payment retries: a webhook treated one declined attempt as the end of an order, so an approved retry paid for nothing. How the order and payment model was changed, and why the fix is safe to run twice.",
  alternates: { canonical: "/case-studies/payment-retries" },
  openGraph: {
    type: "article",
    url: "/case-studies/payment-retries",
    title: "A declined card retry cancelled an order that was paid for",
    siteName: "Ricardo Madeira",
  },
}

export default function Page() {
  return <PaymentRetriesCase />
}
