import { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import "../blocks/app.css";

import Header from "./Header.jsx";
import Main from "./Main.jsx";
import CreateAccountModal from "./CreateAccountModal.jsx";




function App() {

  // track which modal is open; empty string means no modal
  const [activeModal, setActiveModal] = useState("");

  // open the create-account modal
  function handleSignupModal() {
    setActiveModal("createaccountmodal");
  }

  // close any open modal
  function handleCloseSignupModal() {
    setActiveModal("");
  }


  return (
    <div className="app">
      <div className="app-content">
        <Header />
        <Main onClick={handleSignupModal} />
        <CreateAccountModal
          isOpen={activeModal === "createaccountmodal"}
          onClose={handleCloseSignupModal}
        />
      </div>
    </div>
  );
}

export default App;
