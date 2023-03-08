import styled from "styled-components";

// Create a styled component
const Button = styled.button`
  background-color: gainsboro;
  color: black;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  border: none;
  margin: 2rem 0 0.5rem 0;
  transition: all 0.3s ease;
  &:hover {
    background-color: white;
    transition: all 0.2s ease;
  }
`;

export default Button;
