import React from "react";
import { FaTimes } from "react-icons/fa";

const Modal = ({
  isModalOpen,
  handleChange,
  toggleModal,
  refInput,
  newName,
  editScheduleName,
}) => {
  return (
    <div className={`${isModalOpen && "show-modal"} modal-overlay`}>
      <form className="d-flex flex-column align-items-center justify-content-center bg-dark p-3 edit-form">
        <FaTimes className="modal-btn" onClick={toggleModal} />

        <div className="form-group m-2 d-flex flex-column">
          <label className="my-2" htmlFor="newName">
            Ingrese el nuevo nombre del horario
          </label>
          <input
            ref={refInput}
            className="form-input ps-1"
            onChange={handleChange}
            name="newName"
            id="newName"
            type="text"
            value={newName}
            //autoComplete="off"
          />
        </div>
        <div className="d-flex mt-3">
          <button onClick={toggleModal} className="btn btn-success ms-2">
            Cancelar
          </button>
          <button onClick={editScheduleName} className="btn btn-success ms-2">
            Editar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
