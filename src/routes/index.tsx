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
import multitokenBuy from "@/assets/multitoken-buy.jpg";
import web3brasilLogo from "@/assets/web3brasil-logo.png";
import { HoldersSection } from "@/components/HoldersSection";
import { useLang } from "@/hooks/useLang";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "$LEGAL — Legal Entry on Solana" },
      {
        name: "description",
        content:
          "$LEGAL: o memecoin que entrou pela porta certa. Carimbado, aprovado e na fila pra subir.",
      },
      { property: "og:title", content: "$LEGAL — Legal Entry" },
      {
        property: "og:description",
        content: "A porta certa sempre abre. Memecoin Solana com vibe de imigração legal.",
      },
    ],
  }),
  component: LegalPage,
});

const css = `
:root{
  --bg:#0A0A0F; --bg-soft:#10101A; --paper:#F5F0E8; --paper-shade:#E8E0D0;
  --green:#1A6B3A; --red:#8B1A1A; --gold:#C9A84C; --gold-deep:#8E7430;
  --ink:#15131A; --text:#E8E4DC; --muted:rgba(232,228,220,0.6);
  --serif:'Special Elite','Courier Prime','Courier New',monospace;
  --sans:'IBM Plex Sans','Helvetica Neue',Arial,sans-serif;
  --mono:'IBM Plex Mono','Courier New',monospace;
  --noise: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.9  0 0 0 0 0.88  0 0 0 0 0.82  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>");
}
html{scroll-behavior:smooth;}
.legal-root{background:var(--bg); color:var(--text); font-family:var(--sans); overflow-x:hidden; min-height:100vh; position:relative;}
.legal-root *{box-sizing:border-box;}
.legal-root a{color:inherit; text-decoration:none;}
.legal-root::before{content:""; position:fixed; inset:0; z-index:0; pointer-events:none; background-image:var(--noise); opacity:0.10; mix-blend-mode:overlay;}
.bg-lines{position:fixed; inset:0; z-index:0; pointer-events:none; opacity:0.06;
  background-image: repeating-linear-gradient(0deg, var(--gold) 0px, var(--gold) 1px, transparent 1px, transparent 48px),
    repeating-linear-gradient(135deg, transparent 0 38px, rgba(139,26,26,0.18) 38px 39px, transparent 39px 78px);}

.legal-root section{position:relative; z-index:1; padding:110px 5vw; overflow:hidden;}

/* --- cursor stamp --- */
.legal-root a, .legal-root button, .copy-btn, .btn-primary, .btn-secondary, .btn-buy, .nav-cta, .social-pill, .gallery-item{
  cursor:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'><circle cx='15' cy='15' r='11' fill='none' stroke='%23C9A84C' stroke-width='2.5'/><text x='15' y='19' text-anchor='middle' font-family='Courier' font-size='10' fill='%23C9A84C' font-weight='700'>OK</text></svg>") 15 15, pointer;
}

/* --- nav --- */
nav.legal-nav{position:fixed; top:0; left:0; right:0; z-index:50; display:flex; align-items:center; justify-content:space-between;
  padding:14px 5vw; background:rgba(10,10,15,0.85); backdrop-filter:blur(10px); border-bottom:1px solid rgba(201,168,76,0.22);}
.nav-brand{font-family:var(--serif); font-size:22px; letter-spacing:3px; font-weight:700; display:flex; align-items:center; gap:12px; color:var(--paper);}
.seal-mini{width:32px;height:32px;border-radius:50%;border:2px solid var(--gold); display:flex;align-items:center;justify-content:center;font-size:12px;color:var(--gold);font-family:var(--mono); font-weight:700; transform:rotate(-8deg);}
.nav-links{display:flex; gap:30px; font-size:12px; letter-spacing:2px; text-transform:uppercase; font-family:var(--mono);}
.nav-links a{opacity:0.75; transition:opacity .2s, color .2s;}
.nav-links a:hover{opacity:1; color:var(--gold);}
.nav-cta{background:var(--gold); color:var(--bg); padding:11px 22px; border-radius:2px; font-family:var(--serif); font-size:13px; letter-spacing:2px; text-transform:uppercase; font-weight:700; box-shadow:inset 0 0 0 1px rgba(0,0,0,0.25), 0 4px 0 var(--gold-deep);}
.nav-cta:hover{transform:translateY(2px); box-shadow:inset 0 0 0 1px rgba(0,0,0,0.25), 0 2px 0 var(--gold-deep);}
.lang-toggle{display:flex; gap:4px; align-items:center; font-family:var(--mono);}
.lang-toggle button{background:transparent; border:1px solid rgba(201,168,76,0.4); color:var(--text); padding:6px 10px; border-radius:2px; cursor:pointer; font-size:11px; letter-spacing:1.5px; font-family:var(--mono);}
.lang-toggle button.active{background:var(--gold); color:var(--bg); border-color:var(--gold);}
@media (max-width:900px){ .nav-links{display:none;} nav.legal-nav{padding:12px 4vw;} .nav-brand{font-size:18px;} .nav-cta{padding:9px 14px; font-size:11px;} }

/* --- hero --- */
.hero{min-height:100vh; display:flex; align-items:center; justify-content:center; padding:140px 5vw 70px !important;
  background:
    radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.12), transparent 60%),
    linear-gradient(180deg, var(--bg) 0%, #0d0d18 100%);
  border-bottom:1px solid rgba(201,168,76,0.18);}
.hero::before{content:"CLASSIFIED"; position:absolute; top:50%; left:-12%; width:130%; transform:translateY(-50%) rotate(-8deg);
  font-family:var(--serif); font-size:clamp(120px,18vw,260px); color:rgba(139,26,26,0.06); letter-spacing:30px; text-align:center; pointer-events:none; white-space:nowrap; font-weight:700;}
.hero::after{content:""; position:absolute; inset:0; pointer-events:none;
  background:repeating-linear-gradient(135deg, transparent 0 80px, rgba(139,26,26,0.07) 80px 82px, transparent 82px 160px);}
.hero-grid{max-width:1200px; width:100%; display:grid; grid-template-columns:1.1fr 1fr; gap:50px; align-items:center; position:relative; z-index:2;}
@media (max-width:880px){ .hero-grid{grid-template-columns:1fr; text-align:center; gap:40px;} }
.hero-text{display:flex; flex-direction:column; gap:22px; align-items:flex-start;}
@media (max-width:880px){ .hero-text{align-items:center;} }
.eyebrow{font-family:var(--mono); font-size:11px; letter-spacing:3px; text-transform:uppercase; color:var(--gold); border:1px solid rgba(201,168,76,0.45); padding:7px 16px; border-radius:2px; display:inline-block; background:rgba(201,168,76,0.06);}
.hero h1{font-family:var(--serif); font-weight:400; font-size:clamp(40px,6.4vw,76px); line-height:1.05; letter-spacing:-0.5px; color:var(--paper); text-shadow:2px 2px 0 rgba(0,0,0,0.5);}
.hero h1 span{color:var(--gold); display:inline-block; animation:stampDown 0.7s cubic-bezier(.2,1.4,.4,1) both; animation-delay:.25s;}
@keyframes stampDown{0%{opacity:0; transform:translateY(-30px) rotate(-8deg) scale(2.2);}60%{opacity:1; transform:translateY(4px) rotate(2deg) scale(0.94);}100%{opacity:1; transform:translateY(0) rotate(0) scale(1);}}
.hero p.lead{font-size:17px; line-height:1.65; color:var(--muted); max-width:480px; font-family:var(--sans);}
.hero-actions{display:flex; gap:14px; flex-wrap:wrap;}
.btn-primary{background:var(--gold); color:var(--bg); padding:16px 30px; border-radius:2px; font-family:var(--serif); font-weight:700; letter-spacing:2px; text-transform:uppercase; font-size:13px; border:1px solid var(--gold); display:inline-block; cursor:pointer; box-shadow:inset 0 0 0 1px rgba(0,0,0,0.3), 0 6px 0 var(--gold-deep); transition:transform .15s, box-shadow .15s;}
.btn-primary:hover{transform:translateY(4px) rotate(-2deg); box-shadow:inset 0 0 0 1px rgba(0,0,0,0.3), 0 2px 0 var(--gold-deep);}
.btn-secondary{background:transparent; color:var(--paper); padding:16px 30px; border-radius:2px; font-family:var(--serif); font-weight:400; letter-spacing:2px; text-transform:uppercase; font-size:13px; border:1px solid rgba(245,240,232,0.4); display:inline-block;}
.btn-secondary:hover{border-color:var(--gold); color:var(--gold);}

.hero-art{position:relative; display:flex; justify-content:center; align-items:center;}
.hero-art img{width:100%; max-width:460px; border-radius:4px; border:6px solid var(--paper); box-shadow:0 30px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.3); animation:float 6s ease-in-out infinite; transform:rotate(-2deg);}
@keyframes float{0%,100%{transform:translateY(0px) rotate(-2deg);}50%{transform:translateY(-14px) rotate(1.5deg);}}
.floating-stamp{position:absolute; font-family:var(--serif); font-weight:700; font-size:14px; border:3px double var(--green); color:var(--green); padding:8px 16px; border-radius:4px; text-transform:uppercase; background:var(--paper); z-index:2; letter-spacing:2px; box-shadow:0 6px 18px rgba(0,0,0,0.4);}
.floating-stamp.s1{top:-14px; left:-18px; transform:rotate(-14deg);}
.floating-stamp.s2{bottom:18px; right:-22px; border-color:var(--gold-deep); color:var(--gold-deep); transform:rotate(11deg);}
@media (max-width:880px){ .floating-stamp.s1{left:8%;} .floating-stamp.s2{right:8%;} }

/* --- ticker --- */
.ticker-strip{background:var(--gold); color:var(--bg); overflow:hidden; white-space:nowrap; padding:14px 0 !important; font-family:var(--serif); font-size:14px; letter-spacing:3px; font-weight:700; border-top:2px solid var(--gold-deep); border-bottom:2px solid var(--gold-deep);}
.ticker-strip .track{display:inline-block; animation:ticker 24s linear infinite;}
.ticker-strip span{margin:0 26px;}
@keyframes ticker{from{transform:translateX(0);}to{transform:translateX(-50%);}}

/* --- section heads --- */
.section-head{max-width:720px; margin:0 auto 60px; text-align:center;}
.section-head h2{font-family:var(--serif); font-weight:400; font-size:clamp(30px,4.4vw,48px); color:var(--paper); line-height:1.15; margin-top:18px; letter-spacing:-0.5px;}
.section-head p{margin-top:18px; color:var(--muted); font-size:16px; line-height:1.65; font-family:var(--sans);}

/* --- tweet --- */
.tweet-section{background:var(--bg-soft);}
.tweet-grid{max-width:1100px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:50px; align-items:center;}
@media (max-width:880px){ .tweet-grid{grid-template-columns:1fr;} }
.tweet-card{background:#15202b; border-radius:6px; padding:14px; border:1px solid rgba(201,168,76,0.25); box-shadow:0 20px 50px rgba(0,0,0,0.5); transform:rotate(-1.2deg);}
.tweet-card img{width:100%; display:block; border-radius:4px;}
.tweet-quote{font-family:var(--serif); font-weight:400; font-size:24px; line-height:1.5; color:var(--paper);}
.tweet-quote em{color:var(--gold); font-style:normal; border-bottom:2px dashed var(--gold-deep);}

/* --- dossier --- */
.dossier{max-width:920px; margin:0 auto; display:flex; flex-direction:column; gap:24px;}
.case-file{background:var(--paper); color:var(--ink); padding:38px 42px 36px; border-left:6px solid var(--green); position:relative; border-radius:2px;
  background-image:var(--noise), linear-gradient(180deg, var(--paper), var(--paper));
  box-shadow:0 14px 30px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(21,19,26,0.08);}
.case-file::before{content:""; position:absolute; top:0; right:0; width:60px; height:60px; background:linear-gradient(225deg, rgba(21,19,26,0.18) 0%, transparent 50%);}
.case-file.denied{border-left-color:var(--red);}
.case-file.pending{border-left-color:var(--gold);}
.case-no{font-family:var(--mono); font-size:11px; letter-spacing:3px; color:rgba(21,19,26,0.5); margin-bottom:12px; text-transform:uppercase;}
.case-file h3{font-family:var(--serif); font-weight:400; font-size:26px; margin-bottom:12px; line-height:1.25;}
.case-file p{font-size:15px; line-height:1.7; color:rgba(21,19,26,0.82); font-family:var(--sans);}
.case-img{margin-top:20px; width:100%; max-height:260px; object-fit:cover; border-radius:3px; border:1px solid rgba(21,19,26,0.15); filter:sepia(0.12);}
.stamp{position:absolute; top:30px; right:36px; font-family:var(--serif); font-weight:700; font-size:14px; letter-spacing:3px; border:3px double var(--green); color:var(--green); padding:8px 16px; border-radius:6px; transform:rotate(-9deg); text-transform:uppercase; background:rgba(245,240,232,0.4);}
.stamp.denied{border-color:var(--red); color:var(--red);}
.stamp.pending{border-color:var(--gold-deep); color:var(--gold-deep);}
@media (max-width:640px){ .case-file{padding:28px 24px;} .stamp{position:static; display:inline-block; transform:rotate(-4deg); margin:14px 0 0;} }

/* --- gallery masonry --- */
.gallery{background:var(--bg);}
.gallery-grid{max-width:1200px; margin:0 auto; columns:3; column-gap:18px;}
@media (max-width:900px){ .gallery-grid{columns:2;} }
@media (max-width:560px){ .gallery-grid{columns:1;} }
.gallery-item{position:relative; overflow:hidden; border-radius:4px; border:5px solid var(--paper); margin:0 0 18px; break-inside:avoid; box-shadow:0 12px 28px rgba(0,0,0,0.5); transition:transform .35s cubic-bezier(.2,.7,.2,1), box-shadow .35s; counter-increment:evidence; display:block;}
.gallery-grid{counter-reset:evidence;}
.gallery-item:hover{transform:translateY(-6px) rotate(-1deg); box-shadow:0 22px 44px rgba(0,0,0,0.6);}
.gallery-item img{width:100%; height:auto; display:block; transition:transform .5s; filter:saturate(0.95) contrast(1.02);}
.gallery-item:hover img{transform:scale(1.04);}
.gallery-item .tag{position:absolute; bottom:10px; left:10px; right:10px; background:rgba(10,10,15,0.85); color:var(--gold); padding:8px 12px; font-family:var(--mono); font-size:10px; letter-spacing:2px; text-transform:uppercase; border-radius:2px; display:flex; justify-content:space-between; align-items:center; gap:8px; border:1px solid rgba(201,168,76,0.3);}
.gallery-item .tag::before{content:"Nº " counter(evidence, decimal-leading-zero); color:var(--paper); opacity:0.85; font-weight:700;}

/* --- howto / visa form steps --- */
.howto{background:var(--bg-soft);}
.steps{max-width:1100px; margin:0 auto; display:grid; grid-template-columns:repeat(4,1fr); gap:18px; position:relative;}
.steps::before{content:""; position:absolute; top:62px; left:8%; right:8%; height:2px; background:repeating-linear-gradient(90deg, var(--gold) 0 8px, transparent 8px 16px); z-index:0;}
.step{background:var(--paper); color:var(--ink); padding:30px 24px; display:flex; flex-direction:column; gap:12px; border-radius:3px; position:relative; z-index:1; border:1px dashed rgba(21,19,26,0.25); box-shadow:0 10px 22px rgba(0,0,0,0.45);}
.step::before{content:""; position:absolute; top:-1px; left:50%; transform:translate(-50%,-50%); width:34px; height:34px; border-radius:50%; background:var(--gold); border:3px solid var(--bg-soft); box-shadow:0 0 0 2px var(--gold);}
.step .stage{font-family:var(--mono); font-size:11px; color:var(--gold-deep); letter-spacing:3px; text-transform:uppercase; padding-top:14px; font-weight:600;}
.step h4{font-family:var(--serif); font-weight:400; font-size:20px; color:var(--ink); line-height:1.25; border-bottom:1px dashed rgba(21,19,26,0.25); padding-bottom:10px;}
.step p{font-size:13.5px; line-height:1.6; color:rgba(21,19,26,0.75); flex:1; font-family:var(--sans);}
.step a.link{font-family:var(--mono); font-size:12px; color:var(--green); border-bottom:1px solid var(--green); align-self:flex-start; letter-spacing:1px; text-transform:uppercase; font-weight:600;}
@media (max-width:900px){ .steps{grid-template-columns:1fr 1fr;} .steps::before{display:none;} }
@media (max-width:560px){ .steps{grid-template-columns:1fr;} }

/* --- tokenomics ledger --- */
.tokenomics{background:var(--bg);}
.ledger{max-width:820px; margin:0 auto; background:var(--paper); color:var(--ink); border-radius:3px; overflow:hidden; border:1px dashed rgba(21,19,26,0.3); box-shadow:0 20px 40px rgba(0,0,0,0.5); background-image:var(--noise), linear-gradient(180deg, var(--paper), var(--paper));}
.ledger-top{background:var(--ink); color:var(--paper); padding:22px 36px; display:flex; align-items:center; justify-content:space-between; font-family:var(--mono); font-size:11px; letter-spacing:3px; text-transform:uppercase;}
.ledger-top::before{content:"◉"; color:var(--gold);}
.ledger-row{display:flex; align-items:center; justify-content:space-between; padding:22px 36px; border-bottom:1px dashed rgba(21,19,26,0.2); gap:16px; position:relative;}
.ledger-row:last-child{border-bottom:none;}
.ledger-row .label{font-family:var(--mono); font-size:11px; color:rgba(21,19,26,0.55); letter-spacing:2.5px; text-transform:uppercase; display:flex; align-items:center; gap:10px;}
.ledger-row .label::before{content:""; width:18px; height:18px; border-radius:50%; border:2px solid var(--green); display:inline-block; background:radial-gradient(circle, var(--green) 30%, transparent 32%); opacity:0.7;}
.ledger-row .value{font-family:var(--mono); font-size:15px; font-weight:700; color:var(--ink);}
.ca-row{flex-direction:column; align-items:flex-start; gap:12px;}
.ca-box{width:100%; display:flex; gap:10px; align-items:center; background:rgba(21,19,26,0.06); padding:14px 16px; border-radius:3px; border:1px dashed rgba(21,19,26,0.25);}
.ca-box code{font-family:var(--mono); font-size:13px; flex:1; overflow-x:auto; white-space:nowrap; color:var(--ink); font-weight:600;}
.copy-btn{background:var(--ink); color:var(--gold); border:none; padding:10px 18px; border-radius:2px; font-family:var(--serif); font-size:12px; letter-spacing:2px; text-transform:uppercase; cursor:pointer; white-space:nowrap; box-shadow:0 4px 0 #000; transition:transform .12s, box-shadow .12s;}
.copy-btn:hover{transform:translateY(2px); box-shadow:0 2px 0 #000;}

/* --- community --- */
.community{background:var(--bg-soft); text-align:center;}
.social-row{display:flex; gap:16px; justify-content:center; flex-wrap:wrap; margin-top:34px;}
.social-pill{border:2px solid rgba(245,240,232,0.25); padding:16px 26px; border-radius:50px; font-family:var(--serif); font-size:13px; letter-spacing:2px; text-transform:uppercase; transition:all .25s; display:inline-block; background:rgba(245,240,232,0.03);}
.social-pill:hover{border-color:var(--gold); color:var(--gold); transform:translateY(-4px) rotate(-2deg); box-shadow:0 10px 20px rgba(0,0,0,0.4);}

/* --- footer aged paper --- */
.legal-footer{background:var(--paper); color:var(--ink); border-top:4px double var(--gold-deep); padding:50px 5vw 36px; text-align:center; position:relative; z-index:1; background-image:var(--noise), linear-gradient(180deg, var(--paper) 0%, var(--paper-shade) 100%);}
.legal-footer .seal-mini{width:46px;height:46px; margin:0 auto 16px; font-size:14px; border-color:var(--gold-deep); color:var(--gold-deep);}
.legal-footer p{font-size:13px; color:rgba(21,19,26,0.7); line-height:1.7; font-family:var(--sans);}
.legal-footer .legal-fine{margin-top:18px; font-size:11px; color:rgba(21,19,26,0.5); max-width:580px; margin-left:auto; margin-right:auto; font-family:var(--mono); letter-spacing:0.5px;}

/* --- scroll reveal --- */
.reveal{opacity:0; transform:translateY(28px); transition:opacity .8s ease-out, transform .8s cubic-bezier(.2,.7,.2,1);}
.reveal.in{opacity:1; transform:translateY(0);}
.case-file .stamp{opacity:0; transform:rotate(-8deg) scale(0.4);}
.case-file.in .stamp{animation:stampPop .6s cubic-bezier(.2,1.4,.4,1) forwards; animation-delay:.3s;}
@keyframes stampPop{
  0%{opacity:0; transform:rotate(22deg) scale(2.4);}
  60%{opacity:1; transform:rotate(-12deg) scale(0.9);}
  100%{opacity:1; transform:rotate(-9deg) scale(1);}
}
.floating-stamp{opacity:0;}
.hero-art.in .floating-stamp.s1{animation:stampPop .6s cubic-bezier(.2,1.4,.4,1) forwards; animation-delay:.5s;}
.hero-art.in .floating-stamp.s2{animation:stampPop2 .6s cubic-bezier(.2,1.4,.4,1) forwards; animation-delay:.8s;}
@keyframes stampPop2{
  0%{opacity:0; transform:rotate(-22deg) scale(2.4);}
  60%{opacity:1; transform:rotate(14deg) scale(0.9);}
  100%{opacity:1; transform:rotate(11deg) scale(1);}
}

/* --- confetti --- */
.confetti-layer{position:fixed; inset:0; pointer-events:none; z-index:60; overflow:hidden;}
.confetti-piece{position:absolute; top:-20px; width:10px; height:14px; opacity:.95; animation:confettiFall linear forwards;}
@keyframes confettiFall{0%{transform:translateY(-40px) rotate(0deg); opacity:0;}8%{opacity:1;}100%{transform:translateY(110vh) rotate(720deg); opacity:0;}}

/* --- pumpfun --- */
.pumpfun{background:var(--bg);}
.pumpfun-card{max-width:820px; margin:0 auto; background:linear-gradient(135deg, rgba(201,168,76,0.10) 0%, rgba(10,10,15,0.6) 100%); border:2px dashed rgba(201,168,76,0.4); border-radius:6px; padding:50px 42px; text-align:center; display:flex; flex-direction:column; gap:18px; align-items:center;}
.pumpfun-card .pumpfun-seal{width:70px;height:70px;border-radius:50%;border:3px double var(--gold); display:flex;align-items:center;justify-content:center;font-size:22px;color:var(--gold);font-family:var(--serif); font-weight:700; margin:0 auto; transform:rotate(-6deg);}
.pumpfun-card h3{font-family:var(--serif); font-weight:400; font-size:clamp(24px,3.5vw,34px); color:var(--paper); letter-spacing:-0.5px;}
.pumpfun-card p{color:var(--muted); font-size:16px; line-height:1.7; max-width:580px; font-family:var(--sans);}
.pumpfun-note{font-family:var(--mono); font-size:11px; color:var(--gold); letter-spacing:2px; margin-top:8px; text-transform:uppercase;}

/* --- buy fiat --- */
.buy-fiat{background:linear-gradient(160deg,#06091a 0%, #0B1F3A 55%, #1a0b3a 100%); position:relative;}
.buy-fiat::before{content:""; position:absolute; inset:0; background:radial-gradient(circle at 20% 30%, rgba(0,229,255,0.18), transparent 50%), radial-gradient(circle at 80% 70%, rgba(180,80,255,0.18), transparent 55%); pointer-events:none;}
.buy-grid{display:grid; grid-template-columns:1.05fr 1fr; gap:56px; max-width:1180px; margin:0 auto; align-items:center; position:relative; z-index:1;}
@media(max-width:880px){.buy-grid{grid-template-columns:1fr; gap:36px;}}
.buy-art{position:relative; display:flex; justify-content:center;}
.buy-art img{width:100%; max-width:520px; border-radius:18px; box-shadow:0 20px 60px rgba(0,229,255,0.35), 0 0 0 1px rgba(0,229,255,0.25), 0 30px 80px rgba(180,80,255,0.25); animation:buyFloat 6s ease-in-out infinite;}
.buy-art::after{content:""; position:absolute; inset:-20px; border-radius:24px; background:conic-gradient(from 0deg, rgba(0,229,255,0.4), rgba(180,80,255,0.4), rgba(0,229,255,0.4)); filter:blur(40px); opacity:0.55; z-index:-1; animation:buySpin 10s linear infinite;}
@keyframes buyFloat{0%,100%{transform:translateY(0);}50%{transform:translateY(-12px);}}
@keyframes buySpin{to{transform:rotate(360deg);}}
.buy-copy .eyebrow-neon{display:inline-block; font-family:var(--mono); font-size:12px; letter-spacing:3px; color:#00E5FF; padding:7px 14px; border:1px solid rgba(0,229,255,0.5); border-radius:2px; text-transform:uppercase; margin-bottom:18px; background:rgba(0,229,255,0.08);}
.buy-copy h2{font-family:var(--serif); font-weight:400; font-size:clamp(30px,4.5vw,46px); line-height:1.1; color:#fff; margin:0 0 18px;}
.buy-copy h2 span{background:linear-gradient(90deg,#00E5FF,#B450FF); -webkit-background-clip:text; background-clip:text; color:transparent;}
.buy-copy p{color:rgba(245,240,232,0.8); font-size:16px; line-height:1.7; margin:0 0 22px; max-width:520px; font-family:var(--sans);}
.buy-methods{display:flex; gap:10px; flex-wrap:wrap; margin-bottom:26px;}
.buy-chip{display:inline-flex; align-items:center; gap:8px; padding:10px 16px; border-radius:2px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.12); font-size:12px; letter-spacing:1.5px; color:#fff; font-family:var(--mono); text-transform:uppercase;}
.buy-chip b{color:#00E5FF;}
.btn-buy{display:inline-flex; align-items:center; gap:10px; padding:18px 32px; border-radius:4px; background:linear-gradient(90deg,#00E5FF,#B450FF); color:#06091a; font-family:var(--serif); font-weight:700; letter-spacing:2px; text-transform:uppercase; font-size:13px; box-shadow:0 10px 30px rgba(0,229,255,0.4); transition:transform .2s, box-shadow .2s;}
.btn-buy:hover{transform:translateY(-3px); box-shadow:0 16px 40px rgba(180,80,255,0.6);}
.buy-fine{display:block; margin-top:14px; font-family:var(--mono); font-size:11px; color:rgba(245,241,232,0.55); letter-spacing:1.5px;}

/* --- WEB3BRASIL partner banner --- */
.w3b-band{background:linear-gradient(135deg,#04060f 0%,#0d1230 55%,#1a0838 100%); position:relative; overflow:hidden; padding:70px 5vw !important;}
.w3b-band::before{content:""; position:absolute; inset:0; background:radial-gradient(circle at 30% 40%, rgba(0,229,255,0.18), transparent 50%), radial-gradient(circle at 75% 60%, rgba(180,80,255,0.20), transparent 55%); pointer-events:none;}
.w3b-band::after{content:""; position:absolute; inset:0; background:repeating-linear-gradient(45deg, transparent 0 100px, rgba(0,229,255,0.04) 100px 101px); pointer-events:none;}
.w3b-card{max-width:1080px; margin:0 auto; position:relative; z-index:1; background:rgba(10,10,24,0.55); border:1px solid rgba(0,229,255,0.28); border-radius:12px; padding:34px; display:grid; grid-template-columns:1.1fr 1fr; gap:38px; align-items:center; backdrop-filter:blur(8px); box-shadow:0 20px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(180,80,255,0.15);}
@media (max-width:820px){.w3b-card{grid-template-columns:1fr; text-align:center; padding:26px;}}
.w3b-logo-wrap{display:flex; justify-content:center; align-items:center; padding:14px; background:radial-gradient(ellipse at center, rgba(0,229,255,0.10), transparent 70%); border-radius:10px;}
.w3b-logo-wrap img{width:100%; max-width:420px; height:auto; display:block; filter:drop-shadow(0 8px 24px rgba(0,229,255,0.35));}
.w3b-copy .w3b-eye{display:inline-block; font-family:var(--mono); font-size:11px; letter-spacing:3px; color:#B450FF; text-transform:uppercase; padding:6px 12px; border:1px solid rgba(180,80,255,0.5); border-radius:2px; background:rgba(180,80,255,0.08); margin-bottom:12px;}
.w3b-copy h3{font-family:var(--serif); font-weight:400; font-size:clamp(22px,3vw,30px); color:#fff; margin:0 0 12px; line-height:1.2;}
.w3b-copy h3 span{background:linear-gradient(90deg,#00E5FF,#B450FF); -webkit-background-clip:text; background-clip:text; color:transparent;}
.w3b-copy p{color:rgba(245,240,232,0.75); font-size:14.5px; line-height:1.65; margin:0 0 18px; font-family:var(--sans);}
.w3b-cta{display:inline-flex; align-items:center; gap:10px; padding:14px 24px; border-radius:4px; background:linear-gradient(90deg,#B450FF,#00E5FF); color:#06091a; font-family:var(--serif); font-weight:700; letter-spacing:2px; text-transform:uppercase; font-size:12px; box-shadow:0 10px 26px rgba(180,80,255,0.4); transition:transform .2s, box-shadow .2s;}
.w3b-cta:hover{transform:translateY(-3px); box-shadow:0 16px 40px rgba(0,229,255,0.55);}


@media (max-width:560px){
  .legal-root section{padding:80px 5vw;}
  .hero{padding:120px 5vw 60px !important;}
}

@media (prefers-reduced-motion: reduce){
  html{scroll-behavior:auto;}
  .reveal{opacity:1 !important; transform:none !important; transition:none !important;}
  .case-file .stamp, .floating-stamp{opacity:1 !important; transform:rotate(-8deg) scale(1) !important; animation:none !important;}
  .floating-stamp.s2{transform:rotate(10deg) scale(1) !important;}
  .hero-art img, .buy-art img, .buy-art::after{animation:none !important;}
  .ticker-strip .track{animation:none !important;}
  .hero h1 span{animation:none !important;}
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
    heroLead:
      "$LEGAL nasceu de uma ideia simples: o caminho certo deveria ser o caminho fácil. Sem atalho, sem burocracia escondida, sem letra miúda — só um carimbo de aprovado e seguir em frente.",
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
    tweetQuote:
      '"Imigração legal pra gente honesta, trabalhadora e talentosa devia ser <em>fácil</em>. E imigração ilegal devia ser <em>difícil</em>."',
    tweetP:
      'Trocamos "imigração" por "memecoin" e o jogo virou. $LEGAL é o token de quem entra pela porta da frente.',
    storyEyebrow: "Processo nº LE-2026-001",
    storyH2: "O dossiê do $LEGAL",
    storyP:
      "Toda moeda tem uma origem. A nossa é um arquivo de três páginas — e a última ainda está sendo escrita por quem entrar agora.",
    case1No: "Página 1 — Análise inicial",
    case1Stamp: "Aprovado",
    case1H3: "O caminho difícil, feito do jeito certo",
    case1P:
      "$LEGAL representa quem faz tudo na ordem certa: pede, espera, prova, e só então atravessa a porta. Não é sobre ser rápido. É sobre ser correto — e ainda assim chegar lá.",
    case1Alt: "Pepe oficial carimbando LEGAL",
    case2No: "Página 2 — O que rejeitamos",
    case2Stamp: "Negado",
    case2H3: "Atalhos, promessas vazias e letra miúda",
    case2P:
      "Todo projeto que promete demais e explica de menos recebe o mesmo selo aqui: negado. $LEGAL não vende milagre — vende um processo transparente, do contrato à liquidez.",
    case2Alt: "Dossiê com carimbos approved e denied",
    case3No: "Página 3 — Status atual",
    case3Stamp: "Em andamento",
    case3H3: "A fila continua — e você pode entrar nela",
    case3P:
      "O dossiê do $LEGAL está aberto. Cada novo holder é mais uma entrada aprovada nesse arquivo. A história está sendo escrita agora, com quem decide entrar pela porta certa.",
    case3Alt: "Doge, Pepe e astronauta atravessando o portão LEGAL ENTRY",
    galleryEyebrow: "Arquivo visual",
    galleryH2: "Memes oficiais do processo",
    galleryP: "Cada imagem é um carimbo. Cada carimbo é uma piada interna que virou cultura.",
    howtoEyebrow: "Formulário de entrada",
    howtoH2: "Como comprar $LEGAL",
    howtoP: "Quatro carimbos até a aprovação final. Nenhum deles exige fila de verdade.",
    step1Stage: "Carimbo 01",
    step1H4: "Baixe uma carteira",
    step1P:
      "Instale a Phantom (ou a carteira Solana de sua preferência) no celular ou como extensão do navegador.",
    step1Link: "Baixar Phantom →",
    step2Stage: "Carimbo 02",
    step2H4: "Consiga SOL",
    step2P:
      "Compre SOL direto na carteira, transfira de outra carteira, ou compre numa exchange e envie para a sua.",
    step3Stage: "Carimbo 03",
    step3H4: "Acesse a Raydium",
    step3P:
      "Vá até raydium.io (ou Jup.ag) para trocar seu SOL por $LEGAL com a liquidez disponível.",
    step3Link: "Abrir Raydium →",
    step4Stage: "Carimbo 04",
    step4H4: "Cole o contrato e troque",
    step4P: "Cole o endereço do contrato (CA) abaixo, confirme a troca e pronto: entrada aprovada.",
    step4Link: "Ver o contrato ↓",
    tokenomicsEyebrow: "Certificado oficial",
    tokenomicsH2: "Tokenomics",
    tokenomicsP:
      "Sem alocação escondida para a equipe, 3% de taxa na compra e venda. 3% vai direto para LP queimada, aumentando a liquidez do $legal",
    ledgerCert: "certificado nº LE-0001",
    ledgerNet: "rede: solana",
    labelSupply: "Supply total",
    valueSupply: "10.000.000.000 $LEGAL",
    labelTax: "Taxa de compra/venda",
    valueTax: "3%",
    labelLp: "Liquidez",
    valueLp: "Queimada (LP burnt)",
    labelCa: "ENDEREÇO DO CONTRATO (CA)CONTRACT RENOUNCED",
    copyBtn: "Copiar",
    copiedBtn: "Copiado ✓",
    communityEyebrow: "Junte-se ao processo",
    communityH2: "A fila está aberta",
    communityP: "Acompanhe o caso, converse com outros holders e fique de olho na liquidez em tempo real.",
    footerDisclaimer:
      "$LEGAL é um memecoin sem valor intrínseco garantido. Nada aqui é aconselhamento financeiro.<br/>Pesquise antes de investir e só aplique o que estiver disposto a perder.",
    footerFine:
      "© 2026 $LEGAL. Todos os direitos reservados. Este site é uma peça de identidade de comunidade e não constitui oferta de valores mobiliários em nenhuma jurisdição.",
    galleryTag1: "Fila oficial",
    galleryTag2: "Carimbo final",
    galleryTag3: "O oficial",
    galleryTag4: "A travessia",
    galleryTag5: "O dossiê",
    galleryTag6: "Documento fundador",
    galleryTag7: "Shiba Oficial",
    galleryTag8: "Doge Passport",
    galleryTag9: "Doge Rally",
    galleryTag10: "Elon Approved",
    supportersEyebrow: "Aliados da causa",
    supportersH2: "Quem apoia a entrada legal",
    supportersP:
      "Desde o Doge até o Shiba, passando pelo próprio tweet que originou tudo — a comunidade que acredita em fazer as coisas do jeito certo.",
    pumpfunEyebrow: "Pump.fun",
    pumpfunH2: "Desafios e Recompensas",
    pumpfunP:
      "Entre na comunidade oficial da $LEGAL no Pump.fun. Participe de desafios semanais, conquiste recompensas em tokens e suba no ranking dos mais engajados.",
    pumpfunBtn: "Entrar na comunidade Pump.fun →",
    pumpfunNote: "Novos desafios toda semana. Recompensas pagas em $LEGAL.",
    buyEyebrow: "Compra facilitada",
    buyH2a: "Compre $LEGAL com",
    buyH2b: "Pix e Cartão de Crédito",
    buyP:
      "Não precisa de exchange, não precisa de carteira complicada. Pague em reais via Pix ou cartão de crédito direto pela Multitoken — a plataforma oficial de swap na Solana — e receba seus $LEGAL na hora.",
    buyChipPix: "Pix instantâneo",
    buyChipCard: "Cartão de Crédito",
    buyChipSol: "Entrega na Solana",
    buyBtn: "Comprar pela Multitoken →",
    buyFine: "Processado pela Multitoken · Solana Token Swap Platform",
    bonusEyebrow: "Oferta por tempo limitado",
    bonusTitle: "Bônus de ",
    bonusTitleHi: "10% em $LEGAL",
    bonusSub: "Compre agora na pré-venda e receba +10% de tokens extras. Termina em 10 de julho de 2026, 00:00 UTC.",
    bonusBtn: "COMPRAR $LEGAL AGORA",
    bonusEnded: "Bônus encerrado",
    bonusBadge: "+10%",
    bonusBadgeLbl: "Bônus",
    dLabel: "Dias",
    hLabel: "Horas",
    mLabel: "Min",
    sLabel: "Seg",
    w3bEyebrow: "Community Partner Oficial",
    w3bTitle: "Powered by ",
    w3bTitleHi: "WEB3BRASIL",
    w3bSub:
      "$LEGAL é apoiado pela WEB3BRASIL — a comunidade referência em Web3, DeFi e memecoins no Brasil. Conteúdo, educação e curadoria pra você entrar no cripto pela porta certa.",
    w3bBtn: "Visitar WEB3BRASIL →",
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
    heroLead:
      "$LEGAL was born from a simple idea: the right path should be the easy path. No shortcuts, no hidden bureaucracy, no fine print — just an approved stamp and moving forward.",
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
    tweetQuote:
      '"Legal immigration for honest, hardworking and talented people should be <em>easy</em>. And illegal immigration should be <em>hard</em>."',
    tweetP:
      'We swapped "immigration" for "memecoin" and the game changed. $LEGAL is the token for those who enter through the front door.',
    storyEyebrow: "Case #LE-2026-001",
    storyH2: "The $LEGAL dossier",
    storyP:
      "Every coin has an origin. Ours is a three-page file — and the last one is still being written by whoever enters now.",
    case1No: "Page 1 — Initial analysis",
    case1Stamp: "Approved",
    case1H3: "The hard way, done right",
    case1P:
      "$LEGAL represents those who do everything in the right order: ask, wait, prove, and only then cross the door. It's not about being fast. It's about being right — and still getting there.",
    case1Alt: "Pepe officer stamping LEGAL",
    case2No: "Page 2 — What we reject",
    case2Stamp: "Denied",
    case2H3: "Shortcuts, empty promises and fine print",
    case2P:
      "Every project that promises too much and explains too little gets the same stamp here: denied. $LEGAL doesn't sell miracles — it sells a transparent process, from contract to liquidity.",
    case2Alt: "Dossier with approved and denied stamps",
    case3No: "Page 3 — Current status",
    case3Stamp: "In progress",
    case3H3: "The queue continues — and you can join it",
    case3P:
      "The $LEGAL dossier is open. Every new holder is one more approved entry in this file. History is being written now, by those who decide to enter through the right door.",
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
    step2P:
      "Buy SOL directly in the wallet, transfer from another wallet, or buy on an exchange and send to yours.",
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
    tokenomicsP:
      "No hidden team allocation, 3% buy and sell tax. 3% goes directly to burnt LP, increasing $LEGAL's liquidity",
    ledgerCert: "certificate #LE-0001",
    ledgerNet: "network: solana",
    labelSupply: "Total supply",
    valueSupply: "10,000,000,000 $LEGAL",
    labelTax: "Buy/sell tax",
    valueTax: "3%",
    labelLp: "Liquidity",
    valueLp: "Burnt (LP burnt)",
    labelCa: "CONTRACT ADDRESS (CA)CONTRACT RENOUNCED",
    copyBtn: "Copy",
    copiedBtn: "Copied ✓",
    communityEyebrow: "Join the process",
    communityH2: "The queue is open",
    communityP: "Follow the case, chat with other holders and keep an eye on real-time liquidity.",
    footerDisclaimer:
      "$LEGAL is a memecoin with no guaranteed intrinsic value. Nothing here is financial advice.<br/>Do your own research and only invest what you are willing to lose.",
    footerFine:
      "© 2026 $LEGAL. All rights reserved. This site is a community identity piece and does not constitute a securities offer in any jurisdiction.",
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
    supportersP:
      "From Doge to Shiba, through the very tweet that started it all — the community that believes in doing things the right way.",
    pumpfunEyebrow: "Pump.fun",
    pumpfunH2: "Challenges & Rewards",
    pumpfunP:
      "Join the official $LEGAL community on Pump.fun. Take part in weekly challenges, earn token rewards and climb the engagement leaderboard.",
    pumpfunBtn: "Join Pump.fun Community →",
    pumpfunNote: "New challenges every week. Rewards paid in $LEGAL.",
    buyEyebrow: "Frictionless checkout",
    buyH2a: "Buy $LEGAL with",
    buyH2b: "Pix & Credit Card",
    buyP:
      "No exchange, no complicated wallet setup. Pay in your local currency via Pix or credit card directly through Multitoken — the official Solana swap platform — and receive your $LEGAL instantly.",
    buyChipPix: "Instant Pix",
    buyChipCard: "Credit Card",
    buyChipSol: "Delivered on Solana",
    buyBtn: "Buy via Multitoken →",
    buyFine: "Processed by Multitoken · Solana Token Swap Platform",
    bonusEyebrow: "Limited-time offer",
    bonusTitle: "Get a ",
    bonusTitleHi: "10% $LEGAL Bonus",
    bonusSub: "Buy now in the presale and receive +10% extra tokens. Ends July 10, 2026 at 00:00 UTC.",
    bonusBtn: "BUY $LEGAL NOW",
    bonusEnded: "Bonus ended",
    bonusBadge: "+10%",
    bonusBadgeLbl: "Bonus",
    dLabel: "Days",
    hLabel: "Hours",
    mLabel: "Min",
    sLabel: "Sec",
    w3bEyebrow: "Official Community Partner",
    w3bTitle: "Powered by ",
    w3bTitleHi: "WEB3BRASIL",
    w3bSub:
      "$LEGAL is backed by WEB3BRASIL — Brazil's leading community for Web3, DeFi and memecoins. Content, education and curation to help you enter crypto the right way.",
    w3bBtn: "Visit WEB3BRASIL →",
  },
};

function Web3BrasilBanner({ t }: { t: Record<string, string> }) {
  return (
    <section className="w3b-band" aria-label="WEB3BRASIL Community Partner">
      <div className="w3b-card reveal">
        
          className="w3b-logo-wrap"
          href="https://web3brasil.life"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WEB3BRASIL"
        >
          <img src={web3brasilLogo} alt="WEB3BRASIL logo" loading="lazy" width={1280} height={512} />
        </a>
        <div className="w3b-copy">
          <span className="w3b-eye">{t.w3bEyebrow}</span>
          <h3>
            {t.w3bTitle}
            <span>{t.w3bTitleHi}</span>
          </h3>
          <p>{t.w3bSub}</p>
          <a className="w3b-cta" href="https://web3brasil.life" target="_blank" rel="noopener noreferrer">
            {t.w3bBtn}
          </a>
        </div>
      </div>
    </section>
  );
}

function LegalPage() {
  const [lang, setLang] = useLang();
  const [copied, setCopied] = useState(false);
  const [confetti, setConfetti] = useState
    Array<{ id: number; left: number; bg: string; delay: number; dur: number; rot: number }>
  >([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const ca = "XhHLJpJtEHJucpYpAti2JvNs6eYsjeuFjRj9wvvaLDL";
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
          <a href="#buy">Pix/Card</a>
          <a href="#community">{t.navCommunity}</a>
        </div>
        <div className="lang-toggle" aria-label="Language switcher">
          <button
            type="button"
            onClick={() => setLang("pt")}
            aria-pressed={lang === "pt"}
            className={lang === "pt" ? "active" : ""}
          >
            PT
          </button>
          <button
            type="button"
            onClick={() => setLang("en")}
            aria-pressed={lang === "en"}
            className={lang === "en" ? "active" : ""}
          >
            EN
          </button>
        </div>
        <a href="#buy" className="nav-cta">
          {t.navCta}
        </a>
      </nav>

      <section className="hero">
        <div className="hero-grid">
          <div className="hero-text">
            <span className="eyebrow">{t.heroEyebrow}</span>
            <h1>
              {t.heroH1a}
              <span>{t.heroH1b}</span>
            </h1>
            <p className="lead">{t.heroLead}</p>
            <div className="hero-actions">
              <a href="#buy" className="btn-primary">
                {t.heroBtnPrimary}
              </a>
              <a href="#historia" className="btn-secondary">
                {t.heroBtnSecondary}
              </a>
            </div>
          </div>
          <div className="hero-art">
            <div className="floating-stamp s1">{t.case1Stamp}</div>
            <div className="floating-stamp s2">100% legal</div>
            <img src={memeQueue} alt="Doge officer approving $LEGAL passports" width={1024} height={1024} />
          </div>
        </div>
      </section>

      <HoldersSection />

      <section className="ticker-strip">
        <div className="track">
          <span>{t.ticker1}</span>
          <span>{t.ticker2}</span>
          <span>{t.ticker3}</span>
          <span>{t.ticker4}</span>
          <span>{t.ticker5}</span>
          <span>{t.ticker6}</span>
          <span>{t.ticker1}</span>
          <span>{t.ticker2}</span>
          <span>{t.ticker3}</span>
          <span>{t.ticker4}</span>
          <span>{t.ticker5}</span>
          <span>{t.ticker6}</span>
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
            <p style={{ marginTop: "20px", color: "rgba(245,241,232,0.6)", fontSize: "14px" }}>{t.tweetP}</p>
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
          <div className="gallery-item reveal">
            <img src={memeShibaOfficer} alt={t.galleryTag7} loading="lazy" width={1024} height={1024} />
            <span className="tag">{t.galleryTag7}</span>
          </div>
          <div className="gallery-item reveal">
            <img src={memeDogePassport} alt={t.galleryTag8} loading="lazy" width={1024} height={1024} />
            <span className="tag">{t.galleryTag8}</span>
          </div>
          <div className="gallery-item reveal">
            <img src={memeDogeRally} alt={t.galleryTag9} loading="lazy" width={1024} height={1024} />
            <span className="tag">{t.galleryTag9}</span>
          </div>
          <div className="gallery-item reveal">
            <img src={memeElonLegal} alt={t.galleryTag10} loading="lazy" width={1024} height={1024} />
            <span className="tag">{t.galleryTag10}</span>
          </div>
          <div className="gallery-item reveal">
            <img src={memeQueue} alt={t.galleryTag1} loading="lazy" width={1024} height={1024} />
            <span className="tag">{t.galleryTag1}</span>
          </div>
          <div className="gallery-item reveal">
            <img src={memeStamp} alt={t.galleryTag2} loading="lazy" width={1024} height={1024} />
            <span className="tag">{t.galleryTag2}</span>
          </div>
          <div className="gallery-item reveal">
            <img src={memeOfficer} alt={t.galleryTag3} loading="lazy" width={1024} height={1024} />
            <span className="tag">{t.galleryTag3}</span>
          </div>
          <div className="gallery-item reveal">
            <img src={memeGateway} alt={t.galleryTag4} loading="lazy" width={1024} height={1024} />
            <span className="tag">{t.galleryTag4}</span>
          </div>
          <div className="gallery-item reveal">
            <img src={memeDossier} alt={t.galleryTag5} loading="lazy" width={1024} height={1024} />
            <span className="tag">{t.galleryTag5}</span>
          </div>
          <div className="gallery-item reveal">
            <img src={tweetAsset.url} alt={t.galleryTag6} loading="lazy" width={1024} height={1024} />
            <span className="tag">{t.galleryTag6}</span>
          </div>
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
            <a className="link" href="https://phantom.app" target="_blank" rel="noreferrer">
              {t.step1Link}
            </a>
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
            <a className="link" href="https://raydium.io" target="_blank" rel="noreferrer">
              {t.step3Link}
            </a>
          </div>
          <div className="step reveal">
            <span className="stage">{t.step4Stage}</span>
            <h4>{t.step4H4}</h4>
            <p>{t.step4P}</p>
            <a className="link" href="#tokenomics">
              {t.step4Link}
            </a>
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
          <div className="ledger-row">
            <span className="label">{t.labelSupply}</span>
            <span className="value">{t.valueSupply}</span>
          </div>
          <div className="ledger-row">
            <span className="label">{t.labelTax}</span>
            <span className="value">{t.valueTax}</span>
          </div>
          <div className="ledger-row">
            <span className="label">{t.labelLp}</span>
            <span className="value">{t.valueLp}</span>
          </div>
          <div className="ledger-row ca-row">
            <span className="label">{t.labelCa}</span>
            <div className="ca-box">
              <code>{ca}</code>
              <button className="copy-btn" onClick={copy}>
                {copied ? t.copiedBtn : t.copyBtn}
              </button>
            </div>
          </div>
        </div>
      </section>

      <Web3BrasilBanner t={t} />

      <section id="pumpfun" className="pumpfun">
        <div className="section-head reveal">
          <span className="eyebrow">{t.pumpfunEyebrow}</span>
          <h2>{t.pumpfunH2}</h2>
        </div>
        <div className="pumpfun-card reveal">
          <div className="pumpfun-seal">$L</div>
          <h3>{t.pumpfunH2}</h3>
          <p>{t.pumpfunP}</p>
          
            className="btn-primary"
            href="#"
            target="_blank"
            rel="noreferrer"
            onClick={fireConfetti}
          >
            {t.pumpfunBtn}
          </a>
          <span className="pumpfun-note">{t.pumpfunNote}</span>
        </div>
      </section>

      <section id="buy" className="buy-fiat">
        <div className="buy-grid">
          <div className="buy-art reveal">
            <img src={multitokenBuy} alt="Multitoken — Solana Token Swap Platform" />
          </div>
          <div className="buy-copy reveal">
            <span className="eyebrow-neon">{t.buyEyebrow}</span>
            <h2>
              {t.buyH2a} <span>{t.buyH2b}</span>
            </h2>
            <p>{t.buyP}</p>
            <div className="buy-methods">
              <span className="buy-chip">
                <b>◉</b> {t.buyChipPix}
              </span>
              <span className="buy-chip">
                <b>▣</b> {t.buyChipCard}
              </span>
              <span className="buy-chip">
                <b>◆</b> {t.buyChipSol}
              </span>
            </div>
            
              className="btn-buy"
              href="https://multitoken.com.br"
              target="_blank"
              rel="noreferrer"
              onClick={fireConfetti}
            >
              {t.buyBtn}
            </a>
            <span className="buy-fine">{t.buyFine}</span>
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
          
            className="social-pill"
            href="https://x.com/legal_elon"
            target="_blank"
            rel="noreferrer"
          >
            X (Twitter)
          </a>
          <a className="social-pill" href="https://t.me/elonlegal" target="_blank" rel="noreferrer">
            Telegram
          </a>
          
            className="social-pill"
            href="https://coinmarketcap.com/community/profile/legal_"
            target="_blank"
            rel="noreferrer"
          >
            CMC Community
          </a>
          <a className="social-pill" href="#" target="_blank" rel="noreferrer">
            Dex Screener
          </a>
          
            className="social-pill"
            href="https://solscan.io/token/XhHLJpJtEHJucpYpAti2JvNs6eYsjeuFjRj9wvvaLDL"
            target="_blank"
            rel="noreferrer"
          >
            Solscan
          </a>
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

  
  
        
         
           
          
       
            
        
            
            
       
              
         
              
         
     
 
