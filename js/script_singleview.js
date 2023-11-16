"use strict";

//we grab the url parameter we 'send' in the productview script, we save it in a variable, and then we use it to crete a singlepage for each product with the right data based on the ID
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

//variable for use in hideShowAccordionContent()
const accordionButtons = document.querySelectorAll("button.accordion-btn");

fetchSingleProduct();
hideShowAccordionContent();

//get the clicked product via. the ID
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
//function that takes care of the product description, because the text is too long
function createProductDescription(product) {
  let productDescription = product.description;

  if (product.description && product.description.length > 200) {
    productDescription = `${product.description.substring(
      0,
      200
    )}... <a href="#" class="read-more" aria-label="Hide and show the full product description">Show more</a>`;
  }

  function toggleReadMore(event) {
    event.preventDefault(); // For at forhindre standard linkadfærd

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

//function that shows the clicked product, it is not a clone because it is not a copy
//it is fetched based on the ID
function showProduct(product, productDescription) {
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
  //button to go back to productview
  document
    .querySelector("button.go-back-button")
    .addEventListener("click", goBackToProducts);
}
//go back in history
function goBackToProducts() {
  history.back();
}
//show user error message (from the catch code)
function informUserOfError(message) {
  const errorMessageElement = document.createElement("p");
  errorMessageElement.textContent = message;
  document.body.appendChild(errorMessageElement);
}

//acordion / collapsables (with product details + delivery details)
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
