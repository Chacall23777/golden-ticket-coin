import web3brasilLogo from "@/assets/web3brasil-logo.png";

export function FloatingWeb3Brasil() {
  return (
    <>
      <style>{CSS}</style>
      <a
        href="https://web3brasil.life"
        target="_blank"
        rel="noopener noreferrer"
        className="w3b-float"
        aria-label="WEB3BRASIL Community Partner"
      >
        <div className="w3b-float-inner">
          <div className="w3b-float-logo-wrap">
            <img src={web3brasilLogo} alt="WEB3BRASIL" loading="lazy" />
          </div>
          <div className="w3b-float-copy">
            <span className="w3b-float-eye">Community Partner</span>
            <span className="w3b-float-title">WEB3BRASIL</span>
            <span className="w3b-float-link">web3brasil.life →</span>
          </div>
        </div>
      </a>
    </>
  );
}

const CSS = `
.w3b-float{
  position:fixed;
  bottom:22px;
  right:22px;
  z-index:9998;
  width:240px;
  text-decoration:none;
  display:block;
  transition:transform .25s ease, box-shadow .25s ease;
}
.w3b-float-inner{
  position:relative;
  background:linear-gradient(135deg, rgba(10,10,24,0.95) 0%, rgba(20,16,40,0.95) 100%);
  border:1px solid rgba(0,229,255,0.35);
  border-radius:24px;
  padding:10px 14px;
  display:flex;
  align-items:center;
  gap:10px;
  box-shadow:0 10px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(180,80,255,0.12), inset 0 0 20px rgba(0,229,255,0.06);
  backdrop-filter:blur(10px);
  overflow:hidden;
}
.w3b-float:hover{
  transform:translateY(-3px);
  box-shadow:0 16px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(180,80,255,0.25), 0 0 28px rgba(0,229,255,0.12);
}
.w3b-float-logo-wrap{
  width:44px;
  height:44px;
  flex-shrink:0;
  display:flex;
  align-items:center;
  justify-content:center;
  background:radial-gradient(circle, rgba(0,229,255,0.10), transparent 70%);
  border-radius:50%;
}
.w3b-float-logo-wrap img{
  width:100%;
  height:100%;
  object-fit:contain;
  display:block;
  filter:drop-shadow(0 3px 10px rgba(0,229,255,0.25));
}
.w3b-float-copy{
  display:flex;
  flex-direction:column;
  gap:1px;
  min-width:0;
}
.w3b-float-eye{
  font-family:'IBM Plex Mono','Courier New',monospace;
  font-size:8px;
  letter-spacing:2px;
  text-transform:uppercase;
  color:#B450FF;
  white-space:nowrap;
}
.w3b-float-title{
  font-family:'Special Elite','Courier Prime','Courier New',monospace;
  font-size:13px;
  font-weight:700;
  letter-spacing:1px;
  color:#fff;
  white-space:nowrap;
}
.w3b-float-link{
  font-family:'IBM Plex Mono','Courier New',monospace;
  font-size:9px;
  letter-spacing:1.5px;
  color:#00E5FF;
  text-transform:uppercase;
  margin-top:1px;
  white-space:nowrap;
  transition:color .2s;
}
.w3b-float:hover .w3b-float-link{
  color:#B450FF;
}

@media (max-width:480px){
  .w3b-float{
    bottom:14px;
    right:14px;
    width:210px;
  }
  .w3b-float-inner{
    padding:8px 10px;
  }
  .w3b-float-logo-wrap{
    width:40px;
    height:40px;
  }
  .w3b-float-title{
    font-size:11px;
  }
}
@media (prefers-reduced-motion: reduce){
  .w3b-float{transition:none !important;}
}
`;
