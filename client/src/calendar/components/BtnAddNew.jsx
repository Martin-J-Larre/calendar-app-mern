import React from "react";
import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";

export const BtnAddNew = () => {
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handleClick = () => {
    setActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 1),
      bgColor: "#fafafa",
      user: {
        _id: "123",
        name: "UserName",
      },
    });
    openDateModal();
  };
  return (
    <button className="btn btn-primary btn-add-new" onClick={handleClick}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
