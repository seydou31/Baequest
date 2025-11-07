import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";
import "../blocks/app.css";

import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Profile from "./Profile.jsx";
import Meet from "./Meet.jsx";
import CreateAccountModal from "./CreateAccountModal.jsx";
import CreateProfileModal from "./CreateProfileModal.jsx";
import LoginModal from "./LoginModal.jsx";
import EditProfileModal from "./EditProfileModal.jsx";
import {
  createProfile,
  getProfile,
  login,
  logout,
  updateProfile,
} from "../utils/api.js";
import AppContext from "../context/AppContext.js";

function App() {
  // track which modal is open; empty string means no modal
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentProfile, setCurrentProfile] = useState({
    name: "",
    age: 0,
    gender: "",
    interests: [],
    convoStarter: "",
  });
  // open the create-account modal

  const navigate = useNavigate();

  useEffect(() => {
    getProfile()
      .then((res) => {
        setCurrentProfile(res);
        setIsLoggedIn(true);
        navigate("/profile");
      })
      .catch(console.error);
  }, []);

  function handleSignupModal() {
    setActiveModal("createaccountmodal");
  }

  function handleCreateProfileModal() {
    setActiveModal("createprofilemodal");
  }

  function handleLoginModal() {
    setActiveModal("loginmodal");
  }

  function handleEditModal() {
    setActiveModal("editprofilemodal");
  }

  function handleLogout() {
    logout()
      .then(() => {
        setIsLoggedIn(false);
        setCurrentProfile({
          name: "",
          age: 0,
          gender: "",
          interests: [],
          convoStarter: "",
        });
        navigate("/");
      })
      .catch(console.error);
  }

  // close any open modal
  function handleCloseModal() {
    setActiveModal("");
  }

  function handleCreateProfile(formdata) {
    createProfile(formdata).then((res) => {
      setCurrentProfile(res);
      setIsLoggedIn(true);
      handleCloseModal();
      navigate("/profile");
    });
  }

  function handleLoginSubmit(values) {
    return login(values)
      .then(() => {
        return getProfile();
      })
      .then((res) => {
        setCurrentProfile(res);
        setIsLoggedIn(true);
        handleCloseModal();
        navigate("/profile");
      })
      .catch(console.err);
  }

  function handleProfileUpdateSubmit(values) {
    updateProfile(values)
      .then((res) => {
        setCurrentProfile(res);
        handleCloseModal();
      })
      .catch(console.error);
  }

  return (
    <div className="app">
      <AppContext.Provider value={{ currentProfile }}>
        <div className="app-content">
          <Header
            isLoggedIn={isLoggedIn}
            handleLoginModal={handleLoginModal}
            handleLogout={handleLogout}
          />
          <Routes>
            <Route path="/" element={<Main onClick={handleSignupModal} />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile handleEditModal={handleEditModal} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/meet"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Meet />
                </ProtectedRoute>
              }
            />
          </Routes>

          <CreateAccountModal
            isOpen={activeModal === "createaccountmodal"}
            onClose={handleCloseModal}
            openCreateProfileModal={handleCreateProfileModal}
            setIsLoggedIn={setIsLoggedIn}
          />
          <CreateProfileModal
            activeModal={activeModal}
            handleCreateProfile={handleCreateProfile}
            onClose={handleCloseModal}
          />
          <LoginModal
            handleLoginSubmit={handleLoginSubmit}
            isOpen={activeModal === "loginmodal"}
            onClose={handleCloseModal}
          />
          <EditProfileModal
            isOpen={activeModal === "editprofilemodal"}
            onClose={handleCloseModal}
            handleProfileUpdateSubmit={handleProfileUpdateSubmit}
          />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
