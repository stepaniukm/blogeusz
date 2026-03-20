<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = withDefaults(defineProps<{ label?: string }>(), { label: 'Toggle theme' });

const theme = ref('dark');

onMounted(() => {
  theme.value = document.documentElement.getAttribute('data-theme') || 'dark';
});

function toggle() {
  const next = theme.value === 'dark' ? 'light' : 'dark';
  const html = document.documentElement;
  html.classList.add('no-transition');
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  html.offsetHeight;
  html.classList.remove('no-transition');
  theme.value = next;
}
</script>

<template>
  <button class="icon-btn" :aria-label="props.label" @click="toggle">
    <svg
      v-show="theme === 'dark'"
      class="icon-moon"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
    <svg
      v-show="theme === 'light'"
      class="icon-sun"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  </button>
</template>

<style scoped>
.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  border-radius: var(--radius-tag);
  color: var(--color-text-muted);
  cursor: pointer;
  transition:
    color 0.15s,
    background-color 0.15s;
}

.icon-btn:hover {
  color: var(--color-text);
  background-color: var(--color-tag-bg);
}
</style>
