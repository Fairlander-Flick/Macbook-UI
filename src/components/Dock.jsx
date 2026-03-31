import React from 'react';

<<<<<<< main
const DOCK_APPS = [
  { id: 'finder',   name: 'Finder',           icon: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Finder_Icon_macOS_Big_Sur.png' },
  { id: 'safari',   name: 'Safari',           icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/23/4c/cb/234ccbb4-e65a-bb94-f877-3d230743e9e3/safari-0-0-1x_U007epad-0-1-0-sRGB-85-220.png/512x512bb.jpg' },
  { id: 'mail',     name: 'Mail',             icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/cf/a0/8c/cfa08c8a-5789-d605-a3cb-760ab70d52e1/mail-0-0-1x_U007epad-0-1-0-sRGB-85-220.png/512x512bb.jpg' },
  { id: 'messages', name: 'Messages',         icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/0e/08/07/0e080793-1b66-d9b3-0bbe-8222669abf79/messages-0-0-1x_U007epad-0-1-0-sRGB-85-220.png/512x512bb.jpg' },
  { id: 'facetime', name: 'FaceTime',         icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/9a/11/89/9a11899c-f0fb-c22b-2c41-a3c2540abf5f/facetime-0-0-1x_U007epad-0-1-0-sRGB-85-220.png/512x512bb.jpg' },
  { id: 'photos',   name: 'Photos',           icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/a4/c2/8e/a4c28eea-f904-db56-ff8f-8d51dd9c0d6e/photos-0-0-1x_U007epad-0-1-0-sRGB-85-220.png/512x512bb.jpg' },
  { id: 'music',    name: 'Music',            icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/31/6c/c3/316cc33a-5e7d-8902-58eb-f4e16c5d9440/music-0-0-1x_U007epad-0-1-0-sRGB-85-220.png/512x512bb.jpg' },
  { id: 'podcasts', name: 'Podcasts',         icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/a2/ad/ff/a2adff60-629b-5dbd-117d-82dede11f26b/podcasts-0-0-1x_U007epad-0-1-0-sRGB-85-220.png/512x512bb.jpg' },
  { id: 'appstore', name: 'App Store',        icon: 'https://img.icons8.com/fluency/512/apple-app-store.png' },
  { id: 'settings', name: 'System Settings',  icon: 'https://img.icons8.com/color/512/apple-settings.png' },
  { id: 'terminal', name: 'Terminal',         icon: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Terminalicon2.png' },
  null,
  { id: 'camera',   name: 'Photo Booth',      icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/ae/c8/c2/aec8c2c0-4676-db2d-4ed1-e7d0ce768a15/camera-0-0-1x_U007epad-0-1-0-sRGB-85-220.png/512x512bb.jpg' },
  { id: 'trash',    name: 'Trash',            icon: 'https://img.icons8.com/fluency/512/empty-trash.png' },
=======
// Uses real PNG icons from /public/icons/
// Falls back to emoji+gradient if img errors
const DOCK_APPS = [
  { id: 'finder',   name: 'Finder',         src: '/icons/finder.png' },
  { id: 'safari',   name: 'Safari',         src: '/icons/safari.png' },
  { id: 'messages', name: 'Messages',       src: '/icons/messages.png' },
  { id: 'mail',     name: 'Mail',           src: '/icons/mail.png' },
  { id: 'contacts', name: 'Contacts',       src: '/icons/contacts.png' },
  { id: 'photos',   name: 'Photos',         src: '/icons/photos.png' },
  { id: 'music',    name: 'Music',          src: '/icons/music.png' },
  { id: 'appstore', name: 'App Store',      src: '/icons/appstore.png' },
  { id: 'discord',  name: 'Discord',        src: '/icons/discord.png' },
  { id: 'whatsapp', name: 'WhatsApp',       src: '/icons/whatsapp.png' },
  { id: 'chrome',   name: 'Google Chrome',  src: '/icons/chrome.png' },
  { id: 'terminal', name: 'Terminal',       src: '/icons/terminal.png' },
  null, // separator
  { id: 'camera',   name: 'Photo Booth',    src: '/icons/photobooth.png' },
>>>>>>> main
];

// Fallback emoji backgrounds
const FALLBACKS = {
  finder: { emoji: '🗂', bg: ['#62B8F6','#1A66CC'] },
  safari: { emoji: '🧭', bg: ['#5EC8FA','#0055DD'] },
  messages: { emoji: '💬', bg: ['#5CF058','#18A918'] },
  mail: { emoji: '✉️', bg: ['#5AC8FA','#0055CC'] },
  contacts: { emoji: '👤', bg: ['#F0F0F0','#C0C0C0'] },
  photos: { emoji: '🌸', bg: ['#fff','#eee'] },
  music: { emoji: '🎵', bg: ['#FC3C44','#AA0A10'] },
  appstore: { emoji: '🅰️', bg: ['#1FAFFF','#003FBC'] },
  discord: { emoji: '🎮', bg: ['#5865F2','#3441A3'] },
  whatsapp: { emoji: '💬', bg: ['#25D366','#0D8536'] },
  chrome: { emoji: '🌐', bg: ['#F5F5F5','#C0C0C0'] },
  terminal: { emoji: '⌨️', bg: ['#303030','#080808'] },
  camera: { emoji: '📷', bg: ['#555','#111'] },
};

export default function Dock({ onAppClick, openApps = [] }) {
  return (
    <div style={{ position: 'absolute', bottom: '6px', left: '50%', transform: 'translateX(-50%)', zIndex: 50 }}>
      <div style={{
        display: 'flex', alignItems: 'flex-end', gap: '5px',
        padding: '7px 10px', borderRadius: '18px',
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
  const [err, setErr] = React.useState(false);
  const fb = FALLBACKS[app.id] || { emoji: '📦', bg: ['#555','#333'] };

  return (
<<<<<<< main
    <div
      style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
=======
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>

      {/* Tooltip */}
>>>>>>> main
      {hov && (
        <div style={{
          position: 'absolute', bottom: 'calc(100% + 10px)', left: '50%',
          transform: 'translateX(-50%)', background: 'rgba(30,30,30,0.82)',
          backdropFilter: 'blur(10px)', color: '#fff', fontSize: '12px',
          fontWeight: 500, padding: '4px 10px', borderRadius: '6px',
          whiteSpace: 'nowrap', border: '0.5px solid rgba(255,255,255,0.2)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.4)', pointerEvents: 'none', zIndex: 100,
        }}>{app.name}</div>
      )}
<<<<<<< main
      <div
        onClick={() => onAppClick(app.id)}
        style={{
          width: hov ? '60px' : '52px',
          height: hov ? '60px' : '52px',
          transform: hov ? 'translateY(-10px)' : 'translateY(0)',
          transition: 'all 0.15s cubic-bezier(0.34,1.56,0.64,1)',
          cursor: 'pointer',
          filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.45))',
          flexShrink: 0,
          borderRadius: '22%',
          overflow: 'hidden',
        }}
      >
        <img
          src={app.icon}
          alt={app.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          draggable={false}
        />
=======

      {/* Icon */}
      <div onClick={() => onAppClick(app.id)} style={{
        width: hov ? '60px' : '52px', height: hov ? '60px' : '52px',
        transform: hov ? 'translateY(-10px)' : 'translateY(0)',
        transition: 'all 0.15s cubic-bezier(0.34,1.56,0.64,1)',
        cursor: 'pointer', flexShrink: 0,
        filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.45))',
      }}>
        {!err ? (
          <img
            src={app.src} alt={app.name}
            onError={() => setErr(true)}
            style={{ width: '100%', height: '100%', borderRadius: '14px', objectFit: 'cover' }}
          />
        ) : (
          // Fallback: emoji on gradient bg
          <svg viewBox="0 0 60 60" width="100%" height="100%">
            <defs>
              <linearGradient id={`fbg-${app.id}`} x1="0" y1="0" x2="0" y2="1">
                {fb.bg.map((c,i)=><stop key={i} offset={`${i*100}%`} stopColor={c}/>)}
              </linearGradient>
              <clipPath id={`fcp-${app.id}`}><rect x="0" y="0" width="60" height="60" rx="13.5"/></clipPath>
            </defs>
            <rect x="0" y="0" width="60" height="60" rx="13.5" fill={`url(#fbg-${app.id})`}/>
            <ellipse cx="30" cy="8" rx="20" ry="8" fill="rgba(255,255,255,0.2)" clipPath={`url(#fcp-${app.id})`}/>
            <text x="30" y="41" textAnchor="middle" fontSize="32"
              fontFamily="Apple Color Emoji, Segoe UI Emoji, sans-serif">{fb.emoji}</text>
          </svg>
        )}
>>>>>>> main
      </div>

      {/* Running dot */}
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
