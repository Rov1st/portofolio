<template>
  <section id="home" class="hero">
    <div class="kanji-bg" style="top: 5%; right: 5%;">開発者</div>

    <div class="container hero-grid">
      <!-- TEXT -->
      <div class="hero-text-col">
        <div class="hero-label line-mask"><span class="hero-anim">✦ Fullstack Developer</span></div>

        <h1 class="hero-title">
          <span class="line-mask"><span class="hero-anim">Hi, I'm</span></span>
          <span class="line-mask"><span class="hero-anim accent">Fa'iq Halul</span></span>
          <span class="line-mask"><span class="hero-anim">Danendra.</span></span>
        </h1>

        <p class="hero-desc hero-fade">
          Also known as <strong style="color: var(--secondary);">Kenesa Ren</strong>.
          A passionate Fresh Graduate from Indonesia specializing in
          Fullstack Web &amp; Mobile Development.
        </p>

        <div class="hero-actions hero-fade">
          <a href="#projects" class="btn btn-primary" @click.prevent="scrollTo('#projects')">
            <i class="fa-solid fa-folder-open"></i> View Projects
          </a>
          <a href="#" class="btn btn-outline">
            <i class="fa-solid fa-envelope"></i> Contact Me
          </a>
        </div>

        <div class="hero-socials hero-fade">
          <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
          <a href="#"><i class="fa-brands fa-github"></i></a>
          <a href="#"><i class="fa-brands fa-instagram"></i></a>
        </div>
      </div>

      <!-- VISUAL -->
      <div class="hero-visual hero-fade">
        <div class="hero-img-wrap">
          <div class="hero-img-glow"></div>
          <img src="/hero_avatar.png" alt="Kenesa Ren" />
          <div class="hero-float-tag float-1"><i class="fa-brands fa-laravel" style="color:#FF2D20;"></i> Laravel</div>
          <div class="hero-float-tag float-2"><i class="fa-brands fa-vuejs" style="color:#00DC82;"></i> Nuxt</div>
          <div class="hero-float-tag float-3">
            <svg width="20" height="20" viewBox="0 0 24 24" :style="{ color: '#027DFD' }" fill="currentColor" style="margin-right: 8px;">
              <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357m.001 23.987l-7.147-7.158 3.676-3.676 7.158 7.158h7.357m-7.358-4.9l-3.48-3.48 3.48-3.48 3.48 3.48-3.48 3.48" fill="currentColor"/>
            </svg>
            Flutter
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

const scrollTo = (id) => {
  const el = document.querySelector(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

onMounted(async () => {
  const gsap = (await import('gsap')).default

  // Staggered line reveal
  gsap.to('.hero-anim', {
    y: 0,
    duration: 1.2,
    stagger: 0.12,
    ease: 'expo.out',
    delay: 2.5
  })

  // Fade elements
  gsap.fromTo('.hero-fade',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 3.0 }
  )

  // Float tags
  gsap.to('.hero-float-tag', {
    y: -8,
    duration: 2.5,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    stagger: 0.4
  })
})
</script>

<style scoped>
/* Float tag hover glow */
.hero-float-tag {
  transition: box-shadow 0.3s ease;
}
.hero-float-tag:hover {
  box-shadow: 0 12px 40px rgba(162, 210, 255, 0.2);
}
</style>
