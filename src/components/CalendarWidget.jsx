import React from 'react';

const DAYS = ['M','T','W','T','F','S','S'];
// Build March 2026 calendar
function buildCalendar(year, month) {
  // month is 1-indexed
  const firstDay = new Date(year, month - 1, 1).getDay(); // 0=Sun
  const monFirst = (firstDay + 6) % 7; // shift so Mon=0
  const daysInMonth = new Date(year, month, 0).getDate();
  const cells = [];
  for (let i = 0; i < monFirst; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

export default function CalendarWidget() {
  const now = new Date();
  const year = 2026, month = 3, today = 30;
  const monthName = 'MARCH';
  const dayName = 'MONDAY';
  const cells = buildCalendar(year, month);

  return (
    <div style={{
      position: 'absolute', top: '36px', right: '12px',
      zIndex: 40,
      background: 'rgba(30,30,40,0.72)',
      backdropFilter: 'blur(30px) saturate(180%)',
      WebkitBackdropFilter: 'blur(30px) saturate(180%)',
      borderRadius: '18px',
      border: '0.5px solid rgba(255,255,255,0.12)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      padding: '14px 16px',
      display: 'flex',
      gap: '14px',
      userSelect: 'none',
      minWidth: '220px',
    }}>
      {/* Left: Big date */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', minWidth: '90px' }}>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em' }}>{dayName}</div>
        <div style={{ color: 'white', fontSize: '52px', fontWeight: 200, lineHeight: 1.1 }}>{today}</div>
        <div style={{ marginTop: '6px', color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>No Events Today</div>
      </div>

      {/* Right: Mini calendar */}
      <div>
        <div style={{ color: 'rgba(255,80,80,0.9)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '6px', textAlign: 'center' }}>
          {monthName}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 22px)', gap: '1px' }}>
          {DAYS.map((d, i) => (
            <div key={i} style={{ color: 'rgba(255,255,255,0.4)', fontSize: '9px', fontWeight: 600, textAlign: 'center', paddingBottom: '3px' }}>{d}</div>
          ))}
          {cells.map((d, i) => (
            <div key={i} style={{
              width: '20px', height: '20px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '10px',
              fontWeight: d === today ? 700 : 400,
              color: d === today ? 'white' : d ? 'rgba(255,255,255,0.75)' : 'transparent',
              borderRadius: '50%',
              background: d === today ? '#FF3B30' : 'transparent',
            }}>{d}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
