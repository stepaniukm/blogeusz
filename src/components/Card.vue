<script setup lang="ts">
import Datetime from "./Datetime.vue";
import ReadingTime from "./ReadingTime.vue";

defineProps<{
	href: string;
	frontmatter: {
		title: string;
		pubDatetime: Date;
		description: string;
	};
	secHeading?: boolean;
	readingTime?: number;
}>();
</script>

<template>
	<li class="my-6">
		<a
			:href="href"
			class="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
		>
			<h2 v-if="secHeading" class="text-lg font-medium decoration-dashed hover:underline">
				{{ frontmatter.title }}
			</h2>
			<h3 v-else class="text-lg font-medium decoration-dashed hover:underline">
				{{ frontmatter.title }}
			</h3>
		</a>
		<Datetime :datetime="frontmatter.pubDatetime" />
		<ReadingTime :readingTime="readingTime" size="sm" />
		<p>{{ frontmatter.description }}</p>
	</li>
</template>
