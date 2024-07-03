import styled from "styled-components";
import data from "../../data.json";
import Card from "../components/Card";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 30px;
`;

const Main = () => {
  return (
    <div className="container">
      <Wrapper>
        {data.map((good) => (
          <Card key={good.id} good={good}></Card>
        ))}
      </Wrapper>
    </div>
  );
};

export default Main;
