<script setup lang="ts">
import SectionHead from './SectionHead.vue'
</script>

<template>
  <section class="block" id="capture">
    <span class="dots-orn tl"></span>
    <div class="container">
      <SectionHead eyebrow="Capture">
        <template #title>万物皆可<span class="hl">记一笔</span></template>
        <template #desc>好英语散落在生活的每个角落。<br class="br-m">看到就扔，不用整理——<br class="br-m">识别、归档、标注，全部交给 AI。</template>
      </SectionHead>

      <div class="bento">
        <!-- 截图：扫描线扫过，命中表达被高亮并弹出闪卡标签 -->
        <article class="tile tile-wide reveal" v-reveal v-spotlight>
          <div class="tile-copy">
            <span class="tile-kicker">截图</span>
            <h3>社交动态，截图即入库</h3>
            <p>X、Instagram、小红书上刷到的地道表达，截图一扔：AI 识别原文，自动附上语境与出处。</p>
          </div>
          <div class="tile-art art-shot" aria-hidden="true">
            <div class="tweet">
              <div class="tweet-head"><i class="av"></i><span><b>Maya</b> @mayareads</span></div>
              <p>Not gonna lie, this new podcast is a <mark>game changer</mark> for my commute.</p>
              <span class="scan"></span>
            </div>
            <div class="pop">
              <b>game changer</b><span>颠覆性的事物 · B2</span>
            </div>
          </div>
        </article>

        <!-- PDF：书页翻动，计数器滚动 -->
        <article class="tile reveal" v-reveal v-spotlight>
          <div class="tile-copy">
            <span class="tile-kicker">PDF</span>
            <h3>整本教材，一次解析</h3>
            <p>剑桥雅思、大学英语……词汇、例句、长难句逐条成卡。</p>
          </div>
          <div class="tile-art art-pdf" aria-hidden="true">
            <div class="pages"><i></i><i></i><i></i></div>
            <div class="pdf-out"><b>24</b> 页 <span>→</span> <b>43</b> 张闪卡</div>
          </div>
        </article>

        <!-- 音视频：声波 + 逐词高亮字幕 -->
        <article class="tile reveal" v-reveal v-spotlight>
          <div class="tile-copy">
            <span class="tile-kicker">音视频</span>
            <h3>听到的，也能收</h3>
            <p>Podcast、TED、美剧片段，AI 转写断句、提炼表达。</p>
          </div>
          <div class="tile-art art-audio" aria-hidden="true">
            <div class="wave"><i v-for="n in 28" :key="n" :style="{ '--i': n }"></i></div>
            <div class="karaoke"><span>It</span> <span>really</span> <span class="hit">hit</span> <span class="hit">different</span></div>
          </div>
        </article>

        <!-- 网页：地址栏打字 + 段落里的表达逐个标出 -->
        <article class="tile tile-wide reveal" v-reveal v-spotlight>
          <div class="tile-copy">
            <span class="tile-kicker">链接</span>
            <h3>外刊博客，粘贴链接就够</h3>
            <p>自动抓取正文，外刊、博客、论文里的地道用法一个不漏，每条都能回溯到原文。</p>
          </div>
          <div class="tile-art art-web" aria-hidden="true">
            <div class="browser">
              <div class="url"><i></i><span class="typed">ideasweekly.com/remote-work</span></div>
              <p>Critics argue the shift is <u>a double-edged sword</u>, yet the data <u>points to</u> a lasting change in how we <u>get things done</u>.</p>
            </div>
            <div class="web-tags"><span>+ a double-edged sword</span><span>+ points to</span><span>+ get things done</span></div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
