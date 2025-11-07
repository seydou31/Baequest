import { useForm } from "../hooks/useForm";
import "../blocks/modal.css";
import closeBtn from "../assets/close-button.svg";

 export default function CreateProfileModal({
  activeModal,
  handleCreateProfile,
  onClose,
}) {
  const { values, handleChange, handleReset, setValues, errors } = useForm({
    name: "",
    age: "",
    gender: "",
    bio: "",
    interests: [],
    convoStarter: "",
  });

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const updated = checked
      ? [...values.interests, value]
      : values.interests.filter((i) => i !== value);

    if (updated.length > 3) {
      alert("You can select up to 3 interests only!");
      return;
    }

    setValues({ ...values, interests: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleCreateProfile(values);
      handleReset();
      onClose();
    } catch (err) {
      console.error("Profile creation error:", err);
    }
  };

  const interestOptions = [
    "gaming",
    "travel",
    "photography",
    "cooking",
    "fitness",
    "nusic",
    "reading",
    "art",
    "movies",
    "dancing",
    "hiking",
    "coffee",
    "wine",
    "yoga",
    "running",
    "swimming",
    "cycling",
    "camping",
    "meditation",
    "fashion",
  ];

  const hasErrors = errors && Object.keys(errors).length > 0;
  const emptyFields = !values.email || !values.password;
  const isSubmitDisabled = hasErrors || emptyFields;
  return (
    <div
      className={`modal ${
        activeModal === "createprofilemodal" ? "modal_is-opened" : ""
      }`}
    >
      <div className="modal__content">
        <h2 className="modal__title">Create Profile</h2>
        <button type="button" className="modal__close-btn" onClick={onClose}>
          <img
            src={closeBtn}
            alt="close modal button"
            className="modal__close-btn-image"
          />
        </button>

        <form className="modal__form" onSubmit={handleSubmit}>
          <div className="modal__fieldset">
            <label htmlFor="name" className="modal__label">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="modal__input"
              placeholder="First name. Last name optional"
              name="name"
              value={values.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Age */}
          <div className="modal__fieldset">
            <label htmlFor="age" className="modal__label">
              Age
            </label>
            <input
              type="number"
              id="age"
              className="modal__input"
              placeholder="Enter your age"
              name="age"
              value={values.age}
              onChange={handleChange}
              required
              min="18"
              max="99"
            />
          </div>

          {/* Gender */}
          <div className="modal__fieldset">
            <label htmlFor="gender" className="modal__label">
              Gender
            </label>
            <select
              id="gender"
              className="modal__input"
              name="gender"
              value={values.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Bio */}
          <div className="modal__fieldset">
            <label htmlFor="bio" className="modal__label">
              Bio
            </label>
            <textarea
              id="bio"
              className="modal__input"
              placeholder="Tell us about yourself"
              name="bio"
              value={values.bio}
              onChange={handleChange}
              required
              minLength="6"
              maxLength="280"
            />
          </div>

          {/* Interests (new clickable boxes) */}
          <div className="modal__fieldset">
            <label className="modal__label">Interests</label>
            <div className="interests-list">
              {interestOptions.map((interest) => {
                const value = interest.toLowerCase();
                const isSelected = values.interests.includes(value);
                return (
                  <label
                    key={interest}
                    className={`interest-option ${
                      isSelected ? "selected" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={value}
                      checked={isSelected}
                      onChange={handleCheckboxChange}
                    />
                    {interest}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Conversation Starter */}
          <div className="modal__fieldset">
            <label htmlFor="convostarter" className="modal__label">
              Conversation Starter
            </label>
            <input
              type="text"
              id="convostarter"
              className="modal__input"
              placeholder="Enter a conversation starter"
              name="convoStarter"
              value={values.convoStarter}
              onChange={handleChange}
              required
              minLength="6"
              maxLength="160"
            />
          </div>

          <button type="submit" className="modal__submit-btn" disabled={isSubmitDisabled}>
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
}
