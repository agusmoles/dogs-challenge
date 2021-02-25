import React, { FunctionComponent, InputHTMLAttributes } from "react";
import styled from "styled-components";

interface InputProps extends InputHTMLAttributes<Element> {
  label?: string;
}

export const Input: FunctionComponent<InputProps> = ({
  label,
  ...inputProps
}) => {
  return (
    <Label>
      {label}
      <StyledInput {...inputProps} />
    </Label>
  );
};

export const Label = styled.label`
  font-size: 16px;
  padding-bottom: 20px;
`;

const StyledInput = styled.input`
  display: block;
  height: 22px;
  -webkit-appearance: none;
  border: 0;
  border-bottom: 1px solid #000;
  outline: 0;
  font-size: 16px;
  background: none;
  border-radius: 0;
  transition: all 0.15s ease;
  padding-top: 3px;
  font-weight: 200;
  margin-top: 2px;
`;
