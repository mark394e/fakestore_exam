"use strict";

//  We grab the url parameter we 'send' in the productview script,
// we save it, and then we use it to create a singlepage
// for each product with the right data based on the ID
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// Const for use in hideShowAccordionContent()
const accordionButtons = document.querySelectorAll("button.accordion-btn");

// For the category buttons in the footer
const footerCategoryLinks = document.querySelectorAll("button.category-link");

fetchSingleProduct();
hideShowAccordionContent();

footerCategoryLinksClickEvent();

/*  
Earlier versions of redirecting the footer category links
function redirectToProductView(categoryLink) {
  localStorage.setItem("selectedCategory", categoryLink.dataset.category);
  location.href = "./productview.html"; 
  location.href = `productview.html?category=${categoryLink.dataset.category}`; 
  location.href = "productview.html"; 
} */
// Redirect from footer category buttons and send
// the clicked category
function footerCategoryLinksClickEvent() {
  footerCategoryLinks.forEach((categoryLink) =>
    categoryLink.addEventListener(
      "click",
      () =>
        (location.href = `productview.html?category=${categoryLink.dataset.category}`)
    )
  );
}

// Fetch the clicked product via. the ID
async function fetchSingleProduct() {
  try {
    const getSingleProduct = await fetch(
      `https://fakestoreapi.com/products/${id}`
    );

    if (!getSingleProduct.ok) {
      throw new Error(
        `Error related to getSingleProduct: ${getSingleProduct.status}`
      );
    }

    const product = await getSingleProduct.json();

    createProductDescription(product);
  } catch (error) {
    console.error("Error:", error);
    informUserOfError(
      "Sorry! It seems like there is a problem with getting the products. Please try again"
    );
  }
}
// Function that takes care of the product description,
// because the text is too long
function createProductDescription(product) {
  let productDescription = product.description;

  if (product.description && product.description.length > 200) {
    productDescription = `${product.description.substring(
      0,
      200
    )}... <a href="#" class="read-more" aria-label="Hide and show the full product description">Show more</a>`;
  }
  // Toggle the view of product description
  function toggleReadMore(event) {
    event.preventDefault(); // To prevent default link behaviour

    const link = event.target;
    const currentText = link.textContent;

    if (currentText === "Show more") {
      link.parentElement.innerHTML = `${product.description} <a href="#" class="read-more" aria-label="Hide and show the full product description">Show less</a>`;
    } else {
      link.parentElement.innerHTML = `${product.description.substring(
        0,
        200
      )}... <a href="#" class="read-more" aria-label="Hide and show the full product description">Show more</a>`;
    }
  }

  // Brug event delegation for at håndtere klik på flere links
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("read-more")) {
      toggleReadMore(event);
    }
  });
  showProduct(product, productDescription);
}

// Function that shows the clicked product, it is not a clone because it is not a copy
// it is fetched based on the ID
function showProduct(product, productDescription) {
  // We put this in a const to have a clearer view later on when we use it
  const addToCartButton = document.querySelector(
    "button.add-to-cart-btn-singleview"
  );
  /*
  Earlier we had the product description cut in to to sections 
  but we ended up having a read more possibility 
   let productDescription = product.description;
  if (product.description && product.description.length > 200) {
    productDescription = `${
      product.description.substring(0, 200) + " -"
    }<br><br>${product.description.substring(200)}`;
  } */
  document.querySelector("img.single-product-img").src = product.image;
  document
    .querySelector("img.single-product-img")
    .setAttribute("alt", `Image of ${product.title}`);
  document.querySelector("h1.h1-product-title").textContent = product.title;
  document.querySelector("h2.h2-product-category").textContent =
    product.category;
  document.querySelector("p.price").textContent = product.price + ",-";
  document.querySelector("p.product-desc").innerHTML = productDescription;
  document.querySelector("p.accoridon-product-content").textContent =
    "Rating: " +
    product.rating.rate +
    " / 5 -" +
    "  " +
    product.rating.count +
    " votes";
  /* #### RELATED TO CART FUNCTIONALITY #### */
  addToCartButton.setAttribute("data-product-id", product.id);
  addToCartButton.addEventListener("click", (event) =>
    addProductToCart(product, event)
  );
  // Button to go back to productview
  document
    .querySelector("button.go-back-button")
    .addEventListener("click", goBackToProducts);
}
// Function that takes care of adding to cart
// and storing the data + sends out an event containging the updatedCart
function addProductToCart(product, event) {
  /*   console.log(product); */
  // Get the exisiting cart
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Add the new product to the cart
  cart.push(product);

  // Save the updated cart in localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Sending out an event to make clear the cart has been updated
  const updateCartEvent = new CustomEvent("updateCartEvent", { detail: cart });
  window.dispatchEvent(updateCartEvent);

  // Find the relevant button and add the class
  const addToCartButton = event.currentTarget;
  addToCartButton.classList.add("add-product-success");

  document.querySelector("circle.red-dot-on-cart").classList.remove("hidden");
}
// Go back in history
function goBackToProducts() {
  history.back();
}
// Show user error message (from the catch code)
function informUserOfError(message) {
  document.querySelector("h1.h1-product-title").textContent = "";
  document.querySelector("h1.h1-product-title").textContent = message;
}
// Acordion / collapsables (with product details + delivery details)
function hideShowAccordionContent() {
  accordionButtons.forEach((element) => {
    element.addEventListener("click", () => {
      element.classList.toggle("active-accordion");

      let panel = element.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  });
}
