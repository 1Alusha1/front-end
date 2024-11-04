import styled from "styled-components";

export const ChatField = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 640px;
  height: 375px;
  background: #454545;
  border: 1px solid #454545;
  border-radius: 8px 8px 0px 0px;
  overflow: hidden;
`;

export const ChatFieldHeader = styled.div`
  width: 100%;
  background: #222222;
`;

export const PlayerInfo = styled.div`
  display: flex;
  padding: 9px;
  font-size: 16px;
  color: #fff;

  p {
    margin-left: 10px;
  }
`;

export const ChatFieldBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  padding: 0px 20px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 4px;
    background: #222222;
  }

  &::-webkit-scrollbar-thumb {
    background-color: blue;
    border-radius: 20px;
    border: 3px solid #ef9919;
  }

  .p1 {
    background: #737373;
  }
  .p2 {
    background: #00ae1c;
    align-self: flex-end;
  }
`;

export const Message = styled.div<{ length: number }>`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 10px;
  padding: 5px;
  width: ${({ length }) => (length > 20 ? "auto" : "100px")};
  max-width: 50%;
  font-size: ${({ length }) => (length > 20 ? "14px" : "16px")};
  color: #fff;
  border-radius: 5px;

  p {
    word-break: break-all;
  }
  span {
    align-self: flex-end;
  }
`;

export const TextField = styled.div`
  position: relative;
  padding: 0px 20px;
  margin-bottom: 10px;

  input {
    padding: 16px 18px;
    width: 100%;
    color: #fff;
    font-size: 16px;
    background: #8b8b8b;
    border: none;
    border: 1px solid #fff;
    border-radius: 8px;
    outline: none;
  }

  img {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 36px;
    cursor: pointer;
  }
`;
