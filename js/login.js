"use strict";

let user_email = document.querySelector("#email_login").value;
let user_password = document.querySelector("#password_login").value;
const error_message = document.querySelector("#login-error");
const login_btn = document.querySelector(".login-btn");
const spinner = document.querySelector(".spinner");

document.querySelector("#email_login").addEventListener("input", function () {
  user_email = document.querySelector("#email_login").value;
  // console.log(user_email);
});

document.querySelector("#password_login").addEventListener("input", function () {
  user_password = document.querySelector("#password_login").value;
  // console.log(user_password);
});

document.querySelector(".log-in-form").addEventListener("submit", function (event) {
  event.preventDefault();
  validate_input();
  // fetch_users();
});

// ##################################################

function validate_input() {
  if (!user_email || !user_password) {
    login_btn.classList.add("cta-error-animation");
    error_message.classList.remove("hidden");
    setTimeout(function () {
      login_btn.classList.remove("cta-error-animation");
    }, 500);
    return;
  }

  fetch_users();
}

// ##################################################

async function fetch_users() {
  try {
    login_btn.classList.add("hidden");
    spinner.classList.remove("hidden");
    const response = await fetch("http://localhost:3000/users");
    const users = await response.json();
    // console.log(users);
    validate_login(users);
  } catch (error) {
    console.log(error);
  }
}

// ##################################################

function validate_login(users) {
  users.forEach((user) => {
    if (!user.email === user_email || !user.password === user_password || !user.id) {
      login_btn.classList.add("cta-error-animation");
      error_message.classList.remove("hidden");
      setTimeout(function () {
        login_btn.classList.remove("cta-error-animation");
      }, 500);
      return;
    }
  });

  error_message.classList.add("hidden");
  spinner.classList.add("hidden");
  login_btn.classList.add("success");

  start_session(user_email);
}

// ##################################################

function start_session(user_email) {
  // alert("You have successfully logged in!");
  sessionStorage.setItem("email", user_email);
  login_btn.classList.remove("hidden");
  window.location.href = "productview.html";
}
