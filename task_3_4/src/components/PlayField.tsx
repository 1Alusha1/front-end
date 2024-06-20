import useStore from "../store/ticTacToeState";
import React, { useEffect } from "react";
import ellips from "../assets/img/ellips.svg";
import cross from "../assets/img/cross.svg";
import { Cell, Field, WinLine } from "./PlayFiedl.styles";

type Field = {
  [key: string]: number | null;
};

export const isWin = (field: Field) => {
  const variants = [
    ["cell1", "cell2", "cell3"],
    ["cell4", "cell5", "cell6"],
    ["cell7", "cell8", "cell9"],
    ["cell1", "cell4", "cell7"],
    ["cell2", "cell5", "cell8"],
    ["cell3", "cell6", "cell9"],
    ["cell1", "cell5", "cell9"],
    ["cell3", "cell5", "cell7"],
  ];

  for (let i = 0; i < variants.length; i++) {
    const [firstCell, secondCell, thirdCell] = variants[i];
    if (
      field[firstCell] !== null &&
      field[firstCell] === field[secondCell] &&
      field[secondCell] === field[thirdCell]
    ) {
      return { winner: field[firstCell], variant: i + 1 };
    }
  }
  return { winner: null, variant: null };
};

const PlayField = ({ isActive }: { isActive: boolean }) => {
  const { field, setField, move, setMove, setScore, setWinner, winner } =
    useStore((state) => ({
      field: state.field as { [key: string]: number | null },
      setField: state.setField,
      move: state.move,
      setMove: state.setMove,
      setScore: state.setScore,
      setWinner: state.setWinner,
      winner: state.winner,
    }));

  useEffect(() => {
    const { winner } = isWin(field);
    if (winner) {
      setWinner(winner);
      setScore(winner);
    }
  }, [move]);

  const makeMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isActive) {
      const target = e.target as HTMLDivElement;
      const cell = target.dataset.cell;
      if (cell && field[cell] === null) {
        setField(cell, move ? 1 : 2);
        setMove();
      }
    }
  };

  return (
    <Field>
      {Object.keys(field).map((cell) => (
        <Cell
          key={cell}
          data-cell={cell}
          disabled={!isActive || winner !== null}
          onClick={makeMove}
        >
          {field[cell] === 1 ? (
            <img src={cross} alt="" />
          ) : field[cell] === 2 ? (
            <img src={ellips} alt="" />
          ) : (
            ""
          )}
        </Cell>
      ))}
      {winner && <WinLine variant={isWin(field).variant!} />}
    </Field>
  );
};

export default PlayField;
