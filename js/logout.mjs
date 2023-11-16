export function user_logout() {
  const logoutBtn = document.querySelector(".logout-link");
  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("email");
    window.location.href = "index.html";
  });
}
