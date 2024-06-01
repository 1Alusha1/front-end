import goods from "./goods.json";

const header: HTMLHeadElement | null = document.querySelector("header");
const basket: HTMLDivElement | null = document.querySelector(".basket");

const menuOpen: HTMLDivElement | null = document.querySelector(".menu");
const menuClose: HTMLLIElement | null = document.querySelector(".close");

const basketOpen: HTMLImageElement | null = document.querySelector(
  ".user img:first-child"
);
const basketClose: HTMLDivElement | null =
  document.querySelector(".basket-close");

menuOpen!.addEventListener("click", () => setActive(header));
menuClose!.addEventListener("click", () => setActive(header));
basketOpen!.addEventListener("click", () => setActive(basket));
basketClose!.addEventListener("click", () => setActive(basket));

const setActive = (parent: HTMLElement | null) => {
  document.body.classList.toggle("active");
  parent?.classList.toggle("active");
};

interface Goods {
  id: number;
  name: string;
  price: number;
  alt: string;
  rating: number;
  type: string;
  img: string;
}
interface BasketItem {
  count: number;
  goods: Goods;
}

const goodsList: HTMLDivElement | null =
  document.querySelector(".ai-goods .wrapper");

function renderGoods(parent: HTMLDivElement | null, data: Goods[]) {
  if (!parent) return;

  parent!.innerHTML = data.reduce(
    (acc, good) =>
      (acc += `
        <div class="ai-article" data-id=${good.id}>
          <div class="addToCart"><span>+</span>Add</div>
          <img src="./public/images/goods/${good.img}" alt="${good.alt}" />
          <div class="info">
            <div class="name">${good.name}</div>
            <div class="price">$${good.price}</div>
            <div class="rating">★★★★★</div>
            <div class="category">${good.type}</div>
          </div>
      </div>
    `),
    ""
  );
}

if (!localStorage.getItem("basket")) {
  localStorage.setItem("basket", JSON.stringify({}));
}

if (goodsList) {
  goodsList.addEventListener("click", (e) => {
    if (e.target instanceof Element) {
      const addToCartBtn: HTMLDivElement | null =
        e.target.closest(".addToCart");

      if (!addToCartBtn) return;

      const id = Number(addToCartBtn.parentElement?.dataset.id);
      const foundGoods: Goods | undefined = goods.find(
        (article) => article.id == id
      );

      let basket: string | null = localStorage.getItem("basket");

      if (basket) {
        const parsedBasket = JSON.parse(basket);
        parsedBasket[foundGoods!.id] = { goods: foundGoods, count: 1 };

        localStorage.setItem("basket", JSON.stringify(parsedBasket));
        renderBasket();
      }
    }
  });
}

const searchInput: HTMLInputElement | null =
  document.querySelector(".search input");
const topicUListElement: HTMLUListElement | null =
  document.querySelector(".topic ul");

searchInput?.addEventListener("input", () => {
  const foundGoods: Goods[] = [];

  goods.find(
    (article) =>
      article.name.includes(searchInput.value) && foundGoods.push(article)
  );
  !searchInput.value.length
    ? renderGoods(goodsList, goods)
    : renderGoods(goodsList, foundGoods);
});

topicUListElement?.addEventListener("click", (e) => {
  if (e.target instanceof Element) {
    const li = e.target.closest("li");
    const liElements: NodeListOf<HTMLLIElement> | null =
      topicUListElement.querySelectorAll("li");

    if (!li) return;

    clear(liElements, "active");
    const type = li.innerHTML;
    li.classList.add("active");

    let foundGoods: Goods[] = goods.filter((article) => article.type === type);

    type === "All" || type === "Other" ? (foundGoods = goods) : false;
    renderGoods(goodsList, foundGoods);
  }
});

const priceInput: HTMLInputElement | null =
  document.querySelector(".price input");

priceInput?.addEventListener("change", () => {
  const result: HTMLDivElement | null | undefined =
    priceInput.parentElement?.querySelector(".value");

  let foundGoods: Goods[] = goods.filter(
    (article) => article.price <= +priceInput.value
  );

  result!.innerHTML = priceInput.value;
  renderGoods(goodsList, foundGoods);
});

function clear(list: NodeListOf<Element>, selector: string) {
  list.forEach((item) => item.classList.remove(selector));
}

renderGoods(goodsList, goods);

type DataObject = { id: string; [key: string]: any };

const objectToArray = (data: DataObject) => {
  return Object.keys(data).map((key) => {
    return {
      id: key,
      ...data[key],
    };
  });
};
renderBasket();

function renderBasket() {
  const goodsList: HTMLDivElement | null | undefined = basket?.querySelector(
    ".goods-list-wrapper"
  );
  let basketGoods: string | null = localStorage.getItem("basket");

  if (basketGoods) {
    const parsedBasket = objectToArray(JSON.parse(basketGoods));

    goodsList!.innerHTML = parsedBasket.reduce(
      (
        acc: string,
        { goods, count, id }: { goods: Goods; count: number; id: number }
      ) =>
        (acc += `<div class="goods" data-id=${id}>
        <div class="info">
          <img src="./public/images/goods/${goods.img}" alt="${goods.alt}" />
          <div class="name">
            <span>${goods.name}</span>
            <span>$${goods.price}</span>
          </div>
        </div>
        <div class="controller">
          <div class="counter">
            <span class="minus">-</span>
            <span class="count">${count}</span>
            <span class="plus">+</span>
          </div>
          <div class="remove">
            Remove <span></span>
          </div>
        </div>
      </div>`),
      ""
    );
  }
  basketController(goodsList!);
  calculateBasketSum();
}

function basketController(parent: HTMLDivElement | null) {
  if (!parent) return;

  const goodsItems = parent.querySelectorAll<HTMLDivElement>(".goods");

  goodsItems.forEach((goods) => {
    const plusButton = goods.querySelector<HTMLSpanElement>(".plus");
    const minusButton = goods.querySelector<HTMLSpanElement>(".minus");
    const removeButton = goods.querySelector<HTMLSpanElement>(".remove");

    if (!plusButton || !minusButton || !removeButton) return;

    const id = parseInt(goods.dataset.id || "0");

    plusButton.addEventListener("click", () => {
      if (!isNaN(id)) {
        updateCount(id, true);
      }
    });

    removeButton.addEventListener("click", () => {
      removeItemFromBasket(id);
      renderBasket();
    });

    minusButton.addEventListener("click", () => {
      if (!isNaN(id)) {
        updateCount(id, false);
      }
    });
  });
}

function updateCount(itemId: number, shouldIncrement: boolean) {
  const basket = getBasket();
  if (shouldIncrement) {
    incrementCount(itemId, basket);
  } else {
    decrementCount(itemId, basket);
  }
  renderBasket();
}

function saveBasket(basket: Record<number, BasketItem>) {
  localStorage.setItem("basket", JSON.stringify(basket));
}

function getBasket(): Record<number, BasketItem> {
  return JSON.parse(localStorage.getItem("basket") as string) || {};
}

function incrementCount(itemId: number, basket: Record<number, BasketItem>) {
  if (basket[itemId]) {
    basket[itemId].count += 1;
    saveBasket(basket);
  }
}

function decrementCount(itemId: number, basket: Record<number, BasketItem>) {
  if (basket[itemId]) {
    if (basket[itemId].count > 1) {
      basket[itemId].count -= 1;
      saveBasket(basket);
    } else {
      removeItemFromBasket(itemId);
    }
  }
}

function removeItemFromBasket(itemId: number) {
  const basket = getBasket();
  if (basket[itemId]) {
    delete basket[itemId];
    saveBasket(basket);
  }
}

function calculateBasketSum() {
  const totalSum = document.querySelector<HTMLSpanElement>(".sum");
  if (!totalSum) return;

  const basket = getBasket();
  let sum: number = 0;

  for (let itemId in basket) {
    sum += basket[itemId].goods.price * basket[itemId].count;
  }

  totalSum.textContent = `Total: ${sum}`;
}
