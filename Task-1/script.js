const track = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".slide");
const dotsContainer = document.getElementById("dots");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

let index = 0;
let interval;

function getVisibleCount() {
  const w = window.innerWidth;
  if (w >= 1200) return 3;
  if (w >= 600) return 2;
  return 1;
}

function updateSlider() {
  const slideWidth = slides[0].offsetWidth + 20;
  const totalWidth = slideWidth * slides.length;
  track.style.width = `${totalWidth}px`;
  track.style.transform = `translateX(-${index * slideWidth}px)`;
  updateDots();
}

function updateDots() {
  dotsContainer.innerHTML = '';
  const total = slides.length - getVisibleCount() + 1;
  for (let i = 0; i < total; i++) {
    const dot = document.createElement("span");
    dot.classList.toggle("active", i === index);
    dot.addEventListener("click", () => {
      index = i;
      updateSlider();
    });
    dotsContainer.appendChild(dot);
  }
}

function nextSlide() {
  const maxIndex = slides.length - getVisibleCount();
  index = (index + 1) > maxIndex ? 0 : index + 1;
  updateSlider();
}

function prevSlide() {
  const maxIndex = slides.length - getVisibleCount();
  index = (index - 1) < 0 ? maxIndex : index - 1;
  updateSlider();
}

function startAuto() {
  interval = setInterval(nextSlide, 3000);
}

function stopAuto() {
  clearInterval(interval);
}

next.addEventListener("click", nextSlide);
prev.addEventListener("click", prevSlide);
document.getElementById("slider").addEventListener("mouseenter", stopAuto);
document.getElementById("slider").addEventListener("mouseleave", startAuto);
window.addEventListener("resize", () => setTimeout(updateSlider, 200));

let startX = 0;
track.addEventListener("touchstart", e => startX = e.touches[0].clientX);
track.addEventListener("touchend", e => {
  const diff = startX - e.changedTouches[0].clientX;
  if (diff > 50) nextSlide();
  else if (diff < -50) prevSlide();
});

updateSlider();
startAuto();
