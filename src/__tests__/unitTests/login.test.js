import React from "react";
import LoginModal from "../../generalComponents/accountPopUps/LoginModal";
import Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";

configure({ adapter: new Adapter() });

jest.mock("../../helpers/authenticator/authenticator", () => ({
  getUsername: jest.fn(() => "JohnDoe"),
  attemptUserLogin: jest.fn(() => "Invalid credentials"),
  isUserLoggedIn: jest.fn(),
  removeAccountCookie: jest.fn(),
}));

describe("LoginModal", () => {
  it("should display error message if login fails", () => {
    const wrapper = shallow(<LoginModal />);
    const usernameInput = wrapper.find('input[name="username"]');
    const passwordInput = wrapper.find('input[name="password"]');
    const submitButton = wrapper.find("button");

    // Set input values
    usernameInput.simulate("change", { target: { value: "test@example.com" } });
    passwordInput.simulate("change", { target: { value: "password123" } });

    // Submit the form
    submitButton.simulate("submit");

    // Check if error message is displayed
    expect(wrapper.find("#loginError").text()).toContain("Error");
  });

  it("should display success message if login succeeds", () => {
    const wrapper = shallow(<LoginModal />);
    const usernameInput = wrapper.find('input[name="username"]');
    const passwordInput = wrapper.find('input[name="password"]');
    const submitButton = wrapper.find("button");

    // Set input values
    usernameInput.simulate("change", { target: { value: "test@example.com" } });
    passwordInput.simulate("change", { target: { value: "password123" } });

    // Submit the form
    submitButton.simulate("submit");

    // Check if success message is displayed
    expect(wrapper.text()).toContain("Sign in");
  });

  it("should display error message if username is not entered", () => {
    const wrapper = shallow(<LoginModal />);
    const passwordInput = wrapper.find('input[name="password"]');
    const submitButton = wrapper.find("button");

    // Set input values
    passwordInput.simulate("change", { target: { value: "password123" } });

    // Submit the form
    submitButton.simulate("submit");

    // Check if error message is displayed
    expect(wrapper.find("#loginError").text()).toContain("Error");
  });

  it("should display error message if password is not entered", () => {
    const wrapper = shallow(<LoginModal />);
    const usernameInput = wrapper.find('input[name="username"]');
    const submitButton = wrapper.find("button");

    // Set input values
    usernameInput.simulate("change", { target: { value: "test@example.com" } });

    // Submit the form
    submitButton.simulate("submit");

    // Check if error message is displayed
    expect(wrapper.find("#loginError").text()).toContain("Error");
  });

  it("should display error message if both username and password are not entered", () => {
    const wrapper = shallow(<LoginModal />);
    const submitButton = wrapper.find("button");

    // Submit the form without entering username and password
    submitButton.simulate("submit");

    // Check if error message is displayed
    expect(wrapper.find("#loginError").text()).toContain("Error");
  });

  it("should clear the form fields after successful login", () => {
    const wrapper = shallow(<LoginModal />);
    const usernameInput = wrapper.find('input[name="username"]');
    const passwordInput = wrapper.find('input[name="password"]');
    const submitButton = wrapper.find("button");

    // Set input values
    usernameInput.simulate("change", { target: { value: "test@example.com" } });
    passwordInput.simulate("change", { target: { value: "password123" } });

    // Submit the form
    submitButton.simulate("submit");

    // Check if form fields are cleared after successful login
    expect(wrapper.find('input[name="username"]').prop("value") || "").toBe("");
    expect(wrapper.find('input[name="password"]').prop("value") || "").toBe("");
  });
});
