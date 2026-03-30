import React, { useRef, useEffect, useState } from 'react';

export default function CameraApp({ width = 640, height = 452 }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [photos, setPhotos] = useState([]); // thumbnail list
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function setup() {
      try {
        const ms = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (videoRef.current) videoRef.current.srcObject = ms;
        streamRef.current = ms;
        setReady(true);
      } catch (e) { console.error(e); }
    }
    setup();
    return () => streamRef.current?.getTracks().forEach(t => t.stop());
  }, []);

  const takePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 1280;
    canvas.height = videoRef.current.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    ctx.translate(canvas.width, 0); ctx.scale(-1, 1);
    ctx.drawImage(videoRef.current, 0, 0);
    const url = canvas.toDataURL('image/jpeg', 0.85);
    setPhotos(prev => [url, ...prev].slice(0, 8));
  };

  const savePhoto = (url) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `MacBook Photo ${Date.now()}.jpg`;
    a.click();
  };

  const liveH = height - 28 - 70; // subtract title bar + bottom bar

  return (
    <div style={{ width, height: height - 28, background: '#1a1a1a', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Live camera feed */}
      <div style={{ flex: 1, position: 'relative', background: '#000', overflow: 'hidden' }}>
        <video
          ref={videoRef} autoPlay playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }}
        />
        {!ready && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
            Kamera bağlanıyor...
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {photos.length > 0 && (
        <div style={{
          display: 'flex', gap: '6px', padding: '6px 10px',
          background: 'rgba(0,0,0,0.6)',
          overflowX: 'auto',
          borderTop: '0.5px solid rgba(255,255,255,0.08)',
        }}>
          {photos.map((p, i) => (
            <img
              key={i} src={p} alt=""
              onClick={() => savePhoto(p)}
              title="İndirmek için tıkla"
              style={{
                height: '52px', width: '70px', objectFit: 'cover',
                borderRadius: '5px', cursor: 'pointer',
                border: i === 0 ? '2px solid white' : '2px solid rgba(255,255,255,0.2)',
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      )}

      {/* Bottom controls bar */}
      <div style={{
        height: '50px', minHeight: '50px',
        background: 'rgba(40,40,40,0.95)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 14px',
        borderTop: '0.5px solid rgba(255,255,255,0.08)',
      }}>
        {/* Left controls */}
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <CtrlBtn title="Grid View">
            <svg viewBox="0 0 20 20" width="18" height="18" fill="rgba(255,255,255,0.7)">
              <rect x="1" y="1" width="7" height="7" rx="1.5"/><rect x="12" y="1" width="7" height="7" rx="1.5"/>
              <rect x="1" y="12" width="7" height="7" rx="1.5"/><rect x="12" y="12" width="7" height="7" rx="1.5"/>
            </svg>
          </CtrlBtn>
          <CtrlBtn title="Portrait Mode">
            <svg viewBox="0 0 16 20" width="14" height="18" fill="rgba(255,255,255,0.7)">
              <circle cx="8" cy="6" r="4"/><path d="M1 19c0-4 14-4 14 0" fill="rgba(255,255,255,0.7)"/>
            </svg>
          </CtrlBtn>
          <CtrlBtn title="Video">
            <svg viewBox="0 0 22 16" width="20" height="14" fill="rgba(255,255,255,0.7)">
              <rect x="1" y="2" width="13" height="12" rx="2"/>
              <path d="M14 6l7-3v10l-7-3z"/>
            </svg>
          </CtrlBtn>
        </div>

        {/* Center: Shutter */}
        <button onClick={takePhoto} style={{
          width: '46px', height: '46px', borderRadius: '50%',
          border: '3px solid rgba(255,255,255,0.8)',
          background: 'transparent', cursor: 'pointer', outline: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.1s',
          boxShadow: '0 0 0 1px rgba(0,0,0,0.4)',
        }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.92)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#FF3B30' }}/>
        </button>

        {/* Right: Effects */}
        <button style={{
          background: 'rgba(255,255,255,0.12)',
          border: '0.5px solid rgba(255,255,255,0.2)',
          color: 'rgba(255,255,255,0.85)',
          borderRadius: '7px', padding: '5px 14px',
          fontSize: '13px', fontWeight: 500, cursor: 'default',
          backdropFilter: 'blur(10px)',
        }}>Effects</button>
      </div>
    </div>
  );
}

function CtrlBtn({ children, title }) {
  const [h, setH] = React.useState(false);
  return (
    <button title={title} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        background: h ? 'rgba(255,255,255,0.12)' : 'transparent',
        border: 'none', cursor: 'default', padding: '6px', borderRadius: '6px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.1s',
      }}>
      {children}
    </button>
  );
}
