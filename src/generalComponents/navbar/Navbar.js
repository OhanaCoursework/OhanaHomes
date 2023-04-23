import React, { useEffect } from "react";
import largeNavBarLogo from "../../assets/images/logo/navbarLogo.svg";
import smallNavBarLogo from "../../assets/images/logo/smallNavBarLogo.svg";
import accountIcon from "../../assets/images/icons/myAccount.svg";
import Alert from "../alerts/alert";
import LoginModal from "../accountPopUps/LoginModal.js";
import SignUpModal from "../accountPopUps/SignUpModal.js";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  isUserLoggedIn,
  attemptUserLogin,
  setupLocalUsers,
  createAccount,
  removeAccountCookie,
  getUsername,
} from "../../helpers/authenticator/authenticator.js";
import { validateAccountDetails } from "../../helpers/authenticator/accountValidator.js";
import "./navbar.scss";

const Navbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isDropdownExpanded, setIsDropdownExpanded] = useState(false);
  const [isMyAccountExpanded, setIsMyAccountExpanded] = useState(false);
  const [alertActive, setAlertActive] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertType, setAlertType] = useState("");
  const [alertTimeout, setAlertTimeout] = useState(false);

  function logOut() {
    removeAccountCookie();
    removeLoggedInUi();
    showAlert("Successfully Logged Out!", "success", true);
  }

  function showAlert(text, type, timeout) {
    setAlertText(text);
    setAlertType(type);
    setAlertTimeout(timeout);
    setAlertActive(true);
  }

  function displaySignUpError(error) {
    const signUpError = document.getElementById("signUpError");
    signUpError.innerHTML = error;
    signUpError.style.opacity = 1;
  }

  function resetSignUpError() {
    const signUpError = document.getElementById("signUpError");
    signUpError.innerHTML = "Error";
    signUpError.style.opacity = 0;
  }

  function displayLoginError(error) {
    const loginError = document.getElementById("loginError");
    loginError.innerHTML = error;
    loginError.style.opacity = 1;
  }

  function resetLoginError() {
    const loginError = document.getElementById("loginError");
    loginError.innerHTML = "Error";
    loginError.style.opacity = 0;
  }

  function hideLoginModal() {
    document.querySelector(".login").classList.remove("show-modal");
  }

  function hideSignUpModal() {
    document.querySelector(".signUp").classList.remove("show-modal");
  }

  function windowOnClick(event) {
    if (event.target === document.querySelector(".login")) {
      hideLoginModal();
    } else if (event.target === document.querySelector(".signUp")) {
      hideSignUpModal();
    }
  }

  function checkLoginInCookieAndHandleResponse() {
    if (isUserLoggedIn()) {
      displayLoggedInUI();
    } else {
      removeLoggedInUi();
    }
  }

  function removeLoggedInUi() {
    document.querySelector(".accountMenu").classList.remove("loggedIn");
    setIsMyAccountExpanded(false);
  }

  function displayLoggedInUI() {
    document.querySelector(".accountMenu").classList.add("loggedIn");
  }

  function getTimeSpecificMessage() {
    const hourOfDay = new Date().getHours();

    if (hourOfDay < 12) {
      return "Good morning, \n";
    } else if (hourOfDay < 18) {
      return "Good afternoon, \n";
    } else {
      return "Good evening, \n";
    }
  }

  function loginSubmit(e) {
    e.preventDefault(); //to prevent form submission
    let error = attemptUserLogin(e.target[0].value, e.target[1].value);
    if (error) {
      displayLoginError(error);
    } else {
      if (isUserLoggedIn()) {
        displayLoggedInUI();
        hideLoginModal();
        showAlert("Login Successful", "success", true);
      } else {
        showAlert("Login Unsuccessful", "error", false);
      }
    }
  }

  function createAccountSubmit(e) {
    e.preventDefault(); //to prevent form submission

    let error = validateAccountDetails(
      e.target[0].value,
      e.target[1].value,
      e.target[2].value
    );
    if (error) {
      displaySignUpError(error);
    } else {
      createAccount(e.target[0].value, e.target[1].value);
      hideSignUpModal();
      showAlert("Sign Up Successful", "success", true);
    }
  }

  useEffect(() => {
    if (!localStorage.users) {
      setupLocalUsers();
    }

    //Implementing the setInterval method to check every 5 seconds if the users login cookie exists. If it does it adds loggedIn to the account menu which displays the account menu and not sign up/ log in buttons
    const interval = setInterval(() => {
      checkLoginInCookieAndHandleResponse();
    }, 5000);

    //every time components are re rendered check if is logged in
    checkLoginInCookieAndHandleResponse();

    window.addEventListener("click", windowOnClick);

    const loginModal = document.querySelector(".login");
    const signUpModal = document.querySelector(".signUp");

    const loginTrigger = document.querySelector(".loginTrigger");
    const signUpTrigger = document.querySelector(".signUpTrigger");
    loginTrigger.addEventListener("click", openLoginModal);
    signUpTrigger.addEventListener("click", openSignUpModal);

    const createAccountLink = document.querySelector("#createAccountLink");
    const loginLink = document.querySelector("#loginLink");
    createAccountLink.addEventListener("click", openSignUpModal);
    loginLink.addEventListener("click", openLoginModal);

    const loginForm = document.getElementById("loginForm");
    const signUpForm = document.getElementById("signUpForm");
    loginForm.addEventListener("submit", loginSubmit);
    signUpForm.addEventListener("submit", createAccountSubmit);

    const loginCloseButton = document.getElementById("loginCloseButton");
    const signUpCloseButton = document.getElementById("signUpCloseButton");
    loginCloseButton.addEventListener("click", hideLoginModal);
    signUpCloseButton.addEventListener("click", hideSignUpModal);

    function openLoginModal() {
      loginForm.reset();
      resetLoginError();
      hideSignUpModal();
      loginModal.classList.add("show-modal");
    }

    function openSignUpModal() {
      signUpForm.reset();
      resetSignUpError();
      hideLoginModal();
      signUpModal.classList.add("show-modal");
    }

    return () => {
      window.removeEventListener("click", windowOnClick);
      loginTrigger.removeEventListener("click", openLoginModal);
      signUpTrigger.removeEventListener("click", openSignUpModal);
      loginForm.removeEventListener("submit", loginSubmit);
      signUpForm.removeEventListener("submit", createAccountSubmit);
      createAccountLink.removeEventListener("click", openSignUpModal);
      loginLink.removeEventListener("click", openLoginModal);
      loginCloseButton.removeEventListener("click", hideLoginModal);
      signUpCloseButton.removeEventListener("click", hideSignUpModal);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <Alert
        active={alertActive}
        setActive={setAlertActive}
        alert={alertText}
        alertType={alertType}
        timeout={alertTimeout}
      />
      <LoginModal />
      <SignUpModal />
      <nav className={isNavExpanded ? "navigation expanded" : "navigation"}>
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
              <a className="navBarLink" href="/contact">
                Contact
              </a>
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
              id="accountBtn"
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
              <p>
                {getTimeSpecificMessage()}
                <b>{getUsername()}</b>
              </p>
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
