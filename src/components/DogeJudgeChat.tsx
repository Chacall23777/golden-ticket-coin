import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

type Msg = { id: string; role: "user" | "assistant"; content: string };

const STORAGE_KEY = "doge-judge-chat-v1";

const WELCOME_PT =
  "Wow! Olá, cidadão. Eu sou o **Doge Judge** 🐕⚖️ — agente oficial do $LEGAL.\n\nPergunte sobre tokenomics, como comprar, área dos holders, links oficiais ou a origem do projeto. Such legal! [APPROVED ✓]";

// ── INSTANT LOCAL ANSWERS (markdown) ──
type Intent =
  | "ca"
  | "supply"
  | "tax"
  | "buy"
  | "links"
  | "lp"
  | "about"
  | "holders";

const RESPOSTAS: Record<Intent, string> = {
  ca: `📋 **Contract Address (CA)**\n\nO endereço oficial do $LEGAL é:\n\n\`XhHLJpJtEHJucpYpAti2JvNs6eYsjeuFjRj9wvvaLDL\`\n\nConfira sempre no [X @legal_elon](https://x.com/legal_elon). Nunca confie em CAs de fontes não oficiais.\n\n\`[VERIFICADO ✓]\``,
  supply: `💰 **Tokenomics**\n\n- Supply: **10.000.000.000**\n- Rede: **Solana**\n- Taxa: **3% compra / 3% venda** (100% → LP)\n- Sem alocação de equipe\n- LP queimada · Contrato renunciado\n\n\`[APPROVED ✓]\``,
  tax: `💸 **Taxas**\n\n**3%** na compra · **3%** na venda — 100% vai para a LP. Sem taxa oculta, sem wallet de equipe.\n\n\`[TRANSPARENTE ✓]\``,
  buy: `🛒 **Como comprar $LEGAL**\n\n1. [Phantom Wallet](https://phantom.app)\n2. Compre SOL e envie para sua wallet\n3. [Raydium](https://raydium.io) ou [Jupiter](https://jup.ag)\n4. Cole o CA e faça o swap\n\n💳 **Pix/Cartão (BRL):** [multitoken.com.br](https://multitoken.com.br)\n\n\`[ENTRADA APROVADA ✓]\``,
  links: `🔗 **Links oficiais**\n\n- [Website](https://elonlegal.sale)\n- [X @legal_elon](https://x.com/legal_elon)\n- [Telegram](https://t.me/+j9lyzSZ4p0FjNjMx)\n- [CMC Community](https://coinmarketcap.com/community/profile/legal_)\n- DexScreener: em breve\n- [Solscan](https://solscan.io/token/XhHLJpJtEHJucpYpAti2JvNs6eYsjeuFjRj9wvvaLDL)\n\n\`[VERIFICADO ✓]\``,
  lp: `🔥 **Segurança**\n\n- **LP Queimada:** liquidez permanentemente bloqueada — ninguém pode remover.\n- **Contrato Renunciado:** zero mudanças maliciosas possíveis.\n\n\`[SAFU ✓]\``,
  about: `🏛️ **Origem**\n\nInspirado no tweet do Elon: *"o caminho certo deveria ser o fácil."* Trocamos "imigração" por "memecoin" — **$LEGAL** é o token de quem entra pela porta da frente. LP queimada, contrato renunciado, 0% para equipe.\n\n\`[APPROVED ✓]\``,
  holders: `🏆 **Área dos Holders**\n\nHolders com **5M+ $LEGAL** acessam área exclusiva para postar no X direto pelo site.\n\nCarteiras: Phantom · Solflare · Jupiter | Taxa: **3%**\n\n\`[VIP ✓]\``,
};

function detectIntent(text: string): Intent | null {
  const t = text.toLowerCase();
  if (/\b(ca|contract|contrat|address|endere[çc]o)\b/.test(t)) return "ca";
  if (/\b(supply|suply|oferta|bilh|billion|total|circulat|tokenomics)\b/.test(t)) return "supply";
  if (/\b(tax|taxa|imposto|fee|3%|buy tax|sell tax)\b/.test(t)) return "tax";
  if (/\b(comprar|como comprar|buy|how to buy|raydium|jup|jupiter|phantom|pix|cart[ãa]o|multitoken)\b/.test(t)) return "buy";
  if (/\b(link|twitter|telegram|x\.com|cmc|coinmarket|dex|solscan|site|website|oficial)\b/.test(t)) return "links";
  if (/\b(lp|liquidez|liquidity|renunci|renounce|queima|burnt|burn|safu|segur|rug)\b/.test(t)) return "lp";
  if (/\b(what|o que|que [ée]|what is|hist[óo]ria|story|elon|origem|sobre|tweet)\b/.test(t)) return "about";
  if (/\b(holder|5m|5 mil|million|exclusiv|vip|postar|post|[áa]rea)\b/.test(t)) return "holders";
  return null;
}

function loadMessages(): Msg[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
  } catch {}
  return [];
}

function saveMessages(msgs: Msg[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
  } catch {}
}

export function DogeJudgeChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // hydrate
  useEffect(() => {
    const loaded = loadMessages();
    if (loaded.length === 0) {
      setMessages([{ id: "welcome", role: "assistant", content: WELCOME_PT }]);
    } else {
      setMessages(loaded);
    }
  }, []);

  // persist (skip welcome-only)
  useEffect(() => {
    if (messages.length === 0) return;
    if (messages.length === 1 && messages[0].id === "welcome") return;
    saveMessages(messages);
  }, [messages]);

  // autoscroll
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  // focus on open / after send
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open, loading]);

  const reset = () => {
    abortRef.current?.abort();
    localStorage.removeItem(STORAGE_KEY);
    setMessages([{ id: "welcome", role: "assistant", content: WELCOME_PT }]);
    setError(null);
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setError(null);
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", content: text };

    // ── INSTANT LOCAL ANSWERS (no API call) ──
    const intent = detectIntent(text);
    if (intent && RESPOSTAS[intent]) {
      const instant: Msg = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: RESPOSTAS[intent],
      };
      setMessages((prev) => [...prev, userMsg, instant]);
      setInput("");
      return;
    }

    const assistantId = crypto.randomUUID();
    const baseHistory = [...messages.filter((m) => m.id !== "welcome"), userMsg];
    setMessages((prev) => [
      ...prev,
      userMsg,
      { id: assistantId, role: "assistant", content: "" },
    ]);
    setInput("");
    setLoading(true);

    const ac = new AbortController();
    abortRef.current = ac;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: baseHistory.map((m) => ({ role: m.role, content: m.content })),
        }),
        signal: ac.signal,
      });

      if (!res.ok || !res.body) {
        let msg = `Erro ${res.status}`;
        try {
          const j = await res.json();
          if (j?.error) msg = j.error;
        } catch {}
        if (res.status === 429) msg = "Muitas requisições — tente em instantes. 🐕";
        if (res.status === 402)
          msg = "Créditos do Doge Judge esgotaram. Avise os admins! ⚖️";
        throw new Error(msg);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: acc } : m)),
        );
      }
    } catch (e: any) {
      if (e?.name !== "AbortError") {
        setError(e?.message || "Falha na conversa");
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content:
                    "Wow, o carimbo travou. Tente novamente em instantes. 🐕⚖️",
                }
              : m,
          ),
        );
      }
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      <style>{CSS}</style>

      <button
        className={`dj-fab ${open ? "dj-fab-open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Doge Judge chat"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
        ) : (
          <span className="dj-fab-emoji" aria-hidden>🐕‍🦺</span>
        )}
        {!open && <span className="dj-fab-pulse" />}
      </button>

      {open && (
        <div className="dj-panel" role="dialog" aria-label="Doge Judge">
          <header className="dj-head">
            <div className="dj-avatar" aria-hidden>⚖️</div>
            <div className="dj-head-text">
              <strong>Doge Judge</strong>
              <span>Agente oficial $LEGAL · online</span>
            </div>
            <button className="dj-icon-btn" onClick={reset} title="Nova conversa" aria-label="Nova conversa">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg>
            </button>
            <button className="dj-icon-btn" onClick={() => setOpen(false)} aria-label="Fechar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
            </button>
          </header>

          <div className="dj-scroll" ref={scrollRef}>
            {messages.map((m) => (
              <div key={m.id} className={`dj-msg dj-${m.role}`}>
                {m.role === "assistant" && <div className="dj-msg-avatar">🐕</div>}
                <div className="dj-bubble">
                  {m.content ? (
                    <ReactMarkdown
                      components={{
                        a: (props) => (
                          <a {...props} target="_blank" rel="noreferrer noopener" />
                        ),
                      }}
                    >
                      {m.content}
                    </ReactMarkdown>
                  ) : (
                    <span className="dj-thinking">Carimbando resposta…</span>
                  )}
                </div>
              </div>
            ))}
            {error && <div className="dj-error">{error}</div>}
          </div>

          <form
            className="dj-composer"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Pergunte ao Doge Judge…"
              rows={1}
              disabled={loading}
            />
            <button
              type="submit"
              className="dj-send"
              disabled={loading || !input.trim()}
              aria-label="Enviar"
            >
              {loading ? (
                <span className="dj-spin" />
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
}

const CSS = `
.dj-fab{position:fixed; bottom:22px; right:22px; z-index:9998; width:60px; height:60px; border-radius:50%;
  background:linear-gradient(135deg,#F4C94A,#C99A22); color:#0B1F3A; border:2px solid #0B1F3A;
  box-shadow:0 14px 36px rgba(0,0,0,0.35), 0 0 0 4px rgba(244,201,74,0.18); cursor:pointer;
  display:flex; align-items:center; justify-content:center; transition:transform .2s ease;}
.dj-fab:hover{transform:translateY(-2px) scale(1.04);}
.dj-fab-open{background:#0B1F3A; color:#F4C94A; border-color:#F4C94A;}
.dj-fab-emoji{font-size:30px; line-height:1;}
.dj-fab-pulse{position:absolute; inset:-4px; border-radius:50%; border:2px solid rgba(244,201,74,0.6); animation:djPulse 1.8s ease-out infinite;}
@keyframes djPulse{0%{transform:scale(1); opacity:.8;} 100%{transform:scale(1.35); opacity:0;}}

.dj-panel{position:fixed; bottom:96px; right:22px; z-index:9999; width:min(380px, calc(100vw - 28px));
  height:min(580px, calc(100vh - 130px)); background:#0B1F3A; color:#F5F0E8; border:1px solid rgba(244,201,74,0.35);
  border-radius:18px; box-shadow:0 30px 80px rgba(0,0,0,0.55); display:flex; flex-direction:column; overflow:hidden;
  font-family:'IBM Plex Sans', system-ui, sans-serif; animation:djIn .22s ease;}
@keyframes djIn{from{opacity:0; transform:translateY(12px);} to{opacity:1; transform:none;}}

.dj-head{display:flex; align-items:center; gap:10px; padding:12px 14px;
  background:linear-gradient(135deg,#071527,#0B1F3A); border-bottom:1px solid rgba(244,201,74,0.25);}
.dj-avatar{width:36px; height:36px; border-radius:50%; background:#F4C94A; color:#0B1F3A;
  display:flex; align-items:center; justify-content:center; font-size:18px; border:2px solid #C99A22;}
.dj-head-text{flex:1; display:flex; flex-direction:column; line-height:1.1;}
.dj-head-text strong{font-family:'Special Elite', serif; font-size:15px; letter-spacing:.5px; color:#F4C94A;}
.dj-head-text span{font-size:11px; color:rgba(245,240,232,0.6); margin-top:2px;}
.dj-head-text span::before{content:""; display:inline-block; width:6px; height:6px; border-radius:50%; background:#1A7A4C; margin-right:6px; vertical-align:middle; box-shadow:0 0 8px #1A7A4C;}
.dj-icon-btn{background:transparent; border:1px solid rgba(245,240,232,0.15); color:#F5F0E8; width:30px; height:30px;
  border-radius:8px; display:inline-flex; align-items:center; justify-content:center; cursor:pointer; transition:all .15s;}
.dj-icon-btn:hover{border-color:#F4C94A; color:#F4C94A;}

.dj-scroll{flex:1; overflow-y:auto; padding:16px 14px; display:flex; flex-direction:column; gap:12px;
  background:repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(244,201,74,0.04) 28px, rgba(244,201,74,0.04) 29px);}
.dj-msg{display:flex; gap:8px; max-width:92%;}
.dj-user{align-self:flex-end; flex-direction:row-reverse;}
.dj-msg-avatar{width:26px; height:26px; border-radius:50%; background:#F4C94A; color:#0B1F3A; display:flex; align-items:center; justify-content:center; font-size:14px; flex-shrink:0;}
.dj-bubble{padding:10px 13px; border-radius:14px; font-size:14px; line-height:1.5; word-wrap:break-word;}
.dj-assistant .dj-bubble{background:rgba(245,240,232,0.06); border:1px solid rgba(244,201,74,0.15); color:#F5F0E8; border-top-left-radius:4px;}
.dj-user .dj-bubble{background:#F4C94A; color:#0B1F3A; border-top-right-radius:4px; font-weight:500;}
.dj-bubble p{margin:0 0 6px;} .dj-bubble p:last-child{margin-bottom:0;}
.dj-bubble a{color:#F4C94A; text-decoration:underline;}
.dj-user .dj-bubble a{color:#0B1F3A;}
.dj-bubble strong{color:#F4C94A;}
.dj-user .dj-bubble strong{color:#0B1F3A;}
.dj-bubble ul,.dj-bubble ol{margin:4px 0 4px 18px; padding:0;}
.dj-bubble code{background:rgba(0,0,0,0.3); padding:1px 5px; border-radius:4px; font-size:12px;}
.dj-thinking{color:rgba(245,240,232,0.55); font-style:italic; animation:djBlink 1.2s ease-in-out infinite;}
@keyframes djBlink{0%,100%{opacity:.5;} 50%{opacity:1;}}
.dj-error{align-self:center; font-size:12px; color:#ff7a8a; background:rgba(255,84,112,0.1); border:1px solid rgba(255,84,112,0.35); padding:6px 12px; border-radius:8px;}

.dj-composer{display:flex; gap:8px; padding:10px 12px; border-top:1px solid rgba(244,201,74,0.2); background:#071527;}
.dj-composer textarea{flex:1; resize:none; max-height:120px; padding:10px 12px; border-radius:10px;
  background:rgba(245,240,232,0.06); border:1px solid rgba(244,201,74,0.2); color:#F5F0E8; font-family:inherit; font-size:14px; outline:none; transition:border-color .15s;}
.dj-composer textarea:focus{border-color:#F4C94A;}
.dj-composer textarea::placeholder{color:rgba(245,240,232,0.4);}
.dj-send{width:42px; height:42px; flex-shrink:0; border-radius:10px; border:none; cursor:pointer;
  background:linear-gradient(135deg,#F4C94A,#C99A22); color:#0B1F3A; display:flex; align-items:center; justify-content:center; transition:transform .15s;}
.dj-send:hover:not(:disabled){transform:translateY(-1px);}
.dj-send:disabled{opacity:.45; cursor:not-allowed;}
.dj-spin{width:16px; height:16px; border:2px solid rgba(11,31,58,0.3); border-top-color:#0B1F3A; border-radius:50%; animation:djSpin .7s linear infinite;}
@keyframes djSpin{to{transform:rotate(360deg);}}

@media (max-width:480px){
  .dj-panel{bottom:84px; right:10px; left:10px; width:auto; height:min(72vh, 560px);}
  .dj-fab{bottom:16px; right:16px; width:56px; height:56px;}
}
@media (prefers-reduced-motion: reduce){
  .dj-fab-pulse,.dj-thinking,.dj-spin,.dj-panel{animation:none !important;}
}
`;
