import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import "./LoginFormModal.css";

function LoginFormModal({ isOpen, onCloseModal, handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handleSubmitForm(e) {
    e.preventDefault();
    handleLogin({ email, password });
    setEmail("");
    setPassword("");
  }
  return (
    <>
      <ModalWithForm
        isOpen={isOpen}
        handleModalClose={onCloseModal}
        handleSubmitForm={handleSubmitForm}
        title={"Log In"}
        submitText={"Log In"}
      >
        <label className="form__label">
          Email
          <input
            type="email"
            name="email"
            onChange={handleEmailChange}
            id="email"
            placeholder="Email"
            className="form__input"
            required={true}
            value={email}
          />
        </label>
        <label className="form__label">
          Password
          <input
            className="form__input"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required={true}
            onChange={handlePasswordChange}
            value={password}
          />
        </label>
        <a href="/signup" className="sign-up">
          or Sign Up
        </a>
      </ModalWithForm>
    </>
  );
}

export default LoginFormModal;
