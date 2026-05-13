<template>
  <section id="skills" class="tech-section" ref="sectionRef">
    <!-- ===== CARDS VIEW ===== -->
    <div class="tech-cards-layer" ref="cardsLayerRef" :class="{ 'is-hidden': dimensionActive }">
      <div class="container">
        <div class="section-header">
          <div class="section-label">Skills</div>
          <h2 class="section-title"><span class="num">03 /</span> Tech Stack</h2>
        </div>
        <div class="tech-cards-grid">
          <div
            v-for="(tech, i) in techStacks"
            :key="tech.name"
            class="tech-card"
            :class="{ 'is-hovered': hoveredCard === i }"
            @mouseenter="onCardEnter(i)"
            @mouseleave="onCardLeave(i)"
            @click="openDimension(i, $event)"
            :ref="el => { if (el) cardRefs[i] = el }"
          >
            <!-- Normal front -->
            <div class="tc-front">
              <svg v-if="tech.useCustomIcon" class="tc-icon-svg" viewBox="0 0 24 24" :style="{ color: tech.accentColor }">
                <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357m.001 23.987l-7.147-7.158 3.676-3.676 7.158 7.158h7.357m-7.358-4.9l-3.48-3.48 3.48-3.48 3.48 3.48-3.48 3.48" fill="currentColor"/>
              </svg>
              <i v-else :class="tech.icon" class="tc-icon" :style="{ color: tech.accentColor }"></i>
              <span class="tc-name">{{ tech.name }}</span>
            </div>
            <!-- Cosmic layer -->
            <div class="tc-cosmic">
              <div class="tc-mini-stars"></div>
              <span class="tc-cosmic-name" :style="{
                color: tech.accentColor,
                textShadow: '0 0 30px ' + tech.glowColor + ', 0 0 60px ' + tech.glowColor
              }">{{ tech.name }}</span>
            </div>
            <!-- Slash marks -->
            <div class="tc-slashes">
              <div class="slash-line-main" :style="{ background: tech.accentColor, boxShadow: `0 0 10px white, 0 0 20px ${tech.glowColor}` }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== IN-SECTION RIFT DIMENSION ===== -->
    <div class="rift-layer" v-show="dimensionActive" :class="{ 'is-active': dimensionActive }">
      <div class="rift-void-container" ref="riftVoidContainerRef">
        <!-- Top Jaw -->
        <svg class="jaw-edge jaw-edge-top" viewBox="0 0 200 20" preserveAspectRatio="none">
          <polygon points="0,20 200,20 200,14 196,6 190,16 184,4 178,14 172,2 166,15 160,5 154,17 148,3 142,13 136,6 130,18 124,4 118,15 112,2 106,16 100,5 94,12 88,3 82,17 76,6 70,14 64,2 58,16 52,4 46,13 40,5 34,17 28,6 22,12 16,3 10,15 4,7 0,12" fill="#1e1a2e" />
        </svg>

        <!-- The Expanding Void -->
        <div class="rift-void" ref="riftVoidRef">
          <!-- Starfield background -->
          <canvas ref="starCanvas" class="dim-starfield"></canvas>

          <!-- ===== CONSTELLATION VIEW ===== -->
          <div v-show="currentView === 'constellation'" class="constellation-view" ref="constellationViewRef">
            <button class="star-back-btn" @click="closeDimension" title="Back">
              <svg viewBox="0 0 40 40" class="star-btn-svg">
                <polygon points="20,2 25,15 38,15 27,23 31,37 20,28 9,37 13,23 2,15 15,15" />
              </svg>
              <span class="star-btn-text">✦</span>
            </button>

            <h2 class="dim-title" :style="{
              color: activeTechData?.accentColor,
              textShadow: '0 0 40px ' + activeTechData?.glowColor
            }">
              <span v-if="activeTechData?.useCustomIcon" class="dim-icon-svg-wrap">
                <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357m.001 23.987l-7.147-7.158 3.676-3.676 7.158 7.158h7.357m-7.358-4.9l-3.48-3.48 3.48-3.48 3.48 3.48-3.48 3.48" />
                </svg>
              </span>
              <i v-else :class="activeTechData?.icon" style="margin-right: 14px; font-size: 1.2em;"></i>
              {{ activeTechData?.name }}
            </h2>

            <svg class="constellation-svg" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid meet">
              <defs>
                <filter id="starGlow">
                  <feGaussianBlur stdDeviation="3" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="lineGlow">
                  <feGaussianBlur stdDeviation="2" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              <!-- Lines -->
              <line
                v-for="(conn, ci) in activeTechData?.connections"
                :key="'l'+ci"
                :x1="activeTechData.modules[conn[0]].cx"
                :y1="activeTechData.modules[conn[0]].cy"
                :x2="activeTechData.modules[conn[1]].cx"
                :y2="activeTechData.modules[conn[1]].cy"
                class="const-line"
                :style="{ stroke: activeTechData.accentColor, animationDelay: (ci * 0.15) + 's' }"
                filter="url(#lineGlow)"
              />

              <!-- Nodes -->
              <g
                v-for="(mod, mi) in activeTechData?.modules"
                :key="'n'+mi"
                class="const-node"
                :style="{ animationDelay: (mi * 0.1 + 0.4) + 's' }"
                @click.stop="openModuleDetail(mi)"
              >
                <!-- Invisible large hit area -->
                <circle :cx="mod.cx" :cy="mod.cy" r="30" fill="transparent" class="node-hitarea" />
                <circle :cx="mod.cx" :cy="mod.cy" r="10" class="node-glow"
                  :style="{ fill: activeTechData.accentColor }" filter="url(#starGlow)" />
                <circle :cx="mod.cx" :cy="mod.cy" r="5" class="node-core" />
                <text :x="mod.cx" :y="mod.cy - 18" class="node-label"
                  :style="{ fill: activeTechData.accentColor }">{{ mod.title }}</text>
              </g>
            </svg>
            <p class="dim-hint">Click a star to explore</p>
          </div>

          <!-- ===== MODULE DETAIL VIEW ===== -->
          <div v-show="currentView === 'detail'" class="module-detail-view" ref="moduleDetailViewRef">
            <button class="star-back-btn" @click="backToConstellation" title="Back to constellation">
              <svg viewBox="0 0 40 40" class="star-btn-svg">
                <polygon points="20,2 25,15 38,15 27,23 31,37 20,28 9,37 13,23 2,15 15,15" />
              </svg>
              <span class="star-btn-text">✦</span>
            </button>
            <div class="module-content">
              <h2 class="module-title" :style="{
                color: activeTechData?.accentColor,
                textShadow: '0 0 30px ' + activeTechData?.glowColor
              }">{{ activeModuleData?.title }}</h2>
              <div class="module-divider" :style="{ background: activeTechData?.accentColor }"></div>
              <p class="module-description">{{ activeModuleData?.description }}</p>
              <div class="module-parent-tag">
                <span v-if="activeTechData?.useCustomIcon" class="dim-icon-svg-wrap-small">
                  <svg width="1.1em" height="1.1em" viewBox="0 0 24 24" fill="currentColor" :style="{ color: activeTechData?.accentColor }">
                    <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357m.001 23.987l-7.147-7.158 3.676-3.676 7.158 7.158h7.357m-7.358-4.9l-3.48-3.48 3.48-3.48 3.48 3.48-3.48 3.48" />
                  </svg>
                </span>
                <i v-else :class="activeTechData?.icon" :style="{ color: activeTechData?.accentColor }"></i>
                {{ activeTechData?.name }}
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Jaw -->
        <svg class="jaw-edge jaw-edge-bottom" viewBox="0 0 200 20" preserveAspectRatio="none">
          <polygon points="0,0 200,0 200,6 196,14 190,4 184,16 178,6 172,18 166,5 160,15 154,3 148,17 142,7 136,14 130,2 124,16 118,5 112,18 106,4 100,15 94,8 88,17 82,3 76,14 70,6 64,18 58,4 52,16 46,7 40,15 34,3 28,14 22,8 16,17 10,5 4,13 0,8" fill="#1e1a2e" />
        </svg>

        <!-- Huge slash line for screen tear -->
        <div class="screen-slash" ref="screenSlashRef"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, nextTick } from 'vue'

const techStacks = [
  {
    name: 'Laravel',
    icon: 'fa-brands fa-laravel',
    accentColor: '#FF2D20',
    glowColor: 'rgba(255,45,32,0.5)',
    modules: [
      { title: 'Fullstack', cx: 150, cy: 80, description: 'Building complete web applications from frontend to backend with Laravel\'s powerful ecosystem — routing, middleware, and service containers working in harmony.' },
      { title: 'RESTful API', cx: 320, cy: 180, description: 'Designing scalable RESTful APIs with resource routing, Sanctum authentication, and clean JSON response formatting for mobile and SPA consumption.' },
      { title: 'Backend', cx: 500, cy: 100, description: 'Server-side architecture including queue management, scheduled tasks, event broadcasting, and complex business logic implementation.' },
      { title: 'Blade', cx: 620, cy: 280, description: 'Crafting dynamic server-rendered views using Blade templating — components, layouts, slots, and conditional rendering for rapid UI development.' },
      { title: 'Eloquent ORM', cx: 200, cy: 330, description: 'Database modeling with Eloquent\'s expressive ActiveRecord — complex relationships, eager loading, query scopes, and migration management.' },
    ],
    connections: [[0,1],[1,2],[2,3],[3,4],[4,1],[0,2]]
  },
  {
    name: 'Nuxt.js',
    icon: 'fa-brands fa-vuejs',
    accentColor: '#00DC82',
    glowColor: 'rgba(0,220,130,0.5)',
    modules: [
      { title: 'Frontend UI', cx: 200, cy: 100, description: 'Building rich, interactive user interfaces with component-driven architecture, reactive data binding, and modern CSS integration.' },
      { title: 'Vue.js', cx: 450, cy: 80, description: 'Deep expertise in Vue 3 Composition API, reactivity system, computed properties, watchers, and lifecycle hooks for scalable applications.' },
      { title: 'State Management', cx: 350, cy: 280, description: 'Centralized state management using Pinia/Vuex for predictable data flow, actions, getters, and persistent state across complex UIs.' },
      { title: 'Responsive Design', cx: 600, cy: 250, description: 'Crafting fluid layouts that adapt seamlessly across devices — CSS Grid, Flexbox, media queries, and mobile-first design methodology.' },
    ],
    connections: [[0,1],[1,2],[2,3],[0,2],[1,3]]
  },
  {
    name: 'Flutter',
    icon: '',
    useCustomIcon: true,
    accentColor: '#027DFD',
    glowColor: 'rgba(2,125,253,0.5)',
    modules: [
      { title: 'Android', cx: 180, cy: 120, description: 'Native Android development with Flutter — platform channels, permissions handling, Play Store deployment, and device-specific optimizations.' },
      { title: 'Cross-platform', cx: 500, cy: 90, description: 'Single codebase for iOS and Android — maximizing code reuse while maintaining platform-native look and feel.' },
      { title: 'Dart', cx: 300, cy: 300, description: 'Proficiency in Dart language — null safety, async/await patterns, streams, isolates, and object-oriented programming.' },
      { title: 'UI Animation', cx: 620, cy: 270, description: 'Creating fluid micro-interactions and complex animations — Hero transitions, custom painters, implicit/explicit animations, and Rive integration.' },
    ],
    connections: [[0,1],[1,3],[3,2],[2,0],[0,3]]
  }
]

import gsap from 'gsap'

const currentView = ref('cards')
const hoveredCard = ref(-1)
const activeTechIndex = ref(0)
const activeModuleIndex = ref(0)
const showDimension = ref(false)
const dimensionActive = ref(false)
const isClosing = ref(false)

const sectionRef = ref(null)
const starCanvas = ref(null)
const cardRefs = reactive({})
const cardsLayerRef = ref(null)
const riftVoidContainerRef = ref(null)
const riftVoidRef = ref(null)
const constellationViewRef = ref(null)
const moduleDetailViewRef = ref(null)
const screenSlashRef = ref(null)

let starAnimFrame = null
let openTimeline = null

const activeTechData = computed(() => techStacks[activeTechIndex.value] || null)
const activeModuleData = computed(() => activeTechData.value?.modules[activeModuleIndex.value] || null)

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

function onCardEnter(index) {
  hoveredCard.value = index
  const card = cardRefs[index]
  if (!card) return
  const cosmic = card.querySelector('.tc-cosmic')
  const front = card.querySelector('.tc-front')
  if (cosmic) {
    gsap.killTweensOf(cosmic)
    gsap.to(cosmic, {
      clipPath: 'polygon(0% 35%, 10% 20%, 20% 30%, 30% 15%, 40% 28%, 50% 12%, 60% 25%, 70% 15%, 80% 30%, 90% 18%, 100% 35%, 100% 65%, 90% 85%, 80% 70%, 70% 85%, 60% 75%, 50% 90%, 40% 75%, 30% 88%, 20% 70%, 10% 82%, 0% 65%)',
      duration: 0.5,
      ease: 'power3.out'
    })
  }
  if (front) {
    gsap.killTweensOf(front)
    gsap.to(front, { opacity: 0.35, scale: 0.96, duration: 0.4, ease: 'power2.out' })
  }
}

function onCardLeave(index) {
  hoveredCard.value = -1
  const card = cardRefs[index]
  if (!card) return
  const cosmic = card.querySelector('.tc-cosmic')
  const front = card.querySelector('.tc-front')
  if (cosmic) {
    gsap.killTweensOf(cosmic)
    gsap.to(cosmic, {
      clipPath: 'polygon(0% 50%, 10% 50%, 20% 50%, 30% 50%, 40% 50%, 50% 50%, 60% 50%, 70% 50%, 80% 50%, 90% 50%, 100% 50%, 100% 50%, 90% 50%, 80% 50%, 70% 50%, 60% 50%, 50% 50%, 40% 50%, 30% 50%, 20% 50%, 10% 50%, 0% 50%)',
      duration: 0.4,
      ease: 'power3.inOut'
    })
  }
  if (front) {
    gsap.killTweensOf(front)
    gsap.to(front, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.inOut' })
  }
}

// Spawn energy sparks along the slash line
function spawnSlashSparks(sectionEl, originXPercent, originYPx) {
  const sectionRect = sectionEl.getBoundingClientRect()
  const originXPx = (originXPercent / 100) * sectionRect.width
  const originY = typeof originYPx === 'string' ? parseFloat(originYPx) : originYPx
  const sparkCount = 18
  
  for (let i = 0; i < sparkCount; i++) {
    const spark = document.createElement('div')
    spark.className = 'rift-spark'
    sectionEl.appendChild(spark)
    
    const spread = (Math.random() - 0.5) * sectionRect.width * 0.8
    const drift = (Math.random() - 0.5) * 120
    
    gsap.set(spark, {
      x: originXPx,
      y: originY,
      scale: Math.random() * 0.6 + 0.4,
      opacity: 1
    })
    
    gsap.to(spark, {
      x: originXPx + spread,
      y: originY + drift,
      opacity: 0,
      scale: 0,
      duration: 0.6 + Math.random() * 0.5,
      ease: 'power3.out',
      delay: Math.random() * 0.2,
      onComplete: () => spark.remove()
    })
  }
}

async function openDimension(index, event) {
  activeTechIndex.value = index
  dimensionActive.value = true
  currentView.value = 'constellation'
  
  await nextTick()
  
  const sectionLayer = sectionRef.value
  const sectionHeight = sectionLayer.offsetHeight
  const jawHeight = 40
  const targetHeight = sectionHeight - (jawHeight * 2)
  
  // Calculate dynamic transform origin for the slash based on clicked card
  let originX = 50
  let relativeY = '50%'
  let relativeYNum = sectionHeight / 2
  const cardElement = cardRefs[index]
  if (cardElement && sectionLayer) {
    const cardRect = cardElement.getBoundingClientRect()
    const sectionRect = sectionLayer.getBoundingClientRect()
    
    const cardCenterX = cardRect.left + (cardRect.width / 2)
    const relativeX = cardCenterX - sectionRect.left
    originX = (relativeX / sectionRect.width) * 100
    
    const cardCenterY = cardRect.top + (cardRect.height / 2)
    relativeYNum = cardCenterY - sectionRect.top
    relativeY = `${relativeYNum}px`
  }
  
  if (openTimeline) openTimeline.kill()
  
  gsap.set(riftVoidContainerRef.value, { 
    top: relativeY,
    clipPath: `polygon(${originX}% 0%, ${originX}% 0%, ${originX}% 100%, ${originX}% 100%)`
  })
  gsap.set(riftVoidRef.value, { height: 0 })
  gsap.set(screenSlashRef.value, { scaleX: 0, opacity: 1, transformOrigin: `${originX}% center` })
  gsap.set(constellationViewRef.value, { opacity: 0, y: 30 })
  gsap.set(starCanvas.value, { opacity: 0 })
  
  if (constellationViewRef.value) constellationViewRef.value.style.height = `${targetHeight}px`
  if (moduleDetailViewRef.value) moduleDetailViewRef.value.style.height = `${targetHeight}px`
  
  openTimeline = gsap.timeline()
  
  // Phase 1: Slash crawls across the section from the clicked card
  openTimeline.to(screenSlashRef.value, {
    scaleX: 1,
    duration: 0.7,
    ease: 'circ.out'
  })
  // Rift crack follows the slash — slightly delayed for a "tearing" feel
  openTimeline.to(riftVoidContainerRef.value, {
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    duration: 0.8,
    ease: 'circ.out'
  }, '<0.08')
  
  // Spawn sparks at the moment of impact
  openTimeline.call(() => {
    spawnSlashSparks(sectionLayer, originX, relativeYNum)
  }, null, 0.05)
  
  // Phase 2: Cards layer smoothly dissolves
  openTimeline.to(cardsLayerRef.value, {
    opacity: 0,
    scale: 0.92,
    duration: 0.5,
    ease: 'power2.inOut'
  }, '-=0.4')
  
  // Phase 3: Jaws pull apart vertically — with a satisfying elastic settle
  openTimeline.to(riftVoidContainerRef.value, {
    top: '50%',
    duration: 1.1,
    ease: 'power4.inOut'
  }, '-=0.15')
  openTimeline.to(riftVoidRef.value, {
    height: targetHeight,
    duration: 1.1,
    ease: 'power4.inOut'
  }, '<')
  // Slash line fades gently as the void opens
  openTimeline.to(screenSlashRef.value, {
    opacity: 0,
    height: 2,
    duration: 0.5,
    ease: 'power2.in'
  }, '<0.2')
  
  // Phase 4: Starfield and constellation fade in with upward drift
  openTimeline.to(starCanvas.value, {
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out'
  }, '-=0.5')
  openTimeline.to(constellationViewRef.value, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power3.out'
  }, '<0.1')
  
  openTimeline.call(() => {
    initStarfield()
  }, null, '-=0.6')
}

function closeDimension() {
  isClosing.value = true
  
  if (openTimeline) openTimeline.kill()
  
  // Recalculate origin for closing back into the card
  let relativeY = '50%'
  let originX = 50
  const sectionLayer = sectionRef.value
  const cardElement = cardRefs[activeTechIndex.value]
  if (cardElement && sectionLayer) {
    const cardRect = cardElement.getBoundingClientRect()
    const sectionRect = sectionLayer.getBoundingClientRect()
    
    const cardCenterX = cardRect.left + (cardRect.width / 2)
    const relativeX = cardCenterX - sectionRect.left
    originX = (relativeX / sectionRect.width) * 100
    
    const cardCenterY = cardRect.top + (cardRect.height / 2)
    relativeY = `${cardCenterY - sectionRect.top}px`
  }
  
  const tl = gsap.timeline()
  
  // Phase 1: Content fades out with subtle downward drift
  const activeViewRef = currentView.value === 'constellation' ? constellationViewRef.value : moduleDetailViewRef.value
  tl.to(activeViewRef, { opacity: 0, y: 20, duration: 0.35, ease: 'power2.in' })
  tl.to(starCanvas.value, { opacity: 0, duration: 0.35, ease: 'power2.in' }, '<')
  
  // Phase 2a: Jaws close vertically — smooth acceleration
  tl.set(screenSlashRef.value, { opacity: 0.8, scaleX: 1, height: 4 })
  tl.to(riftVoidContainerRef.value, {
    top: relativeY,
    duration: 0.8,
    ease: 'power4.inOut'
  }, '-=0.1')
  tl.to(riftVoidRef.value, {
    height: 0,
    duration: 0.8,
    ease: 'power4.inOut'
  }, '<')
  // Slash reappears as the jaws close
  tl.to(screenSlashRef.value, {
    opacity: 1,
    duration: 0.3,
    ease: 'power2.out'
  }, '<0.2')
  
  // Phase 2b: Retract the crack horizontally back into the card
  tl.to(riftVoidContainerRef.value, {
    clipPath: `polygon(${originX}% 0%, ${originX}% 0%, ${originX}% 100%, ${originX}% 100%)`,
    duration: 0.5,
    ease: 'power3.in'
  }, '-=0.15')
  tl.to(screenSlashRef.value, {
    scaleX: 0,
    opacity: 0,
    duration: 0.5,
    ease: 'power3.in'
  }, '<')
  
  // Phase 3: Cards layer gracefully returns
  tl.to(cardsLayerRef.value, {
    opacity: 1,
    scale: 1,
    duration: 0.5,
    ease: 'power3.out'
  }, '-=0.3')
  
  tl.call(() => {
    dimensionActive.value = false
    isClosing.value = false
    currentView.value = 'cards'
    cancelAnimationFrame(starAnimFrame)
    // Reset slash height
    gsap.set(screenSlashRef.value, { height: 4 })
  })
}

function openModuleDetail(index) {
  activeModuleIndex.value = index
  currentView.value = 'detail'
  // playSound('star-click')
}

function backToConstellation() {
  currentView.value = 'constellation'
  // playSound('back')
}

function handleKeydown(e) {
  if (e.key === 'Escape') {
    if (currentView.value === 'detail') backToConstellation()
    else if (currentView.value === 'constellation') closeDimension()
  }
}

// === Starfield Canvas ===
function initStarfield() {
  const canvas = starCanvas.value
  if (!canvas) return
  const parent = canvas.parentElement
  canvas.width = parent.offsetWidth
  canvas.height = parent.offsetHeight
  const ctx = canvas.getContext('2d')
  const stars = []
  for (let i = 0; i < 120; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.3,
      speed: Math.random() * 0.02 + 0.005,
      phase: Math.random() * Math.PI * 2
    })
  }
  let t = 0
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    stars.forEach(s => {
      const alpha = 0.3 + 0.7 * Math.abs(Math.sin(t * s.speed + s.phase))
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255,255,255,${alpha})`
      ctx.fill()
    })
    t++
    starAnimFrame = requestAnimationFrame(draw)
  }
  draw()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  cancelAnimationFrame(starAnimFrame)
})
</script>

<style scoped>
/* ===== SECTION ===== */
.tech-section {
  position: relative;
  min-height: 600px;
  overflow: hidden;
  padding: 120px 0;
}

.tech-cards-layer {
  position: relative;
  z-index: 2;
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.tech-cards-layer.is-hidden {
  pointer-events: none;
}

/* ===== CARDS GRID ===== */
.tech-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 40px;
}

/* ===== TECH CARD ===== */
.tech-card {
  position: relative;
  background: var(--bg-surface, #ffffff);
  border-radius: 16px;
  padding: 50px 30px;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  border: 1px solid var(--border, rgba(125, 100, 160, 0.1));
  transition: transform 0.4s cubic-bezier(0.25,0.8,0.25,1), box-shadow 0.4s ease, border-color 0.4s ease;
}
.tech-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 15px 50px rgba(0,0,0,0.06);
  border-color: rgba(242, 167, 179, 0.25);
}

/* Front layer */
.tc-icon { font-size: 3rem; }
.tc-icon-svg { width: 3rem; height: 3rem; }
.tc-name { font-size: 1.4rem; font-weight: 800; color: var(--text, #2d2b3a); }

/* Cosmic layer (behind front, revealed on hover) */
.tc-cosmic {
  position: absolute;
  inset: 0;
  background: #1e1a2e;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4;
  border-radius: 20px;
  /* Start fully clipped (hidden) — GSAP will animate clipPath */
  clip-path: polygon(0% 50%, 10% 50%, 20% 50%, 30% 50%, 40% 50%, 50% 50%, 60% 50%, 70% 50%, 80% 50%, 90% 50%, 100% 50%, 100% 50%, 90% 50%, 80% 50%, 70% 50%, 60% 50%, 50% 50%, 40% 50%, 30% 50%, 20% 50%, 10% 50%, 0% 50%);
}
.tc-cosmic-name {
  font-size: 1.8rem;
  font-weight: 900;
  letter-spacing: 2px;
  z-index: 2;
}
.tc-mini-stars {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(1px 1px at 20% 30%, white 50%, transparent 100%),
    radial-gradient(1px 1px at 80% 20%, white 50%, transparent 100%),
    radial-gradient(1.5px 1.5px at 50% 70%, white 50%, transparent 100%),
    radial-gradient(1px 1px at 30% 80%, white 50%, transparent 100%),
    radial-gradient(1px 1px at 70% 50%, white 50%, transparent 100%),
    radial-gradient(1.5px 1.5px at 10% 60%, white 50%, transparent 100%),
    radial-gradient(1px 1px at 90% 85%, white 50%, transparent 100%),
    radial-gradient(1px 1px at 40% 15%, white 50%, transparent 100%),
    radial-gradient(1.5px 1.5px at 60% 45%, white 50%, transparent 100%);
  animation: twinkle-mini 3s ease-in-out infinite alternate;
}

/* On hover: reveal cosmic, hide front */
.tc-front {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

/* ===== SLASH MARKS ===== */
.tc-slashes {
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  overflow: hidden;
  border-radius: 20px;
}
.slash-line-main {
  position: absolute;
  top: 50%;
  left: -10%;
  width: 120%;
  height: 4px;
  background: white;
  transform-origin: center center;
  transform: translateY(-50%) rotate(0deg) scaleX(0);
}
.tech-card.is-hovered .slash-line-main {
  animation: slashStrike 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes slashStrike {
  0% { transform: translateY(-50%) rotate(0deg) scaleX(0); opacity: 0.8; box-shadow: 0 0 5px white; }
  50% { transform: translateY(-50%) rotate(0deg) scaleX(1); opacity: 1; box-shadow: 0 0 20px white, 0 0 40px rgba(100,180,255,0.4); }
  100% { transform: translateY(-50%) rotate(0deg) scaleX(1); opacity: 0; box-shadow: 0 0 0px transparent; }
}

/* ===== IN-SECTION RIFT (GSAP) ===== */
.rift-layer {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
.rift-layer.is-active {
  pointer-events: auto;
}

.rift-void-container {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
}

.jaw-edge {
  width: 100%;
  height: 40px;
  display: block;
}

.jaw-edge-top {
  transform: translateY(1px);
}

.jaw-edge-bottom {
  transform: translateY(-1px);
}

.rift-void {
  width: 100%;
  height: 0px;
  background: #1e1a2e;
  position: relative;
  overflow: hidden;
}

.screen-slash {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, transparent 0%, rgba(200,220,255,0.6) 20%, white 50%, rgba(200,220,255,0.6) 80%, transparent 100%);
  box-shadow: 
    0 0 15px rgba(255,255,255,0.9),
    0 0 40px rgba(100,180,255,0.6),
    0 0 80px rgba(100,180,255,0.3);
  transform: translateY(-50%) scaleX(0);
  transform-origin: center;
  z-index: 20;
  border-radius: 2px;
}

.dim-starfield {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1000px;
  transform: translateY(-50%);
  z-index: 0;
}

/* ===== CONSTELLATION VIEW ===== */
.constellation-view {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  transform: translateY(-50%);
  z-index: 2;
  padding: 40px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
}
.dim-title {
  font-size: 2.8rem;
  font-weight: 900;
  letter-spacing: 3px;
  margin-bottom: 10px;
  animation: fadeInDown 0.5s ease 0.3s both;
  display: flex;
  align-items: center;
}
.dim-icon-svg-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 18px;
}
.dim-icon-svg-wrap-small {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  vertical-align: middle;
}
.dim-hint {
  color: rgba(255,255,255,0.35);
  font-size: 0.85rem;
  margin-top: auto;
  animation: fadeInUp 0.6s ease 0.8s both;
  letter-spacing: 1px;
}

.constellation-svg {
  flex: 1;
  width: 100%;
  max-width: 800px;
  max-height: 450px;
  margin: 10px auto;
}

/* Constellation lines */
.const-line {
  stroke-width: 1.5;
  opacity: 0;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawLine 1s ease forwards;
}

/* Constellation nodes */
.const-node {
  cursor: pointer;
  opacity: 0;
  animation: popIn 0.4s ease forwards;
}
.const-node:hover .node-glow {
  r: 14;
  transition: r 0.3s ease;
}
.const-node:hover .node-label {
  font-size: 15px;
  fill: white !important;
}
.node-core {
  fill: white;
}
.node-glow {
  opacity: 0.4;
  animation: pulseStar 2s ease-in-out infinite alternate;
}
.node-hitarea {
  cursor: pointer;
}
.node-label {
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 700;
  text-anchor: middle;
  transition: all 0.3s ease;
}

/* ===== STAR BACK BUTTON ===== */
.star-back-btn {
  position: absolute;
  top: 30px;
  left: 40px;
  width: 60px;
  height: 60px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1010;
  transition: transform 0.3s ease, filter 0.3s ease;
  padding: 5px;
}
.star-back-btn:hover {
  transform: scale(1.2) rotate(-15deg);
  filter: drop-shadow(0 0 10px rgba(255,255,255,0.5));
}
.star-btn-svg {
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.star-btn-svg polygon {
  fill: rgba(255,255,255,0.15);
  stroke: rgba(255,255,255,0.6);
  stroke-width: 1;
  transition: all 0.3s ease;
}
.star-back-btn:hover .star-btn-svg polygon {
  fill: rgba(255,255,255,0.25);
  stroke: white;
}
.star-btn-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgba(255,255,255,0.8);
  font-size: 1rem;
  pointer-events: none;
}

/* ===== MODULE DETAIL VIEW ===== */
.module-detail-view {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  transform: translateY(-50%);
  z-index: 2;
  padding: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: detailFadeInUp 0.5s ease both;
}
.module-content {
  text-align: center;
  max-width: 600px;
}
.module-title {
  font-size: 2.6rem;
  font-weight: 900;
  letter-spacing: 2px;
  margin-bottom: 20px;
}
.module-divider {
  width: 80px;
  height: 3px;
  margin: 0 auto 30px;
  border-radius: 2px;
  opacity: 0.6;
}
.module-description {
  color: rgba(255,255,255,0.75);
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 30px;
}
.module-parent-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 20px;
  color: rgba(255,255,255,0.5);
  font-size: 0.85rem;
  font-weight: 600;
}

/* ===== RIFT SPARK PARTICLES ===== */
.rift-spark {
  position: absolute;
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
  pointer-events: none;
  z-index: 25;
  box-shadow: 
    0 0 8px rgba(255,255,255,0.9),
    0 0 20px rgba(100,180,255,0.6);
}

/* ===== KEYFRAMES ===== */
@keyframes twinkle-mini {
  0% { opacity: 0.4; }
  100% { opacity: 1; }
}
@keyframes drawLine {
  to { stroke-dashoffset: 0; opacity: 0.7; }
}
@keyframes popIn {
  0% { opacity: 0; transform: scale(0); }
  70% { transform: scale(1.3); }
  100% { opacity: 1; transform: scale(1); }
}
@keyframes pulseStar {
  0% { opacity: 0.3; }
  100% { opacity: 0.6; }
}
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes detailFadeInUp {
  from { opacity: 0; transform: translateY(calc(-50% + 20px)); }
  to { opacity: 1; transform: translateY(-50%); }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .tech-cards-grid { grid-template-columns: 1fr; }
  .dim-title { font-size: 2rem; }
  .constellation-view { padding: 30px 20px; }
  .module-detail-view { padding: 40px 20px; }
  .module-title { font-size: 2rem; }
  .star-back-btn { top: 15px; left: 15px; width: 40px; height: 40px; }
}
</style>
