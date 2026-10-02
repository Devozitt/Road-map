# Web Development From Zero — Professional Fun Edition

A responsive, multi-page, interactive beginner learning platform built from the supplied **Web Development • From Zero** notes.

## Visual direction
- Professional dashboard-style UI inspired by the supplied reference screenshots
- Professional + playful typography: Bricolage Grotesque, Plus Jakarta Sans, Manrope and DM Mono
- Fun learning dashboard with quests, XP/progress, celebratory completion feedback and lively micro-interactions
- Cartoon/vector illustrations with a **unique illustration per chapter/special page**
- Colorful cards, soft gradients, rounded panels, micro-interactions, animated buttons
- Light/dark theme
- Mobile-first navigation with desktop sidebar

## Cinematic edition
- Title sequence with letterbox bars and a loading counter (home, once per session; click to skip)
- Rack-focus headline reveals, a lens-streak sweep across the hero, mouse + scroll parallax
- Live starfield that stretches into warp streaks as you scroll, film grain, cursor light
- "Follow one click" pinned scroll scene: a glowing packet travels User -> Frontend -> API -> Backend -> Database
- Shutter page transitions, scroll reveals, 3D card tilt, reading-progress bar
- Honors `prefers-reduced-motion`; light/dark toggle still works
- Cinematic effects live in `assets/cinema.css` and `assets/cinema.js`; the professional/fun visual system is layered in `assets/pro-fun.css`

## Learning features
- 16 chapter pages instead of one giant scroll page
- Course-wide search (also opens with `Ctrl+K` / `Cmd+K`) that indexes chapters, individual lesson sections, glossary terms and all supplemental study documents
- Searchable glossary and supplemental study documents
- Chapter completion + localStorage progress
- Interactive HTML/CSS, JavaScript, API/HTTP, CRUD, authentication and DNS/HTTPS labs
- Request-flow visualization
- Code copy buttons
- Quizzes and feedback
- Responsive mobile navigation

## Supplemental documents
The `docs/` directory contains focused reference sheets derived from the supplied notes:
- source-map.md
- web-mental-model.md
- javascript-learning-order.md
- api-http.md
- backend-database.md
- security.md
- deployment.md
- practical-roadmap.md

## Run
Open `index.html` in a browser. No build step is required.

## Source discipline
The supplied PDF is the primary knowledge source. The platform transforms its explanations into an interactive learning experience and keeps its terminology and progression.
