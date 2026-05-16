<template>
  <div class="intro-sequence" ref="introSequence">
    <div class="intro-sticky" ref="introSticky">
      <!-- Background -->
      <div class="intro-bg" ref="introBg"></div>

      <!-- Interactive Canvas -->
      <canvas class="bg-canvas" ref="bgCanvas"></canvas>

      <!-- Decorative grid lines -->
      <div class="deco-grid fade-el">
        <div class="grid-line grid-line--h" v-for="i in 5" :key="'h'+i" :style="{ top: (i*18)+'%' }"></div>
        <div class="grid-line grid-line--v" v-for="i in 5" :key="'v'+i" :style="{ left: (i*18)+'%' }"></div>
      </div>

      <!-- Floating kanji -->
      <div class="kanji-float fade-el">
        <span class="kj kj-1">私</span>
        <span class="kj kj-2">名</span>
        <span class="kj kj-3">夢</span>
        <span class="kj kj-4">創</span>
        <span class="kj kj-5">道</span>
      </div>

      <!-- Concentric rings -->
      <div class="rings fade-el">
        <div class="ring" v-for="i in 4" :key="'r'+i" :style="{ width: (i*120)+'px', height: (i*120)+'px' }"></div>
      </div>

      <!-- Floating Boxes -->
      <div class="floating-box box-1 fade-el"></div>
      <div class="floating-box box-2 fade-el"></div>
      <div class="floating-box box-3 fade-el"></div>
      <div class="floating-box box-4 fade-el"></div>

      <!-- Top Text -->
      <div class="intro-top-text fade-el" ref="hiText">Hi, I'm</div>
      <div class="intro-top-text intro-aka fade-el" ref="akaText">Also Known As</div>

      <!-- Center Container -->
      <div class="center-wrapper fade-el" ref="centerWrapper">
        <img src="/hero_avatar.png" alt="Avatar" class="intro-img" />
        <div class="text-container inner-text">
          <div class="name-text real-name" ref="innerRealName">FA'IQ HALUL DANENDRA</div>
          <div class="name-text pen-name glitch" data-text="Kenesa Ren" ref="innerPenName">Kenesa Ren</div>
        </div>
      </div>

      <!-- Outer Text -->
      <div class="text-container outer-text fade-el">
        <div class="name-text real-name" ref="outerRealName">FA'IQ HALUL DANENDRA</div>
        <div class="name-text pen-name glitch" data-text="Kenesa Ren" ref="outerPenName">Kenesa Ren</div>
      </div>

      <!-- Skip Button -->
      <button class="skip-btn fade-el" @click="triggerComplete" ref="skipBtn">
        Skip Intro <i class="fa-solid fa-arrow-right"></i>
      </button>

      <!-- Get Started Screen -->
      <div class="get-started-screen" ref="getStartedScreen">
        <button class="btn-get-started" @click="triggerComplete">
          <span class="btn-text">Get Started</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const emit = defineEmits(['complete'])

const introSequence = ref(null)
const introSticky = ref(null)
const introBg = ref(null)
const bgCanvas = ref(null)
const hiText = ref(null)
const akaText = ref(null)
const centerWrapper = ref(null)
const skipBtn = ref(null)
const getStartedScreen = ref(null)

const innerRealName = ref(null)
const innerPenName = ref(null)
const outerRealName = ref(null)
const outerPenName = ref(null)

let scrollTriggerInstance = null
let isCompleted = false
let animFrameId = null

let rawMouse = { x: -999, y: -999 }

// Canvas particles
let particles = []
let ripples = []

const handleMouseMove = (e) => {
  rawMouse.x = e.clientX
  rawMouse.y = e.clientY
  // Add ripple on canvas
  ripples.push({ x: e.clientX, y: e.clientY, r: 0, maxR: 80 + Math.random() * 60, alpha: 0.5 })
  if (ripples.length > 12) ripples.shift()
}

const initCanvas = () => {
  const canvas = bgCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // Create floating particles
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.6 - 0.2,
      r: Math.random() * 3 + 1,
      alpha: Math.random() * 0.4 + 0.1,
      color: Math.random() > 0.5 ? '242,167,179' : '196,167,215'
    })
  }

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw mouse glow radial
    if (rawMouse.x > 0) {
      const grad = ctx.createRadialGradient(rawMouse.x, rawMouse.y, 0, rawMouse.x, rawMouse.y, 280)
      grad.addColorStop(0, 'rgba(242,167,179,0.12)')
      grad.addColorStop(1, 'rgba(242,167,179,0)')
      ctx.beginPath()
      ctx.arc(rawMouse.x, rawMouse.y, 280, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()
    }

    // Draw ripples
    ripples.forEach((rip, i) => {
      rip.r += 3.5
      rip.alpha -= 0.012
      if (rip.alpha <= 0) { ripples.splice(i, 1); return }
      ctx.beginPath()
      ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(242,167,179,${rip.alpha})`
      ctx.lineWidth = 1.5
      ctx.stroke()
    })

    // Draw connecting lines between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx*dx + dy*dy)
        if (dist < 100) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(196,167,215,${0.15 * (1 - dist/100)})`
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      }
    }

    // Draw & update particles
    particles.forEach(p => {
      // Mouse repulsion
      if (rawMouse.x > 0) {
        const dx = p.x - rawMouse.x
        const dy = p.y - rawMouse.y
        const dist = Math.sqrt(dx*dx + dy*dy)
        if (dist < 120) {
          p.vx += (dx / dist) * 0.3
          p.vy += (dy / dist) * 0.3
        }
      }
      p.vx *= 0.98; p.vy *= 0.98
      p.x += p.vx; p.y += p.vy
      if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width }
      if (p.x < -10) p.x = canvas.width + 10
      if (p.x > canvas.width + 10) p.x = -10

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${p.color},${p.alpha})`
      ctx.fill()
    })

    animFrameId = requestAnimationFrame(draw)
  }
  draw()

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })
}

onMounted(async () => {
  window.addEventListener('mousemove', handleMouseMove)
  initCanvas()
  const gsap = (await import('gsap')).default
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  // Create timeline for the scroll-linked animation
  const tl = gsap.timeline()

  // 1. Transition Background & Top Text
  tl.to(introBg.value, { backgroundColor: '#2b2532', duration: 1 }, 0)
  tl.to('.grid-line', { backgroundColor: '#ffffff', opacity: 0.08, duration: 1 }, 0)
  tl.to('.kj', { color: '#ffffff', opacity: 0.1, duration: 1 }, 0)
  tl.to('.ring', { borderColor: '#ffffff', duration: 1 }, 0)
  tl.to(hiText.value, { opacity: 0, y: -20, duration: 0.3 }, 0)
  tl.to(akaText.value, { opacity: 1, y: 0, duration: 0.3 }, 0.3)

  // 2. Glitch Text Transition (Real Name -> Pen Name)
  tl.to([outerRealName.value, innerRealName.value], { 
    opacity: 0, scale: 1.05, filter: 'blur(10px)', duration: 0.4 
  }, 0.2)
  tl.fromTo([outerPenName.value, innerPenName.value], 
    { opacity: 0, scale: 0.95, filter: 'blur(10px)' },
    { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.4 }, 
  0.4)

  // 3. Change floating box colors
  tl.to('.floating-box', { borderColor: 'rgba(132, 116, 161, 0.5)', duration: 1 }, 0)

  // 4. Fade out all intro elements to reveal Get Started
  tl.to('.fade-el', {
    opacity: 0,
    duration: 0.6,
    ease: 'power2.inOut'
  }, 1.2) // Start after the color/text transition completes

  // 5. Fade in Get Started screen
  tl.to(getStartedScreen.value, {
    opacity: 1,
    pointerEvents: 'auto',
    duration: 0.6
  }, 1.5)

  // Set up ScrollTrigger to pin and scrub
  scrollTriggerInstance = ScrollTrigger.create({
    trigger: introSequence.value,
    pin: true,
    start: "top top",
    end: "+=3000", // 3000px of scroll space for the animation
    scrub: 1,
    animation: tl
  })
})

const triggerComplete = () => {
  if (isCompleted) return
  isCompleted = true
  emit('complete')
}

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  if (animFrameId) cancelAnimationFrame(animFrameId)
  if (scrollTriggerInstance) scrollTriggerInstance.kill()
})
</script>

<style scoped>
.intro-sequence {
  position: relative;
  width: 100%;
  z-index: 500;
}
.intro-sticky {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.intro-bg {
  position: absolute;
  inset: 0;
  background: var(--bg); /* #faf7f2 */
  z-index: -1;
  will-change: background-color, opacity;
}

/* Canvas */
.bg-canvas {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

/* Decorative grid */
.deco-grid {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.grid-line {
  position: absolute;
  background: #2b2532;
  opacity: 0.15;
}
.grid-line--h {
  left: 0; right: 0;
  height: 1px;
}
.grid-line--v {
  top: 0; bottom: 0;
  width: 1px;
}

/* Floating Kanji */
.kanji-float {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}
.kj {
  position: absolute;
  font-size: clamp(3rem, 6vw, 5.5rem);
  font-weight: 900;
  color: #2b2532;
  opacity: 0.2;
  animation: kj-drift infinite ease-in-out alternate;
}
.kj-1 { top: 8%;  left: 5%;  animation-duration: 9s; }
.kj-2 { top: 60%; left: 3%;  animation-duration: 11s; animation-delay: -3s; }
.kj-3 { top: 15%; right: 6%; animation-duration: 8s;  animation-delay: -5s; }
.kj-4 { bottom: 12%; right: 4%; animation-duration: 13s; animation-delay: -2s; }
.kj-5 { bottom: 20%; left: 15%; animation-duration: 10s; animation-delay: -7s; }
@keyframes kj-drift {
  from { transform: translateY(0) rotate(-5deg); }
  to   { transform: translateY(-24px) rotate(5deg); }
}

/* Concentric rings */
.rings {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 0;
}
.ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid #2b2532;
  animation: ring-pulse 6s infinite ease-in-out alternate;
}
.ring:nth-child(2) { animation-delay: -1.5s; }
.ring:nth-child(3) { animation-delay: -3s; }
.ring:nth-child(4) { animation-delay: -4.5s; }
@keyframes ring-pulse {
  from { transform: scale(1); opacity: 0.1; }
  to   { transform: scale(1.06); opacity: 0.25; }
}

/* Floating Boxes */
.floating-box {
  position: absolute;
  border: 2px solid var(--secondary);
  opacity: 0.35;
  z-index: 1;
  will-change: border-color, transform;
}
.box-1 {
  width: 150px; height: 100px;
  top: 15%; left: 10%;
}
.box-2 {
  width: 200px; height: 150px;
  bottom: 20%; right: 15%;
  border-width: 4px;
}
.box-3 {
  width: 120px; height: 80px;
  bottom: 25%; left: 20%;
  animation: box-float 7s ease-in-out infinite alternate;
}
.box-4 {
  width: 60px; height: 60px;
  top: 30%; right: 8%;
  border-width: 3px;
  animation: box-float 9s ease-in-out infinite alternate-reverse;
}
@keyframes box-float {
  from { transform: translateY(0) rotate(0deg); }
  to   { transform: translateY(-16px) rotate(4deg); }
}

.center-wrapper {
  position: relative;
  width: min(80vw, 380px);
  aspect-ratio: 3/4;
  overflow: hidden;
  z-index: 2;
  border-radius: 4px; /* Slight rounding or none */
  box-shadow: 0 30px 60px rgba(0,0,0,0.15);
}
.intro-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1);
}

.text-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  text-align: center;
  pointer-events: none;
}
.outer-text {
  z-index: 1; /* Below center-wrapper */
}
.inner-text {
  z-index: 3; /* Inside center-wrapper, above image */
  mix-blend-mode: difference;
}
.name-text {
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 900;
  line-height: 1;
  text-transform: uppercase;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  white-space: nowrap;
  letter-spacing: -2px;
}

/* Real Name colors */
.outer-text .real-name { color: var(--secondary); opacity: 0.6; } /* Light pink */
.inner-text .real-name { 
  color: #ffe0e5; /* Very light pink for high contrast in difference mode */
  -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.3);
} 

/* Pen Name colors */
.outer-text .pen-name { color: #8474A1; opacity: 0; } /* Dark pastel purple text */
.inner-text .pen-name { 
  color: #e6ccff; /* Very light pastel purple for high contrast in difference mode */
  opacity: 0; 
  -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.3);
}

.intro-top-text {
  position: absolute;
  top: 12%;
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 800;
  z-index: 1;
  color: var(--text);
  letter-spacing: -1px;
}
.intro-aka {
  opacity: 0;
  color: #fff; 
}

.skip-btn {
  position: absolute;
  bottom: 10%;
  right: 5%;
  z-index: 10;
  background: transparent;
  border: none;
  font-family: 'Outfit', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: opacity 0.3s ease;
  mix-blend-mode: difference;
  color: #fff;
}
.skip-btn:hover {
  opacity: 0.7;
}

/* Get Started Screen */
.get-started-screen {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  z-index: 20;
}
.btn-get-started {
  position: relative;
  background: transparent;
  border: none;
  color: #fff;
  font-family: 'Outfit', sans-serif;
  font-size: 3rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  padding: 10px 40px;
  transition: transform 0.3s var(--ease);
}
.btn-get-started:hover {
  transform: scale(1.05);
}
.btn-get-started::before,
.btn-get-started::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 6px;
}
.btn-get-started::before {
  left: 0;
  background: var(--secondary); /* pastel pink */
  animation: glitch-border 0.8s infinite linear alternate-reverse;
}
.btn-get-started::after {
  right: 0;
  background: #a2d2ff; /* pastel cyan */
  animation: glitch-border 1.2s infinite linear alternate-reverse;
  animation-delay: -0.5s;
}

@keyframes glitch-border {
  0% { clip-path: inset(10% 0 80% 0); transform: translateX(-4px); }
  20% { clip-path: inset(80% 0 5% 0); transform: translateX(4px); }
  40% { clip-path: inset(30% 0 40% 0); transform: translateX(-4px); }
  60% { clip-path: inset(60% 0 10% 0); transform: translateX(4px); }
  80% { clip-path: inset(5% 0 70% 0); transform: translateX(-4px); }
  100% { clip-path: inset(40% 0 30% 0); transform: translateX(4px); }
}

/* Glitch effect styles */
.glitch {
  position: absolute;
}
.glitch::before, .glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
}
.glitch::before {
  left: 2px;
  text-shadow: -2px 0 rgba(242, 167, 179, 0.8); /* secondary */
  clip: rect(24px, 1550px, 90px, 0);
  animation: glitch-anim-2 3s infinite linear alternate-reverse;
}
.glitch::after {
  left: -2px;
  text-shadow: -2px 0 rgba(196, 167, 215, 0.8); /* accent */
  clip: rect(85px, 1550px, 140px, 0);
  animation: glitch-anim 2.5s infinite linear alternate-reverse;
}

@keyframes glitch-anim {
  0% { clip: rect(10px, 9999px, 83px, 0); }
  5% { clip: rect(61px, 9999px, 5px, 0); }
  10% { clip: rect(15px, 9999px, 97px, 0); }
  15% { clip: rect(51px, 9999px, 20px, 0); }
  20% { clip: rect(86px, 9999px, 71px, 0); }
  25% { clip: rect(31px, 9999px, 12px, 0); }
  30% { clip: rect(98px, 9999px, 44px, 0); }
  35% { clip: rect(72px, 9999px, 19px, 0); }
  40% { clip: rect(2px, 9999px, 87px, 0); }
  45% { clip: rect(41px, 9999px, 33px, 0); }
  50% { clip: rect(90px, 9999px, 10px, 0); }
  55% { clip: rect(11px, 9999px, 76px, 0); }
  60% { clip: rect(66px, 9999px, 35px, 0); }
  65% { clip: rect(25px, 9999px, 59px, 0); }
  70% { clip: rect(81px, 9999px, 2px, 0); }
  75% { clip: rect(39px, 9999px, 95px, 0); }
  80% { clip: rect(5px, 9999px, 49px, 0); }
  85% { clip: rect(56px, 9999px, 28px, 0); }
  90% { clip: rect(93px, 9999px, 64px, 0); }
  95% { clip: rect(18px, 9999px, 88px, 0); }
  100% { clip: rect(47px, 9999px, 7px, 0); }
}

@keyframes glitch-anim-2 {
  0% { clip: rect(65px, 9999px, 100px, 0); }
  5% { clip: rect(52px, 9999px, 74px, 0); }
  10% { clip: rect(79px, 9999px, 85px, 0); }
  15% { clip: rect(75px, 9999px, 5px, 0); }
  20% { clip: rect(67px, 9999px, 61px, 0); }
  25% { clip: rect(14px, 9999px, 79px, 0); }
  30% { clip: rect(1px, 9999px, 66px, 0); }
  35% { clip: rect(86px, 9999px, 30px, 0); }
  40% { clip: rect(23px, 9999px, 98px, 0); }
  45% { clip: rect(85px, 9999px, 72px, 0); }
  50% { clip: rect(71px, 9999px, 75px, 0); }
  55% { clip: rect(2px, 9999px, 48px, 0); }
  60% { clip: rect(30px, 9999px, 16px, 0); }
  65% { clip: rect(59px, 9999px, 50px, 0); }
  70% { clip: rect(41px, 9999px, 62px, 0); }
  75% { clip: rect(2px, 9999px, 82px, 0); }
  80% { clip: rect(31px, 9999px, 43px, 0); }
  85% { clip: rect(92px, 9999px, 96px, 0); }
  90% { clip: rect(98px, 9999px, 8px, 0); }
  95% { clip: rect(48px, 9999px, 73px, 0); }
  100% { clip: rect(33px, 9999px, 40px, 0); }
}
</style>
