import create, { StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { Good } from "../components/Card";

interface Cart {
  sum: number;
  together: number;
  goods: {
    id: number;
    name: string;
    price: number;
    img: string;
    alt: string;
    count?: number;
  }[];
  delete: (good: Good) => void;
  increase: (good: Good) => void;
  decrease: (good: Good) => void;
  addToCart: (good: Good) => void;
  clearCart: () => void;
}

type CartStateCreator = StateCreator<Cart, [], []>;

const cartStore: CartStateCreator = (set) => ({
  sum: 0,
  together: 0,
  goods: [],
  delete: (good) => {
    set((state) => {
      const newGoods = state.goods.filter((g) => g.id !== good.id);
      const newTogether = newGoods.reduce((acc, good) => acc + good.count!, 0);

      return { goods: newGoods, together: newTogether };
    });
  },
  increase: (good) => {
    set((state) => {
      const newGoods = state.goods.map((g) =>
        g.id === good.id ? { ...g, count: g.count! + 1 } : g
      );

      const newSum = newGoods.reduce(
        (acc, good) => acc + good.price * (good.count ?? 1),
        0
      );
      const newTogether = newGoods.reduce((acc, good) => acc + good.count!, 0);

      return { goods: newGoods, sum: newSum, together: newTogether };
    });
  },
  decrease: (good) => {
    set((state) => {
      const newGoods = state.goods
        .map((g) => (g.id === good.id ? { ...g, count: g.count! - 1 } : g))
        .filter((g) => g.count && g.count > 0);

      const newSum = newGoods.reduce(
        (acc, good) => acc + good.price * (good.count ?? 1),
        0
      );
      const newTogether = newGoods.reduce((acc, good) => acc + good.count!, 0);

      return { goods: newGoods, sum: newSum, together: newTogether };
    });
  },
  addToCart: (good) => {
    set((state) => {
      const isExist = state.goods.find((g) => g.id === good.id);

      let newGoods;

      if (isExist) {
        newGoods = state.goods.map((g) =>
          g.id === good.id ? { ...g, count: (g.count ?? 1) + 1 } : g
        );
      } else {
        newGoods = [...state.goods, { ...good, count: 1 }];
      }

      const newSum = newGoods.reduce(
        (acc, good) => acc + good.price * (good.count ?? 1),
        0
      );
      const newTogether = newGoods.reduce((acc, good) => acc + good.count!, 0);

      return { goods: newGoods, sum: newSum, together: newTogether };
    });
  },
  clearCart: () => {
    set(() => ({
      goods: [],
      sum: 0,
      together: 0,
    }));
  },
});

const cartState = create<Cart>()(devtools(cartStore, { name: "CartStore" }));

export default cartState;
