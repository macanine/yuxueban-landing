<script setup lang="ts">
import RavenLogo from './RavenLogo.vue'

const productLinks = [
  { label: '采集能力', href: '#capture' },
  { label: '工作流', href: '#workflow' },
  { label: '闪卡', href: '#cards' },
  { label: '使用场景', href: '#scenes' },
]
const learnLinks = [
  { label: '方式对比', href: '#compare' },
  { label: '常见问题', href: '#faq' },
  { label: '产品理念', href: '#quote' },
  { label: '下载 App', href: '#cta' },
]
</script>

<template>
  <footer>
    <div class="container">
      <div class="foot-top">
        <div class="foot-brand">
          <a class="logo" href="#">
            <RavenLogo />
            <span class="wordmark">语学伴<span class="dot">.</span></span>
          </a>
          <p>把刷到的好英语，变成你自己的知识库。截图、链接、PDF 随手一扔，AI 负责识别、拆解与聚合。</p>
        </div>
        <nav class="foot-cols" aria-label="页脚导航">
          <div class="foot-col">
            <h4>产品</h4>
            <a v-for="l in productLinks" :key="l.href" :href="l.href">{{ l.label }}</a>
          </div>
          <div class="foot-col">
            <h4>了解</h4>
            <a v-for="l in learnLinks" :key="l.href" :href="l.href">{{ l.label }}</a>
          </div>
        </nav>
      </div>
      <div class="foot-bottom">
        <div class="copyright">© 2026 语学伴 · 用 AI 重新定义英语学习</div>
        <a class="to-top" href="#hero">回到顶部
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
        </a>
      </div>
    </div>
  </footer>
</template>
