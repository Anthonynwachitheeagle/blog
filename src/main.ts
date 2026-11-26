import "./style.css";
import { posts } from "./posts";

const app = document.getElementById("app") as HTMLElement;
const toggle = document.getElementById("theme-toggle") as HTMLButtonElement;

const escapes: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function esc(text: string): string {
  return text.replace(/[&<>"']/g, (c) => escapes[c]);
}

function renderHome(): void {
  const cards = posts
    .map(
      (p) => `
      <article class="card">
        <p class="date">${esc(p.date)}</p>
        <h2><a href="#/post/${esc(p.slug)}">${esc(p.title)}</a></h2>
        <p>${esc(p.excerpt)}</p>
      </article>`
    )
    .join("");
  app.innerHTML = `<h1 class="page-title">Blog</h1>${cards}`;
}

function renderPost(slug: string): void {
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    app.innerHTML = `<p>Post not found.</p><p><a href="#/">Back to the blog</a></p>`;
    return;
  }
  const paragraphs = post.body.map((par) => `<p>${esc(par)}</p>`).join("");
  app.innerHTML = `
    <a class="back" href="#/">&larr; All posts</a>
    <article class="card post">
      <p class="date">${esc(post.date)}</p>
      <h1>${esc(post.title)}</h1>
      ${paragraphs}
    </article>`;
}

function route(): void {
  const match = location.hash.match(/^#\/post\/([a-z0-9-]+)$/);
  if (match) {
    renderPost(match[1]);
  } else {
    renderHome();
  }
  window.scrollTo(0, 0);
}

function isDark(): boolean {
  const forced = document.documentElement.getAttribute("data-theme");
  if (forced) return forced === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function updateToggleLabel(): void {
  toggle.textContent = isDark() ? "Light mode" : "Dark mode";
}

toggle.addEventListener("click", () => {
  const next = isDark() ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("blog-theme", next);
  } catch {
    // Storage may be unavailable; the choice still applies for this visit.
  }
  updateToggleLabel();
});

try {
  const saved = localStorage.getItem("blog-theme");
  if (saved === "light" || saved === "dark") {
    document.documentElement.setAttribute("data-theme", saved);
  }
} catch {
  // Ignore storage errors.
}

updateToggleLabel();
window.addEventListener("hashchange", route);
route();
