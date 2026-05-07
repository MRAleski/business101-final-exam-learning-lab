:root {
  --navy: #1e3a5f;
  --blue: #2d5a8c;
  --green: #2e7d32;
  --gold: #b7791f;
  --red: #b42318;
  --ink: #1f2937;
  --muted: #64748b;
  --line: #d9e2ec;
  --bg: #f5f7fb;
  --card: #ffffff;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: var(--bg);
  color: var(--ink);
}

button, input { font: inherit; }

.app-shell {
  max-width: 1120px;
  margin: 0 auto;
  min-height: 100vh;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  background: linear-gradient(135deg, var(--navy), var(--blue));
  color: #fff;
  padding: 1.25rem;
  border-radius: 0 0 18px 18px;
}

.topbar h1 { margin: 0; font-size: clamp(1.5rem, 4vw, 2.2rem); }
.eyebrow { margin: 0 0 .25rem; letter-spacing: .08em; text-transform: uppercase; color: #dbeafe; font-size: .8rem; font-weight: 700; }

main { padding: 1rem; }

.card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 1.2rem;
  box-shadow: 0 10px 28px rgba(15, 23, 42, .07);
  margin-bottom: 1rem;
}

.start-card {
  max-width: 720px;
  margin: 2rem auto;
}

.badge {
  display: inline-block;
  background: #e0f2fe;
  color: var(--navy);
  border-radius: 999px;
  padding: .35rem .7rem;
  font-weight: 700;
  font-size: .85rem;
}

label {
  display: block;
  margin: 1rem 0 .35rem;
  font-weight: 700;
}

input {
  width: 100%;
  max-width: 420px;
  padding: .85rem;
  border: 1px solid var(--line);
  border-radius: 12px;
}

.primary-btn, .ghost-btn {
  border: 0;
  border-radius: 12px;
  padding: .85rem 1rem;
  cursor: pointer;
  font-weight: 700;
  min-height: 44px;
}

.primary-btn { background: var(--blue); color: #fff; }
.ghost-btn { background: #eef2f7; color: var(--navy); }
.primary-btn:hover, .ghost-btn:hover, .mode-card:hover, .choice-btn:hover { filter: brightness(.97); }

.hidden { display: none !important; }

.progress-panel {
  position: sticky;
  top: 0;
  z-index: 5;
  background: rgba(255,255,255,.96);
  border: 1px solid var(--line);
  border-radius: 0 0 14px 14px;
  padding: .8rem 1rem;
  box-shadow: 0 8px 18px rgba(15, 23, 42, .08);
}

.progress-copy {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-size: .92rem;
  color: var(--muted);
}

.progress-track {
  width: 100%;
  height: 12px;
  background: #e5e7eb;
  border-radius: 999px;
  margin-top: .55rem;
  overflow: hidden;
}

.progress-fill {
  width: 0%;
  height: 100%;
  background: linear-gradient(90deg, var(--gold), var(--green));
  border-radius: 999px;
  transition: width .35s ease;
}

.near-complete {
  margin: .5rem 0 0;
  color: var(--green);
  font-weight: 700;
}

.dashboard-grid, .mode-grid, .category-grid {
  display: grid;
  gap: .9rem;
}

.dashboard-grid { grid-template-columns: repeat(4, 1fr); }
.mode-grid { grid-template-columns: repeat(5, 1fr); }
.category-grid { grid-template-columns: repeat(3, 1fr); }

.stat-card strong {
  display: block;
  font-size: 1.7rem;
  margin-top: .25rem;
}

.stat-label { color: var(--muted); font-size: .9rem; }
.readiness-card strong { color: var(--gold); }

.mode-card, .choice-btn, .match-btn {
  text-align: left;
  background: #f8fafc;
  color: var(--ink);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 1rem;
  cursor: pointer;
  min-height: 120px;
}

.mode-card span {
  display: inline-grid;
  place-items: center;
  width: 32px;
  height: 32px;
  background: #e0f2fe;
  color: var(--navy);
  border-radius: 999px;
  font-weight: 700;
}

.mode-card strong {
  display: block;
  margin: .8rem 0 .25rem;
}

.mode-card small { color: var(--muted); }
.mode-card.challenge { border-color: #f59e0b; background: #fffbeb; }

.activity-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: start;
  margin-bottom: 1rem;
}

.activity-header .eyebrow { color: var(--blue); }
.counter { color: var(--muted); font-weight: 700; }

.flashcard {
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 1.1rem;
  background: #f8fafc;
}

.flash-term { font-size: 1.5rem; margin: 0 0 .5rem; color: var(--navy); }
.stack { display: grid; gap: .7rem; margin-top: 1rem; }
.callout { padding: .8rem; border-radius: 12px; background: #fff; border: 1px solid var(--line); }
.callout strong { color: var(--navy); }

.choice-grid {
  display: grid;
  gap: .75rem;
  margin-top: 1rem;
}

.choice-btn { min-height: auto; }
.choice-btn.correct-choice { border-color: var(--green); background: #ecfdf3; }
.choice-btn.wrong-choice { border-color: var(--red); background: #fef3f2; }

.feedback {
  margin-top: 1rem;
  padding: .95rem;
  border-radius: 14px;
  border: 1px solid var(--line);
  background: #fff;
}

.feedback.correct { border-color: var(--green); background: #ecfdf3; color: #14532d; }
.feedback.incorrect { border-color: var(--red); background: #fef3f2; color: #7f1d1d; }

.category-card {
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: .9rem;
  background: #f8fafc;
}

.category-card strong { display: block; color: var(--navy); }
.meter { height: 9px; background: #e5e7eb; border-radius: 99px; overflow: hidden; margin-top: .6rem; }
.meter span { display: block; height: 100%; width: 0%; background: var(--green); border-radius: 99px; }

.match-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.match-list {
  display: grid;
  gap: .6rem;
}

.match-btn.selected {
  outline: 3px solid #93c5fd;
  background: #eff6ff;
}

.match-btn.matched {
  background: #ecfdf3;
  border-color: var(--green);
  cursor: default;
}

.result-actions {
  display: flex;
  flex-wrap: wrap;
  gap: .7rem;
  margin-top: 1rem;
}

.certificate {
  background: #fff;
  padding: 2rem;
  border: 6px solid var(--navy);
  margin: 1rem;
}

.cert-inner {
  border: 2px solid var(--gold);
  padding: 2rem;
  text-align: center;
}

.cert-kicker {
  text-transform: uppercase;
  letter-spacing: .1em;
  color: var(--navy);
  font-weight: 700;
}

#certName { font-size: 2rem; color: var(--navy); }

.cert-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: .7rem;
  margin: 1.4rem 0;
}

.cert-grid div {
  border: 1px solid var(--line);
  padding: .8rem;
  border-radius: 12px;
}

.cert-grid strong { display: block; font-size: 1.4rem; }
.cert-grid span { color: var(--muted); font-size: .85rem; }
.cert-note { color: var(--muted); font-size: .9rem; }

.small-note { color: var(--muted); font-size: .9rem; }

@media (max-width: 900px) {
  .dashboard-grid, .mode-grid, .category-grid { grid-template-columns: repeat(2, 1fr); }
  .match-layout { grid-template-columns: 1fr; }
}

@media (max-width: 560px) {
  .topbar { align-items: flex-start; flex-direction: column; }
  .dashboard-grid, .mode-grid, .category-grid, .cert-grid { grid-template-columns: 1fr; }
  .progress-copy { flex-direction: column; gap: .25rem; }
  .activity-header { flex-direction: column; }
  .mode-card { min-height: auto; }
}

@media print {
  body * { visibility: hidden; }
  #certificate, #certificate * { visibility: visible; }
  #certificate {
    display: block !important;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    margin: 0;
    box-shadow: none;
  }
  .topbar, .progress-panel, #startScreen, #dashboard, #activityScreen, #resultsScreen { display: none !important; }
}
