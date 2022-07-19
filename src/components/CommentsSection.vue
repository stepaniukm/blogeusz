<template>
	<section>
		<h2>Comments</h2>
		<Giscus
			src="https://giscus.app/client.js"
			repo="stepaniukm/blogeusz"
			repo-id="R_kgDOHqb20A"
			category="Blog"
			category-id="DIC_kwDOHqb20M4CQSeC"
			mapping="pathname"
			reactions-enabled="1"
			emit-metadata="0"
			input-position="top"
			:theme="mode ? 'dark' : 'light'"
			lang="pl"
			loading="lazy" />
	</section>
</template>

<script setup lang="ts">
import Giscus from '@giscus/vue';
import { useDarkLocal } from '../composables/useDark';
const mode = useDarkLocal();
</script>
