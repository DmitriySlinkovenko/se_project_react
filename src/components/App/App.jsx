import "./App.css";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { coordinates, APIKey } from "../../utils/constants";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import { addItem, removeItem, getItems } from "../../utils/api.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 0 },
    city: "",
    isDay: "",
    id: "",
  });

  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
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

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
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

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  function handleAddItemSubmit(data) {
    addItem(data)
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
      })
      .then(handleModalClose)
      .catch(console.error);
  }

  const handleDeleteItem = () => {
    removeItem(selectedCard._id)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => item._id !== selectedCard._id)
        );
        handleModalClose();
      })
      .catch(console.error);
  };

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header weatherData={weatherData} handleAddClick={handleAddClick} />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                weatherData={weatherData}
                handleCardClick={handleCardClick}
                clothingItems={clothingItems}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                handleCardClick={handleCardClick}
                clothingItems={clothingItems}
                handleAddClick={handleAddClick}
                weatherData={weatherData}
              />
            }
          />
        </Routes>
        <AddItemModal
          onCloseModal={handleModalClose}
          isOpen={garmentModalOpen}
          handleAddItemSubmit={handleAddItemSubmit}
        />
        <ItemModal
          isOpen={itemModalOpen}
          selectedCard={selectedCard}
          handleModalClose={handleModalClose}
          handleDeleteItem={handleDeleteItem}
        />
        <Footer />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
