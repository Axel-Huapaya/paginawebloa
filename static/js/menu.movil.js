document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("animate-pulse");
  const mobileMenu = document.getElementById("mobile-menu");

  if (toggle && mobileMenu) {
    toggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
});
