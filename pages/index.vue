<template>
  <div>
    <AppHeader />

    <main>
      <HeroSection />

      <!-- Stats -->
      <div class="stats-bar">
        <div class="container">
          <div class="stats-grid">
            <div class="stat-item stat-reveal" v-for="stat in stats" :key="stat.label">
              <span class="stat-num">{{ stat.val }}</span>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <ServicesSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />

      <!-- CTA -->
      <section class="cta-section">
        <div class="kanji-bg" style="bottom: 10%; right: 5%;">連絡</div>
        <div class="container">
          <h2 class="section-title cta-reveal">Let's Work Together</h2>
          <p class="cta-reveal">Have a project in mind? I'd love to hear about it. Let's build something great.</p>
          <div class="cta-actions cta-reveal">
            <a href="#" class="btn btn-white"><i class="fa-solid fa-paper-plane"></i> Get In Touch</a>
            <a href="#" class="btn btn-ghost"><i class="fa-solid fa-download"></i> Download CV</a>
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <p>&copy; 2026 Kenesa Ren (Fa'iq Halul Danendra). All Rights Reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const stats = [
  { val: '2', label: 'Companies' },
  { val: '4+', label: 'Projects' },
  { val: '6+', label: 'Months Exp' },
  { val: '3', label: 'Frameworks' }
]

onMounted(async () => {
  const gsap = (await import('gsap')).default
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  // Stats counter reveal
  gsap.fromTo('.stat-reveal',
    { y: 30, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.stats-bar', start: 'top 85%' }
    }
  )

  // CTA reveal
  gsap.fromTo('.cta-reveal',
    { y: 40, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: '.cta-section', start: 'top 80%' }
    }
  )
})
</script>
