<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import SectionHead from './SectionHead.vue'
import StageVisual from './StageVisual.vue'

/* 滚动叙事：左侧三步依次滚过视口中线，右侧吸顶画面随之切换。
   窄屏不吸顶，每一步下方直接内嵌自己的画面。 */
const steps = [
  { t: '随手采集', d: '看到就扔，不用整理。截图、链接、PDF、音视频都扔进同一个入口，Agent 自动识别格式、抓取原文。' },
  { t: '拆解成闪卡', d: '每条素材被拆成最小学习单位：表达、释义、原句语境、来源与难度，一张卡全部带上，随时回溯到出处。' },
  { t: '聚合成练习', d: '按你的目标重新组合：备考就生成机考模拟题，练口语就变成情景对话。练的永远是你亲眼见过的英语。' },
]
const active = ref(0)
const stepEls = ref<HTMLElement[]>([])
let io: IntersectionObserver | null = null

onMounted(() => {
  if (!('IntersectionObserver' in window)) return
  io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) active.value = Number((e.target as HTMLElement).dataset.i)
    }
  }, { rootMargin: '-48% 0px -48% 0px' })
  stepEls.value.forEach((el) => io!.observe(el))
})
onUnmounted(() => io?.disconnect())
</script>

<template>
  <section class="block alt" id="workflow">
    <div class="container">
      <SectionHead eyebrow="Workflow">
        <template #title>三步，从碎片到<span class="hl">体系</span></template>
        <template #desc>采集、拆解、聚合。<br class="br-m">繁琐的事交给 AI Agent，你只管学。</template>
      </SectionHead>

      <div class="story" :style="{ '--p': (active + 1) / steps.length }">
        <ol class="story-steps">
          <li
            v-for="(s, i) in steps" :key="s.t"
            ref="stepEls" :data-i="i"
            class="story-step" :class="{ on: active === i, done: i < active }"
          >
            <span class="story-num">0{{ i + 1 }}</span>
            <h3>{{ s.t }}</h3>
            <p>{{ s.d }}</p>
            <div class="story-inline" aria-hidden="true"><StageVisual :step="i" /></div>
          </li>
        </ol>

        <div class="story-stage" aria-hidden="true">
          <div class="stage-frame">
            <div class="stage-dots">
              <i v-for="(s, i) in steps" :key="s.t" :class="{ on: active === i }"></i>
            </div>
            <div
              v-for="(s, i) in steps" :key="s.t"
              class="stage-layer" :class="{ on: active === i, past: i < active }"
            ><StageVisual :step="i" /></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
