import { useLang } from "@/hooks/useLang";
import { TrendingUp, Clock, Unlock } from "lucide-react";
import dogeOfficer from "@/assets/doge-officer.png";

const STAKING_URL = "https://legalstake.multitoken.top/";

const T = {
  pt: {
    eyebrow: "STAKE OFICIAL $LEGAL",
    title: "Solana · Entrada 100% Legal",
    intro: "A porta certa sempre abre.\n$LEGAL nasceu de uma ideia simples: o caminho certo deveria ser o caminho fácil. Sem atalho, sem burocracia escondida, sem letra miúda — só um carimbo de aprovado e seguir em frente.",
    benefits: [
      { icon: TrendingUp, text: "8% ao mês de rendimento" },
      { icon: Clock, text: "Rende diariamente após 24 horas de carência" },
      { icon: Unlock, text: "Saque quando quiser com apenas 3% de taxa" },
    ],
    badge: "Aprovado 100% Legal",
    cta: "ACESSAR STAKING OFICIAL",
    ctaSub: "Abre em nova aba para a plataforma oficial de staking.",
  },
  en: {
    eyebrow: "OFFICIAL $LEGAL STAKE",
    title: "Solana · 100% Legal Entry",
    intro: "The right door is always open.\n$LEGAL was born from a simple idea: the right path should be the easy path. No shortcuts, no hidden bureaucracy, no fine print — just an approved stamp and move forward.",
    benefits: [
      { icon: TrendingUp, text: "8% monthly yield" },
      { icon: Clock, text: "Daily rewards after a 24-hour grace period" },
      { icon: Unlock, text: "Withdraw anytime with only a 3% fee" },
    ],
    badge: "100% Legal Approved",
    cta: "ACCESS OFFICIAL STAKING",
    ctaSub: "Opens in a new tab on the official staking platform.",
  },
};

export default function HomeStakeSection() {
  const [lang] = useLang();
  const t = T[lang];

  return (
    <section className="relative py-28 px-6 overflow-hidden" style={{ background: "#0A0A0F" }}>
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 30%, #C9A84C 0%, transparent 60%)" }}
      />
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div
            className="inline-block px-5 py-2 border border-[#C9A84C] text-[#C9A84C] text-xs tracking-[0.2em] mb-5"
            style={{ fontFamily: "'IBM Plex Mono','Courier New',monospace" }}
          >
            {t.eyebrow}
          </div>
          <h2
            className="text-4xl md:text-6xl font-bold mb-8 text-[#F5F0E8]"
            style={{ fontFamily: "'Special Elite','Courier Prime','Courier New',monospace" }}
          >
            {t.title}
          </h2>
          <div className="max-w-3xl mx-auto">
            {t.intro.split("\n").map((line, i) => (
              <p
                key={i}
                className={`text-lg md:text-2xl leading-relaxed ${i === 0 ? "text-[#F5F0E8] mb-4" : "text-[#F5F0E8]/80"}`}
                style={{ fontFamily: i === 0 ? "'Special Elite','Courier Prime','Courier New',monospace" : undefined }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            {t.benefits.map((b, i) => (
              <div
                key={i}
                className="flex items-center gap-5 bg-[#1A1A1F] border border-[#C9A84C]/30 rounded-xl p-6"
              >
                <div className="shrink-0 w-12 h-12 rounded-lg bg-[#C9A84C]/10 border border-[#C9A84C]/40 flex items-center justify-center text-[#C9A84C]">
                  <b.icon size={24} strokeWidth={1.5} />
                </div>
                <p className="text-lg md:text-xl text-[#F5F0E8]">{b.text}</p>
              </div>
            ))}
          </div>

          <div className="relative flex justify-center">
            <div className="relative">
              <div
                className="absolute -top-4 -left-4 md:-top-6 md:-left-6 z-10 px-4 py-2 md:px-6 md:py-3 bg-[#C9A84C] text-[#0A0A0F] font-bold text-sm md:text-base rounded-lg shadow-lg border border-[#C9A84C]"
                style={{ fontFamily: "'IBM Plex Mono','Courier New',monospace", letterSpacing: 1 }}
              >
                {t.badge}
              </div>
              <img
                src={dogeOfficer}
                alt="Doge officer approving $LEGAL passports"
                className="w-full max-w-md rounded-2xl border border-[#C9A84C]/30 shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="text-center">
          <a
            href={STAKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#C9A84C] hover:bg-[#d4b46a] text-[#0A0A0F] font-bold py-6 px-12 md:px-16 rounded-xl text-xl md:text-2xl transition-all"
            style={{ fontFamily: "'IBM Plex Mono','Courier New',monospace", letterSpacing: 2 }}
          >
            {t.cta}
          </a>
          <p className="mt-4 text-sm text-[#F5F0E8]/60">{t.ctaSub}</p>
        </div>
      </div>
    </section>
  );
}
