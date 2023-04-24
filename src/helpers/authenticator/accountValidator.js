const alphaNumericPattern = new RegExp("^[a-zA-Z0-9]+$");
const passwordPattern = new RegExp(
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])[a-zA-Z0-9!@#$£%^&*()_+]+$"
);

export function validateAccountDetails(username, password, secondPassword) {
  let usernameErrors = validateUsername(username);

  if (usernameErrors) {
    return usernameErrors;
  }

  let passwordErrors = validatePassword(password);

  if (passwordErrors) {
    return passwordErrors;
  }

  if (!secondPassword) {
    return "Please enter your password again";
  }

  if (password !== secondPassword) {
    return "Passwords do not match";
  }
}

export function validateUsername(username) {
  if (!username) {
    return "Username is empty";
  }

  if (username.length > 15) {
    return "Username cannot be more than 15 characters long";
  }

  if (doesUsernameExist(username)) {
    return "Username already exists";
  }

  if (!alphaNumericPattern.test(username)) {
    return "Username must only contain number and letters";
  }
}

export function validatePassword(password) {
  if (!password) {
    return "Please enter a password";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }

  if (password.length > 20) {
    return "Password cannot be more than 20 characters long";
  }

  if (!passwordPattern.test(password)) {
    return "Password must contain:\nOne lowercase letter\nOne Capital letter\nOne number\nOne special character";
  }
}

function doesUsernameExist(username) {
  let users = JSON.parse(localStorage.users);
  const foundUser = users.find((user) => user.username === username);
  if (foundUser) {
    return true;
  } else {
    return false;
  }
}
