import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import tweetAsset from "@/assets/tweet-musk.png.asset.json";
import memeQueue from "@/assets/meme-queue.jpg";
import memeStamp from "@/assets/meme-stamp.jpg";
import memeOfficer from "@/assets/meme-officer.jpg";
import memeGateway from "@/assets/meme-gateway.jpg";
import memeDossier from "@/assets/meme-dossier.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "$LEGAL — Legal Entry on Solana" },
      { name: "description", content: "$LEGAL: o memecoin que entrou pela porta certa. Carimbado, aprovado e na fila pra subir." },
      { property: "og:title", content: "$LEGAL — Legal Entry" },
      { property: "og:description", content: "A porta certa sempre abre. Memecoin Solana com vibe de imigração legal." },
    ],
  }),
  component: Index,
});

const css = `
:root{
  --navy:#0B1F3A; --navy-deep:#071527; --gold:#F4C94A; --gold-deep:#C99A22;
  --red:#C9252B; --paper:#F5F1E8; --green:#1A7A4C; --ink:#1A1F2B;
  --serif: Georgia, 'Times New Roman', serif;
  --sans: 'Helvetica Neue', Arial, sans-serif;
  --mono: 'Courier New', monospace;
}
.legal-root{background:var(--navy-deep); color:var(--paper); font-family:var(--sans); overflow-x:hidden; min-height:100vh;}
.legal-root *{box-sizing:border-box;}
.legal-root a{color:inherit; text-decoration:none;}
.bg-lines{position:fixed; inset:0; z-index:0; pointer-events:none; opacity:0.05;
  background-image: repeating-linear-gradient(0deg, var(--gold) 0px, var(--gold) 1px, transparent 1px, transparent 40px);}
.legal-root section{position:relative; z-index:1; padding:100px 5vw; overflow:hidden;}
nav.legal-nav{position:fixed; top:0; left:0; right:0; z-index:50; display:flex; align-items:center; justify-content:space-between;
  padding:16px 5vw; background:rgba(7,21,39,0.92); backdrop-filter:blur(8px); border-bottom:1px solid rgba(244,201,74,0.2);}
.nav-brand{font-family:var(--serif); font-size:20px; letter-spacing:2px; font-weight:700; display:flex; align-items:center; gap:10px;}
.seal-mini{width:28px;height:28px;border-radius:50%;border:2px solid var(--gold); display:flex;align-items:center;justify-content:center;font-size:11px;color:var(--gold);font-family:var(--mono);}
.nav-links{display:flex; gap:28px; font-size:13px; letter-spacing:1px; text-transform:uppercase;}
.nav-links a{opacity:0.8; transition:opacity .2s;}
.nav-links a:hover{opacity:1; color:var(--gold);}
.nav-cta{background:var(--gold); color:var(--navy-deep); padding:10px 22px; border-radius:2px; font-size:13px; letter-spacing:1px; text-transform:uppercase; font-weight:700;}
@media (max-width:900px){ .nav-links{display:none;} }

.hero{min-height:100vh; display:flex; align-items:center; justify-content:center; padding:150px 5vw 80px !important;
  background: radial-gradient(ellipse at 50% 0%, rgba(244,201,74,0.10), transparent 60%), var(--navy);
  border-bottom:1px solid rgba(244,201,74,0.15);}
.hero-grid{max-width:1200px; width:100%; display:grid; grid-template-columns:1.1fr 1fr; gap:50px; align-items:center;}
@media (max-width:880px){ .hero-grid{grid-template-columns:1fr; text-align:center;} }
.hero-text{display:flex; flex-direction:column; gap:22px; align-items:flex-start;}
@media (max-width:880px){ .hero-text{align-items:center;} }
.eyebrow{font-family:var(--mono); font-size:12px; letter-spacing:3px; text-transform:uppercase; color:var(--gold-deep); border:1px solid rgba(244,201,74,0.4); padding:6px 16px; border-radius:20px; display:inline-block;}
.hero h1{font-family:var(--serif); font-weight:700; font-size:clamp(40px,6vw,72px); line-height:1.05; letter-spacing:-1px;}
.hero h1 span{color:var(--gold);}
.hero p.lead{font-size:18px; line-height:1.6; color:rgba(245,241,232,0.75); max-width:480px;}
.hero-actions{display:flex; gap:16px; flex-wrap:wrap;}
.btn-primary{background:var(--gold); color:var(--navy-deep); padding:16px 32px; border-radius:2px; font-weight:700; letter-spacing:1px; text-transform:uppercase; font-size:14px; border:1px solid var(--gold); transition:transform .15s; display:inline-block; cursor:pointer;}
.btn-primary:hover{transform:translateY(-2px) rotate(-1deg);}
.btn-secondary{background:transparent; color:var(--paper); padding:16px 32px; border-radius:2px; font-weight:700; letter-spacing:1px; text-transform:uppercase; font-size:14px; border:1px solid rgba(245,241,232,0.35); transition:border-color .15s; display:inline-block;}
.btn-secondary:hover{border-color:var(--gold);}
.hero-art{position:relative; display:flex; justify-content:center; align-items:center;}
.hero-art img{width:100%; max-width:460px; border-radius:8px; border:2px solid rgba(244,201,74,0.3); box-shadow:0 30px 60px rgba(0,0,0,0.4); animation:float 5s ease-in-out infinite;}
@keyframes float{0%,100%{transform:translateY(0px) rotate(-1deg);}50%{transform:translateY(-14px) rotate(1deg);}}
.floating-stamp{position:absolute; font-family:var(--serif); font-weight:700; font-size:13px; border:2.5px solid var(--green); color:var(--green); padding:6px 14px; border-radius:6px; text-transform:uppercase; background:rgba(11,31,58,0.9); z-index:2;}
.floating-stamp.s1{top:-10px; left:-10px; transform:rotate(-12deg);}
.floating-stamp.s2{bottom:20px; right:-15px; border-color:var(--gold); color:var(--gold); transform:rotate(10deg);}
@media (max-width:880px){ .floating-stamp{display:none;} }

.ticker-strip{background:var(--gold); color:var(--navy-deep); overflow:hidden; white-space:nowrap; padding:12px 0 !important; font-family:var(--mono); font-size:13px; letter-spacing:2px; font-weight:700;}
.ticker-strip .track{display:inline-block; animation:ticker 22s linear infinite;}
.ticker-strip span{margin:0 24px;}
@keyframes ticker{from{transform:translateX(0);}to{transform:translateX(-50%);}}

.section-head{max-width:680px; margin:0 auto 56px; text-align:center;}
.section-head h2{font-family:var(--serif); font-size:clamp(30px,4vw,46px); color:var(--paper); line-height:1.15; margin-top:18px;}
.section-head p{margin-top:16px; color:rgba(245,241,232,0.65); font-size:16px; line-height:1.6;}

.tweet-section{background:var(--navy);}
.tweet-grid{max-width:1100px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:50px; align-items:center;}
@media (max-width:880px){ .tweet-grid{grid-template-columns:1fr;} }
.tweet-card{background:#15202b; border-radius:16px; padding:14px; border:1px solid rgba(244,201,74,0.2); box-shadow:0 20px 50px rgba(0,0,0,0.4);}
.tweet-card img{width:100%; display:block; border-radius:10px;}
.tweet-quote{font-family:var(--serif); font-size:24px; line-height:1.45; color:var(--paper);}
.tweet-quote em{color:var(--gold); font-style:normal;}

.dossier{max-width:900px; margin:0 auto; display:flex; flex-direction:column; gap:2px;}
.case-file{background:var(--paper); color:var(--ink); padding:36px 40px; border-left:6px solid var(--green); position:relative;}
.case-file.denied{border-left-color:var(--red);}
.case-file.pending{border-left-color:var(--gold);}
.case-no{font-family:var(--mono); font-size:12px; letter-spacing:2px; color:rgba(26,31,43,0.45); margin-bottom:10px;}
.case-file h3{font-family:var(--serif); font-size:24px; margin-bottom:10px;}
.case-file p{font-size:15px; line-height:1.65; color:rgba(26,31,43,0.8);}
.case-img{margin-top:18px; width:100%; max-height:240px; object-fit:cover; border-radius:4px;}
.stamp{position:absolute; top:30px; right:36px; font-family:var(--serif); font-weight:700; font-size:13px; letter-spacing:2px; border:2.5px solid var(--green); color:var(--green); padding:6px 14px; border-radius:4px; transform:rotate(-8deg); text-transform:uppercase;}
.stamp.denied{border-color:var(--red); color:var(--red);}
.stamp.pending{border-color:var(--gold-deep); color:var(--gold-deep);}
@media (max-width:640px){ .case-file{padding:28px 24px;} .stamp{position:static; display:inline-block; transform:rotate(-4deg); margin-top:14px;} }

.gallery{background:var(--navy-deep);}
.gallery-grid{max-width:1200px; margin:0 auto; display:grid; grid-template-columns:repeat(3,1fr); gap:18px;}
@media (max-width:900px){ .gallery-grid{grid-template-columns:1fr 1fr;} }
@media (max-width:560px){ .gallery-grid{grid-template-columns:1fr;} }
.gallery-item{position:relative; overflow:hidden; border-radius:6px; border:2px solid rgba(244,201,74,0.25); aspect-ratio:1/1;}
.gallery-item img{width:100%; height:100%; object-fit:cover; transition:transform .4s;}
.gallery-item:hover img{transform:scale(1.05);}
.gallery-item .tag{position:absolute; bottom:12px; left:12px; background:rgba(11,31,58,0.9); color:var(--gold); padding:6px 12px; font-family:var(--mono); font-size:11px; letter-spacing:2px; text-transform:uppercase; border-radius:3px;}

.howto{background:var(--navy);}
.steps{max-width:1000px; margin:0 auto; display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:rgba(244,201,74,0.2);}
.step{background:var(--navy-deep); padding:40px 28px; display:flex; flex-direction:column; gap:14px;}
.step .stage{font-family:var(--mono); font-size:12px; color:var(--gold-deep); letter-spacing:2px;}
.step h4{font-family:var(--serif); font-size:20px; color:var(--paper);}
.step p{font-size:14px; line-height:1.6; color:rgba(245,241,232,0.65); flex:1;}
.step a.link{font-size:13px; color:var(--gold); border-bottom:1px solid var(--gold); align-self:flex-start;}
@media (max-width:900px){ .steps{grid-template-columns:1fr 1fr;} }
@media (max-width:560px){ .steps{grid-template-columns:1fr;} }

.tokenomics{background:var(--navy-deep);}
.ledger{max-width:780px; margin:0 auto; background:var(--paper); color:var(--ink); border-radius:2px; overflow:hidden;}
.ledger-top{background:var(--navy); color:var(--paper); padding:24px 36px; display:flex; align-items:center; justify-content:space-between; font-family:var(--mono); font-size:12px; letter-spacing:2px;}
.ledger-row{display:flex; align-items:center; justify-content:space-between; padding:22px 36px; border-bottom:1px solid rgba(26,31,43,0.1); gap:16px;}
.ledger-row:last-child{border-bottom:none;}
.ledger-row .label{font-size:14px; color:rgba(26,31,43,0.6); letter-spacing:1px; text-transform:uppercase;}
.ledger-row .value{font-family:var(--mono); font-size:15px; font-weight:700;}
.ca-row{flex-direction:column; align-items:flex-start; gap:10px;}
.ca-box{width:100%; display:flex; gap:10px; align-items:center; background:rgba(26,31,43,0.05); padding:14px 16px; border-radius:4px;}
.ca-box code{font-family:var(--mono); font-size:13px; flex:1; overflow-x:auto; white-space:nowrap; color:var(--ink);}
.copy-btn{background:var(--navy); color:var(--gold); border:none; padding:8px 16px; border-radius:3px; font-size:12px; letter-spacing:1px; text-transform:uppercase; cursor:pointer; white-space:nowrap;}
.copy-btn:hover{background:var(--navy-deep);}

.community{background:var(--navy); text-align:center;}
.social-row{display:flex; gap:18px; justify-content:center; flex-wrap:wrap; margin-top:30px;}
.social-pill{border:1px solid rgba(245,241,232,0.25); padding:14px 28px; border-radius:30px; font-size:14px; letter-spacing:1px; transition:all .2s; display:inline-block;}
.social-pill:hover{border-color:var(--gold); color:var(--gold); transform:translateY(-3px);}

.legal-footer{background:var(--navy-deep); border-top:1px solid rgba(244,201,74,0.15); padding:50px 5vw 30px; text-align:center; position:relative; z-index:1;}
.legal-footer .seal-mini{width:40px;height:40px; margin:0 auto 16px; font-size:13px;}
.legal-footer p{font-size:13px; color:rgba(245,241,232,0.45); line-height:1.7;}
.legal-footer .legal-fine{margin-top:18px; font-size:11px; color:rgba(245,241,232,0.3); max-width:560px; margin-left:auto; margin-right:auto;}
`;

function Index() {
  const [copied, setCopied] = useState(false);
  const ca = "COLE_O_ENDERECO_DO_CONTRATO_AQUI";

  const copy = () => {
    navigator.clipboard?.writeText(ca);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="legal-root">
      <style>{css}</style>
      <div className="bg-lines" />

      <nav className="legal-nav">
        <div className="nav-brand">
          <div className="seal-mini">$L</div>
          LEGAL
        </div>
        <div className="nav-links">
          <a href="#historia">A história</a>
          <a href="#howto">Como comprar</a>
          <a href="#tokenomics">Tokenomics</a>
          <a href="#community">Comunidade</a>
        </div>
        <a href="#howto" className="nav-cta">Comprar $LEGAL</a>
      </nav>

      <section className="hero">
        <div className="hero-grid">
          <div className="hero-text">
            <span className="eyebrow">Solana · entrada 100% legal</span>
            <h1>A porta certa <span>sempre abre.</span></h1>
            <p className="lead">$LEGAL nasceu de uma ideia simples: o caminho certo deveria ser o caminho fácil. Sem atalho, sem burocracia escondida, sem letra miúda — só um carimbo de aprovado e seguir em frente.</p>
            <div className="hero-actions">
              <a href="#howto" className="btn-primary">Comprar $LEGAL</a>
              <a href="#historia" className="btn-secondary">Ler a história</a>
            </div>
          </div>
          <div className="hero-art">
            <div className="floating-stamp s1">Aprovado</div>
            <div className="floating-stamp s2">100% legal</div>
            <img src={memeQueue} alt="Doge officer aprovando passaportes $LEGAL" />
          </div>
        </div>
      </section>

      <section className="ticker-strip">
        <div className="track">
          <span>★ ENTRADA APROVADA</span><span>· $LEGAL ·</span><span>★ NA FILA CERTA</span><span>· SOLANA ·</span><span>★ CARIMBADO E LIBERADO</span><span>· LP QUEIMADA ·</span>
          <span>★ ENTRADA APROVADA</span><span>· $LEGAL ·</span><span>★ NA FILA CERTA</span><span>· SOLANA ·</span><span>★ CARIMBADO E LIBERADO</span><span>· LP QUEIMADA ·</span>
        </div>
      </section>

      <section className="tweet-section">
        <div className="section-head">
          <span className="eyebrow">Documento fundador</span>
          <h2>O tweet que inspirou tudo</h2>
        </div>
        <div className="tweet-grid">
          <div className="tweet-card">
            <img src={tweetAsset.url} alt="Tweet de Elon Musk sobre imigração legal" />
          </div>
          <div>
            <p className="tweet-quote">
              "Imigração legal pra gente honesta, trabalhadora e talentosa devia ser <em>fácil</em>. E imigração ilegal devia ser <em>difícil</em>."
            </p>
            <p style={{marginTop:'20px', color:'rgba(245,241,232,0.6)', fontSize:'14px'}}>
              Trocamos "imigração" por "memecoin" e o jogo virou. $LEGAL é o token de quem entra pela porta da frente.
            </p>
          </div>
        </div>
      </section>

      <section id="historia" className="story">
        <div className="section-head">
          <span className="eyebrow">Processo nº LE-2026-001</span>
          <h2>O dossiê do $LEGAL</h2>
          <p>Toda moeda tem uma origem. A nossa é um arquivo de três páginas — e a última ainda está sendo escrita por quem entrar agora.</p>
        </div>
        <div className="dossier">
          <div className="case-file">
            <div className="case-no">Página 1 — Análise inicial</div>
            <div className="stamp">Aprovado</div>
            <h3>O caminho difícil, feito do jeito certo</h3>
            <p>$LEGAL representa quem faz tudo na ordem certa: pede, espera, prova, e só então atravessa a porta. Não é sobre ser rápido. É sobre ser correto — e ainda assim chegar lá.</p>
            <img src={memeOfficer} alt="Pepe oficial carimbando LEGAL" className="case-img" loading="lazy" />
          </div>
          <div className="case-file denied">
            <div className="case-no">Página 2 — O que rejeitamos</div>
            <div className="stamp denied">Negado</div>
            <h3>Atalhos, promessas vazias e letra miúda</h3>
            <p>Todo projeto que promete demais e explica de menos recebe o mesmo selo aqui: negado. $LEGAL não vende milagre — vende um processo transparente, do contrato à liquidez.</p>
            <img src={memeDossier} alt="Dossiê com carimbos approved e denied" className="case-img" loading="lazy" />
          </div>
          <div className="case-file pending">
            <div className="case-no">Página 3 — Status atual</div>
            <div className="stamp pending">Em andamento</div>
            <h3>A fila continua — e você pode entrar nela</h3>
            <p>O dossiê do $LEGAL está aberto. Cada novo holder é mais uma entrada aprovada nesse arquivo. A história está sendo escrita agora, com quem decide entrar pela porta certa.</p>
            <img src={memeGateway} alt="Doge, Pepe e astronauta atravessando o portão LEGAL ENTRY" className="case-img" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="gallery">
        <div className="section-head">
          <span className="eyebrow">Arquivo visual</span>
          <h2>Memes oficiais do processo</h2>
          <p>Cada imagem é um carimbo. Cada carimbo é uma piada interna que virou cultura.</p>
        </div>
        <div className="gallery-grid">
          <div className="gallery-item"><img src={memeQueue} alt="Fila de approval" loading="lazy" /><span className="tag">Fila oficial</span></div>
          <div className="gallery-item"><img src={memeStamp} alt="Carimbo APPROVED" loading="lazy" /><span className="tag">Carimbo final</span></div>
          <div className="gallery-item"><img src={memeOfficer} alt="Oficial Pepe" loading="lazy" /><span className="tag">O oficial</span></div>
          <div className="gallery-item"><img src={memeGateway} alt="Portão Legal Entry" loading="lazy" /><span className="tag">A travessia</span></div>
          <div className="gallery-item"><img src={memeDossier} alt="Dossiê aberto" loading="lazy" /><span className="tag">O dossiê</span></div>
          <div className="gallery-item"><img src={tweetAsset.url} alt="Tweet fundador" loading="lazy" /><span className="tag">Documento fundador</span></div>
        </div>
      </section>

      <section id="howto" className="howto">
        <div className="section-head">
          <span className="eyebrow">Formulário de entrada</span>
          <h2>Como comprar $LEGAL</h2>
          <p>Quatro carimbos até a aprovação final. Nenhum deles exige fila de verdade.</p>
        </div>
        <div className="steps">
          <div className="step">
            <span className="stage">Carimbo 01</span>
            <h4>Baixe uma carteira</h4>
            <p>Instale a Phantom (ou a carteira Solana de sua preferência) no celular ou como extensão do navegador.</p>
            <a className="link" href="https://phantom.app" target="_blank" rel="noreferrer">Baixar Phantom →</a>
          </div>
          <div className="step">
            <span className="stage">Carimbo 02</span>
            <h4>Consiga SOL</h4>
            <p>Compre SOL direto na carteira, transfira de outra carteira, ou compre numa exchange e envie para a sua.</p>
          </div>
          <div className="step">
            <span className="stage">Carimbo 03</span>
            <h4>Acesse a Raydium</h4>
            <p>Vá até raydium.io (ou Jup.ag) para trocar seu SOL por $LEGAL com a liquidez disponível.</p>
            <a className="link" href="https://raydium.io" target="_blank" rel="noreferrer">Abrir Raydium →</a>
          </div>
          <div className="step">
            <span className="stage">Carimbo 04</span>
            <h4>Cole o contrato e troque</h4>
            <p>Cole o endereço do contrato (CA) abaixo, confirme a troca e pronto: entrada aprovada.</p>
            <a className="link" href="#tokenomics">Ver o contrato ↓</a>
          </div>
        </div>
      </section>

      <section id="tokenomics" className="tokenomics">
        <div className="section-head">
          <span className="eyebrow">Certificado oficial</span>
          <h2>Tokenomics</h2>
          <p>Sem alocação escondida para a equipe, sem imposto de compra ou venda.</p>
        </div>
        <div className="ledger">
          <div className="ledger-top">
            <span>certificado nº LE-0001</span>
            <span>rede: solana</span>
          </div>
          <div className="ledger-row"><span className="label">Supply total</span><span className="value">1.000.000.000 $LEGAL</span></div>
          <div className="ledger-row"><span className="label">Taxa de compra/venda</span><span className="value">0%</span></div>
          <div className="ledger-row"><span className="label">Liquidez</span><span className="value">Queimada (LP burnt)</span></div>
          <div className="ledger-row ca-row">
            <span className="label">Endereço do contrato (CA)</span>
            <div className="ca-box">
              <code>{ca}</code>
              <button className="copy-btn" onClick={copy}>{copied ? "Copiado ✓" : "Copiar"}</button>
            </div>
          </div>
        </div>
      </section>

      <section id="community" className="community">
        <div className="section-head">
          <span className="eyebrow">Junte-se ao processo</span>
          <h2>A fila está aberta</h2>
          <p>Acompanhe o caso, converse com outros holders e fique de olho na liquidez em tempo real.</p>
        </div>
        <div className="social-row">
          <a className="social-pill" href="#" target="_blank" rel="noreferrer">X (Twitter)</a>
          <a className="social-pill" href="#" target="_blank" rel="noreferrer">Telegram</a>
          <a className="social-pill" href="#" target="_blank" rel="noreferrer">Dex Screener</a>
          <a className="social-pill" href="#" target="_blank" rel="noreferrer">Solscan</a>
        </div>
      </section>

      <footer className="legal-footer">
        <div className="seal-mini">$L</div>
        <p>$LEGAL é um memecoin sem valor intrínseco garantido. Nada aqui é aconselhamento financeiro.<br/>Pesquise antes de investir e só aplique o que estiver disposto a perder.</p>
        <p className="legal-fine">© 2026 $LEGAL. Todos os direitos reservados. Este site é uma peça de identidade de comunidade e não constitui oferta de valores mobiliários em nenhuma jurisdição.</p>
      </footer>
    </div>
  );
}
