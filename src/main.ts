const primaryNav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");
const navSpanLines = document.querySelectorAll(".nav-span");

navToggle?.addEventListener("click", () => {
  const visibility = primaryNav?.getAttribute("data-visible");
  if (visibility === "false") {
    primaryNav?.setAttribute("data-visible", "true");
    navSpanLines.forEach((span) => {
      span.setAttribute("data-visible", "true");
    });
  } else {
    primaryNav?.setAttribute("data-visible", "false");
    navSpanLines.forEach((span) => {
      span.setAttribute("data-visible", "false");
    });
  }
});

export {};
