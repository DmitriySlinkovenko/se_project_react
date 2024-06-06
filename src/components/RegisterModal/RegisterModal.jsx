import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onCloseModal, handleSignUp }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleAvatarChange(e) {
    setAvatar(e.target.value);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleSubmitForm(e) {
    e.preventDefault();
    handleSignUp({ email, password, name, avatar });
    setEmail("");
    setPassword("");
    setName("");
    setAvatar("");
  }

  return (
    <>
      <ModalWithForm
        isOpen={isOpen}
        handleModalClose={onCloseModal}
        handleSubmitForm={handleSubmitForm}
        title={"Sign Up"}
        submitText={"Sign Up"}
      >
        <label className="form__label">
          Email*
          <input
            type="text"
            name="email"
            id="register-email"
            onChange={handleEmailChange}
            placeholder="Email"
            className="form__input"
            required={true}
            value={email}
          />
        </label>
        <label className="form__label">
          Password*
          <input
            className="form__input"
            type="password"
            name="password"
            id="register-password"
            placeholder="Password"
            onChange={handlePasswordChange}
            required={true}
            value={password}
          />
        </label>
        <label className="form__label">
          Name*
          <input
            className="form__input"
            type="text"
            name="username"
            id="username"
            onChange={handleNameChange}
            placeholder="Name"
            required={true}
            value={name}
            minLength={2}
            maxLength={30}
          />
        </label>
        <label className="form__label">
          Avatar URL*
          <input
            className="form__input"
            type="url"
            name="avatar"
            onChange={handleAvatarChange}
            id="avatar"
            placeholder="Avatar URL"
            required={true}
            value={avatar}
          />
        </label>
        <a href="/signin" className="sign-up">
          or Log In
        </a>
      </ModalWithForm>
    </>
  );
}

export default RegisterModal;
