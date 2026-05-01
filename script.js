const state={studentName:"",attempts:+localStorage.getItem("blAttemptsV2")||0,bestScore:+localStorage.getItem("blBestScoreV2")||0,mastered:JSON.parse(localStorage.getItem("blMasteredV2")||"[]"),categoryStats:JSON.parse(localStorage.getItem("blCategoryStatsV2")||"{}"),sessionProgress:0,currentItems:[],currentIndex:0,currentScore:0,finalResults:{},matchingRound:1,moduleFilter:"All Modules"};
const $=id=>document.getElementById(id);
const modules=["All Modules",...new Set(TERMS.map(t=>t.module))];
const blueprint={"Legal Foundations":10,"Contracts and Torts":10,"Business Organizations":13,"Agency and Employment":12,"Commercial Paper and Banking":10,"Secured Transactions and Bankruptcy":10,"Consumer Protection":12,"Securities and Antitrust":13,"Property and Environment":7,"International and Regulatory":3};
function save(){localStorage.setItem("blAttemptsV2",state.attempts);localStorage.setItem("blBestScoreV2",state.bestScore);localStorage.setItem("blMasteredV2",JSON.stringify(state.mastered));localStorage.setItem("blCategoryStatsV2",JSON.stringify(state.categoryStats))}
function shuffle(a){return[...a].sort(()=>Math.random()-.5)}
function activeTerms(){return state.moduleFilter==="All Modules"?TERMS:TERMS.filter(t=>t.module===state.moduleFilter)}
function activeScenarios(){return state.moduleFilter==="All Modules"?SCENARIOS:SCENARIOS.filter(s=>s.module===state.moduleFilter)}
function showOnly(id){["startScreen","dashboard","activityScreen","resultsScreen","certificate"].forEach(s=>$(s).classList.toggle("hidden",s!==id));$("homeBtn").classList.toggle("hidden",id==="startScreen"||id==="dashboard");$("progressPanel").classList.toggle("hidden",id==="startScreen")}
function updateProgress(v){state.sessionProgress=Math.max(0,Math.min(100,v));$("progressFill").style.width=state.sessionProgress+"%";$("progressLabel").textContent=Math.round(state.sessionProgress)+"% complete";let d=Math.max(0,80-state.bestScore);$("readinessLabel").textContent=d===0?"Readiness goal met: 80% or higher":"Distance to readiness: "+d+" points";$("nearComplete").classList.toggle("hidden",state.sessionProgress<85)}
function catPct(stats){return(!stats||!stats.total)?0:Math.round(stats.correct/stats.total*100)}
function addCat(cat,correct){if(!state.categoryStats[cat])state.categoryStats[cat]={correct:0,total:0};state.categoryStats[cat].total++;if(correct)state.categoryStats[cat].correct++;save()}
function renderCats(target,stats){let cats=[...new Set(TERMS.map(t=>t.category))];$(target).innerHTML=cats.map(c=>{let p=catPct(stats[c]);let lab=p>=80?"Strong":p>=50?"Developing":"Needs practice";let rec=getRecommendationForCategory(c,p);return `<div class="category-card"><strong>${c}</strong><span>${lab} · ${p}%</span><div class="meter"><span style="width:${p}%"></span></div><span class="recommend">${rec}</span></div>`}).join("")}
function renderBlueprint(){let total=Object.values(blueprint).reduce((a,b)=>a+b,0);$("blueprintBreakdown").innerHTML=Object.entries(blueprint).map(([c,w])=>`<div class="category-card"><strong>${c}</strong><span>${w}% of practice emphasis</span><div class="meter"><span style="width:${w/Math.max(...Object.values(blueprint))*100}%"></span></div></div>`).join("")}

function getCategoryList(){
  return [...new Set(TERMS.map(t=>t.category))];
}
function getCategoryWeaknessScore(cat){
  const stats=state.categoryStats[cat];
  if(!stats||!stats.total)return 100;
  return Math.max(0,100-catPct(stats));
}
function getWeakCategories(limit=3){
  return getCategoryList().map(cat=>({cat,pct:catPct(state.categoryStats[cat]),total:state.categoryStats[cat]?.total||0,weakness:getCategoryWeaknessScore(cat)}))
  .sort((a,b)=>{
    if(a.total===0&&b.total!==0)return -1;
    if(b.total===0&&a.total!==0)return 1;
    return a.pct-b.pct;
  }).slice(0,limit);
}
function getRecommendationForCategory(cat,pct){
  if(pct===0)return "Start with flashcards, then matching.";
  if(pct<50)return "Use flashcards and weak-area matching.";
  if(pct<80)return "Use scenarios and misconception checks.";
  return "Maintain with readiness challenge.";
}
function updateAdaptiveRecommendation(){
  const weak=getWeakCategories(3);
  const practiced=Object.values(state.categoryStats).some(s=>s&&s.total>0);
  if(!practiced){
    $("adaptiveRecommendation").textContent="Start with Flashcards or Multi-Round Matching. After one round, this panel will recommend practice based on your weak areas.";
    $("weakAreaList").innerHTML="";
    return;
  }
  const topWeak=weak[0];
  $("adaptiveRecommendation").innerHTML=`Your lowest area is <strong>${topWeak.cat}</strong> at <strong>${topWeak.pct}%</strong>. Start with Weak-Area Match, then complete Scenario Practice.`;
  $("weakAreaList").innerHTML=weak.map(w=>`<span class="weak-pill">${w.cat} <span>${w.pct}%</span></span>`).join("");
}
function getWeightedTerms(count=16,weakBias=.65){
  const terms=activeTerms();
  const weakCats=getWeakCategories(4).map(w=>w.cat);
  const weakPool=terms.filter(t=>weakCats.includes(t.category));
  const generalPool=terms.filter(t=>!weakCats.includes(t.category));
  const weakCount=Math.min(Math.round(count*weakBias),weakPool.length);
  const generalCount=Math.max(0,count-weakCount);
  let selected=[...shuffle(weakPool).slice(0,weakCount),...shuffle(generalPool).slice(0,generalCount)];
  if(selected.length<count){
    const remaining=terms.filter(t=>!selected.some(s=>s.term===t.term));
    selected=[...selected,...shuffle(remaining).slice(0,count-selected.length)];
  }
  return shuffle(selected).slice(0,count);
}
function getWeightedScenarios(count=10,weakBias=.7){
  const scenarios=activeScenarios();
  const weakCats=getWeakCategories(4).map(w=>w.cat);
  const weakPool=scenarios.filter(s=>weakCats.includes(s.category));
  const generalPool=scenarios.filter(s=>!weakCats.includes(s.category));
  const weakCount=Math.min(Math.round(count*weakBias),weakPool.length);
  const generalCount=Math.max(0,count-weakCount);
  let selected=[...shuffle(weakPool).slice(0,weakCount),...shuffle(generalPool).slice(0,generalCount)];
  if(selected.length<count){
    const remaining=scenarios.filter(s=>!selected.some(x=>x.prompt===s.prompt));
    selected=[...selected,...shuffle(remaining).slice(0,count-selected.length)];
  }
  return shuffle(selected).slice(0,count);
}
function startRecommendedPractice(){
  const practiced=Object.values(state.categoryStats).some(s=>s&&s.total>0);
  if(!practiced){startFlashcards();return;}
  const weak=getWeakCategories(1)[0];
  if(!weak||weak.pct<60)startMatching(true);
  else if(weak.pct<80)startScenario(true);
  else startFinal();
}

function updateDashboard(){state.moduleFilter=$("moduleFilter")?.value||state.moduleFilter;$("attemptsStat").textContent=state.attempts;$("bestScoreStat").textContent=state.bestScore+"%";$("masteredStat").textContent=state.mastered.length;$("readinessStat").textContent=state.bestScore>=80?"Ready":"Not Ready Yet";$("readinessStat").style.color=state.bestScore>=80?"#2e7d32":"#b7791f";renderCats("categoryBreakdown",state.categoryStats);renderBlueprint();updateAdaptiveRecommendation();updateProgress(state.sessionProgress)}
function initModules(){let sel=$("moduleFilter");sel.innerHTML=modules.map(m=>`<option>${m}</option>`).join("");sel.onchange=()=>{state.moduleFilter=sel.value;updateDashboard()}}
function startApp(){state.studentName=$("studentName").value.trim()||"Student";showOnly("dashboard");updateDashboard()}
function dash(){showOnly("dashboard");updateDashboard()}
function setAct(t,k,c=""){$("activityTitle").textContent=t;$("activityKicker").textContent=k;$("activityCounter").textContent=c;$("activityContent").innerHTML="";showOnly("activityScreen")}
function startFlashcards(){state.currentItems=getWeightedTerms(16,.65);state.currentIndex=0;renderFlash(false)}
function renderFlash(back){let item=state.currentItems[state.currentIndex];setAct("Flashcards","Explain first, then reveal",`${state.currentIndex+1} of ${state.currentItems.length}`);updateProgress(Math.round(state.currentIndex/state.currentItems.length*100));$("activityContent").innerHTML=`<div class="flash"><p class="muted">${item.module} · ${item.category}</p><h3>${item.term}</h3>${back?`<div class="stack"><div class="callout"><strong>Definition:</strong> ${item.definition}</div><div class="callout"><strong>Example:</strong> ${item.example}</div><div class="callout"><strong>Common mistake:</strong> ${item.mistake}</div></div><div class="actions"><button id="know" class="primary">I knew this</button><button id="review" class="ghost">Review again</button></div>`:`<p>Say the definition and an example before revealing.</p><button id="reveal" class="primary">Reveal</button>`}</div>`; if(!back)$("reveal").onclick=()=>renderFlash(true);else{$("know").onclick=()=>flashMark(item,true);$("review").onclick=()=>flashMark(item,false)}}
function flashMark(item,ok){if(ok&&!state.mastered.includes(item.term))state.mastered.push(item.term);addCat(item.category,ok);save();state.currentIndex++;if(state.currentIndex>=state.currentItems.length){updateProgress(100);dash()}else renderFlash(false)}
function weakestTerms(){let weak=getWeakCategories(4).map(w=>w.cat);let pool=activeTerms().filter(t=>weak.includes(t.category));return pool.length>=8?pool:activeTerms()}
function startMatching(weak=false){state.matchingRound=1;state.currentScore=0;state.currentItems=weak?shuffle(weakestTerms()).slice(0,30):shuffle(activeTerms()).slice(0,30);renderMatchRound()}
function renderMatchRound(){let size=state.matchingRound===1?6:state.matchingRound===2?8:10;let start=(state.matchingRound-1)*10;let items=state.currentItems.slice(start,start+size);if(items.length<4)items=shuffle(activeTerms()).slice(0,size);let selectedTerm=null,selectedDef=null,matched=new Set();setAct("Multi-Round Matching",`Round ${state.matchingRound} of 3`,`${matched.size} of ${items.length}`);updateProgress(Math.round((state.matchingRound-1)/3*100));function render(){let defs=shuffle(items);$("activityContent").innerHTML=`<div class="match-layout"><div><h3>Terms</h3><div class="match-list">${items.map((it,i)=>`<button class="match-btn ${matched.has(it.term)?"matched":""}" data-kind="term" data-i="${i}" ${matched.has(it.term)?"disabled":""}>${it.term}</button>`).join("")}</div></div><div><h3>Definitions</h3><div class="match-list">${defs.map(it=>`<button class="match-btn ${matched.has(it.term)?"matched":""}" data-kind="def" data-term="${it.term}" ${matched.has(it.term)?"disabled":""}>${it.definition}</button>`).join("")}</div></div></div><div id="matchFeedback" class="feedback hidden"></div>`;document.querySelectorAll(".match-btn").forEach(b=>b.onclick=()=>{if(b.dataset.kind==="term")selectedTerm=items[+b.dataset.i];if(b.dataset.kind==="def")selectedDef=b.dataset.term;document.querySelectorAll(".match-btn").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");if(selectedTerm&&selectedDef)check()})}
function check(){let ok=selectedTerm.term===selectedDef;addCat(selectedTerm.category,ok);let fb=$("matchFeedback");fb.className="feedback "+(ok?"correct":"incorrect");fb.classList.remove("hidden");fb.innerHTML=ok?`<strong>Correct.</strong> ${selectedTerm.term}: ${selectedTerm.definition}`:`<strong>Not yet.</strong> ${selectedTerm.mistake}`;if(ok){matched.add(selectedTerm.term);state.currentScore++}selectedTerm=null;selectedDef=null;$("activityCounter").textContent=`${matched.size} of ${items.length}`;updateProgress(Math.round(((state.matchingRound-1)+matched.size/items.length)/3*100));if(matched.size===items.length){setTimeout(()=>{state.matchingRound++; if(state.matchingRound>3){updateProgress(100);dash()}else renderMatchRound()},900)}else setTimeout(render,650)}
render()}
function startTF(){state.currentItems=shuffle(activeTerms()).slice(0,12).map(t=>({prompt:t.misconception,answer:"False",feedback:`${t.term}: ${t.definition} Common mistake: ${t.mistake}`,category:t.category}));state.currentIndex=0;state.currentScore=0;renderQ("Misconception Check","Correct the trap")}
function startScenario(weighted=true){state.currentItems=weighted?getWeightedScenarios(10,.7):shuffle(activeScenarios()).slice(0,10);state.currentIndex=0;state.currentScore=0;renderQ("Scenario Practice","Apply the rule")}
function weightedFinalItems(){let pool=[];const weakCats=getWeakCategories(4).map(w=>w.cat);weakCats.forEach(cat=>{let catTerms=activeTerms().filter(t=>t.category===cat);shuffle(catTerms).slice(0,3).forEach(t=>{pool.push({prompt:t.misconception,answer:"False",choices:["True","False"],feedback:`${t.term}: ${t.definition} Common mistake: ${t.mistake}`,category:t.category})})});Object.entries(blueprint).forEach(([cat,w])=>{let catTerms=activeTerms().filter(t=>t.category===cat);let n=Math.max(1,Math.round(w/6));for(let i=0;i<n;i++){let t=shuffle(catTerms)[0];if(t)pool.push({prompt:t.misconception,answer:"False",choices:["True","False"],feedback:`${t.term}: ${t.definition} Common mistake: ${t.mistake}`,category:t.category})}});pool.push(...getWeightedScenarios(10,.7));return shuffle(pool).slice(0,24)}
function startFinal(){state.attempts++;state.currentItems=weightedFinalItems();state.currentIndex=0;state.currentScore=0;state.finalResults={};save();renderQ("Readiness Challenge","Blueprint-balanced score")}
function renderQ(title,kicker){let item=state.currentItems[state.currentIndex];let choices=item.choices||["True","False"];setAct(title,kicker,`${state.currentIndex+1} of ${state.currentItems.length}`);updateProgress(Math.round(state.currentIndex/state.currentItems.length*100));$("activityContent").innerHTML=`<h3>${item.prompt}</h3><div class="choice-grid">${shuffle(choices).map(c=>`<button class="choice" data-choice="${c}">${c}</button>`).join("")}</div><div id="fb" class="feedback hidden"></div>`;document.querySelectorAll(".choice").forEach(b=>b.onclick=()=>answerQ(b.dataset.choice,item,title))}
function answerQ(choice,item,title){let ok=choice===item.answer;if(ok)state.currentScore++;addCat(item.category,ok);if(title==="Readiness Challenge"){if(!state.finalResults[item.category])state.finalResults[item.category]={correct:0,total:0};state.finalResults[item.category].total++;if(ok)state.finalResults[item.category].correct++}document.querySelectorAll(".choice").forEach(b=>{b.disabled=true;if(b.dataset.choice===item.answer)b.classList.add("correct-choice");if(b.dataset.choice===choice&&!ok)b.classList.add("wrong-choice")});let fb=$("fb");fb.className="feedback "+(ok?"correct":"incorrect");fb.classList.remove("hidden");fb.innerHTML=(ok?"<strong>Correct.</strong> ":"<strong>Correction:</strong> The better answer is <strong>"+item.answer+"</strong>. ")+item.feedback+`<div class="actions"><button id="nextQ" class="primary">${state.currentIndex+1>=state.currentItems.length?"Finish":"Next"}</button></div>`;$("nextQ").onclick=()=>{state.currentIndex++;if(state.currentIndex>=state.currentItems.length)finish(title);else renderQ(title,$("activityKicker").textContent)}}
function finish(title){updateProgress(100);if(title==="Readiness Challenge"){let score=Math.round(state.currentScore/state.currentItems.length*100);if(score>state.bestScore)state.bestScore=score;save();showOnly("resultsScreen");$("resultSummary").innerHTML=score>=80?`<strong>${score}%.</strong> You met the 80% readiness target.`:`<strong>${score}%.</strong> Keep practicing the weaker categories below.`;renderCats("resultBreakdown",state.finalResults);$("certName").textContent=state.studentName||"Student";$("certScore").textContent=state.bestScore+"%";$("certAttempts").textContent=state.attempts;$("certDate").textContent=new Date().toLocaleDateString()}else dash()}
function printCert(){$("certificate").classList.remove("hidden");window.print()}
function bind(){initModules();$("startBtn").onclick=startApp;$("homeBtn").onclick=dash;$("returnBtn").onclick=dash;$("printCertBtn").onclick=printCert;$("startRecommendedBtn").onclick=startRecommendedPractice;document.querySelectorAll(".mode").forEach(b=>b.onclick=()=>{let m=b.dataset.mode;if(m==="flashcards")startFlashcards();if(m==="matching")startMatching(false);if(m==="weakmatch")startMatching(true);if(m==="tf")startTF();if(m==="scenario")startScenario();if(m==="final")startFinal()})}
bind();updateDashboard();