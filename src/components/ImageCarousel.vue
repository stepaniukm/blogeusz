<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  images: string[];
  title: string;
}>();

const current = ref(0);
const startX = ref(0);

function goTo(index: number) {
  current.value = ((index % props.images.length) + props.images.length) % props.images.length;
}

function onTouchStart(e: TouchEvent) {
  startX.value = e.touches[0].clientX;
}

function onTouchEnd(e: TouchEvent) {
  const diff = startX.value - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) goTo(diff > 0 ? current.value + 1 : current.value - 1);
}
</script>

<template>
  <div v-if="images.length > 0" class="carousel">
    <div
      class="carousel-track"
      :style="{ transform: `translateX(-${current * 100}%)` }"
      @touchstart.passive="onTouchStart"
      @touchend="onTouchEnd"
    >
      <div v-for="(src, i) in images" :key="i" class="carousel-slide">
        <img
          :src="src"
          :alt="`${title} — zdjęcie ${i + 1}`"
          :loading="i === 0 ? 'eager' : 'lazy'"
          decoding="async"
        />
      </div>
    </div>

    <template v-if="images.length > 1">
      <button class="carousel-btn carousel-btn-prev" aria-label="Poprzednie zdjęcie" @click="goTo(current - 1)">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <button class="carousel-btn carousel-btn-next" aria-label="Następne zdjęcie" @click="goTo(current + 1)">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      <div class="carousel-dots">
        <button
          v-for="(_, i) in images"
          :key="i"
          :class="['dot', i === current && 'dot-active']"
          :aria-label="`Przejdź do zdjęcia ${i + 1}`"
          @click="goTo(i)"
        />
      </div>
    </template>
  </div>
</template>

<style scoped>
.carousel {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-card);
  background-color: var(--color-bg-card);
  aspect-ratio: 16/9;
}

.carousel-track {
  display: flex;
  height: 100%;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.carousel-slide {
  flex: 0 0 100%;
  height: 100%;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  z-index: 2;
  backdrop-filter: blur(4px);
}

.carousel-btn:hover {
  background-color: rgba(0, 0, 0, 0.75);
}

.carousel-btn-prev {
  left: 0.75rem;
}

.carousel-btn-next {
  right: 0.75rem;
}

.carousel-dots {
  position: absolute;
  bottom: 0.75rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.375rem;
  z-index: 2;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  padding: 0;
  transition:
    background-color 0.2s,
    transform 0.2s;
}

.dot-active {
  background-color: #ffffff;
  transform: scale(1.25);
}
</style>
