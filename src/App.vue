<script setup lang="ts">
import SiteNav from './components/SiteNav.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <a class="skip-link" href="#hero">跳到主要内容</a>

  <!-- 渡鸦 Logo 渐变定义（全页共用） -->
  <svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="rvBgGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#35D894"/>
        <stop offset="1" stop-color="#00C776"/>
      </linearGradient>
      <linearGradient id="rvBodyGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#FFFFFF"/>
        <stop offset="1" stop-color="#E6FFFA"/>
      </linearGradient>
      <!-- 渡鸦以 RavenLogo 组件多处内联渲染而非 <use> 复用：
           use 的 shadow 树吃不到文档 CSS，眨眼 / 歪头 / 啄这些部件动画会全部失效 -->
    </defs>
  </svg>

  <SiteNav />
  <router-view />
  <SiteFooter />
</template>
