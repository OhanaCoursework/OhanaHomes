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

export function setupLocalUsers() {
  localStorage.users = JSON.stringify(validLogins);
}

export function attemptUserLogin(username, password) {
  if (!username) {
    return "Username is empty";
  } else if (!password) {
    return "Password is empty";
  }
  let users = JSON.parse(localStorage.users);
  for (var i = 0; i < users.length; i++) {
    if (users[i].username === username && users[i].password === password) {
      return createSessionCookie(username);
    }
  }
  return "Incorrect username or password";
}

export function createAccount(username, password) {
  let users = JSON.parse(localStorage.users);
  users.push({
    username: username,
    password: password,
  });
  localStorage.users = JSON.stringify(users);
}

export function removeAccountCookie() {
  document.cookie = "user=a; max-age=-1";
}

export function getUsername() {
  if (isUserLoggedIn()) {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("user="))
      .split("=")[1];
  }
}

export function isUserLoggedIn() {
  return document.cookie.split("; ").find((row) => row.startsWith("user="));
}

function createSessionCookie(username) {
  document.cookie = "user=" + encodeURIComponent(username) + "; max-age=1200";
}
