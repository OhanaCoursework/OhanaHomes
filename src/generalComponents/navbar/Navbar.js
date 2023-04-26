import React from "react";
import largeNavBarLogo from "../../assets/images/logo/navbarLogo.svg";
import smallNavBarLogo from "../../assets/images/logo/smallNavBarLogo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./navbar.scss";

const Navbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isDropdownExpanded, setIsDropdownExpanded] = useState(false);

  return (
    <nav className="navigation">
      <div className="brandLogoDiv">
        <Link aria-label="Link to the home page" to="/">
          <img
            className="largeBrandLogo"
            src={largeNavBarLogo}
            alt="Ohana homes logo"
          />
        </Link>
        <Link aria-label="Link to the home page" o="/">
          <img
            className="smallBrandLogo"
            src={smallNavBarLogo}
            alt="Ohana homes logo"
          />
        </Link>
      </div>
      <div
        className={isNavExpanded ? "navigationMenu expanded" : "navigationMenu"}
      >
        <ul>
          <li>
            <a id="buyButton" aria-label="Link in Navigation Bar to Marketplace Page" className="navBarLink" href="/marketplace">
              Buy
            </a>
          </li>
          <li>
            <a className="navBarLink" aria-label="Link in Navigation Bar to Rent Page" href="/marketplace">
              Rent
            </a>
          </li>
          <li className="dropdown">
            <button
              aria-label="Dropdown Of Islands"
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
                className={isDropdownExpanded ? "chevron expanded" : "chevron"}
              ></span>
            </button>
            <div
              className={
                isDropdownExpanded
                  ? "dropdownContent expanded"
                  : "dropdownContent"
              }
            >
              <a className="dropdownLink left" aria-label="Link in Navigation Bar to Informational Page on Hawai'i" href="/hawai'i">
                Hawai&apos;i
              </a>
              <a className="dropdownLink right" aria-label="Link in Navigation Bar to Informational Page on Maui" href="/maui">
                Maui
              </a>
              <a className="dropdownLink left" aria-label="Link in Navigation Bar to Informational Page on o'ahu" href="/o'ahu">
                O&apos;ahu
              </a>
              <a className="dropdownLink right" aria-label="Link in Navigation Bar to Informational Page on Kaua'i" href="/kaua&apos;i">
                Kaua&apos;i
              </a>
              <a className="dropdownLink left" aria-label="Link in Navigation Bar to Informational Page on Moloka" href="/moloka'i">
                Moloka&apos;i
              </a>
              <a className="dropdownLink right" aria-label="Link in Navigation Bar to Informational Page on Lana'i" href="/lāna&apos;i">
                Lāna&apos;i
              </a>
              <a className="dropdownLink left" aria-label="Link in Navigation Bar to Informational Page on ni'ihau" href="/ni&apos;ihau">
                Ni&apos;ihau
              </a>
              <a className="dropdownLink right" aria-label="Link in Navigation Bar to Informational Page on Kaho'olawe" href="/kaho&apos;olawe">
                Kaho&apos;olawe
              </a>
            </div>
          </li>
          <li>
            <a className="navBarLink" aria-label="Link in Navigation Bar to the About Us page" href="/aboutUs">
              About
            </a>
          </li>
          <li>
            <a className="navBarLink" aria-label="Link in Navigation Bar to the Contact Us page" href="/contactUs">
              Contact
            </a>
          </li>
          <li className="mobile">
            <a className="navBarLink" aria-label="Link in Navigation Bar to Create an Account" href="/signUp">
              Sign Up
            </a>
            <a className="navBarLink" aria-label="Link in Navigation Bar to create an account" href="/login">
              Log in
            </a>
          </li>
        </ul>
      </div>
      <div className="accountMenu">
        <a id="outerSignUpButton" aria-label="Link in Navigation Bar to to Create an Account" className="navBtn" href="/signUp">
          Sign Up
        </a>
        <a id="outerLoginButton" aria-label="Link in Navigation Bar to to Login" className="loginBtn" href="/login">
          Log in
        </a>
      </div>
      <button
        aria-label="View Navigation Bar"
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
  );
};

export default Navbar;
