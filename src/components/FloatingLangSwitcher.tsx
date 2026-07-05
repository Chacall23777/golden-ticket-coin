import { useLang } from "@/hooks/useLang";

export default function FloatingLangSwitcher() {
  const [lang, setLang] = useLang();

  const base: React.CSSProperties = {
    background: "transparent",
    border: "1px solid rgba(201,168,76,0.5)",
    color: "#F5F0E8",
    padding: "6px 10px",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 11,
    letterSpacing: 1.5,
    fontFamily: "'IBM Plex Mono','Courier New',monospace",
    fontWeight: 700,
    lineHeight: 1,
  };
  const active: React.CSSProperties = {
    ...base,
    background: "#C9A84C",
    color: "#0A0A0F",
    borderColor: "#C9A84C",
  };

  return (
    <div
      aria-label="Language switcher"
      style={{
        position: "fixed",
        top: 14,
        right: 14,
        zIndex: 9999,
        display: "flex",
        gap: 4,
        padding: 4,
        background: "rgba(10,10,15,0.75)",
        border: "1px solid rgba(201,168,76,0.28)",
        borderRadius: 6,
        backdropFilter: "blur(8px)",
      }}
    >
      <button type="button" onClick={() => setLang("pt")} aria-pressed={lang === "pt"} style={lang === "pt" ? active : base}>
        PT
      </button>
      <button type="button" onClick={() => setLang("en")} aria-pressed={lang === "en"} style={lang === "en" ? active : base}>
        EN
      </button>
    </div>
  );
}
