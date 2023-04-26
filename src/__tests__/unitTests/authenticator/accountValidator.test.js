import {
  validateUsername,
  validatePassword,
} from "../../../helpers/authenticator/accountValidator";

describe("validateUsername", () => {
  it('should return "Username is empty" when username is empty', () => {
    expect(validateUsername("")).toEqual("Username is empty");
  });

  it('should return "Username cannot be more than 20 characters long" when username is too long', () => {
    expect(validateUsername("thisusernameistoolongtoolong")).toContain(
      "Username cannot be more than 15 characters long"
    );
  });

  it('should return "Username already exists" when username already exists', () => {
    localStorage.users = JSON.stringify([{ username: "testuser" }]);
    expect(validateUsername("testuser")).toEqual("Username already exists");
  });

  it('should return "Username must only contain number and letters" when username contains special characters', () => {
    expect(validateUsername("testuser!")).toEqual(
      "Username must only contain number and letters"
    );
  });

  it("should return undefined when username is valid", () => {
    expect(validateUsername("testuser123")).toBeUndefined();
  });
});

describe("validatePassword", () => {
  it('should return "Please enter a password" when password is empty', () => {
    expect(validatePassword("")).toEqual("Please enter a password");
  });

  it('should return "Password must be at least 8 characters long" when password is too short', () => {
    expect(validatePassword("abc123")).toEqual(
      "Password must be at least 8 characters long"
    );
  });

  it('should return "Password cannot be more than 20 characters long" when password is too long', () => {
    expect(validatePassword("Abcdefghijklmnopqrst1!")).toContain(
      "Password cannot be more than 20 characters long"
    );
  });

  it('should return "Password must contain:\nOne lowercase letter\nOne Capital letter\nOne number\nOne special character" when password is invalid', () => {
    expect(validatePassword("password")).toEqual(
      "Password must contain:\nOne lowercase letter\nOne Capital letter\nOne number\nOne special character"
    );
  });

  it("should return undefined when password is valid", () => {
    expect(validatePassword("Password123!")).toBeUndefined();
  });
});
