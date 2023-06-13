import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
} from "../store/calendar/calendarSlice";
import { calendarApi } from "../api";
import { convertEventsToDataEvents } from "../helpers";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        await calendarApi.put(`/event/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }
      const { data } = await calendarApi.post("/event", calendarEvent);
      dispatch(
        onAddNewEvent({ ...calendarEvent, id: data.eventSaved.id, user })
      );
    } catch (error) {
      console.log(error);
      Swal.fire("Error saving event", error.response.data.message, "error");
    }
  };

  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete(`/event/${activeEvent.id}`);
      dispatch(onDeleteEvent());
      return;
    } catch (error) {
      console.log(error);
      Swal.fire("Error deleting event", error.response.data.message, "error");
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/event");
      const events = convertEventsToDataEvents(data.events);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log("Error Loading Events", error);
    }
  };
  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
