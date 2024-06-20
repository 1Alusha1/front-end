import styled, { css } from "styled-components";

export const Field = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 15px;
  margin-bottom: 38px;
  width: 300px;
  height: 300px;
  border-radius: 8px;
  background: #313131;
  position: relative;
`;

export const Cell = styled.div<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 90px;
  box-sizing: border-box;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  background-color: ${(props) => (props.disabled ? "#555" : "transparent")};

  &:nth-child(-n + 3) {
    border-bottom: 1px solid #fff;
  }

  &:nth-child(n + 4):nth-child(-n + 6) {
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
  }

  &:nth-child(n + 7) {
    border-top: 1px solid #fff;
  }

  &:nth-child(3n + 1) {
    border-right: 1px solid #fff;
  }

  &:nth-child(3n + 2) {
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;
  }

  &:nth-child(3n) {
    border-left: 1px solid #fff;
  }
  img {
    width: 70px;
    height: 70px;
  }
`;

export const WinLine = styled.div<{ variant: number }>`
  position: absolute;
  width: 284px;
  height: 6px;
  border-radius: 5px;
  background: #fff;
  ${({ variant }) => {
    switch (variant) {
      case 1:
        return css`
          top: 57px;
          left: 6px;
        `;
      case 2:
        return css`
          top: 147px;
          left: 6px;
        `;
      case 3:
        return css`
          top: 239px;
          left: 6px;
        `;
      case 4:
        return css`
          top: 10px;
          left: 57px;
          width: 6px;
          height: 284px;
        `;
      case 5:
        return css`
          top: 10px;
          left: 147px;
          width: 6px;
          height: 284px;
        `;
      case 6:
        return css`
          top: 10px;
          left: 239px;
          width: 6px;
          height: 284px;
        `;
      case 7:
        return css`
          top: 146px;
          left: -30px;
          width: 360px;
          transform: rotate(45deg);
        `;
      case 8:
        return css`
          top: 146px;
          left: -30px;
          width: 360px;
          transform: rotate(-45deg);
        `;
      default:
        return "";
    }
  }}
`;
