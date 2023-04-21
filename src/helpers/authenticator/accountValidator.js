export function validateAccountDetails(username, password, secondPassword) {
  if (!username) {
    return "Username is empty";
  }

  if(username.length > 15) {
    return "Username cannot be more than 15 characters long";
  }

  if (doesUsernameExist(username)) {
    return "Username already exists";
  } 

  if (!password) {
    return "Please enter a password";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }

  if(password.length > 20) {
    return "Password cannot be more than 20 characters long";
  }

  if (!secondPassword) {
    return "Please enter your password again";
  }

  if (password !== secondPassword) {
    return "Passwords do not match";
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