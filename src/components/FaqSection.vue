<script setup lang="ts">
import SectionHead from './SectionHead.vue'
</script>

<template>
  <section class="block" id="faq">
    <div class="container">
      <SectionHead eyebrow="FAQ">
        <template #title>你可能想问的<span class="hl">几个问题</span></template>
      </SectionHead>
      <div class="faq reveal" v-reveal>
        <details>
          <summary>语学伴和背单词 App 有什么区别？
            <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          </summary>
          <div class="ans">背单词 App 给你一份别人排好的词表；而语学伴处理的是<b>你自己遇见的英语</b>——刷到的推文、听到的播客、教材里的例句。AI 把这些素材拆成带语境的闪卡，再按你的目标聚合成专属练习，所以你学的永远是真正想用的表达。</div>
        </details>
        <details>
          <summary>什么素材都能扔进去吗？
            <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          </summary>
          <div class="ans">截图、链接、PDF、音视频统统可以。截图走 OCR 文字识别，链接自动抓取正文，PDF 整本解析，播客与视频 AI 转写断句。识别出的表达还会自动标注来源、语境与难度等级。</div>
        </details>
        <details>
          <summary>每天要花多少时间？
            <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          </summary>
          <div class="ans">采集只需几秒，扔进去就好。之后 AI 用间隔重复算法安排复习，每天 <b>5–10 分钟</b> 即可保持手感；冲刺雅思或高考时，还能基于你的语料一键生成成套模拟练习。</div>
        </details>
        <details>
          <summary>我的素材会被别人看到吗？
            <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          </summary>
          <div class="ans">你的知识库<b>默认完全私密</b>。上传的素材仅用于你个人的解析、归档与内容生成，绝不会作为公共语料对外分发。</div>
        </details>
        <details>
          <summary>手机和电脑可以一起用吗？
            <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          </summary>
          <div class="ans">支持 iOS 与 Android，桌面网页端同样可以采集和复习。同一账号下知识库实时云同步——手机上随手采集，回到电脑前继续深度学习。</div>
        </details>
      </div>
    </div>
  </section>
</template>
