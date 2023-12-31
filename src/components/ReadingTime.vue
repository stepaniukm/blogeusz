<script setup lang="ts">
import FormattedReadingTime from "./FormattedReadingTime.vue";
defineProps<{
	readingTime: number | undefined;
	size?: "sm" | "lg";
	className?: string;
}>();
</script>
<template>
	<div class="flex items-center space-x-2 opacity-80" :class="{ [className!]: className }">
		<svg
			class="inline-block h-6 w-6 fill-skin-base scale-75"
			xmlns="http://www.w3.org/2000/svg"
			fill-rule="evenodd"
			clip-rule="evenodd"
		>
			<path
				d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm0 11h6v1h-7v-9h1v8z"
			/>
		</svg>
		<span class="sr-only">Do przeczytania w:</span>
		<span :class="{ 'text-sm': size === 'sm', 'text-base': size === 'lg' }">
			<FormattedReadingTime :readingTime="readingTime" />
		</span>
	</div>
</template>
