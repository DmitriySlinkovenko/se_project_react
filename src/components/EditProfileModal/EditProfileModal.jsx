import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function EditProfileModal({
  isOpen,
  onCloseModal,
  handleEditProfileSubmit,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleAvatarChange(e) {
    setAvatar(e.target.value);
  }
  function handleEditProfile(e) {
    e.preventDefault();
    handleEditProfileSubmit({ name, avatar });
  }
  return (
    <>
      <ModalWithForm
        isOpen={isOpen}
        handleModalClose={onCloseModal}
        handleSubmitForm={handleEditProfile}
        title={"Change Profile Data"}
        submitText={"Save changes"}
      >
        <label className="form__label">
          Name*
          <input
            defaultValue={currentUser.name}
            type="text"
            name="name"
            onChange={handleNameChange}
            id="name"
            placeholder="Name"
            className="form__input"
            required={true}
            value={name}
            minLength={2}
            maxLength={30}
          />
        </label>
        <label className="form__label">
          Avatar*
          <input
            className="form__input"
            type="url"
            name="avatar"
            id="edit-profile__avatar"
            placeholder="Avatar URL"
            required={true}
            onChange={handleAvatarChange}
            value={avatar}
          />
        </label>
      </ModalWithForm>
    </>
  );
}
