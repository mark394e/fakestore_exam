// **************** SIGN UP VALIDATION ****************
export function validate_email() {
  const email_RegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // exampl@example.com
  const user_email = document.querySelector('#email').value;
  const isValidEmail = email_RegEx.test(user_email); // true or false according to regex
  const email_input_field = document.querySelector('#email');
  const error_message = document.querySelector('#email-error');

  email_input_field.classList.remove('success-border');

  if (!isValidEmail) {
    error_message.classList.remove('hidden');
    email_input_field.classList.add('error-border');
    return false;
  }

  error_message.classList.add('hidden');
  email_input_field.classList.add('success-border');

  return user_email;
}

// ##################################################

export function validate_password() {
  const password_RegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,20}$/; // Password must be between 8 to 20 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.
  const user_password = document.getElementById('password').value;
  const isValidPassword = password_RegEx.test(user_password); // true or false according to regex
  const password_input_field = document.getElementById('password');
  const error_message = document.querySelector('#password-error');

  password_input_field.classList.remove('success-border');

  if (!isValidPassword) {
    error_message.classList.remove('hidden');
    password_input_field.classList.add('error-border');
    return false;
  }

  error_message.classList.add('hidden');
  password_input_field.classList.add('success-border');

  return user_password;
}

// ##################################################

export function validate_confirm_password() {
  const user_password = document.getElementById('password').value;
  const user_confirm_password = document.getElementById('confirm_password').value;
  const isValidConfirmPassword = user_password === user_confirm_password;
  const confirm_password_input_field = document.getElementById('confirm_password');
  const error_message = document.querySelector('#confirm-password-error');

  confirm_password_input_field.classList.remove('success-border');

  if (!isValidConfirmPassword || user_confirm_password === '') {
    error_message.classList.remove('hidden');
    confirm_password_input_field.classList.add('error-border');
    return false;
  }

  error_message.classList.add('hidden');
  confirm_password_input_field.classList.add('success-border');

  return isValidConfirmPassword;
}

// **************** CHECKOUT VALIDATION ****************
const expiry_input_field = document.querySelector('#expiry');
const expiry_error_message = document.querySelector('#expiry-error');
const cvv_input_field = document.querySelector('#cvv');
const cvv_error_message = document.querySelector('#cvv-error');
const zipcode_input_field = document.querySelector('#zipcode');
const zipcode_error_message = document.querySelector('#zipcode-error');
const card_number_input_field = document.querySelector('#cardnumber');
const card_number_error_message = document.querySelector('#cardnumber-error');
const only_numbers_RegEx = /^[0-9]+$/; // allow only numbers
const expiry_date_RegEx = /^(0[1-9]|1[0-2])\/\d{2}$/; // allow only 1-12 for month, a forward slash and 2 digits for year

export function validate_zipcode_input(input_zipcode) {
  let isValidZipcode = only_numbers_RegEx.test(input_zipcode);

  if (!isValidZipcode || input_zipcode.length < 4) {
    zipcode_error_message.classList.remove('hidden');
    zipcode_input_field.classList.add('error-border');
    return;
  }

  zipcode_input_field.classList.add('success-border');
  zipcode_error_message.classList.add('hidden');
  zipcode_input_field.classList.remove('error-border');
  zipcode_input_field.value = input_zipcode;
  let zipcode = input_zipcode;
  return zipcode;
}

// #####################################################

export function validate_card_number(input_card_number) {
  let isValidCardNumber = only_numbers_RegEx.test(input_card_number);

  if (!isValidCardNumber || input_card_number.length < 16) {
    card_number_error_message.classList.remove('hidden');
    card_number_input_field.classList.add('error-border');
    return;
  }

  card_number_input_field.classList.remove('error-border');
  card_number_error_message.classList.add('hidden');
  card_number_input_field.classList.add('success-border');
  card_number_input_field.value = input_card_number;
  let card_number = input_card_number;
  return card_number;
}

// #####################################################

export function validate_cvv_input(input_cvv) {
  let isValidCvv = only_numbers_RegEx.test(input_cvv);

  if (!isValidCvv || input_cvv.length < 3) {
    cvv_error_message.classList.remove('hidden');
    cvv_input_field.classList.add('error-border');
    return;
  }

  cvv_input_field.classList.add('success-border');
  cvv_error_message.classList.add('hidden');
  cvv_input_field.classList.remove('error-border');
  cvv_input_field.value = input_cvv;
  let cvv = input_cvv;
  return cvv;
}

// #####################################################

export function validate_expiry(input_expiry) {
  let isValidExpiryDate = expiry_date_RegEx.test(input_expiry);

  if (!isValidExpiryDate || input_expiry.length < 5) {
    expiry_error_message.classList.remove('hidden');
    expiry_input_field.classList.add('error-border');
    return;
  }

  expiry_error_message.classList.add('hidden');
  expiry_input_field.classList.remove('error-border');
  expiry_input_field.classList.add('success-border');
  expiry_input_field.value = input_expiry;
  let expiry = input_expiry;
  return expiry;
}
