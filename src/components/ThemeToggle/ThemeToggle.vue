<template>
	<button :aria-pressed="mode" aria-label="toggle theme" @click="toggle">
		<MoonIcon v-if="mode" />
		<SunIcon v-else />
	</button>
</template>

<script setup lang="ts">
import { useDarkLocal } from '../../composables/useDark';
import SunIcon from './SunIcon.vue';
import MoonIcon from './MoonIcon.vue';

const mode = useDarkLocal();

const toggle = () => {
	mode.value = !mode.value;
};
</script>
