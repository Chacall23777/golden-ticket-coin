import { createFileRoute, Link } from "@tanstack/react-router";
import PresaleSection from "@/components/PresaleSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pré-venda $LEGAL — Entrada Legal" },
      { name: "description", content: "Pré-venda exclusiva do $LEGAL. Sua entrada legal antes do lançamento oficial. Vagas por tempo limitado." },
      { property: "og:title", content: "Pré-venda $LEGAL — Entrada Legal" },
      { property: "og:description", content: "Pré-venda exclusiva do $LEGAL. Sua entrada legal antes do lançamento oficial." },
    ],
  }),
  component: HomePresale,
});

function HomePresale() {
  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0F" }}>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 5vw",
          background: "rgba(10,10,15,0.85)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(201,168,76,0.22)",
        }}
      >
        <div
          style={{
            fontFamily: "'Special Elite','Courier Prime','Courier New',monospace",
            fontSize: 22,
            letterSpacing: 3,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#F5F0E8",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "2px solid #C9A84C",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              color: "#C9A84C",
              fontFamily: "'IBM Plex Mono','Courier New',monospace",
              fontWeight: 700,
              transform: "rotate(-8deg)",
            }}
          >
            $L
          </div>
          LEGAL
        </div>
        <Link
          to="/legal"
          style={{
            fontFamily: "'IBM Plex Mono','Courier New',monospace",
            fontSize: 12,
            letterSpacing: 2,
            textTransform: "uppercase" as const,
            color: "#C9A84C",
            opacity: 0.85,
            textDecoration: "none",
          }}
        >
          Sobre o projeto →
        </Link>
      </nav>
      <div style={{ paddingTop: 60 }}>
        <PresaleSection />
      </div>
    </div>
  );
}
