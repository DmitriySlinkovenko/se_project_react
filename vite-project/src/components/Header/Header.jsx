import "./Header.css";
import headerLogo from "../../assets/Logo.png";
import userAvatar from "../../assets/userAvatar.png";

function Header() {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <div className="header__container">
      <img src={headerLogo} alt="Header logo" className="header__logo" />
      <p className="header__date">{currentDate}</p>
      <button type="button" id="add__card-btn" className="button">
        + Add Clothes
      </button>
      <p className="header__user-info">Terrence Tegegne</p>
      <img src={userAvatar} className="header__avatar" alt="User Avatar" />
    </div>
  );
}

export default Header;
