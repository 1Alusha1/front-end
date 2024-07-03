import React, { FC } from "react";
import styled from "styled-components";
import useStore from "../store/CartState";
import { string } from "zod";

const ButtonEl = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px 12px;
  color: #fff;
  background: #00ae1c;
  border: none;
  border: 1px solid transparent;
  border-radius: 8px;

  &:hover {
    border: 1px solid #5ce171;
    cursor: pointer;
  }

  &:disabled {
    background: #187727;

    &:hover {
      border: 1px solid transparent;
    }
  }
`;

const Notice = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  color: #000;
  font-size: 11px;
  background: #e9ed08;
  border-radius: 50%;
`;

interface Button {
  click?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  cart?: boolean;
}

const Button: FC<Button> = ({ click, children, disabled, cart }) => {
  const together = useStore((state) => state.together);
  return (
    <ButtonEl disabled={disabled} onClick={() => click && click()}>
      {together > 0 && cart && (
        <Notice>
          <span>{together}</span>
        </Notice>
      )}
      <>{children}</>
    </ButtonEl>
  );
};

export default Button;
