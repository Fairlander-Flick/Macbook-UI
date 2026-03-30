import React, { useRef } from 'react';
import Draggable from 'react-draggable';

export default function Window({ title, onClose, children, defaultPos = { x: 100, y: 100 } }) {
  const nodeRef = useRef(null);
  
  return (
    <Draggable nodeRef={nodeRef} defaultPosition={defaultPos} bounds="parent" handle=".title-bar">
      <div 
        ref={nodeRef} 
        className="absolute z-[100] bg-white/70 backdrop-blur-3xl border border-white/50 rounded-xl overflow-hidden min-w-[300px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] ring-1 ring-black/5"
      >
        {/* macOS Title Bar */}
        <div className="title-bar h-7 bg-transparent flex items-center px-3 border-b border-black/10 cursor-default select-none group relative">
          <div className="flex gap-2 z-10 w-14">
            <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] flex items-center justify-center transition-colors">
              <span className="invisible group-hover:visible text-[8px] text-[#990000] leading-none mb-0.5 font-bold">×</span>
            </button>
            <button className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] flex items-center justify-center transition-colors">
              <span className="invisible group-hover:visible text-[8px] text-[#995500] leading-none mb-0.5 font-bold">-</span>
            </button>
            <button className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] flex items-center justify-center transition-colors">
              <span className="invisible group-hover:visible text-[8px] text-[#006500] leading-none font-bold">+</span>
            </button>
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-[13px] font-semibold text-gray-700 tracking-wide">
            {title}
          </div>
        </div>
        <div className="content">
          {children}
        </div>
      </div>
    </Draggable>
  );
}
