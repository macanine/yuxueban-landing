<script setup lang="ts">
/* 素材来源跑马灯：模板渲染两份列表（第二份 aria-hidden），
   -50% 位移即可无缝循环，SSG 输出里就是完整的，无需 JS 复制节点 */
const sources = [
  'YouTube 视频',
  'Instagram',
  'Podcast',
  'X / 推文',
  '短视频字幕',
  '教材 PDF',
  '外刊文章',
  '影视片段',
  '论文摘要',
  '演讲字幕',
]
</script>

<template>
  <div class="marquee">
    <div class="marquee-label">素材从哪来</div>
    <div class="marquee-viewport">
      <div class="marquee-track">
        <div class="marquee-group">
          <span v-for="s in sources" :key="s" class="chip"><i class="bullet"></i>{{ s }}</span>
        </div>
        <div class="marquee-group" aria-hidden="true">
          <span v-for="s in sources" :key="s" class="chip"><i class="bullet"></i>{{ s }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
