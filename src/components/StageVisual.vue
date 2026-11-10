<script setup lang="ts">
/* 工作流三步的示意画面（纯装饰，aria-hidden 由外层负责） */
defineProps<{ step: number }>()
</script>

<template>
  <!-- 1. 采集：各种素材落进同一个收件箱 -->
  <div v-if="step === 0" class="sv sv-inbox">
    <div class="sv-label"><i></i>收件箱 · 自动识别格式</div>
    <div class="sv-row" style="--k:0">
      <span class="sv-ico img"></span><div><b>推文截图.png</b><small>图片 · OCR 识别</small></div><em>已入库</em>
    </div>
    <div class="sv-row" style="--k:1">
      <span class="sv-ico pdf"></span><div><b>剑桥雅思 Unit 3.pdf</b><small>文档 · 24 页</small></div><em>已入库</em>
    </div>
    <div class="sv-row" style="--k:2">
      <span class="sv-ico aud"></span><div><b>Morning Pod · Ep. 412</b><small>音频 · 自动转写</small></div><em>已入库</em>
    </div>
    <div class="sv-row" style="--k:3">
      <span class="sv-ico web"></span><div><b>ideasweekly.com/remote-work</b><small>网页 · 正文抓取</small></div><em>已入库</em>
    </div>
  </div>

  <!-- 2. 拆解：原句中的表达被拎出来，变成一张信息完整的闪卡 -->
  <div v-else-if="step === 1" class="sv sv-split">
    <div class="sv-src">“Not gonna lie, this is a <mark>game changer</mark>.”</div>
    <div class="sv-arrow"><i></i></div>
    <div class="sv-card">
      <div class="sv-card-top"><span># 日常口语</span><span>B2</span></div>
      <b class="sv-term">game changer</b>
      <dl>
        <div><dt>释义</dt><dd>改变局面的人或事物</dd></div>
        <div><dt>语境</dt><dd>夸某样东西带来了质的变化</dd></div>
        <div><dt>来源</dt><dd>X · 推文截图</dd></div>
      </dl>
    </div>
  </div>

  <!-- 3. 聚合：闪卡汇成一道真题风格的练习 -->
  <div v-else class="sv sv-quiz">
    <div class="sv-quiz-head"><span>雅思阅读 · Passage 1</span><span class="timer">19:42</span></div>
    <p class="sv-q">The writer describes remote work as “a double-edged sword” because it…</p>
    <ul>
      <li>A. is preferred by most employees</li>
      <li class="right">B. brings both benefits and drawbacks</li>
      <li>C. has been rejected by critics</li>
    </ul>
    <div class="sv-quiz-foot">题干改写自你收藏的 <b>6 张闪卡</b></div>
  </div>
</template>
