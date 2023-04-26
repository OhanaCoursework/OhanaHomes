import React, { useEffect } from "react";
/* Importing necessary files and images */
import "./accountPopUp.css";
import { createAccount } from "../../../helpers/authenticator/authenticator";
import {
  hideSignUpModal,
  openLoginModal,
} from "../../../helpers/authenticator/accountLoginHelper";
import FormField, {
  invalidateFormField,
  validateFormField,
} from "../../../generalComponents/form/formField";
import {
  validateUsername,
  validatePassword,
} from "../../../helpers/authenticator/accountValidator";
import { showAlert } from "../../alerts/alert";

const SignUpModal = () => {
  function usernameValidator(event) {
    console.log("username val");
    if (event.target.value) {
      console.log(event.target);
      formValidator(event.target, validateUsername);
    } else {
      validateFormField(event.target);
    }
  }

  function passwordValidator(event) {
    if (event.target.value) {
      formValidator(event.target, validatePassword);
    } else {
      validateFormField(event.target);
    }
  }

  function formValidator(target, validator) {
    let errors = validator(target.value);
    if (errors) {
      invalidateFormField(target, errors);
      return true;
    } else {
      validateFormField(target);
      return false;
    }
  }

  function createAccountSubmit(e) {
    e.preventDefault(); //to prevent form submission
    const usernameInput = document.getElementById("signUpUsername");
    const passwordInput = document.getElementById("signUpPassword");

    let usernameError = formValidator(usernameInput, validateUsername);

    let passwordError = formValidator(passwordInput, validatePassword);

    if (usernameError || passwordError) {
      showAlert("Sign Up Unsuccessful", "error", true);
    } else {
      createAccount(e.target[0].value, e.target[1].value);
      hideSignUpModal();
      showAlert("Sign Up Successful", "success", true);
    }
  }

  useEffect(() => {
    const signUpForm = document.getElementById("signUpForm");
    signUpForm.addEventListener("submit", createAccountSubmit);

    const signUpCloseButton = document.getElementById("signUpCloseButton");
    signUpCloseButton.addEventListener("click", hideSignUpModal);

    return () => {
      signUpForm.removeEventListener("submit", createAccountSubmit);
      signUpCloseButton.removeEventListener("click", hideSignUpModal);
    };
  });

  return (
    <div className="modal signUp">
      <div className="modal-content">
        <span id="signUpCloseButton" className="close-button">
          &times;
        </span>
        <h1>Create Account</h1>
        <div className="modalForm">
          <form id="signUpForm" className="accountPopUpForm">
            <FormField
              name="username"
              id="signUpUsername"
              label="Username"
              type="text"
              validator={usernameValidator}
            />
            <FormField
              name="password"
              id="signUpPassword"
              label="Password"
              type="password"
              validator={passwordValidator}
            />
            <button id="signup-submit" type="submit" className="submit">
              Create Account
            </button>
          </form>
        </div>
        <p className="otherAccountPopUpLink">
          Already have and account?{" "}
          <a id="loginLink" onClick={openLoginModal}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpModal;
