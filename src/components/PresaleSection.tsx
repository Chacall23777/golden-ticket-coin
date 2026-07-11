import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * ============================================================================
 * SEÇÃO DE PRÉ-VENDA — $LEGAL
 * ============================================================================
 * PARA REMOVER A SEÇÃO QUANDO A PRÉ-VENDA TERMINAR:
 *   Mude CONFIG.active para false. O componente some do site inteiro.
 *
 * PARA DAR O PLAY NO CRONÔMETRO (sem editar código):
 *   Acesse o site com ?admin=SUA_CHAVE no final da URL
 *   (ex: seusite.com/?admin=legal2026). Aparece um botão "▶ Iniciar Pré-venda"
 *   só pra você. Clique e o cronômetro começa pra todo mundo.
 * ============================================================================
 */

const CONFIG = {
  active: true,
  durationDays: 15,
  presaleLink: "https://privatesale.multitoken.top/",
  raffleLink: "https://rafflelegal.multitoken.top/",
  raffleRulesLink: "https://rafflelegal.multitoken.top/#regras-oficiais",
  presalePrice: "0,00000475",
  initialMarketCap: "50.000",
  supportedBy: "Web3 Brasil",
  adminKey: "legal2026",
};

const BONUS_END_MS = Date.UTC(2026, 6, 10, 6, 0, 0);

type Lang = "pt" | "en";
type TimeLeft = { d: number; h: number; m: number; s: number } | null;

const T: Record<Lang, Record<string, string>> = {
  pt: {
    header: "Documento Oficial de Entrada",
    title: "PRÉ-VENDA $LEGAL ABERTA",
    sub: `Sua entrada legal antes do lançamento oficial. Vagas por tempo limitado — ${CONFIG.durationDays} dias de janela de embarque.`,
    d: "Dias", h: "Horas", m: "Min", s: "Seg",
    ended: "Pré-venda encerrada",
    cta: "Comprar na Pré-venda",
    price: "Preço pré-venda",
    mcap: "Market Cap inicial",
    duration: "Duração",
    durationVal: `${CONFIG.durationDays} dias`,
    supported: "Apoiado por",
    badge1: "LP será queimada",
    badge2: "Contrato será renunciado",
    badge3: "Apoiado pela Web3 Brasil",
    adminStart: "▶ Iniciar Pré-venda",
    adminStarting: "Iniciando...",
    adminRunning: "✓ Pré-venda em andamento (iniciada por você)",
    waiting: "Cronômetro aguardando início",
    bonusEyebrow: "LEGAL RAFFLE",
    bonusTitle: "🏆 COMPETIÇÃO OFICIAL DA PRÉ-VENDA $LEGAL",
    bonusSub: "Processo Nº LE-2026-002",
    bonusCta: "Ver requisitos de entrada",
    bonusEnded: "Sorteio encerrado",
    raffleProgress: "30 / 30 Compras Qualificadas",
  },
  en: {
    header: "Official Entry Document",
    title: "$LEGAL PRESALE OPEN",
    sub: `Your legal entry before the official launch. Limited spots — ${CONFIG.durationDays}-day boarding window.`,
    d: "Days", h: "Hours", m: "Min", s: "Sec",
    ended: "Presale ended",
    cta: "Buy in Presale",
    price: "Presale price",
    mcap: "Initial Market Cap",
    duration: "Duration",
    durationVal: `${CONFIG.durationDays} days`,
    supported: "Backed by",
    badge1: "LP will be burned",
    badge2: "Contract will be renounced",
    badge3: "Backed by Web3 Brasil",
    adminStart: "▶ Start Presale",
    adminStarting: "Starting...",
    adminRunning: "✓ Presale running (started by you)",
    waiting: "Countdown waiting to start",
    bonusEyebrow: "LEGAL RAFFLE",
    bonusTitle: "🏆 OFFICIAL $LEGAL PRESALE COMPETITION",
    bonusSub: "Case Nº LE-2026-002",
    bonusCta: "See entry requirements",
    bonusEnded: "Raffle closed",
    raffleProgress: "30 / 30 Qualified Purchases",
  },
};

function getTimeLeft(endDate: Date): TimeLeft {
  const diff = endDate.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  };
}

function getTimeLeftFrom(target: number, now: number | null): TimeLeft {
  if (now === null) return { d: 0, h: 0, m: 0, s: 0 };
  const diff = target - now;
  if (diff <= 0) return null;
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  };
}

function FlipDigit({ value, label }: { value: number; label: string }) {
  const padded = String(value).padStart(2, "0");
  return (
    <div className="ls-flip-wrap">
      <div className="ls-flip-card">{padded}</div>
      <div className="ls-flip-label">{label}</div>
    </div>
  );
}


export default function PresaleSection({ lang = "pt" }: { lang?: Lang } = {}) {
  const t = T[lang];

  const [now, setNow] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [launching, setLaunching] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(
      new URLSearchParams(window.location.search).get("admin") === CONFIG.adminKey
    );
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("presale_settings")
        .select("start_time")
        .eq("id", 1)
        .maybeSingle();
      if (cancelled) return;
      setStartTime((data?.start_time as string | null) ?? null);
      setLoaded(true);
    })();
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, []);

  async function handlePlay() {
    setLaunching(true);
    const nowIso = new Date().toISOString();
    const { error } = await supabase
      .from("presale_settings")
      .update({ start_time: nowIso })
      .eq("id", 1);
    if (!error) setStartTime(nowIso);
    setLaunching(false);
  }

  if (!CONFIG.active) return null;

  const started = Boolean(startTime);
  let timeLeft: TimeLeft = null;
  let ended = false;
  if (started && startTime) {
    const start = new Date(startTime);
    const end = new Date(start.getTime() + CONFIG.durationDays * 86400000);
    timeLeft = getTimeLeft(end);
    ended = !timeLeft;
  }

  return (
    <section className="ls-section">
      <style>{`
        .ls-section {
          --ink: #0b1f3a;
          --paper: #f2e9d8;
          --gold: #c9a24a;
          --stamp-red: #b3312c;
          --green-ok: #2f6f4e;
          background:
            radial-gradient(1200px 400px at 50% 0%, rgba(11,31,58,0.06), transparent 60%),
            repeating-linear-gradient(45deg, rgba(11,31,58,0.03) 0 2px, transparent 2px 8px),
            #f7f0de;
          color: var(--ink);
          padding: 70px 20px;
          font-family: Georgia, 'Times New Roman', serif;
          position: relative;
        }
        .ls-paper {
          position: relative;
          max-width: 820px;
          margin: 0 auto;
          background: var(--paper);
          border: 2px solid var(--ink);
          border-radius: 6px;
          padding: 40px 34px 34px;
          box-shadow: 0 12px 30px rgba(11,31,58,0.18), inset 0 0 0 6px var(--paper), inset 0 0 0 7px rgba(11,31,58,0.15);
        }
        .ls-header-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          font-family: 'Space Mono', 'Courier New', monospace;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          opacity: 0.7;
          margin-bottom: 14px;
        }
        .ls-header-row .ls-line { flex: 1; height: 1px; background: rgba(11,31,58,0.35); max-width: 90px; }

        .ls-title {
          font-family: Georgia, serif;
          font-weight: 900;
          font-size: clamp(28px, 5.5vw, 42px);
          text-align: center;
          margin: 0 0 10px;
          letter-spacing: 0.02em;
          color: var(--ink);
        }
        .ls-subtitle {
          text-align: center;
          font-size: 15px;
          line-height: 1.5;
          max-width: 560px;
          margin: 0 auto 30px;
          opacity: 0.8;
        }

        .ls-stamp {
          position: absolute;
          top: -14px; right: -14px;
          width: 112px; height: 112px;
          border-radius: 50%;
          border: 3px double var(--stamp-red);
          color: var(--stamp-red);
          font-family: 'Space Mono', monospace;
          font-weight: 700;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 8px;
          transform: rotate(14deg);
          animation: ls-stamp-in 0.6s ease-out both;
          background: rgba(242,233,216,0.4);
        }
        @keyframes ls-stamp-in {
          0% { transform: rotate(14deg) scale(2.4); opacity: 0; }
          70% { opacity: 0.95; }
          100% { transform: rotate(14deg) scale(1); opacity: 0.9; }
        }
        @media (max-width: 560px) {
          .ls-stamp { width: 82px; height: 82px; font-size: 10px; top: -2px; right: 2px; }
        }

        .ls-board {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin: 0 auto 30px;
          flex-wrap: wrap;
        }
        .ls-flip-wrap { display: flex; flex-direction: column; align-items: center; gap: 6px; }
        .ls-flip-card {
          background: var(--ink);
          color: var(--paper);
          font-family: 'Courier New', monospace;
          font-weight: 700;
          font-size: clamp(26px, 6vw, 40px);
          min-width: 64px;
          text-align: center;
          padding: 10px 6px;
          border-radius: 4px;
          box-shadow: inset 0 -3px 0 rgba(0,0,0,0.35), 0 3px 0 var(--gold);
          position: relative;
        }
        .ls-flip-card::after {
          content: "";
          position: absolute;
          left: 0; right: 0; top: 50%;
          height: 1px;
          background: rgba(242,233,216,0.15);
        }
        .ls-flip-label {
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          opacity: 0.7;
        }
        .ls-colon { font-size: 26px; align-self: center; margin-top: -14px; opacity: 0.4; }

        .ls-soon {
          text-align: center;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          background: var(--ink);
          color: var(--paper);
          padding: 12px 26px;
          border-radius: 4px;
          margin: 0 auto 30px;
          display: block;
          width: fit-content;
        }

        .ls-cta-wrap { display: flex; justify-content: center; margin-bottom: 38px; }
        .ls-cta {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          background: var(--stamp-red);
          color: var(--paper);
          text-decoration: none;
          font-family: 'Space Mono', monospace;
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 16px 30px;
          border-radius: 3px;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          box-shadow: 0 4px 0 rgba(11,31,58,0.5);
        }
        .ls-cta:hover { transform: translateY(-2px); box-shadow: 0 6px 0 rgba(11,31,58,0.5); }
        .ls-cta:active { transform: translateY(1px); box-shadow: 0 2px 0 rgba(11,31,58,0.5); }
        .ls-cta .ls-arrow { font-size: 18px; }

        .ls-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 26px;
        }
        @media (max-width: 700px) {
          .ls-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .ls-field {
          background: rgba(255,255,255,0.5);
          border: 1px dashed rgba(11,31,58,0.35);
          border-radius: 4px;
          padding: 14px 12px;
          text-align: center;
        }
        .ls-field .ls-k {
          font-size: 9px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          opacity: 0.6;
          margin-bottom: 6px;
        }
        .ls-field .ls-v {
          font-family: Georgia, serif;
          font-weight: 700;
          font-size: 17px;
          color: var(--ink);
        }

        .ls-badges {
          display: flex;
          justify-content: center;
          gap: 22px;
          flex-wrap: wrap;
          margin-bottom: 4px;
        }
        .ls-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--green-ok);
        }
        .ls-badge .ls-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--green-ok);
          box-shadow: 0 0 0 3px rgba(47,111,78,0.15);
        }

        .ls-admin-wrap {
          display: flex;
          justify-content: center;
          margin: -12px 0 24px;
        }
        .ls-admin-btn {
          background: var(--green-ok);
          color: var(--paper);
          border: none;
          font-family: 'Space Mono', monospace;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 10px 20px;
          border-radius: 3px;
          cursor: pointer;
          box-shadow: 0 3px 0 rgba(11,31,58,0.4);
        }
        .ls-admin-btn:disabled { opacity: 0.6; cursor: default; }
        .ls-admin-btn:hover:not(:disabled) { filter: brightness(1.08); }
        .ls-admin-note {
          font-size: 12px;
          font-weight: 700;
          color: var(--green-ok);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .ls-bonus-box {
          margin: -12px auto 30px;
          padding: 18px;
          border-radius: 5px;
          border: 1px solid rgba(11,31,58,0.28);
          background:
            linear-gradient(135deg, rgba(179,49,44,0.10), rgba(201,162,74,0.16)),
            rgba(255,255,255,0.36);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.25);
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 16px;
          align-items: center;
        }
        .ls-bonus-copy { min-width: 0; }
        .ls-bonus-eye {
          display: inline-block;
          font-family: 'Space Mono', 'Courier New', monospace;
          font-weight: 900;
          font-size: 12px;
          letter-spacing: 0.1em;
          color: var(--stamp-red);
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .ls-bonus-title {
          font-family: Georgia, serif;
          font-weight: 900;
          font-size: clamp(18px, 3vw, 24px);
          line-height: 1.15;
          margin: 0 0 6px;
          color: var(--ink);
        }
        .ls-bonus-sub {
          margin: 0;
          font-size: 13px;
          line-height: 1.45;
          opacity: 0.78;
        }
        .ls-bonus-side {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .ls-bonus-count {
          display: grid;
          grid-template-columns: repeat(4, minmax(45px, 1fr));
          gap: 6px;
          min-width: 220px;
        }
        .ls-bonus-cell {
          background: var(--ink);
          color: var(--paper);
          border-radius: 3px;
          padding: 8px 5px;
          text-align: center;
          box-shadow: 0 2px 0 var(--gold);
        }
        .ls-bonus-n {
          font-family: 'Courier New', monospace;
          font-weight: 900;
          font-size: 18px;
          line-height: 1;
        }
        .ls-bonus-l {
          margin-top: 4px;
          font-family: 'Space Mono', 'Courier New', monospace;
          font-size: 8px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          opacity: 0.72;
        }
        .ls-bonus-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--ink);
          color: var(--paper);
          text-decoration: none;
          font-family: 'Space Mono', 'Courier New', monospace;
          font-weight: 900;
          font-size: 11px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 10px 14px;
          border-radius: 3px;
          white-space: nowrap;
          box-shadow: 0 3px 0 rgba(11,31,58,0.35);
        }
        .ls-bonus-ended {
          font-family: 'Space Mono', 'Courier New', monospace;
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 900;
          color: var(--stamp-red);
        }
        @media (max-width: 760px) {
          .ls-bonus-box { grid-template-columns: 1fr; text-align: center; margin-top: -6px; }
          .ls-bonus-count { width: 100%; min-width: 0; }
        }
        @media (max-width: 430px) {
          .ls-bonus-box { padding: 14px; }
          .ls-bonus-count { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div className="ls-paper">
        <div className="ls-header-row">
          <span className="ls-line" />
          {t.header}
          <span className="ls-line" />
        </div>

        <h2 className="ls-title">{t.title}</h2>
        <p className="ls-subtitle">{t.sub}</p>

        {started && !ended && timeLeft && (
          <div className="ls-board">
            <FlipDigit value={timeLeft.d} label={t.d} />
            <span className="ls-colon">:</span>
            <FlipDigit value={timeLeft.h} label={t.h} />
            <span className="ls-colon">:</span>
            <FlipDigit value={timeLeft.m} label={t.m} />
            <span className="ls-colon">:</span>
            <FlipDigit value={timeLeft.s} label={t.s} />
          </div>
        )}

        {loaded && !started && (
          <div className="ls-board" aria-label={t.waiting}>
            <FlipDigit value={CONFIG.durationDays} label={t.d} />
            <span className="ls-colon">:</span>
            <FlipDigit value={0} label={t.h} />
            <span className="ls-colon">:</span>
            <FlipDigit value={0} label={t.m} />
            <span className="ls-colon">:</span>
            <FlipDigit value={0} label={t.s} />
          </div>
        )}


        {started && ended && (
          <div className="ls-soon">{t.ended}</div>
        )}

        {isAdmin && loaded && !started && (
          <div className="ls-admin-wrap">
            <button className="ls-admin-btn" onClick={handlePlay} disabled={launching}>
              {launching ? t.adminStarting : t.adminStart}
            </button>
          </div>
        )}
        {isAdmin && started && !ended && (
          <div className="ls-admin-wrap">
            <span className="ls-admin-note">{t.adminRunning}</span>
          </div>
        )}

        <div className="ls-cta-wrap">
          
            className="ls-cta"
            href={CONFIG.presaleLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.cta} <span className="ls-arrow">→</span>
          </a>
        </div>

        <div className="ls-bonus-box" aria-label="$LEGAL Raffle">
          <div className="ls-bonus-copy">
            <span className="ls-bonus-eye">{t.bonusEyebrow}</span>
            <p className="ls-bonus-sub" style={{ marginBottom: 4 }}>{t.bonusSub}</p>
            <h3 className="ls-bonus-title">
              <a href={CONFIG.raffleRulesLink} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
                {t.bonusTitle}
              </a>
            </h3>
            <a href={CONFIG.raffleRulesLink} target="_blank" rel="noopener noreferrer" className="ls-bonus-sub" style={{ display: "block", textDecoration: "none" }}>
              {t.raffleProgress}
            </a>
          </div>
          <div className="ls-bonus-side">
            <a className="ls-bonus-btn" href={CONFIG.raffleLink} target="_blank" rel="noopener noreferrer">
              {t.bonusCta} ↓
            </a>
          </div>
        </div>

        <div className="ls-grid">
          <div className="ls-field">
            <div className="ls-k">{t.price}</div>
            <div className="ls-v">${CONFIG.presalePrice}</div>
          </div>
          <div className="ls-field">
            <div className="ls-k">{t.mcap}</div>
            <div className="ls-v">${CONFIG.initialMarketCap}</div>
          </div>
          <div className="ls-field">
            <div className="ls-k">{t.duration}</div>
            <div className="ls-v">{t.durationVal}</div>
          </div>
          <div className="ls-field">
            <div className="ls-k">{t.supported}</div>
            <div className="ls-v">{CONFIG.supportedBy}</div>
          </div>
        </div>

        <div className="ls-badges">
          <span className="ls-badge"><span className="ls-dot" /> {t.badge1}</span>
          <span className="ls-badge"><span className="ls-dot" /> {t.badge2}</span>
          <span className="ls-badge"><span className="ls-dot" /> {t.badge3}</span>
        </div>
      </div>

    </section>
  );
}

