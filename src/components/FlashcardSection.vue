<script setup lang="ts">
import FlipCard from './FlipCard.vue'
import SectionHead from './SectionHead.vue'
</script>

<template>
  <section class="block" id="cards">
    <span class="dots-orn tl"></span>
    <div class="container">
      <SectionHead eyebrow="Flashcards">
        <template #title>闪卡，是语学伴的<span class="hl">最小单位</span></template>
        <template #desc>任何素材都会被 AI 拆解为带语境的闪卡：正面是表达，背面是释义、例句与来源。</template>
      </SectionHead>
      <div class="flip-hint-wrap reveal" v-reveal>
        <span class="flip-hint">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15.3-6.4L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15.3 6.4L3 16"/><path d="M3 21v-5h5"/></svg>
          悬停或轻点卡片，翻开看看
        </span>
      </div>
      <div class="grid grid-3">
        <FlipCard name="hit different" cat="# 短视频 · B1" mean="感觉格外不一样" foot="🎬 来自短视频收藏 · 已复习 3 次">
          <template #head>hit different</template>
          <template #eg>This song <em>hits different</em> at 2 a.m.</template>
        </FlipCard>

        <FlipCard name="The evidence suggests that" cat="# 雅思写作 · B2" mean="有证据表明……" foot="📄 来自剑桥雅思 Unit 3 · Task 2 可直接套用">
          <template #head>The evidence<br>suggests that…</template>
          <template #eg><em>The evidence suggests that</em> remote work raises output.</template>
        </FlipCard>

        <FlipCard name="not gonna lie" cat="# 日常口语 · B1" mean="说实话 / 不瞒你说" foot="📌 来自 X · 推文截图 · 社媒高频缩写">
          <template #head>not gonna lie<br>(NGL)</template>
          <template #eg><em>NGL</em>, that ending caught me off guard.</template>
        </FlipCard>
      </div>
    </div>
  </section>
</template>
