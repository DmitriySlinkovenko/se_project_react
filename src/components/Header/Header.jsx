import "./Header.css";
import headerLogo from "../../assets/Logo.png";
import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({
  weatherData,
  handleAddClick,
  handleLoginClick,
  handleRegisterClick,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const mobileView = `mobile-nav ${
    isMobileMenuOpened ? "mobile-nav_active" : ""
  }`;
  const mobileButtonView = `mobile-button ${
    isMobileMenuOpened ? "mobile-button_active" : ""
  }`;

  const openMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  return isLoggedIn ? (
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

      <Link to="/profile" className="header__user-info">
        {currentUser.name}
      </Link>
      <Link to="/profile">
        <img
          src={currentUser.avatar}
          className="header__avatar"
          alt="User Avatar"
        />
      </Link>
    </header>
  ) : (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img src={headerLogo} alt="Header logo" className="header__logo" />
        </Link>
        <p className="header__date">
          {currentDate}, {weatherData.city}
        </p>
        <ToggleSwitch />

        <div className={mobileView} onClick={openMobileMenu}>
          <button
            type="button"
            className={mobileButtonView}
            onClick={handleRegisterClick}
          >
            Sign Up
          </button>
          <button
            type="button"
            className={mobileButtonView}
            onClick={handleLoginClick}
          >
            Log In
          </button>
        </div>

        <button type="button" className="button" onClick={handleRegisterClick}>
          Sign Up
        </button>
        <button type="button" className="button" onClick={handleLoginClick}>
          Log In
        </button>
      </div>
    </header>
  );
}

export default Header;
