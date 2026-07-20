import { useLang } from "@/hooks/useLang";

const STAKING_URL = "https://legalstake.multitoken.top/";

const T = {
  pt: {
    brand: "Golden Ticket Coin",
    welcome: "Bem-vindo ao projeto!",
    headline: "Solana · Entrada 100% Legal",
    subline: "Plataforma oficial de staking do $LEGAL",
    cta: "🌟 ACESSAR LEGALSTAKE AGORA",
  },
  en: {
    brand: "Golden Ticket Coin",
    welcome: "Welcome to the project!",
    headline: "Solana · 100% Legal Entry",
    subline: "Official $LEGAL staking platform",
    cta: "🌟 ACCESS LEGALSTAKE NOW",
  },
};

export default function GoldenTicketStake() {
  const [lang] = useLang();
  const t = T[lang];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
      style={{ background: "#0A0A0F", color: "#E8E4DC", fontFamily: "'IBM Plex Sans', Arial, sans-serif" }}
    >
      <div className="max-w-2xl w-full text-center space-y-6 mb-16">
        <h1
          className="text-4xl md:text-6xl font-bold tracking-tight"
          style={{ color: "#C9A84C", fontFamily: "'Special Elite','Courier Prime','Courier New',monospace" }}
        >
          {t.brand}
        </h1>
        <p className="text-lg md:text-xl text-[#E8E4DC]/70">{t.welcome}</p>
      </div>

      <div
        className="w-full max-w-3xl rounded-2xl p-8 md:p-16 text-center shadow-2xl"
        style={{
          background: "linear-gradient(135deg, #C9A84C 0%, #8E7430 100%)",
          color: "#0A0A0F",
        }}
      >
        <h2
          className="text-3xl md:text-5xl font-bold mb-4"
          style={{ fontFamily: "'Special Elite','Courier Prime','Courier New',monospace" }}
        >
          {t.headline}
        </h2>
        <p className="text-lg md:text-2xl font-medium mb-8 opacity-90">
          {t.subline}
        </p>

        <a
          href={STAKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#0A0A0F] text-[#C9A84C] font-bold rounded-xl text-lg md:text-2xl transition-transform hover:scale-105 hover:shadow-2xl"
          style={{ padding: "22px 48px", textDecoration: "none" }}
        >
          {t.cta}
        </a>
      </div>
    </div>
  );
}
