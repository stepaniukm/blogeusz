import type { EventInput } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { CollectionEntry } from "astro:content";

type CalendarProps = {
  events: EventInput[];
  chosenTil?: CollectionEntry<"til">;
};

export const Calendar = ({ events, chosenTil }: CalendarProps) => {
  return (
    <div>
      <>
        <FullCalendar
          firstDay={1}
          locale="pl"
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
        />
      </>
    </div>
  );
};
