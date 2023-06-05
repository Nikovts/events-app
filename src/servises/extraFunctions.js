export function getPartials() {
  return {
    header: "./views/common/header.hbs",
    footer: "./views/common/footer.hbs",
  };
}
export function allert() {
  const errorBox = document.getElementById("loadingBox");
  errorBox.style.display = "block";
}
export function stopAllert() {
  const errorBox = document.getElementById("loadingBox");
  errorBox.style.display = "none";
}
export function displayError(message) {
  const errorBox = document.getElementById("errorBox");
  errorBox.style.display = "block";
  errorBox.textContent = message;
  setTimeout(() => {
    errorBox.style.display = "none";
  }, 2000);
}
export function displaySuccess(message) {
  const successBox = document.getElementById("successBox");
  successBox.style.display = "block";
  successBox.textContent = message;
  setTimeout(() => {
    successBox.style.display = "none";
  }, 6000);
}
export function setInfo(ctx) {
  ctx.isLOgin = sessionStorage.getItem("authtoken") !== null;
  ctx.username = sessionStorage.getItem("username");
}
export function saveAuthtoken(userinfo) {
  sessionStorage.setItem("authtoken", userinfo._kmd.authtoken);
  sessionStorage.setItem("username", userinfo.username);
  sessionStorage.setItem("userId", userinfo._id);
}
export function changeHandlerFactory() {
  let id;

  return (event) => {
    const newValue = event.target.value;
    if (id) {
      clearTimeout(id);
      id = null;
    }
    id = setTimeout(() => {
      id=null;
        return newValue;


    }, 200);
  };
}
