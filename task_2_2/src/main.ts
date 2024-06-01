import data from "./data.json";
interface IPost {
  id: number;
  title: string;
  text: string;
  likes: number;
  imgPath: string;
  type: string;
}

const posts: IPost[] = data;

const header: HTMLElement = document.querySelector("header")!;
const cards: HTMLDivElement = document.querySelector(".cards")!;
render(cards, posts);

header.addEventListener("click", (e: MouseEvent) => {
  const buttons: NodeListOf<HTMLElement> = header.querySelectorAll("button");

  const button = (e.target as HTMLElement).closest("button");
  if (!button) return;

  clear(Array.from(buttons), "active");

  let filteredPosts = filterPosts(posts, button.innerHTML);
  button.classList.add("active");
  render(cards, filteredPosts);
});

const h1: HTMLHeadingElement | null = document.querySelector("h1");

h1!.addEventListener("click", () => {
  render(cards, data);
});

function filterPosts(posts: IPost[], type: string): IPost[] {
  const filteredPosts = posts.filter((post) => post.type === type);

  posts = filteredPosts;
  return posts;
}

function clear(list: HTMLElement[], selector: string) {
  list.forEach((item: HTMLElement) => {
    item.classList.remove(selector);
  });
}

function render(parent: HTMLDivElement, data: IPost[]) {
  let cards = "";

  data.forEach((item: IPost) => {
    let length = item.imgPath.split("/").length;
    let alt = item.imgPath.split("/")[length - 1].slice(0, -4);
    alt = alt.split("-").join(" ");

    cards += `
    <div class="card" data-type="${item.type}" data-id="${item.id}">
            <img src="../public/foxes/${item.imgPath}" alt="${alt}" />
            <div class="content">
              <div class="content-header">
                <h2>${item.title}</h2>
                <span>${item.likes}</span>
              </div>
              <div class="content-body">
                <p>
                  ${item.text}
                </p>
              </div>
              <div class="content-footer">
                <a href="#">Read more >></a>
              </div>
            </div>
          </div>
    `;
  });
  parent.innerHTML = cards;
}
