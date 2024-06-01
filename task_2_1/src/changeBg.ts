export function changeBg(element: HTMLButtonElement, output: HTMLDivElement) {
  const randomHexColor = () => {
    let background =  `#${(Math.floor(Math.random() * 16777215).toString(16)).padStart(6, '0')}`

    document.body.style.background = background;
    output.innerHTML = `Background Color: <span style="color:${background}">${background}</span>`;
  };
  element.addEventListener("click", randomHexColor);
  randomHexColor();
}
