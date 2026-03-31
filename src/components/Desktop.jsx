import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';

const FolderIcon = ({ color = '#4A9CEA' }) => {
  const light = color === '#888' ? '#aaa' : '#5BB8F5';
  return (
    <svg viewBox="0 0 60 50" width="52" height="44" fill="none">
      <path d="M2 8a5 5 0 015-5h12l4 6H52a5 5 0 015 5v25a5 5 0 01-5 5H7a5 5 0 01-5-5V8z" fill={color}/>
      <path d="M2 18h56v20a5 5 0 01-5 5H7a5 5 0 01-5-5V18z" fill={light}/>
      <ellipse cx="30" cy="34" rx="18" ry="5" fill="rgba(255,255,255,0.1)"/>
    </svg>
  );
};

const W = window.innerWidth;

const INITIAL_ICONS = [
  { id: '1', name: 'Macintosh HD', color: '#888',    pos: { x: W - 100, y: 40 } },
  { id: '2', name: 'mezuniyet',    color: '#4A9CEA', pos: { x: W - 100, y: 130 } },
  { id: '3', name: 'resmi',        color: '#4A9CEA', pos: { x: W - 100, y: 220 } },
  { id: '4', name: 'ödevler',      color: '#4A9CEA', pos: { x: W - 100, y: 310 } },
  { id: '5', name: 'mimarlik',     color: '#4A9CEA', pos: { x: W - 100, y: 400 } },
  { id: '6', name: 'staj',         color: '#4A9CEA', pos: { x: W - 100, y: 490 } },
  { id: '7', name: 'DESKTOP YEDEK',color: '#4A9CEA', pos: { x: W - 205, y: 40 } },
  { id: '8', name: 'Kampüs',       color: '#4A9CEA', pos: { x: W - 205, y: 130 } },
];

export default function Desktop({ children }) {
  const [icons, setIcons]         = useState(INITIAL_ICONS);
  const [selected, setSelected]   = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [editing, setEditing]     = useState(null);
  const [editName, setEditName]   = useState('');

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
    setSelected(null);
  };

  const createFolder = () => {
    const id = Date.now().toString();
    setIcons(prev => [...prev, { id, name: 'Adsız Klasör', color: '#4A9CEA', pos: { x: contextMenu.x - 30, y: contextMenu.y - 30 } }]);
    setContextMenu(null);
  };

  const commitRename = () => {
    if (editing) setIcons(prev => prev.map(ic => ic.id === editing ? { ...ic, name: editName } : ic));
    setEditing(null);
  };

  return (
    <div
      style={{ position: 'absolute', inset: 0, paddingTop: '24px', paddingBottom: '80px' }}
      onContextMenu={handleContextMenu}
      onClick={() => { setSelected(null); setContextMenu(null); }}
    >
      {icons.map(icon => (
        <DraggableIcon
          key={icon.id}
          icon={icon}
          isSelected={selected === icon.id}
          isEditing={editing === icon.id}
          editName={editName}
          setEditName={setEditName}
          onSelect={(id) => { setSelected(id); setContextMenu(null); }}
          onStartEdit={(id, name) => { setEditing(id); setEditName(name); }}
          onCommitRename={commitRename}
        />
      ))}

      {children}

      {contextMenu && (
        <div
          style={{
            position: 'fixed', top: contextMenu.y, left: contextMenu.x,
            zIndex: 500,
            background: 'rgba(240,240,240,0.88)',
            backdropFilter: 'blur(40px) saturate(200%)',
            WebkitBackdropFilter: 'blur(40px) saturate(200%)',
            borderRadius: '10px',
            border: '0.5px solid rgba(0,0,0,0.15)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.25)',
            width: '220px', padding: '5px 0',
            fontSize: '13px', color: '#1a1a1a',
          }}
          onClick={e => e.stopPropagation()}
        >
          <CtxItem onClick={createFolder}>Yeni Klasör</CtxItem>
          <div style={{ height: '0.5px', background: 'rgba(0,0,0,0.12)', margin: '4px 0' }}/>
          <CtxItem onClick={() => setContextMenu(null)}>Bilgiyi Göster</CtxItem>
          <CtxItem onClick={() => setContextMenu(null)}>Masaüstünü Özelleştir...</CtxItem>
        </div>
      )}
    </div>
  );
}

function CtxItem({ children, onClick }) {
  const [h, setH] = useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ padding: '5px 16px', cursor: 'default', borderRadius: '6px', margin: '0 5px',
        background: h ? '#3a7de8' : 'transparent', color: h ? 'white' : '#1a1a1a', transition: 'background 0.1s' }}>
      {children}
    </div>
  );
}

function DraggableIcon({ icon, isSelected, isEditing, editName, setEditName, onSelect, onStartEdit, onCommitRename }) {
  const nodeRef = useRef(null);
  return (
    <Draggable nodeRef={nodeRef} defaultPosition={icon.pos} bounds="parent">
      <div
        ref={nodeRef}
        style={{ position: 'absolute', width: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', cursor: 'default' }}
        onClick={e => { e.stopPropagation(); onSelect(icon.id); }}
        onDoubleClick={() => onStartEdit(icon.id, icon.name)}
      >
        <div style={{ padding: '4px', borderRadius: '10px', background: isSelected ? 'rgba(70,130,220,0.35)' : 'transparent', transition: 'background 0.1s' }}>
          <FolderIcon color={icon.color} />
        </div>
        {isEditing ? (
          <input autoFocus value={editName}
            onChange={e => setEditName(e.target.value)}
            onBlur={onCommitRename}
            onKeyDown={e => e.key === 'Enter' && onCommitRename()}
            onClick={e => e.stopPropagation()}
            style={{ fontSize: '11px', textAlign: 'center', background: '#3a7de8', color: 'white',
              border: 'none', outline: 'none', borderRadius: '3px', padding: '1px 4px', width: '72px' }}
          />
        ) : (
          <span style={{ fontSize: '11px', color: 'white', textAlign: 'center', lineHeight: 1.3,
            padding: '1px 4px', borderRadius: '3px',
            background: isSelected ? 'rgba(70,130,220,0.7)' : 'transparent',
            textShadow: '0 1px 3px rgba(0,0,0,0.9)', maxWidth: '76px',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {icon.name}
          </span>
        )}
      </div>
    </Draggable>
  );
}
