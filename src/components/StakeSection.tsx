import { useLang } from "@/hooks/useLang";
import { TrendingUp, Clock, Unlock, Layers } from "lucide-react";

const STAKING_URL = "https://legalstake.multitoken.top/";

const T = {
  pt: {
    process: "PROCESSO Nº LE-2026-003",
    title: "STAKE $LEGAL",
    subtitle: "Entrada 100% Legal • Rendimento Diário",
    introHighlight: "A porta certa sempre abre.",
    intro: "$LEGAL nasceu de uma ideia simples: o caminho certo deveria ser o caminho fácil. Sem atalho, sem burocracia escondida, sem letra miúda — só um carimbo de aprovado e seguir em frente.",
    benefitsTitle: "Por que fazer Stake de $LEGAL?",
    benefits: [
      {
        icon: TrendingUp,
        label: "8% ao mês",
        desc: "Rendimento fixo e previsível sobre seu saldo em stake.",
      },
      {
        icon: Clock,
        label: "Rende diariamente",
        desc: "Após 24 horas de carência, seus rendimentos começam a ser creditados todos os dias.",
      },
      {
        icon: Unlock,
        label: "Saque quando quiser",
        desc: "Liquidez sob demanda com apenas 1% de taxa de saída.",
      },
      {
        icon: Layers,
        label: "Rede Solana",
        desc: "Rapidez, baixo custo e segurança de uma blockchain consolidada.",
      },
    ],
    cta: "ACESSAR STAKING OFICIAL",
    ctaSub: "Você será redirecionado para a plataforma oficial de staking em uma nova aba.",
    footer: "Staking sujeito aos termos oficiais da plataforma. Rentabilidade passada não garante ganhos futuros.",
  },
  en: {
    process: "CASE NO. LE-2026-003",
    title: "STAKE $LEGAL",
    subtitle: "100% Legal Entry • Daily Yield",
    introHighlight: "The right door is always open.",
    intro: "$LEGAL was born from a simple idea: the right path should be the easy path. No shortcuts, no hidden bureaucracy, no fine print — just an approved stamp and move forward.",
    benefitsTitle: "Why stake $LEGAL?",
    benefits: [
      {
        icon: TrendingUp,
        label: "8% per month",
        desc: "Fixed and predictable yield on your staked balance.",
      },
      {
        icon: Clock,
        label: "Daily rewards",
        desc: "After a 24-hour grace period, your rewards are credited every day.",
      },
      {
        icon: Unlock,
        label: "Withdraw anytime",
        desc: "On-demand liquidity with only a 1% exit fee.",
      },
      {
        icon: Layers,
        label: "Solana Network",
        desc: "Speed, low cost and security of an established blockchain.",
      },
    ],
    cta: "ACCESS OFFICIAL STAKING",
    ctaSub: "You will be redirected to the official staking platform in a new tab.",
    footer: "Staking is subject to the platform's official terms. Past performance does not guarantee future returns.",
  },
};

export default function StakeSection() {
  const [lang] = useLang();
  const t = T[lang];

  return (
    <div className="min-h-screen text-[#F5F0E8] overflow-hidden" style={{ background: "#0A0A0F" }}>
      <style>{`
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(201,168,76,0.4), 0 0 40px rgba(201,168,76,0.3); }
          50% { box-shadow: 0 0 0 8px rgba(201,168,76,0), 0 0 80px rgba(201,168,76,0.6); }
        }
        @keyframes textFlicker {
          0%, 100% { opacity: 1; text-shadow: 0 0 20px rgba(201,168,76,0.4); }
          50% { opacity: 0.92; text-shadow: 0 0 40px rgba(201,168,76,0.8); }
        }
        @keyframes borderRun {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <section className="relative pt-28 pb-16 px-6">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 0%, rgba(201,168,76,0.22), transparent 55%)",
          }}
        />
        <div className="relative max-w-5xl mx-auto text-center">
          <div
            className="inline-block px-6 py-2 border border-[#C9A84C] text-[#C9A84C] text-sm tracking-[0.2em] mb-8"
            style={{ fontFamily: "'IBM Plex Mono','Courier New',monospace" }}
          >
            {t.process}
          </div>
          <h1
            className="text-7xl md:text-9xl font-bold mb-6 leading-[0.95]"
            style={{
              fontFamily: "'Special Elite','Courier Prime','Courier New',monospace",
              animation: "textFlicker 2s ease-in-out infinite",
              color: "#F5F0E8",
            }}
          >
            {t.title}
          </h1>
          <p className="text-2xl md:text-4xl text-[#C9A84C] font-light tracking-wide">
            {t.subtitle}
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <p
            className="text-4xl md:text-5xl text-[#F5F0E8] leading-relaxed"
            style={{ fontFamily: "'Special Elite','Courier Prime','Courier New',monospace" }}
          >
            {t.introHighlight}
          </p>
          <p className="text-lg md:text-2xl text-[#F5F0E8]/80 leading-relaxed max-w-3xl mx-auto">
            {t.intro}
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent mx-auto" />
        </div>
      </section>

      <section className="px-6 pb-28">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-center text-3xl md:text-5xl font-bold mb-16 text-[#F5F0E8]"
            style={{ fontFamily: "'Special Elite','Courier Prime','Courier New',monospace" }}
          >
            {t.benefitsTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {t.benefits.map((b, i) => (
              <div
                key={i}
                className="group relative bg-[#1A1A1F] border border-[#C9A84C]/30 rounded-2xl p-8 md:p-10 transition-all hover:border-[#C9A84C] hover:bg-[#14141A]"
              >
                <div className="flex items-start gap-6">
                  <div className="shrink-0 w-14 h-14 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/40 flex items-center justify-center text-[#C9A84C]">
                    <b.icon size={28} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#C9A84C] mb-3">
                      {b.label}
                    </h3>
                    <p className="text-base md:text-lg text-[#F5F0E8]/80 leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-28">
        <div className="max-w-3xl mx-auto rounded-2xl p-10 md:p-16 text-center space-y-8"
          style={{
            background: "linear-gradient(135deg, #1A1A1F 0%, #0F0F14 100%)",
            border: "2px solid transparent",
            backgroundClip: "padding-box",
            position: "relative",
          }}
        >
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: "linear-gradient(90deg, #C9A84C, #F5F0E8, #C9A84C, #1A6B3A, #C9A84C)",
              backgroundSize: "300% 300%",
              animation: "borderRun 4s ease infinite",
              zIndex: -1,
              margin: -2,
            }}
          />
          <div className="space-y-4">
            <h2
              className="text-3xl md:text-5xl font-bold text-[#C9A84C]"
              style={{ fontFamily: "'Special Elite','Courier Prime','Courier New',monospace" }}
            >
              {t.cta}
            </h2>
            <p className="text-[#F5F0E8]/70 text-lg md:text-xl">{t.ctaSub}</p>
          </div>
          <a
            href={STAKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full md:w-auto bg-[#C9A84C] hover:bg-[#d4b46a] text-[#0A0A0F] font-bold py-7 px-14 rounded-xl text-xl md:text-3xl text-center transition-all"
            style={{
              fontFamily: "'IBM Plex Mono','Courier New',monospace",
              letterSpacing: 2,
              animation: "glowPulse 1.6s ease-in-out infinite",
            }}
          >
            {t.cta}
          </a>
        </div>
      </section>

      <footer className="px-6 pb-12">
        <div className="max-w-4xl mx-auto text-center text-sm text-[#F5F0E8]/50">
          <p>{t.footer}</p>
        </div>
      </footer>
    </div>
  );
}
