"use strict";

//document.querySelector('.cta.sign-up-btn').addEventListener('click', initiate);
document.querySelector(".sign-up-form").addEventListener("submit", function (event) {
  event.preventDefault();
  validate_sign_up();
});

//################################################

function validate_sign_up() {
  const user_password = document.getElementById("password").value;
  const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,20}$/;
  const isValidPassword = passwordRegEx.test(user_password);

  const user_email = document.getElementById("email").value;
  const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValidEmail = emailRegEx.test(user_email);

  const user_confirm_password = document.getElementById("confirm_password").value;
  const isValidConfirmPassword = user_password === user_confirm_password;

  if (!isValidPassword) {
    const password_input_field = document.getElementById("password");
    const error_message_element = password_input_field.insertAdjacentElement(
      "afterend",
      document.createElement("p")
    );
    error_message_element.classList.add("error-message");
    error_message_element.innerHTML =
      "Password must be between 8 to 20 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
    password_input_field.style.border = "1px solid var(--danger_color)";
    password_input_field.focus();
    return;
  }

  if (!isValidEmail) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!isValidConfirmPassword) {
    alert("Passwords do not match.");
    return;
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

  window.location.href = "index.html";
}
