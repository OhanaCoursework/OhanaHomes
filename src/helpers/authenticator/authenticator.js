const validLogins = [
  {
    username: "a",
    password: "a",
  },
  {
    username: "admin",
    password: "password",
  },
];

export function validateLogin(username, password) {
  let users = JSON.parse(localStorage.users);
  for (var i = 0; i < users.length; i++) {
    if (users[i].username === username && users[i].password === password) {
      return createSessionCookie(username);
    }
  }
}

export function handleLogin(accountMenu) {
  if (checkIfLoggedIn()) {
    accountMenu.classList.add("loggedIn");
    return true;
  } else {
    accountMenu.classList.remove("loggedIn");
    return false;
  }
}

export function doesUsernameExist(username) {
  let users = JSON.parse(localStorage.users);
  const foundUser = users.find((user) => user.username === username);
  if (foundUser) {
    return true;
  } else {
    return false;
  }
}

export function doPasswordsMatch(password1, password2) {
  return password1 === password2;
}

export function createAccount(username, password) {
  let users = JSON.parse(localStorage.users);
  users.push({
    username: username,
    password: password,
  });
  localStorage.users = JSON.stringify(users);
}

export function setupLocalUsers() {
  localStorage.users = JSON.stringify(validLogins);
}

export function logOut() {
  document.cookie = "user=a; max-age=-1";
  handleLogin(document.querySelector(".accountMenu"));
}

export function getUsername() {
  return document.cookie.split("; ").find((row) => row.startsWith("user=")).split('=')[1];
}

function checkIfLoggedIn() {
  if (document.cookie.split("; ").find((row) => row.startsWith("user="))) {
    return true;
  } else {
    return false;
  }
}

function createSessionCookie(username) {
  document.cookie =
    "user=" + encodeURIComponent(username) + "; max-age=1200";
}
