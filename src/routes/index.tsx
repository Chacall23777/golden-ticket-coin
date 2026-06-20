import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import tweetAsset from "@/assets/tweet-musk.png.asset.json";
import memeQueue from "@/assets/meme-queue.jpg";
import memeStamp from "@/assets/meme-stamp.jpg";
import memeOfficer from "@/assets/meme-officer.jpg";
import memeGateway from "@/assets/meme-gateway.jpg";
import memeDossier from "@/assets/meme-dossier.jpg";
import memeShibaOfficer from "@/assets/meme-shiba-officer.jpg";
import memeDogePassport from "@/assets/meme-doge-passport.jpg";
import memeDogeRally from "@/assets/meme-doge-rally.jpg";
import memeElonLegal from "@/assets/meme-elon-legal.jpg";

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
.lang-toggle{display:flex; gap:6px; align-items:center; font-family:var(--mono); font-size:12px;}
.lang-toggle button{background:transparent; border:1px solid rgba(244,201,74,0.35); color:var(--paper); padding:6px 10px; border-radius:3px; cursor:pointer; font-size:11px; letter-spacing:1px;}
.lang-toggle button.active{background:var(--gold); color:var(--navy-deep); border-color:var(--gold);}
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

/* Scroll reveal */
.reveal{opacity:0; transform:translateY(24px); transition:opacity .7s ease-out, transform .7s cubic-bezier(.2,.7,.2,1);}
.reveal.in{opacity:1; transform:translateY(0);}
.case-file .stamp{opacity:0; transform:rotate(-8deg) scale(0.4);}
.case-file.in .stamp{animation:stampPop .55s cubic-bezier(.2,1.4,.4,1) forwards; animation-delay:.25s;}
@keyframes stampPop{
  0%{opacity:0; transform:rotate(20deg) scale(2.2);}
  60%{opacity:1; transform:rotate(-12deg) scale(0.92);}
  100%{opacity:1; transform:rotate(-8deg) scale(1);}
}
.floating-stamp{opacity:0;}
.hero-art.in .floating-stamp.s1{animation:stampPop .55s cubic-bezier(.2,1.4,.4,1) forwards; animation-delay:.4s;}
.hero-art.in .floating-stamp.s2{animation:stampPop2 .55s cubic-bezier(.2,1.4,.4,1) forwards; animation-delay:.7s;}
@keyframes stampPop2{
  0%{opacity:0; transform:rotate(-20deg) scale(2.2);}
  60%{opacity:1; transform:rotate(14deg) scale(0.92);}
  100%{opacity:1; transform:rotate(10deg) scale(1);}
}

/* Confetti */
.confetti-layer{position:fixed; inset:0; pointer-events:none; z-index:60; overflow:hidden;}
.confetti-piece{position:absolute; top:-20px; width:10px; height:14px; opacity:.95;
  animation:confettiFall linear forwards;}
@keyframes confettiFall{
  0%{transform:translateY(-40px) rotate(0deg); opacity:0;}
  8%{opacity:1;}
  100%{transform:translateY(110vh) rotate(720deg); opacity:0;}
}

.pumpfun{background:var(--navy);}
.pumpfun-card{max-width:800px; margin:0 auto; background: linear-gradient(135deg, rgba(244,201,74,0.08) 0%, rgba(11,31,58,0.6) 100%); border:1px solid rgba(244,201,74,0.25); border-radius:8px; padding:48px 40px; text-align:center; display:flex; flex-direction:column; gap:18px; align-items:center;}
.pumpfun-card .pumpfun-seal{width:64px;height:64px;border-radius:50%;border:3px solid var(--gold); display:flex;align-items:center;justify-content:center;font-size:22px;color:var(--gold);font-family:var(--mono); margin:0 auto;}
.pumpfun-card h3{font-family:var(--serif); font-size:clamp(24px,3.5vw,34px); color:var(--paper);}
.pumpfun-card p{color:rgba(245,241,232,0.75); font-size:16px; line-height:1.65; max-width:560px;}
.pumpfun-card .btn-primary{font-size:15px; padding:18px 36px; margin-top:8px;}
.pumpfun-note{font-family:var(--mono); font-size:12px; color:var(--gold-deep); letter-spacing:1.5px; margin-top:8px;}

@media (prefers-reduced-motion: reduce){
  .reveal{opacity:1 !important; transform:none !important; transition:none !important;}
  .case-file .stamp, .floating-stamp{opacity:1 !important; transform:rotate(-8deg) scale(1) !important; animation:none !important;}
  .floating-stamp.s2{transform:rotate(10deg) scale(1) !important;}
  .hero-art img{animation:none !important;}
  .ticker-strip .track{animation:none !important;}
  .confetti-layer{display:none !important;}
}
`;

type Lang = "pt" | "en";

const tx: Record<Lang, Record<string, string>> = {
  pt: {
    navStory: "A história",
    navHowto: "Como comprar",
    navTokenomics: "Tokenomics",
    navCommunity: "Comunidade",
    navCta: "Comprar $LEGAL",
    heroEyebrow: "Solana · entrada 100% legal",
    heroH1a: "A porta certa ",
    heroH1b: "sempre abre.",
    heroLead: "$LEGAL nasceu de uma ideia simples: o caminho certo deveria ser o caminho fácil. Sem atalho, sem burocracia escondida, sem letra miúda — só um carimbo de aprovado e seguir em frente.",
    heroBtnPrimary: "Comprar $LEGAL",
    heroBtnSecondary: "Ler a história",
    ticker1: "★ ENTRADA APROVADA",
    ticker2: "· $LEGAL ·",
    ticker3: "★ NA FILA CERTA",
    ticker4: "· SOLANA ·",
    ticker5: "★ CARIMBADO E LIBERADO",
    ticker6: "· LP QUEIMADA ·",
    tweetEyebrow: "Documento fundador",
    tweetH2: "O tweet que inspirou tudo",
    tweetQuote: '"Imigração legal pra gente honesta, trabalhadora e talentosa devia ser <em>fácil</em>. E imigração ilegal devia ser <em>difícil</em>."',
    tweetP: "Trocamos \"imigração\" por \"memecoin\" e o jogo virou. $LEGAL é o token de quem entra pela porta da frente.",
    storyEyebrow: "Processo nº LE-2026-001",
    storyH2: "O dossiê do $LEGAL",
    storyP: "Toda moeda tem uma origem. A nossa é um arquivo de três páginas — e a última ainda está sendo escrita por quem entrar agora.",
    case1No: "Página 1 — Análise inicial",
    case1Stamp: "Aprovado",
    case1H3: "O caminho difícil, feito do jeito certo",
    case1P: "$LEGAL representa quem faz tudo na ordem certa: pede, espera, prova, e só então atravessa a porta. Não é sobre ser rápido. É sobre ser correto — e ainda assim chegar lá.",
    case1Alt: "Pepe oficial carimbando LEGAL",
    case2No: "Página 2 — O que rejeitamos",
    case2Stamp: "Negado",
    case2H3: "Atalhos, promessas vazias e letra miúda",
    case2P: "Todo projeto que promete demais e explica de menos recebe o mesmo selo aqui: negado. $LEGAL não vende milagre — vende um processo transparente, do contrato à liquidez.",
    case2Alt: "Dossiê com carimbos approved e denied",
    case3No: "Página 3 — Status atual",
    case3Stamp: "Em andamento",
    case3H3: "A fila continua — e você pode entrar nela",
    case3P: "O dossiê do $LEGAL está aberto. Cada novo holder é mais uma entrada aprovada nesse arquivo. A história está sendo escrita agora, com quem decide entrar pela porta certa.",
    case3Alt: "Doge, Pepe e astronauta atravessando o portão LEGAL ENTRY",
    galleryEyebrow: "Arquivo visual",
    galleryH2: "Memes oficiais do processo",
    galleryP: "Cada imagem é um carimbo. Cada carimbo é uma piada interna que virou cultura.",
    howtoEyebrow: "Formulário de entrada",
    howtoH2: "Como comprar $LEGAL",
    howtoP: "Quatro carimbos até a aprovação final. Nenhum deles exige fila de verdade.",
    step1Stage: "Carimbo 01",
    step1H4: "Baixe uma carteira",
    step1P: "Instale a Phantom (ou a carteira Solana de sua preferência) no celular ou como extensão do navegador.",
    step1Link: "Baixar Phantom →",
    step2Stage: "Carimbo 02",
    step2H4: "Consiga SOL",
    step2P: "Compre SOL direto na carteira, transfira de outra carteira, ou compre numa exchange e envie para a sua.",
    step3Stage: "Carimbo 03",
    step3H4: "Acesse a Raydium",
    step3P: "Vá até raydium.io (ou Jup.ag) para trocar seu SOL por $LEGAL com a liquidez disponível.",
    step3Link: "Abrir Raydium →",
    step4Stage: "Carimbo 04",
    step4H4: "Cole o contrato e troque",
    step4P: "Cole o endereço do contrato (CA) abaixo, confirme a troca e pronto: entrada aprovada.",
    step4Link: "Ver o contrato ↓",
    tokenomicsEyebrow: "Certificado oficial",
    tokenomicsH2: "Tokenomics",
    tokenomicsP: "Sem alocação escondida para a equipe, sem imposto de compra ou venda.",
    ledgerCert: "certificado nº LE-0001",
    ledgerNet: "rede: solana",
    labelSupply: "Supply total",
    valueSupply: "1.000.000.000 $LEGAL",
    labelTax: "Taxa de compra/venda",
    valueTax: "0%",
    labelLp: "Liquidez",
    valueLp: "Queimada (LP burnt)",
    labelCa: "Endereço do contrato (CA)",
    copyBtn: "Copiar",
    copiedBtn: "Copiado ✓",
    communityEyebrow: "Junte-se ao processo",
    communityH2: "A fila está aberta",
    communityP: "Acompanhe o caso, converse com outros holders e fique de olho na liquidez em tempo real.",
    footerDisclaimer: "$LEGAL é um memecoin sem valor intrínseco garantido. Nada aqui é aconselhamento financeiro.<br/>Pesquise antes de investir e só aplique o que estiver disposto a perder.",
    footerFine: "© 2026 $LEGAL. Todos os direitos reservados. Este site é uma peça de identidade de comunidade e não constitui oferta de valores mobiliários em nenhuma jurisdição.",
    galleryTag1: "Fila oficial",
    galleryTag2: "Carimbo final",
    galleryTag3: "O oficial",
    galleryTag4: "A travessia",
    galleryTag5: "O dossiê",
    galleryTag6: "Documento fundador",
    galleryTag7: "Shiba Oficial",
    galleryTag8: "Doge Passport",
    galleryTag9: "Rally Doge",
    galleryTag10: "Elon Approved",
    supportersEyebrow: "Aliados da causa",
    supportersH2: "Quem apoia a entrada legal",
    supportersP: "Desde o Doge até o Shiba, passando pelo próprio tweet que originou tudo — a comunidade que acredita em fazer as coisas do jeito certo.",
    pumpfunEyebrow: "Pump.fun",
    pumpfunH2: "Desafios e Recompensas",
    pumpfunP: "Entre na comunidade oficial da $LEGAL no Pump.fun. Participe de desafios semanais, conquiste recompensas em tokens e suba no ranking dos mais engajados.",
    pumpfunBtn: "Entrar na comunidade Pump.fun →",
    pumpfunNote: "Novos desafios toda semana. Recompensas pagas em $LEGAL.",
  },
  en: {
    navStory: "The Story",
    navHowto: "How to Buy",
    navTokenomics: "Tokenomics",
    navCommunity: "Community",
    navCta: "Buy $LEGAL",
    heroEyebrow: "Solana · 100% legal entry",
    heroH1a: "The right door ",
    heroH1b: "always opens.",
    heroLead: "$LEGAL was born from a simple idea: the right path should be the easy path. No shortcuts, no hidden bureaucracy, no fine print — just an approved stamp and moving forward.",
    heroBtnPrimary: "Buy $LEGAL",
    heroBtnSecondary: "Read the story",
    ticker1: "★ APPROVED ENTRY",
    ticker2: "· $LEGAL ·",
    ticker3: "★ RIGHT QUEUE",
    ticker4: "· SOLANA ·",
    ticker5: "★ STAMPED & RELEASED",
    ticker6: "· LP BURNT ·",
    tweetEyebrow: "Founding document",
    tweetH2: "The tweet that inspired everything",
    tweetQuote: '"Legal immigration for honest, hardworking and talented people should be <em>easy</em>. And illegal immigration should be <em>hard</em>."',
    tweetP: 'We swapped "immigration" for "memecoin" and the game changed. $LEGAL is the token for those who enter through the front door.',
    storyEyebrow: "Case #LE-2026-001",
    storyH2: "The $LEGAL dossier",
    storyP: "Every coin has an origin. Ours is a three-page file — and the last one is still being written by whoever enters now.",
    case1No: "Page 1 — Initial analysis",
    case1Stamp: "Approved",
    case1H3: "The hard way, done right",
    case1P: "$LEGAL represents those who do everything in the right order: ask, wait, prove, and only then cross the door. It's not about being fast. It's about being right — and still getting there.",
    case1Alt: "Pepe officer stamping LEGAL",
    case2No: "Page 2 — What we reject",
    case2Stamp: "Denied",
    case2H3: "Shortcuts, empty promises and fine print",
    case2P: "Every project that promises too much and explains too little gets the same stamp here: denied. $LEGAL doesn't sell miracles — it sells a transparent process, from contract to liquidity.",
    case2Alt: "Dossier with approved and denied stamps",
    case3No: "Page 3 — Current status",
    case3Stamp: "In progress",
    case3H3: "The queue continues — and you can join it",
    case3P: "The $LEGAL dossier is open. Every new holder is one more approved entry in this file. History is being written now, by those who decide to enter through the right door.",
    case3Alt: "Doge, Pepe and astronaut crossing the LEGAL ENTRY gate",
    galleryEyebrow: "Visual archive",
    galleryH2: "Official memes of the process",
    galleryP: "Every image is a stamp. Every stamp is an inside joke that became culture.",
    howtoEyebrow: "Entry form",
    howtoH2: "How to buy $LEGAL",
    howtoP: "Four stamps until final approval. None of them require a real queue.",
    step1Stage: "Stamp 01",
    step1H4: "Download a wallet",
    step1P: "Install Phantom (or your preferred Solana wallet) on mobile or as a browser extension.",
    step1Link: "Download Phantom →",
    step2Stage: "Stamp 02",
    step2H4: "Get SOL",
    step2P: "Buy SOL directly in the wallet, transfer from another wallet, or buy on an exchange and send to yours.",
    step3Stage: "Stamp 03",
    step3H4: "Go to Raydium",
    step3P: "Head to raydium.io (or Jup.ag) to swap your SOL for $LEGAL with available liquidity.",
    step3Link: "Open Raydium →",
    step4Stage: "Stamp 04",
    step4H4: "Paste the contract and swap",
    step4P: "Paste the contract address (CA) below, confirm the swap and done: approved entry.",
    step4Link: "View contract ↓",
    tokenomicsEyebrow: "Official certificate",
    tokenomicsH2: "Tokenomics",
    tokenomicsP: "No hidden team allocation, no buy or sell tax.",
    ledgerCert: "certificate #LE-0001",
    ledgerNet: "network: solana",
    labelSupply: "Total supply",
    valueSupply: "1,000,000,000 $LEGAL",
    labelTax: "Buy/sell tax",
    valueTax: "0%",
    labelLp: "Liquidity",
    valueLp: "Burnt (LP burnt)",
    labelCa: "Contract address (CA)",
    copyBtn: "Copy",
    copiedBtn: "Copied ✓",
    communityEyebrow: "Join the process",
    communityH2: "The queue is open",
    communityP: "Follow the case, chat with other holders and keep an eye on real-time liquidity.",
    footerDisclaimer: "$LEGAL is a memecoin with no guaranteed intrinsic value. Nothing here is financial advice.<br/>Do your own research and only invest what you are willing to lose.",
    footerFine: "© 2026 $LEGAL. All rights reserved. This site is a community identity piece and does not constitute a securities offer in any jurisdiction.",
    galleryTag1: "Official queue",
    galleryTag2: "Final stamp",
    galleryTag3: "The officer",
    galleryTag4: "The crossing",
    galleryTag5: "The dossier",
    galleryTag6: "Founding doc",
    galleryTag7: "Shiba Officer",
    galleryTag8: "Doge Passport",
    galleryTag9: "Doge Rally",
    galleryTag10: "Elon Approved",
    supportersEyebrow: "Allies of the cause",
    supportersH2: "Who supports legal entry",
    supportersP: "From Doge to Shiba, through the very tweet that started it all — the community that believes in doing things the right way.",
    pumpfunEyebrow: "Pump.fun",
    pumpfunH2: "Challenges & Rewards",
    pumpfunP: "Join the official $LEGAL community on Pump.fun. Take part in weekly challenges, earn token rewards and climb the engagement leaderboard.",
    pumpfunBtn: "Join Pump.fun Community →",
    pumpfunNote: "New challenges every week. Rewards paid in $LEGAL.",
  },
};

function Index() {
  const [lang, setLang] = useState<Lang>("pt");
  const [copied, setCopied] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; bg: string; delay: number; dur: number; rot: number }>>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const ca = "COLE_O_ENDERECO_DO_CONTRATO_AQUI";
  const t = tx[lang];

  const copy = () => {
    navigator.clipboard?.writeText(ca);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
    fireConfetti();
  };

  const fireConfetti = () => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const colors = ["#F4C94A", "#1A7A4C", "#C9252B", "#F2A341", "#F5F1E8"];
    const pieces = Array.from({ length: 70 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      bg: colors[i % colors.length],
      delay: Math.random() * 0.4,
      dur: 2.4 + Math.random() * 1.8,
      rot: Math.random() * 360,
    }));
    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 5000);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const targets = rootRef.current?.querySelectorAll<HTMLElement>(".reveal, .case-file, .hero-art") ?? [];
    if (reduce) {
      targets.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="legal-root" ref={rootRef}>
      <style>{css}</style>
      <div className="bg-lines" />
      {confetti.length > 0 && (
        <div className="confetti-layer" aria-hidden="true">
          {confetti.map((c) => (
            <span
              key={c.id}
              className="confetti-piece"
              style={{
                left: `${c.left}%`,
                background: c.bg,
                transform: `rotate(${c.rot}deg)`,
                animationDelay: `${c.delay}s`,
                animationDuration: `${c.dur}s`,
              }}
            />
          ))}
        </div>
      )}

      <nav className="legal-nav">
        <div className="nav-brand">
          <div className="seal-mini">$L</div>
          LEGAL
        </div>
        <div className="nav-links">
          <a href="#historia">{t.navStory}</a>
          <a href="#howto">{t.navHowto}</a>
          <a href="#tokenomics">{t.navTokenomics}</a>
          <a href="#community">{t.navCommunity}</a>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div className="lang-toggle">
            <button className={lang === "pt" ? "active" : ""} onClick={() => setLang("pt")}>PT</button>
            <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
          </div>
          <a href="#howto" className="nav-cta">{t.navCta}</a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-grid">
          <div className="hero-text">
            <span className="eyebrow">{t.heroEyebrow}</span>
            <h1>{t.heroH1a}<span>{t.heroH1b}</span></h1>
            <p className="lead">{t.heroLead}</p>
            <div className="hero-actions">
              <a href="#howto" className="btn-primary" onClick={fireConfetti}>{t.heroBtnPrimary}</a>
              <a href="#historia" className="btn-secondary">{t.heroBtnSecondary}</a>
            </div>
          </div>
          <div className="hero-art">
            <div className="floating-stamp s1">{t.case1Stamp}</div>
            <div className="floating-stamp s2">100% legal</div>
            <img src={memeQueue} alt="Doge officer approving $LEGAL passports" width={1024} height={1024} />
          </div>
        </div>
      </section>

      <section className="ticker-strip">
        <div className="track">
          <span>{t.ticker1}</span><span>{t.ticker2}</span><span>{t.ticker3}</span><span>{t.ticker4}</span><span>{t.ticker5}</span><span>{t.ticker6}</span>
          <span>{t.ticker1}</span><span>{t.ticker2}</span><span>{t.ticker3}</span><span>{t.ticker4}</span><span>{t.ticker5}</span><span>{t.ticker6}</span>
        </div>
      </section>

      <section className="tweet-section">
        <div className="section-head reveal">
          <span className="eyebrow">{t.tweetEyebrow}</span>
          <h2>{t.tweetH2}</h2>
        </div>
        <div className="tweet-grid">
          <div className="tweet-card reveal">
            <img src={tweetAsset.url} alt="Elon Musk tweet about legal immigration" width={1024} height={1024} />
          </div>
          <div>
            <p className="tweet-quote" dangerouslySetInnerHTML={{ __html: t.tweetQuote }} />
            <p style={{marginTop:'20px', color:'rgba(245,241,232,0.6)', fontSize:'14px'}}>
              {t.tweetP}
            </p>
          </div>
        </div>
      </section>

      <section id="historia" className="story">
        <div className="section-head reveal">
          <span className="eyebrow">{t.storyEyebrow}</span>
          <h2>{t.storyH2}</h2>
          <p>{t.storyP}</p>
        </div>
        <div className="dossier">
          <div className="case-file">
            <div className="case-no">{t.case1No}</div>
            <div className="stamp">{t.case1Stamp}</div>
            <h3>{t.case1H3}</h3>
            <p>{t.case1P}</p>
            <img src={memeOfficer} alt={t.case1Alt} className="case-img" loading="lazy" width={1024} height={1024} />
          </div>
          <div className="case-file denied">
            <div className="case-no">{t.case2No}</div>
            <div className="stamp denied">{t.case2Stamp}</div>
            <h3>{t.case2H3}</h3>
            <p>{t.case2P}</p>
            <img src={memeDossier} alt={t.case2Alt} className="case-img" loading="lazy" width={1024} height={1024} />
          </div>
          <div className="case-file pending">
            <div className="case-no">{t.case3No}</div>
            <div className="stamp pending">{t.case3Stamp}</div>
            <h3>{t.case3H3}</h3>
            <p>{t.case3P}</p>
            <img src={memeGateway} alt={t.case3Alt} className="case-img" loading="lazy" width={1024} height={1024} />
          </div>
        </div>
      </section>

      <section className="gallery">
        <div className="section-head reveal">
          <span className="eyebrow">{t.supportersEyebrow}</span>
          <h2>{t.supportersH2}</h2>
          <p>{t.supportersP}</p>
        </div>
        <div className="gallery-grid">
          <div className="gallery-item reveal"><img src={memeShibaOfficer} alt={t.galleryTag7} loading="lazy" width={1024} height={1024} /><span className="tag">{t.galleryTag7}</span></div>
          <div className="gallery-item reveal"><img src={memeDogePassport} alt={t.galleryTag8} loading="lazy" width={1024} height={1024} /><span className="tag">{t.galleryTag8}</span></div>
          <div className="gallery-item reveal"><img src={memeDogeRally} alt={t.galleryTag9} loading="lazy" width={1024} height={1024} /><span className="tag">{t.galleryTag9}</span></div>
          <div className="gallery-item reveal"><img src={memeElonLegal} alt={t.galleryTag10} loading="lazy" width={1024} height={1024} /><span className="tag">{t.galleryTag10}</span></div>
          <div className="gallery-item reveal"><img src={memeQueue} alt={t.galleryTag1} loading="lazy" width={1024} height={1024} /><span className="tag">{t.galleryTag1}</span></div>
          <div className="gallery-item reveal"><img src={memeStamp} alt={t.galleryTag2} loading="lazy" width={1024} height={1024} /><span className="tag">{t.galleryTag2}</span></div>
          <div className="gallery-item reveal"><img src={memeOfficer} alt={t.galleryTag3} loading="lazy" width={1024} height={1024} /><span className="tag">{t.galleryTag3}</span></div>
          <div className="gallery-item reveal"><img src={memeGateway} alt={t.galleryTag4} loading="lazy" width={1024} height={1024} /><span className="tag">{t.galleryTag4}</span></div>
          <div className="gallery-item reveal"><img src={memeDossier} alt={t.galleryTag5} loading="lazy" width={1024} height={1024} /><span className="tag">{t.galleryTag5}</span></div>
          <div className="gallery-item reveal"><img src={tweetAsset.url} alt={t.galleryTag6} loading="lazy" width={1024} height={1024} /><span className="tag">{t.galleryTag6}</span></div>
        </div>
      </section>

      <section id="howto" className="howto">
        <div className="section-head reveal">
          <span className="eyebrow">{t.howtoEyebrow}</span>
          <h2>{t.howtoH2}</h2>
          <p>{t.howtoP}</p>
        </div>
        <div className="steps">
          <div className="step reveal">
            <span className="stage">{t.step1Stage}</span>
            <h4>{t.step1H4}</h4>
            <p>{t.step1P}</p>
            <a className="link" href="https://phantom.app" target="_blank" rel="noreferrer">{t.step1Link}</a>
          </div>
          <div className="step reveal">
            <span className="stage">{t.step2Stage}</span>
            <h4>{t.step2H4}</h4>
            <p>{t.step2P}</p>
          </div>
          <div className="step reveal">
            <span className="stage">{t.step3Stage}</span>
            <h4>{t.step3H4}</h4>
            <p>{t.step3P}</p>
            <a className="link" href="https://raydium.io" target="_blank" rel="noreferrer">{t.step3Link}</a>
          </div>
          <div className="step reveal">
            <span className="stage">{t.step4Stage}</span>
            <h4>{t.step4H4}</h4>
            <p>{t.step4P}</p>
            <a className="link" href="#tokenomics">{t.step4Link}</a>
          </div>
        </div>
      </section>

      <section id="tokenomics" className="tokenomics">
        <div className="section-head reveal">
          <span className="eyebrow">{t.tokenomicsEyebrow}</span>
          <h2>{t.tokenomicsH2}</h2>
          <p>{t.tokenomicsP}</p>
        </div>
        <div className="ledger reveal">
          <div className="ledger-top">
            <span>{t.ledgerCert}</span>
            <span>{t.ledgerNet}</span>
          </div>
          <div className="ledger-row"><span className="label">{t.labelSupply}</span><span className="value">{t.valueSupply}</span></div>
          <div className="ledger-row"><span className="label">{t.labelTax}</span><span className="value">{t.valueTax}</span></div>
          <div className="ledger-row"><span className="label">{t.labelLp}</span><span className="value">{t.valueLp}</span></div>
          <div className="ledger-row ca-row">
            <span className="label">{t.labelCa}</span>
            <div className="ca-box">
              <code>{ca}</code>
              <button className="copy-btn" onClick={copy}>{copied ? t.copiedBtn : t.copyBtn}</button>
            </div>
          </div>
        </div>
      </section>

      <section id="community" className="community">
        <div className="section-head reveal">
          <span className="eyebrow">{t.communityEyebrow}</span>
          <h2>{t.communityH2}</h2>
          <p>{t.communityP}</p>
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
        <p dangerouslySetInnerHTML={{ __html: t.footerDisclaimer }} />
        <p className="legal-fine">{t.footerFine}</p>
      </footer>
    </div>
  );
}
