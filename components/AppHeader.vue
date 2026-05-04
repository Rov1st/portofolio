<template>
  <header :class="{ scrolled: isScrolled }">
    <div class="container nav-container">
      <a href="#" class="logo">
        <i class="fa-solid fa-star" style="color:var(--accent);"></i>
        Kenesa<span>Ren</span>
      </a>
      <ul class="nav-links">
        <li><a href="#home" @click.prevent="scrollTo('#home')">Home</a></li>
        <li><a href="#services" @click.prevent="scrollTo('#services')">Services</a></li>
        <li><a href="#experience" @click.prevent="scrollTo('#experience')">Experience</a></li>
        <li><a href="#skills" @click.prevent="scrollTo('#skills')">Skills</a></li>
        <li><a href="#projects" @click.prevent="scrollTo('#projects')">Projects</a></li>
      </ul>
      <a href="#projects" class="btn btn-primary" style="padding:10px 22px;font-size:0.85rem;" @click.prevent="scrollTo('#projects')">
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
  if (el) {
    const h = document.querySelector('header')?.offsetHeight || 0
    window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - h, behavior: 'smooth' })
  }
}
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
@media (max-width: 768px) {
  .btn { display: none !important; }
}
</style>
