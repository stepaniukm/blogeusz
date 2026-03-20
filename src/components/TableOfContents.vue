<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

interface Heading {
  depth: number;
  slug: string;
  text: string;
}

const props = defineProps<{ headings: Heading[] }>();

const filtered = computed(() => props.headings.filter((h) => h.depth >= 2 && h.depth <= 3));
const activeId = ref('');
let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id;
        }
      }
    },
    { rootMargin: '-20% 0px -70% 0px' }
  );

  for (const h of filtered.value) {
    const el = document.getElementById(h.slug);
    if (el) observer.observe(el);
  }
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<template>
  <nav v-if="filtered.length > 1" class="toc" aria-label="Spis treści">
    <p class="toc-title">Spis treści</p>
    <ul class="toc-list">
      <li
        v-for="h in filtered"
        :key="h.slug"
        :class="['toc-item', h.depth === 3 && 'toc-item-sub']"
      >
        <a
          :href="`#${h.slug}`"
          :class="['toc-link', h.slug === activeId && 'active']"
        >
          {{ h.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.toc {
  position: sticky;
  top: 80px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}

.toc-title {
  margin: 0 0 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.toc-item-sub {
  padding-left: 0.75rem;
}

.toc-link {
  display: block;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  border-left: 2px solid transparent;
  transition:
    color 0.15s,
    border-color 0.15s;
  line-height: 1.4;
}

.toc-link:hover {
  color: var(--color-accent);
  border-left-color: var(--color-accent);
}

.toc-link.active {
  color: var(--color-accent);
  border-left-color: var(--color-accent);
}
</style>
