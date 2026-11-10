<script setup lang="ts">
import SectionHead from './SectionHead.vue'

const before = [
  '刷到好句子，点个收藏，转头就忘',
  '截图存了几百张，再也没打开过',
  '单词书背到 abandon，开口还是卡壳',
  '平时积累和备考复习，两条线互不相干',
]
const now = [
  '截图、链接、PDF，一扔就入库',
  '每条自动带上来源、语境与难度',
  'AI 按你的目标聚合成专属练习',
  '练的都是你亲眼见过、真心想用的表达',
]
</script>

<template>
  <section class="block night" id="compare">
    <div class="container">
      <SectionHead eyebrow="Compare">
        <template #title>换一种方式<span class="hl">积累英语</span></template>
        <template #desc>同样的碎片时间，一种只是划过，<br class="br-m">一种沉淀成你真正能用的语料库。</template>
      </SectionHead>
      <div class="cmp">
        <div class="cmp-col before reveal" v-reveal>
          <div class="cmp-head">
            <span class="cmp-badge" aria-hidden="true">×</span>
            <h3>只是刷到</h3>
          </div>
          <ul class="cmp-list">
            <li v-for="item in before" :key="item"><span class="mk" aria-hidden="true">×</span>{{ item }}</li>
          </ul>
        </div>
        <div class="cmp-col now reveal" v-reveal>
          <div class="cmp-head">
            <span class="cmp-badge" aria-hidden="true">✓</span>
            <h3>扔进语学伴</h3>
          </div>
          <ul class="cmp-list">
            <li v-for="item in now" :key="item"><span class="mk" aria-hidden="true">✓</span>{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
