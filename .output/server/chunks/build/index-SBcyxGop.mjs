import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'vue-router';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main$6 = {
  __name: "AppHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const isScrolled = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: { scrolled: isScrolled.value }
      }, _attrs))} data-v-c0e5287b><div class="container nav-container" data-v-c0e5287b><a href="#" class="logo" data-v-c0e5287b><i class="fa-solid fa-star" style="${ssrRenderStyle({ "color": "var(--accent)" })}" data-v-c0e5287b></i> Kenesa<span data-v-c0e5287b>Ren</span></a><ul class="nav-links" data-v-c0e5287b><li data-v-c0e5287b><a href="#home" data-v-c0e5287b>Home</a></li><li data-v-c0e5287b><a href="#services" data-v-c0e5287b>Services</a></li><li data-v-c0e5287b><a href="#experience" data-v-c0e5287b>Experience</a></li><li data-v-c0e5287b><a href="#skills" data-v-c0e5287b>Skills</a></li><li data-v-c0e5287b><a href="#projects" data-v-c0e5287b>Projects</a></li></ul><a href="#projects" class="btn btn-primary" style="${ssrRenderStyle({ "padding": "10px 22px", "font-size": "0.85rem" })}" data-v-c0e5287b><i class="fa-solid fa-rocket" data-v-c0e5287b></i>\xA0 Explore </a></div></header>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppHeader.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-c0e5287b"]]);
const _imports_0 = publicAssetsURL("/hero_avatar.png");
const _sfc_main$5 = {
  __name: "HeroSection",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "home",
        class: "hero"
      }, _attrs))} data-v-0297f5ef><div class="deco-ring" style="${ssrRenderStyle({ "width": "350px", "height": "350px", "top": "10%", "right": "-80px" })}" data-v-0297f5ef></div><div class="deco-ring" style="${ssrRenderStyle({ "width": "200px", "height": "200px", "bottom": "20%", "left": "-60px", "animation-direction": "reverse", "border-color": "rgba(255,126,95,0.06)" })}" data-v-0297f5ef></div><div class="container hero-content" data-v-0297f5ef><div class="hero-text reveal-target" data-v-0297f5ef><p class="greeting" data-v-0297f5ef>\u2726 Fullstack Developer \u2726</p><h1 data-v-0297f5ef>Hi, I&#39;m <span class="highlight" data-v-0297f5ef>Fa&#39;iq Halul</span><br data-v-0297f5ef>Danendra</h1><p data-v-0297f5ef>Also known as <strong style="${ssrRenderStyle({ "color": "var(--primary)" })}" data-v-0297f5ef>Kenesa Ren</strong>. A passionate Fresh Graduate from Indonesia specializing in Fullstack Web &amp; Mobile Development.</p><div class="hero-btns" data-v-0297f5ef><a href="#projects" class="btn btn-primary" data-v-0297f5ef><i class="fa-solid fa-folder-open" data-v-0297f5ef></i>\xA0 View Projects </a><a href="#" class="btn btn-outline" data-v-0297f5ef><i class="fa-solid fa-envelope" data-v-0297f5ef></i>\xA0 Contact Me </a></div><div class="hero-socials" data-v-0297f5ef><a href="#" data-v-0297f5ef><i class="fa-brands fa-linkedin-in" data-v-0297f5ef></i></a><a href="#" data-v-0297f5ef><i class="fa-brands fa-github" data-v-0297f5ef></i></a><a href="#" data-v-0297f5ef><i class="fa-brands fa-instagram" data-v-0297f5ef></i></a></div></div><div class="hero-image reveal-target" data-v-0297f5ef><div class="hero-glow" data-v-0297f5ef></div><img${ssrRenderAttr("src", _imports_0)} alt="Kenesa Ren" data-v-0297f5ef><div class="float-badge badge-1" data-v-0297f5ef><i class="fa-brands fa-laravel" data-v-0297f5ef></i> Laravel</div><div class="float-badge badge-2" data-v-0297f5ef><i class="fa-brands fa-vuejs" data-v-0297f5ef></i> Nuxt</div><div class="float-badge badge-3" data-v-0297f5ef><i class="fa-solid fa-mobile" data-v-0297f5ef></i> Flutter</div></div></div></section>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeroSection.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-0297f5ef"]]);
const _sfc_main$4 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({
    id: "services",
    class: "section-alt"
  }, _attrs))}><div class="container"><h2 class="section-title">What I Do</h2><p class="section-subtitle">Building digital solutions from front to back</p><div class="services-grid"><div class="card service-card reveal-target"><div class="service-icon teal"><i class="fa-brands fa-laravel"></i></div><h3>Fullstack Web</h3><p style="${ssrRenderStyle({ "color": "var(--text-mid)", "font-size": "0.9rem", "margin-top": "10px" })}">Complete web applications \u2014 frontend, API, and backend \u2014 built with the Laravel ecosystem.</p></div><div class="card service-card reveal-target"><div class="service-icon purple"><i class="fa-brands fa-vuejs"></i></div><h3>Frontend Development</h3><p style="${ssrRenderStyle({ "color": "var(--text-mid)", "font-size": "0.9rem", "margin-top": "10px" })}">Interactive, fast, and responsive user interfaces built with Nuxt.js and Vue.js.</p></div><div class="card service-card reveal-target"><div class="service-icon coral"><i class="fa-solid fa-mobile-screen"></i></div><h3>Mobile Development</h3><p style="${ssrRenderStyle({ "color": "var(--text-mid)", "font-size": "0.9rem", "margin-top": "10px" })}">High-performance cross-platform mobile apps for Android &amp; iOS using Flutter.</p></div></div></div></section>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ServicesSection.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$3]]);
const _sfc_main$3 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({
    id: "experience",
    class: "bg-dark"
  }, _attrs))}><div class="container"><h2 class="section-title">Work Experience</h2><p class="section-subtitle">Companies I&#39;ve contributed to</p><div class="timeline"><div class="timeline-item reveal-target"><div class="timeline-dot"></div><div class="card card-dark"><div class="timeline-date"><i class="fa-solid fa-clock"></i> 4 Months</div><h3 style="${ssrRenderStyle({ "margin-bottom": "12px" })}">PT Alpha Cipta Teknologi</h3><p style="${ssrRenderStyle({ "margin-bottom": "10px" })}"><strong style="${ssrRenderStyle({ "color": "var(--primary)" })}">Konimex National App \u2014 Maintenance &amp; Feature Updates</strong><br> Maintained and added new features to a nationally-deployed application for Konimex.</p><p><strong style="${ssrRenderStyle({ "color": "var(--accent2)" })}">Orphanage Management System</strong><br> Developed an information management system for orphanage operations.</p></div></div><div class="timeline-item reveal-target"><div class="timeline-dot"></div><div class="card card-dark"><div class="timeline-date"><i class="fa-solid fa-clock"></i> 2 Months</div><h3 style="${ssrRenderStyle({ "margin-bottom": "12px" })}">Asabri</h3><p><strong style="${ssrRenderStyle({ "color": "var(--accent3)" })}">Web-based Warehouse System</strong><br> Built an inventory &amp; warehouse management system for digital tracking and reporting.</p></div></div></div></div></section>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ExperienceSection.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$2 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({
    id: "skills",
    class: "bg-warm"
  }, _attrs))}><div class="container"><h2 class="section-title">Tech Stack</h2><p class="section-subtitle">Technologies in my arsenal</p><div class="skills-grid"><div class="card skill-category reveal-target"><h3><i class="fa-brands fa-laravel"></i> Laravel</h3><div class="skill-tags"><span class="skill-tag">Fullstack</span><span class="skill-tag">RESTful API</span><span class="skill-tag">Backend</span><span class="skill-tag">Blade</span><span class="skill-tag">Eloquent ORM</span></div></div><div class="card skill-category reveal-target"><h3><i class="fa-brands fa-vuejs"></i> Nuxt.js</h3><div class="skill-tags"><span class="skill-tag">Frontend UI</span><span class="skill-tag">Vue.js</span><span class="skill-tag">State Management</span><span class="skill-tag">Responsive Design</span></div></div><div class="card skill-category reveal-target"><h3><i class="fa-solid fa-mobile"></i> Flutter</h3><div class="skill-tags"><span class="skill-tag">Android</span><span class="skill-tag">Cross-platform</span><span class="skill-tag">Dart</span><span class="skill-tag">UI Animation</span></div></div></div></div></section>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SkillsSection.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({ id: "projects" }, _attrs))}><div class="container"><h2 class="section-title">Projects</h2><p class="section-subtitle">Some things I&#39;ve built</p><div class="projects-grid"><div class="card project-card reveal-target"><div class="project-img gudang"><i class="fa-solid fa-boxes-stacked"></i></div><div class="project-info"><h3>Web Warehouse System</h3><div class="project-tech"><span>Laravel</span><span>MySQL</span><span>Blade</span></div><p>Inventory management web app for tracking incoming/outgoing goods and stock reporting.</p><a href="#" class="btn btn-outline" style="${ssrRenderStyle({ "width": "100%", "text-align": "center", "font-size": "0.85rem", "padding": "10px" })}">View Details</a></div></div><div class="card project-card reveal-target"><div class="project-img perpus"><i class="fa-solid fa-book-open-reader"></i></div><div class="project-info"><h3>Digital Library System</h3><div class="project-tech"><span>Laravel</span><span>Vue</span><span>API</span></div><p>A web-based library information system for borrowing, returning, and searching books.</p><a href="#" class="btn btn-outline" style="${ssrRenderStyle({ "width": "100%", "text-align": "center", "font-size": "0.85rem", "padding": "10px" })}">View Details</a></div></div><div class="card project-card reveal-target"><div class="project-img sales"><i class="fa-solid fa-cart-shopping"></i></div><div class="project-info"><h3>Sales Mobile App</h3><div class="project-tech"><span>Flutter</span><span>Dart</span><span>REST API</span></div><p>Cross-platform mobile app built with Flutter to support field sales team operations.</p><a href="#" class="btn btn-outline" style="${ssrRenderStyle({ "width": "100%", "text-align": "center", "font-size": "0.85rem", "padding": "10px" })}">View Details</a></div></div><div class="card project-card reveal-target"><div class="project-img school"><i class="fa-solid fa-school"></i></div><div class="project-info"><h3>School Landing Page</h3><div class="project-tech"><span>HTML/CSS</span><span>JavaScript</span><span>Responsive</span></div><p>A modern, informative school profile website designed for promotion and public information.</p><a href="#" class="btn btn-outline" style="${ssrRenderStyle({ "width": "100%", "text-align": "center", "font-size": "0.85rem", "padding": "10px" })}">View Details</a></div></div></div></div></section>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProjectsSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppHeader = __nuxt_component_0;
      const _component_HeroSection = __nuxt_component_1;
      const _component_ServicesSection = __nuxt_component_2;
      const _component_ExperienceSection = __nuxt_component_3;
      const _component_SkillsSection = __nuxt_component_4;
      const _component_ProjectsSection = __nuxt_component_5;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="particles"></div>`);
      _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
      _push(`<main>`);
      _push(ssrRenderComponent(_component_HeroSection, null, null, _parent));
      _push(`<div class="wave-divider wave-from-white"><svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path fill="#3AAFCC" d="M0,40 C360,120 1080,0 1440,80 L1440,120 L0,120 Z"></path></svg></div><div class="bg-teal"><div class="container stats-strip reveal-target"><div class="stat-item"><span class="stat-num">2</span><span class="stat-label">Companies</span></div><div class="stat-item"><span class="stat-num">4+</span><span class="stat-label">Projects</span></div><div class="stat-item"><span class="stat-num">6+</span><span class="stat-label">Months Exp</span></div><div class="stat-item"><span class="stat-num">3</span><span class="stat-label">Frameworks</span></div></div></div><div class="wave-divider wave-from-teal"><svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path fill="#FFFFFF" d="M0,40 C240,120 480,0 720,60 C960,120 1200,20 1440,80 L1440,120 L0,120 Z"></path></svg></div>`);
      _push(ssrRenderComponent(_component_ServicesSection, null, null, _parent));
      _push(`<div class="wave-divider wave-from-white"><svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path fill="#1A1D2E" d="M0,60 C320,120 720,0 1080,80 C1260,110 1380,60 1440,40 L1440,120 L0,120 Z"></path></svg></div>`);
      _push(ssrRenderComponent(_component_ExperienceSection, null, null, _parent));
      _push(`<div class="wave-divider wave-from-dark"><svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path fill="#FFF5ED" d="M0,40 C480,120 960,0 1440,80 L1440,120 L0,120 Z"></path></svg></div>`);
      _push(ssrRenderComponent(_component_SkillsSection, null, null, _parent));
      _push(`<div class="wave-divider wave-from-warm"><svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path fill="#FFFFFF" d="M0,50 C360,120 720,10 1080,70 C1260,100 1380,40 1440,60 L1440,120 L0,120 Z"></path></svg></div>`);
      _push(ssrRenderComponent(_component_ProjectsSection, null, null, _parent));
      _push(`<div class="wave-divider wave-from-white"><svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path fill="#1A1D2E" d="M0,80 C360,0 720,120 1080,40 C1260,10 1380,60 1440,20 L1440,120 L0,120 Z"></path></svg></div><div class="cta-section"><h2 class="section-title" style="${ssrRenderStyle({ "color": "white" })}">Let&#39;s Work Together</h2><p>Have a project in mind? I&#39;d love to hear about it. Let&#39;s build something great.</p><div style="${ssrRenderStyle({ "display": "flex", "gap": "15px", "justify-content": "center", "flex-wrap": "wrap" })}"><a href="#" class="btn btn-white"><i class="fa-solid fa-paper-plane"></i>\xA0 Get In Touch</a><a href="#" class="btn btn-outline-light"><i class="fa-solid fa-download"></i>\xA0 Download CV</a></div></div></main><footer class="site-footer"><p>\xA9 2026 Kenesa Ren (Fa&#39;iq Halul Danendra). All Rights Reserved.</p></footer></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-SBcyxGop.mjs.map
