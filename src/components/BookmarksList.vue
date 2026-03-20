<script setup lang="ts">
import { ref, onMounted } from 'vue';

const bookmarks = ref<string[]>([]);
const loading = ref(true);

onMounted(() => {
  bookmarks.value = JSON.parse(localStorage.getItem('bookmarks') || '[]');
  loading.value = false;
});

function remove(key: string) {
  bookmarks.value = bookmarks.value.filter((k) => k !== key);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks.value));
}

function href(key: string) {
  const [collection, slug] = key.split(':');
  return collection === 'blog' ? `/blog/${slug}` : `/til/${slug}`;
}

function label(key: string) {
  return key.split(':')[1].replace(/-/g, ' ');
}

function collection(key: string) {
  return key.split(':')[0].toUpperCase();
}
</script>

<template>
  <div v-if="loading" class="loading">Ładowanie...</div>
  <div v-else-if="bookmarks.length === 0" class="empty">
    <p>Nie masz jeszcze żadnych zakładek.</p>
    <p>Kliknij ikonę zakładki na dowolnym artykule, aby go zapisać.</p>
  </div>
  <div v-else class="bookmarks-list">
    <div v-for="key in bookmarks" :key="key" class="bookmark-item">
      <a :href="href(key)" class="bookmark-link">
        <span class="bookmark-collection">{{ collection(key) }}</span>
        <span class="bookmark-slug">{{ label(key) }}</span>
      </a>
      <button class="remove-btn" aria-label="Usuń zakładkę" @click="remove(key)">×</button>
    </div>
  </div>
</template>

<style scoped>
.loading,
.empty {
  color: var(--color-text-muted);
  text-align: center;
  padding: 3rem 0;
}

.empty p {
  margin: 0.25rem 0;
}

.bookmarks-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.bookmark-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.875rem 1rem;
  background-color: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  transition: border-color 0.2s;
}

.bookmark-item:hover {
  border-color: var(--color-accent);
}

.bookmark-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: inherit;
  flex: 1;
  min-width: 0;
}

.bookmark-collection {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--color-accent);
  flex-shrink: 0;
}

.bookmark-slug {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--color-text);
  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.remove-btn {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  color: var(--color-text-muted);
  font-size: 1.25rem;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    color 0.15s,
    background-color 0.15s;
}

.remove-btn:hover {
  color: #ef4444;
  background-color: rgba(239, 68, 68, 0.1);
}
</style>
