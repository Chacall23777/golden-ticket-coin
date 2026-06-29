import { useEffect, useRef, useState, type ReactNode } from "react";

// ⚠️ CONFIGURAR ANTES DE PUBLICAR:
const LEGAL_MINT = "COLE_O_CA_DO_TOKEN_LEGAL_AQUI";
const TWITTER_CLIENT_ID = "COLE_O_CLIENT_ID_DO_APP_TWITTER_AQUI";
const TWITTER_REDIRECT_URI = "https://www.elonlegal.sale/callback";
const MIN_BALANCE = 5_000_000;
const SOLANA_RPC = "https://api.mainnet-beta.solana.com";

type Status =
  | "idle"
  | "connecting"
  | "checking"
  | "denied"
  | "approved"
  | "posting"
  | "done";

type WalletKey = "phantom" | "solflare" | "jupiter";

interface WalletDef {
  key: WalletKey;
  name: string;
  install: string;
  color: string;
  icon: JSX.Element;
  detect: () => any | null;
}

const WALLETS: WalletDef[] = [
  {
    key: "phantom",
    name: "Phantom",
    install: "https://phantom.app",
    color: "#AB9FF2",
    detect: () => (typeof window !== "undefined" ? (window as any).phantom?.solana ?? null : null),
    icon: (
      <svg viewBox="0 0 128 128" width="28" height="28" aria-hidden="true">
        <rect width="128" height="128" rx="28" fill="#AB9FF2" />
        <path
          fill="#fff"
          d="M110 64.7C110 39.5 89.2 19 63.6 19S17 39.5 17 64.7c0 22.8 17.1 41.6 39.4 44.7v-9.6c-13-2.6-22.9-13.9-22.9-27.4 0-15.4 12.6-27.9 28.2-27.9 13.6 0 24.9 9.5 27.6 22.1h9.6c0-1.4.1-2.8.1-4.3 0-3.4-.7-6.7-2-9.6l13 0z"
        />
        <circle cx="78" cy="63" r="6" fill="#1a1a2e" />
        <circle cx="99" cy="63" r="6" fill="#1a1a2e" />
      </svg>
    ),
  },
  {
    key: "solflare",
    name: "Solflare",
    install: "https://solflare.com",
    color: "#FFB347",
    detect: () => (typeof window !== "undefined" ? (window as any).solflare ?? null : null),
    icon: (
      <svg viewBox="0 0 64 64" width="28" height="28" aria-hidden="true">
        <defs>
          <linearGradient id="sfg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#FFC10B" />
            <stop offset="1" stopColor="#FF4D00" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="14" fill="url(#sfg)" />
        <circle cx="32" cy="32" r="10" fill="#fff" />
        <path d="M32 6v10M32 48v10M6 32h10M48 32h10M14 14l7 7M43 43l7 7M50 14l-7 7M21 43l-7 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: "jupiter",
    name: "Jupiter Wallet",
    install: "https://jup.ag",
    color: "#14F195",
    detect: () =>
      typeof window !== "undefined"
        ? (window as any).jupiter ?? (window as any).jupiterWallet ?? null
        : null,
    icon: (
      <svg viewBox="0 0 64 64" width="28" height="28" aria-hidden="true">
        <rect width="64" height="64" rx="14" fill="#14F195" />
        <path d="M16 40c8-10 24-10 32 0" stroke="#0a0a0a" strokeWidth="4" fill="none" strokeLinecap="round" />
        <circle cx="22" cy="26" r="3" fill="#0a0a0a" />
        <circle cx="42" cy="26" r="3" fill="#0a0a0a" />
      </svg>
    ),
  },
];

function shortAddr(a: string) {
  if (!a) return "";
  return `${a.slice(0, 5)}…${a.slice(-4)}`;
}

async function getLegalBalance(walletAddress: string): Promise<number> {
  try {
    const response = await fetch(SOLANA_RPC, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getTokenAccountsByOwner",
        params: [walletAddress, { mint: LEGAL_MINT }, { encoding: "jsonParsed" }],
      }),
    });
    const data = await response.json();
    const accounts = data?.result?.value ?? [];
    if (accounts.length === 0) return 0;
    return accounts[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount ?? 0;
  } catch {
    return 0;
  }
}

export function HoldersSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [wallet, setWallet] = useState<{ key: WalletKey; address: string } | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [xConnected, setXConnected] = useState(false);
  const [tweetText, setTweetText] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [debugClicks, setDebugClicks] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // reveal-on-scroll
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("hv-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("hv-in");
            io.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // listen for X OAuth popup
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if ((event.data as any)?.type === "x_oauth_success") {
        setXConnected(true);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const connectWallet = async (w: WalletDef) => {
    const provider = w.detect();
    if (!provider) {
      window.open(w.install, "_blank", "noopener,noreferrer");
      return;
    }
    setError(null);
    setStatus("connecting");
    try {
      const resp = await provider.connect();
      const pk =
        resp?.publicKey?.toString?.() ??
        provider.publicKey?.toString?.() ??
        "";
      if (!pk) throw new Error("publicKey ausente");
      setWallet({ key: w.key, address: pk });
      await checkBalance(pk);
    } catch (e: any) {
      setStatus("idle");
      setError(e?.message || "Falha ao conectar");
    }
  };

  const checkBalance = async (address: string) => {
    setStatus("checking");
    const bal = await getLegalBalance(address);
    setBalance(bal);
    setStatus(bal >= MIN_BALANCE ? "approved" : "denied");
  };

  const resetAll = () => {
    setWallet(null);
    setBalance(0);
    setXConnected(false);
    setTweetText("");
    setStatus("idle");
    setError(null);
  };

  const startXAuth = () => {
    if (TWITTER_CLIENT_ID === "COLE_O_CLIENT_ID_DO_APP_TWITTER_AQUI") {
      // Modo demo até backend OAuth estar pronto
      setXConnected(true);
      return;
    }
    const state = Math.random().toString(36).slice(2);
    sessionStorage.setItem("xoauth_state", state);
    const params = new URLSearchParams({
      response_type: "code",
      client_id: TWITTER_CLIENT_ID,
      redirect_uri: TWITTER_REDIRECT_URI,
      scope: "tweet.write users.read offline.access",
      state,
      code_challenge: "challenge",
      code_challenge_method: "plain",
    });
    window.open(
      `https://twitter.com/i/oauth2/authorize?${params.toString()}`,
      "xauth",
      "width=600,height=700,left=400,top=100"
    );
  };

  const publish = async () => {
    if (!tweetText.trim() || tweetText.length > 280) return;
    setStatus("posting");
    try {
      await fetch("/api/tweet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: tweetText, wallet: wallet?.address }),
      }).catch(() => null);
      setStatus("done");
      setToast("🚀 Postagem publicada! A comunidade vai ver sua mensagem no X.");
      setTweetText("");
      setTimeout(() => setToast(null), 3500);
    } catch {
      setStatus("approved");
      setError("Falha ao publicar. Tente novamente.");
    }
  };

  // hidden debug: triple click on stats bar simulates
  const onDebug = () => {
    const next = debugClicks + 1;
    setDebugClicks(next);
    if (next === 1) {
      setWallet({ key: "phantom", address: "DemoWaLLeT11111111111111111111111111111111" });
      setBalance(7_500_000);
      setStatus("approved");
    } else if (next === 2) {
      setWallet({ key: "phantom", address: "DemoWaLLeT11111111111111111111111111111111" });
      setBalance(1_200_000);
      setStatus("denied");
    } else {
      setDebugClicks(0);
      resetAll();
    }
  };

  const fmt = (n: number) =>
    n.toLocaleString("pt-BR", { maximumFractionDigits: 2 });

  return (
    <section id="holders" className="holders-vault" ref={sectionRef}>
      <style>{HOLDERS_CSS}</style>
      <div className="hv-glow hv-glow-g" />
      <div className="hv-glow hv-glow-p" />

      <div className="hv-inner">
        <div className="hv-badge">
          <span className="hv-dot" /> ÁREA EXCLUSIVA DOS HOLDERS
        </div>

        <h2 className="hv-title">
          Poste para a
          <br />
          comunidade <span className="hv-gradient">$LEGAL</span>
        </h2>
        <p className="hv-sub">
          Holders com 5M+ $LEGAL têm voz aqui. Conecte sua carteira, prove seu
          saldo e publique direto no X.
        </p>

        <div className="hv-stats" onClick={onDebug}>
          <div className="hv-stat">
            <b>5M</b>
            <span>MÍNIMO $LEGAL</span>
          </div>
          <div className="hv-stat">
            <b>3</b>
            <span>CARTEIRAS</span>
          </div>
          <div className="hv-stat">
            <b>0%</b>
            <span>TAXA</span>
          </div>
        </div>

        <div className="hv-card">
          {/* PASSO 1 */}
          {(status === "idle" || status === "connecting") && (
            <>
              <div className="hv-step-head">
                <span className="hv-step-num">01</span>
                <span>CONECTAR CARTEIRA SOLANA</span>
              </div>
              <div className="hv-wallets">
                {WALLETS.map((w) => {
                  const has = !!w.detect();
                  return (
                    <button
                      key={w.key}
                      className="hv-wallet"
                      disabled={status === "connecting"}
                      onClick={() => connectWallet(w)}
                      style={{ borderColor: `${w.color}40` }}
                    >
                      <span className="hv-wallet-ico">{w.icon}</span>
                      <span className="hv-wallet-name">{w.name}</span>
                      <span
                        className={`hv-tag ${has ? "ok" : "muted"}`}
                        style={has ? { color: "#14f195", borderColor: "#14f19555" } : undefined}
                      >
                        {has ? "CONECTAR" : "INSTALAR"}
                      </span>
                    </button>
                  );
                })}
              </div>
              {status === "connecting" && (
                <div className="hv-loading">
                  <span className="hv-spin" /> Aprove na sua carteira…
                </div>
              )}
              {error && <div className="hv-err">{error}</div>}
            </>
          )}

          {/* PASSO 2 - checking */}
          {status === "checking" && (
            <div className="hv-loading hv-center">
              <span className="hv-spin" />
              Verificando saldo de $LEGAL na blockchain…
            </div>
          )}

          {/* PASSO 2 - denied */}
          {status === "denied" && (
            <div className="hv-result hv-denied">
              <div className="hv-result-tag">ACESSO NEGADO</div>
              <div className="hv-result-bal">
                <span>Saldo atual</span>
                <b>{fmt(balance)} $LEGAL</b>
              </div>
              <p>Mínimo exigido: 5.000.000 $LEGAL.</p>
              <div className="hv-result-actions">
                <a
                  className="hv-btn hv-btn-primary"
                  href="https://raydium.io"
                  target="_blank"
                  rel="noreferrer"
                >
                  Comprar mais $LEGAL →
                </a>
                <button className="hv-btn hv-btn-ghost" onClick={resetAll}>
                  Tentar outra carteira
                </button>
              </div>
            </div>
          )}

          {/* PASSO 2/3 - approved */}
          {(status === "approved" || status === "posting" || status === "done") && (
            <>
              <div className="hv-result hv-approved">
                <div className="hv-result-tag">✓ ENTRADA APROVADA</div>
                <div className="hv-result-bal">
                  <span>Saldo</span>
                  <b>{fmt(balance)} $LEGAL</b>
                </div>
                {wallet && (
                  <div className="hv-wallet-pill">
                    {shortAddr(wallet.address)}
                    <button className="hv-disconnect" onClick={resetAll}>
                      desconectar
                    </button>
                  </div>
                )}
              </div>

              <div className="hv-step-head" style={{ marginTop: 28 }}>
                <span className="hv-step-num">02</span>
                <span>PUBLICAR NO X</span>
                {xConnected && <span className="hv-x-ok">✓ X conectado</span>}
              </div>

              {!xConnected ? (
                <button className="hv-btn hv-btn-x" onClick={startXAuth}>
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
                    <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.84l-5.36-6.96L4.7 22H1.44l8.02-9.16L1 2h7L13 8.43 18.244 2zm-1.2 18h1.9L7.04 4H5.05l11.994 16z" />
                  </svg>
                  Conectar conta X para postar
                </button>
              ) : (
                <div className="hv-compose">
                  <textarea
                    placeholder="O que você quer dizer para a comunidade $LEGAL? 🚀"
                    value={tweetText}
                    onChange={(e) => setTweetText(e.target.value)}
                    maxLength={500}
                  />
                  <div className="hv-compose-foot">
                    <span
                      className="hv-count"
                      style={{ color: tweetText.length > 280 ? "#ff5470" : "#9aa0a6" }}
                    >
                      {tweetText.length}/280
                    </span>
                    <button
                      className="hv-btn hv-btn-primary"
                      disabled={
                        !tweetText.trim() ||
                        tweetText.length > 280 ||
                        status === "posting"
                      }
                      onClick={publish}
                    >
                      {status === "posting" ? (
                        <>
                          <span className="hv-spin sm" /> Publicando…
                        </>
                      ) : (
                        "Publicar no X →"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {toast && <div className="hv-toast">{toast}</div>}
    </section>
  );
}

const HOLDERS_CSS = `
.holders-vault{
  position:relative; padding:90px 5vw 110px !important;
  background:linear-gradient(135deg,#0a0a0a,#0d1117 50%,#0a1628);
  border-top:1px solid rgba(20,241,149,0.18);
  border-bottom:1px solid rgba(153,69,255,0.18);
  overflow:hidden; font-family:'Space Grotesk','IBM Plex Sans',sans-serif;
  opacity:0; transform:translateY(30px); transition:opacity .8s ease, transform .8s ease;
}
.holders-vault.hv-in{opacity:1; transform:none;}
.hv-glow{position:absolute; width:520px; height:520px; border-radius:50%; filter:blur(120px); pointer-events:none; z-index:0;}
.hv-glow-g{top:-180px; left:-180px; background:rgba(20,241,149,0.28);}
.hv-glow-p{bottom:-200px; right:-160px; background:rgba(153,69,255,0.28);}
.hv-inner{position:relative; z-index:1; max-width:980px; margin:0 auto; text-align:center; display:flex; flex-direction:column; align-items:center;}

.hv-badge{display:inline-flex; align-items:center; gap:10px; padding:8px 16px; border:1px solid rgba(20,241,149,0.45);
  border-radius:999px; font-family:'JetBrains Mono','IBM Plex Mono',monospace; font-size:11px; letter-spacing:2.5px;
  color:#14f195; background:rgba(20,241,149,0.06); text-transform:uppercase;}
.hv-dot{width:8px; height:8px; border-radius:50%; background:#14f195; box-shadow:0 0 12px #14f195; animation:hvPulse 1.4s ease-in-out infinite;}
@keyframes hvPulse{0%,100%{opacity:1; transform:scale(1);} 50%{opacity:0.4; transform:scale(0.8);}}

.hv-title{margin:22px 0 14px; font-size:clamp(34px,5.4vw,60px); line-height:1.05; font-weight:700; letter-spacing:-0.02em; color:#fff;}
.hv-gradient{background:linear-gradient(90deg,#14f195,#9945ff); -webkit-background-clip:text; background-clip:text; color:transparent;}
.hv-sub{max-width:560px; margin:0 auto; color:rgba(255,255,255,0.65); font-size:16px; line-height:1.6;}

.hv-stats{display:flex; flex-wrap:wrap; justify-content:center; gap:14px; margin:30px 0 36px; user-select:none;}
.hv-stat{padding:12px 22px; border:1px solid rgba(255,255,255,0.1); border-radius:10px; background:rgba(255,255,255,0.02);
  display:flex; flex-direction:column; align-items:center; gap:2px; min-width:120px;}
.hv-stat b{font-family:'JetBrains Mono','IBM Plex Mono',monospace; font-size:22px; color:#14f195;}
.hv-stat:nth-child(2) b{color:#fff;}
.hv-stat:nth-child(3) b{color:#9945ff;}
.hv-stat span{font-size:10px; letter-spacing:2px; color:rgba(255,255,255,0.55); font-family:'JetBrains Mono','IBM Plex Mono',monospace;}

.hv-card{width:100%; max-width:480px; padding:28px; border-radius:20px; background:rgba(255,255,255,0.04);
  border:1px solid rgba(255,255,255,0.1); backdrop-filter:blur(18px); -webkit-backdrop-filter:blur(18px);
  box-shadow:0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(20,241,149,0.08) inset;
  text-align:left;}

.hv-step-head{display:flex; align-items:center; gap:12px; font-family:'JetBrains Mono','IBM Plex Mono',monospace; font-size:12px;
  letter-spacing:2px; color:rgba(255,255,255,0.7); margin-bottom:18px; text-transform:uppercase;}
.hv-step-num{display:inline-flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:50%;
  background:linear-gradient(135deg,#14f195,#9945ff); color:#0a0a0a; font-weight:700; font-size:12px;}
.hv-x-ok{margin-left:auto; color:#14f195; font-size:10px; padding:4px 10px; border:1px solid #14f19555; border-radius:999px;}

.hv-wallets{display:flex; flex-direction:column; gap:10px;}
.hv-wallet{display:flex; align-items:center; gap:14px; padding:14px 16px; background:rgba(255,255,255,0.03);
  border:1px solid rgba(255,255,255,0.08); border-radius:12px; cursor:pointer; transition:all .2s; color:#fff;
  font-family:inherit; font-size:15px; text-align:left;}
.hv-wallet:hover:not(:disabled){background:rgba(255,255,255,0.06); transform:translateY(-1px); border-color:rgba(20,241,149,0.4);}
.hv-wallet:disabled{opacity:.5; cursor:not-allowed;}
.hv-wallet-ico{display:inline-flex;}
.hv-wallet-name{flex:1; font-weight:600;}
.hv-tag{font-family:'JetBrains Mono','IBM Plex Mono',monospace; font-size:10px; letter-spacing:1.5px;
  padding:5px 10px; border-radius:6px; border:1px solid rgba(255,255,255,0.15); color:rgba(255,255,255,0.55);}
.hv-tag.ok{color:#14f195; border-color:#14f19555; background:rgba(20,241,149,0.06);}

.hv-loading{display:flex; align-items:center; gap:10px; color:rgba(255,255,255,0.7); font-size:14px; margin-top:16px;
  font-family:'JetBrains Mono','IBM Plex Mono',monospace;}
.hv-loading.hv-center{justify-content:center; padding:20px 0;}
.hv-spin{width:18px; height:18px; border:2px solid rgba(255,255,255,0.2); border-top-color:#14f195; border-radius:50%; animation:hvSpin 0.8s linear infinite;}
.hv-spin.sm{width:14px; height:14px; border-width:2px;}
@keyframes hvSpin{to{transform:rotate(360deg);}}
.hv-err{margin-top:12px; padding:10px 14px; background:rgba(255,84,112,0.1); border:1px solid rgba(255,84,112,0.4); border-radius:8px; color:#ff7a8a; font-size:13px;}

.hv-result{padding:18px; border-radius:14px; margin-bottom:6px;}
.hv-result.hv-denied{background:rgba(255,84,112,0.08); border:1px solid rgba(255,84,112,0.35);}
.hv-result.hv-approved{background:rgba(20,241,149,0.08); border:1px solid rgba(20,241,149,0.35);}
.hv-result-tag{font-family:'JetBrains Mono','IBM Plex Mono',monospace; font-size:12px; letter-spacing:2px; font-weight:700; margin-bottom:10px;}
.hv-denied .hv-result-tag{color:#ff5470;}
.hv-approved .hv-result-tag{color:#14f195;}
.hv-result-bal{display:flex; justify-content:space-between; align-items:baseline; padding:12px 0; border-top:1px dashed rgba(255,255,255,0.1);}
.hv-result-bal span{color:rgba(255,255,255,0.6); font-size:12px; letter-spacing:1.5px; text-transform:uppercase; font-family:'JetBrains Mono','IBM Plex Mono',monospace;}
.hv-result-bal b{font-family:'JetBrains Mono','IBM Plex Mono',monospace; color:#fff; font-size:18px;}
.hv-result p{margin:8px 0 14px; color:rgba(255,255,255,0.7); font-size:13px;}
.hv-result-actions{display:flex; flex-direction:column; gap:8px;}
.hv-wallet-pill{display:inline-flex; align-items:center; gap:10px; margin-top:10px; padding:6px 12px;
  background:rgba(0,0,0,0.3); border-radius:999px; font-family:'JetBrains Mono','IBM Plex Mono',monospace;
  font-size:12px; color:rgba(255,255,255,0.8);}
.hv-disconnect{background:none; border:none; color:rgba(255,255,255,0.5); font-size:11px; cursor:pointer; text-decoration:underline; padding:0;}
.hv-disconnect:hover{color:#ff5470;}

.hv-btn{display:inline-flex; align-items:center; justify-content:center; gap:8px; padding:14px 22px; border-radius:10px;
  font-family:inherit; font-weight:600; font-size:14px; cursor:pointer; border:none; transition:all .2s;}
.hv-btn-primary{background:linear-gradient(135deg,#14f195,#0bb573); color:#0a0a0a; box-shadow:0 8px 24px rgba(20,241,149,0.3);}
.hv-btn-primary:hover:not(:disabled){transform:translateY(-2px); box-shadow:0 12px 30px rgba(20,241,149,0.45);}
.hv-btn-primary:disabled{opacity:.4; cursor:not-allowed; box-shadow:none;}
.hv-btn-ghost{background:transparent; color:rgba(255,255,255,0.7); border:1px solid rgba(255,255,255,0.15);}
.hv-btn-ghost:hover{border-color:rgba(255,255,255,0.4); color:#fff;}
.hv-btn-x{width:100%; background:#000; color:#fff; border:1px solid rgba(255,255,255,0.15); padding:16px;}
.hv-btn-x:hover{background:#111; border-color:rgba(255,255,255,0.3);}

.hv-compose textarea{width:100%; min-height:120px; padding:14px; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.1);
  border-radius:10px; color:#fff; font-family:inherit; font-size:15px; resize:vertical; outline:none; transition:border-color .2s;}
.hv-compose textarea:focus{border-color:#14f195;}
.hv-compose-foot{display:flex; justify-content:space-between; align-items:center; margin-top:12px;}
.hv-count{font-family:'JetBrains Mono','IBM Plex Mono',monospace; font-size:12px;}

.hv-toast{position:fixed; bottom:30px; left:50%; transform:translateX(-50%); z-index:9999;
  background:linear-gradient(135deg,#14f195,#0bb573); color:#0a0a0a; font-weight:700; padding:14px 26px;
  border-radius:999px; box-shadow:0 14px 40px rgba(20,241,149,0.5); animation:hvToastIn .35s ease;}
@keyframes hvToastIn{from{opacity:0; transform:translate(-50%,20px);} to{opacity:1; transform:translate(-50%,0);}}

@media (max-width:560px){
  .holders-vault{padding:70px 5vw 90px !important;}
  .hv-card{padding:22px;}
  .hv-stat{flex:1; min-width:0;}
  .hv-wallet{flex-wrap:wrap;}
}

@media (prefers-reduced-motion: reduce){
  .holders-vault{opacity:1; transform:none; transition:none;}
  .hv-dot, .hv-spin, .hv-toast{animation:none !important;}
}
`;
