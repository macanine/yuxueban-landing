<script setup lang="ts">
defineProps<{ eyebrow: string }>()
</script>

<template>
  <div class="sec-head reveal" v-reveal>
    <span class="sec-eyebrow">{{ eyebrow }}</span>
    <h2><slot name="title" /></h2>
    <p v-if="$slots.desc"><slot name="desc" /></p>
  </div>
</template>
