import { user_logout } from "./logout.mjs";

user_logout();

const expiry_input_field = document.querySelector("#expiry");
const expiry_error_message = document.querySelector("#expiry-error");
const cvv_input_field = document.querySelector("#cvv");
const cvv_error_message = document.querySelector("#cvv-error");
const zipcode_input_field = document.querySelector("#zipcode");
const zipcode_error_message = document.querySelector("#zipcode-error");
const card_number_input_field = document.querySelector("#card-number");
const card_number_error_message = document.querySelector("#card-number-error");

cvv_input_field.addEventListener("input", function (e) {
  let input = e.target.value;
  validate_cvv_input(input);
});

expiry_input_field.addEventListener("input", function (e) {
  let input = e.target.value;
  validate_expiry(input);
});

function insert_slash(input) {
  if (input.length > 2) {
    console.log("insert slash");
    input = input.slice(0, 2) + "/" + input.slice(2, 4);
    expiry_error_message.classList.add("hidden");
    expiry_input_field.classList.remove("error-border");
    expiry_input_field.classList.add("success-border");
  }
}

function validate_cvv_input(input) {
  const cvv_RegEx = /^[0-9]+$/;
  let isValidCvv = cvv_RegEx.test(input);
  if (!isValidCvv && input.length != 0) {
    console.log("Invalid cvv");
    input = input.replace(/[^a-zA-Z]/g, "");
    cvv_error_message.classList.remove("hidden");
    cvv_input_field.classList.add("error-border");
    cvv_input_field.classList.remove("success-border");
    return;
  }

  cvv_error_message.classList.add("hidden");
  cvv_input_field.classList.remove("error-border");
  cvv_input_field.classList.add("success-border");
  cvv_input_field.value = input;
  return;
}

function validate_input(input) {
  const expiry_date_RegEx = /^[0-9\/]+$/;
  let isValidExpiryDate = expiry_date_RegEx.test(input);

  if (!isValidExpiryDate && input.length != 0) {
    console.log("Invalid expiry date");
    input = input.replace(/[^a-zA-Z]/g, "");
    expiry_error_message.classList.remove("hidden");
    expiry_input_field.classList.add("error-border");
    // expiry_input_field.value = input;
    // replace_input_text(input);
    return;
  }

  expiry_input_field.value = input;
  insert_slash(input);
}

function replace_input_text(input) {
  console.log("replace input", input);

  validate_input(input);
}
