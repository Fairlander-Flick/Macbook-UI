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
      background: '#1c1c6b',
    }}>
      {/* Wallpaper SVG – flowing wave matching macOS Sequoia default */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        <defs>
          <radialGradient id="bg1" cx="30%" cy="40%" r="80%">
            <stop offset="0%"   stopColor="#3a2b9e"/>
            <stop offset="60%"  stopColor="#1c1c6b"/>
            <stop offset="100%" stopColor="#0e0e3e"/>
          </radialGradient>
          <radialGradient id="blob1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5a3fd8" stopOpacity="0.7"/>
            <stop offset="100%" stopColor="#5a3fd8" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="blob2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7b5de0" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#7b5de0" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="blob3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2243c0" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#2243c0" stopOpacity="0"/>
          </radialGradient>
          <filter id="blur1"><feGaussianBlur stdDeviation="60"/></filter>
          <filter id="blur2"><feGaussianBlur stdDeviation="80"/></filter>
        </defs>

        {/* Base */}
        <rect width="1440" height="900" fill="url(#bg1)"/>

        {/* Blob lights */}
        <ellipse cx="500"  cy="350" rx="600" ry="400" fill="url(#blob1)" filter="url(#blur1)" opacity="0.9"/>
        <ellipse cx="900"  cy="200" rx="500" ry="350" fill="url(#blob2)" filter="url(#blur1)" opacity="0.7"/>
        <ellipse cx="200"  cy="600" rx="400" ry="300" fill="url(#blob3)" filter="url(#blur2)" opacity="0.6"/>
        <ellipse cx="1200" cy="500" rx="350" ry="250" fill="url(#blob1)" filter="url(#blur2)" opacity="0.4"/>

        {/* White wave streak */}
        <path
          d="M-100 520 C200 380, 500 560, 800 420 S1200 300, 1600 480"
          stroke="rgba(255,255,255,0.12)" strokeWidth="60" fill="none" filter="url(#blur1)"
        />
        <path
          d="M-100 540 C200 400, 500 580, 800 440 S1200 320, 1600 500"
          stroke="rgba(255,255,255,0.06)" strokeWidth="30" fill="none"
        />
        {/* Thin crisp caustic line */}
        <path
          d="M100 560 C350 440, 600 590, 850 460 S1250 350, 1500 520"
          stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" fill="none"
        />
      </svg>

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
