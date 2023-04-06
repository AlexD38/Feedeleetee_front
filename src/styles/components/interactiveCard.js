import styled from "styled-components";
import Card from "./card";

// Create a styled component
const InteractiveCard = styled(Card)`
  position: relative;
  min-height: 15rem;
  max-height: fit content;
  min-width: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  &:hover {
    transform: scale(0.97);
    transition: all 0.1s ease;
    cursor: pointer;
  }
`;

export default InteractiveCard;
