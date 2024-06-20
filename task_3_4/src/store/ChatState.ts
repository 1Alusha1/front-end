import create from "zustand";

interface Chat {
  messages:
    | {
        player: number;
        message: string;
        date: string;
      }[];
  sendMessage: (message: string, player: number, date: string) => void;
}

const useStore = create<Chat>((set) => ({
  messages: [],
  sendMessage: (message, player, date) => {
    set((state) => ({
      messages: [...state.messages, { message, player, date }],
    }));
  },
}));

export default useStore;
