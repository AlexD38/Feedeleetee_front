import styled from "styled-components";

// Create a styled component
const Input = styled.input`
  border-radius: 1rem;
  padding: 0.2 rem;
  margin: 1rem;
  border: none;
  text-aling: center;
  font-size: 1rem;
  background-color: grey;
  transition: all 0.3s ease;
  &:focus {
    background-color: GhostWhite;
    transition: all 0.3s ease;
  }
`;

export default Input;
