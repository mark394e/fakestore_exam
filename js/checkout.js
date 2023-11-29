import { user_logout } from './logout.mjs';
import { validate_zipcode_input, validate_card_number, validate_cvv_input, validate_expiry } from './validator.mjs';

isUserLoggedIn();
isCartEmpty();

// Function that checks if the user is logged in
function isUserLoggedIn() {
  const logged_in_user = sessionStorage.getItem('email');
  if (!logged_in_user) {
    window.location.href = 'index.html';
    return;
  }
  user_logout();
}

const expiry_input_field = document.querySelector('#expiry');
const cvv_input_field = document.querySelector('#cvv');
const zipcode_input_field = document.querySelector('#zipcode');
const card_number_input_field = document.querySelector('#cardnumber');
const pay_btn = document.querySelector('.pay-btn');
const checkout_form = document.querySelector('.checkout-form');
const checkout_title = document.querySelector('.checkout-title');
const checkout_success_message = document.querySelector('.checkout-success');

// #####################################################

// Validation on blur
zipcode_input_field.addEventListener('blur', function (e) {
  let input_zipcode = e.target.value;
  zipcode_input_field.classList.remove('success-border');
  validate_zipcode_input(input_zipcode);
});

card_number_input_field.addEventListener('blur', function (e) {
  let input_card_number = e.target.value;
  card_number_input_field.classList.remove('success-border');
  validate_card_number(input_card_number);
});

cvv_input_field.addEventListener('blur', function (e) {
  let input_cvv = e.target.value;
  cvv_input_field.classList.remove('success-border');
  validate_cvv_input(input_cvv);
});

expiry_input_field.addEventListener('blur', function (e) {
  let input_expiry = e.target.value;
  expiry_input_field.classList.remove('success-border');
  validate_expiry(input_expiry);
});

// Validation on submit
checkout_form.addEventListener('submit', function (e) {
  e.preventDefault();
  const zipcode = validate_zipcode_input(zipcode_input_field.value);
  const card_number = validate_card_number(card_number_input_field.value);
  const cvv = validate_cvv_input(cvv_input_field.value);
  const expiry = validate_expiry(expiry_input_field.value);
  validate_checkout(zipcode, card_number, cvv, expiry);
});

// #####################################################

function validate_checkout(zipcode, card_number, cvv, expiry) {
  const isAcceptedTerms = document.querySelector('#terms').checked;

  if (!zipcode || !card_number || !cvv || !expiry || !isAcceptedTerms) {
    console.log(zipcode, card_number, cvv, expiry, isAcceptedTerms);
    if (!isAcceptedTerms) {
      document.querySelector('#terms-error').classList.remove('hidden');
    }
    pay_btn.classList.add('cta-error-animation');
    setTimeout(function () {
      pay_btn.classList.remove('cta-error-animation');
    }, 500);
    return;
  }

  document.querySelector('#terms-error').classList.add('hidden');

  pay_btn.classList.add('success');

  setTimeout(function () {
    show_success_message();
  }, 500);
}

// #####################################################

function show_success_message() {
  checkout_success_message.classList.remove('hidden');
  checkout_form.classList.add('hidden');
  checkout_title.classList.add('hidden');
  localStorage.removeItem('cart');
  isCartEmpty();
  return;
}

// #####################################################

function isCartEmpty() {
  const cart = JSON.parse(localStorage.getItem('cart'));
  if (!cart) {
    document.querySelector('circle.red-dot-on-cart').classList.add('hidden');
    return;
  }
  document.querySelector('circle.red-dot-on-cart').classList.remove('hidden');
}
