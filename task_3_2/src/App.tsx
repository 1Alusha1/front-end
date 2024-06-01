import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import play from "./assets/play.svg";
import pause from "./assets/pause.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 12px 56px;
  min-width: 170px;
  font-size: 15px;
  color: #fff;
  border: none;
  border-radius: 8px;
  outline: none;

  & img {
    margin-right: 4px;
  }
  &.play {
    margin-bottom: 16px;
    background: #00ae1c;
  }
  &.pause {
    margin-bottom: 16px;
    background: #099ac8;
  }
  &.reset {
    justify-content: center;
    background: #ef9919;
  }
`;
const Timer = styled.p`
  margin-bottom: 32px;
  font-size: 64px;
`;

const TimerTitle = styled.p`
  margin-bottom: 39px;
  padding-bottom: 33px;
  font-size: 16px;
  border-bottom: 1px solid #bbbbbb;
`;

type Timer = {
  min: number;
  sec: number;
};

function countRender() {
  let count = useRef(0);
  count.current += 1;

  return count;
}

function App() {
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [timer, setTimer] = useState<Timer>({
    min: new Date().getMinutes(),
    sec: new Date().getSeconds(),
  });

  const timeOutRef = useRef<any>();

  const drawTime = () => {
    const min = timer.min < 10 ? `0${timer.min}` : timer.min;
    const sec = timer.sec < 10 ? `0${timer.sec}` : timer.sec;
    return `${min}:${sec}`;
  };

  useEffect(() => {
    if (isPlay) {
      timeOutRef.current = setTimeout(() => {
        setTimer({
          min: new Date().getMinutes(),
          sec: new Date().getSeconds(),
        });
      }, 1000);
    } else {
      clearTimeout(timeOutRef.current);
    }
  }, [timer.sec, isPlay]);

  const togglePlay = () => {
    setIsPlay(!isPlay);
  };

  const reset = async () => {
    clearTimeout(timeOutRef.current);
    setTimer({ min: 0, sec: 0 });
  };
  return (
    <Container>
      <Timer>{drawTime()}</Timer>
      <TimerTitle>
        Number of component renders: {countRender().current}
      </TimerTitle>
      {!isPlay ? (
        <Button className="play" onClick={() => togglePlay()}>
          <img src={play} alt="play icon" /> <span>Play</span>
        </Button>
      ) : (
        <>
          <Button className="pause" onClick={() => togglePlay()}>
            <img src={pause} alt="pause icon" /> <span>Pause</span>
          </Button>
          <Button className="reset" onClick={() => reset()}>
            Reset
          </Button>
        </>
      )}
    </Container>
  );
}

export default App;
