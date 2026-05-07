
const STORAGE_KEY = 'busn101LearningLab_v3';
const INSTRUCTOR_PASSCODE = 'BUSN101';
const DATA_RETENTION_DAYS = 48;
const READINESS_GOAL = 80;

let state = loadState();
let selectedMatch = null;

function defaultState(){return {studentName:'',attempts:0,bestScore:0,mastered:[],history:[],categoryStats:{},moduleStats:{},lastCleaned:Date.now()};}
function loadState(){
  try{const raw=localStorage.getItem(STORAGE_KEY); const parsed=raw?JSON.parse(raw):defaultState(); return cleanOldData(parsed);}catch(e){return defaultState();}
}
function saveState(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}
function cleanOldData(s){
  const cutoff=Date.now()-DATA_RETENTION_DAYS*24*60*60*1000;
  s.history=(s.history||[]).filter(x=>x.time>=cutoff);
  s.lastCleaned=Date.now();
  localStorage.setItem(STORAGE_KEY,JSON.stringify(s));
  return s;
}
function showScreen(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById(id).classList.add('active');if(id==='dashboard')refreshDashboard();if(id==='study')renderStudyBank();if(id==='certificate')renderCertificate();window.scrollTo({top:0,behavior:'smooth'});}
function modules(){return ['All Modules',...Array.from(new Set(TERMS.map(t=>t.module))).sort()];}
function currentModule(){return document.getElementById('moduleSelect')?.value || 'All Modules';}
function filteredTerms(module=currentModule()){return module==='All Modules'?TERMS:TERMS.filter(t=>t.module===module);}

/* Version 3: Module-aware certificate helpers */
function getTermModule(t){
  return (t && (t.module || t.moduleName || t.chapter || t.section || t.category)) || 'General Review';
}

function getTermCategory(t){
  return (t && (t.category || t.module || t.chapter || t.section)) || 'General Review';
}

function recordModulePracticeFromTerm(t){
  const moduleName = getTermModule(t);
  let modules = [];
  try {
    modules = JSON.parse(localStorage.getItem('modulesPracticed') || '[]');
  } catch(e) {
    modules = [];
  }
  if(moduleName && !modules.includes(moduleName)){
    modules.push(moduleName);
    localStorage.setItem('modulesPracticed', JSON.stringify(modules));
  }
}

function recordCategoryPerformanceV3(t, ok){
  const cat = getTermCategory(t);
  let perf = {};
  try {
    perf = JSON.parse(localStorage.getItem('categoryPerformanceV3') || '{}');
  } catch(e) {
    perf = {};
  }
  if(!perf[cat]){
    perf[cat] = {correct:0, total:0};
  }
  perf[cat].total += 1;
  if(ok){
    perf[cat].correct += 1;
  }
  localStorage.setItem('categoryPerformanceV3', JSON.stringify(perf));
}

function getModulesPracticedLabel(){
  let modules = [];
  try {
    modules = JSON.parse(localStorage.getItem('modulesPracticed') || '[]');
  } catch(e) {
    modules = [];
  }
  if(!modules.length){
    return 'Not recorded';
  }
  if(modules.length <= 4){
    return modules.join(', ');
  }
  return modules.slice(0,4).join(', ') + ` + ${modules.length - 4} more`;
}

function getWeakAreaLabel(){
  let perf = {};
  try {
    perf = JSON.parse(localStorage.getItem('categoryPerformanceV3') || '{}');
  } catch(e) {
    perf = {};
  }
  const entries = Object.entries(perf).filter(([cat, data]) => data && data.total > 0);
  if(!entries.length){
    return 'Not recorded';
  }
  entries.sort((a,b) => {
    const ap = a[1].correct / a[1].total;
    const bp = b[1].correct / b[1].total;
    if(ap === bp) return b[1].total - a[1].total;
    return ap - bp;
  });
  const [cat, data] = entries[0];
  const pct = Math.round((data.correct / data.total) * 100);
  return `${cat} (${pct}%)`;
}

function shuffle(a){return [...a].sort(()=>Math.random()-.5);}function sample(a,n){return shuffle(a).slice(0,Math.min(n,a.length));}
function saveNameAndStart(){const name=document.getElementById('studentNameInput').value.trim();if(name)state.studentName=name;saveState();showScreen('dashboard');}
function skipName(){showScreen('dashboard');}
function initSelectors(){const opts=modules().map(m=>`<option>${m}</option>`).join('');document.getElementById('moduleSelect').innerHTML=opts;document.getElementById('studyModuleFilter').innerHTML=opts;}
function refreshDashboard(){
  document.getElementById('welcomeText').textContent=state.studentName?`Welcome, ${state.studentName}`:'Dashboard';
  document.getElementById('attemptCount').textContent=state.attempts||0;
  document.getElementById('bestScore').textContent=(state.bestScore||0)+'%';
  document.getElementById('masteryCount').textContent=(state.mastered||[]).length;
  document.getElementById('recommendedStep').textContent=recommendNextStep();
  renderCategoryPerformance();
}
function getWeakCategories(limit=3){
  const entries=Object.entries(state.categoryStats||{}).map(([cat,d])=>({cat,total:d.total||0,correct:d.correct||0,pct:d.total?Math.round(d.correct/d.total*100):0})).filter(x=>x.total>0);
  return entries.sort((a,b)=>a.pct-b.pct || b.total-a.total).slice(0,limit);
}
function recommendNextStep(){
  const weak=getWeakCategories(3);
  if(!state.attempts) return 'Recommended Next Step: Start with Flashcards, then complete one Final Readiness Challenge.';
  if(weak.length && weak[0].pct<70) return `Recommended Next Step: Practice ${weak.map(w=>w.cat).join(', ')} using Weak-Area Matching and Scenarios.`;
  if((state.bestScore||0)<READINESS_GOAL) return `Recommended Next Step: Retake the Final Readiness Challenge. You are ${READINESS_GOAL-(state.bestScore||0)} percentage points from 80% readiness.`;
  return 'Recommended Next Step: Maintain readiness by reviewing common mistakes and retaking one weak-area round.';
}
function renderCategoryPerformance(){
  const holder=document.getElementById('categoryPerformance');
  const stats=Object.entries(state.categoryStats||{});
  if(!stats.length){holder.innerHTML='<h2>Category Performance</h2><p class="muted">No performance data yet. Complete a practice activity to see strong and weak areas.</p>';return;}
  holder.innerHTML='<h2>Category Performance</h2><div class="category-results">'+stats.sort().map(([cat,d])=>{const pct=d.total?Math.round(d.correct/d.total*100):0; const label=pct>=85?'Strong':pct>=70?'Developing':'Needs Practice';return `<div class="category-result"><strong>${cat}</strong>: ${pct}% (${label})<div class="meter"><span style="width:${pct}%"></span></div></div>`;}).join('')+'</div>';
}
function updateProgress(i,total){const pct=total?Math.round(i/total*100):0;document.getElementById('progressBar').style.width=pct+'%';document.getElementById('progressText').textContent=pct+'%';}
function record(term, ok, mode){
  const cat=term.category, mod=term.module;
  state.categoryStats[cat]=state.categoryStats[cat]||{correct:0,total:0}; state.categoryStats[cat].total++; if(ok)state.categoryStats[cat].correct++;
  state.moduleStats[mod]=state.moduleStats[mod]||{correct:0,total:0}; state.moduleStats[mod].total++; if(ok)state.moduleStats[mod].correct++;
  state.history.push({time:Date.now(),mode,term:term.term,category:cat,module:mod,correct:!!ok}); saveState();
}
function adaptivePool(count,module=currentModule(),weakBias=true){
  const base=filteredTerms(module); const weak=getWeakCategories(3).map(w=>w.cat);
  let weighted=[]; base.forEach(t=>{let weight=1;if(weakBias&&weak.includes(t.category))weight+=3;if(!(state.mastered||[]).includes(t.id))weight+=1;for(let i=0;i<weight;i++)weighted.push(t);});
  return sample(weighted.length?weighted:base,count);
}
let activity={mode:'',pool:[],index:0,score:0,round:1,totalRounds:1,current:null};

function recordModulesForCurrentPoolV3(){
  if(!state || !state.pool) return;
  state.pool.forEach(t => recordModulePracticeFromTerm(t));
}

function begin(mode,pool){activity={mode,pool,index:0,score:0,round:1,totalRounds:1,current:null};state.attempts++;saveState();showScreen('activity');}
function startFlashcards(){begin('flashcards',adaptivePool(18));renderFlashcard(false);}
function renderFlashcard(show){updateProgress(activity.index,activity.pool.length);if(activity.index>=activity.pool.length)return finishBasic('Flashcard Round Complete');const t=activity.pool[activity.index];document.getElementById('activityContent').innerHTML=`<span class="term-badge">${t.category}</span><span class="module-badge">${t.module}</span><h2 class="big-term">${t.term}</h2>${show?`<div class="feedback"><p><strong>Definition:</strong> ${t.definition}</p><p><strong>Example:</strong> ${t.example}</p><p><strong>Common mistake:</strong> ${t.trap}</p></div>`:'<p class="muted">Explain the term in your own words before revealing the answer.</p>'}<div class="card-actions"><button class="secondary" onclick="renderFlashcard(true)">Reveal</button><button class="primary" onclick="markKnown()">I Know This</button><button class="ghost" onclick="activity.index++;renderFlashcard(false)">Keep Practicing</button></div>`;}
function markKnown(){const id=activity.pool[activity.index].id;if(!state.mastered.includes(id))state.mastered.push(id);saveState();activity.index++;renderFlashcard(false);}
function startTrueFalse(){begin('truefalse',adaptivePool(12));renderTF();}
function renderTF(){updateProgress(activity.index,activity.pool.length);if(activity.index>=activity.pool.length)return finishBasic('Misconception Check Complete');const t=activity.pool[activity.index];const correct=Math.random()>.5;const statement=correct?`${t.term}: ${t.definition}`:t.misconception;activity.current={term:t,answer:correct};document.getElementById('activityContent').innerHTML=`<span class="term-badge">${t.category}</span><span class="module-badge">${t.module}</span><h2>True or False?</h2><p class="big-statement">${statement}</p><div class="answer-grid"><button class="answer-btn" onclick="checkTF(true,this)">True</button><button class="answer-btn" onclick="checkTF(false,this)">False</button></div><div id="feedback"></div>`;}
function checkTF(ans,btn){const {term,answer}=activity.current;const ok=ans===answer;record(term,ok,'truefalse');if(ok)activity.score++;btn.classList.add(ok?'correct':'wrong');document.getElementById('feedback').innerHTML=`<div class="feedback"><strong>${ok?'Correct.':'Not quite.'}</strong><p>${term.definition}</p><p><strong>Exam trap:</strong> ${term.trap}</p><button class="primary" onclick="activity.index++;renderTF()">Next</button></div>`;}
function startScenario(){begin('scenario',adaptivePool(12));renderScenario();}
function renderScenario(){updateProgress(activity.index,activity.pool.length);if(activity.index>=activity.pool.length)return finishBasic('Scenario Practice Complete');const t=activity.pool[activity.index];let options=[t.term,...sample(TERMS.filter(x=>x.id!==t.id&&x.category===t.category),3).map(x=>x.term)];while(options.length<4)options.push(sample(TERMS.filter(x=>!options.includes(x.term)),1)[0].term);activity.current={term:t,answer:t.term};document.getElementById('activityContent').innerHTML=`<span class="term-badge">${t.category}</span><span class="module-badge">${t.module}</span><h2>Which concept fits?</h2><p>${t.example}</p><div class="answer-grid">${shuffle(options).map(o=>`<button class="answer-btn" onclick="checkChoice('${esc(o)}',this,'scenario')">${o}</button>`).join('')}</div><div id="feedback"></div>`;}
function startChallenge(){begin('challenge',adaptivePool(24,'All Modules',true));renderChallenge();}
function renderChallenge(){updateProgress(activity.index,activity.pool.length);if(activity.index>=activity.pool.length)return finishChallenge();const t=activity.pool[activity.index];const defs=[t.definition,...sample(TERMS.filter(x=>x.id!==t.id),3).map(x=>x.definition)];activity.current={term:t,answer:t.definition};const goal=Math.ceil(.8*activity.pool.length);const away=Math.max(0,goal-activity.score);document.getElementById('activityContent').innerHTML=`<div class="goal-box"><strong>Readiness Goal:</strong> ${activity.score}/${activity.pool.length} correct. You are ${away} correct answer${away===1?'':'s'} away from 80% readiness.</div><span class="term-badge">${t.category}</span><span class="module-badge">${t.module}</span><h2 class="big-term">${t.term}</h2><p>Choose the best definition.</p><div class="answer-grid">${shuffle(defs).map(d=>`<button class="answer-btn" onclick="checkChoice('${esc(d)}',this,'challenge')">${d}</button>`).join('')}</div><div id="feedback"></div>`;}
function esc(s){return String(s).replace(/'/g,"&#39;").replace(/"/g,'&quot;');}
function checkChoice(choice,btn,mode){const {term,answer}=activity.current;const ok=choice===answer;record(term,ok,mode);if(ok)activity.score++;document.querySelectorAll('.answer-btn').forEach(b=>b.disabled=true);btn.classList.add(ok?'correct':'wrong');const next=mode==='scenario'?'renderScenario()':'renderChallenge()';document.getElementById('feedback').innerHTML=`<div class="feedback"><strong>${ok?'Correct.':'Not quite.'}</strong><p><strong>${term.term}:</strong> ${term.definition}</p><p><strong>Exam trap:</strong> ${term.trap}</p><button class="primary" onclick="activity.index++;${next}">Next</button></div>`;}
function startMatch(weakOnly){activity={mode:'matching',pool:weakOnly?adaptivePool(24,currentModule(),true):sample(filteredTerms(),24),index:0,score:0,round:1,totalRounds:3,current:null};state.attempts++;saveState();showScreen('activity');renderMatchRound();}
function renderMatchRound(){const size=[6,8,10][activity.round-1];const roundTerms=activity.pool.slice(activity.index,activity.index+size);if(!roundTerms.length||activity.round>3)return finishBasic('Matching Practice Complete');updateProgress(activity.round-1,3);const defs=shuffle(roundTerms);document.getElementById('activityContent').innerHTML=`<h2>Matching Round ${activity.round} of 3</h2><p class="muted">Tap a term, then tap the matching definition. Rounds increase from 6 to 8 to 10 items.</p><div class="match-wrap"><div>${shuffle(roundTerms).map(t=>`<div class="match-item" data-id="${t.id}" onclick="selectMatchTerm(this)"><strong>${t.term}</strong><br><small>${t.category}</small></div>`).join('')}</div><div>${defs.map(t=>`<div class="drop-zone" data-id="${t.id}" onclick="selectMatchDef(this)">${t.definition}</div>`).join('')}</div></div><div id="feedback"></div>`;}
function selectMatchTerm(el){document.querySelectorAll('.match-item').forEach(x=>x.style.outline='none');selectedMatch=el.dataset.id;el.style.outline='3px solid var(--gold)';}
function selectMatchDef(el){if(!selectedMatch)return;const term=TERMS.find(t=>t.id===selectedMatch);const ok=el.dataset.id===selectedMatch;record(term,ok,'matching');if(ok){activity.score++;el.classList.add('filled');el.innerHTML='✅ '+el.innerHTML+`<br><strong>${term.term}</strong>`;document.querySelector(`.match-item[data-id="${selectedMatch}"]`).style.visibility='hidden';}else{el.style.borderColor='var(--danger)';setTimeout(()=>el.style.borderColor='#cbd5e1',500);}selectedMatch=null;const remaining=[...document.querySelectorAll('.match-item')].filter(x=>x.style.visibility!=='hidden').length;if(!remaining){activity.index += [6,8,10][activity.round-1];activity.round++;document.getElementById('feedback').innerHTML=`<div class="feedback"><strong>Round complete.</strong><button class="primary" onclick="renderMatchRound()">Continue</button></div>`;}}
function finishBasic(title){document.getElementById('progressBar').style.width='100%';document.getElementById('progressText').textContent='100%';document.getElementById('activityContent').innerHTML=`<h2>${title}</h2><p>You completed this practice round. Review your recommended next step on the dashboard.</p><div class="card-actions"><button class="primary" onclick="showScreen('dashboard')">Dashboard</button><button class="secondary" onclick="startChallenge()">Final Readiness Challenge</button></div>`;}
function finishChallenge(){const pct=Math.round(activity.score/activity.pool.length*100);if(pct>state.bestScore)state.bestScore=pct;saveState();document.getElementById('progressBar').style.width='100%';document.getElementById('progressText').textContent='100%';document.getElementById('activityContent').innerHTML=`<h2>Final Readiness Challenge Complete</h2><p class="big-term">${pct}%</p><p>${pct>=85?'Strong readiness. Keep reviewing traps.':pct>=70?'Developing readiness. Repeat weak areas.':'Needs practice. Start with weak-area matching.'}</p>${challengeBreakdown()}<div class="card-actions"><button class="primary" onclick="showScreen('certificate')">Print Certificate</button><button class="secondary" onclick="startChallenge()">Retake Challenge</button><button class="ghost" onclick="showScreen('dashboard')">Dashboard</button></div>`;}
function challengeBreakdown(){const weak=getWeakCategories(3);return weak.length?`<div class="feedback"><strong>Weak areas to revisit:</strong><p>${weak.map(w=>`${w.cat} (${w.pct}%)`).join(', ')}</p></div>`:'';}
function renderStudyBank(){const sel=document.getElementById('studyModuleFilter'); if(!sel.innerHTML)sel.innerHTML=modules().map(m=>`<option>${m}</option>`).join('');const q=(document.getElementById('searchBox').value||'').toLowerCase();const mod=sel.value||'All Modules';const list=filteredTerms(mod).filter(t=>`${t.term} ${t.definition} ${t.example} ${t.trap} ${t.module} ${t.category}`.toLowerCase().includes(q));document.getElementById('studyList').innerHTML=list.map(t=>`<div class="study-item"><small>${t.module} • ${t.category}</small><h3>${t.term}</h3><p>${t.definition}</p><p><strong>Example:</strong> ${t.example}</p><p><strong>Common mistake:</strong> ${t.trap}</p></div>`).join('');}
function renderCertificate(){document.getElementById('studentName').value=state.studentName||'';document.getElementById('certDate').textContent=new Date().toLocaleDateString();document.getElementById('certScore').textContent=(state.bestScore||0)+'%';document.getElementById('certAttempts').textContent=state.attempts||0;const weak=getWeakCategories(3);document.getElementById('certWeakAreas').textContent=weak.length?`Recommended review areas: ${weak.map(w=>w.cat).join(', ')}.`:'';}
function saveCertificateName(){const n=document.getElementById('studentName').value.trim();if(n)state.studentName=n;saveState();}
function unlockInstructor(){if(document.getElementById('instructorPass').value!==INSTRUCTOR_PASSCODE){document.getElementById('instructorReport').innerHTML='<div class="panel"><p>Incorrect passcode.</p></div>';return;}renderInstructorReport();}
function renderInstructorReport(){const rows=Object.entries(state.categoryStats||{}).sort().map(([cat,d])=>{const pct=d.total?Math.round(d.correct/d.total*100):0;return `<tr><td>${cat}</td><td>${d.correct}</td><td>${d.total}</td><td>${pct}%</td><td>${pct>=85?'Strong':pct>=70?'Developing':'Needs Practice'}</td></tr>`;}).join('');const recent=(state.history||[]).slice(-25).reverse().map(h=>`<tr><td>${new Date(h.time).toLocaleString()}</td><td>${h.mode}</td><td>${h.module}</td><td>${h.category}</td><td>${h.correct?'Correct':'Missed'}</td></tr>`).join('');document.getElementById('instructorReport').innerHTML=`<div class="panel"><h2>Local Instructor Summary</h2><p><strong>Student name on this device:</strong> ${state.studentName||'Not entered'}</p><p><strong>Attempts:</strong> ${state.attempts||0} | <strong>Best Score:</strong> ${state.bestScore||0}% | <strong>Data retention:</strong> ${DATA_RETENTION_DAYS} days</p><button class="secondary" onclick="downloadInstructorReport()">Download CSV Report</button></div><div class="panel"><h3>Category Trends</h3><table class="report-table"><tr><th>Category</th><th>Correct</th><th>Total</th><th>Score</th><th>Status</th></tr>${rows||'<tr><td colspan="5">No data yet.</td></tr>'}</table></div><div class="panel"><h3>Recent Practice Events</h3><table class="report-table"><tr><th>Time</th><th>Mode</th><th>Module</th><th>Category</th><th>Result</th></tr>${recent||'<tr><td colspan="5">No practice events yet.</td></tr>'}</table></div>`;}
function downloadInstructorReport(){let csv='time,student,mode,module,category,term,correct\n';(state.history||[]).forEach(h=>{csv+=`"${new Date(h.time).toISOString()}","${state.studentName||''}","${h.mode}","${h.module}","${h.category}","${h.term}","${h.correct}"\n`;});const blob=new Blob([csv],{type:'text/csv'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='business101-learning-lab-local-report.csv';a.click();}
function clearMyDataConfirm(){if(confirm('Clear saved practice data on this device?')){localStorage.removeItem(STORAGE_KEY);state=defaultState();refreshDashboard();}}
initSelectors();refreshDashboard();


function renderCertificateV3Enhancement(){
  const certModulesEl = document.getElementById('certModules');
  if(certModulesEl){ certModulesEl.textContent = getModulesPracticedLabel(); }
  const certWeakAreaEl = document.getElementById('certWeakArea');
  if(certWeakAreaEl){ certWeakAreaEl.textContent = getWeakAreaLabel(); }
}



/* Version 4: Student improvement and future-class data enhancements */
(function(){
  if(!window.state){ return; }

  state.streak = 0;
  state.sessionStart = Date.now();

  function safeParse(key, fallback){
    try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
    catch(e){ return fallback; }
  }

  function safeSet(key, value){
    localStorage.setItem(key, JSON.stringify(value));
  }

  window.v4GetElapsedMinutes = function(){
    const prior = Number(localStorage.getItem('timeOnTaskMinutes') || 0);
    const current = state.sessionStart ? Math.floor((Date.now() - state.sessionStart) / 60000) : 0;
    return prior + current;
  };

  window.v4SaveElapsed = function(){
    const current = state.sessionStart ? Math.floor((Date.now() - state.sessionStart) / 60000) : 0;
    if(current > 0){
      const prior = Number(localStorage.getItem('timeOnTaskMinutes') || 0);
      localStorage.setItem('timeOnTaskMinutes', String(prior + current));
      state.sessionStart = Date.now();
    }
  };

  window.v4RecordMiss = function(t){
    if(!t) return;
    const misses = safeParse('missedConceptsV4', {});
    const key = t.term || 'Unknown Concept';
    if(!misses[key]){
      misses[key] = {count:0, category:(t.category || 'General Review'), module:(t.module || t.chapter || t.category || 'General Review')};
    }
    misses[key].count += 1;
    safeSet('missedConceptsV4', misses);
  };

  window.v4MostMissed = function(limit=5){
    const misses = safeParse('missedConceptsV4', {});
    return Object.entries(misses)
      .sort((a,b)=>b[1].count-a[1].count)
      .slice(0, limit)
      .map(([term,data])=>({term, ...data}));
  };

  window.v4WeakCategories = function(limit=3){
    const perf = safeParse('categoryPerformanceV3', {});
    return Object.entries(perf)
      .filter(([cat,d])=>d && d.total > 0)
      .map(([cat,d])=>({cat, pct: d.correct/d.total, correct:d.correct, total:d.total}))
      .sort((a,b)=>a.pct-b.pct)
      .slice(0, limit);
  };

  window.v4Recommendation = function(){
    const weak = v4WeakCategories(1)[0];
    const missed = v4MostMissed(1)[0];
    if(weak && weak.pct < .70){
      return `Recommended Next Step: complete Quick Weak-Area Review, then review flashcards for ${weak.cat}.`;
    }
    if(missed){
      return `Recommended Next Step: revisit ${missed.term}, then retake the Final Readiness Challenge.`;
    }
    const best = Number(localStorage.getItem('bestScore') || 0);
    if(best >= 85){
      return "Recommended Next Step: complete one short review the day before the final to keep concepts fresh.";
    }
    return "Recommended Next Step: complete Flashcards, Matching, then the Final Readiness Challenge.";
  };

  window.startQuickReview = function(){
    const weakCats = v4WeakCategories(3).map(x=>x.cat);
    let pool = [];
    if(weakCats.length){
      pool = TERMS.filter(t => weakCats.includes(t.category || t.module || t.chapter));
    }
    if(pool.length < 5){
      const missedTerms = v4MostMissed(5).map(x=>x.term);
      pool = TERMS.filter(t => missedTerms.includes(t.term));
    }
    if(pool.length < 5){
      pool = TERMS;
    }
    state.mode = 'quickreview';
    state.pool = sample(pool, Math.min(5, pool.length));
    state.index = 0;
    state.score = 0;
    state.categoryStats = {};
    state.streak = 0;
    state.attempts += 1;
    saveStats();
    showScreen('activity');
    renderQuickReview();
  };

  window.renderQuickReview = function(){
    updateProgress();
    if(state.index >= state.pool.length){ return finishQuickReview(); }
    const t = state.pool[state.index];
    recordModulePracticeFromTerm(t);
    const answers = makeQuestion(t);
    state.currentAnswer = t.definition;
    document.getElementById('activityContent').innerHTML = `
      <span class="term-badge">${t.category || t.module || 'General Review'}</span>
      <div class="streak-pill">🔥 Current Streak: ${state.streak || 0}</div>
      <h2>Quick Weak-Area Review</h2>
      <h3 class="big-term">${t.term}</h3>
      <p>Choose the best definition.</p>
      <div class="answer-grid">${answers.map(a=>`<button class="answer-btn" onclick="checkChoice(this,'${escapeQuote(a)}')">${a}</button>`).join('')}</div>
      <div id="feedback"></div>
    `;
  };

  window.finishQuickReview = function(){
    document.getElementById('progressBar').style.width = '100%';
    v4SaveElapsed();
    const pct = Math.round((state.score/state.pool.length)*100);
    document.getElementById('activityContent').innerHTML = `
      <h2>Quick Review Complete</h2>
      <p class="big-term">${pct}%</p>
      <div class="recommendation-box"><strong>${v4Recommendation()}</strong></div>
      ${v4BuildMostMissedHtml()}
      <div class="card-actions">
        <button class="primary" onclick="startQuickReview()">Do Another Quick Review</button>
        <button class="secondary" onclick="startChallenge()">Try Final Readiness Challenge</button>
        <button class="ghost" onclick="showScreen('dashboard')">Dashboard</button>
      </div>
    `;
  };

  window.v4BuildMostMissedHtml = function(){
    const missed = v4MostMissed(5);
    if(!missed.length){ return ""; }
    return `<div class="missed-list"><h3>Most Missed Concepts</h3>
      <ul>${missed.map(m=>`<li><strong>${m.term}</strong> (${m.category}) missed ${m.count} time${m.count===1?'':'s'}</li>`).join('')}</ul>
    </div>`;
  };

  const oldCheckChoice = window.checkChoice;
  window.checkChoice = function(btn, choice){
    const t = state.pool[state.index];
    const ok = choice === state.currentAnswer;
    state.streak = ok ? (state.streak || 0) + 1 : 0;
    if(!ok){ v4RecordMiss(t); }
    if(state.mode === 'quickreview'){
      recordModulePracticeFromTerm(t);
      recordCategoryPerformanceV3(t, ok);
      [...document.querySelectorAll('.answer-btn')].forEach(b=>b.disabled=true);
      btn.classList.add(ok ? 'correct' : 'wrong');
      if(ok) state.score++;
      document.getElementById('feedback').innerHTML = `<div class="feedback">
        <strong>${ok ? 'Correct.' : 'Not quite.'}</strong>
        <p><strong>${t.term}:</strong> ${t.definition}</p>
        <p><strong>Common trap:</strong> ${t.trap || t.commonMistake || 'Review the distinction carefully.'}</p>
        <button class="primary" onclick="state.index++; renderQuickReview()">Next</button>
      </div>`;
      return;
    }
    return oldCheckChoice(btn, choice);
  };

  const oldCheckTF = window.checkTF;
  if(oldCheckTF){
    window.checkTF = function(ans){
      const t = state.pool[state.index];
      const ok = ans === state.currentAnswer;
      state.streak = ok ? (state.streak || 0) + 1 : 0;
      if(!ok){ v4RecordMiss(t); }
      return oldCheckTF(ans);
    };
  }

  const oldFinishChallenge = window.finishChallenge;
  window.finishChallenge = function(){
    v4SaveElapsed();
    document.getElementById('progressBar').style.width = '100%';
    const pct = Math.round((state.score/state.pool.length)*100);
    if(pct > state.best) state.best = pct;
    saveStats();
    let msg = pct >= 85 ? 'Strong readiness. Keep reviewing traps and examples.' : pct >= 70 ? 'Solid progress. Repeat weak categories before the final.' : 'Keep practicing. Use flashcards first, then retry the challenge.';
    document.getElementById('activityContent').innerHTML = `
      <h2>Final Readiness Challenge Complete</h2>
      <p class="big-term">${pct}%</p>
      <p>${msg}</p>
      <div class="recommendation-box"><strong>${v4Recommendation()}</strong></div>
      ${typeof buildCategoryResults === 'function' ? buildCategoryResults() : ''}
      ${v4BuildMostMissedHtml()}
      <p class="small-muted">Time on task recorded locally: ${v4GetElapsedMinutes()} minute${v4GetElapsedMinutes()===1?'':'s'}.</p>
      <div class="card-actions">
        <button class="primary" onclick="showScreen('certificate')">Print Certificate</button>
        <button class="secondary" onclick="startQuickReview()">Quick Weak-Area Review</button>
        <button class="secondary" onclick="startChallenge()">Retake Challenge</button>
        <button class="ghost" onclick="showScreen('dashboard')">Dashboard</button>
      </div>
    `;
  };

  const oldRenderMultipleChoice = window.renderMultipleChoice;
  window.renderMultipleChoice = function(){
    oldRenderMultipleChoice();
    const card = document.getElementById('activityContent');
    if(card && state.mode === 'challenge'){
      const marker = card.querySelector('.goal-box');
      if(marker && !card.querySelector('.streak-pill')){
        marker.insertAdjacentHTML('afterend', `<div class="streak-pill">🔥 Current Streak: ${state.streak || 0}</div>`);
      }
    }
  };

  const oldRenderCertificate = window.renderCertificate;
  window.renderCertificate = function(){
    oldRenderCertificate();
    const timeEl = document.getElementById('certTimeSpent');
    if(timeEl){ timeEl.textContent = `${v4GetElapsedMinutes()} min`; }
  };

  window.downloadResults = function(){
    v4SaveElapsed();
    const name = localStorage.getItem('studentName') || 'Student';
    const report = {
      studentName: name,
      date: new Date().toLocaleString(),
      bestScore: (localStorage.getItem('bestScore') || 0) + '%',
      attempts: localStorage.getItem('attemptCount') || 0,
      timeOnTaskMinutes: v4GetElapsedMinutes(),
      modulesPracticed: safeParse('modulesPracticed', []),
      areaForImprovement: typeof getWeakAreaLabel === 'function' ? getWeakAreaLabel() : 'Not recorded',
      recommendedNextStep: v4Recommendation(),
      mostMissedConcepts: v4MostMissed(10),
      categoryPerformance: safeParse('categoryPerformanceV3', {})
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const safeName = name.replace(/[^a-z0-9_-]/gi, '_');
    a.href = url;
    a.download = `${safeName}_business_learning_lab_results.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  window.addEventListener('beforeunload', v4SaveElapsed);
})();
