import styled from "styled-components";

// Create a styled component
const Button = styled.button`
  background-color: grey;
  text-shadow: 0 0 30px black;
  color: white;
  margin: 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 7rem;
  border: none;
  min-width: 7rem;
  transition: all 0.3s ease;
  padding: 1rem;
  &:hover {
    scale: 1.1;
    cursor: pointer;
    background-color: #eca869;
    transition: all 0.2s ease;
  }
`;

export default Button;
