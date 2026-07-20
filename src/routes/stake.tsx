import { createFileRoute } from "@tanstack/react-router";
import GoldenTicketStake from "@/components/GoldenTicketStake";

export const Route = createFileRoute("/stake")({
  head: () => ({
    meta: [
      { title: "Golden Ticket Coin — Stake $LEGAL" },
      { name: "description", content: "Golden Ticket Coin. Official $LEGAL staking platform on Solana." },
    ],
  }),
  component: StakePage,
});

function StakePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0F" }}>
      <GoldenTicketStake />
    </div>
  );
}
