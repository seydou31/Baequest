import { Link } from "react-router-dom";
import logo from "../assets/baequest-logo.svg";
import "../blocks/header.css";
import { useContext } from "react";
import AppContext from "../context/AppContext";

export default function Header({ isLoggedIn, handleLoginModal, handleLogout }) {
  const { currentProfile } = useContext(AppContext);
  const firstInitial = currentProfile.name.charAt(0).toUpperCase();

  return (
    <header className="header">
      <div className="header__left">
        <img className="header__logo" src={logo} alt="baequest-logo" />
        <h2 className="header__title">Baequest</h2>
      </div>
      {!isLoggedIn && <button type="button" onClick={handleLoginModal} className="header__button">SIGN IN </button>}
      {isLoggedIn && <Link className="header__link" to="/profile"> <span >Profile</span></Link>}
      {isLoggedIn && <Link className="header__link" to="/meet"><span>Meet</span></Link>}
      {isLoggedIn && <span onClick={handleLogout} className="header__logout">Logout</span>}
      {isLoggedIn && (
        <div className="header__user">
        <div className="header__user-initial">{firstInitial} </div>
        <p className="header__username">{currentProfile.name}</p>
        </div>
      )}
    </header>
  );
}
