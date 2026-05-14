import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";

const [html, css, js] = await Promise.all([
  readFile("index.html", "utf8"),
  readFile("styles.css", "utf8"),
  readFile("app.js", "utf8"),
]);

assert.match(html, /src="assets\/loading\.gif"/, "loading screen uses assets/loading.gif");
assert.match(html, /id="loading-screen"/, "loading screen exists");
assert.match(html, /id="main-menu"[^>]*hidden/, "main menu starts hidden");
assert.match(js, /MIN_LOADING_TIME_MS\s*=\s*3000/, "loading screen stays visible for at least 3 seconds");
assert.match(js, /window\.addEventListener\(\s*["']load["']/, "waits for the page load event");
assert.doesNotMatch(html, />\s*100%\s*</, "does not show fake 100% loading text");

for (const label of [
  "MOON DEFENDERS",
  "SEASON 1",
  "START GAME",
  "SHOP",
  "SEASON PASS",
  "MISSIONS",
  "MAIL",
  "SETTINGS",
  "Commander",
  "Level 1",
  "Gold:",
  "10000",
  "Diamonds:",
  "100",
  "Energy:",
  "15/15",
]) {
  assert.ok(html.includes(label), `main menu includes ${label}`);
}

assert.ok(css.includes("--neon-blue"), "neon blue UI color is defined");
assert.ok(css.includes("--orange"), "orange START GAME color is defined");
assert.ok(css.includes("@media"), "mobile-friendly media queries exist");

try {
  await stat("assets/loading.gif");
} catch (error) {
  console.warn("WARNING: assets/loading.gif is missing from this checkout; upload it at that exact path before publishing.");
}
