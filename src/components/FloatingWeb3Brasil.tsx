import { useState } from "react";
import web3brasilLogo from "@/assets/web3brasil-logo.png";

export function FloatingWeb3Brasil() {
  const [minimized, setMinimized] = useState(false);

  return (
    <>
      <style>{CSS}</style>
      <a
        href="https://web3brasil.life"
        target="_blank"
        rel="noopener noreferrer"
        className={`w3b-float ${minimized ? "w3b-float-min" : ""}`}
        aria-label="WEB3BRASIL Community Partner"
      >
        <button
          type="button"
          className="w3b-float-close"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setMinimized((v) => !v);
          }}
          aria-label={minimized ? "Expandir banner" : "Minimizar banner"}
        >
          {minimized ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          )}
        </button>

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
  width:280px;
  text-decoration:none;
  display:block;
  transition:transform .25s ease, box-shadow .25s ease, width .25s ease;
}
.w3b-float-min{
  width:54px;
  height:54px;
  border-radius:50%;
  overflow:hidden;
}
.w3b-float-inner{
  position:relative;
  background:linear-gradient(135deg, rgba(10,10,24,0.95) 0%, rgba(20,16,40,0.95) 100%);
  border:1px solid rgba(0,229,255,0.35);
  border-radius:14px;
  padding:14px 16px;
  display:flex;
  align-items:center;
  gap:12px;
  box-shadow:0 14px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(180,80,255,0.12), inset 0 0 24px rgba(0,229,255,0.06);
  backdrop-filter:blur(10px);
  overflow:hidden;
}
.w3b-float-min .w3b-float-inner{
  padding:0;
  border-radius:50%;
  width:54px;
  height:54px;
  justify-content:center;
  align-items:center;
  gap:0;
}
.w3b-float:hover{
  transform:translateY(-3px);
  box-shadow:0 20px 50px rgba(0,0,0,0.6), 0 0 0 1px rgba(180,80,255,0.25), 0 0 30px rgba(0,229,255,0.15);
}
.w3b-float-close{
  position:absolute;
  top:8px;
  right:8px;
  z-index:2;
  width:22px;
  height:22px;
  border-radius:50%;
  background:rgba(255,255,255,0.08);
  border:1px solid rgba(255,255,255,0.15);
  color:rgba(245,240,232,0.7);
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
  padding:0;
  transition:all .15s;
}
.w3b-float-close:hover{
  background:rgba(255,255,255,0.18);
  color:#fff;
  border-color:rgba(0,229,255,0.5);
}
.w3b-float-min .w3b-float-close{
  top:2px;
  right:2px;
  width:18px;
  height:18px;
}
.w3b-float-logo-wrap{
  width:64px;
  height:64px;
  flex-shrink:0;
  display:flex;
  align-items:center;
  justify-content:center;
  background:radial-gradient(circle, rgba(0,229,255,0.10), transparent 70%);
  border-radius:10px;
}
.w3b-float-min .w3b-float-logo-wrap{
  width:42px;
  height:42px;
  background:none;
}
.w3b-float-logo-wrap img{
  width:100%;
  height:100%;
  object-fit:contain;
  display:block;
  filter:drop-shadow(0 4px 12px rgba(0,229,255,0.25));
}
.w3b-float-min .w3b-float-logo-wrap img{
  filter:drop-shadow(0 4px 12px rgba(0,229,255,0.4));
}
.w3b-float-copy{
  display:flex;
  flex-direction:column;
  gap:2px;
  min-width:0;
}
.w3b-float-min .w3b-float-copy{
  display:none;
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
  font-size:14px;
  font-weight:700;
  letter-spacing:1px;
  color:#fff;
  white-space:nowrap;
}
.w3b-float-link{
  font-family:'IBM Plex Mono','Courier New',monospace;
  font-size:10px;
  letter-spacing:1.5px;
  color:#00E5FF;
  text-transform:uppercase;
  margin-top:2px;
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
    width:240px;
  }
  .w3b-float-inner{
    padding:10px 12px;
  }
  .w3b-float-logo-wrap{
    width:48px;
    height:48px;
  }
  .w3b-float-title{
    font-size:12px;
  }
}
@media (prefers-reduced-motion: reduce){
  .w3b-float{transition:none !important;}
}
`;
