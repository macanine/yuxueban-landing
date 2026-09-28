<script setup lang="ts">
// chip：飞行中的闪卡（只有栖息在首屏示意窗上的渡鸦才有）
defineProps<{ chip?: boolean }>()
</script>

<template>
  <svg class="raven" viewBox="0 0 512 512" aria-hidden="true">
    <g class="rv-whole">
      <rect width="512" height="512" rx="115" fill="url(#rvBgGrad)"/>
      <rect x="96" y="176" width="320" height="280" rx="140" fill="url(#rvBodyGrad)"/>
      <g class="rv-head">
        <circle cx="210" cy="160" r="80" fill="url(#rvBodyGrad)"/>
        <path class="rv-beak" d="M270 110 Q370 70 430 100 Q380 150 280 170 Z" fill="url(#rvBodyGrad)"/>
        <circle class="rv-eye" cx="210" cy="140" r="12" fill="#00C776"/>
      </g>
      <rect class="rv-hollow" x="186" y="256" width="140" height="120" rx="60" fill="#00C776"/>
      <g v-if="chip" class="rv-chip">
        <rect x="-75" y="-50" width="150" height="100" rx="22" fill="#fff" stroke="#00C776" stroke-width="8"/>
        <path d="M-40 -14h46M-40 14h30" stroke="#00C776" stroke-width="12" stroke-linecap="round"/>
      </g>
    </g>
  </svg>
</template>
