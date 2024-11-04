import styled from "styled-components";

export const Container = styled.div`
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 100px;
`;

export const Error = styled.div`
  font-size: 10px;
  color: #ff5620;
`;

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  border-radius: 8px;
  margin-bottom: 32px;
  padding: 32px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px #0000001a;

  &.column {
    flex-direction: column;
  }
`;

export const Label = styled.label`
  margin-bottom: 32px;
  width: 40%;
  color: #243573;

  input {
    display: block;
  }
`;
export const Input = styled.input`
  padding: 13px 0;
  width: 90%;
  color: #243573;
  border: none;
  border-bottom: 1px solid #737373;
  outline: none;

  &:focus {
    border-bottom: 1px solid #243573;
  }

  &.error {
    border-bottom: 1px solid #ff5620;
  }
  .error {
    color: #ff5620;
  }
  &::placeholder {
    color: #243573;
  }
  &[type="submit"] {
    width: 20%;
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
  }
`;

export const Select = styled.select`
  padding: 13px 0;
  width: 90%;
  color: #243573;
  border: none;
  border-bottom: 1px solid #737373;
  outline: none;

  &:focus {
    border-bottom: 1px solid #243573;
  }

  &.error {
    border-bottom: 1px solid #ff5620;
  }
  .error {
    color: #ff5620;
  }
  &::placeholder {
    color: #243573;
  }
`;
export const Title = styled.h2`
  font-size: 32px;
  color: #243573;
  margin-bottom: 24px;
  font-weight: 400;
`;
