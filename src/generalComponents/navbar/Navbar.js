import React from "react";
import pathToLogo from "../../assets/images/navbarLogo.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  const guestLinks = (
    <div className="navigation-menu">
      <ul>
        <li>
          <a href="/marketplace">
            <button className="navbtn">Buy</button>
          </a>
        </li>
        <li>
          <a href="/marketplace">
            <button className="navbtn">Rent</button>
          </a>
        </li>
        <li className="dropdown">
          <button className="navbtn dropbtn">Islands</button>
          <div className="dropdown-content">
            <a href="/islands">Hawai&apos;i</a>
            <a href="/islands">Maui</a>
            <a href="/islands">O&apos;ahu</a>
            <a href="/islands">Kaua&apos;i</a>
            <a href="/islands">Moloka</a>
            <a href="/islands">Lāna&apos;i</a>
            <a href="/islands">Ni&apos;hau</a>
            <a href="/islands">Kaho&apos;olawe</a>
          </div>
        </li>
        <li>
          <a href="/marketplace">
            <button className="navbtn">About</button>
          </a>
        </li>
        <li>
          <a href="/marketplace">
            <button className="navbtn">Contact</button>
          </a>
        </li>
      </ul>
    </div>
  );
  return (
    <nav className="navigation">
      <div className="brandLogoDiv">
        <Link to="/">
          <img className="brandLogo" src = {pathToLogo} alt="Ohana homes logo"/>
        </Link>
      </div>
      {guestLinks}
      <div className="accountMenu">
        <button className="navbtn signUpbtn">Sign Up</button>
        <button className="loginbtn">Log in</button>
      </div>
    </nav>
  );
};

export default Navbar;
