import styled from "styled-components";
import useStore from "../store/ticTacToeState";
import { useEffect, useState } from "react";

const Message = styled.p`
  padding: 37px;
  color: #ef9919;
  font-size: 32px;
`;

type Field = {
  [key: string]: number | null;
};

const UserMessage = ({ player }: { player: number }) => {
  const [message, setMessage] = useState<{
    player: number;
    message: string;
  } | null>(null);

  const { field, move, winner } = useStore((state) => ({
    field: state.field,
    move: state.move,
    winner: state.winner,
  }));

  useEffect(() => {
    showMessage();
  }, [move, field, winner]);

  const showMessage = () => {
    const isGameStart = (obj: Field) => {
      return Object.values(obj).some((value) => value !== null);
    };

    const checkDraw = (obj: Field) => {
      return Object.values(obj).every((value) => value !== null);
    };

    if (!isGameStart(field)) {
      setMessage({
        player: player,
        message:
          player === 1
            ? "Game started! Wait your opponent."
            : "Game started! Your turn:",
      });
    } else if (move) {
      setMessage({
        player: player,
        message: player === 1 ? "Your turn:" : "Wait your opponent.",
      });
    } else {
      setMessage({
        player: player,
        message: player === 1 ? "Wait your opponent." : "Your turn:",
      });
    }
    if (winner !== null) {
      setMessage({
        player: player,
        message: player === winner ? "You win!" : "You lost!",
      });
    }
    if (checkDraw(field)) {
      setMessage({
        player: player,
        message: "Draw",
      });
    }
  };
  return <Message>{message?.message}</Message>;
};

export default UserMessage;
