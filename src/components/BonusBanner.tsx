import { useState, useEffect } from "react";

const BONUS_END = Date.UTC(2026, 6, 10, 0, 0, 0); // July 10, 2026 00:00 UTC
const PRESALE_LINK = "https://privatesale.multitoken.top/";

type Lang = "pt" | "en";

const T: Record<Lang, Record<string, string>> = {
  pt: {
    bonusEyebrow: "Oferta por tempo limitado",
    bonusTitle: "Bônus de ",
    bonusTitleHi: "10% em $LEGAL",
    bonusSub:
      "Compre agora na pré-venda e receba +10% de tokens extras. Termina em 10 de julho de 2026, 00:00 UTC.",
    bonusBtn: "COMPRAR $LEGAL AGORA",
    bonusEnded: "Bônus encerrado",
    bonusBadge: "+10%",
    bonusBadgeLbl: "Bônus",
    dLabel: "Dias",
    hLabel: "Horas",
    mLabel: "Min",
    sLabel: "Seg",
  },
  en: {
    bonusEyebrow: "Limited-time offer",
    bonusTitle: "Get a ",
    bonusTitleHi: "10% $LEGAL Bonus",
    bonusSub:
      "Buy now in the presale and receive +10% extra tokens. Ends July 10, 2026 at 00:00 UTC.",
    bonusBtn: "BUY $LEGAL NOW",
    bonusEnded: "Bonus ended",
    bonusBadge: "+10%",
    bonusBadgeLbl: "Bonus",
    dLabel: "Days",
    hLabel: "Hours",
    mLabel: "Min",
    sLabel: "Sec",
  },
};

function useCountdown(target: number) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);
  const diff = Math.max(0, target - (now ?? target));
  return {
    ended: diff === 0,
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  };
}

export default function BonusBanner({ lang = "pt" }: { lang?: Lang }) {
  const t = T[lang];
  const c = useCountdown(BONUS_END);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="bb-band" aria-label="10% Bonus Offer">
      <style>{`
        .bb-band {
          --bb-serif: 'Special Elite','Courier Prime','Courier New',monospace;
          --bb-mono: 'IBM Plex Mono','Courier New',monospace;
          --bb-sans: 'IBM Plex Sans','Helvetica Neue',Arial,sans-serif;
          background: linear-gradient(135deg, #0a0f1e 0%, #151030 60%, #0a0f1e 100%);
          position: relative;
          overflow: hidden;
          padding: 48px 5vw;
          border-top: 1px solid rgba(0, 229, 255, 0.18);
          border-bottom: 1px solid rgba(180, 80, 255, 0.18);
        }
        .bb-band::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 15% 30%, rgba(0, 229, 255, 0.22), transparent 45%),
            radial-gradient(circle at 85% 70%, rgba(255, 80, 200, 0.22), transparent 50%);
          pointer-events: none;
        }
        .bb-band::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(90deg, transparent 0 60px, rgba(0, 229, 255, 0.05) 60px 61px);
          pointer-events: none;
        }
        .bb-inner {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 28px;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        @media (max-width: 900px) {
          .bb-inner { grid-template-columns: 1fr; text-align: center; gap: 18px; }
        }
        .bb-seal {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          border: 3px solid #00E5FF;
          background: radial-gradient(circle, #151030 60%, transparent 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: var(--bb-serif);
          color: #00E5FF;
          box-shadow: 0 0 40px rgba(0, 229, 255, 0.4), inset 0 0 20px rgba(180, 80, 255, 0.25);
          transform: rotate(-6deg);
          animation: bb-pulse 2.4s ease-in-out infinite;
        }
        .bb-seal .bb-num {
          font-size: 28px;
          font-weight: 700;
          line-height: 1;
          background: linear-gradient(90deg, #00E5FF, #B450FF);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .bb-seal .bb-lbl {
          font-size: 9px;
          letter-spacing: 3px;
          margin-top: 3px;
          color: #B450FF;
          text-transform: uppercase;
        }
        @keyframes bb-pulse {
          0%, 100% { box-shadow: 0 0 40px rgba(0, 229, 255, 0.4), inset 0 0 20px rgba(180, 80, 255, 0.25); }
          50% { box-shadow: 0 0 60px rgba(180, 80, 255, 0.55), inset 0 0 24px rgba(0, 229, 255, 0.35); }
        }
        @media (max-width: 900px) { .bb-seal { margin: 0 auto; } }
        .bb-copy .bb-eye {
          display: inline-block;
          font-family: var(--bb-mono);
          font-size: 10px;
          letter-spacing: 3px;
          color: #00E5FF;
          text-transform: uppercase;
          padding: 5px 10px;
          border: 1px solid rgba(0, 229, 255, 0.5);
          border-radius: 2px;
          background: rgba(0, 229, 255, 0.08);
          margin-bottom: 10px;
        }
        .bb-copy h3 {
          font-family: var(--bb-serif);
          font-weight: 400;
          font-size: clamp(20px, 3vw, 30px);
          color: #fff;
          margin: 0 0 8px;
          line-height: 1.15;
        }
        .bb-copy h3 span {
          background: linear-gradient(90deg, #00E5FF, #FF50C8);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .bb-copy p {
          color: rgba(245, 240, 232, 0.75);
          font-size: 13px;
          line-height: 1.55;
          margin: 0 0 12px;
          max-width: 520px;
          font-family: var(--bb-sans);
        }
        @media (max-width: 900px) { .bb-copy p { margin-left: auto; margin-right: auto; } }
        .bb-count {
          display: flex;
          gap: 6px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .bb-cell {
          background: rgba(10, 15, 30, 0.75);
          border: 1px solid rgba(0, 229, 255, 0.35);
          border-radius: 6px;
          padding: 8px 10px;
          min-width: 56px;
          text-align: center;
          box-shadow: 0 4px 18px rgba(0, 229, 255, 0.15);
        }
        .bb-cell .bb-n {
          font-family: var(--bb-mono);
          font-weight: 700;
          font-size: clamp(18px, 2.8vw, 26px);
          color: #fff;
          line-height: 1;
        }
        .bb-cell .bb-l {
          font-family: var(--bb-mono);
          font-size: 9px;
          letter-spacing: 2px;
          color: rgba(245, 240, 232, 0.6);
          text-transform: uppercase;
          margin-top: 4px;
        }
        .bb-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 22px;
          border-radius: 4px;
          background: linear-gradient(90deg, #00E5FF, #B450FF);
          color: #06091a;
          font-family: var(--bb-serif);
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-size: 12px;
          text-decoration: none;
          box-shadow: 0 10px 30px rgba(0, 229, 255, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.35);
          transition: transform 0.2s, box-shadow 0.2s;
          white-space: nowrap;
        }
        .bb-cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(180, 80, 255, 0.6), inset 0 0 0 1px rgba(255, 255, 255, 0.5);
        }
        .bb-ended {
          padding: 12px 18px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px dashed rgba(245, 240, 232, 0.3);
          color: rgba(245, 240, 232, 0.75);
          border-radius: 4px;
          font-family: var(--bb-mono);
          letter-spacing: 2px;
          text-transform: uppercase;
          font-size: 11px;
        }
      `}</style>
      <div className="bb-inner">
        <div className="bb-seal" aria-hidden="true">
          <span className="bb-num">{t.bonusBadge}</span>
          <span className="bb-lbl">{t.bonusBadgeLbl}</span>
        </div>
        <div className="bb-copy">
          <span className="bb-eye">{t.bonusEyebrow}</span>
          <h3>
            {t.bonusTitle}
            <span>{t.bonusTitleHi}</span>
          </h3>
          <p>{t.bonusSub}</p>
          {c.ended ? (
            <span className="bb-ended">{t.bonusEnded}</span>
          ) : (
            <div className="bb-count" role="timer" aria-live="polite">
              <div className="bb-cell">
                <div className="bb-n">{pad(c.d)}</div>
                <div className="bb-l">{t.dLabel}</div>
              </div>
              <div className="bb-cell">
                <div className="bb-n">{pad(c.h)}</div>
                <div className="bb-l">{t.hLabel}</div>
              </div>
              <div className="bb-cell">
                <div className="bb-n">{pad(c.m)}</div>
                <div className="bb-l">{t.mLabel}</div>
              </div>
              <div className="bb-cell">
                <div className="bb-n">{pad(c.s)}</div>
                <div className="bb-l">{t.sLabel}</div>
              </div>
            </div>
          )}
        </div>
        <a
          className="bb-cta"
          href={PRESALE_LINK}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.bonusBtn} →
        </a>
      </div>
    </section>
  );
}
