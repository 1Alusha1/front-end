let aside = document.querySelector("aside");
let list = aside.querySelectorAll("ul li");

aside.addEventListener("click", () => {
  aside.classList.toggle("active");
});

function clear(list, selector) {
  list.forEach((item) => item.classList.remove(selector));
}

list.forEach((item) => {
  item.addEventListener("click", (e) => {
    clear(list, "active");
    item.classList.add("active");

    let liActive = aside.querySelector("li.active");
    liActive.addEventListener("click", () => aside.classList.toggle("active"));
  });
});
