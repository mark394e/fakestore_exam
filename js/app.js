"use strict";

document.querySelector("#email").addEventListener("blur", function () {
  validate_email();
});

document.querySelector("#password").addEventListener("blur", function () {
  validate_password();
});

document.querySelector("#confirm_password").addEventListener("blur", function () {
  validate_confirm_password();
});

document.querySelector(".sign-up-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const user_email = validate_email();
  const user_password = validate_password();
  const user_confirmed_password = validate_confirm_password();
  validate_sign_up(user_email, user_password, user_confirmed_password);
});

// ##################################################

function validate_email() {
  const email_RegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const user_email = document.querySelector("#email").value;
  const isValidEmail = email_RegEx.test(user_email);
  const email_input_field = document.querySelector("#email");
  const error_message = document.querySelector("#email-error");

  email_input_field.classList.remove("success-border");

  if (!isValidEmail) {
    error_message.classList.remove("hidden");
    email_input_field.classList.add("error-border");
    return false;
  }

  error_message.classList.add("hidden");
  email_input_field.classList.add("success-border");

  return user_email;
}

// ##################################################

function validate_password() {
  const password_RegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,20}$/;
  const user_password = document.getElementById("password").value;
  const isValidPassword = password_RegEx.test(user_password);
  const password_input_field = document.getElementById("password");
  const error_message = document.querySelector("#password-error");

  password_input_field.classList.remove("success-border");

  if (!isValidPassword) {
    error_message.classList.remove("hidden");
    password_input_field.classList.add("error-border");
    return false;
  }

  error_message.classList.add("hidden");
  password_input_field.classList.add("success-border");

  return user_password;
}

// ##################################################

function validate_confirm_password() {
  const user_password = document.getElementById("password").value;
  const user_confirm_password = document.getElementById("confirm_password").value;
  const isValidConfirmPassword = user_password === user_confirm_password;
  const confirm_password_input_field = document.getElementById("confirm_password");
  const error_message = document.querySelector("#confirm-password-error");

  confirm_password_input_field.classList.remove("success-border");

  if (!isValidConfirmPassword || user_confirm_password === "") {
    error_message.classList.remove("hidden");
    confirm_password_input_field.classList.add("error-border");
    return false;
  }

  error_message.classList.add("hidden");
  confirm_password_input_field.classList.add("success-border");

  return isValidConfirmPassword;
}

// ##################################################

function validate_sign_up(user_email, user_password, user_confirmed_password) {
  const sign_up_btn = document.querySelector(".sign-up-btn");

  if (!user_email || !user_password || !user_confirmed_password) {
    sign_up_btn.classList.add("cta-error-animation");
    setTimeout(function () {
      sign_up_btn.classList.remove("cta-error-animation");
    }, 500);
    return;
  }

  sign_up_btn.classList.add("success");

  sign_up(user_email, user_password);
}

// ##################################################

async function sign_up(user_email, user_password) {
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user_email,
      password: user_password,
    }),
  };

  try {
    const response = await fetch("http://localhost:3000/users", options);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }

  window.location.href = "index.html";
}
