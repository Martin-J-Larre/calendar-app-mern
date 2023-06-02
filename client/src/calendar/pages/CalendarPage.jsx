import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { addHours } from "date-fns";
import { CalendarEventBox, Navbar } from "../";

import { localizer } from "../../helpers";
import { getMessagesEn } from "../../helpers/getMessagesEn";

const events = [
  {
    title: "Title Test",
    notes: "This is a note test",
    start: new Date(),
    end: addHours(new Date(), 1),
    bgColor: "#fafafa",
    user: {
      _id: "123",
      name: "UserName",
    },
  },
];

export const CalendarPage = () => {
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#347CF7",
      color: "white",
    };

    return {
      style,
    };
  };
  return (
    <div>
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessagesEn()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEventBox,
        }}
      />
    </div>
  );
};
