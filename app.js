(() => {
  "use strict";
  const KEYS = {
    name: "studentName", tasks: "studyTasks", timetable: "studyTimetable",
    extra: "extraLearningTopics", notes: "studyNotes", bookmarks: "studyBookmarks",
    cards: "flashcardProgress", quizzes: "quizResults", sessions: "pomodoroSessions",
    activities: "studyActivityDates", theme: "themeChoice"
  };
  const SUBJECTS = ["English", "Urdu", "Physics", "Mathematics", "Computer Science", "Statistics", "Tarjuma-tul-Quran", "Islamiat"];
  const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const read = (key, fallback = []) => {
    try { const value = localStorage.getItem(key); if (value === null) return fallback; const parsed = JSON.parse(value); return parsed; }
    catch (_) { return fallback; }
  };
  const save = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch (_) { return false; }
  };
  const todayKey = (date = new Date()) => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
  const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`;
  const esc = (value) => String(value ?? "");
  const safeList = (key) => { const value = read(key, []); return Array.isArray(value) ? value : []; };
  function recordActivity(date = todayKey()) {
    const dates = safeList(KEYS.activities);
    if (!dates.includes(date)) { dates.push(date); save(KEYS.activities, dates); }
  }
  function streakCount() {
    const dates = new Set(safeList(KEYS.activities));
    const cursor = new Date();
    let streak = 0;
    if (!dates.has(todayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
    while (dates.has(todayKey(cursor))) { streak++; cursor.setDate(cursor.getDate() - 1); }
    return streak;
  }
  function activeTheme() { return localStorage.getItem(KEYS.theme) || "mauve"; }
  function setTheme(theme) {
    const allowed = ["mauve", "spectrum", "pastel", "night"];
    const selected = allowed.includes(theme) ? theme : "mauve";
    document.documentElement.dataset.theme = selected;
    try { localStorage.setItem(KEYS.theme, selected); } catch (_) { /* storage can be disabled */ }
    $$("[data-theme-choice]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.themeChoice === selected)));
  }
  function initTheme() { setTheme(activeTheme()); $$("[data-theme-choice]").forEach(button => button.addEventListener("click", () => setTheme(button.dataset.themeChoice))); }
  function initShell() {
    const toggle = $("#nav-toggle"), sidebar = $(".sidebar"), backdrop = $(".sidebar-backdrop");
    if (toggle && sidebar && backdrop) {
      const close = () => { sidebar.classList.remove("is-open"); backdrop.classList.remove("is-visible"); toggle.setAttribute("aria-expanded", "false"); };
      toggle.addEventListener("click", () => { const open = !sidebar.classList.contains("is-open"); sidebar.classList.toggle("is-open", open); backdrop.classList.toggle("is-visible", open); toggle.setAttribute("aria-expanded", String(open)); });
      backdrop.addEventListener("click", close);
      $$(".nav-link", sidebar).forEach(link => link.addEventListener("click", close));
    }
    const current = document.body.dataset.page;
    $$(".nav-link").forEach(link => { if (link.dataset.nav === current) link.setAttribute("aria-current", "page"); });
    const name = (localStorage.getItem(KEYS.name) || "Bakhtawar").trim() || "Student";
    $$("[data-user-name]").forEach(el => el.textContent = name);
  }
  function el(tag, text, className) { const node = document.createElement(tag); if (text !== undefined) node.textContent = text; if (className) node.className = className; return node; }
  function actionButton(text, className, fn) { const button = el("button", text, `btn ${className || "btn-secondary"} btn-small`); button.type = "button"; button.addEventListener("click", fn); return button; }
  function emptyMessage(container, message) { container.replaceChildren(el("div", message, "empty-state")); }
  function fmtMinutes(n) { const minutes = Math.max(0, Math.round(Number(n) || 0)); return minutes >= 60 ? `${Math.floor(minutes/60)}h ${minutes%60}m` : `${minutes} min`; }

  function initDashboard() {
    const tasks = safeList(KEYS.tasks), sessions = safeList(KEYS.sessions), extras = safeList(KEYS.extra);
    const completed = tasks.filter(t => t && t.completed).length;
    const today = todayKey();
    const todayFocus = sessions.filter(s => s && (s.date || "").slice(0,10) === today && s.mode !== "break").reduce((sum,s) => sum + (Number(s.minutes) || 0), 0);
    const set = (id, value) => { const target = $(id); if (target) target.textContent = value; };
    set("#stat-tasks", `${completed}/${tasks.length}`);
    set("#stat-streak", `${streakCount()} day${streakCount() === 1 ? "" : "s"}`);
    set("#stat-focus", fmtMinutes(todayFocus));
    set("#stat-extra", String(extras.length));
    const list = $("#today-task-list");
    if (list) {
      const upcoming = tasks.filter(t => t && !t.completed).sort((a,b) => (a.dueDate || "9999").localeCompare(b.dueDate || "9999")).slice(0,4);
      list.replaceChildren();
      if (!upcoming.length) emptyMessage(list, "No pending tasks. Add your next study task in Study Planner.");
      else upcoming.forEach(task => { const item = el("a", undefined, "list-item card-link"); item.href = "study-planner.html"; const body = el("div"); body.append(el("h3", task.title || "Untitled task")); body.append(el("p", `${task.subject || "Uncategorised"} · Due ${task.dueDate || "No date"}`)); item.append(body, el("span", "Open ↗", "pill")); list.append(item); });
    }
    const calendar = $("#mini-calendar");
    if (calendar) {
      calendar.replaceChildren();
      const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
      for (let i=0; i<7; i++) {
        const date = new Date(); date.setDate(date.getDate()+i); const key = todayKey(date);
        const count = tasks.filter(t => t && t.dueDate === key && !t.completed).length;
        const day = el("div", undefined, "calendar-day"); day.append(el("strong", weekday[date.getDay()])); day.append(el("span", String(date.getDate()))); day.append(el("em", count ? `${count} task${count===1?"":"s"}` : "—")); calendar.append(day);
      }
    }
  }

  function initPlanner() {
    const taskForm = $("#task-form"), taskList = $("#task-list"), scheduleForm = $("#schedule-form"), scheduleList = $("#schedule-list");
    if (!taskForm || !taskList || !scheduleForm || !scheduleList) return;
    let tasks = safeList(KEYS.tasks), schedule = safeList(KEYS.timetable), editTask = null, editSlot = null;
    const taskStatus = $("#task-status"), scheduleStatus = $("#schedule-status");
    const ti = { title: $("#task-title"), subject: $("#task-subject"), date: $("#task-date") };
    const si = { activity: $("#schedule-activity"), day: $("#schedule-day"), start: $("#schedule-start"), end: $("#schedule-end") };
    const persistTasks = (updated) => { if (save(KEYS.tasks, updated)) { tasks = updated; return true; } taskStatus.textContent = "Could not save. Browser storage may be unavailable."; return false; };
    function resetTask() { taskForm.reset(); editTask = null; $("#task-form-heading").textContent = "Add a study task"; $("#task-save-button").textContent = "Add task"; $("#task-cancel-button").hidden = true; }
    function renderTasks() {
      taskList.replaceChildren(); const empty = $("#task-empty"); if (empty) empty.hidden = tasks.length > 0;
      [...tasks].sort((a,b)=>(a.dueDate||"9999").localeCompare(b.dueDate||"9999")).forEach(task => {
        const item = el("article", undefined, `list-item${task.completed ? " completed" : ""}`); const info = el("div"); info.append(el("h3", task.title || "Untitled task")); info.append(el("p", `${task.subject || "No subject"} · Due ${task.dueDate || "No date"}`));
        const checkboxLabel = el("label", undefined, "inline-check"); const checkbox = el("input"); checkbox.type="checkbox"; checkbox.checked=!!task.completed; checkbox.setAttribute("aria-label", `Mark ${task.title} completed`); checkboxLabel.append(checkbox, document.createTextNode(" Done")); info.append(checkboxLabel); item.append(info);
        const actions = el("div", undefined, "list-actions"); actions.append(actionButton("Edit", "btn-secondary", () => { editTask=task.id; ti.title.value=task.title||""; ti.subject.value=task.subject||""; ti.date.value=task.dueDate||""; $("#task-form-heading").textContent="Edit study task"; $("#task-save-button").textContent="Save changes"; $("#task-cancel-button").hidden=false; ti.title.focus(); })); actions.append(actionButton("Delete", "btn-quiet", () => { if (!confirm("Delete this task?")) return; const updated=tasks.filter(t=>t.id!==task.id); if (persistTasks(updated)) { if(editTask===task.id) resetTask(); renderTasks(); } })); item.append(actions); checkbox.addEventListener("change",()=>{ const updated=tasks.map(t=>t.id===task.id?{...t,completed:checkbox.checked,completedAt:checkbox.checked?todayKey():null}:t); if(persistTasks(updated)){ if(checkbox.checked) recordActivity(); renderTasks(); taskStatus.textContent=checkbox.checked?"Task completed and saved.":"Task marked as pending.";} }); taskList.append(item);
      });
    }
    taskForm.addEventListener("submit", event => { event.preventDefault(); const title=ti.title.value.trim(), subject=ti.subject.value, dueDate=ti.date.value; if(!title||!subject||!dueDate){taskStatus.textContent="Complete all task fields first.";return;} const old=tasks.find(t=>t.id===editTask); const entry={id:editTask||uid(),title,subject,dueDate,completed:old?!!old.completed:false,completedAt:old?old.completedAt:null}; const updated=editTask?tasks.map(t=>t.id===editTask?entry:t):[entry,...tasks]; if(persistTasks(updated)){resetTask();renderTasks();taskStatus.textContent="Task saved automatically to this browser.";} });
    $("#task-cancel-button").addEventListener("click",resetTask);
    function resetSchedule(){scheduleForm.reset();editSlot=null;$("#schedule-form-heading").textContent="Add a timetable session";$("#schedule-save-button").textContent="Add session";$("#schedule-cancel-button").hidden=true;}
    function renderSchedule(){scheduleList.replaceChildren();const empty=$("#schedule-empty");if(empty)empty.hidden=schedule.length>0;[...schedule].sort((a,b)=>DAYS.indexOf(a.day)-DAYS.indexOf(b.day)||(a.start||"").localeCompare(b.start||"")).forEach(slot=>{const item=el("article",undefined,"list-item");const info=el("div");info.append(el("h3",slot.activity||"Study session"));info.append(el("p",`${slot.day} · ${slot.start}–${slot.end}`));item.append(info);const actions=el("div",undefined,"list-actions");actions.append(actionButton("Edit","btn-secondary",()=>{editSlot=slot.id;si.activity.value=slot.activity||"";si.day.value=slot.day||"";si.start.value=slot.start||"";si.end.value=slot.end||"";$("#schedule-form-heading").textContent="Edit timetable session";$("#schedule-save-button").textContent="Save changes";$("#schedule-cancel-button").hidden=false;si.activity.focus();}));actions.append(actionButton("Delete","btn-quiet",()=>{if(!confirm("Delete this timetable session?"))return;const updated=schedule.filter(s=>s.id!==slot.id);if(save(KEYS.timetable,updated)){schedule=updated;if(editSlot===slot.id)resetSchedule();renderSchedule();scheduleStatus.textContent="Session deleted.";}else scheduleStatus.textContent="Could not save changes.";}));item.append(actions);scheduleList.append(item);});}
    scheduleForm.addEventListener("submit",event=>{event.preventDefault();const activity=si.activity.value.trim(),day=si.day.value,start=si.start.value,end=si.end.value;if(!activity||!day||!start||!end){scheduleStatus.textContent="Complete all timetable fields first.";return;}if(end<=start){scheduleStatus.textContent="End time must be later than start time.";return;}const conflict=schedule.some(s=>s.id!==editSlot&&s.day===day&&start<s.end&&end>s.start);if(conflict){scheduleStatus.textContent="This overlaps another session. Adjust its time first.";return;}const entry={id:editSlot||uid(),activity,day,start,end};const updated=editSlot?schedule.map(s=>s.id===editSlot?entry:s):[...schedule,entry];if(save(KEYS.timetable,updated)){schedule=updated;resetSchedule();renderSchedule();scheduleStatus.textContent="Timetable session saved to this browser.";}else scheduleStatus.textContent="Could not save changes.";});
    $("#schedule-cancel-button").addEventListener("click",resetSchedule);renderTasks();renderSchedule();
  }

  function initExtraLearning() {
    const form=$("#extra-form"), list=$("#extra-list"); if(!form||!list)return;
    let topics=safeList(KEYS.extra), editId=null;const title=$("#extra-title"), notes=$("#extra-notes"), status=$("#extra-status");
    function reset(){form.reset();editId=null;$("#extra-heading").textContent="Add a learning topic";$("#extra-save").textContent="Save topic";$("#extra-cancel").hidden=true;}
    function render(){list.replaceChildren();$("#extra-empty").hidden=topics.length>0;topics.forEach(topic=>{const item=el("article",undefined,"list-item");const info=el("div");info.append(el("h3",topic.title||"Untitled topic"));if(topic.subject)info.append(el("p",topic.subject));if(topic.notes)info.append(el("p",topic.notes));info.append(el("p",`Status: ${topic.status||"To learn"}`));item.append(info);const actions=el("div",undefined,"list-actions");actions.append(actionButton("Edit","btn-secondary",()=>{editId=topic.id;title.value=topic.title||"";notes.value=topic.notes||"";$("#extra-subject").value=topic.subject||"";$("#extra-status-choice").value=topic.status||"To learn";$("#extra-heading").textContent="Edit learning topic";$("#extra-save").textContent="Save changes";$("#extra-cancel").hidden=false;title.focus();}));actions.append(actionButton("Delete","btn-quiet",()=>{if(!confirm("Delete this learning topic?"))return;const updated=topics.filter(t=>t.id!==topic.id);if(save(KEYS.extra,updated)){topics=updated;if(editId===topic.id)reset();render();status.textContent="Topic deleted.";}else status.textContent="Could not save changes.";}));item.append(actions);list.append(item);});}
    form.addEventListener("submit",event=>{event.preventDefault();const t=title.value.trim();if(!t){status.textContent="Add a topic name first.";return;}const entry={id:editId||uid(),title:t,notes:notes.value.trim(),subject:$("#extra-subject").value,status:$("#extra-status-choice").value,updatedAt:new Date().toISOString()};const updated=editId?topics.map(x=>x.id===editId?entry:x):[entry,...topics];if(save(KEYS.extra,updated)){topics=updated;reset();render();status.textContent="Topic saved in your browser.";}else status.textContent="Could not save the topic.";});
    $("#extra-cancel").addEventListener("click",reset);render();
  }

  function initNotes() {
    const form=$("#note-form"), list=$("#note-list"); if(!form||!list)return;
    let notes=safeList(KEYS.notes), editing=null, debounce=null;
    const title=$("#note-title"), content=$("#note-content"), subject=$("#note-subject"), tags=$("#note-tags"), status=$("#note-status"), search=$("#note-search");
    function persist(){if(save(KEYS.notes,notes)){status.textContent="Autosaved in this browser.";return true;}status.textContent="Autosave failed. Check browser storage.";return false;}
    function reset(){form.reset();editing=null;$("#note-heading").textContent="New note";$("#note-save").textContent="Save note";$("#note-cancel").hidden=true;status.textContent="";}
    function render(){list.replaceChildren();const q=(search.value||"").toLowerCase();const filtered=notes.filter(n=>[n.title,n.content,n.subject,n.tags].join(" ").toLowerCase().includes(q)).sort((a,b)=>(b.updatedAt||"").localeCompare(a.updatedAt||""));$("#note-empty").hidden=filtered.length>0;filtered.forEach(note=>{const item=el("article",undefined,"list-item");const info=el("div");info.append(el("h3",note.title||"Untitled note"));info.append(el("p",`${note.subject||"General"}${note.tags?" · "+note.tags:""}`));const preview=(note.content||"").trim();if(preview)info.append(el("p",preview.length>190?preview.slice(0,190)+"…":preview));item.append(info);const actions=el("div",undefined,"list-actions");actions.append(actionButton("Open / Edit","btn-secondary",()=>{editing=note.id;title.value=note.title||"";content.value=note.content||"";subject.value=note.subject||"";tags.value=note.tags||"";$("#note-heading").textContent="Edit note";$("#note-save").textContent="Update note";$("#note-cancel").hidden=false;title.focus();}));actions.append(actionButton(note.bookmarked?"★ Saved":"☆ Bookmark","btn-quiet",()=>{notes=notes.map(n=>n.id===note.id?{...n,bookmarked:!n.bookmarked}:n);persist();render();}));actions.append(actionButton("Delete","btn-quiet",()=>{if(!confirm("Delete this note?"))return;notes=notes.filter(n=>n.id!==note.id);persist();if(editing===note.id)reset();render();}));item.append(actions);list.append(item);});}
    function autosaveDraft(){clearTimeout(debounce);debounce=setTimeout(()=>{const t=title.value.trim();if(!t)return;const entry={id:editing||uid(),title:t,content:content.value,subject:subject.value,tags:tags.value.trim(),bookmarked:notes.find(n=>n.id===editing)?.bookmarked||false,updatedAt:new Date().toISOString()};if(editing)notes=notes.map(n=>n.id===editing?entry:n);else{editing=entry.id;notes=[entry,...notes];}if(persist())render();},450);}
    form.addEventListener("submit",event=>{event.preventDefault();const t=title.value.trim();if(!t){status.textContent="Give your note a title first.";return;}const existing=notes.find(n=>n.id===editing);const entry={id:editing||uid(),title:t,content:content.value,subject:subject.value,tags:tags.value.trim(),bookmarked:existing?!!existing.bookmarked:false,updatedAt:new Date().toISOString()};notes=editing?notes.map(n=>n.id===editing?entry:n):[entry,...notes];if(persist()){reset();render();}});
    [title,content,subject,tags].forEach(field=>{field.addEventListener("input",autosaveDraft);field.addEventListener("change",autosaveDraft);});
    $("#note-cancel").addEventListener("click",reset);search.addEventListener("input",render);render();
  }

  function initTimer() {
    const timeEl=$("#timer-time"); if(!timeEl)return;
    let mode="focus", focusMinutes=25, breakMinutes=5, remaining=focusMinutes*60*1000, endAt=null, ticker=null, running=false;
    const status=$("#timer-status"), subject=$("#timer-subject");
    const modeEl=$("#timer-mode");
    function paint(){const seconds=Math.ceil(remaining/1000);timeEl.textContent=`${String(Math.floor(seconds/60)).padStart(2,"0")}:${String(seconds%60).padStart(2,"0")}`;modeEl.textContent=mode==="focus"?"Focus session":"Break time";$("#timer-start").textContent=running?"Running…":"Start";$("#timer-start").disabled=running;}
    function pauseTick(){if(ticker)clearInterval(ticker);ticker=null;running=false;}
    function finish(){pauseTick();remaining=0;paint();if(mode==="focus"){const sessions=safeList(KEYS.sessions);sessions.push({id:uid(),date:new Date().toISOString(),day:todayKey(),minutes:focusMinutes,mode:"focus",subject:subject.value||"Unassigned"});if(save(KEYS.sessions,sessions)){recordActivity();status.textContent=`Focus session completed and saved (${focusMinutes} minutes). Take a short break.`;}else status.textContent="Session finished but could not be saved.";mode="break";remaining=breakMinutes*60*1000;}else{status.textContent="Break complete. Ready for another focus session?";mode="focus";remaining=focusMinutes*60*1000;}paint();}
    function tick(){remaining=Math.max(0,endAt-Date.now());if(remaining<=0){finish();return;}paint();}
    $("#timer-start").addEventListener("click",()=>{if(running)return;if(remaining<=0)remaining=(mode==="focus"?focusMinutes:breakMinutes)*60000;endAt=Date.now()+remaining;running=true;ticker=setInterval(tick,250);status.textContent="Timer running. Your progress stays in this browser.";paint();});
    $("#timer-pause").addEventListener("click",()=>{if(running){remaining=Math.max(0,endAt-Date.now());pauseTick();paint();status.textContent="Timer paused.";}});
    $("#timer-reset").addEventListener("click",()=>{pauseTick();mode="focus";remaining=focusMinutes*60000;paint();status.textContent="Timer reset.";});
    $("#focus-length").addEventListener("change",event=>{focusMinutes=Number(event.target.value)||25;if(!running&&mode==="focus"){remaining=focusMinutes*60000;paint();}});
    $("#break-length").addEventListener("change",event=>{breakMinutes=Number(event.target.value)||5;if(!running&&mode==="break"){remaining=breakMinutes*60000;paint();}});
    window.addEventListener("beforeunload",pauseTick);paint();
  }

  function initAnalysis() {
    const weekChart=$("#weekly-chart"), subjectChart=$("#subject-chart"); if(!weekChart||!subjectChart)return;
    const tasks=safeList(KEYS.tasks), sessions=safeList(KEYS.sessions);
    const week=[];for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);const key=todayKey(d);const label=d.toLocaleDateString(undefined,{weekday:"short"});const minutes=sessions.filter(s=>s&&((s.day||String(s.date||"").slice(0,10))===key)&&s.mode!=="break").reduce((sum,s)=>sum+(Number(s.minutes)||0),0);week.push({key,label,minutes});}
    weekChart.replaceChildren();const max=Math.max(25,...week.map(d=>d.minutes));if(!sessions.length)$("#weekly-empty").hidden=false;else $("#weekly-empty").hidden=true;
    week.forEach(day=>{const col=el("div",undefined,"chart-column");col.append(el("span",day.minutes?String(day.minutes):"0","chart-value"));const bar=el("div",undefined,"chart-bar");bar.style.height=`${Math.max(3,(day.minutes/max)*112)}px`;bar.setAttribute("role","img");bar.setAttribute("aria-label",`${day.label}: ${day.minutes} focus minutes`);col.append(bar,el("span",day.label,"chart-label"));weekChart.append(col);});
    const bySubject=SUBJECTS.map(subject=>{const all=tasks.filter(t=>t&&t.subject===subject);return{subject,total:all.length,completed:all.filter(t=>t.completed).length};}).filter(s=>s.total>0);
    subjectChart.replaceChildren();$("#subject-empty").hidden=bySubject.length>0;
    bySubject.forEach(s=>{const row=el("div",undefined,"bar-row");row.append(el("span",s.subject,"bar-label"));const track=el("div",undefined,"bar-track");const fill=el("div",undefined,"bar-fill");fill.style.width=`${s.total?100*s.completed/s.total:0}%`;fill.title=`${s.completed} of ${s.total} tasks completed`;track.append(fill);row.append(track,el("strong",`${s.completed}/${s.total}`));subjectChart.append(row);});
    const finished=tasks.filter(t=>t&&t.completed).length;const total=tasks.length;const percent=total?Math.round(finished/total*100):0;
    $("#analysis-total").textContent=String(total);$("#analysis-completed").textContent=String(finished);$("#analysis-percent").textContent=`${percent}%`;$("#analysis-focus-time").textContent=fmtMinutes(sessions.filter(s=>s&&s.mode!=="break").reduce((sum,s)=>sum+(Number(s.minutes)||0),0));$("#analysis-streak").textContent=`${streakCount()} days`;
  }

  function initSettings() {
    const nameForm=$("#name-form"); if(nameForm){const input=$("#settings-name"), status=$("#settings-status");input.value=localStorage.getItem(KEYS.name)||"";nameForm.addEventListener("submit",event=>{event.preventDefault();const name=input.value.trim();if(!name){status.textContent="Enter a name first.";return;}localStorage.setItem(KEYS.name,name);$$('[data-user-name]').forEach(el=>el.textContent=name);status.textContent="Name saved in this browser.";});}
  }
  function initBackup() {
    const exportBtn=$("#export-backup"), importBtn=$("#import-backup"), fileInput=$("#backup-file"), status=$("#backup-status"); if(!exportBtn||!importBtn||!fileInput)return;
    const allowed=[KEYS.name,KEYS.tasks,KEYS.timetable,KEYS.extra,KEYS.notes,KEYS.bookmarks,KEYS.cards,KEYS.quizzes,KEYS.sessions,KEYS.activities,KEYS.theme];
    exportBtn.addEventListener("click",()=>{try{const data={};allowed.forEach(key=>{const value=localStorage.getItem(key);if(value!==null)data[key]=value;});const backup={appName:"The Student Hub",version:2,exportedAt:new Date().toISOString(),data};const blob=new Blob([JSON.stringify(backup,null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const link=el("a");link.href=url;link.download=`student-hub-backup-${todayKey()}.json`;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent="Backup prepared for download. Regular study changes are already saved in this browser.";}catch(_){status.textContent="Backup failed. Check browser storage settings.";}});
    importBtn.addEventListener("click",async()=>{const file=fileInput.files[0];if(!file){status.textContent="Choose a JSON backup file first.";return;}try{const raw=JSON.parse(await file.text());if(!raw||raw.appName!=="The Student Hub"||![1,2].includes(raw.version)||!raw.data||typeof raw.data!=="object"||Array.isArray(raw.data))throw new Error("This file is not a supported Student Hub backup.");const entries=Object.entries(raw.data);if(!entries.length||entries.some(([k,v])=>!allowed.includes(k)||typeof v!=="string"))throw new Error("Backup contains unsupported data.");if(!confirm("Restore this backup? Keys contained in it will replace their current values."))return;const old=new Map(entries.map(([k])=>[k,localStorage.getItem(k)]));try{entries.forEach(([k,v])=>localStorage.setItem(k,v));}catch(error){old.forEach((value,key)=>{try{if(value===null)localStorage.removeItem(key);else localStorage.setItem(key,value);}catch(_){}});throw new Error("Storage was unavailable, so restore was stopped.");}status.textContent="Backup restored. Refresh this page to load restored settings and study data.";}catch(error){status.textContent=error.message||"Could not read this backup.";}});
  }
  function main() {
    initTheme();initShell();
    const page=document.body.dataset.page;
    if(page==="dashboard")initDashboard();
    if(page==="planner")initPlanner();
    if(page==="extra")initExtraLearning();
    if(page==="notes")initNotes();
    if(page==="timer")initTimer();
    if(page==="analysis")initAnalysis();
    if(page==="settings")initSettings();
    if(page==="backup")initBackup();
  }
  document.addEventListener("DOMContentLoaded",main);
})();
