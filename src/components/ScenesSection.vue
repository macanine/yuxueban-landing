<script setup lang="ts">
import FeatureCard from './FeatureCard.vue'
import SectionHead from './SectionHead.vue'
</script>

<template>
  <section class="block alt" id="scenes">
    <span class="dots-orn br"></span>
    <div class="container">
      <SectionHead eyebrow="Scenarios">
        <template #title>同一个知识库，<span class="hl">多种打开方式</span></template>
        <template #desc>你的闪卡不是终点。<br class="br-m">考试要练的、开口要说的，<br class="br-m">都从同一个库里长出来。</template>
      </SectionHead>
      <div class="grid grid-4">
        <FeatureCard title="雅思机考" text="基于你的素材生成雅思机考模拟题，阅读、听力一一对应，练的就是你积累过的东西。">
          <template #icon>
            <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4" width="19" height="13" rx="2"/><path d="M8 20.5h8M12 17v3.5"/><path d="M8.6 10.6l2.2 2.2 4.4-4.4"/></svg>
          </template>
        </FeatureCard>
        <FeatureCard title="高考阅读" text="教材与真题中的词汇句型自动对齐考纲，生成高考难度递进的阅读训练。">
          <template #icon>
            <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h8l4.5 4.5V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M13.6 3v4.6h4.6"/><path d="M8 12.5h8M8 16.5h5"/></svg>
          </template>
        </FeatureCard>
        <FeatureCard title="情景对话" text="听说向的表达自动变成真实场景对话，Agent 陪你练到脱口而出。">
          <template #icon>
            <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12.5c0 3.6-3.6 6.5-8 6.5-1 0-2-.15-2.9-.42L4.5 20l1.3-3.6C4.6 15.3 4 13.9 4 12.5 4 8.9 7.6 6 12 6s8 2.9 8 6.5Z"/><path d="M9 12h.01M12 12h.01M15 12h.01"/></svg>
          </template>
        </FeatureCard>
        <FeatureCard title="科学复习" text="间隔重复算法自动安排每日闪卡，记住了什么、忘了什么，Agent 比你更清楚。">
          <template #icon>
            <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 12a8.5 8.5 0 0 1 14.3-6.2L20 7.5"/><path d="M20.5 12A8.5 8.5 0 0 1 6.2 18.2L4 16.5"/><path d="M20 3.5v4h-4M4 20.5v-4h4"/></svg>
          </template>
        </FeatureCard>
      </div>
    </div>
  </section>
</template>
