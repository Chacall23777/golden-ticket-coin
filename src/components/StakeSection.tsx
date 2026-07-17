import { useState } from "react";

type Lang = "pt" | "en";

const STAKING_URL = "https://legalstake.multitoken.top/";

const T = {
  pt: {
    title: "STAKE $LEGAL",
    subtitle: "Entrada 100% Legal • Rendimento Diário",
    apy: "8% ao mês",
    daily: "Rende diariamente após 24h",
    taxa: "Taxa de saída de apenas 1%",
    walletLabel: "SUA CARTEIRA SOLANA",
    walletPlaceholder: "Ex: 3ZjVWq...mCwKuR",
    cta: "Acessar Staking Oficial",
  },
  en: {
    title: "STAKE $LEGAL",
    subtitle: "100% Legal Entry • Daily Yield",
    apy: "8% per month",
    daily: "Daily rewards after 24h",
    taxa: "Only 1% exit fee",
    walletLabel: "YOUR SOLANA WALLET",
    walletPlaceholder: "Ex: 3ZjVWq...mCwKuR",
    cta: "Access Official Staking",
  },
};

export default function StakeSection({ lang = "pt" }: { lang?: Lang }) {
  const t = T[lang];
  const [wallet, setWallet] = useState("");

  return (
    <div className="min-h-screen py-20 px-6 text-[#F5F0E8]" style={{ background: "#0A0A0F" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block px-6 py-2 border border-[#C9A84C] text-[#C9A84C] text-sm tracking-widest mb-4">
            PROCESSO Nº LE-2026-003
          </div>
          <h1 className="text-6xl font-bold mb-4">{t.title}</h1>
          <p className="text-2xl text-[#C9A84C]">{t.subtitle}</p>
        </div>

        <div className="bg-[#1A1A1F] border border-[#C9A84C]/30 rounded-2xl p-10">
          <div className="grid md:grid-cols-3 gap-8 text-center mb-12">
            <div>
              <div className="text-5xl font-bold text-[#C9A84C]">{t.apy}</div>
              <div className="text-sm mt-2 opacity-70">RENDIMENTO</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-emerald-400">DIÁRIO</div>
              <div className="text-sm mt-2 opacity-70">{t.daily}</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-amber-400">1%</div>
              <div className="text-sm mt-2 opacity-70">{t.taxa}</div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <label className="block text-sm tracking-widest mb-3">{t.walletLabel}</label>
              <input
                type="text"
                placeholder={t.walletPlaceholder}
                className="w-full bg-black/70 border border-[#C9A84C]/50 rounded-xl px-6 py-5 text-lg font-mono focus:outline-none focus:border-[#C9A84C]"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
              />
            </div>

            <a
              href={STAKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[#C9A84C] hover:bg-[#d4b46a] text-black font-bold py-5 rounded-xl text-lg text-center transition-all"
            >
              {t.cta}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
