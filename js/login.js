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
    validate_login(users);
  } catch (error) {
    console.log(error);
  }
}

function validate_login(users) {
  const user_email = document.querySelector("#email_login").value;
  const user_password = document.querySelector("#password_login").value;
  const error_message = document.querySelector("#login-error");
  const login_btn = document.querySelector(".login-btn");

  if (user_email && user_password) {
    users.forEach((user) => {
      if (!user.email === user_email || !user.password === user_password) {
        sign_up_btn.classList.add("cta-error-animation");
        error_message.classList.remove("hidden");
        setTimeout(function () {
          sign_up_btn.classList.remove("cta-error-animation");
        }, 500);
        return;
      }
    });
  }
  error_message.classList.remove("hidden");

  start_session(user_email);
}

function start_session(user_email) {
  // alert("You have successfully logged in!");
  sessionStorage.setItem("email", user_email);
  window.location.href = "productview.html";
}
