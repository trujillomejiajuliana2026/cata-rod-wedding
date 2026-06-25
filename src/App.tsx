import { useState } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Imperial+Script&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Cormorant+Garamond:wght@300;400;600&family=Josefin+Sans:wght@300;400;500&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

.scene{
  min-height:100vh;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  background:radial-gradient(ellipse at 50% 30%, #261208 0%, #0E0604 100%);
  padding:24px 16px;
  font-family:'Cormorant Garamond',serif;
}

.card{
  width:100%;max-width:430px;
  background:#FAF0E4;
  position:relative;overflow:hidden;
  box-shadow:0 32px 100px rgba(0,0,0,0.65), 0 0 0 1px rgba(196,113,74,0.18);
}

/* Terracotta inner border */
.tc-border{
  position:absolute;inset:13px;
  border:1px solid rgba(196,113,74,0.45);
  pointer-events:none;z-index:20;
  opacity:0;animation:aFade 1.2s ease forwards 0.6s;
}
.corner{
  position:absolute;width:6px;height:6px;
  background:#C4714A;transform:rotate(45deg);
  opacity:0;animation:aFade 0.5s ease forwards 0.6s;
  z-index:21;
}
.corner.tl{top:10px;left:10px;}
.corner.tr{top:10px;right:10px;}
.corner.bl{bottom:10px;left:10px;}
.corner.br{bottom:10px;right:10px;}

/* Botanical header */
.floral-wrap{
  display:block;width:100%;
  opacity:0;
  animation:aFloral 1.4s cubic-bezier(0.34,1.1,0.64,1) forwards 0.1s;
}

/* Body */
.body{padding:6px 40px 26px;text-align:center;position:relative;}

/* Names — Imperial Script */
.name-a{
  display:block;
  font-family:'Imperial Script',cursive;
  font-size:clamp(56px,13vw,76px);
  color:#7A3820;line-height:1.05;
  opacity:0;animation:aSlideL 0.9s cubic-bezier(0.25,0.46,0.45,0.94) forwards 1.4s;
}
.amp-row{
  display:flex;align-items:center;justify-content:center;
  gap:10px;margin:2px 0;
  opacity:0;animation:aFade 0.6s ease forwards 2.0s;
}
.amp-line{height:1px;flex:1;max-width:44px;}
.amp-line.l{background:linear-gradient(to right,transparent,#C4714A77);}
.amp-line.r{background:linear-gradient(to left,transparent,#C4714A77);}
.amp{
  font-family:'Imperial Script',cursive;
  font-size:clamp(30px,7vw,40px);
  color:#C4714A;
  opacity:0;animation:aPop 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards 2.1s;
}
.name-b{
  display:block;
  font-family:'Imperial Script',cursive;
  font-size:clamp(56px,13vw,76px);
  color:#7A3820;line-height:1.05;
  opacity:0;animation:aSlideR 0.9s cubic-bezier(0.25,0.46,0.45,0.94) forwards 2.4s;
}

/* Divider */
.divider{
  display:flex;align-items:center;justify-content:center;
  gap:10px;margin:13px 0 10px;
  opacity:0;animation:aFade 0.7s ease forwards 3.0s;
}
.div-line{flex:1;height:1px;background:#C4714A55;}
.div-leaf{color:#8A9E6A;font-size:11px;opacity:0.75;}

/* Tagline */
.tagline{
  font-family:'Josefin Sans',sans-serif;
  font-size:8px;letter-spacing:3.5px;
  color:#B09080;text-transform:uppercase;
  margin-bottom:5px;
  opacity:0;animation:aRise 0.6s ease forwards 3.3s;
}
.main-title{
  font-family:'Playfair Display',serif;
  font-size:clamp(14px,3.8vw,19px);
  letter-spacing:5.5px;color:#7A3820;
  text-transform:uppercase;font-weight:600;
  opacity:0;animation:aRise 0.8s ease forwards 3.6s;
}

/* Info grid */
.info-wrap{
  margin-top:20px;padding-top:16px;
  border-top:1px solid rgba(196,113,74,0.28);
}
.info-grid{display:grid;grid-template-columns:1fr 1fr;}
.cell{padding:11px 10px 11px 4px;text-align:left;opacity:0;}
.cell:nth-child(1){padding-right:14px;border-right:1px solid rgba(196,113,74,0.2);border-bottom:1px solid rgba(196,113,74,0.2);animation:aRise 0.6s ease forwards 4.1s;}
.cell:nth-child(2){padding-left:14px;border-bottom:1px solid rgba(196,113,74,0.2);animation:aRise 0.6s ease forwards 4.3s;}
.cell:nth-child(3){padding-right:14px;border-right:1px solid rgba(196,113,74,0.2);animation:aRise 0.6s ease forwards 4.5s;}
.cell:nth-child(4){padding-left:14px;animation:aRise 0.6s ease forwards 4.7s;}

.cell-icon{
  width:28px;height:28px;
  display:flex;align-items:center;justify-content:center;
  margin-bottom:8px;
  position:relative;
}
.cell-icon::after{
  content:'';
  position:absolute;
  bottom:-3px;left:0;
  width:18px;height:1px;
  background:rgba(196,113,74,0.35);
}
.cell-tag{
  font-family:'Josefin Sans',sans-serif;
  font-size:7px;letter-spacing:2.5px;
  color:#C4714A;text-transform:uppercase;margin-bottom:3px;
}
.cell-main{
  font-family:'Playfair Display',serif;
  font-size:12.5px;color:#7A3820;
  font-weight:600;line-height:1.35;
}
.cell-sub{
  font-family:'Cormorant Garamond',serif;
  font-size:11px;color:#A08870;
  margin-top:2px;line-height:1.4;
}

/* RSVP */
.rsvp-row{
  display:flex;align-items:center;justify-content:space-between;
  padding-top:15px;margin-top:15px;
  border-top:1px solid rgba(196,113,74,0.28);
  opacity:0;animation:aRise 0.7s ease forwards 5.1s;
}
.rsvp-label{
  font-family:'Josefin Sans',sans-serif;
  font-size:7px;letter-spacing:2.5px;
  color:#C4714A;text-transform:uppercase;
  display:block;margin-bottom:3px;
}
.rsvp-num{
  font-family:'Playfair Display',serif;
  font-size:15px;color:#7A3820;letter-spacing:0.5px;
}
.rsvp-btn{
  background:transparent;
  border:1px solid #C4714A;
  color:#C4714A;padding:8px 16px;
  font-family:'Josefin Sans',sans-serif;
  font-size:7px;letter-spacing:2.5px;text-transform:uppercase;
  cursor:pointer;transition:all 0.35s;
}
.rsvp-btn:hover{background:#C4714A;color:#FAF0E4;}

/* Footer */
.footer{
  padding:12px 0 18px;text-align:center;
  opacity:0;animation:aFade 0.8s ease forwards 5.7s;
}
.footer-orn{display:flex;align-items:center;justify-content:center;gap:10px;}
.f-line{flex:1;max-width:48px;height:1px;background:#C4714A44;}
.f-leaf{color:#8A9E6A;font-size:12px;opacity:0.7;}
.f-terra{color:#C4714A;font-size:9px;opacity:0.6;}

/* START SCREEN */
.start-scene{
  min-height:100vh;display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  background:radial-gradient(ellipse at 50% 30%, #261208 0%, #0E0604 100%);
  gap:20px;padding:20px;
}
.start-eyebrow{
  font-family:'Josefin Sans',sans-serif;
  font-size:9px;letter-spacing:5px;
  color:rgba(196,113,74,0.45);text-transform:uppercase;
  animation:aFade 1s ease forwards;
}
.start-names{
  font-family:'Imperial Script',cursive;
  font-size:clamp(42px,11vw,58px);
  color:#C4714A;text-align:center;line-height:1.1;
  animation:aRise 1.2s ease forwards;
}
.start-rule{width:60px;height:1px;background:rgba(196,113,74,0.3);animation:aFade 1s 0.3s both;}
.start-btn{
  background:transparent;
  border:1px solid rgba(196,113,74,0.55);
  color:#C4714A;padding:12px 52px;
  font-family:'Josefin Sans',sans-serif;
  font-size:8.5px;letter-spacing:4px;text-transform:uppercase;
  cursor:pointer;transition:all 0.4s;margin-top:4px;
  animation:aFade 1s 0.5s both;
}
.start-btn:hover{background:rgba(196,113,74,0.1);border-color:#C4714A;}

.replay-btn{
  margin-top:14px;background:transparent;
  border:1px solid rgba(196,113,74,0.25);
  color:rgba(196,113,74,0.5);padding:7px 22px;
  font-family:'Josefin Sans',sans-serif;
  font-size:7.5px;letter-spacing:2.5px;text-transform:uppercase;
  cursor:pointer;transition:all 0.3s;
  opacity:0;animation:aFade 0.8s ease forwards 6.2s;
}
.replay-btn:hover{color:#C4714A;border-color:rgba(196,113,74,0.45);}

/* KEYFRAMES */
@keyframes aFade{from{opacity:0;}to{opacity:1;}}
@keyframes aFloral{from{opacity:0;transform:translateY(-20px);}to{opacity:1;transform:translateY(0);}}
@keyframes aSlideL{from{opacity:0;transform:translateX(-28px);}to{opacity:1;transform:translateX(0);}}
@keyframes aSlideR{from{opacity:0;transform:translateX(28px);}to{opacity:1;transform:translateX(0);}}
@keyframes aPop{from{opacity:0;transform:scale(0.3);}to{opacity:1;transform:scale(1);}}
@keyframes aRise{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
`;

/* ─── ELEGANT SVG ICONS ─── */
const IC = { color: "#C4714A", w: 1, lc: "round", lj: "round" };

const IconDate = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2.5" y="4" width="15" height="14" rx="1.5" stroke={IC.color} strokeWidth={IC.w}/>
    <line x1="2.5" y1="8.5" x2="17.5" y2="8.5" stroke={IC.color} strokeWidth="0.85"/>
    <line x1="6.5" y1="2" x2="6.5" y2="6" stroke={IC.color} strokeWidth={IC.w} strokeLinecap={IC.lc}/>
    <line x1="13.5" y1="2" x2="13.5" y2="6" stroke={IC.color} strokeWidth={IC.w} strokeLinecap={IC.lc}/>
    <rect x="5.5" y="11" width="2.5" height="2.5" rx="0.5" fill={IC.color} opacity="0.6"/>
    <rect x="10" y="11" width="2.5" height="2.5" rx="0.5" fill={IC.color} opacity="0.6"/>
    <rect x="5.5" y="14.5" width="2.5" height="2.5" rx="0.5" fill={IC.color} opacity="0.35"/>
    <rect x="10" y="14.5" width="2.5" height="2.5" rx="0.5" fill={IC.color} opacity="0.35"/>
  </svg>
);

const IconVenue = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2C6.86 2 4.3 4.56 4.3 7.7C4.3 12.25 10 18 10 18C10 18 15.7 12.25 15.7 7.7C15.7 4.56 13.14 2 10 2Z"
      stroke={IC.color} strokeWidth={IC.w} strokeLinejoin={IC.lj}/>
    <circle cx="10" cy="7.7" r="2.4" stroke={IC.color} strokeWidth="0.85"/>
  </svg>
);

const IconTime = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="7.5" stroke={IC.color} strokeWidth={IC.w}/>
    <line x1="10" y1="10" x2="10" y2="5.5" stroke={IC.color} strokeWidth={IC.w} strokeLinecap={IC.lc}/>
    <line x1="10" y1="10" x2="13.8" y2="12.5" stroke={IC.color} strokeWidth={IC.w} strokeLinecap={IC.lc}/>
    <circle cx="10" cy="10" r="1.1" fill={IC.color}/>
    <line x1="10" y1="2.8" x2="10" y2="4" stroke={IC.color} strokeWidth="0.85"/>
    <line x1="10" y1="16" x2="10" y2="17.2" stroke={IC.color} strokeWidth="0.85"/>
    <line x1="2.8" y1="10" x2="4" y2="10" stroke={IC.color} strokeWidth="0.85"/>
    <line x1="16" y1="10" x2="17.2" y2="10" stroke={IC.color} strokeWidth="0.85"/>
  </svg>
);

const IconDress = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    {/* Hanger hook */}
    <path d="M10 5C10 5 11.8 3.5 13 4C14.2 4.5 14 6 13 6.5" stroke={IC.color} strokeWidth={IC.w} strokeLinecap={IC.lc} fill="none"/>
    {/* Hanger bar */}
    <path d="M3 7.5C3 7.5 10 12 17 7.5" stroke={IC.color} strokeWidth={IC.w} strokeLinecap={IC.lc} fill="none"/>
    {/* Dress body */}
    <path d="M5.5 8L4 17.5H16L14.5 8" stroke={IC.color} strokeWidth={IC.w} strokeLinecap={IC.lc} strokeLinejoin={IC.lj} fill="none"/>
    {/* Waist line */}
    <line x1="5.5" y1="11.5" x2="14.5" y2="11.5" stroke={IC.color} strokeWidth="0.7" opacity="0.6"/>
  </svg>
);

/* ─── PAMPAS STRAND helper ─── */
const strands = (cx, cy, count, spread, lenMin, lenMax, color, op = 0.75) =>
  Array.from({ length: count }, (_, i) => {
    const a = -spread / 2 + (spread / (count - 1)) * i;
    const len = lenMin + ((lenMax - lenMin) / (count - 1)) * Math.abs(i - count / 2) * 0.6;
    const rad = (a * Math.PI) / 180;
    const ex = cx + Math.sin(rad) * len;
    const ey = cy - Math.cos(rad) * len;
    const cx1 = cx + Math.sin(rad * 0.5) * len * 0.4;
    const cy1 = cy - Math.cos(rad * 0.5) * len * 0.5;
    return (
      <path
        key={i}
        d={`M${cx},${cy} Q${cx1},${cy1} ${ex},${ey}`}
        stroke={color}
        strokeWidth={i % 3 === 0 ? 0.7 : 0.5}
        fill="none"
        opacity={op - Math.abs(i - count / 2) * 0.02}
      />
    );
  });

function BotanicalSVG() {
  const bg = "#FAF0E4";
  return (
    <svg viewBox="0 0 430 205" xmlns="http://www.w3.org/2000/svg" className="floral-wrap">
      <rect width="430" height="205" fill={bg} />

      {/* ── TALL GRASSES — LEFT ── */}
      <path d="M 95,205 Q 88,160 80,120 Q 75,95 65,70" stroke="#A07840" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M 65,70 Q 58,45 55,20" stroke="#A07840" strokeWidth="1" fill="none" strokeLinecap="round" />
      <ellipse cx="55" cy="16" rx="5" ry="10" fill="#C4714A" opacity="0.55" transform="rotate(-8 55 16)" />

      <path d="M 115,205 Q 110,168 108,135 Q 105,108 100,82" stroke="#8B6B3A" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <path d="M 100,82 Q 96,58 94,30" stroke="#8B6B3A" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <ellipse cx="93" cy="25" rx="4.5" ry="9" fill="#D4A870" opacity="0.6" transform="rotate(5 93 25)" />

      <path d="M 72,205 Q 68,172 62,142 Q 56,115 50,88" stroke="#9A7848" strokeWidth="1" fill="none" strokeLinecap="round" />
      <circle cx="49" cy="84" r="3.5" fill="#C4714A" opacity="0.45" />
      <circle cx="49" cy="78" r="2.5" fill="#C4714A" opacity="0.35" />

      {/* ── SMALL LEFT GRASSES ── */}
      <path d="M 45,205 Q 38,178 30,155 Q 22,132 15,108" stroke="#B09050" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <path d="M 28,205 Q 22,182 16,162 Q 10,142 6,122" stroke="#9A7848" strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <path d="M 58,205 Q 52,188 44,170 Q 36,152 30,132" stroke="#A07840" strokeWidth="0.8" fill="none" strokeLinecap="round" />

      {/* Left dried flower cluster */}
      <path d="M 30,132 Q 25,120 20,110" stroke="#8B6B3A" strokeWidth="0.8" fill="none" />
      <circle cx="19" cy="107" r="4" fill="#C4714A" opacity="0.5" />
      <circle cx="14" cy="104" r="3" fill="#D4904A" opacity="0.4" />
      <circle cx="24" cy="103" r="2.5" fill="#B4602A" opacity="0.45" />

      {/* Left sage leaves */}
      <ellipse cx="80" cy="155" rx="12" ry="7" fill="#8A9E6A" transform="rotate(-25 80 155)" opacity="0.75" />
      <ellipse cx="95" cy="168" rx="11" ry="6.5" fill="#7A9060" transform="rotate(-18 95 168)" opacity="0.7" />
      <ellipse cx="65" cy="145" rx="10" ry="6" fill="#9AAE7A" transform="rotate(-30 65 145)" opacity="0.72" />

      {/* ── PAMPAS GRASS — LEFT ── */}
      {/* Left pampas stem */}
      <path d="M 148,205 Q 145,175 148,145 Q 150,120 152,95" stroke="#8B7040" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      {/* Left pampas plume */}
      {strands(152, 90, 22, 80, 28, 50, "#F0DFC0", 0.65)}
      {strands(152, 95, 18, 65, 20, 38, "#E8D0A8", 0.55)}
      {strands(152, 88, 14, 55, 15, 28, "#F5EAD0", 0.50)}

      {/* ── PAMPAS GRASS — CENTER LEFT ── */}
      <path d="M 190,205 Q 192,172 195,140 Q 197,112 200,78" stroke="#907848" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {strands(200, 72, 26, 90, 35, 60, "#F2E0C0", 0.68)}
      {strands(200, 78, 20, 72, 25, 45, "#ECD5B0", 0.58)}
      {strands(200, 70, 16, 58, 18, 32, "#F8ECD8", 0.52)}

      {/* ── PAMPAS GRASS — CENTER (TALLEST) ── */}
      <path d="M 215,205 Q 215,168 214,132 Q 213,100 215,62" stroke="#8B7040" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {strands(215, 55, 30, 100, 40, 68, "#EED8B8", 0.70)}
      {strands(215, 62, 24, 82, 30, 52, "#E8CCA8", 0.60)}
      {strands(215, 52, 18, 68, 22, 38, "#F5E5CC", 0.55)}

      {/* ── PAMPAS GRASS — CENTER RIGHT ── */}
      <path d="M 240,205 Q 238,172 236,140 Q 234,112 231,78" stroke="#907848" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {strands(231, 72, 26, 90, 35, 60, "#F2E0C0", 0.68)}
      {strands(231, 78, 20, 72, 25, 45, "#ECD5B0", 0.58)}
      {strands(231, 70, 16, 58, 18, 32, "#F8ECD8", 0.52)}

      {/* ── PAMPAS GRASS — RIGHT ── */}
      <path d="M 282,205 Q 285,175 283,145 Q 281,120 279,95" stroke="#8B7040" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      {strands(279, 90, 22, 80, 28, 50, "#F0DFC0", 0.65)}
      {strands(279, 95, 18, 65, 20, 38, "#E8D0A8", 0.55)}
      {strands(279, 88, 14, 55, 15, 28, "#F5EAD0", 0.50)}

      {/* ── TALL GRASSES — RIGHT ── */}
      <path d="M 335,205 Q 342,160 350,120 Q 355,95 365,70" stroke="#A07840" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M 365,70 Q 372,45 375,20" stroke="#A07840" strokeWidth="1" fill="none" strokeLinecap="round" />
      <ellipse cx="375" cy="16" rx="5" ry="10" fill="#C4714A" opacity="0.55" transform="rotate(8 375 16)" />

      <path d="M 315,205 Q 320,168 322,135 Q 325,108 330,82" stroke="#8B6B3A" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <path d="M 330,82 Q 334,58 336,30" stroke="#8B6B3A" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <ellipse cx="337" cy="25" rx="4.5" ry="9" fill="#D4A870" opacity="0.6" transform="rotate(-5 337 25)" />

      <path d="M 358,205 Q 362,172 368,142 Q 374,115 380,88" stroke="#9A7848" strokeWidth="1" fill="none" strokeLinecap="round" />
      <circle cx="381" cy="84" r="3.5" fill="#C4714A" opacity="0.45" />
      <circle cx="381" cy="78" r="2.5" fill="#C4714A" opacity="0.35" />

      {/* ── SMALL RIGHT GRASSES ── */}
      <path d="M 385,205 Q 392,178 400,155 Q 408,132 415,108" stroke="#B09050" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <path d="M 402,205 Q 408,182 414,162 Q 420,142 424,122" stroke="#9A7848" strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <path d="M 372,205 Q 378,188 386,170 Q 394,152 400,132" stroke="#A07840" strokeWidth="0.8" fill="none" strokeLinecap="round" />

      {/* Right dried flower cluster */}
      <path d="M 400,132 Q 405,120 410,110" stroke="#8B6B3A" strokeWidth="0.8" fill="none" />
      <circle cx="411" cy="107" r="4" fill="#C4714A" opacity="0.5" />
      <circle cx="416" cy="104" r="3" fill="#D4904A" opacity="0.4" />
      <circle cx="406" cy="103" r="2.5" fill="#B4602A" opacity="0.45" />

      {/* Right sage leaves */}
      <ellipse cx="350" cy="155" rx="12" ry="7" fill="#8A9E6A" transform="rotate(25 350 155)" opacity="0.75" />
      <ellipse cx="335" cy="168" rx="11" ry="6.5" fill="#7A9060" transform="rotate(18 335 168)" opacity="0.7" />
      <ellipse cx="365" cy="145" rx="10" ry="6" fill="#9AAE7A" transform="rotate(30 365 145)" opacity="0.72" />

      {/* Terracotta wildflowers — scattered */}
      <circle cx="130" cy="108" r="5.5" fill="#C4714A" opacity="0.38" />
      <circle cx="130" cy="108" r="2.5" fill="#8B3A20" opacity="0.45" />
      <circle cx="162" cy="125" r="4.5" fill="#D4804A" opacity="0.32" />
      <circle cx="162" cy="125" r="2" fill="#A04A28" opacity="0.4" />
      <circle cx="300" cy="110" r="5.5" fill="#C4714A" opacity="0.38" />
      <circle cx="300" cy="110" r="2.5" fill="#8B3A20" opacity="0.45" />
      <circle cx="268" cy="125" r="4.5" fill="#D4804A" opacity="0.32" />
      <circle cx="268" cy="125" r="2" fill="#A04A28" opacity="0.4" />

      {/* Dusty rose accent flowers */}
      <circle cx="112" cy="135" r="4" fill="#D4A8A0" opacity="0.45" />
      <circle cx="318" cy="138" r="4" fill="#D4A8A0" opacity="0.45" />

      {/* Fade to card bg */}
      <defs>
        <linearGradient id="fadeBoho" x1="0" y1="0.48" x2="0" y2="1">
          <stop offset="0%" stopColor={bg} stopOpacity="0" />
          <stop offset="100%" stopColor={bg} stopOpacity="1" />
        </linearGradient>
      </defs>
      <rect width="430" height="205" fill="url(#fadeBoho)" />
    </svg>
  );
}

export default function WeddingInvitation() {
  const [started, setStarted] = useState(false);
  const [cardKey, setCardKey] = useState(0);

  return (
    <>
      <style>{CSS}</style>

      {!started ? (
        <div className="start-scene">
          <p className="start-eyebrow">Save the Date</p>
          <div className="start-names">Catalina<br />&amp; Rodney</div>
          <div className="start-rule" />
          <button className="start-btn" onClick={() => setStarted(true)}>View Invitation</button>
        </div>
      ) : (
        <div className="scene">
          <div className="card" key={cardKey}>
            <div className="corner tl" /><div className="corner tr" />
            <div className="corner bl" /><div className="corner br" />
            <div className="tc-border" />

            <BotanicalSVG />

            <div className="body">
              <span className="name-a">Catalina</span>
              <div className="amp-row">
                <div className="amp-line l" />
                <span className="amp">&amp;</span>
                <div className="amp-line r" />
              </div>
              <span className="name-b">Rodney</span>

              <div className="divider">
                <div className="div-line" />
                <span className="div-leaf">🌿</span>
                <div className="div-line" />
              </div>

              <p className="tagline">It is an honor to invite you to our</p>
              <p className="main-title">Wedding Celebration</p>

              <div className="info-wrap">
                <div className="info-grid">
                  <div className="cell">
                    <div className="cell-icon"><IconDate/></div>
                    <div className="cell-tag">Date</div>
                    <div className="cell-main">Saturday</div>
                    <div className="cell-main">December 19, 2026</div>
                  </div>
                  <div className="cell">
                    <div className="cell-icon"><IconVenue/></div>
                    <div className="cell-tag">Venue</div>
                    <div className="cell-main">Emporium Hotel</div>
                    <div className="cell-sub">267 Grey Street, South Brisbane QLD 4101</div>
                  </div>
                  <div className="cell">
                    <div className="cell-icon"><IconTime/></div>
                    <div className="cell-tag">Time</div>
                    <div className="cell-main">6:00 PM</div>
                  </div>
                  <div className="cell">
                    <div className="cell-icon"><IconDress/></div>
                    <div className="cell-tag">Dress Code</div>
                    <div className="cell-main">Cocktail</div>
                  </div>
                </div>
              </div>

              <div className="rsvp-row">
                <div>
                  <span className="rsvp-label">RSVP</span>
                  <span className="rsvp-num">0438 021 337</span>
                </div>
                <a
                  className="rsvp-btn"
                  href="sms:+61438021337?body=Hi%2C%20thanks%20for%20the%20invite!%20I'd%20like%20to%20confirm%20my%20assistance."
                  style={{textDecoration:'none',display:'inline-block'}}
                >Confirm Attendance</a>
              </div>

              <div className="footer">
                <div className="footer-orn">
                  <div className="f-line" />
                  <span className="f-leaf">🌾</span>
                  <span className="f-terra">✦</span>
                  <span className="f-leaf">🌾</span>
                  <div className="f-line" />
                </div>
              </div>
            </div>
          </div>

          <button className="replay-btn" onClick={() => setCardKey(k => k + 1)}>
            ↺ Replay
          </button>
        </div>
      )}
    </>
  );
}
