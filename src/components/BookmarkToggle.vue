<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps<{
  slug: string;
  collection: string;
  addLabel?: string;
  removeLabel?: string;
}>();

const key = `${props.collection}:${props.slug}`;
const saved = ref(false);

onMounted(() => {
  const bookmarks: string[] = JSON.parse(localStorage.getItem('bookmarks') || '[]');
  saved.value = bookmarks.includes(key);
});

function toggle() {
  const current: string[] = JSON.parse(localStorage.getItem('bookmarks') || '[]');
  const idx = current.indexOf(key);
  if (idx >= 0) {
    current.splice(idx, 1);
  } else {
    current.push(key);
  }
  localStorage.setItem('bookmarks', JSON.stringify(current));
  saved.value = !saved.value;
}
</script>

<template>
  <button
    :class="['bookmark-btn', saved && 'saved']"
    :aria-label="saved ? (props.removeLabel ?? 'Remove from bookmarks') : (props.addLabel ?? 'Add to bookmarks')"
    @click="toggle"
  >
    <svg
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
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  </button>
</template>

<style scoped>
.bookmark-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-tag);
  background: var(--color-bg-card);
  color: var(--color-text-muted);
  cursor: pointer;
  transition:
    color 0.15s,
    border-color 0.15s,
    background-color 0.15s;
}

.bookmark-btn:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.bookmark-btn.saved {
  color: var(--color-accent);
  border-color: var(--color-accent);
  background-color: rgba(232, 160, 32, 0.1);
}

.bookmark-btn.saved svg {
  fill: var(--color-accent);
}
</style>
