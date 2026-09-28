<script setup lang="ts">
import FeatureCard from './FeatureCard.vue'
import SectionHead from './SectionHead.vue'
</script>

<template>
  <section class="block" id="capture">
    <span class="dots-orn tl"></span>
    <span class="dots-orn br"></span>
    <div class="container">
      <SectionHead eyebrow="Capture">
        <template #title>万物皆可<span class="hl">记一笔</span></template>
        <template #desc>好英语散落在生活的每个角落。<br class="br-m">语学伴帮你随手收进知识库——<br class="br-m">识别、归档、标注，全部交给 AI。</template>
      </SectionHead>
      <div class="grid grid-4">
        <FeatureCard title="社交动态截图" text="刷到的地道表达、生词好句，截图扔进来即可入库，自动附上语境与来源出处。">
          <template #icon>
            <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="2.5"/><circle cx="12" cy="8" r="2.2"/><path d="M9.6 17h4.8"/></svg>
          </template>
        </FeatureCard>
        <FeatureCard title="教材与 PDF" text="大学英语、剑桥雅思……教材 PDF 整本解析，词汇、例句、长难句逐条转为你的学习资产。">
          <template #icon>
            <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6.5C10.5 4.8 8.3 4 5.5 4H3v13h3c2.4 0 4.3.7 6 2.2"/><path d="M12 6.5c1.5-1.7 3.7-2.5 6.5-2.5H21v13h-3c-2.4 0-4.3.7-6 2.2"/><path d="M12 6.5v12.7"/></svg>
          </template>
        </FeatureCard>
        <FeatureCard title="音频与视频" text="Podcast、TED 演讲、影视片段——AI 转写断句、提炼表达，听说素材也能沉淀入库。">
          <template #icon>
            <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2.6" y="13.6" width="4.2" height="6.4" rx="1.6"/><rect x="17.2" y="13.6" width="4.2" height="6.4" rx="1.6"/></svg>
          </template>
        </FeatureCard>
        <FeatureCard title="网页与文章" text="粘贴链接即可全文入库。外刊、博客、论文里的地道用法，一个都不放过。">
          <template #icon>
            <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13.4a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7L11.6 6"/><path d="M14 10.6a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7L12.4 18"/></svg>
          </template>
        </FeatureCard>
      </div>
    </div>
  </section>
</template>
