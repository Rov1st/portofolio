<template>
  <section id="experience" class="exp-section">
    <div class="kanji-bg" style="top: 10%; left: -3%;">経験</div>

    <div class="container">
      <div class="section-header">
        <div class="section-label exp-reveal">Career</div>
        <h2 class="section-title exp-reveal"><span class="num">02 /</span> Experience</h2>
      </div>

      <div class="exp-grid">
        <div class="exp-card exp-card-reveal">
          <div class="exp-duration"><i class="fa-solid fa-clock"></i> 4 Months</div>
          <h3>PT Alpha Cipta Teknologi</h3>
          <p><span class="exp-role" style="color: var(--primary);">Konimex National App — Maintenance & Feature Updates</span><br>
          Maintained and added new features to a nationally-deployed application for Konimex.</p>
          <p><span class="exp-role" style="color: var(--accent);">Orphanage Management System</span><br>
          Developed an information management system for orphanage operations.</p>
        </div>

        <div class="exp-card exp-card-reveal">
          <div class="exp-duration"><i class="fa-solid fa-clock"></i> 2 Months</div>
          <h3>PT Asabri</h3>
          <p><span class="exp-role" style="color: var(--accent2);">Web-based Warehouse System</span><br>
          Built an inventory & warehouse management system for digital tracking and reporting.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(async () => {
  const gsap = (await import('gsap')).default
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  gsap.fromTo('.exp-reveal',
    { y: 40, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.exp-section', start: 'top 80%' }
    }
  )

  gsap.fromTo('.exp-card-reveal',
    { y: 60, opacity: 0, scale: 0.97 },
    {
      y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.2, ease: 'power3.out',
      scrollTrigger: { trigger: '.exp-grid', start: 'top 85%' }
    }
  )
})
</script>
