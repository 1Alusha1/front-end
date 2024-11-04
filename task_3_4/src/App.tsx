import useStore from "./store/ticTacToeState";
import Header from "./components/Header";
import PlayField from "./components/PlayField";
import styled from "styled-components";
import Chat from "./components/Chat";
import UserMessage from "./components/Message";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

function App() {
  const { move } = useStore((state) => ({
    move: state.move,
  }));

  return (
    <>
      <Header />
      <Container>
        <Wrapper>
          <UserMessage player={1}></UserMessage>
          <PlayField isActive={move} />
          <Chat player={1}></Chat>
        </Wrapper>
        <Wrapper>
          <UserMessage player={2}></UserMessage>
          <PlayField isActive={!move} />
          <Chat player={2}></Chat>
        </Wrapper>
      </Container>
    </>
  );
}

export default App;
