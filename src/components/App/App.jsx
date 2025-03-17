import "./App.css";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { coordinates, APIKey } from "../../utils/constants";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from "../Profile/Profile.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import {
  addItem,
  removeItem,
  getItems,
  addCardLike,
  removeCardLike,
} from "../../utils/api.js";
import { signIn, signUp, updateProfile, checkToken } from "../../utils/auth.js";
import LoginFormModal from "../LoginFormModal/LoginFormModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { getToken, setToken, removeToken } from "../../utils/token.js";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";

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
  const [currentUser, setCurrentUser] = useState({});
  const garmentModalOpen = activeModal === "add-garment";
  const itemModalOpen = activeModal === "preview";
  const loginModalOpen = activeModal === "login";
  const registerModalOpen = activeModal === "register";
  const editProfileModalOpen = activeModal === "edit";

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit");
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
      .catch((err) => console.error(err));
  }, []);

  function handleAddItemSubmit(data) {
    const jwt = getToken();
    addItem(data, jwt)
      .then((item) => {
        setClothingItems([item.item, ...clothingItems]);
        handleModalClose();
      })
      .catch(console.error);
  }

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    signIn({ email, password })
      .then((res) => {
        if (res.token) {
          setToken(res.token);
          checkToken(res.token).then((res) => {
            setCurrentUser(res);
            setIsLoggedIn(true);
            const redirectPath = location.state?.from?.pathname || "/";
            navigate(redirectPath);
            handleModalClose();
          });
        }
      })
      .catch((err) => console.error(err.message));
  };

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    checkToken(jwt)
      .then((data) => {
        setCurrentUser(data);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSignUp = ({ email, name, avatar, password }) => {
    signUp({ email, name, avatar, password })
      .then(() => {
        handleLogin({ email, password });
      })
      .then(handleModalClose)
      .catch((err) => console.error(err));
  };

  const handleEditProfileSubmit = ({ name, avatar }) => {
    const token = getToken();
    updateProfile(token, { name, avatar })
      .then((res) => {
        setCurrentUser(res);
        handleModalClose();
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteItem = () => {
    const token = getToken();
    removeItem(selectedCard._id, token)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => item._id !== selectedCard._id)
        );
        handleModalClose();
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    removeToken();
    setCurrentUser({});
    navigate("/");
  };

  const handleCardLike = ({ _id }, isLiked) => {
    const token = getToken();
    !isLiked
      ? addCardLike(_id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(_id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header
            weatherData={weatherData}
            handleAddClick={handleAddClick}
            handleRegisterClick={handleRegisterClick}
            handleLoginClick={handleLoginClick}
            isLoggedIn={isLoggedIn}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  onCardLike={handleCardLike}
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
                    handleEditProfileClick={handleEditProfileClick}
                    handleLogout={handleLogout}
                    handleCardLike={handleCardLike}
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
          <EditProfileModal
            isOpen={editProfileModalOpen}
            onCloseModal={handleModalClose}
            handleEditProfileSubmit={handleEditProfileSubmit}
          ></EditProfileModal>
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
