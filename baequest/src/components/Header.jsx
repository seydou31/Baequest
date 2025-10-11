import { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import logo from "../assets/baequest-logo.svg";
import "../blocks/header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header__left">
        <img className="header__logo" src={logo} alt="baequest-logo" />
        <h2 className="header__title">Baequest</h2>
      </div>
      <button className="header__button">SIGN IN </button>
    </header>
  );
}
