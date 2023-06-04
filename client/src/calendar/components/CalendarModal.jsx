import { useEffect, useMemo, useState } from "react";
import { addHours, differenceInSeconds } from "date-fns";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import "sweetalert2/dist/sweetalert2.min.css";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formValues, setformValues] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const titleClass = useMemo(() => {
    if (!formSubmitted) return "";

    return formValues.title.length > 0 ? "" : "is-invalid";
  }, [formValues.title, formSubmitted]);

  const { activeEvent, startSavingEvent } = useCalendarStore();

  useEffect(() => {
    if (activeEvent !== null) {
      setformValues({ ...activeEvent });
    }
  }, [activeEvent]);

  const { isDateModalOpen, closeDateModal } = useUiStore();

  const onCloseModal = () => {
    closeDateModal();
  };

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setformValues({
      ...formValues,
      [name]: value,
    });
  };

  const onDateChange = (event, startOrEnd) => {
    setformValues({
      ...formValues,
      [startOrEnd]: event,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      Swal.fire({
        icon: "error",
        title: "Incorrect Date",
        text: "Enter a valid date !",
      });
      return;
    }
    if (formValues.title.length <= 0) return;

    console.log(formValues);

    // TODO
    await startSavingEvent(formValues);
    closeDateModal();
    setFormSubmitted(false);
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-bg"
      closeTimeoutMS={200}
    >
      <h1> New Event </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Date and hour start</label>
          <DatePicker
            selected={formValues.start}
            className="form-control"
            onChange={(e) => onDateChange(e, "start")}
            dateFormat="Pp"
            showTimeSelect
          />
        </div>

        <div className="form-group mb-2">
          <label>Date and hour end</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            className="form-control"
            onChange={(e) => onDateChange(e, "end")}
            dateFormat="Pp"
            showTimeSelect
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Title and notes</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Event title"
            autoComplete="off"
            name="title"
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            A short description
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notes"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Additional information
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Save</span>
        </button>
      </form>
    </Modal>
  );
};
