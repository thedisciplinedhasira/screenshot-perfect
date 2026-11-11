import { createFileRoute } from "@tanstack/react-router";

import { TransferScreen } from "@/components/bank/TransferScreen";

export const Route = createFileRoute("/transfer")({
  head: () => ({
    meta: [
      { title: "CBE Transfer · CBE Mobile Banking" },
      { name: "description", content: "Send money to any Commercial Bank of Ethiopia account." },
      { property: "og:title", content: "CBE Transfer · CBE Mobile Banking" },
      { property: "og:description", content: "Send money to any Commercial Bank of Ethiopia account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TransferScreen,
});
