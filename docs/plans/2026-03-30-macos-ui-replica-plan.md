# macOS UI Replica Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace emoji dock icons with accurate macOS SVG icons, and fix Photo Booth UI to match the real app pixel-for-pixel.

**Architecture:** Two independent file changes — `Dock.jsx` gets new per-app SVG icon components replacing the generic `MacIcon`+emoji system; `CameraApp.jsx` gets a repositioned thumbnail overlay and improved shutter button. No new files needed.

**Tech Stack:** React, inline SVG, CSS-in-JS (inline styles). No new dependencies.

---

### Task 1: Accurate SVG dock icons in Dock.jsx

**Files:**
- Modify: `src/components/Dock.jsx`

#### What the current code does

`Dock.jsx` renders a `MacIcon` component that draws a gradient rounded-square and places an emoji on top. The `DOCK_APPS` array maps app IDs to emoji + gradient colors. This produces fuzzy, inaccurate icons.

#### What we're building

Each standard macOS app gets its own SVG icon component that draws the correct foreground artwork (Finder's face, Safari's compass, etc.) on top of the correct gradient. The `MacIcon`+emoji approach is fully replaced.

**Standard dock order:**
Finder → Safari → Mail → Messages → FaceTime → Photos → Music → Podcasts → App Store → System Settings → Terminal → [separator] → Trash

---

**Step 1: Replace DOCK_APPS array**

In `src/components/Dock.jsx`, replace the `DOCK_APPS` array. Each entry now has an `icon` render function instead of `emoji`+`bg`:

```jsx
const DOCK_APPS = [
  { id: 'finder',   name: 'Finder' },
  { id: 'safari',   name: 'Safari' },
  { id: 'mail',     name: 'Mail' },
  { id: 'messages', name: 'Messages' },
  { id: 'facetime', name: 'FaceTime' },
  { id: 'photos',   name: 'Photos' },
  { id: 'music',    name: 'Music' },
  { id: 'podcasts', name: 'Podcasts' },
  { id: 'appstore', name: 'App Store' },
  { id: 'settings', name: 'System Settings' },
  { id: 'terminal', name: 'Terminal' },
  null,
  { id: 'trash',    name: 'Trash' },
];
```

**Step 2: Add the SVG icon components**

Add these components above the `Dock` export. Each is a `60×60` SVG with `rx=13.5` rounded square.

```jsx
// Shared rounded square clip path wrapper
function AppIcon({ id, children, bg }) {
  const clipId = `clip-${id}`;
  return (
    <svg viewBox="0 0 60 60" width="100%" height="100%">
      <defs>
        <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
          {bg.map((c, i) => (
            <stop key={i} offset={`${(i / (bg.length - 1)) * 100}%`} stopColor={c} />
          ))}
        </linearGradient>
        <clipPath id={clipId}>
          <rect x="0" y="0" width="60" height="60" rx="13.5" />
        </clipPath>
      </defs>
      <rect x="0" y="0" width="60" height="60" rx="13.5" fill={`url(#grad-${id})`} />
      <g clipPath={`url(#${clipId})`}>{children}</g>
    </svg>
  );
}

function FinderIcon() {
  return (
    <AppIcon id="finder" bg={['#6EC6F5', '#2D9BF0', '#1A6FCC']}>
      {/* Face background */}
      <ellipse cx="30" cy="32" rx="22" ry="20" fill="#fff" />
      {/* Left eye — blue */}
      <ellipse cx="22" cy="28" rx="7" ry="8" fill="#4A90E2" />
      <ellipse cx="22" cy="28" rx="4" ry="5" fill="#1A3A6B" />
      <circle cx="23.5" cy="26.5" r="1.5" fill="#fff" />
      {/* Right eye — white sclera + pupil */}
      <ellipse cx="38" cy="28" rx="7" ry="8" fill="#fff" stroke="#ccc" strokeWidth="0.5" />
      <ellipse cx="38" cy="28" rx="4" ry="5" fill="#1A3A6B" />
      <circle cx="39.5" cy="26.5" r="1.5" fill="#fff" />
      {/* Smile */}
      <path d="M21 38 Q30 45 39 38" stroke="#1A3A6B" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Nose */}
      <ellipse cx="30" cy="34" rx="2" ry="1.5" fill="rgba(0,0,0,0.15)" />
    </AppIcon>
  );
}

function SafariIcon() {
  return (
    <AppIcon id="safari" bg={['#55C5FC', '#148EFA', '#0062D4']}>
      {/* Compass ring */}
      <circle cx="30" cy="30" r="18" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
      <circle cx="30" cy="30" r="16" fill="rgba(255,255,255,0.15)" />
      {/* Compass ticks */}
      {[0,90,180,270].map(a => {
        const r = Math.PI * a / 180;
        const x1 = 30 + 14 * Math.sin(r), y1 = 30 - 14 * Math.cos(r);
        const x2 = 30 + 17 * Math.sin(r), y2 = 30 - 17 * Math.cos(r);
        return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.7)" strokeWidth="2" />;
      })}
      {/* Red needle (north) */}
      <polygon points="30,13 27.5,30 30,28 32.5,30" fill="#FF3B30" />
      {/* White needle (south) */}
      <polygon points="30,47 27.5,30 30,32 32.5,30" fill="white" />
      {/* Center dot */}
      <circle cx="30" cy="30" r="2" fill="white" />
    </AppIcon>
  );
}

function MailIcon() {
  return (
    <AppIcon id="mail" bg={['#5AC8FB', '#1C86FA', '#005FE8']}>
      {/* Envelope body */}
      <rect x="8" y="16" width="44" height="30" rx="4" fill="white" />
      {/* Envelope flap */}
      <path d="M8 16 L30 33 L52 16" stroke="#B8D4F5" strokeWidth="1.5" fill="none" />
      {/* Subtle side lines */}
      <line x1="8" y1="46" x2="20" y2="34" stroke="#B8D4F5" strokeWidth="1" />
      <line x1="52" y1="46" x2="40" y2="34" stroke="#B8D4F5" strokeWidth="1" />
    </AppIcon>
  );
}

function MessagesIcon() {
  return (
    <AppIcon id="messages" bg={['#62D256', '#30B93E', '#1A9428']}>
      {/* Speech bubble */}
      <path
        d="M10 14 Q10 10 14 10 L46 10 Q50 10 50 14 L50 36 Q50 40 46 40 L22 40 L14 50 L16 40 L14 40 Q10 40 10 36 Z"
        fill="white"
      />
    </AppIcon>
  );
}

function FaceTimeIcon() {
  return (
    <AppIcon id="facetime" bg={['#6AD56A', '#28B828', '#149414']}>
      {/* Camera body */}
      <rect x="8" y="20" width="30" height="22" rx="5" fill="white" />
      {/* Camera lens */}
      <circle cx="23" cy="31" r="7" fill="#3CC83C" />
      <circle cx="23" cy="31" r="4" fill="#1A8A1A" />
      <circle cx="25" cy="29" r="1.5" fill="rgba(255,255,255,0.5)" />
      {/* Video triangle */}
      <path d="M40 23 L52 27 L52 35 L40 39 Z" fill="white" />
    </AppIcon>
  );
}

function PhotosIcon() {
  return (
    <AppIcon id="photos" bg={['#ffffff', '#f2f2f2', '#e5e5e5']}>
      {/* 8-petal flower */}
      {[0,45,90,135,180,225,270,315].map((a, i) => {
        const colors = ['#FF3B30','#FF9500','#FFCC00','#34C759','#00C7BE','#007AFF','#5856D6','#FF2D55'];
        const r = Math.PI * a / 180;
        const cx = 30 + 10 * Math.cos(r);
        const cy = 30 + 10 * Math.sin(r);
        return <ellipse key={a} cx={cx} cy={cy} rx="6" ry="9"
          fill={colors[i]} transform={`rotate(${a} ${cx} ${cy})`} opacity="0.9" />;
      })}
      <circle cx="30" cy="30" r="6" fill="white" />
    </AppIcon>
  );
}

function MusicIcon() {
  return (
    <AppIcon id="music" bg={['#FC3C44', '#C41921', '#960F15']}>
      {/* Music note */}
      <path d="M38 12 L38 34 Q38 40 32 40 Q26 40 26 35 Q26 30 32 30 Q35 30 36 31 L36 18 L38 18" fill="none"
        stroke="white" strokeWidth="3" strokeLinecap="round" />
      <path d="M22 18 L38 14" stroke="white" strokeWidth="3" strokeLinecap="round" />
      {/* Filled note head */}
      <ellipse cx="31" cy="35" rx="5" ry="4" fill="white" transform="rotate(-15 31 35)" />
    </AppIcon>
  );
}

function PodcastsIcon() {
  return (
    <AppIcon id="podcasts" bg={['#E040B0', '#B4169A', '#880D78']}>
      {/* Signal waves */}
      <circle cx="30" cy="30" r="6" fill="white" />
      <circle cx="30" cy="30" r="11" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" />
      <circle cx="30" cy="30" r="17" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      {/* Mic stand line */}
      <line x1="30" y1="36" x2="30" y2="48" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="22" y1="48" x2="38" y2="48" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" strokeLinecap="round" />
    </AppIcon>
  );
}

function AppStoreIcon() {
  return (
    <AppIcon id="appstore" bg={['#3BCBFF', '#1B9EFF', '#0066E8']}>
      {/* Stylized A with downstrokes */}
      <path d="M30 10 L42 42 M18 42 L42 42 M22 30 L38 30 M18 42 L30 10"
        stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Pencil lines at bottom of A legs */}
      <line x1="17" y1="45" x2="22" y2="39" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
      <line x1="43" y1="45" x2="38" y2="39" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
    </AppIcon>
  );
}

function SystemSettingsIcon() {
  return (
    <AppIcon id="settings" bg={['#8E8E93', '#636366', '#3A3A3C']}>
      {/* Gear */}
      <circle cx="30" cy="30" r="8" fill="white" />
      <circle cx="30" cy="30" r="4" fill="#636366" />
      {[0,45,90,135,180,225,270,315].map(a => {
        const r = Math.PI * a / 180;
        const x = 30 + 13 * Math.cos(r);
        const y = 30 + 13 * Math.sin(r);
        return <rect key={a} x={x - 3} y={y - 3} width="6" height="6" rx="1.5"
          fill="white" transform={`rotate(${a} ${x} ${y})`} />;
      })}
    </AppIcon>
  );
}

function TerminalIcon() {
  return (
    <AppIcon id="terminal" bg={['#3A3A3A', '#1E1E1E', '#080808']}>
      {/* Prompt */}
      <text x="11" y="27" fontFamily="monospace" fontSize="11" fill="#5AF078" fontWeight="bold">{'$_'}</text>
      {/* Cursor bar */}
      <rect x="28" y="22" width="7" height="1.5" fill="#5AF078" opacity="0.8" />
      {/* Second line */}
      <text x="11" y="40" fontFamily="monospace" fontSize="9" fill="rgba(90,240,120,0.5)">{'~/dev'}</text>
    </AppIcon>
  );
}

function TrashIcon({ full = false }) {
  return (
    <AppIcon id="trash" bg={['#8E8E93', '#636366', '#3A3A3C']}>
      {/* Lid */}
      <rect x="15" y="16" width="30" height="5" rx="2.5" fill="rgba(255,255,255,0.9)" />
      <rect x="23" y="12" width="14" height="5" rx="2" fill="rgba(255,255,255,0.9)" />
      {/* Body */}
      <path d="M17 21 L19 48 Q19 50 21 50 L39 50 Q41 50 41 48 L43 21 Z"
        fill="rgba(255,255,255,0.85)" />
      {/* Vertical lines */}
      <line x1="24" y1="26" x2="24" y2="45" stroke="rgba(100,100,100,0.4)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="30" y1="26" x2="30" y2="45" stroke="rgba(100,100,100,0.4)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="36" y1="26" x2="36" y2="45" stroke="rgba(100,100,100,0.4)" strokeWidth="1.5" strokeLinecap="round" />
    </AppIcon>
  );
}
```

**Step 3: Create an icon lookup map and update DockIcon**

Replace the `MacIcon` usage in `DockIcon` with a lookup:

```jsx
const ICON_MAP = {
  finder:   <FinderIcon />,
  safari:   <SafariIcon />,
  mail:     <MailIcon />,
  messages: <MessagesIcon />,
  facetime: <FaceTimeIcon />,
  photos:   <PhotosIcon />,
  music:    <MusicIcon />,
  podcasts: <PodcastsIcon />,
  appstore: <AppStoreIcon />,
  settings: <SystemSettingsIcon />,
  terminal: <TerminalIcon />,
  trash:    <TrashIcon />,
};
```

In `DockIcon`, replace:
```jsx
<MacIcon bg={app.bg}>{app.emoji}</MacIcon>
```
with:
```jsx
{ICON_MAP[app.id] ?? null}
```

Also delete the old `MacIcon` function — it's no longer used.

**Step 4: Remove Photo Booth from dock**

`camera` / Photo Booth is removed from the dock in this change. The app opens via another trigger (or keep it in dock with a camera icon — see Task 2). For now, remove it from `DOCK_APPS` entirely since the focus is the standard macOS dock.

**Step 5: Verify visually**

Run `npm run dev`. Open the app. Check:
- All 12 icons render with correct rounded-square shape
- No emoji visible
- Hover magnification + tooltips still work
- Open indicator dot still appears on Finder

**Step 6: Commit**

```bash
git add src/components/Dock.jsx
git commit -m "feat: replace emoji dock icons with accurate macOS SVG icons"
```

---

### Task 2: Photo Booth UI fixes in CameraApp.jsx

**Files:**
- Modify: `src/components/CameraApp.jsx`

#### What's changing

1. **Shutter button** — add a white camera SVG icon inside the red circle
2. **Thumbnail strip** — move from separate bottom bar to absolute overlay in bottom-right of the camera feed area
3. **Default active mode** — portrait mode button highlighted on open

---

**Step 1: Add active mode state**

At the top of `CameraApp`, add a mode state:
```jsx
const [mode, setMode] = useState('photo'); // 'grid' | 'photo' | 'video'
```

**Step 2: Update CtrlBtn to support active state**

```jsx
function CtrlBtn({ children, title, active, onClick }) {
  const [h, setH] = React.useState(false);
  return (
    <button
      title={title}
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: active ? 'rgba(255,255,255,0.22)' : h ? 'rgba(255,255,255,0.12)' : 'transparent',
        border: active ? '0.5px solid rgba(255,255,255,0.3)' : 'none',
        cursor: 'default',
        padding: '6px',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.1s',
      }}
    >
      {children}
    </button>
  );
}
```

**Step 3: Update the three mode buttons to use active + setMode**

```jsx
<CtrlBtn title="4-up" active={mode === 'grid'} onClick={() => setMode('grid')}>
  {/* grid svg */}
</CtrlBtn>
<CtrlBtn title="Photo" active={mode === 'photo'} onClick={() => setMode('photo')}>
  {/* portrait svg */}
</CtrlBtn>
<CtrlBtn title="Video" active={mode === 'video'} onClick={() => setMode('video')}>
  {/* video svg */}
</CtrlBtn>
```

**Step 4: Replace shutter button inner content**

Replace the plain `<div style={{ width:'34px', height:'34px', borderRadius:'50%', background:'#FF3B30' }}/>` inside the shutter button with:

```jsx
<div style={{
  width: '44px', height: '44px', borderRadius: '50%',
  background: '#E8000A',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
}}>
  {/* Camera body */}
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
    <rect x="2" y="7" width="20" height="14" rx="3" fill="white"/>
    <circle cx="12" cy="14" r="4" fill="#E8000A"/>
    <circle cx="12" cy="14" r="2.5" fill="white"/>
    <rect x="8" y="4" width="8" height="4" rx="1.5" fill="white"/>
    <circle cx="18" cy="10" r="1" fill="#E8000A"/>
  </svg>
</div>
```

Also update the outer shutter button style — remove the white border and make it match the real Photo Booth shutter:

```jsx
<button onClick={takePhoto} style={{
  width: '52px', height: '52px', borderRadius: '50%',
  border: '2.5px solid rgba(255,255,255,0.5)',
  background: 'transparent',
  cursor: 'pointer', outline: 'none',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  transition: 'transform 0.1s',
  padding: 0,
}}>
```

**Step 5: Move thumbnail strip to overlay inside camera feed**

Remove the current `{photos.length > 0 && (...)}` block that renders below the video.

Inside the camera feed `<div>` (the one with `flex: 1, position: 'relative'`), add the thumbnail strip as an absolute overlay:

```jsx
{photos.length > 0 && (
  <div style={{
    position: 'absolute',
    bottom: '8px',
    right: '8px',
    display: 'flex',
    flexDirection: 'row',
    gap: '4px',
    zIndex: 10,
  }}>
    {photos.slice(0, 4).map((p, i) => (
      <div
        key={i}
        onClick={() => savePhoto(p)}
        title="Click to download"
        style={{
          width: '70px',
          height: '52px',
          borderRadius: '4px',
          overflow: 'hidden',
          border: i === 0 ? '2px solid white' : '1.5px solid rgba(255,255,255,0.4)',
          cursor: 'pointer',
          flexShrink: 0,
          boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
        }}
      >
        <img src={p} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    ))}
  </div>
)}
```

**Step 6: Verify visually**

Run `npm run dev`. Click Photo Booth in dock. Check:
- Portrait mode button is highlighted by default
- Shutter button has camera icon inside red circle
- After taking a photo, thumbnails appear in bottom-right corner of video feed (not below it)
- Clicking a thumbnail downloads it

**Step 7: Commit**

```bash
git add src/components/CameraApp.jsx
git commit -m "feat: pixel-perfect Photo Booth — camera shutter icon, overlay thumbnails, active mode state"
```

---

## Done

After both commits, run `npm run build` to confirm no build errors.
