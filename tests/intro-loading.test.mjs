import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [html, css, js] = await Promise.all([
  readFile("index.html", "utf8"),
  readFile("styles.css", "utf8"),
  readFile("app.js", "utf8"),
]);

assert.match(html, /id="loading-screen"/, "loading screen exists");
assert.match(html, /class="intro-logo"/, "loading screen has the illustrated intro logo");
assert.match(html, /class="loading-track"[^>]*role="progressbar"/, "loading screen has a progress bar");
assert.match(html, /Build shields before heavy waves/, "loading screen includes the tip from the mockup");
assert.match(html, /id="main-menu"[^>]*hidden/, "main menu starts hidden");
assert.match(js, /MIN_LOADING_TIME_MS\s*=\s*3000/, "loading screen stays visible for at least 3 seconds");
assert.match(js, /window\.addEventListener\(\s*["']load["']/, "waits for the page load event");
assert.doesNotMatch(html, />\s*100%\s*</, "does not show fake 100% loading text");
assert.doesNotMatch(html, /<img[^>]+loading-gif/, "loading screen is CSS-rendered instead of depending on a missing GIF");

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
assert.ok(css.includes(".alien-boss"), "intro includes a boss alien illustration");
assert.ok(css.includes(".planet-earth"), "intro includes a planet illustration");
assert.ok(css.includes("@keyframes loading-fill"), "intro progress fill is animated");
assert.ok(css.includes("@media"), "mobile-friendly media queries exist");
