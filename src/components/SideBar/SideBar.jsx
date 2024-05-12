import React from "react";
import "./SideBar.css";
import userAvatar from "../../assets/userAvatar.png";

export default function SideBar() {
  return (
    <div className="sidebar">
      <img src={userAvatar} alt="User avatar" className="sidebar__avatar" />
      <p className="sidebar__username">Terence Tegegne</p>
    </div>
  );
}
