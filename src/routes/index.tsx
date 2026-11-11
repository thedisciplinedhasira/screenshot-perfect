import { createFileRoute } from "@tanstack/react-router";

import { BankHome } from "@/components/bank/BankHome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Home · CBE Mobile Banking" },
      {
        name: "description",
        content: "Check your balance, send money, pay bills and scan QR with Commercial Bank of Ethiopia.",
      },
      { property: "og:title", content: "Home · CBE Mobile Banking" },
      {
        property: "og:description",
        content: "Check your balance, send money, pay bills and scan QR with Commercial Bank of Ethiopia.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <BankHome />;
}
