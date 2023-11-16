"use strict";

//loader element for ux + fakestoreApi has failed a few times in the proces,
//so to keep the user informed we implemented this on top of our catch-error message
const loader = document.getElementById("loader-element");

//for shifting the headings content
const heading = document.querySelector("h1.heading");
//for toggling the filter buttons
/* this is the top level filter btn */
const toggleButton = document.getElementById("toggle-filter-buttons");
/* this is the div that holds the filter btns */
const filterButtons = document.getElementById("filter-buttons-div");
/* this is the actual filter btns, naming mistake.... */
const theActualFilterButtons = document.querySelectorAll(
  ".filter-buttons button"
);
//we want to show all products as default
fetchAllProducts();
//we have a button to toggle the 4 filter buttons
//they are hidden as default
toggleFilterButtons();

function toggleFilterButtons() {
  toggleButton.addEventListener("click", () => {
    filterButtons.classList.toggle("hidden");
    toggleButton.classList.add("active-button");
    if (filterButtons.classList.contains("hidden")) {
      toggleButton.classList.remove("active-button");
    }
    document
      .querySelector("button.all-products-button")
      .classList.remove("active-button");

    if (filterButtons.classList.contains("hidden")) {
      document
        .querySelector("button.all-products-button")
        .classList.add("active-button");
    }
  });
  //we want to establish click events for our 'filter' buttons
  filterButtonClickEvents();
}

//when one of the category buttons is clicked, the filterProductsByCategory function gets called
//when the 'all products' button is clicked, the default fetchAllProducts function gets called
function filterButtonClickEvents() {
  theActualFilterButtons.forEach((filterButton) =>
    filterButton.addEventListener("click", filterProductsByCategory)
  );
  document
    .querySelector("button.all-products-button")
    .addEventListener("click", fetchAllProducts);
}

//in this function we fetch the products that match the querystring
//and the 'this.dataset.category' refelcts one of the category filter buttons
//if the user clicks on 'electronics', 'this' is electronics
async function filterProductsByCategory() {
  filterButtons.classList.add("hidden");
  try {
    const getCategoryProducts = await fetch(
      `https://fakestoreapi.com/products/category/${this.dataset.category}`
    );

    if (!getCategoryProducts.ok) {
      throw new Error(
        `Error related to getCateoryProducts: ${getCategoryProducts.status}`
      );
    }

    const categoryProducts = await getCategoryProducts.json();

    showCategoryProducts(categoryProducts);
  } catch (error) {
    console.error("Error:", error);
    informUserOfError(
      "Sorry! It seems like there is a problem with getting the products. Please try again"
    );
  } finally {
    loader.style.display = "none";
  }
}

//our default fetch function, output is all products
async function fetchAllProducts() {
  /* active button logic under here, and till the hastag seperation */
  toggleButton.classList.remove("active-button");
  document
    .querySelector("button.all-products-button")
    .classList.add("active-button");
  filterButtons.classList.add("hidden");
  /* ####################################### */
  try {
    const getAllProducts = await fetch("https://fakestoreapi.com/products");

    if (!getAllProducts.ok) {
      throw new Error(
        `Error related to getAllProducts: ${getAllProducts.status}`
      );
    }

    const products = await getAllProducts.json();

    showProducts(products);
  } catch (error) {
    console.error("Error:", error);
    informUserOfError(
      "Sorry! It seems like there is a problem with getting the products. Please try again"
    );
  } finally {
    loader.style.display = "none";
  }
}

//THIS IS OUR DEFAULT SHOW PRODUCTS FUNCTION, SHOWS ALL PRODUCTS
function showProducts(products) {
  /*   console.log(products); */

  //show data in HTMl by using the template and clone the data

  //this is the section we created in our HTML to append the data
  const productContainer = document.querySelector("section#products");
  //this is the HTML-template (structured the way we want to display the data)
  const productTemplate = document.querySelector("template#products-template");
  //making sure the container is empty and ready to clone data
  productContainer.textContent = "";

  heading.textContent = "All products";

  products.forEach((product) => {
    //making the first letter capitalized, others to lowercase
    let modifiedProductTitle =
      product.title.charAt(0).toUpperCase() +
      product.title.slice(1).toLowerCase();
    //cloning
    const cloneProductData = productTemplate.cloneNode(true).content;
    //placing the products content in our template fields
    //img
    cloneProductData.querySelector(
      "div.product-img-wrapper"
    ).style.backgroundImage = `url('${product.image}')`;
    //product title (if longer than 10 chars we cut it)
    cloneProductData.querySelector("p.product-title").textContent =
      modifiedProductTitle.length > 10
        ? modifiedProductTitle.slice(0, 10) + ".."
        : modifiedProductTitle;
    /* test */
    //accessibility on product title for screenreader, due to us cutting the length
    cloneProductData
      .querySelector("p.product-title")
      .setAttribute("aria-label", modifiedProductTitle);
    //product price
    cloneProductData.querySelector("p.product-price").textContent =
      product.price + ",-";
    //click event on the article (so we later can go to singleview)
    cloneProductData
      .querySelector("article.product")
      .addEventListener("click", () => showSingleProduct(product));
    //append content to section in HTML
    productContainer.appendChild(cloneProductData);
  });
}

//THIS IS OUR SECOND SHOW PRODUCTS FUNCTION, OUTPUTS PRODUCTS TO SPECIFIC CATEGORY
//we use the same template
function showCategoryProducts(categoryProducts) {
  /*   console.log("I am the shoW categories function"); */
  //this is the section we created in our HTML to append the data
  const productContainer = document.querySelector("section#products");
  //this is the HTML-template (structured the way we want to display the data)
  const productTemplate = document.querySelector("template#products-template");
  //making sure the container is empty and ready to clone data
  productContainer.textContent = "";

  categoryProducts.forEach((product) => {
    //Setting the headings content to the chosen categorys name + capitalizing the first letter
    //we use charAt(0) to get the first letter, then we capitalize it, and then we
    //take the rest of the sentence by taking it from position 1 and further
    heading.textContent =
      product.category.charAt(0).toUpperCase() + product.category.substring(1);
    //cloning
    const cloneProductData = productTemplate.cloneNode(true).content;
    //placing the products content in our template fields
    //img
    /*    cloneProductData.querySelector("img.product-img").src = product.image; */
    cloneProductData.querySelector(
      "div.product-img-wrapper"
    ).style.backgroundImage = `url('${product.image}')`;
    //product title
    //product title (if longer than 15 chars we cut it)
    cloneProductData.querySelector("p.product-title").textContent =
      product.title.length > 13
        ? product.title.slice(0, 13) + ".."
        : product.title;
    //product price
    cloneProductData.querySelector("p.product-price").textContent =
      product.price + ",-";

    cloneProductData
      .querySelector("article.product")
      .addEventListener("click", () => showSingleProduct(product));
    //append content to section in HTML
    productContainer.appendChild(cloneProductData);
  });
}

function showSingleProduct(product) {
  location.href = `singleview.html?id=${product.id}`;
}

//show user error message (from the catch code)
function informUserOfError(message) {
  const errorMessageElement = document.createElement("p");
  errorMessageElement.textContent = message;
  document.body.appendChild(errorMessageElement);
}
