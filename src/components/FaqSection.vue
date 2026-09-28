<script setup lang="ts">
import SectionHead from './SectionHead.vue'
</script>

<template>
  <section class="block alt" id="faq">
    <div class="container">
      <SectionHead eyebrow="FAQ">
        <template #title>你可能想问的<span class="hl">几个问题</span></template>
      </SectionHead>
      <div class="faq reveal" v-reveal>
        <details>
          <summary>语学伴和背单词 App 有什么区别？
            <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          </summary>
          <div class="ans">背单词 App 给你一份别人排好的词表；语学伴处理的是<b>你自己遇见的英语</b>——刷到的推文、听到的播客、教材里的句子。它把这些素材拆成带语境的闪卡，再按你的目标聚合成练习，所以你背的、练的都是真正想用的表达。</div>
        </details>
        <details>
          <summary>什么素材都能扔进去吗？
            <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          </summary>
          <div class="ans">截图、链接、PDF、音视频都可以。截图走文字识别，网页链接抓取正文，教材 PDF 整本解析，播客与视频自动转写断句。识别出的表达会自动标注来源、语境与难度。</div>
        </details>
        <details>
          <summary>每天要花多少时间？
            <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          </summary>
          <div class="ans">采集只要几秒，扔进去就行。之后 Agent 用间隔重复安排复习，一天 <b>5–10 分钟</b> 即可维持；想冲刺雅思或高考时，再让它基于你的语料生成成套练习。</div>
        </details>
        <details>
          <summary>我的素材会被别人看到吗？
            <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          </summary>
          <div class="ans">知识库<b>默认只有你自己可见</b>。上传的素材只用于你个人的解析、归档与内容生成，不会作为公共语料对外分发。</div>
        </details>
        <details>
          <summary>手机和电脑可以一起用吗？
            <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          </summary>
          <div class="ans">支持 iOS 与 Android，桌面端网页同样可以采集与复习。同一个账号下知识库实时同步——手机上刷到的东西，回到电脑前接着整理。</div>
        </details>
      </div>
    </div>
  </section>
</template>
