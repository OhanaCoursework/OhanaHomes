import { resetFormFormFields } from "../../generalComponents/form/formField";

export function openLoginModal() {
  document.getElementById("loginForm").reset();
  hideSignUpModal();
  document.querySelector(".login").classList.add("show-modal");
}

export function openSignUpModal() {
  document.getElementById("signUpForm").reset();
  hideLoginModal();
  document.querySelector(".signUp").classList.add("show-modal");
}

export function hideLoginModal() {
  document.querySelector(".login").classList.remove("show-modal");
  resetFormFormFields(document.getElementById("loginForm"));
  resetLoginError();
}

export function hideSignUpModal() {
  document.querySelector(".signUp").classList.remove("show-modal");
  resetFormFormFields(document.getElementById("signUpForm"));
}

export function displayLoggedInUI() {
  document.querySelector(".accountMenu").classList.add("loggedIn");
}

export function resetLoginError() {
  const loginError = document.getElementById("loginError");
  loginError.innerHTML = "";
  loginError.style.opacity = 0;
}