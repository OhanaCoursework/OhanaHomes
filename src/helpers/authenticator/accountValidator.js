export function validateAccountDetails(username, password, secondPassword) {
  if (!username || typeof username !== "string") {
    return "Username is empty or invalid";
  }

  if (username.length > 15) {
    return "Username cannot be more than 15 characters long";
  }

  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    return "Username can only contain letters and numbers";
  }

  if (doesUsernameExist(username)) {
    return "Username already exists";
  }

  if (!password || typeof password !== "string") {
    return "Please enter a valid password";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }

  if (password.length > 20) {
    return "Password cannot be more than 20 characters long";
  }

  if (!secondPassword || typeof secondPassword !== "string") {
    return "Please enter a valid password confirmation";
  }

  if (password !== secondPassword) {
    return "Passwords do not match";
  }
}

function doesUsernameExist(username) {
  let users = JSON.parse(localStorage.users || "[]");
  const foundUser = users.find((user) => user.username === username);
  if (foundUser) {
    return true;
  } else {
    return false;
  }
}
