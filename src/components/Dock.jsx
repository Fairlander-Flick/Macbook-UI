import React from 'react';
import { Camera, Folder, Chrome, Settings } from 'lucide-react';

export default function Dock({ onAppClick }) {
  const apps = [
    { id: 'finder', name: 'Finder', icon: Folder, color: 'text-blue-500' },
    { id: 'safari', name: 'Safari', icon: Chrome, color: 'text-blue-400' },
    { id: 'camera', name: 'Photo Booth', icon: Camera, color: 'text-gray-700' },
    { id: 'settings', name: 'System Settings', icon: Settings, color: 'text-gray-500' }
  ];

  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 mb-2 z-50">
      <div className="flex items-end gap-2 p-2 rounded-2xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl">
        {apps.map(app => {
          const Icon = app.icon;
          return (
            <div 
              key={app.id}
              onClick={() => onAppClick(app.id)}
              className="group relative flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-white/80 shadow-sm hover:w-14 hover:h-14 hover:-translate-y-2 transition-all duration-200 cursor-pointer"
            >
              <Icon size={28} className={app.color} />
              
              {/* Tooltip */}
              <div className="absolute -top-10 px-2 py-1 bg-black/60 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {app.name}
              </div>
              {/* Dot indicator if open */}
              {app.id === 'finder' && (
                <div className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-white/80" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
}
