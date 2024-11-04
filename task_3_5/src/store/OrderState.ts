import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";
import { User } from "../views/ContactInfo";
import { Shipment } from "../views/ShipmentInfo";

interface Order {
  shipmentInfo: Shipment | null;
  userInfo: User | null;
  setShipmentInfo: (data: Shipment | null) => void;
  setUserInfo: (data: User | null) => void;
}

type CartStateCreator = StateCreator<Order, [], []>;

const orderStore: CartStateCreator = (set) => ({
  shipmentInfo: null,
  userInfo: null,
  setShipmentInfo: (data) => {
    set((state) => ({
      shipmentInfo: { ...state.shipmentInfo, ...data! },
    }));
  },
  setUserInfo: (data) => {
    set((state) => ({
      userInfo: { ...state.userInfo, ...data! },
    }));
  },
});

const orderState = create<Order>()(
  devtools(orderStore, { name: "OrderStore" })
);

export default orderState;
