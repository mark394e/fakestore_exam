import { user_logout } from './logout.mjs';
import { validate_zipcode_input, validate_card_number, validate_cvv_input, validate_expiry } from './validator.mjs';

user_logout();

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

// // #####################################################

// function validate_zipcode_input(input_zipcode) {
//   let isValidZipcode = only_numbers_RegEx.test(input_zipcode);

//   if (!isValidZipcode || input_zipcode.length < 4) {
//     zipcode_error_message.classList.remove('hidden');
//     zipcode_input_field.classList.add('error-border');
//     return;
//   }

//   zipcode_input_field.classList.add('success-border');
//   zipcode_error_message.classList.add('hidden');
//   zipcode_input_field.classList.remove('error-border');
//   zipcode_input_field.value = input_zipcode;
//   let zipcode = input_zipcode;
//   return zipcode;
// }

// // #####################################################

// function validate_card_number(input_card_number) {
//   let isValidCardNumber = only_numbers_RegEx.test(input_card_number);

//   if (!isValidCardNumber || input_card_number.length < 16) {
//     card_number_error_message.classList.remove('hidden');
//     card_number_input_field.classList.add('error-border');
//     return;
//   }

//   card_number_input_field.classList.remove('error-border');
//   card_number_error_message.classList.add('hidden');
//   card_number_input_field.classList.add('success-border');
//   card_number_input_field.value = input_card_number;
//   let card_number = input_card_number;
//   return card_number;
// }

// // #####################################################

// function validate_cvv_input(input_cvv) {
//   let isValidCvv = only_numbers_RegEx.test(input_cvv);

//   if (!isValidCvv || input_cvv.length < 3) {
//     cvv_error_message.classList.remove('hidden');
//     cvv_input_field.classList.add('error-border');
//     return;
//   }

//   cvv_input_field.classList.add('success-border');
//   cvv_error_message.classList.add('hidden');
//   cvv_input_field.classList.remove('error-border');
//   cvv_input_field.value = input_cvv;
//   let cvv = input_cvv;
//   return cvv;
// }

// // #####################################################

// function validate_expiry(input_expiry) {
//   let isValidExpiryDate = expiry_date_RegEx.test(input_expiry);

//   if (!isValidExpiryDate || input_expiry.length < 5) {
//     expiry_error_message.classList.remove('hidden');
//     expiry_input_field.classList.add('error-border');
//     return;
//   }

//   expiry_error_message.classList.add('hidden');
//   expiry_input_field.classList.remove('error-border');
//   expiry_input_field.classList.add('success-border');
//   expiry_input_field.value = input_expiry;
//   let expiry = input_expiry;
//   return expiry;
// }

// // #####################################################

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
  return;
}
