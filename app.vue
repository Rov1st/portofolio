<template>
  <div>
    <!-- Film Grain -->
    <div class="grain-overlay"></div>

    <!-- Preloader -->
    <div id="preloader" ref="preloader">
      <div class="preloader-inner">
        <div class="preloader-header">
          <div class="preloader-counter" ref="preloaderCounter">0</div>
          <div class="preloader-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C12 0 13.5 9 24 12C13.5 15 12 24 12 24C12 24 10.5 15 0 12C10.5 9 12 0 12 0Z" fill="url(#primogem-grad)" />
              <defs>
                <linearGradient id="primogem-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#fceaff" />
                  <stop offset="50%" style="stop-color:#a2d2ff" />
                  <stop offset="100%" style="stop-color:#ffc8dd" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div class="preloader-bar">
          <div class="preloader-bar-fill" ref="preloaderFill"></div>
        </div>
      </div>
    </div>

    <NuxtPage />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Lenis from 'lenis'

const preloader = ref(null)
const preloaderCounter = ref(null)
const preloaderFill = ref(null)

onMounted(async () => {
  const gsap = (await import('gsap')).default
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  // Init Lenis
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
  })
  window.lenis = lenis

  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => { lenis.raf(time * 1000) })
  gsap.ticker.lagSmoothing(0)

  // Pause scroll during load
  lenis.stop()

  // Preloader animation
  const counter = { val: 0 }
  const tl = gsap.timeline({
    onComplete: () => {
      if (preloader.value) preloader.value.style.display = 'none'
      lenis.start()
      ScrollTrigger.refresh()
    }
  })

  tl.to(counter, {
    val: 100,
    duration: 1.8,
    ease: 'power1.inOut',
    onUpdate: () => {
      if (preloaderCounter.value) preloaderCounter.value.textContent = Math.round(counter.val)
    }
  })
  tl.to(preloaderFill.value, { scaleX: 1, duration: 1.8, ease: 'power1.inOut' }, 0)
  tl.to(preloader.value, {
    yPercent: -100,
    duration: 0.8,
    ease: 'power4.inOut'
  }, '+=0.3')

  onBeforeUnmount(() => {
    lenis.destroy()
  })
})
</script>

<style>
/* Preloader */
#preloader {
  position: fixed;
  inset: 0;
  background: #faf7f2;
  z-index: 99999;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 10vh;
}
.preloader-inner {
  width: min(400px, 80vw);
}
.preloader-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 20px;
}
.preloader-counter {
  font-family: 'Outfit', sans-serif;
  font-size: 8rem;
  font-weight: 900;
  color: #2d2b3a;
  line-height: 1;
  letter-spacing: -4px;
  opacity: 0.08;
}
.preloader-icon {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
  filter: drop-shadow(0 0 15px rgba(162, 210, 255, 0.4));
  animation: primo-spin 4s linear infinite;
}
@keyframes primo-spin {
  0% { transform: rotateY(0deg) rotateX(0deg) scale(1); }
  50% { transform: rotateY(180deg) rotateX(10deg) scale(1.1); }
  100% { transform: rotateY(360deg) rotateX(0deg) scale(1); }
}
.preloader-bar {
  width: 100%;
  height: 2px;
  background: rgba(0,0,0,0.05);
  border-radius: 2px;
  overflow: hidden;
}
.preloader-bar-fill {
  height: 100%;
  width: 100%;
  background: var(--secondary, #f2a7b3);
  transform: scaleX(0);
  transform-origin: left;
}
</style>
