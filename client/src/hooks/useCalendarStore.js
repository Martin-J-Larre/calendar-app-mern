import { useDispatch, useSelector } from "react-redux";
import {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
} from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    // TODO: Send to backend
    // TODO: wait to backend
    if (calendarEvent._id) {
      // updating
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      // creating
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getDate() }));
    }
  };
  return {
    events,
    activeEvent,
    setActiveEvent,
    startSavingEvent,
  };
};
