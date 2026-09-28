<script setup lang="ts">
import SectionHead from './SectionHead.vue'

const before = [
  '刷到好句子，点赞收藏，转头就忘',
  '截图存了一堆，再也没打开过',
  '单词书从 A 背到 abandon，开口依然卡住',
  '素材归素材，考试归考试，两不沾边',
]
const now = [
  '截图、链接、PDF 一扔即入库',
  '每条自动带来源、语境与难度标签',
  'AI 按你的目标聚合成专属练习',
  '练的永远是你亲眼见过、真正想用的表达',
]
</script>

<template>
  <section class="block" id="compare">
    <div class="container">
      <SectionHead eyebrow="Compare">
        <template #title>换一种方式<span class="hl">积累英语</span></template>
        <template #desc>同样的碎片时间，一个只是划过，<br class="br-m">一个变成你真正能用的语料库。</template>
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
            <h3>一键入库，变成自己的语料</h3>
          </div>
          <ul class="cmp-list">
            <li v-for="item in now" :key="item"><span class="mk" aria-hidden="true">✓</span>{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
