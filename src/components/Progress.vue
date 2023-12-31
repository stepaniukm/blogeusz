<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const completion = ref(0);
const updateScrollCompletion = () => {
	const currentProgress = window.scrollY;
	const scrollHeight = document.body.scrollHeight - window.innerHeight;
	if (scrollHeight) {
		completion.value = Number((currentProgress / scrollHeight).toFixed(2)) * 100;
	}
};
onMounted(() => {
	document.addEventListener("scroll", updateScrollCompletion);
});
onUnmounted(() => {
	document.removeEventListener("scroll", updateScrollCompletion);
});
</script>
<template>
	<div class="rounded h-2 w-full sticky top-0 left-0">
		<div
			class="bg-skin-accent rounded h-full transition-width"
			:style="{ width: `${completion}%` }"
		></div>
	</div>
</template>
