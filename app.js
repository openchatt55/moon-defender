const MIN_LOADING_TIME_MS = 3000;

const loadingScreen = document.getElementById("loading-screen");
const mainMenu = document.getElementById("main-menu");
const loadingStartedAt = performance.now();
let pageReady = document.readyState === "complete";

function wait(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

async function revealMainMenuWhenReady() {
  const elapsed = performance.now() - loadingStartedAt;
  const remainingMinimumTime = Math.max(0, MIN_LOADING_TIME_MS - elapsed);

  await wait(remainingMinimumTime);

  if (!pageReady) {
    await new Promise((resolve) => {
      window.addEventListener(
        "load",
        () => {
          pageReady = true;
          resolve();
        },
        { once: true },
      );
    });
  }

  mainMenu.hidden = false;
  requestAnimationFrame(() => {
    mainMenu.classList.add("is-visible");
    loadingScreen.classList.add("is-hidden");
  });
}

window.addEventListener(
  "load",
  () => {
    pageReady = true;
  },
  { once: true },
);

revealMainMenuWhenReady();
