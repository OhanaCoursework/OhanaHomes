import "./AccountMenu.css";

import React, { useEffect, useState } from "react";

import {
  getUsername,
  removeAccountCookie,
} from "../../helpers/authenticator/authenticator.js";
import { getTimeSpecificMessage } from "../../helpers/timeMessageHelper";
import accountIcon from "../../assets/images/icons/myAccount.svg";
import {
  displayLoggedInUI,
  hideLoginModal,
  hideSignUpModal,
  openLoginModal,
  openSignUpModal,
} from "../../helpers/authenticator/accountLoginHelper";
import { isUserLoggedIn } from "../../helpers/authenticator/authenticator.js";
import { showAlert } from "../alerts/alert";

const AccountMenu = () => {
  const [isMyAccountExpanded, setIsMyAccountExpanded] = useState(false);

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

  function windowOnClick(event) {
    if (event.target === document.querySelector(".login")) {
      hideLoginModal();
    } else if (event.target === document.querySelector(".signUp")) {
      hideSignUpModal();
    }
  }

  function logOut() {
    removeAccountCookie();
    removeLoggedInUi();
    showAlert("Successfully Logged Out!", "success", true);
  }

  useEffect(() => {
    //Implementing the setInterval method to check every 5 seconds if the users login cookie exists. If it does it adds loggedIn to the account menu which displays the account menu and not sign up/ log in buttons
    const interval = setInterval(() => {
      checkLoginInCookieAndHandleResponse();
    }, 5000);

    //every time components are re rendered check if is logged in
    checkLoginInCookieAndHandleResponse();

    window.addEventListener("click", windowOnClick);

    return () => {
      window.removeEventListener("click", windowOnClick);
      clearInterval(interval);
    };
  });

  return (
    <div className="accountMenu">
      <a id="outerSignUpButton" className="navBtn" onClick={openSignUpModal}>
        Sign Up
      </a>
      <button
        id="outerLoginButton"
        className="loginBtn"
        onClick={openLoginModal}
      >
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
  );
};

export default AccountMenu; 