import { createFileRoute, Link } from "@tanstack/react-router";
import PresaleSection from "@/components/PresaleSection";
import { useLang } from "@/hooks/useLang";

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
  const [lang, setLang] = useLang();
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
      <style>{`
        @keyframes pulseGold {
          0%, 100% { box-shadow: 0 0 0 2px #C9A84C, 0 0 20px rgba(201,168,76,0.55); }
          50% { box-shadow: 0 0 0 3px #C9A84C, 0 0 40px rgba(201,168,76,0.85); }
        }
        @keyframes rainbowPulse {
          0% { background: #C9A84C; box-shadow: 0 0 0 2px #C9A84C, 0 0 15px rgba(201,168,76,0.5); }
          25% { background: #1A6B3A; box-shadow: 0 0 0 2px #1A6B3A, 0 0 25px rgba(26,107,58,0.7); }
          50% { background: #8B1A1A; box-shadow: 0 0 0 2px #8B1A1A, 0 0 25px rgba(139,26,26,0.7); }
          75% { background: #C9A84C; box-shadow: 0 0 0 2px #C9A84C, 0 0 15px rgba(201,168,76,0.5); }
          100% { background: #C9A84C; box-shadow: 0 0 0 2px #C9A84C, 0 0 15px rgba(201,168,76,0.5); }
        }
      `}</style>
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
          <a
            href="https://privatesale.multitoken.top/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'IBM Plex Mono','Courier New',monospace",
              fontSize: 12,
              letterSpacing: 2,
              textTransform: "uppercase" as const,
              color: "#0A0A0F",
              background: "#C9A84C",
              padding: "8px 16px",
              borderRadius: 2,
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            {lang === "pt" ? "Compra e Retire" : "Buy and Claim"}
          </a>
          <Link
            to="/legal"
            style={{
              fontFamily: "'IBM Plex Mono','Courier New',monospace",
              fontSize: 13,
              letterSpacing: 2,
              textTransform: "uppercase" as const,
              color: "#0A0A0F",
              background: "#C9A84C",
              padding: "8px 16px",
              borderRadius: 2,
              textDecoration: "none",
              fontWeight: 700,
              animation: "rainbowPulse 1.2s ease-in-out infinite",
              boxShadow: "0 0 0 2px #C9A84C",
            }}
          >
            {aboutLabel}
          </Link>
          <Link
            to="/stake"
            style={{
              fontFamily: "'IBM Plex Mono','Courier New',monospace",
              fontSize: 13,
              letterSpacing: 2,
              textTransform: "uppercase" as const,
              color: "#0A0A0F",
              background: "#C9A84C",
              padding: "8px 16px",
              borderRadius: 2,
              textDecoration: "none",
              fontWeight: 700,
              boxShadow: "0 0 0 2px #C9A84C, 0 0 20px rgba(201,168,76,0.55)",
              animation: "pulseGold 1.6s ease-in-out infinite",
            }}
          >
            {lang === "pt" ? "Staking" : "Staking"}
          </Link>
        </div>
      </nav>
      <div style={{ paddingTop: 60 }}>
        <PresaleSection lang={lang} />
      </div>
    </div>
  );
}
