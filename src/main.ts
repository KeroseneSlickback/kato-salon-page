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
    setTimeout(() => {
      mobileBackdrop?.setAttribute("data-visible", "false");
    }, 100);
    setTimeout(() => {
      navBookButtonContainer?.setAttribute("data-visible", "false");
      navBookButton?.setAttribute("data-visible", "false");
    }, 200);
  }
};

navToggle?.addEventListener("click", mobileNavSlide);
mobileBackdrop?.addEventListener("click", mobileNavSlide);

const aboutMeImgs = document.querySelectorAll(".about-me-image");

let carouselIndex = 0;
const carouselTimer = 4000;

const incrementIndex = () => {
  if (carouselIndex === aboutMeImgs.length - 1) {
    carouselIndex = 0;
  } else {
    carouselIndex += 1;
  }
};

const determineIndex = async (index: number) => {
  let newIndex = index + 1;
  if (newIndex > aboutMeImgs.length - 1) {
    return 0;
  } else {
    return newIndex;
  }
};

const centerCycle = (element: Element) => {
  element.classList.remove("carousel-bottom-right");
  element.classList.remove("carousel-top-left");
  element.classList.remove("carousel-center");
  element.classList.add("carousel-center");
};

const topLeftCycle = (element: Element) => {
  element.classList.remove("carousel-center");
  element.classList.remove("carousel-bottom-right");
  element.classList.remove("carousel-top-left");
  element.classList.add("carousel-top-left");
};

const bottomRightCycle = (element: Element) => {
  element.classList.remove("carousel-center");
  element.classList.remove("carousel-bottom-right");
  element.classList.remove("carousel-top-left");
  element.classList.add("carousel-bottom-right");
};

const runCarousel = async () => {
  let topLeftIndex = await determineIndex(carouselIndex);
  let bottomRightIndex = await determineIndex(topLeftIndex);
  setTimeout(() => {
    centerCycle(aboutMeImgs[carouselIndex]);
    topLeftCycle(aboutMeImgs[topLeftIndex]);
    bottomRightCycle(aboutMeImgs[bottomRightIndex]);
    incrementIndex();
    runCarousel();
  }, carouselTimer);
};

runCarousel();

export {};
