import { useContext } from "react";
import AppContext from "../context/AppContext";
import "../blocks/profile.css";
import { Pencil } from "lucide-react";

export default function Profile({handleEditModal}) {
  const { currentProfile } = useContext(AppContext);
  const {
    name,
    age,
    gender,
    bio,
    interests = [],
    convoStarter,
  } = currentProfile;
  return (
    <div className="profile">
      <div className="profile__card">
        <Pencil onClick={handleEditModal} size={16} className="profile__edit-btn"/>
        <div className="profile__avatar">
          {name ? name.charAt(0).toUpperCase() : "?"}
        </div>

        <h2 className="profile__name">{name}</h2>
        <p className="profile__subtitle">
          {age} • {gender}
        </p>
        <h3 className="profile__bio-title">Bio</h3>
        <p className="profile__bio">{bio}</p>

        <div className="profile__section">
          <h3 className="profile__label">Interests</h3>
          <div className="profile__interests">
            {interests.map((interest) => (
              <span key={interest} className="profile__tag">
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div className="profile__section">
          <h3 className="profile__label">Conversation Starter</h3>
          <div className="profile__quote">“{convoStarter}”</div>
        </div>
      </div>
    </div>
  );
}
