const logo = document.querySelector(".logo");
const navList = document.querySelectorAll("nav ul li");
const header = document.querySelector("header");

logo.addEventListener("click", () => {
  header.classList.toggle("active");
  document.body.classList.toggle("active");
});

function clear(list, selector) {
  list.forEach((item) => item.classList.remove(selector));
}

navList.forEach((item) => {
  item.addEventListener("click", (e) => {
    let link = item.firstChild;
    clear(navList, "active");
    item.classList.add("active");
    header.classList.remove("active");
    document.body.classList.remove("active");
    location.href = link.href;
  });
});

slider();

window.addEventListener("resize", function () {
  slider();
});

function slider() {
  const left = document.querySelector(".arrow-left");
  const right = document.querySelector(".arrow-right");
  const slides = document.querySelectorAll(".slide");

  let slidesCount = slides.length;
  let slideWidth = slides[0].clientWidth;
  let sliderWidth = slideWidth * slidesCount;

  let offset = 0;
  let count = 0;

  right.addEventListener("click", (e) => changeSlide(e));
  left.addEventListener("click", (e) => changeSlide(e));
  console.log(left, right);
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

    moveSlide(offset);
  }

  function moveSlide(offset) {
    slides.forEach((item) => {
      item.style.cssText = `transform: translateX(-${offset}px);`;
    });
  }
}
