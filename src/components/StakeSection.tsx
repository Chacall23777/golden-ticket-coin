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
    ctaSub: "Você será redirecionado para a plataforma oficial de staking.",
    walletTitle: "Acompanhe sua carteira",
    walletLabel: "SUA CARTEIRA SOLANA",
    walletPlaceholder: "Ex: 3ZjVWq...mCwKuR",
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
    ctaSub: "You will be redirected to the official staking platform.",
    walletTitle: "Track your wallet",
    walletLabel: "YOUR SOLANA WALLET",
    walletPlaceholder: "Ex: 3ZjVWq...mCwKuR",
    footer: "Staking is subject to the platform's official terms. Past performance does not guarantee future returns.",
  },
};

export default function StakeSection() {
  const [lang] = useLang();
  const t = T[lang];

  return (
    <div className="min-h-screen text-[#F5F0E8]" style={{ background: "#0A0A0F" }}>
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 0%, #C9A84C 0%, transparent 55%)",
          }}
        />
        <div className="relative max-w-5xl mx-auto text-center">
          <div
            className="inline-block px-6 py-2 border border-[#C9A84C] text-[#C9A84C] text-sm tracking-[0.2em] mb-6"
            style={{ fontFamily: "'IBM Plex Mono','Courier New',monospace" }}
          >
            {t.process}
          </div>
          <h1
            className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
            style={{ fontFamily: "'Special Elite','Courier Prime','Courier New',monospace" }}
          >
            {t.title}
          </h1>
          <p className="text-2xl md:text-3xl text-[#C9A84C] font-light tracking-wide">
            {t.subtitle}
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <p
            className="text-3xl md:text-4xl text-[#F5F0E8] leading-relaxed"
            style={{ fontFamily: "'Special Elite','Courier Prime','Courier New',monospace" }}
          >
            {t.introHighlight}
          </p>
          <p className="text-lg md:text-xl text-[#F5F0E8]/80 leading-relaxed max-w-3xl mx-auto">
            {t.intro}
          </p>
          <div className="w-24 h-px bg-[#C9A84C]/50 mx-auto" />
        </div>
      </section>

      <section className="px-6 pb-28">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-center text-3xl md:text-4xl font-bold mb-16 text-[#F5F0E8]"
            style={{ fontFamily: "'Special Elite','Courier Prime','Courier New',monospace" }}
          >
            {t.benefitsTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {t.benefits.map((b, i) => (
              <div
                key={i}
                className="group relative bg-[#1A1A1F] border border-[#C9A84C]/30 rounded-2xl p-8 md:p-10 transition-all hover:border-[#C9A84C]/70 hover:bg-[#1A1A1F]/80"
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
        <div className="max-w-3xl mx-auto bg-[#1A1A1F] border border-[#C9A84C]/30 rounded-2xl p-10 md:p-14 text-center space-y-8">
          <div className="space-y-4">
            <h2
              className="text-3xl md:text-5xl font-bold text-[#C9A84C]"
              style={{ fontFamily: "'Special Elite','Courier Prime','Courier New',monospace" }}
            >
              {t.cta}
            </h2>
            <p className="text-[#F5F0E8]/70 text-lg">{t.ctaSub}</p>
          </div>
          <a
            href={STAKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full md:w-auto bg-[#C9A84C] hover:bg-[#d4b46a] text-[#0A0A0F] font-bold py-6 px-12 rounded-xl text-xl md:text-2xl text-center transition-all"
            style={{ fontFamily: "'IBM Plex Mono','Courier New',monospace", letterSpacing: 2 }}
          >
            {t.cta}
          </a>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#0F0F14] border border-[#C9A84C]/20 rounded-2xl p-8 md:p-10">
            <h3
              className="text-xl md:text-2xl font-bold text-[#C9A84C] mb-6"
              style={{ fontFamily: "'Special Elite','Courier Prime','Courier New',monospace" }}
            >
              {t.walletTitle}
            </h3>
            <label
              className="block text-sm tracking-[0.2em] mb-3 text-[#F5F0E8]/70"
              style={{ fontFamily: "'IBM Plex Mono','Courier New',monospace" }}
            >
              {t.walletLabel}
            </label>
            <input
              type="text"
              placeholder={t.walletPlaceholder}
              className="w-full bg-black/70 border border-[#C9A84C]/50 rounded-xl px-6 py-5 text-lg font-mono focus:outline-none focus:border-[#C9A84C]"
            />
          </div>
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
