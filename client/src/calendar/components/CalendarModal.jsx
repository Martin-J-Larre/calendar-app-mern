import { useState } from "react";
import { addHours, differenceInSeconds } from "date-fns";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  const [isOpen, setIsOpen] = useState(true);
  const [formValues, setformValues] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const onCloseModal = () => {
    console.log("Closing Modal");
    setIsOpen(false);
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setformValues({
      ...formValues,
      [name]: value,
    });
  };

  const onDateChange = (e, startOrEnd) => {
    console.log(e);
    setformValues({
      ...formValues,
      [startOrEnd]: e,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const difference = differenceInSeconds(formValues.end, formValues.start);
    console.log({ difference });

    if (isNaN(difference) || difference <= 0) {
      console.log("Error Dates on Fields");
      return;
    }
    if (formValues.title.length <= 0) return;

    console.log(formValues);

    // TODO: Close Modal, reset form, Add errors messages on UI
  };

  return (
    <Modal
      isOpen={isOpen}
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
          {/* <input
            className="form-control"
            placeholder="Date start"
            name="start"
            value={formValues.start}
            onChange={onInputChange}
          /> */}
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
          {/* <input
            className="form-control"
            placeholder="Date end"
            name="end"
            value={formValues.end}
            onChange={onInputChange}
          /> */}
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
            className="form-control"
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
