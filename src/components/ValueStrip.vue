<script setup lang="ts">
/* 核心卖点速览：只放产品事实（与 FAQ 口径一致），不编造用户数据 */
const items = [
  { big: '秒级', unit: '入库', text: '截图、链接扔进来，几秒就是一张带语境的闪卡' },
  { big: '4', unit: '类素材', text: '图片、文档、音视频、网页，一个入口全收' },
  { big: '5–10', unit: '分钟 / 天', text: '间隔重复替你排好复习，碎片时间就够' },
  { big: '仅你', unit: '可见', text: '知识库默认私密，素材不进公共语料' },
]
</script>

<template>
  <section class="values" aria-label="核心卖点">
    <div class="container">
      <ul class="values-grid">
        <li v-for="it in items" :key="it.unit" class="value reveal" v-reveal>
          <div class="value-num"><b>{{ it.big }}</b><span>{{ it.unit }}</span></div>
          <p>{{ it.text }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
