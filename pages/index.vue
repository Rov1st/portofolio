<template>
  <div>
    <div class="particles" ref="particlesContainer"></div>
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
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path fill="#1A1D2E" d="M0,60 C320,120 720,0 1080,80 C1260,110 1380,60 1440,40 L1440,120 L0,120 Z"/></svg>
      </div>

      <ExperienceSection />

      <!-- Wave: Dark → Warm -->
      <div class="wave-divider wave-from-dark">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path fill="#FFF5ED" d="M0,40 C480,120 960,0 1440,80 L1440,120 L0,120 Z"/></svg>
      </div>

      <SkillsSection />

      <!-- Wave: Warm → White -->
      <div class="wave-divider wave-from-warm">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path fill="#FFFFFF" d="M0,50 C360,120 720,10 1080,70 C1260,100 1380,40 1440,60 L1440,120 L0,120 Z"/></svg>
      </div>

      <ProjectsSection />

      <!-- Wave: White → Dark CTA -->
      <div class="wave-divider wave-from-white">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path fill="#1A1D2E" d="M0,80 C360,0 720,120 1080,40 C1260,10 1380,60 1440,20 L1440,120 L0,120 Z"/></svg>
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
import { ref, onMounted, nextTick } from 'vue'
const particlesContainer = ref(null)

onMounted(async () => {
  await nextTick()
  if (particlesContainer.value) {
    const colors = ['blue', 'pink', 'purple', 'gold']
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div')
      p.classList.add('particle', colors[Math.floor(Math.random() * colors.length)])
      const size = Math.random() * 4 + 2
      p.style.width = size + 'px'; p.style.height = size + 'px'
      p.style.left = Math.random() * 100 + '%'
      p.style.animationDuration = (Math.random() * 18 + 12) + 's'
      p.style.animationDelay = (Math.random() * 10) + 's'
      particlesContainer.value.appendChild(p)
    }
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('revealed') })
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
  document.querySelectorAll('.reveal-target').forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 0.1 + 's'
    observer.observe(el)
  })
})
</script>
