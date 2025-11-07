import { useForm } from "../hooks/useForm.js";
import closeBtn from "../assets/close-button.svg";
import "../blocks/modal.css";

export default function LoginModal({ isOpen, onClose, handleLoginSubmit }) {
  const { errors, values, handleChange, handleReset } = useForm({
    email: "",
    password: "",
  });

  const hasErrors = errors && Object.keys(errors).length > 0;
  const emptyFields = !values.email || !values.password;
  const isSubmitDisabled = hasErrors || emptyFields;

  function handleSubmit(e) {
    e.preventDefault();
    handleLoginSubmit(values).then(() => {
      handleReset();
    }).catch(console.error);
  }

  return (
    <div className={`modal ${isOpen ? "modal_is-opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">Login</h2>
        <button type="button" className="modal__close-btn" onClick={onClose}>
          <img
            src={closeBtn}
            alt="close modal button"
            className="modal__close-btn-image"
          />
        </button>
        <form className="modal__form" onSubmit={handleSubmit}>
          <fieldset className="modal__fieldset">
            <label htmlFor="email" className="modal__label">
              Email
            </label>
            <input
              type="email"
              className="modal__input"
              id="loginemail"
              placeholder="Enter email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="modal__validation">{errors.email}</p>
            )}
            <label htmlFor="password" className="modal__label">
              Password
            </label>
            <input
              type="password"
              className="modal__input"
              id="loginpassword"
              name="password"
              value={values.password}
              placeholder="Create Password"
              onChange={handleChange}
            />
            {errors.password && (
              <p className="modal__validation">{errors.password}</p>
            )}
            <button
              type="submit"
              className="modal__submit-btn"
              disabled={isSubmitDisabled}
            >
              Login
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
