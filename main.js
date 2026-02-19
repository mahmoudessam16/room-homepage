const roomData = [
  {
    title: "Discover innovative ways to decorate",
    description:
      "We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and what you love.",
    desktopImage: "images/desktop-image-hero-1.jpg",
    mobileImage: "images/mobile-image-hero-1.jpg",
  },
  {
    title: "We are available all across the globe",
    description:
      "With stores all over the world, it's easy for you to find furniture for your home or place of business. Locally, we’re in most major cities throughout the country. Find the branch nearest you using our store locator. Any questions? Don't hesitate to contact us today.",
    desktopImage: "images/desktop-image-hero-2.jpg",
    mobileImage: "images/mobile-image-hero-2.jpg",
  },
  {
    title: "Manufactured with the best materials",
    description: `Our modern furniture store provide a high level of quality. Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible. With three decades of experience in this industry, we understand what customers want for their home and office.`,
    desktopImage: "images/desktop-image-hero-3.jpg",
    mobileImage: "images/mobile-image-hero-3.jpg",
  },
];

const heroHeaderSection = document.querySelector("#hero-header");
const title = document.querySelector(".title");
const description = document.querySelector(".description");
const rightArrow = document.querySelector("#slide-right");
const leftArrow = document.querySelector("#slide-left");
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".menu-mobile");
const menuOverlay = document.querySelector(".menu-overlay");
const closeIcon = document.querySelector(".close");

// Defensive check (production mindset)
if (!heroHeaderSection || !title || !description) {
  throw new Error("Critical DOM elements not found");
}

const mobileMediaQuery = window.matchMedia("(max-width: 890px)");

let currentIndex = Number(localStorage.getItem("currentIndex")) || 0;

// Ensure index is always valid
if (currentIndex < 0 || currentIndex >= roomData.length) {
  currentIndex = 0;
}

// Persist state
function saveState() {
  localStorage.setItem("currentIndex", String(currentIndex));
}

// Get correct image based on screen size
function getResponsiveImage(data) {
  return mobileMediaQuery.matches ? data.mobileImage : data.desktopImage;
}

// Render function (Single source of truth)
function renderSlide(index) {
  const data = roomData[index];
  if (!data) return;

  title.textContent = data.title;
  description.textContent = data.description;

  const image = getResponsiveImage(data);
  heroHeaderSection.style.backgroundImage = `url(${image})`;
}

// Navigation logic (clean & predictable)
function nextSlide() {
  currentIndex = (currentIndex + 1) % roomData.length;
  saveState();
  renderSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + roomData.length) % roomData.length;
  saveState();
  renderSlide(currentIndex);
}

// Event Listeners (with null safety)
rightArrow?.addEventListener("click", nextSlide);
leftArrow?.addEventListener("click", prevSlide);

mobileMediaQuery.addEventListener("change", () => {
  renderSlide(currentIndex);
});

// Initial render
renderSlide(currentIndex);

// Mobile Menu Toggle (safe handling)
hamburger?.addEventListener("click", () => {
  if (mobileMenu && menuOverlay) {
    mobileMenu.style.display = "flex";
    menuOverlay.style.display = "block";
  }
});

closeIcon?.addEventListener("click", () => {
  if (mobileMenu && menuOverlay) {
    mobileMenu.style.display = "none";
    menuOverlay.style.display = "none";
  }
});
