import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

const AddItemModal = ({ isOpen, handleAddItemSubmit, onCloseModal }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLinkChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherTypeChange = (e) => {
    setWeather(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddItemSubmit({ name, imageUrl, weather });
    setName("");
    setImageUrl("");
    setWeather("");
  };
  return (
    <ModalWithForm
      isOpen={isOpen}
      handleModalClose={onCloseModal}
      handleSubmitForm={handleSubmit}
      submitText={"Add garment"}
      title={"New garment"}
    >
      {" "}
      <label className="form__label">
        Name
        <input
          type="text"
          placeholder="Name"
          className="form__input"
          id="name_input"
          value={name}
          name="image_title"
          onChange={handleNameChange}
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
          value={imageUrl}
          onChange={handleLinkChange}
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
          value="hot"
          required={true}
          className="radio__btn"
          onChange={handleWeatherTypeChange}
          checked={weather === "hot"}
        />
        <span className="radio-btn__title">Hot</span>
      </label>
      <label className="form__radio-input">
        <input
          type="radio"
          name="weather-type"
          id="weather-type-warm"
          className="radio__btn"
          value="warm"
          required={true}
          checked={weather === "warm"}
          onChange={handleWeatherTypeChange}
        />
        <span className="radio-btn__title">Warm</span>
      </label>
      <label className="form__radio-input">
        <input
          type="radio"
          required={true}
          name="weather-type"
          id="weather-type-cold"
          className="radio__btn"
          value="cold"
          checked={weather === "cold"}
          onChange={handleWeatherTypeChange}
        />
        <span className="radio-btn__title">Cold</span>
      </label>
    </ModalWithForm>
  );
};

export default AddItemModal;
