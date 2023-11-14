"use strict";

document.querySelector(".log-in-form").addEventListener("submit", function (event) {
  event.preventDefault();
  fetch_users();
});

async function fetch_users() {
  try {
    const response = await fetch("http://localhost:3000/users");
    const users = await response.json();
    console.log(users);
    validate_user(users);
  } catch (error) {
    console.log(error);
  }
}

function validate_user(users) {
  const user_email = document.querySelector("#email_login").value;
  const user_password = document.querySelector("#password_login").value;

  if (user_email && user_password) {
    users.forEach((user) => {
      if (!user.email === user_email || !user.password === user_password) {
        alert("User does not exist");
        return;
      }
    });
  }

  start_session(user_email);
}

function start_session(user_email) {
  alert("You have successfully logged in!");
  sessionStorage.setItem("email", user_email);
  window.location.href = "productview.html";
}
