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
  for (var i = 0; i < validLogins.length; i++) {
    if (
      validLogins[i].username === username &&
      validLogins[i].password === password
    ) {
      createSessionCookie(username);
      return console.log("User can log in");
    }
  }

  console.log("user cant log in");
}

export function checkIfLoggedIn() {
  if(document.cookie.split("; ").find((row) => row.startsWith("user="))) {
    console.log("Already logged in");
    return true;
  } else {
    console.log("Not logged in");
    return false;
  }
}

function createSessionCookie(username) {
  document.cookie = encodeURIComponent("user") + "=" + encodeURIComponent(username);
}
