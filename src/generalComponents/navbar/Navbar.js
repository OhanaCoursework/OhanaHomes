import React, { useEffect } from "react";
import largeNavBarLogo from "../../assets/images/logo/navbarLogo.svg";
import smallNavBarLogo from "../../assets/images/logo/smallNavBarLogo.svg";
import accountIcon from "../../assets/images/icons/myAccount.svg";
import LoginModal from "../accountPopUps/LoginModal.js";
import SignUpModal from "../accountPopUps/SignUpModal.js";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  handleLogin,
  validateLogin,
  setupLocalUsers,
  doesUsernameExist,
  doPasswordsMatch,
  createAccount,
  logOut,
  getUsername,
} from "../../helpers/authenticator/authenticator.js";
import "./navbar.scss";

const Navbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isDropdownExpanded, setIsDropdownExpanded] = useState(false);
  const [isMyAccountExpanded, setIsMyAccountExpanded] = useState(false);

  useEffect(() => {
    const loginModal = document.querySelector(".login");
    const signUpModal = document.querySelector(".signUp");
    const loginTriggers = document.getElementsByClassName("loginTrigger");
    const signUpTriggers = document.getElementsByClassName("signUpTrigger");
    const closeButtons = document.getElementsByClassName("close-button");
    const accountMenu = document.querySelector(".accountMenu");
    const loginForm = document.getElementById("loginForm");
    const signUpForm = document.getElementById("signUpForm");

    if (!localStorage.users) {
      setupLocalUsers();
    }

    function showModal(event) {
      for (const loginTrigger of loginTriggers) {
        if (event.target === loginTrigger) {
          loginModal.classList.add("show-modal");
        }
      }
      for (const signUpTrigger of signUpTriggers) {
        if (event.target === signUpTrigger) {
          signUpModal.classList.add("show-modal");
        }
      }
    }

    function hideModal(event) {
      for (const loginTrigger of loginTriggers) {
        if (event.target === loginTrigger) {
          loginModal.classList.remove("show-modal");
        }
      }
      for (const signUpTrigger of signUpTriggers) {
        if (event.target === signUpTrigger) {
          signUpModal.classList.remove("show-modal");
        }
      }
    }

    function hideAllModals() {
      loginModal.classList.remove("show-modal");
      signUpModal.classList.remove("show-modal");
    }

    function windowOnClick(event) {
      if (event.target === loginModal) {
        hideModal(loginModal);
      } else if (event.target === signUpModal) {
        hideModal(signUpModal);
      }
    }

    //Implementing the setInterval method
    const interval = setInterval(() => {
      handleLogin(accountMenu);
    }, 5000);

    function loginSubmit(e) {
      e.preventDefault(); //to prevent form submission
      validateLogin(e.target[0].value, e.target[1].value);
      if (handleLogin(accountMenu)) {
        loginModal.classList.remove("show-modal");
        loginForm.reset();
      } else {
        alert("Could not log in");
      }
    }

    function createAccountSubmit(e) {
      e.preventDefault(); //to prevent form submission
      if (doesUsernameExist(e.target[0].value)) {
        alert("Username exists");
      } else if (!doPasswordsMatch(e.target[1].value, e.target[2].value)) {
        alert("passwords dont match");
      } else {
        createAccount(e.target[0].value, e.target[1].value);
        signUpModal.classList.remove("show-modal");
        signUpForm.reset();
      }
    }

    handleLogin(accountMenu);

    for (var i = 0; i < loginTriggers.length; i++) {
      loginTriggers[i].addEventListener("click", showModal);
    }
    for (var j = 0; j < signUpTriggers.length; j++) {
      signUpTriggers[j].addEventListener("click", showModal);
    }
    for (const closeButton of closeButtons) {
      closeButton.addEventListener("click", hideAllModals);
    }
    loginForm.addEventListener("submit", loginSubmit);
    signUpForm.addEventListener("submit", createAccountSubmit);
    window.addEventListener("click", windowOnClick);

    function openSignUpModal() {
      loginModal.classList.remove("show-modal");
      signUpModal.classList.add("show-modal");
    }

    function openLoginModal() {
      signUpModal.classList.remove("show-modal");
      loginModal.classList.add("show-modal");
    }

    const createAccountLink = document.querySelector(".createAccountLink");

    createAccountLink.addEventListener("click", openSignUpModal);

    const loginLink = document.querySelector(".loginLink");

    loginLink.addEventListener("click", openLoginModal);

    return () => {
      window.removeEventListener("click", windowOnClick);
      for (var z = 0; z < loginTriggers.length; z++) {
        loginTriggers[z].removeEventListener("click", showModal);
      }
      for (var k = 0; k < signUpTriggers.length; k++) {
        signUpTriggers[k].removeEventListener("click", showModal);
      }
      for (const closeButton of closeButtons) {
        closeButton.removeEventListener("click", hideAllModals);
      }
      loginForm.removeEventListener("submit", loginSubmit);
      signUpForm.removeEventListener("submit", createAccountSubmit);
      createAccountLink.removeEventListener("click", openSignUpModal);
      loginLink.removeEventListener("click", openLoginModal);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <LoginModal />
      <SignUpModal />
      <nav className="navigation">
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
        <div
          className={
            isNavExpanded ? "navigationMenu expanded" : "navigationMenu"
          }
        >
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
                <a className="dropdownLink left" href="/islands">
                  Hawai&apos;i
                </a>
                <a className="dropdownLink right" href="/islands">
                  Maui
                </a>
                <a className="dropdownLink left" href="/islands">
                  O&apos;ahu
                </a>
                <a className="dropdownLink right" href="/islands">
                  Kaua&apos;i
                </a>
                <a className="dropdownLink left" href="/islands">
                  Moloka
                </a>
                <a className="dropdownLink right" href="/islands">
                  Lāna&apos;i
                </a>
                <a className="dropdownLink left" href="/islands">
                  Ni&apos;hau
                </a>
                <a className="dropdownLink right" href="/islands">
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
              <a className="navBarLink" href="/contact">
                Contact
              </a>
            </li>
            <li className="mobile">
              <a className="navBarLink signUpTrigger">Sign Up</a>
              <a className="navBarLink loginTrigger">Log in</a>
            </li>
          </ul>
        </div>
        <div className="accountMenu">
          <a id="outerSignUpButton" className="navBtn signUpTrigger">
            Sign Up
          </a>
          <button id="outerLoginButton" className="loginBtn loginTrigger">
            Log in
          </button>
          <div className="myAccount">
            <button
              className={
                isMyAccountExpanded
                  ? "accountButton navBtn expanded"
                  : "accountButton navBtn"
              }
              onClick={() => {
                setIsMyAccountExpanded(!isMyAccountExpanded);
              }}
            >
              <img className="accountIcon" src={accountIcon} />
              My Account
            </button>
            <div
              className={
                isMyAccountExpanded
                  ? "myAccountContent expanded"
                  : "myAccountContent"
              }
            >
              <p>Hi {getUsername()}</p>
              <button
                className="logOutButton"
                onClick={() => {
                  logOut();
                }}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
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
