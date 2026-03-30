# macOS UI Replica — Design Document
Date: 2026-03-30

## Goal
Pixel-perfect macOS desktop + Photo Booth experience in the browser. Users should feel like they're using the real macOS Photo Booth app.

## Scope
- Standard macOS dock with accurate SVG icons (no emoji)
- Photo Booth: single photo capture mode, pixel-perfect UI

## 1. Dock Icons

Replace the emoji-based `MacIcon` component with per-app SVG icons that match real macOS Big Sur/Sequoia visuals.

**Standard dock order:**
Finder → Safari → Mail → Messages → FaceTime → Photos → Music → Podcasts → App Store → System Settings → Terminal → [separator] → Trash

Each icon is a self-contained SVG component with:
- Correct rounded-square shape (rx=13.5 on 60×60 viewBox)
- Accurate gradient background matching real macOS colors
- Accurate foreground path/shape (Finder face, Safari compass, etc.)

Existing hover magnification, tooltip, and open-indicator dot behavior is preserved.

## 2. Photo Booth UI Fixes

### Shutter button
- Current: plain red circle with white border
- Fix: red circle + white camera SVG icon centered inside (matching real macOS Photo Booth)

### Thumbnail strip
- Current: separate horizontal bar below camera feed
- Fix: positioned as overlay in the bottom-right corner of the camera feed area, matching the real app layout

### Mode buttons
- Selected mode gets a visible active state (light background highlight)
- Default: portrait/photo mode active on open

## 3. Out of Scope
- 4-up grid mode
- Video recording
- Effects panel
- Menu bar app switching (remains static)
