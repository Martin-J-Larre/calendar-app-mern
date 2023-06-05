import { useCalendarStore, useUiStore } from "../../hooks";

export const BtnDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();

  const handleDelete = () => {
    startDeletingEvent();
  };
  return (
    <button
      className="btn btn-danger btn-delete"
      onClick={handleDelete}
      style={{ display: hasEventSelected ? "" : "none" }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
