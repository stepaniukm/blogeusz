<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';

interface Heading {
  depth: number;
  slug: string;
  text: string;
}

const props = defineProps<{ headings: Heading[] }>();

const filtered = computed(() => props.headings.filter((h) => h.depth >= 1 && h.depth <= 3));
const minDepth = computed(() =>
  filtered.value.reduce((min, h) => Math.min(min, h.depth), Infinity)
);
const activeId = ref('');
const open = ref(false);
let observer: IntersectionObserver | null = null;

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false;
}

watch(open, (value) => {
  document.body.style.overflow = value ? 'hidden' : '';
});

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

  window.addEventListener('keydown', onKey);
});

onUnmounted(() => {
  observer?.disconnect();
  window.removeEventListener('keydown', onKey);
  document.body.style.overflow = '';
});
</script>

<template>
  <nav v-if="filtered.length > 1" class="toc" aria-label="Spis treści">
    <p class="toc-title">Spis treści</p>
    <ul class="toc-list">
      <li
        v-for="h in filtered"
        :key="h.slug"
        :class="['toc-item', h.depth > minDepth && 'toc-item-sub']"
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

  <Teleport to="body">
    <template v-if="filtered.length > 1">
      <button
        class="toc-fab"
        type="button"
        :aria-expanded="open"
        aria-label="Spis treści"
        @click="open = true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
        >
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <line x1="3" y1="6" x2="3.01" y2="6"></line>
          <line x1="3" y1="12" x2="3.01" y2="12"></line>
          <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
      </button>

      <Transition name="toc-sheet">
        <div v-if="open" class="toc-sheet-backdrop" @click="open = false">
          <div
            class="toc-sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Spis treści"
            @click.stop
          >
            <div class="toc-sheet-header">
              <p class="toc-title">Spis treści</p>
              <button
                class="toc-sheet-close"
                type="button"
                aria-label="Zamknij"
                @click="open = false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.75"
                  stroke-linecap="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <ul class="toc-list">
              <li
                v-for="h in filtered"
                :key="h.slug"
                :class="['toc-item', h.depth > minDepth && 'toc-item-sub']"
              >
                <a
                  :href="`#${h.slug}`"
                  :class="['toc-link', h.slug === activeId && 'active']"
                  @click="open = false"
                >
                  {{ h.text }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Transition>
    </template>
  </Teleport>
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

.toc-fab {
  display: none;
  position: fixed;
  bottom: 1.25rem;
  right: 1.25rem;
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: var(--color-bg-card);
  color: var(--color-text);
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
  z-index: 50;
}

.toc-sheet-backdrop {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: flex-end;
  background: transparent;
  z-index: 200;
}

.toc-sheet {
  width: 100%;
  height: 100dvh;
  overflow-y: auto;
  padding: 0 1.25rem calc(1.5rem + env(safe-area-inset-bottom));
  background: color-mix(in srgb, var(--color-bg-card) 82%, transparent);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
}

.toc-sheet-header {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: calc(1rem + env(safe-area-inset-top)) 0 0.75rem;
  margin-bottom: 0.5rem;
  background: color-mix(in srgb, var(--color-bg-card) 82%, transparent);
  border-bottom: 1px solid var(--color-border);
}

.toc-sheet-header .toc-title {
  margin: 0;
}

.toc-sheet-close {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border: none;
  background: none;
  color: var(--color-text-muted);
  cursor: pointer;
}

.toc-sheet .toc-link {
  padding: 0.5rem;
  font-size: 0.875rem;
}

.toc-sheet-enter-active,
.toc-sheet-leave-active {
  transition: opacity 0.2s ease;
}

.toc-sheet-enter-active .toc-sheet,
.toc-sheet-leave-active .toc-sheet {
  transition: transform 0.25s ease;
}

.toc-sheet-enter-from,
.toc-sheet-leave-to {
  opacity: 0;
}

.toc-sheet-enter-from .toc-sheet,
.toc-sheet-leave-to .toc-sheet {
  transform: translateY(100%);
}

@media (max-width: 1100px) {
  .toc-fab {
    display: flex;
  }
}

@media (min-width: 1101px) {
  .toc-sheet-backdrop {
    display: none;
  }
}
</style>
