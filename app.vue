<template>
  <div>
    <!-- Global Preloader -->
    <div id="preloader" ref="preloader">
      <div class="preloader-content">
        <div class="loader-stars">
          <i class="fa-solid fa-star star1"></i>
          <i class="fa-solid fa-star star2"></i>
          <i class="fa-solid fa-star star3"></i>
        </div>
        <h2 class="loader-text">Loading Universe...</h2>
        <div class="loader-bar-bg">
          <div class="loader-bar-fill" ref="loaderFill"></div>
        </div>
      </div>
    </div>

    <NuxtPage />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const preloader = ref(null)
const loaderFill = ref(null)

onMounted(async () => {
  const gsap = (await import('gsap')).default
  
  // Fake loading sequence
  const tl = gsap.timeline({
    onComplete: () => {
      // Hide preloader completely after animation
      if (preloader.value) {
        preloader.value.style.display = 'none'
      }
    }
  })

  // Fill the loading bar
  tl.to(loaderFill.value, {
    width: '100%',
    duration: 1.5,
    ease: 'power1.inOut'
  })
  
  // Fade out content and slide up
  tl.to('.preloader-content', {
    y: -30,
    opacity: 0,
    duration: 0.5,
    ease: 'power2.in'
  }, '+=0.2')
  
  // Fade out the preloader background
  tl.to(preloader.value, {
    opacity: 0,
    duration: 0.8,
    ease: 'power2.inOut'
  }, '-=0.2')
})
</script>

<style>
/* PRELOADER STYLES */
#preloader {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: var(--dark); /* Deep purple starry background */
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.preloader-content {
  text-align: center;
  max-width: 300px;
  width: 100%;
}

.loader-stars {
  font-size: 2rem;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  gap: 15px;
}

.loader-stars i {
  color: var(--accent); /* Star Yellow */
  animation: twinkle 1.5s infinite alternate;
}
.star1 { animation-delay: 0s; color: var(--primary); }
.star2 { animation-delay: 0.5s; color: var(--secondary); font-size: 2.5rem; transform: translateY(-10px); }
.star3 { animation-delay: 1s; color: var(--accent2); }

@keyframes twinkle {
  0% { opacity: 0.3; transform: scale(0.8); filter: drop-shadow(0 0 2px currentColor); }
  100% { opacity: 1; transform: scale(1.1); filter: drop-shadow(0 0 10px currentColor); }
}

.loader-text {
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--text-white);
  margin-bottom: 25px;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.loader-bar-bg {
  width: 100%;
  height: 6px;
  background: rgba(255,255,255,0.1);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.loader-bar-fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, var(--primary), var(--secondary), var(--accent2));
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(255, 177, 211, 0.5); /* Pastel pink glow */
}
</style>
