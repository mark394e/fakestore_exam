import { user_logout } from "./logout.mjs";

user_logout();

document.querySelector("#expiry").addEventListener("input", function (e) {
  expiration_slash(e);
});

function expiration_slash(e) {
  let input = e.target.value;
  if (input.length === 2) {
    input += "/";
    document.querySelector("#expiry").value = input;
  } else if (input.charAt(3) === "/") {
    input = input.replace("/", "");
    document.querySelector("#expiry").value = input;
  }
}
