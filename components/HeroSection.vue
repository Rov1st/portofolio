<template>
  <section id="home" class="hero">
    <div class="deco-ring" style="width:350px;height:350px;top:10%;right:-80px;"></div>
    <div class="deco-ring" style="width:200px;height:200px;bottom:20%;left:-60px;animation-direction:reverse;border-color:rgba(255,126,95,0.06);"></div>

    <div class="container hero-content">
      <div class="hero-text reveal-target">
        <p class="greeting">✦ Fullstack Developer ✦</p>
        <h1>Hi, I'm <span class="highlight">Fa'iq Halul</span><br>Danendra</h1>
        <p>Also known as <strong style="color:var(--primary);">Kenesa Ren</strong>. A passionate Fresh Graduate from Indonesia specializing in Fullstack Web &amp; Mobile Development.</p>
        <div class="hero-btns">
          <a href="#projects" class="btn btn-primary" @click.prevent="scrollTo('#projects')">
            <i class="fa-solid fa-folder-open"></i>&nbsp; View Projects
          </a>
          <a href="#" class="btn btn-outline">
            <i class="fa-solid fa-envelope"></i>&nbsp; Contact Me
          </a>
        </div>
        <div class="hero-socials">
          <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
          <a href="#"><i class="fa-brands fa-github"></i></a>
          <a href="#"><i class="fa-brands fa-instagram"></i></a>
        </div>
      </div>
      <div class="hero-image reveal-target">
        <div class="hero-glow"></div>
        <img src="/hero_avatar.png" alt="Kenesa Ren">
        <div class="float-badge badge-1"><i class="fa-brands fa-laravel"></i> Laravel</div>
        <div class="float-badge badge-2"><i class="fa-brands fa-vuejs"></i> Nuxt</div>
        <div class="float-badge badge-3"><i class="fa-solid fa-mobile"></i> Flutter</div>
      </div>
    </div>
  </section>
</template>

<script setup>
const scrollTo = (id) => {
  const el = document.querySelector(id)
  if (el) {
    const h = document.querySelector('header')?.offsetHeight || 0
    window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - h, behavior: 'smooth' })
  }
}
</script>

<style scoped>
.float-badge {
  position: absolute; z-index: 3;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(58, 175, 204, 0.2);
  padding: 8px 16px; border-radius: 12px;
  font-size: 0.85rem; font-weight: 700; color: var(--primary);
  box-shadow: 0 4px 15px rgba(58, 175, 204, 0.1);
  animation: float-y 3s ease-in-out infinite;
}
.badge-1 { top: 10%; right: -10px; animation-delay: 0s; }
.badge-2 { bottom: 30%; left: -20px; animation-delay: 1s; color: var(--accent3); border-color: rgba(52,211,153,0.2); }
.badge-3 { bottom: 5%; right: 10%; animation-delay: 2s; color: var(--secondary); border-color: rgba(255,126,95,0.2); }
@media (max-width: 768px) { .float-badge { display: none; } }
</style>
