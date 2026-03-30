import React from 'react';

// macOS app icon: emoji on gradient bg matching real macOS Big Sur icons
function MacIcon({ children, bg, size = '100%' }) {
  const id = Math.random().toString(36).slice(2);
  return (
    <svg viewBox="0 0 60 60" width={size} height={size}>
      <defs>
        <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="0" y2="1">
          {bg.map((c, i) => <stop key={i} offset={`${(i/(bg.length-1))*100}%`} stopColor={c}/>)}
        </linearGradient>
        <clipPath id={`cp-${id}`}><rect x="0" y="0" width="60" height="60" rx="13.5"/></clipPath>
      </defs>
      <rect x="0" y="0" width="60" height="60" rx="13.5" fill={`url(#bg-${id})`}/>
      {/* Subtle top sheen */}
      <ellipse cx="30" cy="7" rx="22" ry="9" fill="rgba(255,255,255,0.2)" clipPath={`url(#cp-${id})`}/>
      <text x="30" y="41" textAnchor="middle" fontSize="32"
        fontFamily="Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif">
        {children}
      </text>
    </svg>
  );
}

// Real macOS native app colors from screenshot
const DOCK_APPS = [
  { id: 'finder',   name: 'Finder',        emoji: '🗂',  bg: ['#62B8F6','#4A90E2','#1A66CC'] },
  { id: 'mail',     name: 'Mail',          emoji: '✉️',  bg: ['#5AC8FA','#0A84FF','#0055CC'] },
  { id: 'appstore', name: 'App Store',     emoji: '🅰️',  bg: ['#1FAFFF','#0075E1','#003FBC'] },
  { id: 'contacts', name: 'Contacts',      emoji: '👤',  bg: ['#F5F5F5','#E8E8E8','#D0D0D0'] },
  { id: 'photos',   name: 'Photos',        emoji: '🌸',  bg: ['#fff','#f8f8f8','#f0f0f0'] },
  { id: 'music',    name: 'Music',         emoji: '🎵',  bg: ['#FC3C44','#CC1B23','#AA0A10'] },
  { id: 'discord',  name: 'Discord',       emoji: '🎮',  bg: ['#5865F2','#4752C4','#3441A3'] },
  { id: 'whatsapp', name: 'WhatsApp',      emoji: '💬',  bg: ['#25D366','#18A94C','#0D8536'] },
  { id: 'chrome',   name: 'Chrome',        emoji: '🌐',  bg: ['#F5F5F5','#E8E8E8','#D0D0D0'] },
  { id: 'terminal', name: 'Terminal',      emoji: '⌨️',  bg: ['#303030','#1A1A1A','#080808'] },
  null, // separator
  { id: 'camera',   name: 'Photo Booth',   emoji: '📷',  bg: ['#555','#2A2A2A','#111'] },
];

export default function Dock({ onAppClick, openApps = [] }) {
  return (
    <div style={{
      position: 'absolute', bottom: '6px', left: '50%',
      transform: 'translateX(-50%)', zIndex: 50,
    }}>
      <div style={{
        display: 'flex', alignItems: 'flex-end', gap: '5px',
        padding: '7px 10px',
        borderRadius: '18px',
        background: 'rgba(255,255,255,0.18)',
        backdropFilter: 'blur(40px) saturate(200%)',
        WebkitBackdropFilter: 'blur(40px) saturate(200%)',
        border: '0.5px solid rgba(255,255,255,0.4)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.45)',
      }}>
        {DOCK_APPS.map((app, i) =>
          app === null
            ? <div key={`sep-${i}`} style={{ width: '0.5px', height: '46px', background: 'rgba(255,255,255,0.3)', margin: '0 3px', alignSelf: 'center' }}/>
            : <DockIcon key={app.id} app={app} isOpen={openApps.includes(app.id)} onAppClick={onAppClick}/>
        )}
      </div>
    </div>
  );
}

function DockIcon({ app, isOpen, onAppClick }) {
  const [hov, setHov] = React.useState(false);
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {hov && (
        <div style={{
          position: 'absolute', bottom: 'calc(100% + 10px)', left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(30,30,30,0.82)',
          backdropFilter: 'blur(10px)',
          color: '#fff', fontSize: '12px', fontWeight: 500,
          padding: '4px 10px', borderRadius: '6px', whiteSpace: 'nowrap',
          border: '0.5px solid rgba(255,255,255,0.2)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.4)', pointerEvents: 'none',
          zIndex: 100,
        }}>{app.name}</div>
      )}
      <div onClick={() => onAppClick(app.id)} style={{
        width: hov ? '60px' : '52px', height: hov ? '60px' : '52px',
        transform: hov ? 'translateY(-10px)' : 'translateY(0)',
        transition: 'all 0.15s cubic-bezier(0.34,1.56,0.64,1)',
        cursor: 'pointer',
        filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.45))',
        flexShrink: 0,
      }}>
        <MacIcon bg={app.bg}>{app.emoji}</MacIcon>
      </div>
      {(isOpen || app.id === 'finder') && (
        <div style={{
          position: 'absolute', bottom: '-6px',
          width: '5px', height: '5px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.85)',
          boxShadow: '0 0 4px rgba(255,255,255,0.5)',
        }}/>
      )}
    </div>
  );
}
