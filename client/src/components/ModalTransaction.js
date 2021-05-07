import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function ModalTransaction({ onClose }) {
  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <Modal isOpen={true}>
        <button onClick={handleClose}>X</button>
        <form>
          <div>
            <label className="active" htmlFor="typeInput">
              Type:
            </label>
            <input id="typeInput" type="radio" />
          </div>
          <div>
            <label className="active" htmlFor="descriptionInput">
              Description:
            </label>
            <input id="descriptionInput" type="text" />
          </div>
          <div>
            <label className="active" htmlFor="categoryInput">
              Category:
            </label>
            <input id="categoryInput" type="text" />
          </div>
          <div>
            <label className="active" htmlFor="descriptionInput">
              Value:
            </label>
            <input id="descriptionInput" type="number" />
          </div>
          <div>
            <label className="active" htmlFor="descriptionInput">
              Date:
            </label>
            <input id="descriptionInput" type="date" />
          </div>
        </form>
      </Modal>
    </div>
  );
}
