<template>
  <div>
    <canvas class="constellation-canvas" ref="constellationCanvas"></canvas>
    <AppHeader />

    <main>
      <HeroSection />

      <!-- Stats on Teal -->
      <div class="bg-teal">
        <div class="container stats-strip reveal-target">
          <div class="stat-item"><span class="stat-num">2</span><span class="stat-label">Companies</span></div>
          <div class="stat-item"><span class="stat-num">4+</span><span class="stat-label">Projects</span></div>
          <div class="stat-item"><span class="stat-num">6+</span><span class="stat-label">Months Exp</span></div>
          <div class="stat-item"><span class="stat-num">3</span><span class="stat-label">Frameworks</span></div>
        </div>
      </div>

      <ServicesSection />

      <!-- Wave: White → Dark -->
      <div class="wave-divider wave-from-white">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path fill="#2B2D42" d="M0,60 C320,120 720,0 1080,80 C1260,110 1380,60 1440,40 L1440,120 L0,120 Z"/></svg>
      </div>

      <ExperienceSection />

      <!-- Wave: Dark → Warm -->
      <div class="wave-divider wave-from-dark">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path fill="#FFF0F5" d="M0,40 C480,120 960,0 1440,80 L1440,120 L0,120 Z"/></svg>
      </div>

      <SkillsSection />

      <!-- Wave: Warm → White -->
      <div class="wave-divider wave-from-warm">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path fill="#FCFBFC" d="M0,50 C360,120 720,10 1080,70 C1260,100 1380,40 1440,60 L1440,120 L0,120 Z"/></svg>
      </div>

      <ProjectsSection />

      <!-- Wave: White → Dark CTA -->
      <div class="wave-divider wave-from-white">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path fill="#2B2D42" d="M0,80 C360,0 720,120 1080,40 C1260,10 1380,60 1440,20 L1440,120 L0,120 Z"/></svg>
      </div>

      <!-- CTA -->
      <div class="cta-section">
        <h2 class="section-title" style="color:white;">Let's Work Together</h2>
        <p>Have a project in mind? I'd love to hear about it. Let's build something great.</p>
        <div style="display:flex;gap:15px;justify-content:center;flex-wrap:wrap;">
          <a href="#" class="btn btn-white"><i class="fa-solid fa-paper-plane"></i>&nbsp; Get In Touch</a>
          <a href="#" class="btn btn-outline-light"><i class="fa-solid fa-download"></i>&nbsp; Download CV</a>
        </div>
      </div>
    </main>

    <footer class="site-footer">
      <p>&copy; 2026 Kenesa Ren (Fa'iq Halul Danendra). All Rights Reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

const constellationCanvas = ref(null)
let animationFrameId = null

onMounted(async () => {
  await nextTick()
  
  // Constellation Logic
  const canvas = constellationCanvas.value
  if (canvas) {
    const ctx = canvas.getContext('2d')
    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    window.addEventListener('resize', () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    })

    const stars = []
    const numStars = Math.floor(width / 15) // Responsive star count
    
    // Pastel colors for stars
    const colors = ['#5AE3F5', '#FFB1D3', '#FFEB94', '#D2A8FF', '#FFFFFF']

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)
      
      // Draw stars and move them
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        s.x += s.vx
        s.y += s.vy

        // Bounce off edges
        if (s.x < 0 || s.x > width) s.vx *= -1
        if (s.y < 0 || s.y > height) s.vy *= -1

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2)
        ctx.fillStyle = s.color
        // Add subtle glow
        ctx.shadowBlur = 6
        ctx.shadowColor = s.color
        ctx.fill()
        ctx.shadowBlur = 0 // Reset

        // Draw connecting lines for nearby stars
        for (let j = i + 1; j < stars.length; j++) {
          const s2 = stars[j]
          const dist = Math.hypot(s.x - s2.x, s.y - s2.y)
          
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(s.x, s.y)
            ctx.lineTo(s2.x, s2.y)
            // Line opacity based on distance
            ctx.strokeStyle = `rgba(167, 139, 250, ${1 - dist / 100})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(draw)
    }
    
    draw()
  }

  // Reveal Animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('revealed') })
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
  
  document.querySelectorAll('.reveal-target').forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 0.1 + 's'
    observer.observe(el)
  })
})

onBeforeUnmount(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
})
</script>

<style>
.constellation-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}
</style>
