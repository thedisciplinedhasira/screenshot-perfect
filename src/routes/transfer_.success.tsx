import { createFileRoute } from "@tanstack/react-router";

import { SuccessScreen } from "@/components/bank/SuccessScreen";

type Search = { amount: number; name: string; account: string; remark: string; txid: string; ts: number };

export const Route = createFileRoute("/transfer_/success")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    amount: Number(s["amount"]) || 0,
    name: typeof s["name"] === "string" ? s["name"] : "",
    account: String(s["account"] ?? ""),
    remark: typeof s["remark"] === "string" ? s["remark"] : "",
    txid: String(s["txid"] ?? ""),
    ts: Number(s["ts"]) || 0,
  }),
  head: () => ({
    meta: [
      { title: "Money Sent · CBE Mobile Banking" },
      { name: "description", content: "Your CBE transfer was completed successfully." },
      { property: "og:title", content: "Money Sent · CBE Mobile Banking" },
      { property: "og:description", content: "Your CBE transfer was completed successfully." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SuccessPage,
});

function SuccessPage() {
  const receipt = Route.useSearch();
  return <SuccessScreen receipt={receipt} />;
}
