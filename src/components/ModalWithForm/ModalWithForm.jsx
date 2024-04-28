import { Children } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  isOpen,
  handleModalClose,
  submitText,
  title,
}) {
  return (
    <div className={`${isOpen ? "modal modal_opened" : "modal"}`}>
      <div className="modal__container">
        <form className="form">
          <h3 className="form__title ">{title}</h3>
          <button
            type="button"
            className="form__close-btn"
            onClick={handleModalClose}
          />
          {children}

          <button type="submit" className="form__submit-btn">
            {submitText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
