
/* ---------- Time-on-task tracking patch ---------- */
const TIMER_PREFIX = "busLawReadinessTimerV1_";
let activeTimerName = "";

function normalizeTimerName(name) {
  return (name || "Student").trim().toLowerCase().replace(/\s+/g, "_");
}
function timerKey(name, suffix) {
  return TIMER_PREFIX + normalizeTimerName(name) + "_" + suffix;
}
function getStoredNumber(key, fallback = 0) {
  const value = Number(localStorage.getItem(key));
  return Number.isFinite(value) ? value : fallback;
}
function startTimeOnTask(name) {
  activeTimerName = normalizeTimerName(name || state.studentName || "Student");
  const startKey = timerKey(activeTimerName, "sessionStart");
  const totalKey = timerKey(activeTimerName, "totalMs");
  if (!localStorage.getItem(totalKey)) localStorage.setItem(totalKey, "0");
  if (!getStoredNumber(startKey, 0)) localStorage.setItem(startKey, String(Date.now()));
}
function pauseTimeOnTask() {
  if (!activeTimerName) return;
  const startKey = timerKey(activeTimerName, "sessionStart");
  const totalKey = timerKey(activeTimerName, "totalMs");
  const start = getStoredNumber(startKey, 0);
  if (!start) return;
  const elapsed = Math.max(0, Date.now() - start);
  const total = getStoredNumber(totalKey, 0) + elapsed;
  localStorage.setItem(totalKey, String(total));
  localStorage.setItem(startKey, String(Date.now()));
}
function getTimeOnTaskMs(name) {
  const timerName = normalizeTimerName(name || activeTimerName || state.studentName || "Student");
  const total = getStoredNumber(timerKey(timerName, "totalMs"), 0);
  const start = getStoredNumber(timerKey(timerName, "sessionStart"), 0);
  return total + (start ? Math.max(0, Date.now() - start) : 0);
}
function formatTimeOnTask(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} hr ${mins} min`;
  }
  return minutes === 0 ? `${seconds} sec` : `${minutes} min ${seconds} sec`;
}
function updateTimeOnTaskDisplay() {
  const el = document.getElementById("certTimeOnTask");
  if (el) el.textContent = formatTimeOnTask(getTimeOnTaskMs(state.studentName));
}
window.addEventListener("beforeunload", pauseTimeOnTask);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") pauseTimeOnTask();
  if (document.visibilityState === "visible" && state.studentName) startTimeOnTask(state.studentName);
});
/* ---------- End time-on-task tracking patch ---------- */

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Business Law Final Exam Prep</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="app-shell">
    <header class="topbar">
      <div>
        <p class="eyebrow">Business Law 201</p>
        <h1>Final Exam Prep Lab</h1>
      </div>
      <button id="homeBtn" class="ghost-btn hidden" type="button">Dashboard</button>
    </header>

    <section id="progressPanel" class="progress-panel hidden" aria-label="Session progress">
      <div class="progress-copy">
        <strong id="progressLabel">0% complete</strong>
        <span id="readinessLabel">Distance to readiness: 80 points</span>
      </div>
      <div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
        <div id="progressFill" class="progress-fill"></div>
      </div>
      <p id="nearComplete" class="near-complete hidden">You are close. Finish the current activity and take the Readiness Challenge.</p>
    </section>

    <main>
      <section id="startScreen" class="card start-card">
        <div class="badge">Retrieval Practice</div>
        <h2>Prepare by practicing, not memorizing.</h2>
        <p>This tool uses short practice rounds, immediate feedback, correction, repetition, and a final readiness challenge.</p>
        <label for="studentName">Student name for certificate</label>
        <input id="studentName" type="text" placeholder="Enter your name" autocomplete="name" />
        <button id="startBtn" class="primary-btn" type="button">Start Practice</button>
        <p class="small-note">No actual exam questions are used. Practice items are based on key Business Law concepts.</p>
      </section>

      <section id="dashboard" class="hidden">
        <div class="dashboard-grid">
          <article class="card stat-card">
            <span class="stat-label">Attempts</span>
            <strong id="attemptsStat">0</strong>
          </article>
          <article class="card stat-card">
            <span class="stat-label">Best Challenge Score</span>
            <strong id="bestScoreStat">0%</strong>
          </article>
          <article class="card stat-card">
            <span class="stat-label">Terms Mastered</span>
            <strong id="masteredStat">0</strong>
          </article>
          <article class="card stat-card readiness-card">
            <span class="stat-label">Readiness Status</span>
            <strong id="readinessStat">Not Ready Yet</strong>
          </article>
        </div>

        <section class="card">
          <h2>Choose a Practice Mode</h2>
          <div class="mode-grid">
            <button class="mode-card" data-mode="flashcards" type="button">
              <span>01</span>
              <strong>Flashcards</strong>
              <small>Term, definition, example, common mistake</small>
            </button>
            <button class="mode-card" data-mode="matching" type="button">
              <span>02</span>
              <strong>Matching</strong>
              <small>Pair terms with plain-English definitions</small>
            </button>
            <button class="mode-card" data-mode="tf" type="button">
              <span>03</span>
              <strong>Misconception Checks</strong>
              <small>True or false with instant correction</small>
            </button>
            <button class="mode-card" data-mode="scenario" type="button">
              <span>04</span>
              <strong>Scenario Practice</strong>
              <small>Apply concepts to business situations</small>
            </button>
            <button class="mode-card challenge" data-mode="final" type="button">
              <span>05</span>
              <strong>Readiness Challenge</strong>
              <small>Score by category and print certificate</small>
            </button>
          </div>
        </section>

        <section class="card">
          <h2>Category Performance</h2>
          <div id="categoryBreakdown" class="category-grid"></div>
        </section>
      </section>

      <section id="activityScreen" class="card hidden">
        <div class="activity-header">
          <div>
            <p id="activityKicker" class="eyebrow">Practice</p>
            <h2 id="activityTitle">Activity</h2>
          </div>
          <p id="activityCounter" class="counter"></p>
        </div>
        <div id="activityContent"></div>
      </section>

      <section id="resultsScreen" class="card hidden">
        <h2>Readiness Challenge Results</h2>
        <p id="resultSummary"></p>
        <div id="resultBreakdown" class="category-grid"></div>
        <div class="result-actions">
          <button id="printCertBtn" class="primary-btn" type="button">Print Certificate</button>
          <button id="returnBtn" class="ghost-btn" type="button">Return to Dashboard</button>
        </div>
      </section>

      <section id="certificate" class="certificate hidden" aria-label="Certificate of completion">
        <div class="cert-inner">
          <p class="cert-kicker">Certificate of Business Law Readiness Practice</p>
          <h2 id="certName">Student Name</h2>
          <p>completed the Business Law Final Exam Prep Readiness Challenge.</p>
          <div class="cert-grid">
            <div><strong id="certScore">0%</strong><span>Best Score</span></div>
            <div><strong id="certAttempts">0</strong><span>Attempts</span></div>
            <div><strong id="certDate"></strong><span>Date</span></div>
          </div>
          <p class="cert-note">This certificate verifies practice completion. It does not reveal or reproduce exam questions.</p>
        </div>
      </section>
    </main>
  </div>

  <script src="terms.js"></script>
  <script src="script.js"></script>
</body>
</html>
