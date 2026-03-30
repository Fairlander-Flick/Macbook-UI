import React, { useState } from 'react';
import MenuBar from './components/MenuBar';
import Dock from './components/Dock';

export default function App() {
  const handleAppClick = (appId) => {
    console.log(`App clicked: ${appId}`);
  };

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden bg-cover bg-center select-none"
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop")' }}
    >
      <MenuBar />
      <Dock onAppClick={handleAppClick} />
    </div>
  );
}
