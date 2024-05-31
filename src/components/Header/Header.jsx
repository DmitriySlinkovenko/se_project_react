import "./Header.css";
import headerLogo from "../../assets/Logo.png";
import userAvatar from "../../assets/userAvatar.png";
import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({
  weatherData,
  handleAddClick,
  handleLoginClick,
  handleRegisterClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header__container">
      <Link to="/">
        <img src={headerLogo} alt="Header logo" className="header__logo" />
      </Link>
      <p className="header__date">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      <button
        type="button"
        id="add__card-btn"
        className="button"
        onClick={handleAddClick}
      >
        + Add Clothes
      </button>

      <button className="sign-up__button" onClick={handleRegisterClick}>
        Sign Up
      </button>
      <button className="sign-up__button" onClick={handleLoginClick}>
        Log In
      </button>

      <Link to="/profile" className="header__user-info">
        {"Dmitriy"}
      </Link>
      <Link to="/profile">
        <img src={userAvatar} className="header__avatar" alt="User Avatar" />
      </Link>
    </header>
  );
}

export default Header;
