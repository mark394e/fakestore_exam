import { user_logout } from "./logout.mjs";

user_logout();

isUserLoggedIn();

// Loader element for ux + fakestoreApi has failed a few times in the proces,
//so to keep the user informed we implemented this on top of our catch-error message
const loader = document.querySelector("svg#loader-element");
// For shifting the headings content
const heading = document.querySelector("h1.heading");
// For toggling the filter buttons
/* this is the top level filter btn */
const toggleButton = document.querySelector("button#toggle-filter-buttons");
/* this is the div that holds the filter btns */
const filterButtons = document.querySelector("div#filter-buttons-div");
/* this is the actual filter btns, naming mistake.... */
const theActualFilterButtons = document.querySelectorAll(
  ".filter-buttons button"
);
/* this is the buttons w. categories in the footer */
const footerCategoryLinks = document.querySelectorAll("button.category-link");
// ################################################# //
/* BACK TO TOP TEST */
const showOnPx = 100;
const backToTopButton = document.querySelector("button.back-to-top");
const scrollContainer = () => {
  return document.documentElement || document.body;
};
document.addEventListener("scroll", () => {
  if (scrollContainer().scrollTop > showOnPx) {
    backToTopButton.classList.remove("hiddenBtn");
  } else {
    backToTopButton.classList.add("hiddenBtn");
  }
});
// Actually going back to top
const goToTop = () => {
  document.body.scrollIntoView({
    behavior: "smooth",
  });
};
backToTopButton.addEventListener("click", goToTop);
// ################################################# //
// We want to show all products as default
fetchAllProducts();
// We have a button to toggle the 4 filter buttons
//they are hidden as default
toggleFilterButtons();

// Category footer link clicked in singleview
const urlParamsCategory = new URLSearchParams(window.location.search);
const clickedCategoryFromSingleviewFooter = urlParamsCategory.get("category");

// Function that checks if the user is logged in
// if logged in, remove disabled on products.css
function isUserLoggedIn() {
  const logged_in_user = sessionStorage.getItem("email");
  if (!logged_in_user) {
    window.location.href = "index.html";
    return;
  }
  document.querySelector("#products_styling").removeAttribute("disabled");
}

// Fetch the clicked-from-the-footer category
// Arturos API with our own endpoint: https://arturomora.com/fsa/products/category/${clickedCategoryFromSingleviewFooter}
async function footerCategoryClickedFromSingleview() {
  window.scrollTo(0, 0);
  try {
    const getCategoryProducts = await fetch(
      `https://fakestoreapi.com/products/category/${clickedCategoryFromSingleviewFooter}`
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
// Only call the function ^ if the paramter is 'active' / relevant
if (clickedCategoryFromSingleviewFooter) {
  footerCategoryClickedFromSingleview();
}
// Function that takes care of footer category links clicked from productview page
function footerCategoryLinksClickEvent() {
  footerCategoryLinks.forEach((categoryLink) =>
    categoryLink.addEventListener("click", filterProductsByCategory)
  );
}
footerCategoryLinksClickEvent();

// Toggling classes on the filter buttons depending on what
// is going on
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
// When one of the category buttons is clicked, the filterProductsByCategory function gets called
//when the 'all products' button is clicked, the default fetchAllProducts function gets called
function filterButtonClickEvents() {
  theActualFilterButtons.forEach((filterButton) =>
    filterButton.addEventListener("click", filterProductsByCategory)
  );
  document
    .querySelector("button.all-products-button")
    .addEventListener("click", fetchAllProducts);
}

// In this function we fetch the products that match the querystring
//and the 'this.dataset.category' refelcts one of the category filter buttons
//if the user clicks on 'electronics', 'this' is electronics
// Arturos API with our own endpoint: https://arturomora.com/fsa/products/category/${this.dataset.category}
async function filterProductsByCategory() {
  window.scrollTo(0, 0);
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

// Our default fetch function, output is all products
// Arturos API: https://arturomora.com/fsa/products
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

// THIS IS OUR DEFAULT SHOW PRODUCTS FUNCTION, SHOWS ALL PRODUCTS
function showProducts(products) {
  /*   console.log(products); */
  // Show data in HTMl by using the template and clone the data
  // productContainer is the section we created in our HTML to append the data
  const productContainer = document.querySelector("section#products");
  // ProductTemplate is the HTML-template (structured the way we want to display the data)
  const productTemplate = document.querySelector("template#products-template");
  // Making sure the container is empty and ready to clone data
  productContainer.textContent = "";

  // Heading textContent
  heading.textContent = "All products";

  // Looping through all the products
  products.forEach((product) => {
    // Making the first letter in the title capitalized,
    // rest to lowercase
    let modifiedProductTitle =
      product.title.charAt(0).toUpperCase() +
      product.title.slice(1).toLowerCase();
    // Cloning
    const cloneProductData = productTemplate.cloneNode(true).content;
    // We put this in a const to have a clearer view later on when we use it
    const addToCartButton = cloneProductData.querySelector(
      "button.add-to-cart-button"
    );
    /* #### Placing the products content in our template fields #### */
    cloneProductData
      .querySelector("article.product")
      .setAttribute("data-product-id", product.id);
    // Product img
    cloneProductData.querySelector(
      "div.product-img-wrapper"
    ).style.backgroundImage = `url('${product.image}')`;
    // Product title (if longer than 10 chars we cut it)
    cloneProductData.querySelector("h2.product-title").textContent =
      modifiedProductTitle.length > 10
        ? modifiedProductTitle.slice(0, 10) + ".."
        : modifiedProductTitle;
    // Accessibility on product title for screenreader, due to us cutting the length
    cloneProductData
      .querySelector("h2.product-title")
      .setAttribute("aria-label", modifiedProductTitle);
    // Product price
    cloneProductData.querySelector("p.product-price").textContent =
      product.price + ",-";
    // Click event on the product (so we later can go to singleview)
    cloneProductData
      .querySelector("div.clickable-container")
      .addEventListener("click", () => showSingleProduct(product));

    /* #### RELATED TO CART FUNCTIONALITY #### */
    addToCartButton.setAttribute("data-product-id", product.id);
    addToCartButton.addEventListener("click", (event) =>
      addProductToCart(product, event)
    );

    // Append content to section in HTML
    productContainer.appendChild(cloneProductData);
  });
}
// Function that handles adding to cart
// and stores the data + sends out an event that contains
// the updated cart
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

// THIS IS OUR SECOND SHOW PRODUCTS FUNCTION, OUTPUTS PRODUCTS TO SPECIFIC CATEGORY
// We use the same template
function showCategoryProducts(categoryProducts) {
  /*   console.log("I am the shoW categories function"); */
  // productContainer is the section we created in our HTML to append the data
  const productContainer = document.querySelector("section#products");
  // ProductTemplate is the HTML-template (structured the way we want to display the data)
  const productTemplate = document.querySelector("template#products-template");
  // Making sure the container is empty and ready to clone data
  productContainer.textContent = "";

  categoryProducts.forEach((product) => {
    // Modifying the title
    let modifiedProductTitle =
      product.title.charAt(0).toUpperCase() +
      product.title.slice(1).toLowerCase();
    // Setting the headings content to the chosen categorys name + capitalizing the first letter
    // we use charAt(0) to get the first letter, then we capitalize it, and then we
    // take the rest of the sentence by taking it from position 1 and further
    heading.textContent =
      product.category.charAt(0).toUpperCase() + product.category.substring(1);
    // Cloning
    const cloneProductData = productTemplate.cloneNode(true).content;
    // We put this in a const to have a clearer view later on when we use it
    const addToCartButton = cloneProductData.querySelector(
      "button.add-to-cart-button"
    );
    // #### Placing the products content in our template fields ####
    // Product img
    /*    cloneProductData.querySelector("img.product-img").src = product.image; */
    cloneProductData.querySelector(
      "div.product-img-wrapper"
    ).style.backgroundImage = `url('${product.image}')`;
    // Product title (if longer than 10 chars we cut it)
    cloneProductData.querySelector("h2.product-title").textContent =
      modifiedProductTitle.length > 10
        ? modifiedProductTitle.slice(0, 10) + ".."
        : modifiedProductTitle;
    // Accessibility on product title for screenreader, due to us cutting the length
    cloneProductData
      .querySelector("h2.product-title")
      .setAttribute("aria-label", modifiedProductTitle);
    // Product price
    cloneProductData.querySelector("p.product-price").textContent =
      product.price + ",-";
    // Click event to go to singleview page
    cloneProductData
      .querySelector("div.clickable-container")
      .addEventListener("click", () => showSingleProduct(product));

    /* #### RELATED TO CART FUNCTIONALITY #### */
    addToCartButton.setAttribute("data-product-id", product.id);
    addToCartButton.addEventListener("click", (event) =>
      addProductToCart(product, event)
    );
    // Append content to section in HTML
    productContainer.appendChild(cloneProductData);
  });
}

// Send user to singleview for the specific product
function showSingleProduct(product) {
  location.href = `singleview.html?id=${product.id}`;
}

// Show user error message (from the catch code)
function informUserOfError(message) {
  document.querySelector("h1.heading").textContent = "";
  document.querySelector("h1.heading").textContent = message;
}
