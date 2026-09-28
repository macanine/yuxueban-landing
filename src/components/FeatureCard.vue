<script setup lang="ts">
defineProps<{ title: string; text: string }>()
</script>

<template>
  <div class="card reveal" v-reveal v-spotlight>
    <div class="icon"><slot name="icon" /></div>
    <h3>{{ title }}</h3>
    <p>{{ text }}</p>
  </div>
</template>
