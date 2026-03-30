import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Search, Command } from 'lucide-react';

export default function MenuBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="h-6 w-full flex items-center justify-between px-4 bg-white/20 backdrop-blur-md border-b border-black/10 text-white text-[13px] font-medium absolute top-0 z-50 shadow-sm cursor-default">
      <div className="flex items-center space-x-4">
        <Command size={14} className="cursor-pointer" />
        <span className="font-bold cursor-pointer">Finder</span>
        <span className="cursor-pointer hidden sm:block">File</span>
        <span className="cursor-pointer hidden sm:block">Edit</span>
        <span className="cursor-pointer hidden sm:block">View</span>
        <span className="cursor-pointer hidden sm:block">Go</span>
        <span className="cursor-pointer hidden sm:block">Window</span>
        <span className="cursor-pointer hidden sm:block">Help</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <Wifi size={14} className="cursor-pointer" />
        <BatteryMedium size={14} className="cursor-pointer" />
        <Search size={14} className="cursor-pointer" />
        <span className="cursor-pointer">{formatDate(time)} {formatTime(time)}</span>
      </div>
    </div>
  );
}
