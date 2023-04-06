import styled from "styled-components";
import Card from "./card";

// Create a styled component
const InteractiveCard = styled(Card)`
	position: relative;
	height: 15rem;
	width: 15rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	&:hover {
		transform: scale(0.97);
		transition: all 0.1s ease;
		cursor: pointer;
	}
`;

export default InteractiveCard;
