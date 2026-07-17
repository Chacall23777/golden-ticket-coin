import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/hooks/useLang";
import StakeSection from "@/components/StakeSection";

export const Route = createFileRoute("/stake")({
  head: () => ({
    meta: [
      { title: "Stake $LEGAL — 8% ao mês" },
      { name: "description", content: "Staking oficial $LEGAL. 8% ao mês com rendimento diário após 24h." },
    ],
  }),
  component: StakePage,
});

function StakePage() {
  const [lang] = useLang();
  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0F" }}>
      <StakeSection lang={lang} />
    </div>
  );
}
