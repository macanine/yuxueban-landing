<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import RavenLogo from './RavenLogo.vue'

const folders = [
  { name: '日常口语', count: 42, on: true },
  { name: '雅思写作', count: 31, on: false },
  { name: '短视频', count: 24, on: false },
  { name: '大学英语', count: 18, on: false },
]
const cards = [
  { q: 'not gonna lie (NGL)', a: '说实话 / 不瞒你说', src: '📌 来自 X · 推文截图' },
  { q: 'The evidence suggests that…', a: '学术写作高频句式', src: '📄 来自剑桥雅思 Unit 3' },
  { q: 'hit different', a: '感觉格外不一样', src: '🎬 来自短视频收藏' },
]

const wrapEl = ref<HTMLElement | null>(null)
const countersGo = ref(false)
let io: IntersectionObserver | null = null
let raf = 0

function countUp(el: HTMLElement) {
  const end = Number.parseInt(el.dataset.count ?? '0', 10) || 0
  let t0: number | null = null
  const step = (t: number) => {
    if (t0 === null) t0 = t
    let p = Math.min((t - t0) / 1100, 1)
    p = 1 - Math.pow(1 - p, 3) /* easeOutCubic */
    el.textContent = String(Math.round(end * p))
    if (p < 1) raf = requestAnimationFrame(step)
  }
  raf = requestAnimationFrame(step)
}

onMounted(() => {
  const wrap = wrapEl.value
  if (!wrap) return
  /* 减少动态时数字保持最终值，不做滚动动画 */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const nums = Array.from(wrap.querySelectorAll<HTMLElement>('[data-count]'))
  const ring = wrap.querySelector<SVGElement>('.ring-fg')

  const go = () => {
    nums.forEach(countUp)
    if (ring) {
      /* 先归零再放回 CSS 定义的终值（31），靠 transition 扫出弧线 */
      ring.style.strokeDashoffset = '97.4'
      void ring.getBoundingClientRect()
      ring.style.strokeDashoffset = ''
    }
    countersGo.value = true
  }

  if (!('IntersectionObserver' in window)) {
    nums.forEach(countUp)
    return
  }
  io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io?.disconnect()
        go()
      }
    },
    { threshold: 0.2 },
  )
  io.observe(wrap)
})

onUnmounted(() => {
  io?.disconnect()
  cancelAnimationFrame(raf)
})
</script>

<template>
  <div class="mockup-wrap anim" style="--d:.44s" ref="wrapEl" :class="{ 'counters-go': countersGo }">
    <!-- 渡鸦栖息在窗口上：闪卡飞入腹中口袋，吞下后满足地一蹲、再啄啄屏幕 -->
    <RavenLogo chip class="raven hero-raven" />

    <div class="mockup">
      <div class="mockup-bar">
        <span class="dot r"></span><span class="dot y"></span><span class="dot g"></span>
        <span class="mockup-title">语学伴 — 我的英语知识库</span>
      </div>
      <div class="mockup-body">
        <!-- 知识库侧栏 -->
        <aside class="mk-side">
          <div class="mk-side-title">知识库</div>
          <div v-for="f in folders" :key="f.name" class="mk-folder" :class="{ on: f.on }">
            <span class="fd"></span>{{ f.name }}
            <span class="mk-count" :data-count="f.count">{{ f.count }}</span>
          </div>
          <div class="mk-progress">
            <span class="ring">
              <svg width="38" height="38" viewBox="0 0 38 38">
                <circle cx="19" cy="19" r="15.5" fill="none" stroke="#EAEAEA" stroke-width="4"/>
                <circle
                  class="ring-fg" cx="19" cy="19" r="15.5" fill="none" stroke="#00C776" stroke-width="4"
                  stroke-linecap="round" stroke-dasharray="97.4" stroke-dashoffset="31"
                />
              </svg>
              <span class="ring-num"><span data-count="68">68</span>%</span>
            </span>
            <span class="txt">今日复习<br>已完成 <span data-count="12">12</span> / <span data-count="18">18</span></span>
          </div>
        </aside>

        <!-- 对话 -->
        <div class="chat">
          <div class="bubble user">📷 [截图] 刷到的一条推文：“Not gonna lie, this is a game changer.”</div>
          <div class="bubble agent">
            已记一笔 ✅ 识别到地道口语表达 <b>“not gonna lie (NGL)”</b>——“说实话”，社媒高频缩写。已生成闪卡，归入「日常口语」。
            <div class="tag-row">
              <span class="tag"># 日常口语</span><span class="tag"># 社媒用语</span><span class="tag"># B1</span>
            </div>
          </div>
          <div class="bubble user">📄 [上传] 剑桥雅思教材 Unit 3 的 PDF</div>
          <div class="bubble agent">
            已解析 24 页 ✅ 提取 37 个核心词汇与 6 个长难句，全部转为闪卡碎片。要不要我基于它们生成一套<b>雅思机考模拟阅读</b>？
          </div>
          <div class="bubble agent"><span class="typing"><i></i><i></i><i></i></span></div>
          <div class="composer">
            <svg class="clip" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.4 11.6 12 20a5 5 0 0 1-7.1-7.1l8.5-8.5a3.4 3.4 0 0 1 4.8 4.8l-8.5 8.5a1.7 1.7 0 0 1-2.4-2.4l7.8-7.8"/></svg>
            <span>把截图、链接、PDF 扔进来…</span><span class="caret"></span>
            <span class="send">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13M12 5l7 7-7 7"/></svg>
            </span>
          </div>
        </div>

        <!-- 闪卡 -->
        <aside class="mk-cards">
          <div class="fc-title">今日闪卡 · 来自你的素材</div>
          <div v-for="c in cards" :key="c.q" class="flashcard">
            <div class="q">{{ c.q }}</div>
            <div class="a">{{ c.a }}</div>
            <div class="src">{{ c.src }}</div>
          </div>
          <div class="mk-more">
            <span>本周新增 <b data-count="68">68</b> 张</span>
            <span>待复习 <b data-count="18">18</b></span>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>
