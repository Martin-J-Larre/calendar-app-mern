import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const temporaryEvent = {
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
  reducers: {},
});

export const {} = calendarSlice.actions;
