<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import SectionHead from './SectionHead.vue'

/* 同一个知识库 → 四种产出。标签页自动轮播（带进度条），
   用户一旦手动点选就停止自动；悬停 / 离开视口 / 后台时暂停。 */
const tabs = [
  { id: 'ielts', t: '雅思机考', d: '用你积累的素材生成机考模拟题，阅读、听力一一对应。' },
  { id: 'gaokao', t: '高考阅读', d: '教材与真题里的词汇句型对齐考纲，难度循序递进。' },
  { id: 'talk', t: '情景对话', d: '听说类表达变成真实场景对话，AI 陪你练到脱口而出。' },
  { id: 'review', t: '科学复习', d: '间隔重复替你排好每天的卡，记住了什么、该复习什么，一目了然。' },
]
const DURATION = 6500
const cur = ref(0)
const auto = ref(true)
const progress = ref(0)
const rootEl = ref<HTMLElement | null>(null)
const tabEls = ref<HTMLElement[]>([])

let raf = 0
let last = 0
let inView: boolean = false
const hover = ref(false)

function loop(t: number) {
  if (last && auto.value && inView && !hover.value && !document.hidden) {
    progress.value += (t - last) / DURATION
    if (progress.value >= 1) {
      progress.value = 0
      cur.value = (cur.value + 1) % tabs.length
    }
  }
  last = t
  raf = requestAnimationFrame(loop)
}

function pick(i: number, focus = false) {
  cur.value = i
  auto.value = false
  progress.value = 1
  if (focus) tabEls.value[i]?.focus()
}
function onKey(e: KeyboardEvent, i: number) {
  const n = tabs.length
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); pick((i + 1) % n, true) }
  else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); pick((i - 1 + n) % n, true) }
  else if (e.key === 'Home') { e.preventDefault(); pick(0, true) }
  else if (e.key === 'End') { e.preventDefault(); pick(n - 1, true) }
}

let io: IntersectionObserver | null = null
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { auto.value = false; return }
  io = new IntersectionObserver((es) => { inView = es.some((e) => e.isIntersecting) }, { threshold: 0.3 })
  if (rootEl.value) io.observe(rootEl.value)
  raf = requestAnimationFrame(loop)
})
onUnmounted(() => { cancelAnimationFrame(raf); io?.disconnect() })
</script>

<template>
  <section class="block alt" id="scenes">
    <span class="dots-orn br"></span>
    <div class="container">
      <SectionHead eyebrow="Scenarios">
        <template #title>同一个知识库，<span class="hl">多种打开方式</span></template>
        <template #desc>闪卡只是起点，不是终点。<br class="br-m">考试要练的、开口要说的，<br class="br-m">都从你自己的知识库里长出来。</template>
      </SectionHead>

      <div class="scenes reveal" v-reveal ref="rootEl" @pointerenter="hover = true" @pointerleave="hover = false">
        <div class="scene-tabs" role="tablist" aria-label="使用场景">
          <button
            v-for="(t, i) in tabs" :key="t.id"
            ref="tabEls"
            :id="`tab-${t.id}`" class="scene-tab" :class="{ on: cur === i }"
            role="tab" type="button"
            :aria-selected="cur === i" :aria-controls="`panel-${t.id}`" :tabindex="cur === i ? 0 : -1"
            @click="pick(i)" @keydown="onKey($event, i)"
          >
            <span class="st-title">{{ t.t }}</span>
            <span class="st-desc">{{ t.d }}</span>
            <span class="st-bar"><i :style="{ transform: `scaleX(${cur === i ? (auto ? progress : 1) : 0})` }"></i></span>
          </button>
        </div>

        <div class="scene-stage">
          <!-- 雅思机考 -->
          <div id="panel-ielts" class="scene-panel" role="tabpanel" aria-labelledby="tab-ielts" :class="{ on: cur === 0 }" :aria-hidden="cur !== 0">
            <div class="sp-head"><span class="sp-pill">IELTS · Reading</span><span class="sp-meta">Question 4 / 13 · 19:42</span></div>
            <p class="sp-q">According to paragraph B, what does the evidence suggest about remote work?</p>
            <ul class="sp-opts">
              <li><b>A</b>It reduces team communication.</li>
              <li class="right"><b>B</b>It raises overall output.</li>
              <li><b>C</b>It only suits creative jobs.</li>
              <li><b>D</b>It is too new to evaluate.</li>
            </ul>
            <div class="sp-foot"><span class="src-dot"></span>关键句式 “The evidence suggests that…” 来自你的《剑桥雅思 Unit 3》</div>
          </div>

          <!-- 高考阅读 -->
          <div id="panel-gaokao" class="scene-panel" role="tabpanel" aria-labelledby="tab-gaokao" :class="{ on: cur === 1 }" :aria-hidden="cur !== 1">
            <div class="sp-head"><span class="sp-pill">高考 · 完形填空</span><span class="sp-meta">难度 B1 · 对齐考纲</span></div>
            <p class="sp-q sp-cloze">The new reading app turned out to be a real <span class="blank">game changer</span> for our class — not gonna <span class="blank">lie</span>, even the quietest students started joining discussions.</p>
            <div class="sp-chips"><span class="on">game changer</span><span>turning point</span><span class="on">lie</span><span>say</span></div>
            <div class="sp-foot"><span class="src-dot"></span>空格词全部取自你本周收藏的 2 张闪卡</div>
          </div>

          <!-- 情景对话 -->
          <div id="panel-talk" class="scene-panel" role="tabpanel" aria-labelledby="tab-talk" :class="{ on: cur === 2 }" :aria-hidden="cur !== 2">
            <div class="sp-head"><span class="sp-pill">情景 · 音乐节散场后</span><span class="sp-meta">口语陪练</span></div>
            <div class="sp-chat">
              <div class="sc ai">Hey! How was the concert last night?</div>
              <div class="sc me">Honestly? The live version <b>hit different</b>.</div>
              <div class="sc ai">Nice — that's exactly how a native speaker would put it. Want to try a stronger version?</div>
              <div class="sc tip">换个说法：It was <b>on another level</b>.</div>
            </div>
            <div class="sp-foot"><span class="src-dot"></span>对话围绕你收藏的「hit different」展开</div>
          </div>

          <!-- 科学复习 -->
          <div id="panel-review" class="scene-panel" role="tabpanel" aria-labelledby="tab-review" :class="{ on: cur === 3 }" :aria-hidden="cur !== 3">
            <div class="sp-head"><span class="sp-pill">今日复习</span><span class="sp-meta">预计 6 分钟</span></div>
            <ul class="sp-review">
              <li><span>not gonna lie</span><em class="lvl l1">今天</em><i style="--w:.25"></i></li>
              <li><span>The evidence suggests…</span><em class="lvl l2">3 天后</em><i style="--w:.5"></i></li>
              <li><span>hit different</span><em class="lvl l3">7 天后</em><i style="--w:.75"></i></li>
              <li><span>low-key</span><em class="lvl l4">16 天后</em><i style="--w:.95"></i></li>
            </ul>
            <div class="sp-foot"><span class="src-dot"></span>记得越牢，间隔越长——快忘的那一刻再出现</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
