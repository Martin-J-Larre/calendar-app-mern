import { useState } from "react";
import Modal from "react-modal";

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

  const onCloseModal = () => {
    console.log("Closing Modal");
    setIsOpen(false);
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
      <h1>Test Modal React Please Work</h1>
      <hr />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis sint,
        distinctio quod, nesciunt similique minima magnam quidem, nulla dolore
        soluta rem unde natus accusantium iste ipsum fuga aperiam nisi illum?
      </p>
    </Modal>
  );
};
