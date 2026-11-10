<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import AppMockup from './AppMockup.vue'
import SourceMarquee from './SourceMarquee.vue'
import { useRotator } from '../composables/useRotator'

const words = ['YouTube', 'Podcast', 'TED Talk', '雅思真题', '外刊精读']
const rotEl = ref<HTMLElement | null>(null)
const { current, leaving } = useRotator(rotEl, words)

/* ============ 光标跟随柔光 ============ */
const heroEl = ref<HTMLElement | null>(null)
const glowEl = ref<HTMLElement | null>(null)
let cleanup: (() => void) | null = null

onMounted(() => {
  const hero = heroEl.value
  const glow = glowEl.value
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!hero || !glow || !fine || reduce) return

  let x = 0
  let y = 0
  let queued = false
  const move = (e: PointerEvent) => {
    x = e.clientX
    y = e.clientY
    if (queued) return
    queued = true
    window.requestAnimationFrame(() => {
      queued = false
      const r = hero.getBoundingClientRect()
      /* 固定尺寸圆斑用 transform 跟手（纯合成层移动），
         不改背景位置——否则鼠标每动一帧都要重绘整个 hero */
      glow.style.setProperty('--gx', `${x - r.left}px`)
      glow.style.setProperty('--gy', `${y - r.top}px`)
    })
  }
  hero.addEventListener('pointermove', move)
  cleanup = () => hero.removeEventListener('pointermove', move)
})

onUnmounted(() => cleanup?.())
</script>

<template>
  <header class="hero" id="hero" ref="heroEl">
    <span class="hero-glow" ref="glowEl"></span>
    <div class="watermark" aria-hidden="true">语学伴<span class="wm-green">▸</span></div>

    <div class="container hero-inner">
      <div class="anim" style="--d:.05s">
        <div class="hero-badge"><span class="pulse"></span>AI Agent 驱动的英语知识库</div>
      </div>

      <div class="anim" style="--d:.14s">
        <h1 class="hero-title">
          <span class="title-line">
            <span class="brand">语学伴<span class="arrow" aria-hidden="true">▸</span></span>
            <span class="lead">陪你学</span>
          </span>
          <span class="title-line">
            <!-- 轮播词条读屏会串成一片，整体隐藏，另给一句可读的替代文本 -->
            <span class="rotator" ref="rotEl" aria-hidden="true">
              <span
                v-for="(w, i) in words" :key="w"
                class="rot-item"
                :class="{ 'is-in': i === current, 'is-out': i === leaving }"
              >{{ w }}</span>
            </span>
            <span class="sr-only">{{ words.join('、') }}</span>
          </span>
        </h1>
      </div>

      <div class="anim" style="--d:.24s">
        <p class="sub">刷到的、听到的、读到的好英语，<br class="br-m">随手一扔就入库。<br>AI 把每一句拆成带语境的闪卡，<br class="br-m">再按你的目标练成真本事。</p>
      </div>
      <div class="anim hero-actions" style="--d:.34s">
        <a class="btn btn-primary" href="#cta" v-magnetic>✦ 免费开始使用</a>
        <a class="btn btn-outline" href="#workflow">看它怎么工作 →</a>
      </div>
      <div class="anim hero-note" style="--d:.42s">
        <span>截图 · 链接 · PDF · 音视频</span><i class="sep"></i>
        <span>自动标注语境与来源</span><i class="sep"></i>
        <span>知识库默认私密</span>
      </div>
    </div>

    <AppMockup />
    <SourceMarquee />
  </header>
</template>
