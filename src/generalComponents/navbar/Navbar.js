import React, { useEffect } from "react";
import largeNavBarLogo from "../../assets/images/logo/navbarLogo.svg";
import smallNavBarLogo from "../../assets/images/logo/smallNavBarLogo.svg";
import Alert from "../alerts/alert";
import LoginModal from "./accountPopUps/LoginModal.js";
import SignUpModal from "./accountPopUps/SignUpModal.js";
import { Link } from "react-router-dom";
import { useState } from "react";
import { setupLocalUsers } from "../../helpers/authenticator/authenticator.js";
import AccountMenu from "./AccountMenu";
import "./navbar.scss";

const Navbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isDropdownExpanded, setIsDropdownExpanded] = useState(false);

  useEffect(() => {
    if (!localStorage.users) {
      setupLocalUsers();
    }
  }, []);

  return (
    <>
      <Alert />
      <LoginModal />
      <SignUpModal />
      <nav id="topNavBarContainer" className={isNavExpanded ? "navigation expanded" : "navigation"}>
        <div className="brandLogoDiv">
          <Link to="/">
            <img
              className="largeBrandLogo"
              src={largeNavBarLogo}
              alt="Ohana homes logo"
            />
          </Link>
          <Link to="/">
            <img
              className="smallBrandLogo"
              src={smallNavBarLogo}
              alt="Ohana homes logo"
            />
          </Link>
        </div>
        <div className="navigationMenu">
          <ul>
            <li>
              <a id="buyButton" className="navBarLink" href="/marketplace">
                Buy
              </a>
            </li>
            <li>
              <a className="navBarLink" href="/marketplace">
                Rent
              </a>
            </li>
            <li className="dropdown">
              <button
                className={
                  isDropdownExpanded
                    ? "navBtn dropBtn expanded"
                    : "navBtn dropBtn"
                }
                onClick={() => {
                  setIsDropdownExpanded(!isDropdownExpanded);
                }}
              >
                Islands
                <span
                  className={
                    isDropdownExpanded ? "chevron expanded" : "chevron"
                  }
                ></span>
              </button>
              <div
                className={
                  isDropdownExpanded
                    ? "dropdownContent expanded"
                    : "dropdownContent"
                }
              >
                <a className="dropdownLink left" href="/hawai'i">
                  Hawai&apos;i
                </a>
                <a className="dropdownLink right" href="/maui">
                  Maui
                </a>
                <a className="dropdownLink left" href="/o'ahu">
                  O&apos;ahu
                </a>
                <a className="dropdownLink right" href="/kaua&apos;i">
                  Kaua&apos;i
                </a>
                <a className="dropdownLink left" href="/moloka'i">
                  Moloka&apos;i
                </a>
                <a className="dropdownLink right" href="/lāna&apos;i">
                  Lāna&apos;i
                </a>
                <a className="dropdownLink left" href="/ni&apos;ihau">
                  Ni&apos;ihau
                </a>
                <a className="dropdownLink right" href="/kaho&apos;olawe">
                  Kaho&apos;olawe
                </a>
              </div>
            </li>
            <li>
              <a className="navBarLink" href="/aboutUs">
                About
              </a>
            </li>
            <li>
              <a className="navBarLink" href="/contactUs">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <AccountMenu />
        <button
          className="hamburger"
          onClick={() => {
            setIsNavExpanded(!isNavExpanded);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="white"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </nav>
    </>
  );
};

export default Navbar;
