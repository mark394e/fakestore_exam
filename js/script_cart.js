'use strict';

function user_logout() {
  const logoutBtn = document.querySelector('.logout-link');
  logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('email');
    window.location.href = 'index.html';
  });
}

user_logout();

/* #### LOCALSTORAGE PRODUCTS ADDED TO CART #### */
// cart = the 'cart' we get from local storage
let cart = getCartFromLocalStorage();

// For use in click eventListener later on
const goToCheckoutButton = document.querySelector('button.checkout-btn-cart');

// We call the updateCart after getting the cart,
// to check the length and adding/removing the
// red dot from the cart icon
updateCart(cart);

// Function that takes care of remowing products
function removeProductFromCart(productId) {
  const indexToRemove = cart.findIndex((product) => product.id === productId);
  if (indexToRemove !== -1) {
    cart.splice(indexToRemove, 1);
    updateCart(cart); //call the update function
  }
}

// Function that sets the updatedCart, and call showCartProducts again
function updateCart(updatedCart) {
  console.log('Updated cart length:', updatedCart.length);
  localStorage.setItem('cart', JSON.stringify(updatedCart));

  // Check if the cart is empty
  const cartIsEmpty = updatedCart.length === 0;

  // Find the circle (red dot) in the HTML
  const redDotOnCart = document.querySelector('circle.red-dot-on-cart');
  // Add or remove the hidden class
  if (cartIsEmpty) {
    redDotOnCart.classList.add('hidden');
    document.querySelector('button.checkout-btn-cart').classList.add('hidden');
  } else {
    redDotOnCart.classList.remove('hidden');
  }

  // Calculate total and update in HTML
  const total = calculateTotal(updatedCart);
  const delivery = calculateDelivery(total);

  updateCalculationInHTML(total, delivery);

  showCartProducts(updatedCart);
}

// Function that calculates the total
function calculateTotal(cart) {
  return cart.reduce((total, product) => total + parseFloat(product.price), 0);
}
// Function that calculates the delivery
function calculateDelivery(total) {
  if (total === 0) {
    return 0.0; // If empty cart, return 0.0
  } else {
    return total < 20 ? 5.0 : 0.0; // if the total is more than 20, the delivery is 0, else it is 5
  }
}

// Show the prices in HTML
function updateCalculationInHTML(total, delivery) {
  // Element that show the total
  const totalPriceElement = document.querySelector('p.order-total-value');
  totalPriceElement.textContent = total.toFixed(2) + ',-';

  // Element that show the delivery
  const deliveryPriceElement = document.querySelector('p.order-delivery-value');
  deliveryPriceElement.textContent = delivery + ',-';

  // Element that shows the subtotal
  const subtotalPriceElement = document.querySelector('p.order-subtotal-value');
  subtotalPriceElement.textContent = (total + delivery).toFixed(2) + ',-';
  /*   console.log(total); */
}

// The event handler which sets the updatedCart, and calll the updateCart function
function handleUpdateCartEvent(event) {
  const updatedCart = event.detail;
  updateCart(updatedCart);
}

// Listen for the event in productview.js
window.addEventListener('updateCartEvent', handleUpdateCartEvent);

// Function where we get the cart and convert it to a JS object
// and specifies an empty array as default value
function getCartFromLocalStorage() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

// Function that shows the products in the cart
function showCartProducts(cart) {
  const cartContainer = document.querySelector('section.cart-container');

  // Empty the container
  cartContainer.innerHTML = '';

  // Check if there is products in the cart
  if (cart.length === 0) {
    document.querySelector('h1.heading').textContent = 'The cart is empty!';
  } else {
    cart.forEach((product) => {
      // Create HTML elements for the products
      const productDiv = document.createElement('div');
      productDiv.classList.add('cart-item');

      // Create a wrapper div for item text
      const imgWrapper = document.createElement('div');
      imgWrapper.classList.add('item-img-wrapper');

      const img = document.createElement('img');
      img.src = product.image;
      img.setAttribute('alt', 'Image of the product');
      img.classList.add('product-in-cart-img');
      imgWrapper.appendChild(img);

      // Append the wrapper div to the productDiv
      productDiv.appendChild(imgWrapper);

      // Create a wrapper div for item text
      const textWrapper = document.createElement('div');
      textWrapper.classList.add('item-text-wrapper');

      const h2 = document.createElement('h2');
      h2.textContent = product.title;
      h2.classList.add('item-name');
      textWrapper.appendChild(h2);

      const pCategory = document.createElement('p');
      pCategory.textContent = product.category;
      pCategory.classList.add('item-category');
      textWrapper.appendChild(pCategory);

      // Append the wrapper div to the productDiv
      productDiv.appendChild(textWrapper);

      const pPrice = document.createElement('p');
      pPrice.textContent = product.price + ',-';
      pPrice.classList.add('item-price');
      productDiv.appendChild(pPrice);

      // Delete item button
      const deleteProductFromCart = document.createElement('button');
      deleteProductFromCart.textContent = 'Remove';
      deleteProductFromCart.classList.add('delete-item-from-cart-button');
      productDiv.appendChild(deleteProductFromCart);
      deleteProductFromCart.addEventListener('click', () => removeProductFromCart(product.id));

      // Add the product to the container
      cartContainer.appendChild(productDiv);
    });
  }
}

// Go to checkout page - event on button
goToCheckoutButton.addEventListener('click', () => {
  location.href = '../checkout.html';
});

showCartProducts(cart);
