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
    <div 
      className="relative w-screen h-screen overflow-hidden bg-cover bg-center select-none"
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1628155930542-3c7a64e2c848?q=80&w=3540&auto=format&fit=crop")' }}
    >
      <MenuBar />
      <Desktop>
        {openApps.includes('camera') && (
          <Window title="Photo Booth" onClose={() => closeApp('camera')} defaultPos={{ x: window.innerWidth / 2 - 320, y: window.innerHeight / 2 - 250 }}>
            <CameraApp />
          </Window>
        )}
      </Desktop>
      <Dock onAppClick={handleAppClick} />
    </div>
  );
}
