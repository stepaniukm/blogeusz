<script setup lang="ts">
const { datetime } = defineProps<{
	datetime: Date;
}>();
const date = datetime.toLocaleDateString(["pl"], {
	year: "numeric",
	month: "long",
	day: "numeric",
});

const time = datetime.toLocaleTimeString(["pl"], {
	hour: "2-digit",
	minute: "2-digit",
});
</script>
<template>
	{{ date }}
	<span aria-hidden="true"> | </span>
	<span class="sr-only">&nbsp;at&nbsp;</span>
	{{ time }}
</template>
