import {
  attemptUserLogin,
  createAccount,
  removeAccountCookie,
  getUsername,
  isUserLoggedIn,
  setupLocalUsers,
  createSessionCookie,
} from "../../../helpers/authenticator/authenticator";

describe("Example File", () => {
  beforeEach(() => {
    setupLocalUsers();
  });

  afterEach(() => {
    removeAccountCookie();
  });

  it("should return an error message if username is empty", () => {
    const result = attemptUserLogin("", "password");
    expect(result).toEqual("Username is empty");
  });

  it("should return an error message if password is empty", () => {
    const result = attemptUserLogin("admin", "");
    expect(result).toEqual("Password is empty");
  });

  it("should return an error message if username does not exist", () => {
    const result = attemptUserLogin("nonexistentuser", "password");
    expect(result).toEqual("Incorrect username or password");
  });

  it("should return an error message if password is incorrect", () => {
    const result = attemptUserLogin("admin", "wrongpassword");
    expect(result).toEqual("Incorrect username or password");
  });

  it("should create a new user account", () => {
    const username = "newuser";
    const password = "newpassword";
    createAccount(username, password);
    const users = JSON.parse(localStorage.users);
    expect(users).toContainEqual({ username, password });
  });

  it("should remove the user session cookie", () => {
    createSessionCookie("testuser");
    removeAccountCookie();
    expect(getUsername()).toBeFalsy();
    expect(isUserLoggedIn()).toBeFalsy();
  });
});
