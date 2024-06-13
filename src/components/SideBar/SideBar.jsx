import "./SideBar.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function SideBar({ handleEditProfileClick, handleLogout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <img
        src={currentUser.avatar}
        alt="User avatar"
        className="sidebar__avatar"
      />
      <p className="sidebar__username">{currentUser.name}</p>
      <div className="button__container">
        <button className="sidebar__button" onClick={handleEditProfileClick}>
          Change Profile Data
        </button>
        <button className="sidebar__button" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
}
