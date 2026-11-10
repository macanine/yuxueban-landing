<script setup lang="ts">
import RavenLogo from './RavenLogo.vue'
</script>

<template>
  <div class="cta-wrap">
  <div class="cta-band reveal" id="cta" v-reveal>
    <RavenLogo class="raven cta-raven" />
    <h2>下一句好英语，<br class="br-m">别再划走了</h2>
    <p>把最近刷到的一张截图扔进来，<br class="br-m">几秒后，它就是一张带语境的闪卡。</p>
    <div class="cta-actions">
      <a class="btn btn-primary" href="#" v-magnetic>✦ 免费开始使用</a>
      <a class="btn btn-ghost" href="#faq">还有疑问？看 FAQ →</a>
    </div>
    <div class="cta-note">iOS · Android · 网页端 · 多端实时同步</div>
  </div>
  </div>
</template>
