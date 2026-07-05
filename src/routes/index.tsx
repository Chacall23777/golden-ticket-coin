import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
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

type Lang = "pt" | "en";

function HomePresale() {
  const [lang, setLang] = useState<Lang>("pt");
  const aboutLabel = lang === "pt" ? "Sobre o projeto →" : "About the project →";

  const btnBase: React.CSSProperties = {
    background: "transparent",
    border: "1px solid rgba(201,168,76,0.4)",
    color: "#F5F0E8",
    padding: "6px 10px",
    borderRadius: 2,
    cursor: "pointer",
    fontSize: 11,
    letterSpacing: 1.5,
    fontFamily: "'IBM Plex Mono','Courier New',monospace",
  };
  const btnActive: React.CSSProperties = {
    ...btnBase,
    background: "#C9A84C",
    color: "#0A0A0F",
    borderColor: "#C9A84C",
  };

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
          gap: 12,
          flexWrap: "wrap",
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
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 4 }} aria-label="Language switcher">
            <button
              type="button"
              onClick={() => setLang("pt")}
              aria-pressed={lang === "pt"}
              style={lang === "pt" ? btnActive : btnBase}
            >
              PT
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
              style={lang === "en" ? btnActive : btnBase}
            >
              EN
            </button>
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
            {aboutLabel}
          </Link>
        </div>
      </nav>
      <div style={{ paddingTop: 60 }}>
        <PresaleSection lang={lang} />
        <BonusBanner lang={lang} />
      </div>
    </div>
  );
}
