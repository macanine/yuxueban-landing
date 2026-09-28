<script setup lang="ts">
import SectionHead from './SectionHead.vue'

const before = [
  '刷到好句子，点赞收藏，转头就忘',
  '截图堆在相册里，再也没打开过',
  '单词书从 A 背到 abandon，开口还是卡住',
  '素材是素材，考试是考试，两不相干',
]
const now = [
  '截图、链接、PDF 扔进来就算记完一笔',
  '每条都带来源、语境与难度标签',
  'Agent 按你的目标重新聚合成练习',
  '练的永远是你见过、想用的表达',
]
</script>

<template>
  <section class="block" id="compare">
    <div class="container">
      <SectionHead eyebrow="Compare">
        <template #title>换一种方式<span class="hl">积累英语</span></template>
        <template #desc>同样的碎片时间，一个只是划过，<br class="br-m">一个变成你自己的语料。</template>
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
            <h3>记一笔，变成自己的语料</h3>
          </div>
          <ul class="cmp-list">
            <li v-for="item in now" :key="item"><span class="mk" aria-hidden="true">✓</span>{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
