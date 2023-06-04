import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const temporaryEvent = {
  _id: new Date().getTime(),
  title: "Title Test",
  notes: "This is a note test",
  start: new Date(),
  end: addHours(new Date(), 1),
  bgColor: "#fafafa",
  user: {
    _id: "123",
    name: "UserName",
  },
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [temporaryEvent],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, action) => {
      state.activeEvent = action.payload;
    },
    onAddNewEvent: (state, action) => {
      state.events.push(action.payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, action) => {
      state.events = state.events.map((event) => {
        if (event._id === action.payload._id) {
          return action.payload;
        }
        return event;
      });
    },
  },
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent } =
  calendarSlice.actions;
