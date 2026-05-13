<template>
  <section id="services" class="services-section">
    <div class="container">
      <div class="section-header">
        <div class="section-label svc-reveal">What I Do</div>
        <h2 class="section-title svc-reveal"><span class="num">01 /</span> Services</h2>
      </div>

      <div class="services-grid">
        <div class="service-card svc-card-reveal" v-for="svc in services" :key="svc.title">
          <h3>{{ svc.title }}</h3>
          <p>{{ svc.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

const services = [
  {
    title: 'Fullstack Web',
    desc: 'Complete web applications — frontend, API, and backend — built with the Laravel ecosystem.'
  },
  {
    title: 'Frontend Development',
    desc: 'Interactive, fast, and responsive user interfaces built with Nuxt.js and Vue.js.'
  },
  {
    title: 'Mobile Development',
    desc: 'High-performance cross-platform mobile apps for Android & iOS using Flutter.'
  }
]

onMounted(async () => {
  const gsap = (await import('gsap')).default
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  gsap.fromTo('.svc-reveal',
    { y: 40, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.services-section', start: 'top 80%' }
    }
  )

  gsap.fromTo('.svc-card-reveal',
    { y: 60, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: '.services-grid', start: 'top 85%' }
    }
  )
})
</script>
