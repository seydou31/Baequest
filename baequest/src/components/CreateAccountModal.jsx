import closeBtn from "../assets/close-button.svg";

import "../blocks/createaccountmodal.css";
import { useForm } from "../../src/hooks/useForm.js";

export default function CreateAccountModal({ isOpen, onClose }) {
  const { errors, values, handleChange, handleReset } = useForm({
    email: "",
    password: "",
  });


  const hasErrors = errors && Object.keys(errors).length > 0;
const emptyFields = !values.email || !values.password;
const isSubmitDisabled = hasErrors || emptyFields;
  
  return (
    <div className={`modal ${isOpen ? "modal_is-opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">Create Account</h2>
        <button type="button" className="modal__close-btn" onClick={onClose}>
          <img
            src={closeBtn}
            alt="close modal button"
            className="modal__close-btn-image"
          />
        </button>
        <form className="modal__form">
            <fieldset className="modal__fieldset">
          <label htmlFor="email" className="modal__label">
            Email
          </label>
          <input
            type="email"
            className="modal__input"
            id="email"
            placeholder="Enter email"
            name='email'
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p className="modal__validation">{errors.email}</p>}
          <label htmlFor="password" className="modal__label">
            Password
          </label>
          <input
            type="email"
            className="modal__input"
            id="password"
            name='password'
            placeholder="Create Password"
            value={values.password}
          onChange={handleChange}
          />
          {errors.password && <p className="modal__validation">{errors.password}</p>}
          <button type="submit" className="modal__submit-btn" disabled={isSubmitDisabled} >
            Continue
          </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
