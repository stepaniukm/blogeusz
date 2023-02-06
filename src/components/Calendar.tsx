import type { EventInput } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";

type CalendarProps = {
  events: EventInput[];
  chosenDate?: Date;
};

export const Calendar = ({ events, chosenDate }: CalendarProps) => {
  const [showSpacer, setShowSpacer] = useState(true);
  return (
    <>
      {showSpacer && <div className="h-[610px] w-[750px] bg-skin-fill"></div>}
      <FullCalendar
        now={chosenDate ? chosenDate : new Date()}
        firstDay={1}
        locale="pl"
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        loading={setShowSpacer}
        validRange={{ start: "2023-02-01" }}
        buttonText={{ today: "Dzisiaj" }}
      />
    </>
  );
};
