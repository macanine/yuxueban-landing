<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  /** 用于 aria-label 的表达名（如 hit different） */
  name: string
  /** 正面分类标签，如 # 短视频 · B1 */
  cat: string
  mean: string
  foot: string
}>()

const flipped = ref(false)
const toggle = () => { flipped.value = !flipped.value }
</script>

<template>
  <div
    class="flip reveal" v-reveal
    tabindex="0" role="button"
    :aria-label="`翻转查看 ${name} 的释义`"
    :class="{ 'is-flipped': flipped }"
    @click="toggle"
    @keydown.enter.prevent="toggle"
    @keydown.space.prevent="toggle"
  >
    <div class="flip-inner">
      <div class="flip-face flip-front">
        <span class="cat">{{ cat }}</span>
        <div class="head"><slot name="head" /></div>
        <div class="sub">翻转查看释义</div>
        <span class="corner">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v13M3.5 11.5L8 16l4.5-4.5"/></svg>
        </span>
      </div>
      <div class="flip-face flip-back">
        <span class="cat">释义</span>
        <div class="mean">{{ mean }}</div>
        <div class="eg"><slot name="eg" /></div>
        <div class="foot">{{ foot }}</div>
      </div>
    </div>
  </div>
</template>
