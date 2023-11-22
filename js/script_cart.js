"use strict";
/* CART QUANTITY BUTTONS */
function cartQuantityButtons() {
  //Empty inputfield from the beginning
  document.querySelector("input.input-group-field").value = 0;

  // Plus button: increments the value
  document.querySelectorAll('[data-quantity="plus"]').forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      updateQuantity(button.getAttribute("data-field"), 1);
    });
  });
  //Minus button: decrements the value
  document.querySelectorAll('[data-quantity="minus"]').forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      updateQuantity(button.getAttribute("data-field"), -1);
    });
  });

  function updateQuantity(fieldName, increment) {
    const inputField = document.querySelector("input[name=" + fieldName + "]");
    let currentValue = parseInt(inputField.value);
    if (!isNaN(currentValue) && (currentValue > 0 || increment === 1)) {
      inputField.value = currentValue + increment;
    } else {
      inputField.value = 0;
    }
  }
}

cartQuantityButtons();
