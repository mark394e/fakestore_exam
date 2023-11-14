"use strict";

//document.querySelector('.cta.sign-up-btn').addEventListener('click', initiate);
document.querySelector(".sign-up-form").addEventListener("submit", function (event) {
  event.preventDefault();
  validate();
});

//################################################

function validate() {
  const user_password = document.getElementById("password").value;
  const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,20}$/;
  const isValidPassword = passwordRegEx.test(user_password);

  const user_email = document.getElementById("email").value;
  const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValidEmail = emailRegEx.test(user_email);

  const user_confirm_password = document.getElementById("confirm_password").value;
  const isValidConfirmPassword = user_password === user_confirm_password;

  if (!isValidPassword) {
    alert(
      "Password must contain 8-20 characters, at least one uppercase letter, one lowercase letter, one number and one special character."
    );
  }

  if (!isValidEmail) {
    alert("Please enter a valid email address.");
  }

  if (!isValidConfirmPassword) {
    alert("Passwords do not match.");
  }

  console.log(isValidPassword);
  console.log(isValidEmail);
  console.log(isValidConfirmPassword);

  sign_up(user_email, user_password);
}

//################################################

async function sign_up(user_email, user_password) {
  console.log(user_email, user_password);

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

  start_session(user_email);
  window.location.href = "index.html";
}

//################################################

function start_session(user_email) {
  alert("You have successfully signed up!");
  sessionStorage.setItem("email", user_email);
}
