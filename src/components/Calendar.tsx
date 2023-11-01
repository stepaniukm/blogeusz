import type { EventInput } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useState } from "react";

type CalendarProps = {
  events: EventInput[];
  chosenDate?: Date;
};

const MONDAY = 1;

export const Calendar = ({ events, chosenDate }: CalendarProps) => {
  const [showSpacer, setShowSpacer] = useState(true);
  return (
    <>
      <span className="my-4 block">
        Kliknij na zdarzenie w kalendarzu aby przejść do TIL na dany dzień
      </span>
      {showSpacer && <div className="h-[610px] w-[750px] bg-skin-fill"></div>}
      <FullCalendar
        now={chosenDate ? chosenDate : new Date()}
        firstDay={MONDAY}
        locale="pl"
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        loading={setShowSpacer}
        validRange={{ start: "2023-02-01" }}
        buttonText={{ today: "Dzisiaj" }}
      />
    </>
  );
};
