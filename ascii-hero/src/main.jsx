import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { EffectScene } from "./EffectScene.jsx"

const mountEl = document.getElementById("ascii-hero-root")

// The parent page runs a ~7.5s GSAP intro (loading screen bars, counter digits)
// on the main thread. Mounting the WebGL scene immediately competes with that
// timeline for main-thread time and can visibly stall the intro. Wait until
// the intro is done (with a safety cap in case the loading screen is absent
// or already finished) before starting the R3F render loop.
function mount() {
  if (!mountEl) return
  createRoot(mountEl).render(
    <StrictMode>
      <EffectScene />
    </StrictMode>
  )
}

const loadingScreen = document.querySelector(".loading-screen")

if (loadingScreen && getComputedStyle(loadingScreen).opacity !== "0") {
  const start = Date.now()
  const maxWait = 9000
  const check = () => {
    const done = getComputedStyle(loadingScreen).opacity === "0"
    if (done || Date.now() - start > maxWait) {
      mount()
    } else {
      requestAnimationFrame(check)
    }
  }
  requestAnimationFrame(check)
} else {
  mount()
}
