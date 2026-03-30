import React from 'react';

// Shared rounded-square icon wrapper
function AppIcon({ id, children, bg }) {
  const clipId = `clip-${id}`;
  return (
    <svg viewBox="0 0 60 60" width="100%" height="100%">
      <defs>
        <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
          {bg.map((c, i) => (
            <stop key={i} offset={`${(i / (bg.length - 1)) * 100}%`} stopColor={c} />
          ))}
        </linearGradient>
        <clipPath id={clipId}>
          <rect x="0" y="0" width="60" height="60" rx="13.5" />
        </clipPath>
      </defs>
      <rect x="0" y="0" width="60" height="60" rx="13.5" fill={`url(#grad-${id})`} />
      <g clipPath={`url(#${clipId})`}>{children}</g>
    </svg>
  );
}

function FinderIcon() {
  return (
    <AppIcon id="finder" bg={['#6EC6F5', '#2D9BF0', '#1A6FCC']}>
      <ellipse cx="30" cy="32" rx="22" ry="20" fill="#fff" />
      {/* Left blue eye */}
      <ellipse cx="22" cy="28" rx="7" ry="8" fill="#4A90E2" />
      <ellipse cx="22" cy="28" rx="4" ry="5" fill="#1A3A6B" />
      <circle cx="23.5" cy="26.5" r="1.5" fill="#fff" />
      {/* Right white eye */}
      <ellipse cx="38" cy="28" rx="7" ry="8" fill="#fff" stroke="#ccc" strokeWidth="0.5" />
      <ellipse cx="38" cy="28" rx="4" ry="5" fill="#1A3A6B" />
      <circle cx="39.5" cy="26.5" r="1.5" fill="#fff" />
      {/* Smile */}
      <path d="M21 38 Q30 45 39 38" stroke="#1A3A6B" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="30" cy="34" rx="2" ry="1.5" fill="rgba(0,0,0,0.15)" />
    </AppIcon>
  );
}

function SafariIcon() {
  const ticks = [0, 90, 180, 270].map(a => {
    const r = Math.PI * a / 180;
    return {
      x1: 30 + 14 * Math.sin(r), y1: 30 - 14 * Math.cos(r),
      x2: 30 + 17 * Math.sin(r), y2: 30 - 17 * Math.cos(r),
    };
  });
  return (
    <AppIcon id="safari" bg={['#55C5FC', '#148EFA', '#0062D4']}>
      <circle cx="30" cy="30" r="18" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
      <circle cx="30" cy="30" r="16" fill="rgba(255,255,255,0.15)" />
      {ticks.map((t, i) => (
        <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
      ))}
      <polygon points="30,13 27.5,30 30,28 32.5,30" fill="#FF3B30" />
      <polygon points="30,47 27.5,30 30,32 32.5,30" fill="white" />
      <circle cx="30" cy="30" r="2" fill="white" />
    </AppIcon>
  );
}

function MailIcon() {
  return (
    <AppIcon id="mail" bg={['#5AC8FB', '#1C86FA', '#005FE8']}>
      <rect x="8" y="16" width="44" height="30" rx="4" fill="white" />
      <path d="M8 16 L30 33 L52 16" stroke="#B8D4F5" strokeWidth="1.5" fill="none" />
      <line x1="8" y1="46" x2="20" y2="34" stroke="#B8D4F5" strokeWidth="1" />
      <line x1="52" y1="46" x2="40" y2="34" stroke="#B8D4F5" strokeWidth="1" />
    </AppIcon>
  );
}

function MessagesIcon() {
  return (
    <AppIcon id="messages" bg={['#62D256', '#30B93E', '#1A9428']}>
      <path
        d="M10 14 Q10 10 14 10 L46 10 Q50 10 50 14 L50 36 Q50 40 46 40 L22 40 L14 50 L16 40 L14 40 Q10 40 10 36 Z"
        fill="white"
      />
    </AppIcon>
  );
}

function FaceTimeIcon() {
  return (
    <AppIcon id="facetime" bg={['#6AD56A', '#28B828', '#149414']}>
      <rect x="8" y="20" width="30" height="22" rx="5" fill="white" />
      <circle cx="23" cy="31" r="7" fill="#3CC83C" />
      <circle cx="23" cy="31" r="4" fill="#1A8A1A" />
      <circle cx="25" cy="29" r="1.5" fill="rgba(255,255,255,0.5)" />
      <path d="M40 23 L52 27 L52 35 L40 39 Z" fill="white" />
    </AppIcon>
  );
}

function PhotosIcon() {
  const petals = [0, 45, 90, 135, 180, 225, 270, 315];
  const colors = ['#FF3B30', '#FF9500', '#FFCC00', '#34C759', '#00C7BE', '#007AFF', '#5856D6', '#FF2D55'];
  return (
    <AppIcon id="photos" bg={['#ffffff', '#f2f2f2', '#e5e5e5']}>
      {petals.map((a, i) => {
        const r = Math.PI * a / 180;
        const cx = 30 + 10 * Math.cos(r);
        const cy = 30 + 10 * Math.sin(r);
        return (
          <ellipse key={a} cx={cx} cy={cy} rx="6" ry="9"
            fill={colors[i]} transform={`rotate(${a} ${cx} ${cy})`} opacity="0.9" />
        );
      })}
      <circle cx="30" cy="30" r="6" fill="white" />
    </AppIcon>
  );
}

function MusicIcon() {
  return (
    <AppIcon id="music" bg={['#FC3C44', '#C41921', '#960F15']}>
      <ellipse cx="31" cy="35" rx="5" ry="4" fill="white" transform="rotate(-15 31 35)" />
      <line x1="36" y1="14" x2="36" y2="32" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <line x1="36" y1="14" x2="46" y2="11" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <line x1="46" y1="11" x2="46" y2="28" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="43" cy="30" rx="5" ry="4" fill="white" transform="rotate(-15 43 30)" />
    </AppIcon>
  );
}

function PodcastsIcon() {
  return (
    <AppIcon id="podcasts" bg={['#E040B0', '#B4169A', '#880D78']}>
      <circle cx="30" cy="27" r="6" fill="white" />
      <circle cx="30" cy="27" r="11" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" />
      <circle cx="30" cy="27" r="17" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <line x1="30" y1="33" x2="30" y2="46" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="22" y1="46" x2="38" y2="46" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" strokeLinecap="round" />
    </AppIcon>
  );
}

function AppStoreIcon() {
  return (
    <AppIcon id="appstore" bg={['#3BCBFF', '#1B9EFF', '#0066E8']}>
      <path d="M30 12 L44 38" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M30 12 L16 38" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M13 38 L47 38" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M20 28 L40 28" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
    </AppIcon>
  );
}

function SystemSettingsIcon() {
  const teeth = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <AppIcon id="settings" bg={['#8E8E93', '#636366', '#3A3A3C']}>
      {teeth.map(a => {
        const r = Math.PI * a / 180;
        const x = 30 + 13 * Math.cos(r);
        const y = 30 + 13 * Math.sin(r);
        return (
          <rect key={a} x={x - 3} y={y - 3} width="6" height="6" rx="1.5"
            fill="white" transform={`rotate(${a} ${x} ${y})`} />
        );
      })}
      <circle cx="30" cy="30" r="8" fill="white" />
      <circle cx="30" cy="30" r="4.5" fill="#636366" />
    </AppIcon>
  );
}

function TerminalIcon() {
  return (
    <AppIcon id="terminal" bg={['#3A3A3A', '#1E1E1E', '#080808']}>
      <text x="11" y="28" fontFamily="monospace" fontSize="12" fill="#5AF078" fontWeight="bold">{'$_'}</text>
      <text x="11" y="42" fontFamily="monospace" fontSize="9" fill="rgba(90,240,120,0.5)">{'~/dev'}</text>
    </AppIcon>
  );
}

function PhotoBoothIcon() {
  return (
    <AppIcon id="camera" bg={['#555', '#2A2A2A', '#111']}>
      {/* Camera lens rings */}
      <circle cx="30" cy="30" r="17" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <circle cx="30" cy="30" r="12" fill="#1a1a1a" />
      <circle cx="30" cy="30" r="9" fill="#222" />
      <circle cx="30" cy="30" r="6" fill="#111" />
      <circle cx="30" cy="30" r="3" fill="#333" />
      <circle cx="27" cy="27" r="2" fill="rgba(255,255,255,0.18)" />
    </AppIcon>
  );
}

function TrashIcon() {
  return (
    <AppIcon id="trash" bg={['#8E8E93', '#636366', '#3A3A3C']}>
      <rect x="22" y="11" width="16" height="5" rx="2" fill="rgba(255,255,255,0.9)" />
      <rect x="14" y="15" width="32" height="5" rx="2.5" fill="rgba(255,255,255,0.9)" />
      <path d="M17 20 L19 50 Q19 52 21 52 L39 52 Q41 52 41 50 L43 20 Z" fill="rgba(255,255,255,0.85)" />
      <line x1="24" y1="25" x2="24" y2="46" stroke="rgba(100,100,100,0.45)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="30" y1="25" x2="30" y2="46" stroke="rgba(100,100,100,0.45)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="36" y1="25" x2="36" y2="46" stroke="rgba(100,100,100,0.45)" strokeWidth="1.5" strokeLinecap="round" />
    </AppIcon>
  );
}

const ICON_MAP = {
  finder:   <FinderIcon />,
  safari:   <SafariIcon />,
  mail:     <MailIcon />,
  messages: <MessagesIcon />,
  facetime: <FaceTimeIcon />,
  photos:   <PhotosIcon />,
  music:    <MusicIcon />,
  podcasts: <PodcastsIcon />,
  appstore: <AppStoreIcon />,
  settings: <SystemSettingsIcon />,
  terminal: <TerminalIcon />,
  camera:   <PhotoBoothIcon />,
  trash:    <TrashIcon />,
};

const DOCK_APPS = [
  { id: 'finder',   name: 'Finder' },
  { id: 'safari',   name: 'Safari' },
  { id: 'mail',     name: 'Mail' },
  { id: 'messages', name: 'Messages' },
  { id: 'facetime', name: 'FaceTime' },
  { id: 'photos',   name: 'Photos' },
  { id: 'music',    name: 'Music' },
  { id: 'podcasts', name: 'Podcasts' },
  { id: 'appstore', name: 'App Store' },
  { id: 'settings', name: 'System Settings' },
  { id: 'terminal', name: 'Terminal' },
  null,
  { id: 'camera',   name: 'Photo Booth' },
  { id: 'trash',    name: 'Trash' },
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
            ? <div key={`sep-${i}`} style={{ width: '0.5px', height: '46px', background: 'rgba(255,255,255,0.3)', margin: '0 3px', alignSelf: 'center' }} />
            : <DockIcon key={app.id} app={app} isOpen={openApps.includes(app.id)} onAppClick={onAppClick} />
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
        {ICON_MAP[app.id] ?? null}
      </div>
      {(isOpen || app.id === 'finder') && (
        <div style={{
          position: 'absolute', bottom: '-6px',
          width: '5px', height: '5px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.85)',
          boxShadow: '0 0 4px rgba(255,255,255,0.5)',
        }} />
      )}
    </div>
  );
}
