<template>
  <header class="site-header" :class="{ scrolled: isScrolled }">
    <div class="container nav-container">
      <a href="#" class="logo">
        <span class="logo-dot"></span>
        Kenesa<span>Ren</span>
      </a>
      <ul class="nav-links">
        <li><a href="#home" @click.prevent="scrollTo('#home')">Home</a></li>
        <li><a href="#services" @click.prevent="scrollTo('#services')">Services</a></li>
        <li><a href="#experience" @click.prevent="scrollTo('#experience')">Experience</a></li>
        <li><a href="#skills" @click.prevent="scrollTo('#skills')">Skills</a></li>
        <li><a href="#projects" @click.prevent="scrollTo('#projects')">Projects</a></li>
      </ul>
      <a href="#projects" class="nav-cta" @click.prevent="scrollTo('#projects')">
        <i class="fa-solid fa-rocket"></i>&nbsp; Explore
      </a>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const handleScroll = () => { isScrolled.value = window.scrollY > 50 }

const scrollTo = (id) => {
  const el = document.querySelector(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
@media (max-width: 900px) {
  .nav-cta { display: none !important; }
}
</style>
