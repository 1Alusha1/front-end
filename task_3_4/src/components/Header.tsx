import useStore from "../store/ticTacToeState";
import { Button, HeaderEl, Info, Player, Score, Wrap } from "./Header.styles";

const Header = () => {
  const { score, reset } = useStore((state) => ({
    score: state.score,
    reset: state.reset,
  }));
  return (
    <HeaderEl>
      <Info>
        <Player>Player 1</Player>
        <Wrap>
          <Score>
            Score: {score.player1}:{score.player2}
          </Score>
          <Button onClick={reset}>Reset</Button>
        </Wrap>
        <Player>Player 2</Player>
      </Info>
    </HeaderEl>
  );
};

export default Header;
