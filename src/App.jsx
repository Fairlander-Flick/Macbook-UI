import React, { useState } from 'react';
import MenuBar from './components/MenuBar';
import Dock from './components/Dock';
import Desktop from './components/Desktop';
import Window from './components/Window';
import CameraApp from './components/CameraApp';
import BatteryWidget from './components/BatteryWidget';
import CalendarWidget from './components/CalendarWidget';

export default function App() {
  const [openApps, setOpenApps] = useState([]);

  const handleAppClick = (appId) => {
    if (!openApps.includes(appId)) setOpenApps(prev => [...prev, appId]);
  };
  const closeApp = (appId) => setOpenApps(prev => prev.filter(id => id !== appId));

  return (
    <div style={{
      position: 'fixed', inset: 0,
      width: '100vw', height: '100vh',
      overflow: 'hidden', userSelect: 'none',
      // macOS Sequoia / Sonoma – purple-blue flow wallpaper
      backgroundImage: 'url(https://512pixels.net/downloads/macos-wallpapers-6k/13-Ventura-Dark.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: '#1c1c6b',
    }}>

      <MenuBar />
      <BatteryWidget />
      <CalendarWidget />

      <Desktop>
        {openApps.includes('camera') && (
          <Window
            title="Photo Booth"
            onClose={() => closeApp('camera')}
            defaultPos={{ x: Math.max(0, window.innerWidth/2 - 320), y: Math.max(30, window.innerHeight/2 - 260) }}
            defaultSize={{ w: 680, h: 520 }}
          >
            <CameraApp />
          </Window>
        )}
      </Desktop>

      <Dock onAppClick={handleAppClick} openApps={openApps}/>
    </div>
  );
}
