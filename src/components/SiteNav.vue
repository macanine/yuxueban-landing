<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import RavenLogo from './RavenLogo.vue'

const links = [
  { id: 'capture', label: '采集' },
  { id: 'workflow', label: '工作流' },
  { id: 'cards', label: '闪卡' },
  { id: 'scenes', label: '场景' },
  { id: 'faq', label: '常见问题' },
]

const stuck = ref(false)
const activeId = ref('')
const open = ref(false)
const progressEl = ref<HTMLElement | null>(null)

/* ============ 滚动：进度条 + 吸顶阴影（水印视差已交给 CSS 滚动时间线） ============ */
let rafQueued = false
function onScroll() {
  if (rafQueued) return
  rafQueued = true
  window.requestAnimationFrame(() => {
    const doc = document.documentElement
    const y = window.scrollY || doc.scrollTop
    const max = doc.scrollHeight - window.innerHeight
    if (progressEl.value)
      progressEl.value.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`
    stuck.value = y > 6
    rafQueued = false
  })
}

/* ============ 导航高亮当前板块 ============ */
let spy: IntersectionObserver | null = null
function setupSpy() {
  if (!('IntersectionObserver' in window)) return
  spy = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        activeId.value = (e.target as HTMLElement).id
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  )
  for (const { id } of links) {
    const el = document.getElementById(id)
    if (el) spy.observe(el)
  }
}

/* ============ 移动端折叠菜单 ============ */
function onDocClick(e: MouseEvent) {
  const panel = document.getElementById('navPanel')
  const burger = e.target as HTMLElement
  if (open.value && panel && !panel.contains(burger) && !burger.closest('.nav-burger')) open.value = false
}
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) {
    open.value = false
    document.querySelector<HTMLButtonElement>('.nav-burger')?.focus()
  }
}
function onScrollClose() {
  if (open.value) open.value = false
}
function onResize() {
  if (window.innerWidth > 768 && open.value) open.value = false
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
  setupSpy()
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKeydown)
  /* 点链接后收起，避免锚点跳转后菜单还盖着内容；滚动时同理 */
  window.addEventListener('scroll', onScrollClose, { passive: true })
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  spy?.disconnect()
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKeydown)
  window.removeEventListener('scroll', onScrollClose)
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <nav class="nav" id="nav" :class="{ 'is-stuck': stuck }">
    <div class="container nav-inner">
      <a class="logo" href="#">
        <RavenLogo />
        <span class="wordmark">语学伴<span class="dot">.</span></span>
      </a>
      <div class="nav-links">
        <a
          v-for="l in links" :key="l.id"
          :href="`#${l.id}`"
          :class="{ active: activeId === l.id }"
          :aria-current="activeId === l.id ? 'true' : undefined"
        >{{ l.label }}</a>
      </div>
      <div class="nav-actions">
        <a class="btn-pill-dark" href="#cta">下载 App</a>
        <button
          class="nav-burger" type="button"
          :aria-label="open ? '关闭菜单' : '打开菜单'"
          :aria-expanded="open"
          aria-controls="navPanel"
          @click.stop="open = !open"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
    <div class="nav-panel" id="navPanel" :class="{ open }">
      <a v-for="l in links" :key="l.id" :href="`#${l.id}`">{{ l.label }}</a>
      <a class="btn-pill-dark" href="#cta">下载 App</a>
    </div>
    <span class="nav-progress" ref="progressEl"></span>
  </nav>
</template>
