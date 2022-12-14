let englishScript: any;
let japaneseScript: any;
let defaultLangauge = "en";
let currentLanguage = "en";

const loadLanguages = async () => {
  englishScript = await fetch("./data/english.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
  japaneseScript = await fetch("./data/japanese.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

document.addEventListener("DOMContentLoaded", async () => {
  await loadLanguages();
  let browserLang = navigator.language.substring(0, 2);
  let storedLang = localStorage.getItem("language");
  if (!!storedLang) {
    if (storedLang === defaultLangauge) {
      return;
    } else {
      applyStrings(storedLang);
      currentLanguage = storedLang;
    }
  } else if (!!browserLang) {
    if (browserLang === defaultLangauge) {
      return;
    } else {
      applyStrings(browserLang);
      currentLanguage = browserLang;
      saveLanguage(browserLang);
    }
  } else {
    return;
  }
});

const applyStrings = (lang: any) => {
  const containers = document.querySelectorAll("[data-key]");
  containers.forEach((container) => {
    let key = container.getAttribute("data-key");
    let keys = key?.split("-");
    if (lang === "en" && keys) {
      container.textContent = englishScript[keys[0]][keys[1]];
    } else if (lang === "ja" && keys) {
      container.textContent = japaneseScript[keys[0]][keys[1]];
    }
  });
};

const saveLanguage = (language: string) => {
  localStorage.setItem("language", language);
};

document.querySelector(".language")?.addEventListener("click", () => {
  if (currentLanguage === "en") {
    currentLanguage = "ja";
    applyStrings("ja");
    saveLanguage("ja");
  } else {
    currentLanguage = "en";
    applyStrings("en");
    saveLanguage("en");
  }
});

const primaryNav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");
const navSpanLines = document.querySelectorAll(".nav-span");
const navBookButtonContainer = document.querySelector(
  ".nav-book-button-container"
);
const navBookButton = document.querySelector(".nav-book-button");
const mobileBackdrop = document.querySelector(".mobile-backdrop");

const hideNavbar = () => {
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
};

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

const navbarAs = document.querySelectorAll(".nav-a");

navbarAs.forEach((element) => {
  element.addEventListener("click", hideNavbar);
});

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
  element.classList.remove("carousel-top-left");
  element.classList.add("carousel-center");
};

const topLeftCycle = (element: Element) => {
  element.classList.remove("carousel-bottom-right");
  element.classList.add("carousel-top-left");
};

const bottomRightCycle = (element: Element) => {
  element.classList.remove("carousel-center");
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

const testimonialArray = document.querySelectorAll(".testimonial-block");

const runTestTestimonialCycle = () => {
  setTimeout(() => {
    testimonialArray.forEach((element) => {
      if (element.classList.contains("previous")) {
        element.classList.remove("previous");
        element.classList.add("hidden-3");
      } else if (element.classList.contains("center")) {
        element.classList.remove("center");
        element.classList.add("previous");
      } else if (element.classList.contains("next")) {
        element.classList.remove("next");
        element.classList.add("center");
      } else if (element.classList.contains("hidden-3")) {
        element.classList.remove("hidden-3");
        element.classList.add("hidden-2");
      } else if (element.classList.contains("hidden-2")) {
        element.classList.remove("hidden-2");
        element.classList.add("hidden-1");
      } else if (element.classList.contains("hidden-1")) {
        element.classList.remove("hidden-1");
        element.classList.add("next");
      }
    });
    runTestTestimonialCycle();
  }, 4000);
};

runTestTestimonialCycle();

const sendButton = document.querySelector(".send-button");

sendButton?.addEventListener("click", () => {
  sendButton.classList.add("button-confirm");
  setTimeout(() => {
    if (currentLanguage === "en") {
      sendButton.innerHTML = "Sent!";
    } else {
      sendButton.innerHTML = "???????????????";
    }
  }, 350);
});

export {};
