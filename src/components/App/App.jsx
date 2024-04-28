import "./App.css";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { coordinates, APIKey } from "../../utils/constants";
import { useEffect, useState } from "react";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 0 },
    city: "",
    isDay: "",
    id: "",
  });

  const [selectedCard, setSelectedCard] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const garmentModalOpen = activeModal === "add-garment";
  const itemModalOpen = activeModal === "preview";

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleModalClose = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, APIKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="page">
      <Header weatherData={weatherData} handleAddClick={handleAddClick} />
      <Main weatherData={weatherData} handleCardClick={handleCardClick} />
      <ModalWithForm
        isOpen={garmentModalOpen}
        handleModalClose={handleModalClose}
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
      </ModalWithForm>
      <ItemModal
        isOpen={itemModalOpen}
        selectedCard={selectedCard}
        handleModalClose={handleModalClose}
      />
      <Footer />
    </div>
  );
}

export default App;
