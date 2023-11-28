// ##################################################

export function validate_email() {
  const email_RegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // exampl@example.com
  const user_email = document.querySelector("#email").value;
  const isValidEmail = email_RegEx.test(user_email); // true or false according to regex
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

export function validate_password() {
  const password_RegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,20}$/; // Password must be between 8 to 20 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.
  const user_password = document.getElementById("password").value;
  const isValidPassword = password_RegEx.test(user_password); // true or false according to regex
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

export function validate_confirm_password() {
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
