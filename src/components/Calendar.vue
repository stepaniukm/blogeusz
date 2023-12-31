<script setup lang="ts">
import type { EventInput, CalendarOptions } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import { ref } from "vue";

const { chosenDate, events } = defineProps<{
	events: EventInput[];
	chosenDate?: Date;
}>();
const MONDAY = 1;

const showSpacer = ref(true);
const calendarOptions = ref({
	now: chosenDate ? chosenDate : new Date(),
	firstDay: MONDAY,
	locale: "pl",
	plugins: [dayGridPlugin],
	initialView: "dayGridMonth",
	events,
	loading: v => (showSpacer.value = v),
	validRange: { start: "2023-02-01" },
	buttonText: { today: chosenDate ? "Wybrana data" : "Dzisiaj" },
} satisfies CalendarOptions);
</script>
<template>
	<span class="my-4 block">
		Kliknij na zdarzenie w kalendarzu aby przejść do TIL na dany dzień
	</span>
	<div v-if="showSpacer" class="h-[610px] w-[750px] bg-skin-fill"></div>
	<FullCalendar :options="calendarOptions"></FullCalendar>
</template>
