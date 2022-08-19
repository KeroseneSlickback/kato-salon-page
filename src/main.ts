const primaryNav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");
const navSpanLines = document.querySelectorAll(".nav-span");
const navBookButtonContainer = document.querySelector(
  ".nav-book-button-container"
);
const navBookButton = document.querySelector(".nav-book-button");
const mobileBackdrop = document.querySelector(".mobile-backdrop");

const mobileNavSlide = () => {
  const visibility = primaryNav?.getAttribute("data-visible");
  if (visibility === "false") {
    primaryNav?.setAttribute("data-visible", "true");
    navSpanLines.forEach((span) => {
      span.setAttribute("data-visible", "true");
    });
    navBookButtonContainer?.setAttribute("data-visible", "true");
    navBookButton?.setAttribute("data-visible", "true");
    mobileBackdrop?.setAttribute("data-visible", "true");
  } else {
    primaryNav?.setAttribute("data-visible", "false");
    navSpanLines.forEach((span) => {
      span.setAttribute("data-visible", "false");
    });
    mobileBackdrop?.setAttribute("data-visible", "false");
    const colorChangeTimeout = setTimeout(() => {
      navBookButtonContainer?.setAttribute("data-visible", "false");
      navBookButton?.setAttribute("data-visible", "false");
    }, 200);
    clearTimeout(colorChangeTimeout);
  }
};

navToggle?.addEventListener("click", mobileNavSlide);
mobileBackdrop?.addEventListener("click", mobileNavSlide);

export {};
