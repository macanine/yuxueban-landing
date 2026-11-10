<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import RavenLogo from './RavenLogo.vue'

/* ============================================================
   首屏产品演示：一段会「自己演」的对话脚本
   截图入库 → 生成闪卡 → PDF 整本解析 → 一键生成雅思模拟题，循环播放。
   · SSR / 无 JS / 减少动态：直接输出完整终态（内容对搜索引擎与读屏可见）
   · 水合后清空重播；离开视口或切到后台时暂停，回来接着演
   ============================================================ */

type Msg =
  | { id: number; kind: 'shot' }
  | { id: number; kind: 'pdf' }
  | { id: number; kind: 'ask' }
  | { id: number; kind: 'typing' }
  | { id: number; kind: 'saved' }
  | { id: number; kind: 'parsed' }
  | { id: number; kind: 'quiz' }

interface Card { id: string; q: string; a: string; src: string; icon: 'x' | 'pdf' | 'video'; fresh?: boolean }

const BASE_CARDS: Card[] = [
  { id: 'hit', q: 'hit different', a: '感觉格外不一样', src: '短视频收藏', icon: 'video' },
  { id: 'lowkey', q: 'low-key', a: '有点儿、悄悄地', src: 'Instagram 评论', icon: 'x' },
]
const CARD_NGL: Card = { id: 'ngl', q: 'not gonna lie (NGL)', a: '说实话 / 不瞒你说', src: 'X · 推文截图', icon: 'x' }
const CARD_EVI: Card = { id: 'evi', q: 'The evidence suggests that…', a: '学术写作高频句式', src: '剑桥雅思 Unit 3', icon: 'pdf' }

const folders = reactive([
  { name: '日常口语', count: 41, bump: false },
  { name: '雅思写作', count: 31, bump: false },
  { name: '短视频', count: 24, bump: false },
  { name: '大学英语', count: 18, bump: false },
])
const activeFolder = ref(0)

/* 终态：SSR 与无动画时展示的完整画面 */
let uid = 100
const finalMsgs = (): Msg[] => [
  { id: 1, kind: 'shot' }, { id: 2, kind: 'saved' },
  { id: 3, kind: 'pdf' }, { id: 4, kind: 'parsed' },
]
const msgs = ref<Msg[]>(finalMsgs())
const cards = ref<Card[]>([CARD_EVI, CARD_NGL, BASE_CARDS[0]])
const weekNew = ref(68)
const playing = ref(false)

const wrapEl = ref<HTMLElement | null>(null)
let io: IntersectionObserver | null = null
let visible = false
let alive = true
let wake: (() => void) | null = null

function canRun() { return visible && !document.hidden }
/* 可暂停的 sleep：时间只在「可见」时流逝 */
async function wait(ms: number) {
  let left = ms
  while (left > 0 && alive) {
    if (!canRun()) { await new Promise<void>((r) => { wake = r }); continue }
    const t0 = performance.now()
    await new Promise((r) => setTimeout(r, Math.min(left, 120)))
    left -= performance.now() - t0
  }
}
function push(kind: Msg['kind']) { msgs.value = [...msgs.value, { id: ++uid, kind } as Msg] }
function replaceTyping(kind: Msg['kind']) {
  msgs.value = msgs.value.filter((m) => m.kind !== 'typing')
  push(kind)
}
function addCard(c: Card) {
  cards.value = [{ ...c, fresh: true }, ...cards.value.filter((x) => x.id !== c.id)].slice(0, 3)
  setTimeout(() => { const f = cards.value.find((x) => x.id === c.id); if (f) f.fresh = false }, 1600)
}
function bumpFolder(i: number, by: number) {
  activeFolder.value = i
  const f = folders[i]
  f.count += by
  f.bump = true
  setTimeout(() => { f.bump = false }, 700)
}
/* 数字滚动（本周新增） */
function tweenWeek(to: number) {
  const from = weekNew.value
  const t0 = performance.now()
  const step = (t: number) => {
    const p = Math.min((t - t0) / 900, 1)
    weekNew.value = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3)))
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

function reset() {
  msgs.value = []
  cards.value = BASE_CARDS.map((c) => ({ ...c }))
  folders[0].count = 41; folders[1].count = 31
  activeFolder.value = 0
  weekNew.value = 24
}

async function play() {
  playing.value = true
  while (alive) {
    reset()
    await wait(700)
    push('shot');            await wait(900)
    push('typing');          await wait(1300)
    replaceTyping('saved');  addCard(CARD_NGL); bumpFolder(0, 1); tweenWeek(25)
    await wait(2600)
    push('pdf');             await wait(1000)
    push('typing');          await wait(1700)
    replaceTyping('parsed'); addCard(CARD_EVI); bumpFolder(1, 43); tweenWeek(68)
    await wait(2600)
    push('ask');             await wait(800)
    push('typing');          await wait(1400)
    replaceTyping('quiz')
    await wait(4200)
  }
}

function onVis() { if (canRun()) { wake?.(); wake = null } }

onMounted(() => {
  const wrap = wrapEl.value
  if (!wrap) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (!('IntersectionObserver' in window)) return
  io = new IntersectionObserver((entries) => {
    visible = entries.some((e) => e.isIntersecting)
    onVis()
  }, { threshold: 0.15 })
  io.observe(wrap)
  document.addEventListener('visibilitychange', onVis)
  play()
})

onUnmounted(() => {
  alive = false
  wake?.()
  io?.disconnect()
  document.removeEventListener('visibilitychange', onVis)
})
</script>

<template>
  <div class="mockup-wrap anim" style="--d:.44s" ref="wrapEl">
    <!-- 渡鸦栖息在窗口上：闪卡飞入腹中口袋，吞下后满足地一蹲、再啄啄屏幕 -->
    <RavenLogo chip class="raven hero-raven" />

    <div class="mockup" :class="{ playing }">
      <div class="mockup-bar">
        <span class="dot r"></span><span class="dot y"></span><span class="dot g"></span>
        <span class="mockup-title">语学伴 — 我的英语知识库</span>
        <span class="mockup-live"><i></i>Agent 在线</span>
      </div>
      <div class="mockup-body">
        <!-- 知识库侧栏 -->
        <aside class="mk-side">
          <div class="mk-side-title">知识库</div>
          <div
            v-for="(f, i) in folders" :key="f.name"
            class="mk-folder" :class="{ on: i === activeFolder }"
          >
            <span class="fd"></span>{{ f.name }}
            <span class="mk-count" :class="{ bump: f.bump }">{{ f.count }}</span>
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
              <span class="ring-num">68%</span>
            </span>
            <span class="txt">今日复习<br>已完成 12 / 18</span>
          </div>
        </aside>

        <!-- 对话：消息从底部长出来，旧消息被推上去 -->
        <div class="chat">
          <TransitionGroup name="msg" tag="div" class="chat-stream">
            <template v-for="m in msgs" :key="m.id">
              <div v-if="m.kind === 'shot'" class="bubble user">
                <span class="attach">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="1.8"/><path d="m21 15-4.5-4.5L6 21"/></svg>
                  推文截图.png
                </span>
                “Not gonna lie, this is a game changer.”
              </div>

              <div v-else-if="m.kind === 'pdf'" class="bubble user">
                <span class="attach">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>
                  剑桥雅思 Unit 3.pdf · 24 页
                </span>
                帮我把这一单元整理一下
              </div>

              <div v-else-if="m.kind === 'ask'" class="bubble user">好，来一套</div>

              <div v-else-if="m.kind === 'typing'" class="bubble agent typing-bubble">
                <span class="typing"><i></i><i></i><i></i></span>
              </div>

              <div v-else-if="m.kind === 'saved'" class="bubble agent">
                <span class="ok">已记一笔</span>
                识别到地道口语 <b>not gonna lie (NGL)</b>——“说实话”，社媒高频缩写。已生成闪卡，归入「日常口语」。
                <div class="tag-row">
                  <span class="tag"># 日常口语</span><span class="tag"># 社媒用语</span><span class="tag"># B1</span>
                </div>
              </div>

              <div v-else-if="m.kind === 'parsed'" class="bubble agent">
                <span class="ok">解析完成</span>
                24 页里提取了 <b>37 个核心词汇</b>和 <b>6 个长难句</b>，全部转成闪卡。要不要基于它们生成一套雅思机考模拟阅读？
              </div>

              <div v-else-if="m.kind === 'quiz'" class="bubble agent">
                <span class="ok">已生成</span>
                雅思阅读 Passage 1 · 13 题，题干全部改写自你的素材。
                <span class="quiz-chip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 4v16l13-8z"/></svg>
                  开始练习
                </span>
              </div>
            </template>
          </TransitionGroup>

          <div class="composer">
            <svg class="clip" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.4 11.6 12 20a5 5 0 0 1-7.1-7.1l8.5-8.5a3.4 3.4 0 0 1 4.8 4.8l-8.5 8.5a1.7 1.7 0 0 1-2.4-2.4l7.8-7.8"/></svg>
            <span>把截图、链接、PDF 扔进来…</span><span class="caret"></span>
            <span class="send">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13M12 5l7 7-7 7"/></svg>
            </span>
          </div>
        </div>

        <!-- 闪卡：新卡从顶部插入并高亮 -->
        <aside class="mk-cards">
          <div class="fc-title">今日闪卡 · 来自你的素材</div>
          <TransitionGroup name="card" tag="div" class="fc-list">
            <div v-for="c in cards" :key="c.id" class="flashcard" :class="{ fresh: c.fresh }">
              <span v-if="c.fresh" class="fc-new">NEW</span>
              <div class="q">{{ c.q }}</div>
              <div class="a">{{ c.a }}</div>
              <div class="src">
                <svg v-if="c.icon === 'pdf'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>
                <svg v-else-if="c.icon === 'video'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m10 9 5 3-5 3z"/></svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="1.8"/><path d="m21 15-4.5-4.5L6 21"/></svg>
                来自 {{ c.src }}
              </div>
            </div>
          </TransitionGroup>
          <div class="mk-more">
            <span>本周新增 <b>{{ weekNew }}</b> 张</span>
            <span>待复习 <b>18</b></span>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>
