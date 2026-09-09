#!/usr/bin/env node
/**
 * apps/<slug>/ 를 스캔해서 저장소 루트의 index.html(허브 페이지)을 다시 생성한다.
 * 의존성 없음.  실행: node scripts/build-index.mjs
 */
import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const APPS_DIR = join(ROOT, "apps");

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function readApps() {
  if (!existsSync(APPS_DIR)) return [];
  return readdirSync(APPS_DIR)
    .filter((slug) => !slug.startsWith(".") && !slug.startsWith("_"))
    .filter((slug) => statSync(join(APPS_DIR, slug)).isDirectory())
    .map((slug) => {
      const metaPath = join(APPS_DIR, slug, "app.json");
      let meta = {};
      if (existsSync(metaPath)) {
        try {
          meta = JSON.parse(readFileSync(metaPath, "utf8"));
        } catch (err) {
          console.warn(`[build-index] ${slug}/app.json 파싱 실패: ${err.message}`);
        }
      }
      const entry = meta.entry || "index.html";
      // app.json에 title이 없으면 진입 HTML의 <title>에서 추론한다.
      let title = meta.title;
      if (!title) {
        const entryPath = join(APPS_DIR, slug, entry);
        if (existsSync(entryPath)) {
          const m = readFileSync(entryPath, "utf8").match(/<title>([^<]*)<\/title>/i);
          if (m) title = m[1].trim();
        }
      }
      return {
        slug,
        title: title || slug,
        description: meta.description || "",
        emoji: meta.emoji || "📦",
        tags: Array.isArray(meta.tags) ? meta.tags : [],
        status: meta.status || "active",
        created: meta.created || "",
        entry,
        hasEntry: existsSync(join(APPS_DIR, slug, entry)),
      };
    })
    .sort((a, b) => (b.created || "").localeCompare(a.created || "") || a.slug.localeCompare(b.slug));
}

function card(app) {
  const href = app.hasEntry ? `apps/${app.slug}/${app.entry}` : `apps/${app.slug}/`;
  const tags = app.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("");
  return `      <a class="card" href="${esc(href)}">
        <div class="card-top">
          <span class="emoji">${esc(app.emoji)}</span>
          <span class="status status-${esc(app.status)}">${esc(app.status)}</span>
        </div>
        <h2>${esc(app.title)}</h2>
        <p>${esc(app.description || "설명이 아직 없습니다. apps/" + app.slug + "/app.json 을 채워 주세요.")}</p>
        <div class="meta">
          <code>apps/${esc(app.slug)}/</code>${app.created ? `<time>${esc(app.created)}</time>` : ""}
        </div>
        ${tags ? `<div class="tags">${tags}</div>` : ""}
      </a>`;
}

function render(apps) {
  const cards = apps.length
    ? apps.map(card).join("\n")
    : `      <p class="empty">아직 등록된 앱이 없습니다. <code>./scripts/new-app.sh &lt;슬러그&gt;</code> 로 첫 폴더를 만들어 보세요.</p>`;
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>artposter — 작업 허브</title>
<!-- 이 파일은 scripts/build-index.mjs 가 생성합니다. 직접 수정하지 마세요. -->
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
<style>
  :root { --ink:#1A1A1A; --sand:#F3F0E9; --red:#D33F2E; --blue:#2D5B88; --yellow:#E6A123; }
  * { box-sizing: border-box; }
  body { margin:0; background:var(--sand); color:var(--ink);
         font-family:'Noto Sans KR','Space Grotesk',sans-serif; }
  .wrap { max-width:1080px; margin:0 auto; padding:48px 24px 80px; }
  header { border-bottom:4px solid var(--ink); padding-bottom:24px; margin-bottom:40px; }
  .bars { display:flex; gap:8px; margin-bottom:20px; }
  .bars i { display:block; height:16px; }
  .bars i:nth-child(1){ width:72px; background:var(--red); }
  .bars i:nth-child(2){ width:40px; background:var(--blue); }
  .bars i:nth-child(3){ width:24px; background:var(--yellow); }
  h1 { font-family:'Space Grotesk',sans-serif; font-size:clamp(32px,6vw,56px);
       font-weight:700; letter-spacing:-.02em; margin:0 0 8px; }
  .sub { margin:0; font-size:15px; opacity:.7; }
  .grid { display:grid; gap:24px; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); }
  .card { display:block; text-decoration:none; color:inherit; background:#fff;
          border:2px solid var(--ink); box-shadow:4px 4px 0 0 var(--ink);
          padding:20px; transition:transform .15s ease, box-shadow .15s ease; }
  .card:hover { transform:translate(-2px,-2px); box-shadow:8px 8px 0 0 var(--ink); }
  .card-top { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px; }
  .emoji { font-size:32px; line-height:1; }
  .status { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.08em;
            border:2px solid var(--ink); padding:2px 8px; }
  .status-active { background:var(--yellow); }
  .status-draft { background:#fff; }
  .status-archived { background:#ddd; opacity:.7; }
  h2 { font-family:'Space Grotesk',sans-serif; font-size:19px; margin:0 0 8px; line-height:1.3; }
  .card p { margin:0 0 16px; font-size:13px; line-height:1.6; opacity:.75; }
  .meta { display:flex; justify-content:space-between; align-items:center; gap:8px;
          font-size:11px; border-top:2px solid var(--ink); padding-top:10px; }
  .meta code { font-family:ui-monospace,Menlo,monospace; opacity:.65; }
  .meta time { opacity:.5; }
  .tags { display:flex; flex-wrap:wrap; gap:6px; margin-top:10px; }
  .tag { font-size:10px; border:1px solid var(--ink); padding:1px 6px; opacity:.7; }
  .empty { grid-column:1/-1; font-size:14px; opacity:.7; }
  footer { margin-top:56px; padding-top:20px; border-top:2px solid var(--ink);
           font-size:12px; opacity:.6; display:flex; justify-content:space-between; flex-wrap:wrap; gap:8px; }
  @media (prefers-color-scheme: dark) {
    :root { --ink:#F3F0E9; --sand:#141414; }
    .card { background:#1e1e1e; }
    .status-draft { background:#1e1e1e; }
    .status-archived { background:#333; }
  }
</style>
</head>
<body>
  <div class="wrap">
    <header>
      <div class="bars"><i></i><i></i><i></i></div>
      <h1>artposter</h1>
      <p class="sub">앱 ${apps.length}개 · 모든 코드는 <code>apps/&lt;슬러그&gt;/</code> 폴더 단위로 관리됩니다.</p>
    </header>
    <main class="grid">
${cards}
    </main>
    <footer>
      <span>자동 생성: scripts/build-index.mjs</span>
      <span>새 폴더: ./scripts/new-app.sh &lt;슬러그&gt;</span>
    </footer>
  </div>
</body>
</html>
`;
}

const apps = readApps();
writeFileSync(join(ROOT, "index.html"), render(apps), "utf8");
console.log(`[build-index] index.html 생성 완료 — 앱 ${apps.length}개: ${apps.map((a) => a.slug).join(", ") || "(없음)"}`);
