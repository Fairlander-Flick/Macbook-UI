import React from 'react';

// Battery circular progress ring
function Ring({ pct, color, size = 44, stroke = 4 }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"/>
    </svg>
  );
}

// MacBook icon
const MacbookSVG = () => (
  <svg viewBox="0 0 28 22" width="22" height="17" fill="rgba(255,255,255,0.9)">
    <rect x="2" y="2" width="24" height="15" rx="2" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" fill="none"/>
    <rect x="4" y="4" width="20" height="11" rx="1" fill="rgba(255,255,255,0.15)"/>
    <rect x="0" y="17" width="28" height="2" rx="1"/>
    <rect x="10" y="19" width="8" height="1.5" rx="0.75" fill="rgba(255,255,255,0.5)"/>
  </svg>
);

// AirPod icon
const AirPodSVG = () => (
  <svg viewBox="0 0 18 28" width="10" height="16" fill="rgba(255,255,255,0.7)">
    <ellipse cx="9" cy="7" rx="6" ry="7"/>
    <rect x="7.5" y="13" width="3" height="10" rx="1.5"/>
    <ellipse cx="9" cy="23" rx="4" ry="2.5"/>
  </svg>
);

export default function BatteryWidget() {
  const macPct = 84;
  const devices = [
    { label: 'AirPods L', pct: Math.floor(Math.random() * 30 + 60) },
    { label: 'AirPods R', pct: Math.floor(Math.random() * 30 + 60) },
    { label: 'Case',      pct: Math.floor(Math.random() * 40 + 40) },
  ];

  return (
    <div style={{
      position: 'absolute', top: '36px', left: '12px',
      zIndex: 40,
      background: 'rgba(30,30,40,0.72)',
      backdropFilter: 'blur(30px) saturate(180%)',
      WebkitBackdropFilter: 'blur(30px) saturate(180%)',
      borderRadius: '18px',
      border: '0.5px solid rgba(255,255,255,0.12)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      padding: '14px 18px',
      display: 'flex',
      alignItems: 'center',
      gap: '18px',
      userSelect: 'none',
    }}>
      {/* MacBook */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <div style={{ position: 'relative', width: '44px', height: '44px' }}>
          <Ring pct={macPct} color="#30D158" size={44} stroke={3.5}/>
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <MacbookSVG />
          </div>
        </div>
        <span style={{ color: 'white', fontSize: '12px', fontWeight: 500 }}>{macPct} %</span>
      </div>

      {/* AirPods */}
      {devices.map((d, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <div style={{ position: 'relative', width: '40px', height: '40px' }}>
            <Ring pct={d.pct} color="rgba(255,255,255,0.5)" size={40} stroke={3}/>
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <AirPodSVG />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
