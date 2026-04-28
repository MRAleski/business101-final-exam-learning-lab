
const state = {
  mode: null,
  pool: [],
  index: 0,
  score: 0,
  attempts: Number(localStorage.getItem('attemptCount') || 0),
  mastered: JSON.parse(localStorage.getItem('masteredTerms') || '[]'),
  best: Number(localStorage.getItem('bestScore') || 0),
  currentAnswer: null,
  matchPairs: []
};

function shuffle(arr){ return [...arr].sort(() => Math.random() - 0.5); }
function sample(arr,n){ return shuffle(arr).slice(0,n); }

function showScreen(id){
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if(id==='dashboard') updateDashboard();
  if(id==='study') renderStudyBank();
  if(id==='certificate') renderCertificate();
  window.scrollTo({top:0,behavior:'smooth'});
}

function updateDashboard(){
  document.getElementById('masteryCount').textContent = state.mastered.length;
  document.getElementById('attemptCount').textContent = state.attempts;
  document.getElementById('bestScore').textContent = state.best + '%';
}

function saveStats(){
  localStorage.setItem('attemptCount', state.attempts);
  localStorage.setItem('masteredTerms', JSON.stringify(state.mastered));
  localStorage.setItem('bestScore', state.best);
}

function updateProgress(){
  const pct = state.pool.length ? Math.round((state.index / state.pool.length) * 100) : 0;
  document.getElementById('progressBar').style.width = pct + '%';
}

function categories(){
  return ['All Categories', ...Array.from(new Set(TERMS.map(t=>t.category))).sort()];
}

function setupCategoryFilter(){
  const select = document.getElementById('categoryFilter');
  select.innerHTML = categories().map(c => `<option>${c}</option>`).join('');
}

function renderStudyBank(){
  setupCategoryFilter();
  const q = (document.getElementById('searchBox').value || '').toLowerCase();
  const cat = document.getElementById('categoryFilter').value || 'All Categories';
  const list = TERMS.filter(t => {
    const text = `${t.term} ${t.definition} ${t.category} ${t.trap} ${t.example}`.toLowerCase();
    return (cat === 'All Categories' || t.category === cat) && text.includes(q);
  });
  document.getElementById('studyList').innerHTML = list.map(t => `
    <div class="study-item">
      <small>${t.category}</small>
      <h3>${t.term}</h3>
      <p>${t.definition}</p>
      <p><strong>Common trap:</strong> ${t.trap}</p>
      <p><strong>Example:</strong> ${t.example}</p>
    </div>
  `).join('');
}

function begin(mode, count=12){
  state.mode = mode;
  state.pool = sample(TERMS, Math.min(count, TERMS.length));
  state.index = 0;
  state.score = 0;
  state.attempts += 1;
  saveStats();
  showScreen('activity');
  updateProgress();
}

function startFlashcards(){
  begin('flashcards', 18);
  renderFlashcard(false);
}

function renderFlashcard(show=false){
  updateProgress();
  if(state.index >= state.pool.length){ return finishActivity('Flashcard Round Complete'); }
  const t = state.pool[state.index];
  document.getElementById('activityContent').innerHTML = `
    <span class="term-badge">${t.category}</span>
    <h2 class="big-term">${t.term}</h2>
    ${show ? `<div class="feedback"><p><strong>Definition:</strong> ${t.definition}</p><p><strong>Common trap:</strong> ${t.trap}</p><p><strong>Example:</strong> ${t.example}</p></div>` : `<p class="muted">Try to explain this term out loud before you reveal the answer.</p>`}
    <div class="card-actions">
      <button class="secondary" onclick="renderFlashcard(true)">Reveal</button>
      <button class="primary" onclick="markKnown()">I Know This</button>
      <button onclick="nextCard()" class="ghost">Keep Practicing</button>
    </div>
  `;
}

function markKnown(){
  const term = state.pool[state.index].term;
  if(!state.mastered.includes(term)) state.mastered.push(term);
  saveStats();
  nextCard();
}
function nextCard(){ state.index++; renderFlashcard(false); }

function makeQuestion(t){
  const wrong = sample(TERMS.filter(x=>x.term!==t.term),3).map(x=>x.definition);
  return shuffle([t.definition, ...wrong]);
}

function startTrueFalse(){
  begin('truefalse', 12);
  renderTrueFalse();
}

function renderTrueFalse(){
  updateProgress();
  if(state.index >= state.pool.length){ return finishActivity('True or False Complete'); }
  const t = state.pool[state.index];
  const useCorrect = Math.random() > .45;
  const shown = useCorrect ? t.definition : sample(TERMS.filter(x=>x.term!==t.term),1)[0].definition;
  state.currentAnswer = useCorrect;
  document.getElementById('activityContent').innerHTML = `
    <span class="term-badge">${t.category}</span>
    <h2>${t.term}</h2>
    <p class="big-statement">${shown}</p>
    <div class="answer-grid">
      <button class="answer-btn" onclick="checkTF(true)">True</button>
      <button class="answer-btn" onclick="checkTF(false)">False</button>
    </div>
    <div id="feedback"></div>
  `;
}

function checkTF(ans){
  const t = state.pool[state.index];
  const ok = ans === state.currentAnswer;
  if(ok) state.score++;
  document.getElementById('feedback').innerHTML = `<div class="feedback"><strong>${ok ? 'Correct.' : 'Not quite.'}</strong><p>${t.definition}</p><p><strong>Watch for:</strong> ${t.trap}</p><button class="primary" onclick="state.index++; renderTrueFalse()">Next</button></div>`;
}

function startScenario(){
  begin('scenario', 12);
  renderScenario();
}

function renderScenario(){
  updateProgress();
  if(state.index >= state.pool.length){ return finishActivity('Scenario Practice Complete'); }
  const t = state.pool[state.index];
  const options = shuffle([t.term, ...sample(TERMS.filter(x=>x.term!==t.term && x.category===t.category),3).map(x=>x.term)]);
  while(options.length < 4) options.push(sample(TERMS.filter(x=>!options.includes(x.term)),1)[0].term);
  state.currentAnswer = t.term;
  document.getElementById('activityContent').innerHTML = `
    <span class="term-badge">${t.category}</span>
    <h2>Which concept fits this situation?</h2>
    <p class="scenario">${t.example}</p>
    <div class="answer-grid">${shuffle(options).map(o=>`<button class="answer-btn" onclick="checkChoice(this,'${escapeQuote(o)}')">${o}</button>`).join('')}</div>
    <div id="feedback"></div>
  `;
}

function escapeQuote(s){ return s.replace(/'/g,"\\'"); }

function startChallenge(){
  begin('challenge', 20);
  renderMultipleChoice();
}

function renderMultipleChoice(){
  updateProgress();
  if(state.index >= state.pool.length){ return finishChallenge(); }
  const t = state.pool[state.index];
  const answers = makeQuestion(t);
  state.currentAnswer = t.definition;
  document.getElementById('activityContent').innerHTML = `
    <span class="term-badge">${t.category}</span>
    <h2 class="big-term">${t.term}</h2>
    <p>Choose the best definition.</p>
    <div class="answer-grid">${answers.map(a=>`<button class="answer-btn" onclick="checkChoice(this,'${escapeQuote(a)}')">${a}</button>`).join('')}</div>
    <div id="feedback"></div>
  `;
}

function checkChoice(btn, choice){
  const t = state.pool[state.index];
  const ok = choice === state.currentAnswer;
  [...document.querySelectorAll('.answer-btn')].forEach(b=>b.disabled=true);
  btn.classList.add(ok ? 'correct' : 'wrong');
  if(ok) state.score++;
  const nextFn = state.mode === 'scenario' ? 'renderScenario()' : 'renderMultipleChoice()';
  document.getElementById('feedback').innerHTML = `<div class="feedback">
    <strong>${ok ? 'Correct.' : 'Not quite.'}</strong>
    <p><strong>${t.term}:</strong> ${t.definition}</p>
    <p><strong>Common trap:</strong> ${t.trap}</p>
    <button class="primary" onclick="state.index++; ${nextFn}">Next</button>
  </div>`;
}

function startMatch(){
  begin('match', 8);
  state.matchPairs = state.pool;
  renderMatch();
}

function renderMatch(){
  updateProgress();
  const terms = shuffle(state.matchPairs);
  const defs = shuffle(state.matchPairs);
  document.getElementById('activityContent').innerHTML = `
    <h2>Matching Round</h2>
    <p>Tap a term, then tap the matching definition. On a computer, you can also use this as drag-and-drop practice by reading across both columns.</p>
    <div class="match-wrap">
      <div>${terms.map(t=>`<div class="match-item" data-term="${t.term}" onclick="selectMatchTerm(this)"><strong>${t.term}</strong><br><small>${t.category}</small></div>`).join('')}</div>
      <div>${defs.map(t=>`<div class="drop-zone" data-answer="${t.term}" onclick="selectMatchDef(this)">${t.definition}</div>`).join('')}</div>
    </div>
    <div id="feedback"></div>
  `;
}
let selectedMatch = null;
function selectMatchTerm(el){
  document.querySelectorAll('.match-item').forEach(x=>x.style.outline='none');
  selectedMatch = el.dataset.term;
  el.style.outline='3px solid var(--gold)';
}
function selectMatchDef(el){
  if(!selectedMatch) return;
  if(el.dataset.answer === selectedMatch){
    el.classList.add('filled');
    el.innerHTML = `✅ ${el.innerHTML}<br><strong>${selectedMatch}</strong>`;
    document.querySelector(`[data-term="${CSS.escape(selectedMatch)}"]`).style.visibility='hidden';
    state.score++;
  } else {
    el.style.borderColor = 'var(--danger)';
    setTimeout(()=> el.style.borderColor = '#cbd5e1', 500);
  }
  selectedMatch = null;
  const remaining = [...document.querySelectorAll('.match-item')].filter(x=>x.style.visibility!=='hidden').length;
  if(remaining===0){
    document.getElementById('feedback').innerHTML = `<div class="feedback"><strong>Matching complete.</strong><p>You matched ${state.score} items. Revisit any terms that felt slow or uncertain.</p><button class="primary" onclick="finishActivity('Matching Round Complete')">Finish</button></div>`;
  }
}

function finishActivity(title){
  updateProgress();
  document.getElementById('progressBar').style.width = '100%';
  document.getElementById('activityContent').innerHTML = `
    <h2>${title}</h2>
    <p>You completed this practice round. Repetition is where the learning sticks.</p>
    <div class="card-actions">
      <button class="primary" onclick="showScreen('dashboard')">Return to Dashboard</button>
      <button class="secondary" onclick="startChallenge()">Try Final Readiness Challenge</button>
    </div>
  `;
  saveStats();
}

function finishChallenge(){
  document.getElementById('progressBar').style.width = '100%';
  const pct = Math.round((state.score/state.pool.length)*100);
  if(pct > state.best) state.best = pct;
  saveStats();
  let msg = pct >= 85 ? 'Strong readiness. Keep reviewing traps and examples.' : pct >= 70 ? 'Solid progress. Repeat weak categories before the final.' : 'Keep practicing. Use flashcards first, then retry the challenge.';
  document.getElementById('activityContent').innerHTML = `
    <h2>Final Readiness Challenge Complete</h2>
    <p class="big-term">${pct}%</p>
    <p>${msg}</p>
    <div class="card-actions">
      <button class="primary" onclick="showScreen('certificate')">Print Certificate</button>
      <button class="secondary" onclick="startChallenge()">Retake Challenge</button>
      <button class="ghost" onclick="showScreen('dashboard')">Dashboard</button>
    </div>
  `;
}

function renderCertificate(){
  document.getElementById('certDate').textContent = new Date().toLocaleDateString();
  document.getElementById('certScore').textContent = (localStorage.getItem('bestScore') || 0) + '%';
}

setupCategoryFilter();
updateDashboard();
renderStudyBank();
