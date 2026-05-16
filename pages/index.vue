<template>
  <div>
    <!-- Intro Sequence Overlay -->
    <div v-if="isIntroActive" class="intro-overlay" ref="introOverlay">
      <IntroSequence @complete="finishIntro" />
    </div>

    <!-- Main Portfolio Content -->
    <div v-show="showMainContent" class="main-content">
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isIntroActive = ref(true)
const showMainContent = ref(false)
const introOverlay = ref(null)

const finishIntro = async () => {
  showMainContent.value = true
  // Reset scroll to top before revealing main content
  window.scrollTo(0, 0)
  if (window.lenis) window.lenis.scrollTo(0, { immediate: true })

  const gsap = (await import('gsap')).default
  gsap.to(introOverlay.value, {
    yPercent: -100,
    duration: 1.2,
    ease: 'power3.inOut',
    onComplete: async () => {
      isIntroActive.value = false
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      ScrollTrigger.refresh()
    }
  })
}

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

<style scoped>
.intro-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: var(--bg);
}
.main-content {
  position: relative;
  z-index: 1;
}
</style>
