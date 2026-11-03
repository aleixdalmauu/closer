const betaDialog = document.querySelector(".modal");
const betaForm = betaDialog.querySelector("form");
const emailInput = betaForm.querySelector('input[type="email"]');
const successToast = document.querySelector(".success-toast");
const closeButton = betaDialog.querySelector(".modal-close");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
let toastTimer;

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  siteNav.classList.toggle("is-open", !isExpanded);
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    menuToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
  }
});

document.querySelectorAll(".button-apply").forEach((button) => {
  button.addEventListener("click", () => {
    betaDialog.showModal();
    emailInput.focus({ preventScroll: true });
  });
});

closeButton.addEventListener("click", () => betaDialog.close());

betaDialog.addEventListener("click", (event) => {
  if (event.target === betaDialog) betaDialog.close();
});

betaForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!betaForm.reportValidity()) return;

  betaDialog.close();
  betaForm.reset();
  successToast.textContent = "You joined successfully! We'll be in touch.";
  successToast.hidden = false;
  successToast.classList.remove("is-visible");
  requestAnimationFrame(() => successToast.classList.add("is-visible"));

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    successToast.classList.remove("is-visible");
    setTimeout(() => {
      successToast.hidden = true;
    }, 300);
  }, 3500);
});