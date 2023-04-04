import styled from "styled-components";
import Card from "./card";

// Create a styled component
const InteractiveCard = styled(Card)`
	&:hover {
		transform: scale(0.97);
		transition: all 0.1s ease;
		cursor: pointer;
	}
`;

export default InteractiveCard;
