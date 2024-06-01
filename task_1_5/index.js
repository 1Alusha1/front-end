window.addEventListener("scroll", () => {
  const containers = document.querySelectorAll(".parallax");
  const scroll = window.pageYOffset;
  const windowHeight = window.innerHeight;

  containers.forEach((container) => {
    const containerTop = container.getBoundingClientRect().top + scroll;
    const containerBottom = containerTop + container.offsetHeight;

    if (containerTop < scroll + windowHeight && containerBottom > scroll) {
      const children = container.children;
      for (let i = 0; i < children.length; i++) {
        // children[0].style.transform = `translateY(${
        //   (scroll - containerTop) * children[1].dataset.speed
        // }px)`;
        children[1].style.transform = `translateY(-${
          (scroll - containerTop) * children[1].dataset.speed
        }px)`;
      }
    }
  });
});
