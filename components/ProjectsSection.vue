<template>
  <section id="projects" ref="sectionRef" style="padding: 120px 0;">
    <div class="container">
      <div class="section-header">
        <div class="section-label">Portfolio</div>
        <h2 class="section-title"><span class="num">04 /</span> Projects</h2>
      </div>

      <!-- Filter Tabs -->
      <div class="projects-filter">
        <button 
          v-for="filter in ['All', 'Laravel', 'Nuxt', 'Flutter', 'Others']" 
          :key="filter"
          class="filter-btn"
          :class="{ active: activeFilter === filter }"
          @click="setFilter(filter)"
        >
          {{ filter }}
        </button>
      </div>

      <div class="projects-carousel">
        <!-- Left Arrow -->
        <button
          v-if="totalPages > 1"
          class="page-arrow page-arrow-left"
          :class="{ 'arrow-disabled': currentPage === 0 }"
          @click="changePage(-1)"
        >
          <i class="fa-solid fa-chevron-left"></i>
        </button>

        <!-- Cards Container -->
        <div class="projects-track-wrapper">
          <div class="projects-track" :style="trackStyle">
            <div
              v-for="project in filteredProjects"
              :key="project.id"
              class="project-card-slot"
            >
              <div
                class="project-card"
                :ref="el => setCardRef(project.id, el)"
              >
                <div :class="['project-img', project.bgClass]">
                  <i :class="project.icon"></i>
                </div>
                <div class="project-info">
                  <h3>{{ project.title }}</h3>
                  <div class="project-tech">
                    <span v-for="tech in project.tech" :key="tech">{{ tech }}</span>
                  </div>
                  <p>{{ project.description }}</p>
                  <button
                    class="btn btn-outline project-detail-btn"
                    @click="triggerShatter(project)"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Arrow -->
        <button
          v-if="totalPages > 1"
          class="page-arrow page-arrow-right"
          :class="{ 'arrow-disabled': currentPage === totalPages - 1 }"
          @click="changePage(1)"
        >
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>

    <!-- Shatter + Detail Overlay (teleported to body for full-screen) -->
    <Teleport to="body">
      <div v-if="showDetail" class="project-detail-overlay" ref="detailOverlay">
        <div class="detail-content" ref="detailContent">
          <button class="detail-back-btn" @click="closeDetail">
            <i class="fa-solid fa-arrow-left"></i>
            <span>Back to Projects</span>
          </button>
          <div class="detail-header">
            <div :class="['detail-icon-wrap', activeProject?.bgClass]">
              <i :class="activeProject?.icon"></i>
            </div>
            <h2>{{ activeProject?.title }}</h2>
            <div class="detail-tech">
              <span v-for="tech in activeProject?.tech" :key="tech">{{ tech }}</span>
            </div>
          </div>
          <div class="detail-body">
            <p class="detail-desc">{{ activeProject?.fullDescription }}</p>
            <div class="detail-features">
              <h3><i class="fa-solid fa-star"></i> Key Features</h3>
              <ul>
                <li v-for="feat in activeProject?.features" :key="feat">{{ feat }}</li>
              </ul>
            </div>
            <div v-if="activeProject?.links" class="detail-links">
              <a v-for="link in activeProject.links" :key="link.label" :href="link.url" class="btn btn-primary detail-link-btn">
                <i :class="link.icon"></i> {{ link.label }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed, reactive, onMounted, nextTick, onBeforeUnmount } from 'vue'

/* ───────── Project Data ───────── */
const projects = [
  {
    id: 'warehouse',
    title: 'Web Warehouse System',
    bgClass: 'gudang',
    icon: 'fa-solid fa-boxes-stacked',
    tech: ['Laravel', 'MySQL', 'Blade'],
    description: 'Inventory management web app for tracking incoming/outgoing goods and stock reporting.',
    fullDescription: 'A comprehensive warehouse management system built with Laravel, featuring real-time stock tracking, automated reporting, and multi-warehouse support. The system handles incoming and outgoing goods with full audit trails and role-based access control.',
    features: [
      'Real-time stock level monitoring',
      'Incoming & outgoing goods tracking',
      'Automated stock reports & analytics',
      'Role-based access control',
      'Multi-warehouse support'
    ]
  },
  {
    id: 'library',
    title: 'Digital Library System',
    bgClass: 'perpus',
    icon: 'fa-solid fa-book-open-reader',
    tech: ['Laravel', 'Vue', 'API'],
    description: 'A web-based library information system for borrowing, returning, and searching books.',
    fullDescription: 'A modern digital library system with a Vue.js frontend and Laravel API backend. Features include real-time book search, QR-code based borrowing, automatic due date notifications, and comprehensive admin dashboards for librarians.',
    features: [
      'Real-time book search & filtering',
      'QR-code based borrowing system',
      'Automatic due date notifications',
      'Member management dashboard',
      'Book recommendation engine'
    ]
  },
  {
    id: 'sales',
    title: 'Sales Mobile App',
    bgClass: 'sales',
    icon: 'fa-solid fa-cart-shopping',
    tech: ['Flutter', 'Dart', 'REST API'],
    description: 'Cross-platform mobile app built with Flutter to support field sales team operations.',
    fullDescription: 'A cross-platform mobile application built with Flutter, designed for field sales teams. The app includes offline-first data sync, GPS-based customer visit tracking, real-time order management, and performance analytics dashboards.',
    features: [
      'Offline-first data synchronization',
      'GPS-based customer visit tracking',
      'Real-time order management',
      'Sales performance analytics',
      'Push notification alerts'
    ]
  },
  {
    id: 'school',
    title: 'School Landing Page',
    bgClass: 'school',
    icon: 'fa-solid fa-school',
    tech: ['HTML/CSS', 'JavaScript', 'Responsive'],
    description: 'A modern, informative school profile website designed for promotion and public information.',
    fullDescription: 'A visually stunning, fully responsive school landing page featuring smooth animations, interactive galleries, and optimized SEO. Built with modern web technologies to showcase the school\'s programs, facilities, and achievements.',
    features: [
      'Fully responsive design',
      'Smooth scroll animations',
      'Interactive photo gallery',
      'SEO optimized structure',
      'Contact form integration'
    ]
  }
]

/* ───────── Filtering ───────── */
const activeFilter = ref('All')

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') return projects
  
  return projects.filter(p => {
    if (activeFilter.value === 'Others') {
      return !p.tech.some(t => ['Laravel', 'Nuxt', 'Flutter'].includes(t))
    }
    // Check if the project tech array includes the active filter
    // e.g. "Laravel" matches "Laravel", "Vue" matching "Nuxt" if needed, but exact match for now
    return p.tech.some(t => t.toLowerCase() === activeFilter.value.toLowerCase())
  })
})

function setFilter(filter) {
  activeFilter.value = filter
  currentPage.value = 0 // Reset pagination
}

/* ───────── Pagination ───────── */
const CARDS_PER_PAGE = 3
const currentPage = ref(0)
const totalPages = computed(() => Math.ceil(filteredProjects.value.length / CARDS_PER_PAGE))

const trackStyle = computed(() => ({
  transform: `translateX(-${currentPage.value * 100}%)`,
  transition: 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)'
}))

function changePage(dir) {
  const next = currentPage.value + dir
  if (next >= 0 && next < totalPages.value) {
    currentPage.value = next
  }
}

/* ───────── Card Refs ───────── */
const cardRefs = reactive({})
function setCardRef(id, el) {
  if (el) cardRefs[id] = el
}

/* ───────── Shatter State ───────── */
const showDetail = ref(false)
const activeProject = ref(null)
const isAnimating = ref(false)
let shatterCleanup = null

/* ───────── Shard Generation ───────── */
function generateShardPolygons(w, h) {
  const cols = 4, rows = 3 // Reduced for performance (12 quads = 24 shards)
  const cw = w / cols, ch = h / rows
  const pts = []

  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c <= cols; c++) {
      let x = c * cw, y = r * ch
      if (r > 0 && r < rows && c > 0 && c < cols) {
        x += (Math.random() - 0.5) * cw * 0.7
        y += (Math.random() - 0.5) * ch * 0.7
      }
      pts.push([x, y])
    }
  }

  const shards = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const tl = r * (cols + 1) + c, tr = tl + 1
      const bl = (r + 1) * (cols + 1) + c, br = bl + 1
      if (Math.random() > 0.5) {
        shards.push([pts[tl], pts[tr], pts[br]])
        shards.push([pts[tl], pts[br], pts[bl]])
      } else {
        shards.push([pts[tl], pts[tr], pts[bl]])
        shards.push([pts[tr], pts[br], pts[bl]])
      }
    }
  }
  return shards
}

/* ───────── Shatter Animation ───────── */
async function triggerShatter(project) {
  if (isAnimating.value) return
  isAnimating.value = true
  activeProject.value = project

  // Pause smooth scrolling
  if (window.lenis) window.lenis.stop()

  const cardEl = cardRefs[project.id]
  if (!cardEl) return

  const rect = cardEl.getBoundingClientRect()

  // 1. Create fixed overlay
  const overlay = document.createElement('div')
  overlay.className = 'shatter-fx-overlay'
  document.body.appendChild(overlay)

  // 2. Dark backdrop
  const darkBg = document.createElement('div')
  darkBg.className = 'shatter-darkbg'
  overlay.appendChild(darkBg)

  // 3. Camera wrapper (for zoom effect)
  const camera = document.createElement('div')
  camera.className = 'shatter-camera'
  overlay.appendChild(camera)

  // 4. Flash element
  const flash = document.createElement('div')
  flash.className = 'shatter-flash'
  Object.assign(flash.style, {
    left: rect.left + 'px', top: rect.top + 'px',
    width: rect.width + 'px', height: rect.height + 'px'
  })
  camera.appendChild(flash)

  // 5. Generate shard elements
  const polys = generateShardPolygons(rect.width, rect.height)
  const shardEls = []

  polys.forEach(poly => {
    const el = document.createElement('div')
    el.className = 'shard-piece'

    const clipStr = poly.map(([x, y]) =>
      `${(x / rect.width * 100).toFixed(1)}% ${(y / rect.height * 100).toFixed(1)}%`
    ).join(', ')

    const cx = poly.reduce((s, [x]) => s + x, 0) / poly.length
    const cy = poly.reduce((s, [, y]) => s + y, 0) / poly.length

    // Gradient matching the card's header (Anime Pastel)
    const gradients = {
      gudang: 'linear-gradient(135deg, #8AE9FC, #D2A8FF)',
      perpus: 'linear-gradient(135deg, #D2A8FF, #FF9ECA)',
      sales: 'linear-gradient(135deg, #FFEB94, #FFB1D3)',
      school: 'linear-gradient(135deg, #5AE3F5, #8AE9FC)'
    }

    Object.assign(el.style, {
      left: rect.left + 'px', top: rect.top + 'px',
      width: rect.width + 'px', height: rect.height + 'px',
      clipPath: `polygon(${clipStr})`,
      background: gradients[project.bgClass] || gradients.gudang,
      transformOrigin: `${cx}px ${cy}px`
    })

    camera.appendChild(el)

    // Calculate explosion direction from card center
    const dirX = (cx - rect.width / 2) / rect.width
    const dirY = (cy - rect.height / 2) / rect.height

    shardEls.push({ el, cx, cy, dirX, dirY })
  })

  // 6. Debris particles (Reduced count)
  const particleEls = []
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div')
    p.className = 'shatter-debris'
    const colors = ['#5AE3F5', '#FFB1D3', '#D2A8FF', '#FFEB94', '#fff']
    const size = Math.random() * 4 + 2
    Object.assign(p.style, {
      left: (rect.left + rect.width / 2) + 'px',
      top: (rect.top + rect.height / 2) + 'px',
      width: size + 'px', height: size + 'px',
      background: colors[Math.floor(Math.random() * colors.length)]
    })
    camera.appendChild(p)
    particleEls.push(p)
  }

  // 7. Hide original card
  cardEl.style.visibility = 'hidden'

  // 8. GSAP Timeline
  const gsap = (await import('gsap')).default
  const tl = gsap.timeline()

  // Phase 1: Flash impact
  tl.to(flash, { opacity: 0.9, duration: 0.08, ease: 'power4.in' })
    .to(flash, { opacity: 0, duration: 0.15 })

  // Phase 2: Crack pause (shards visible but together)
  tl.to({}, { duration: 0.15 })

  // Phase 3: Shards explode + dark bg fades in
  tl.to(darkBg, { opacity: 1, duration: 0.8, ease: 'power2.inOut' }, 0.25)

  shardEls.forEach(({ el, dirX, dirY }, i) => {
    const spread = 800 + Math.random() * 600
    const zDist = (Math.random() - 0.2) * 1200
    tl.to(el, {
      x: dirX * spread + (Math.random() - 0.5) * 150,
      y: dirY * spread + (Math.random() - 0.5) * 150,
      z: zDist,
      rotateX: (Math.random() - 0.5) * 120,
      rotateY: (Math.random() - 0.5) * 120,
      rotateZ: (Math.random() - 0.5) * 60,
      opacity: 0,
      duration: 1.2 + Math.random() * 0.3,
      ease: 'expo.out',
      force3D: true
    }, 0.25)
  })

  // Phase 4: Particles burst
  particleEls.forEach(p => {
    tl.to(p, {
      x: (Math.random() - 0.5) * 600,
      y: (Math.random() - 0.5) * 600,
      opacity: 1,
      scale: Math.random() * 2 + 0.5,
      duration: 0.8,
      ease: 'expo.out',
      force3D: true
    }, 0.25)
    tl.to(p, {
      opacity: 0,
      duration: 0.3,
      ease: 'power1.in'
    }, 0.7 + Math.random() * 0.2)
  })

  // Phase 5: Camera zoom forward
  tl.to(camera, {
    scale: 2.2,
    duration: 1.5,
    ease: 'power3.inOut',
    force3D: true
  }, 0.1)

  // Phase 6: Show detail after animation
  tl.call(() => {
    showDetail.value = true
    nextTick(() => {
      const detailEl = document.querySelector('.project-detail-overlay')
      if (detailEl) {
        // detailEl appears instantly to seamlessly take over the dark background
        gsap.set(detailEl, { opacity: 1 })
        
        const contentEl = detailEl.querySelector('.detail-content')
        if (contentEl) {
          gsap.fromTo(contentEl,
            { y: 60, scale: 0.95, opacity: 0 },
            { y: 0, scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.2)', delay: 0.1 }
          )
        }
      }
    })
  }, null, null, 1.2)

  // Cleanup ref
  shatterCleanup = () => {
    tl.kill()
    overlay.remove()
    cardEl.style.visibility = ''
  }

  // Auto-cleanup overlay after animation (keep detail)
  tl.call(() => {
    overlay.remove()
    isAnimating.value = false
  }, null, null, 2.0)
}

/* ───────── Close Detail (reverse) ───────── */
async function closeDetail() {
  const gsap = (await import('gsap')).default
  const detailEl = document.querySelector('.project-detail-overlay')

  if (detailEl) {
    const contentEl = detailEl.querySelector('.detail-content')
    const tl = gsap.timeline({
      onComplete: () => {
        showDetail.value = false
        activeProject.value = null
        isAnimating.value = false
        
        // Resume smooth scrolling
        if (window.lenis) window.lenis.start()

        // Restore card visibility
        Object.values(cardRefs).forEach(el => {
          if (el) el.style.visibility = ''
        })
      }
    })

    if (contentEl) {
      tl.to(contentEl, { y: 40, opacity: 0, scale: 0.96, duration: 0.4, ease: 'power2.in' })
    }
    tl.to(detailEl, { opacity: 0, duration: 0.3, ease: 'power2.in' }, '-=0.15')
  } else {
    showDetail.value = false
    activeProject.value = null
    isAnimating.value = false
    Object.values(cardRefs).forEach(el => {
      if (el) el.style.visibility = ''
    })
  }
}

onBeforeUnmount(() => {
  if (shatterCleanup) shatterCleanup()
})
</script>

<style scoped>
/* ─── Project Card Content ─── */
.project-img {
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: white;
  border-radius: 16px 16px 0 0;
}
.project-img.gudang { background: linear-gradient(135deg, #5a7fff, #a78bfa); }
.project-img.perpus { background: linear-gradient(135deg, #a78bfa, #f472b6); }
.project-img.sales { background: linear-gradient(135deg, #fbbf24, #f472b6); }
.project-img.school { background: linear-gradient(135deg, #34d399, #60a5fa); }

.project-info {
  padding: 22px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.project-info h3 {
  margin-bottom: 10px;
  font-size: 1.05rem;
  color: var(--text, #e8e6f0);
}
.project-info p {
  color: var(--text-dim, #8a8a9a);
  font-size: 0.85rem;
  margin-bottom: 18px;
  flex-grow: 1;
  line-height: 1.6;
}
.project-tech {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}
.project-tech span {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 8px;
  background: rgba(242, 167, 179, 0.1);
  color: var(--secondary, #f2a7b3);
  border: 1px solid rgba(242, 167, 179, 0.15);
}

/* ─── Filter Tabs ─── */
.projects-filter {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 40px;
  flex-wrap: wrap;
  background: var(--bg-surface, #ffffff);
  padding: 6px;
  border-radius: 30px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid var(--border, rgba(125, 100, 160, 0.1));
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}

.filter-btn {
  border: none;
  background: transparent;
  padding: 8px 24px;
  border-radius: 20px;
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--text-dim, #6b6882);
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  color: var(--text, #2d2b3a);
}

.filter-btn.active {
  background: var(--secondary, #f2a7b3);
  color: white;
  box-shadow: 0 4px 15px rgba(242, 167, 179, 0.3);
}

/* ─── Carousel Layout ─── */
.projects-carousel {
  position: relative;
  display: flex;
  align-items: center;
}

.projects-track-wrapper {
  overflow: hidden;
  width: 100%;
  padding: 20px 0;
}

.projects-track {
  display: flex;
  width: 100%;
}

.project-card-slot {
  min-width: calc(100% / 3);
  max-width: calc(100% / 3);
  padding: 0 12px;
  box-sizing: border-box;
}

.project-card {
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  cursor: default;
  background: var(--bg-surface, #ffffff);
  border: 1px solid var(--border, rgba(125, 100, 160, 0.1));
  border-radius: 16px;
  transition: all 0.4s ease;
}
.project-card:hover {
  border-color: rgba(242, 167, 179, 0.2);
  box-shadow: 0 15px 50px rgba(0,0,0,0.06);
  transform: translateY(-4px);
}

.project-detail-btn {
  width: 100%;
  text-align: center;
  font-size: 0.85rem;
  padding: 10px;
  cursor: pointer;
  margin-top: auto;
}

/* ─── Pagination Arrows ─── */
.page-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid var(--border, rgba(125, 100, 160, 0.1));
  background: var(--bg-surface, #ffffff);
  color: var(--text-dim, #6b6882);
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}

.page-arrow:hover:not(.arrow-disabled) {
  background: var(--secondary, #f2a7b3);
  color: white;
  border-color: var(--secondary, #f2a7b3);
  transform: translateY(-50%) scale(1.1);
}

.page-arrow-left {
  left: -60px;
}

.page-arrow-right {
  right: -60px;
}

.arrow-disabled {
  opacity: 0.3;
  cursor: not-allowed;
  pointer-events: none;
}

/* ─── Responsive ─── */
@media (max-width: 1024px) {
  .project-card-slot {
    min-width: 50%;
    max-width: 50%;
  }
  .page-arrow-left { left: -24px; }
  .page-arrow-right { right: -24px; }
}

@media (max-width: 640px) {
  .project-card-slot {
    min-width: 100%;
    max-width: 100%;
  }
  .page-arrow {
    width: 40px;
    height: 40px;
    font-size: 0.9rem;
  }
  .page-arrow-left { left: -10px; }
  .page-arrow-right { right: -10px; }
}
</style>

<style>
/* ═══════ SHATTER EFFECT (global, injected dynamically) ═══════ */
.shatter-fx-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  z-index: 10000;
  pointer-events: none;
  overflow: hidden;
}

.shatter-darkbg {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: radial-gradient(ellipse at center, #0d1117 0%, #070a10 100%);
  opacity: 0;
}

.shatter-camera {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  transform-style: preserve-3d;
  perspective: 1200px;
}

.shatter-flash {
  position: absolute;
  background: radial-gradient(ellipse at center, rgba(255,255,255,0.95), rgba(100,200,255,0.6));
  border-radius: 20px;
  opacity: 0;
  z-index: 20;
  pointer-events: none;
}

.shard-piece {
  position: absolute;
  will-change: transform, opacity;
  backface-visibility: visible;
  /* Removed heavy drop-shadow filters for maximum performance */
  /* filter: drop-shadow(0 0 6px rgba(100, 200, 255, 0.5)) drop-shadow(0 0 2px rgba(255, 255, 255, 0.4)); */
}

.shatter-debris {
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  box-shadow: 0 0 8px currentColor;
}

/* ═══════ PROJECT DETAIL OVERLAY ═══════ */
.project-detail-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  z-index: 10001;
  background: radial-gradient(ellipse at center top, #141922 0%, #0a0e14 50%, #060809 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding: 40px 20px;
}

.detail-content {
  max-width: 680px;
  width: 100%;
  position: relative;
}

.detail-back-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  padding: 10px 22px;
  border-radius: 30px;
  font-family: 'Outfit', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 40px;
}

.detail-back-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  color: white;
  border-color: rgba(255, 255, 255, 0.25);
  transform: translateX(-4px);
}

.detail-header {
  text-align: center;
  margin-bottom: 40px;
}

.detail-icon-wrap {
  width: 90px; height: 90px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  color: white;
  margin: 0 auto 24px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4);
}

.detail-icon-wrap.gudang { background: linear-gradient(135deg, #8AE9FC, #D2A8FF); }
.detail-icon-wrap.perpus { background: linear-gradient(135deg, #D2A8FF, #FF9ECA); }
.detail-icon-wrap.sales { background: linear-gradient(135deg, #FFEB94, #FFB1D3); }
.detail-icon-wrap.school { background: linear-gradient(135deg, #5AE3F5, #8AE9FC); }

.detail-header h2 {
  color: white;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 16px;
}

.detail-tech {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}

.detail-tech span {
  font-size: 0.8rem;
  font-weight: 600;
  padding: 5px 14px;
  border-radius: 20px;
  background: rgba(58, 175, 204, 0.15);
  color: #3AAFCC;
  border: 1px solid rgba(58, 175, 204, 0.2);
}

.detail-body {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  padding: 36px;
  backdrop-filter: blur(10px);
}

.detail-desc {
  color: rgba(255, 255, 255, 0.75);
  font-size: 1.05rem;
  line-height: 1.7;
  margin-bottom: 30px;
}

.detail-features h3 {
  color: white;
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail-features h3 i {
  color: var(--accent);
  font-size: 0.95rem;
}

.detail-features ul {
  list-style: none;
  padding: 0;
}

.detail-features li {
  color: rgba(255, 255, 255, 0.7);
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 12px;
}

.detail-features li::before {
  content: '▹';
  color: var(--primary);
  font-weight: 700;
  font-size: 1.1rem;
}

.detail-features li:last-child {
  border-bottom: none;
}

.detail-links {
  margin-top: 30px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.detail-link-btn {
  font-size: 0.9rem;
  padding: 12px 24px;
}
</style>
