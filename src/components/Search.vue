<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import Fuse from "fuse.js";
import slugify from "@utils/slugify";
import type { BlogFrontmatter } from "@content/_schemas";
import Card from "@components/Card.vue";

export type SearchItem = {
	title: string;
	description: string;
	readingTime: number;
	data: BlogFrontmatter;
};

const { searchList } = defineProps<{
	searchList: SearchItem[];
}>();

const inputVal = ref("");
const searchResults = ref<SearchResult[]>([]);
const fuseStore = ref<{ fuseInstance: Fuse<SearchItem> | undefined }>({
	fuseInstance: undefined,
});

onMounted(() => {
	const fuse = new Fuse(searchList, {
		keys: ["title", "description"],
		includeMatches: true,
		minMatchCharLength: 2,
		threshold: 0.5,
	});

	fuseStore.value.fuseInstance = fuse;
});

watchEffect(() => {
	const inputResult =
		inputVal.value.length > 1 && fuseStore.value.fuseInstance
			? fuseStore.value.fuseInstance!.search(inputVal.value)
			: [];

	searchResults.value = inputResult;

	if (inputVal.value.length > 0) {
		const searchParams = new URLSearchParams(window.location.search);
		searchParams.set("q", inputVal.value);
		const newRelativePathQuery = window.location.pathname + "?" + searchParams.toString();
		history.pushState(null, "", newRelativePathQuery);
	} else {
		history.pushState(null, "", window.location.pathname);
	}
});

interface SearchResult {
	item: SearchItem;
	refIndex: number;
}

const formatter = new Intl.PluralRules("pl", {
	type: "cardinal",
});

const polishPluralsPosts = {
	zero: "postów",
	one: "post",
	two: "posty",
	few: "posty",
	many: "postów",
	other: "postów",
} satisfies Record<Intl.LDMLPluralRule, string>;
</script>

<template>
	<label class="relative block">
		<span class="absolute inset-y-0 left-0 flex items-center pl-2 opacity-75">
			<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<path
					d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"
				></path>
			</svg>
		</span>
		<input
			class="block w-full rounded border border-skin-fill border-opacity-40 bg-skin-fill py-3 pl-10 pr-3 placeholder:italic placeholder:text-opacity-75 focus:border-skin-accent focus:outline-none"
			placeholder="..."
			type="text"
			name="search"
			v-model="inputVal"
			autoComplete="off"
			autoFocus
		/>
	</label>

	<div class="mt-8" v-if="searchResults.length">
		Znaleziono {{ searchResults.length }}
		{{
			polishPluralsPosts[formatter.select(searchResults.length || 0)] + " dla '" + inputVal + "'"
		}}
	</div>

	<ul>
		<Card
			v-for="{ item, refIndex } in searchResults"
			:href="`/posty/${slugify(item.data)}`"
			:frontmatter="item.data"
			:key="`${refIndex}-${slugify(item.data)}`"
			:readingTime="item.readingTime"
		/>
	</ul>
</template>
