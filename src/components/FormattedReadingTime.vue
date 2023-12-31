<script setup lang="ts">
const { readingTime } = defineProps<{ readingTime: number | undefined }>();
const formatter = new Intl.PluralRules("en-us", {
	type: "cardinal",
});

const polishPluralsMinutes = {
	zero: "minut",
	one: "minuta",
	two: "minuty",
	few: "minut",
	many: "minut",
	other: "minuty",
} satisfies Record<Intl.LDMLPluralRule, string>;
const choiceOfRule = formatter.select(readingTime || 0);
const choice = polishPluralsMinutes[choiceOfRule];
</script>
<template>{{ readingTime }} {{ choice }}</template>
