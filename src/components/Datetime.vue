<script setup lang="ts">
import FormattedDatetime from "./FormattedDatetime.vue";
defineProps<{
	datetime: Date;
	size?: "sm" | "lg";
	className?: string;
}>();
</script>
<template>
	<div class="flex items-center space-x-2 opacity-80" :class="{ [className!]: className }">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="inline-block h-6 w-6 fill-skin-base"
			:class="{ 'scale-90': size === 'sm', 'scale-100': size === 'lg' }"
			aria-hidden="true"
		>
			<path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"></path>
			<path
				d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"
			></path>
		</svg>
		<span class="sr-only">Opublikowano:</span>
		<span class="italic" :class="{ 'text-sm': size === 'sm', 'text-base': size !== 'sm' }">
			<FormattedDatetime :datetime="datetime" />
		</span>
	</div>
</template>
