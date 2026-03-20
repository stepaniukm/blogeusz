<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const progress = ref(0);

function update() {
  const el = document.documentElement;
  const scrollTop = el.scrollTop || document.body.scrollTop;
  const scrollHeight = el.scrollHeight - el.clientHeight;
  progress.value = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
}

onMounted(() => {
  window.addEventListener('scroll', update, { passive: true });
  update();
});

onUnmounted(() => {
  window.removeEventListener('scroll', update);
});
</script>

<template>
  <div
    class="progress-bar"
    role="progressbar"
    :aria-valuenow="Math.round(progress)"
    :aria-valuemin="0"
    :aria-valuemax="100"
    :style="{ width: `${progress}%` }"
  />
</template>

<style scoped>
.progress-bar {
  position: fixed;
  top: 60px;
  left: 0;
  height: 2px;
  background-color: var(--color-accent);
  z-index: 99;
  transition: width 0.1s linear;
}
</style>
