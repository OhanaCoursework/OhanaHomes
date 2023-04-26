import * as accountLoginHelper from "../../../helpers/authenticator/accountLoginHelper";

import {
  hideSignUpModal,
  resetLoginError,
} from "../../../helpers/authenticator/accountLoginHelper";

describe("Modal functions", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="topNavBarContainer"></div>
      <div class="login"></div>
      <div class="signUp"></div>
      <div class="accountMenu"></div>
      <form id="loginForm">
        <input type="text" name="username" />
        <input type="password" name="password" />
      </form>
      <form id="signUpForm">
        <input type="text" name="username" />
        <input type="password" name="password" />
      </form>
      <div id="loginError"></div>
    `;
  });

  describe("openLoginModal", () => {
    let hideSignUpModalSpy;

    beforeEach(() => {
      hideSignUpModalSpy = jest
        .spyOn(accountLoginHelper, "hideSignUpModal")
        .mockImplementation(() => {});
    });

    afterEach(() => {
      hideSignUpModalSpy.mockRestore();
    });

    it("should add show-modal class to login element", () => {
      accountLoginHelper.openLoginModal();
      const loginModal = document.querySelector(".login");
      expect(loginModal.classList.contains("show-modal")).toBe(true);
    });

    it("should reset the login form", () => {
      const loginForm = document.getElementById("loginForm");
      const resetSpy = jest.spyOn(loginForm, "reset");
      accountLoginHelper.openLoginModal();
      expect(resetSpy).toHaveBeenCalled();
    });

    it("should set the topNavBarContainer z-index to 2", () => {
      accountLoginHelper.openLoginModal();
      const topNavBarContainer = document.getElementById("topNavBarContainer");
      expect(topNavBarContainer.style.zIndex).toBe("2");
    });
  });

  describe("openSignUpModal", () => {
    it("should add show-modal class to sign up element", () => {
      accountLoginHelper.openSignUpModal();
      const signUpModal = document.querySelector(".signUp");
      expect(signUpModal.classList.contains("show-modal")).toBe(true);
    });

    it("should reset the sign up form", () => {
      const signUpForm = document.getElementById("signUpForm");
      const resetSpy = jest.spyOn(signUpForm, "reset");
      accountLoginHelper.openSignUpModal();
      expect(resetSpy).toHaveBeenCalled();
    });

    it("should set the topNavBarContainer z-index to 2", () => {
      accountLoginHelper.openSignUpModal();
      const topNavBarContainer = document.getElementById("topNavBarContainer");
      expect(topNavBarContainer.style.zIndex).toBe("2");
    });
  });

  describe("hideLoginModal", () => {
    it("should remove show-modal class from login element", () => {
      const loginModal = document.querySelector(".login");
      loginModal.classList.add("show-modal");
      accountLoginHelper.hideLoginModal();
      expect(loginModal.classList.contains("show-modal")).toBe(false);
    });

    it("should reset the login error message", () => {
      document.getElementById("loginError").innerHTML = "Error message";
      document.getElementById("loginError").style.opacity = 1;
      resetLoginError();
      expect(document.getElementById("loginError").innerHTML).toBe("");
      expect(document.getElementById("loginError").style.opacity).toBe("0");
    });
  });

  describe("resetLoginError", () => {
    it("should reset the login error message", () => {
      document.getElementById("loginError").innerHTML = "Error message";
      document.getElementById("loginError").style.opacity = 1;
      resetLoginError();
      expect(document.getElementById("loginError").innerHTML).toBe("");
      expect(document.getElementById("loginError").style.opacity).toBe("0");
    });
  });

  describe("hideSignUpModal", () => {
    it("should remove show-modal class from sign up element", () => {
      const signUpModal = document.querySelector(".signUp");
      signUpModal.classList.add("show-modal");
      hideSignUpModal();
      expect(signUpModal.classList.contains("show-modal")).toBe(false);
    });
  });
});
