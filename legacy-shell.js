(() => {
  "use strict";
  const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const subjectPages = new Set([
    "subjects.html", "english.html", "urdu.html", "physics.html", "mathematics.html",
    "computer.html", "statistics.html", "tarjuma-tul-quran.html", "islamiyat.html",
    "english-a.html", "english-b.html", "urdu-a.html", "urdu-b.html", "chapter.html"
  ]);
  const pages = {
    "subjects.html": { title: "Subjects", nav: "subjects" },
    "english.html": { title: "English", nav: "subjects" },
    "urdu.html": { title: "Urdu", nav: "subjects" },
    "physics.html": { title: "Physics", nav: "subjects" },
    "mathematics.html": { title: "Mathematics", nav: "subjects" },
    "computer.html": { title: "Computer Science", nav: "subjects" },
    "statistics.html": { title: "Statistics", nav: "subjects" },
    "tarjuma-tul-quran.html": { title: "Tarjuma-tul-Quran", nav: "subjects" },
    "islamiyat.html": { title: "Islamiat", nav: "subjects" },
    "english-a.html": { title: "English A", nav: "subjects" },
    "english-b.html": { title: "English B", nav: "subjects" },
    "urdu-a.html": { title: "Urdu A", nav: "subjects" },
    "urdu-b.html": { title: "Urdu B", nav: "subjects" },
    "chapter.html": { title: "Chapter Practice", nav: "subjects" },
    "flashcards.html": { title: "Flashcards", nav: "revision" }
  };
  if (!subjectPages.has(file) && file !== "flashcards.html") return;
  document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".app-shell")) return;
    const page = pages[file] || { title: "Study", nav: "subjects" };
    const head = document.head;
    ["app.css", "legacy-bridge.css"].forEach(href => {
      if (![...head.querySelectorAll("link[rel='stylesheet']")].some(link => link.getAttribute("href") === href)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        head.appendChild(link);
      }
    });
    try {
      const theme = localStorage.getItem("themeChoice");
      document.documentElement.dataset.theme = ["mauve", "spectrum", "pastel", "night"].includes(theme) ? theme : "mauve";
    } catch (_) {
      document.documentElement.dataset.theme = "mauve";
    }

    const body = document.body;
    const oldNodes = Array.from(body.childNodes);
    const shell = document.createElement("div");
    shell.className = "app-shell legacy-shell";
    const sidebar = document.createElement("aside");
    sidebar.className = "sidebar";
    sidebar.id = "legacy-sidebar";
    const name = (() => { try { return (localStorage.getItem("studentName") || "Bakhtawar").trim() || "Student"; } catch (_) { return "Student"; } })();
    sidebar.innerHTML = `
      <a class="brand" href="dashboard.html"><span class="brand-mark">SH</span><span><span class="brand-name">The Student Hub</span><span class="brand-tagline">Your personal learning space</span></span></a>
      <div><div class="nav-label">Workspace</div><nav class="sidebar-nav" aria-label="Main navigation">
      <a class="nav-link" data-nav="dashboard" href="dashboard.html"><span class="nav-icon">⌂</span>Dashboard</a>
      <a class="nav-link" data-nav="subjects" href="subjects.html"><span class="nav-icon">▤</span>Subjects</a>
      <a class="nav-link" data-nav="planner" href="study-planner.html"><span class="nav-icon">▦</span>Study Planner</a>
      <a class="nav-link" data-nav="notes" href="notes.html"><span class="nav-icon">✎</span>Notes</a>
      <a class="nav-link" data-nav="extra" href="extra-learning.html"><span class="nav-icon">✦</span>Extra Learning</a>
      <a class="nav-link" data-nav="revision" href="revision.html"><span class="nav-icon">▣</span>Revision & Practice</a>
      <a class="nav-link" data-nav="timer" href="focus-timer.html"><span class="nav-icon">◷</span>Focus Timer</a>
      <a class="nav-link" data-nav="analysis" href="study-analysis.html"><span class="nav-icon">▥</span>Study Analysis</a>
      </nav></div>
      <div><div class="nav-label">Preferences</div><nav class="sidebar-nav">
      <a class="nav-link" data-nav="settings" href="settings.html"><span class="nav-icon">⚙</span>Settings & Themes</a>
      <a class="nav-link" data-nav="backup" href="backup.html"><span class="nav-icon">⇩</span>Backup & Restore</a>
      </nav></div>
      <div class="sidebar-bottom">Signed in as <strong>${name.replace(/[&<>"']/g, "")}</strong><br>Saved locally in this browser.</div>`;

    const backdrop = document.createElement("div");
    backdrop.className = "sidebar-backdrop";
    backdrop.setAttribute("aria-hidden", "true");
    const main = document.createElement("div");
    main.className = "main-area legacy-main";
    oldNodes.forEach(node => main.appendChild(node));
    const mobileBar = document.createElement("div");
    mobileBar.className = "legacy-mobilebar";
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.id = "nav-toggle";
    toggle.className = "btn btn-secondary mobile-menu-button";
    toggle.textContent = "☰ Menu";
    toggle.setAttribute("aria-label", "Open navigation");
    toggle.setAttribute("aria-expanded", "false");
    mobileBar.append(toggle);
    const mobileTitle = document.createElement("span");
    mobileTitle.textContent = page.title;
    mobileTitle.className = "legacy-mobile-title";
    mobileBar.append(mobileTitle);
    main.insertBefore(mobileBar, main.firstChild);
    shell.append(sidebar, backdrop, main);
    body.replaceChildren(shell);

    sidebar.querySelectorAll(".nav-link").forEach(link => {
      if (link.dataset.nav === page.nav) link.setAttribute("aria-current", "page");
    });
    const close = () => {
      sidebar.classList.remove("is-open");
      backdrop.classList.remove("is-visible");
      toggle.setAttribute("aria-expanded", "false");
    };
    toggle.addEventListener("click", () => {
      const willOpen = !sidebar.classList.contains("is-open");
      sidebar.classList.toggle("is-open", willOpen);
      backdrop.classList.toggle("is-visible", willOpen);
      toggle.setAttribute("aria-expanded", String(willOpen));
    });
    backdrop.addEventListener("click", close);
    sidebar.querySelectorAll(".nav-link").forEach(link => link.addEventListener("click", close));
  });
})();
