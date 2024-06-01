const left = document.querySelector(".arrow-left");
const right = document.querySelector(".arrow-right");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelector(".dots");

let slidesCount = slides.length;
let slideWidth = slides[0].clientWidth;
let sliderWidth = slideWidth * slidesCount;

let offset = 0;
let count = 0;

right.addEventListener("click", (e) => changeSlide(e));
left.addEventListener("click", (e) => changeSlide(e));

function changeSlide(e) {
  const direction = e.target.dataset.direction;

  if (direction === "next") {
    offset += slideWidth;
    count += 1;

    if (offset >= sliderWidth) {
      offset = 0;
    }
    if (count >= slidesCount) {
      count = 0;
    }
  } else {
    if (offset > 0) {
      offset += -slideWidth;
    }
    if (count > 0) {
      count -= 1;
    }
  }
  
  activeDot(dots.childNodes, count);
  moveSlide(offset);
}

function moveSlide(offset) {
  slides.forEach((item) => {
    item.style.cssText = `transform: translateX(-${offset}px);`;
  });
}

function clear(list, selector) {
  list.forEach((item) => item.classList.remove(selector));
}

function activeDot(dots, index) {
  clear(dots, "active");
  dots[index].classList.add("active");
}

(function drowDots() {
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("div");
    dot.className = "dot";
    dot.setAttribute("data-position", i);

    dots.appendChild(dot);
  }

  dots.childNodes[0].classList.add("active");

  dots.addEventListener("click", (e) => {
    const dot = e.target.closest(".dot");
    
    if (!dot) return;
    clear(dots.childNodes, "active");

    dot.classList.add("active");
    count = Number(dot.dataset.position);
    offset = count * slideWidth;

    moveSlide(offset);
  });
})();
