const state = {
  studentName: "",
  attempts: Number(localStorage.getItem("blAttempts") || 0),
  bestScore: Number(localStorage.getItem("blBestScore") || 0),
  mastered: JSON.parse(localStorage.getItem("blMastered") || "[]"),
  categoryStats: JSON.parse(localStorage.getItem("blCategoryStats") || "{}"),
  sessionProgress: 0,
  currentItems: [],
  currentIndex: 0,
  currentScore: 0,
  currentMode: "",
  finalResults: {}
};

const $ = (id) => document.getElementById(id);

function saveState() {
  localStorage.setItem("blAttempts", state.attempts);
  localStorage.setItem("blBestScore", state.bestScore);
  localStorage.setItem("blMastered", JSON.stringify(state.mastered));
  localStorage.setItem("blCategoryStats", JSON.stringify(state.categoryStats));
}

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function showOnly(id) {
  ["startScreen", "dashboard", "activityScreen", "resultsScreen", "certificate"].forEach(screen => {
    $(screen).classList.toggle("hidden", screen !== id);
  });
  $("homeBtn").classList.toggle("hidden", id === "startScreen" || id === "dashboard");
  $("progressPanel").classList.toggle("hidden", id === "startScreen");
}

function updateDashboard() {
  $("attemptsStat").textContent = state.attempts;
  $("bestScoreStat").textContent = `${state.bestScore}%`;
  $("masteredStat").textContent = state.mastered.length;
  $("readinessStat").textContent = state.bestScore >= 80 ? "Ready" : "Practice More";
  $("readinessStat").style.color = state.bestScore >= 80 ? "#2e7d32" : "#b7791f";
  renderCategoryBreakdown("categoryBreakdown", state.categoryStats);
  updateProgress(state.sessionProgress);
}

function updateProgress(value) {
  state.sessionProgress = Math.max(0, Math.min(100, value));
  $("progressFill").style.width = `${state.sessionProgress}%`;
  document.querySelector(".progress-track").setAttribute("aria-valuenow", state.sessionProgress);
  $("progressLabel").textContent = `${Math.round(state.sessionProgress)}% complete`;
  const distance = Math.max(0, 80 - state.bestScore);
  $("readinessLabel").textContent = distance === 0 ? "Readiness goal met: 80% or higher" : `Distance to readiness: ${distance} points`;
  $("nearComplete").classList.toggle("hidden", state.sessionProgress < 85);
}

function addCategoryResult(category, correct) {
  if (!state.categoryStats[category]) state.categoryStats[category] = { correct: 0, total: 0 };
  state.categoryStats[category].total += 1;
  if (correct) state.categoryStats[category].correct += 1;
  saveState();
}

function categoryPercent(stats) {
  if (!stats || !stats.total) return 0;
  return Math.round((stats.correct / stats.total) * 100);
}

function renderCategoryBreakdown(targetId, stats) {
  const categories = [...new Set(TERMS.map(t => t.category))];
  $(targetId).innerHTML = categories.map(cat => {
    const pct = categoryPercent(stats[cat]);
    const label = pct >= 80 ? "Strong" : pct >= 50 ? "Developing" : "Needs practice";
    return `
      <div class="category-card">
        <strong>${cat}</strong>
        <span>${label} · ${pct}%</span>
        <div class="meter"><span style="width:${pct}%"></span></div>
      </div>
    `;
  }).join("");
}

function startApp() {
  const name = $("studentName").value.trim();
  state.studentName = name || "Student";
  showOnly("dashboard");
  updateDashboard();
}

function openDashboard() {
  showOnly("dashboard");
  updateDashboard();
}

function setActivity(title, kicker, counter = "") {
  $("activityTitle").textContent = title;
  $("activityKicker").textContent = kicker;
  $("activityCounter").textContent = counter;
  $("activityContent").innerHTML = "";
  showOnly("activityScreen");
}

function startFlashcards() {
  state.currentMode = "flashcards";
  state.currentItems = shuffle(TERMS).slice(0, 12);
  state.currentIndex = 0;
  renderFlashcard();
}

function renderFlashcard(showBack = false) {
  const item = state.currentItems[state.currentIndex];
  setActivity("Flashcards", "Term → definition → example → common mistake", `${state.currentIndex + 1} of ${state.currentItems.length}`);
  updateProgress(Math.round((state.currentIndex / state.currentItems.length) * 100));
  $("activityContent").innerHTML = `
    <div class="flashcard">
      <h3 class="flash-term">${item.term}</h3>
      ${showBack ? `
        <div class="stack">
          <div class="callout"><strong>Definition:</strong> ${item.definition}</div>
          <div class="callout"><strong>Example:</strong> ${item.example}</div>
          <div class="callout"><strong>Common mistake:</strong> ${item.mistake}</div>
        </div>
        <div class="result-actions">
          <button class="primary-btn" id="knowBtn" type="button">I knew this</button>
          <button class="ghost-btn" id="reviewBtn" type="button">Review again</button>
        </div>
      ` : `
        <p>Try to explain this term out loud before revealing the answer.</p>
        <button class="primary-btn" id="revealBtn" type="button">Reveal</button>
      `}
    </div>
  `;
  if (!showBack) $("revealBtn").onclick = () => renderFlashcard(true);
  else {
    $("knowBtn").onclick = () => markFlashcard(item, true);
    $("reviewBtn").onclick = () => markFlashcard(item, false);
  }
}

function markFlashcard(item, knewIt) {
  if (knewIt && !state.mastered.includes(item.term)) state.mastered.push(item.term);
  addCategoryResult(item.category, knewIt);
  saveState();
  state.currentIndex++;
  if (state.currentIndex >= state.currentItems.length) {
    updateProgress(100);
    openDashboard();
  } else {
    renderFlashcard(false);
  }
}

function startMatching() {
  state.currentMode = "matching";
  const items = shuffle(TERMS).slice(0, 6);
  let selectedTerm = null;
  let selectedDef = null;
  let matched = new Set();
  setActivity("Matching", "Match each term to the correct definition", `0 of ${items.length}`);
  updateProgress(0);

  function render() {
    const termsHtml = items.map((item, idx) => `
      <button class="match-btn ${matched.has(item.term) ? "matched" : ""}" data-kind="term" data-index="${idx}" ${matched.has(item.term) ? "disabled" : ""}>${item.term}</button>
    `).join("");
    const defs = shuffle(items);
    const defsHtml = defs.map((item, idx) => `
      <button class="match-btn ${matched.has(item.term) ? "matched" : ""}" data-kind="def" data-term="${item.term}" ${matched.has(item.term) ? "disabled" : ""}>${item.definition}</button>
    `).join("");
    $("activityContent").innerHTML = `
      <div class="match-layout">
        <div><h3>Terms</h3><div class="match-list">${termsHtml}</div></div>
        <div><h3>Definitions</h3><div class="match-list">${defsHtml}</div></div>
      </div>
      <div id="matchFeedback" class="feedback hidden"></div>
    `;
    document.querySelectorAll(".match-btn").forEach(btn => btn.onclick = () => {
      if (btn.dataset.kind === "term") selectedTerm = items[Number(btn.dataset.index)];
      if (btn.dataset.kind === "def") selectedDef = btn.dataset.term;
      document.querySelectorAll(".match-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      if (selectedTerm && selectedDef) checkMatch();
    });
  }

  function checkMatch() {
    const correct = selectedTerm.term === selectedDef;
    addCategoryResult(selectedTerm.category, correct);
    const fb = $("matchFeedback");
    fb.className = `feedback ${correct ? "correct" : "incorrect"}`;
    fb.classList.remove("hidden");
    fb.innerHTML = correct
      ? `<strong>Correct.</strong> ${selectedTerm.term}: ${selectedTerm.definition}`
      : `<strong>Not yet.</strong> Recheck the definition for ${selectedTerm.term}. Common mistake: ${selectedTerm.mistake}`;
    if (correct) matched.add(selectedTerm.term);
    selectedTerm = null;
    selectedDef = null;
    $("activityCounter").textContent = `${matched.size} of ${items.length}`;
    updateProgress(Math.round((matched.size / items.length) * 100));
    if (matched.size === items.length) {
      setTimeout(openDashboard, 900);
    } else {
      setTimeout(render, 700);
    }
  }

  render();
}

function startTF() {
  state.currentMode = "tf";
  state.currentItems = shuffle(TERMS).slice(0, 10);
  state.currentIndex = 0;
  state.currentScore = 0;
  renderQuestion("tf");
}

function startScenario() {
  state.currentMode = "scenario";
  state.currentItems = shuffle(SCENARIOS).slice(0, 8);
  state.currentIndex = 0;
  state.currentScore = 0;
  renderQuestion("scenario");
}

function startFinal() {
  state.currentMode = "final";
  state.currentItems = shuffle([
    ...TERMS.slice().map(t => ({
      type: "tf",
      category: t.category,
      prompt: t.misconception,
      choices: ["True", "False"],
      answer: t.tfAnswer ? "True" : "False",
      feedback: `${t.term}: ${t.definition} Common mistake: ${t.mistake}`
    })),
    ...SCENARIOS.map(s => ({...s, type: "scenario"}))
  ]).slice(0, 20);
  state.currentIndex = 0;
  state.currentScore = 0;
  state.finalResults = {};
  state.attempts += 1;
  saveState();
  renderQuestion("final");
}

function renderQuestion(mode) {
  const item = state.currentItems[state.currentIndex];
  const title = mode === "tf" ? "Misconception Check" : mode === "scenario" ? "Scenario Practice" : "Readiness Challenge";
  const kicker = mode === "tf" ? "True or false" : mode === "scenario" ? "Apply the rule" : "Score counts toward certificate";
  setActivity(title, kicker, `${state.currentIndex + 1} of ${state.currentItems.length}`);
  updateProgress(Math.round((state.currentIndex / state.currentItems.length) * 100));
  const choices = mode === "tf" ? ["True", "False"] : shuffle(item.choices);
  $("activityContent").innerHTML = `
    <h3>${item.prompt}</h3>
    <div class="choice-grid">
      ${choices.map(choice => `<button class="choice-btn" data-choice="${choice}" type="button">${choice}</button>`).join("")}
    </div>
    <div id="questionFeedback" class="feedback hidden"></div>
  `;
  document.querySelectorAll(".choice-btn").forEach(btn => {
    btn.onclick = () => answerQuestion(btn.dataset.choice, item, mode);
  });
}

function answerQuestion(choice, item, mode) {
  const correct = choice === item.answer;
  if (correct) state.currentScore += 1;
  addCategoryResult(item.category, correct);
  if (mode === "final") {
    if (!state.finalResults[item.category]) state.finalResults[item.category] = { correct: 0, total: 0 };
    state.finalResults[item.category].total += 1;
    if (correct) state.finalResults[item.category].correct += 1;
  }
  document.querySelectorAll(".choice-btn").forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.choice === item.answer) btn.classList.add("correct-choice");
    if (btn.dataset.choice === choice && !correct) btn.classList.add("wrong-choice");
  });
  const fb = $("questionFeedback");
  fb.className = `feedback ${correct ? "correct" : "incorrect"}`;
  fb.classList.remove("hidden");
  fb.innerHTML = correct
    ? `<strong>Correct.</strong> ${item.feedback}`
    : `<strong>Correction:</strong> The better answer is <strong>${item.answer}</strong>. ${item.feedback}`;
  const nextText = state.currentIndex + 1 >= state.currentItems.length ? "Finish" : "Next";
  fb.innerHTML += `<div class="result-actions"><button id="nextQuestionBtn" class="primary-btn" type="button">${nextText}</button></div>`;
  $("nextQuestionBtn").onclick = () => {
    state.currentIndex += 1;
    if (state.currentIndex >= state.currentItems.length) finishMode(mode);
    else renderQuestion(mode);
  };
}

function finishMode(mode) {
  updateProgress(100);
  if (mode === "final") {
    const score = Math.round((state.currentScore / state.currentItems.length) * 100);
    if (score > state.bestScore) state.bestScore = score;
    saveState();
    showResults(score);
  } else {
    openDashboard();
  }
}

function showResults(score) {
  showOnly("resultsScreen");
  $("resultSummary").innerHTML = score >= 80
    ? `<strong>${score}%.</strong> You met the 80% readiness target. Keep reviewing weak categories before the actual exam.`
    : `<strong>${score}%.</strong> You are not at the 80% readiness target yet. Use the weak-area breakdown below to choose the next practice mode.`;
  renderCategoryBreakdown("resultBreakdown", state.finalResults);
  updateDashboard();
  $("certName").textContent = state.studentName || "Student";
  $("certScore").textContent = `${state.bestScore}%`;
  $("certAttempts").textContent = state.attempts;
  $("certDate").textContent = new Date().toLocaleDateString();
}

function printCertificate() {
  $("certificate").classList.remove("hidden");
  window.print();
}

function bindEvents() {
  $("startBtn").onclick = startApp;
  $("homeBtn").onclick = openDashboard;
  $("returnBtn").onclick = openDashboard;
  $("printCertBtn").onclick = printCertificate;
  document.querySelectorAll(".mode-card").forEach(btn => {
    btn.onclick = () => {
      const mode = btn.dataset.mode;
      if (mode === "flashcards") startFlashcards();
      if (mode === "matching") startMatching();
      if (mode === "tf") startTF();
      if (mode === "scenario") startScenario();
      if (mode === "final") startFinal();
    };
  });
}

bindEvents();
updateDashboard();
