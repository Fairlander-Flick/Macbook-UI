import React, { useState } from 'react';
import MenuBar from './components/MenuBar';
import Dock from './components/Dock';
import Desktop from './components/Desktop';
import Window from './components/Window';
import CameraApp from './components/CameraApp';

export default function App() {
  const [openApps, setOpenApps] = useState([]);

  const handleAppClick = (appId) => {
    if (!openApps.includes(appId)) {
      setOpenApps([...openApps, appId]);
    }
  };

  const closeApp = (appId) => {
    setOpenApps(openApps.filter(id => id !== appId));
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      userSelect: 'none',
      background: 'linear-gradient(135deg, #1a3a6e 0%, #2a5298 20%, #1e3c72 40%, #4a90d9 60%, #89c4f4 80%, #c2e0ff 100%)',
    }}>
      {/* Decorative gradient blobs for macOS Monterey feel */}
      <div style={{
        position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none'
      }}>
        <div style={{
          position: 'absolute', top: '-10%', left: '-5%',
          width: '60%', height: '70%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(100,180,255,0.35) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', right: '-5%',
          width: '50%', height: '60%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(60,130,255,0.3) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', top: '30%', right: '10%',
          width: '30%', height: '40%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(150,220,255,0.2) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }} />
      </div>

      <MenuBar />
      <Desktop>
        {openApps.includes('camera') && (
          <Window
            title="Photo Booth"
            onClose={() => closeApp('camera')}
            defaultPos={{ x: Math.max(0, window.innerWidth / 2 - 320), y: Math.max(24, window.innerHeight / 2 - 260) }}
          >
            <CameraApp />
          </Window>
        )}
      </Desktop>
      <Dock onAppClick={handleAppClick} />
    </div>
  );
}
