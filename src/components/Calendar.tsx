import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { type EventInput, Calendar as FullCalendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";

type CalendarProps = {
	events: EventInput[];
	chosenDate?: Date;
};

const MONDAY = 1;

export const Calendar = component$(({ events, chosenDate }: CalendarProps) => {
	const showSpacer = useSignal(true);
	const calendarRef = useSignal<HTMLElement | undefined>();

	useVisibleTask$(({ track }) => {
		track(() => calendarRef.value);
		if (!calendarRef.value) return;

		const fullCalendar = new FullCalendar(calendarRef.value, {
			now: chosenDate ? chosenDate : new Date(),
			firstDay: MONDAY,
			locale: "pl",
			plugins: [dayGridPlugin],
			initialView: "dayGridMonth",
			events,
			loading: v => (showSpacer.value = v),
			validRange: { start: "2023-02-01" },
			buttonText: { today: "Dzisiaj" },
		});

		fullCalendar.render();
	});

	return (
		<>
			<span class="my-4 block">
				Kliknij na zdarzenie w kalendarzu aby przejść do TIL na dany dzień
			</span>
			{showSpacer.value && <div class="h-[610px] w-[750px] bg-skin-fill"></div>}
			<div ref={calendarRef}></div>
		</>
	);
});
