import "./App.css";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { coordinates, APIKey } from "../../utils/constants";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Profile from "../Profile/Profile.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import { addItem, removeItem, getItems } from "../../utils/api.js";
import { signIn, signUp, checkToken, updateProfile } from "../../utils/auth.js";
import LoginFormModal from "../LoginFormModal/LoginFormModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { getToken, setToken, removeToken } from "../../utils/token.js";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState();
  const garmentModalOpen = activeModal === "add-garment";
  const itemModalOpen = activeModal === "preview";
  const loginModalOpen = activeModal === "login";
  const registerModalOpen = activeModal === "register";

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };
  const handleLoginClick = () => {
    setActiveModal("login");
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

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    signIn(email, password).then((data) => {
      if (data.jwt) {
        setIsLoggedIn(true);
        handleModalClose;
        setToken(data.jwt);
        const redirectPath = location.state?.from?.pathname || "/profile/me";
        navigate(redirectPath);
      }
    });
  };
  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    checkToken(jwt)
      .then((data) => {
        setIsLoggedIn(true);
        setCurrentUser(data.username, data.avatar);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSignUp = ({ email, username, avatar, password }) => {
    signUp(email, username, avatar, password)
      .then(() => {
        navigate("/profile/me");
        handleModalClose;
        setIsLoggedIn(true);
        setCurrentUser({ email, username, avatar });
      })
      .catch((err) => console.error(err));
  };

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
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header
            weatherData={weatherData}
            handleAddClick={handleAddClick}
            handleRegisterClick={handleRegisterClick}
            handleLoginClick={handleLoginClick}
          />
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
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
          <AddItemModal
            onCloseModal={handleModalClose}
            isOpen={garmentModalOpen}
            handleAddItemSubmit={handleAddItemSubmit}
          />
          <LoginFormModal
            isOpen={loginModalOpen}
            onCloseModal={handleModalClose}
            handleLogin={handleLogin}
          ></LoginFormModal>
          <RegisterModal
            isOpen={registerModalOpen}
            onCloseModal={handleModalClose}
            handleSignUp={handleSignUp}
          ></RegisterModal>
          <ItemModal
            isOpen={itemModalOpen}
            selectedCard={selectedCard}
            handleModalClose={handleModalClose}
            handleDeleteItem={handleDeleteItem}
          />
          <Footer />
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
