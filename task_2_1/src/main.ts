import "./style.css";
import { changeBg } from "./changeBg.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <div class="output"></div>
    <button id="changeBg">Click me</button> 
`;


const btn = document.querySelector<HTMLButtonElement>("#changeBg");
const output = document.querySelector<HTMLDivElement>(".output");
changeBg(btn!, output!);
