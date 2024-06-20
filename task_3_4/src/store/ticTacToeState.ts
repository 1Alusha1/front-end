import create from "zustand";

interface TicTacToe {
  field: {
    cell1: number | null;
    cell2: number | null;
    cell3: number | null;
    cell4: number | null;
    cell5: number | null;
    cell6: number | null;
    cell7: number | null;
    cell8: number | null;
    cell9: number | null;
  };
  move: boolean;
  score: {
    player1: number;
    player2: number;
  };
  winner: number | null;
  setWinner: (player: number) => void;
  setScore: (player: number) => void;
  setField: (cell: string, value: number) => void;
  setMove: () => void;
  reset: () => void;
}

const useStore = create<TicTacToe>((set) => ({
  field: {
    cell1: null,
    cell2: null,
    cell3: null,
    cell4: null,
    cell5: null,
    cell6: null,
    cell7: null,
    cell8: null,
    cell9: null,
  },
  move: false,
  score: {
    player1: 0,
    player2: 0,
  },
  winner: null,
  setScore: (player) => {
    set((state) => ({
      score: {
        ...state.score,
        player1:
          player === 1 ? (state.score.player1 += 1) : state.score.player1,
        player2:
          player === 2 ? (state.score.player2 += 1) : state.score.player2,
      },
    }));
  },
  setMove: () => {
    set((state) => ({
      move: !state.move,
    }));
  },
  setWinner: (player) => {
    set((state) => ({
      ...state,
      winner: player,
    }));
  },
  setField: (cell, value) => {
    set((state) => ({
      field: { ...state.field, [cell]: value },
    }));
  },
  reset: () => {
    set({
      field: {
        cell1: null,
        cell2: null,
        cell3: null,
        cell4: null,
        cell5: null,
        cell6: null,
        cell7: null,
        cell8: null,
        cell9: null,
      },
      move: false,
      winner: null,
    });
  },
}));

export default useStore;
