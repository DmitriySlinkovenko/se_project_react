import "./ModalWithForm.css";

function ModalWithForm({ activeModal, handleModalClose }) {
  return (
    <div
      className={`modal ${activeModal === "add-garment" ? "modal_opened" : ""}`}
    >
      <div className="modal__container">
        <form className="form">
          <h3 className="form__title ">New garment</h3>
          <button
            type="button"
            className="form__close-btn"
            onClick={handleModalClose}
          ></button>
          <label className="form__label">
            Name
            <input
              type="text"
              placeholder="Name"
              className="form__input"
              id="name_input"
              name="image_title"
              required={true}
              minLength={2}
            />
          </label>

          <label className="form__label">
            Image
            <input
              type="url"
              placeholder="Image URL"
              className="form__input"
              id="image_input"
              name="image"
              required={true}
            />
          </label>

          <label className="form__label form__label_radio">
            Select the weather type:
          </label>
          <label className="form__radio-input">
            <input
              type="radio"
              name="weather-type"
              id="weather-type-hot"
              className="radio__btn"
            />
            <span className="radio-btn__title">Hot</span>
          </label>
          <label className="form__radio-input">
            <input
              type="radio"
              name="weather-type"
              id="weather-type-warm"
              className="radio__btn"
            />
            <span className="radio-btn__title">Warm</span>
          </label>
          <label className="form__radio-input">
            <input
              type="radio"
              name="weather-type"
              id="weather-type-cold"
              className="radio__btn"
            />
            <span className="radio-btn__title">Cold</span>
          </label>

          <button type="submit" className="form__submit-btn">
            Add garment
          </button>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
