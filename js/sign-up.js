import { validate_email, validate_password, validate_confirm_password } from './validator.mjs';

const spinner = document.querySelector('.spinner');
const sign_up_btn = document.querySelector('.sign-up-btn');

// #####################################################

// Validation on blur
document.querySelector('#email').addEventListener('blur', function () {
  validate_email();
});

document.querySelector('#password').addEventListener('blur', function () {
  validate_password();
});

document.querySelector('#confirm_password').addEventListener('blur', function () {
  validate_confirm_password();
});

// Validation on submit
document.querySelector('.sign-up-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const user_email = validate_email();
  const user_password = validate_password();
  const user_confirmed_password = validate_confirm_password();
  validate_sign_up(user_email, user_password, user_confirmed_password);
});

// ##################################################

function validate_sign_up(user_email, user_password, user_confirmed_password) {
  if (!user_email || !user_password || !user_confirmed_password) {
    sign_up_btn.classList.add('cta-error-animation');
    setTimeout(function () {
      sign_up_btn.classList.remove('cta-error-animation');
    }, 500);
    return;
  }

  sign_up_btn.classList.add('success');

  sign_up(user_email, user_password);
}

// ##################################################

// adding user to db.json (JSON-Server)
async function sign_up(user_email, user_password) {
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: user_email,
      password: user_password,
    }),
  };

  try {
    sign_up_btn.classList.add('hidden');
    spinner.classList.remove('hidden');
    const response = await fetch('http://localhost:3000/users', options);
    const data = await response.json();
    console.log(data);
    spinner.classList.add('hidden');
    sign_up_btn.classList.remove('hidden');
    window.location.href = 'index.html';
  } catch (error) {
    console.log(error);
  }
}
