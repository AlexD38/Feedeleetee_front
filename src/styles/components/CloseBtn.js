import styled from "styled-components";
import Button from "./Button";

// Create a styled component
const CloseButton = styled(Button)`
	background-color: transparent;
	text-shadow: 0 0 30px black;
	color: #eca869;
	margin-right: 35rem;
	font-size: 3rem;
	font-weight: bold;
	padding: 1rem 1.7rem;
	border-radius: 100%;
	border: none;
	transition: all 0.3s ease;
	position: relative;
	rotate: 45deg;
	top: 0;
	&:hover {
		rotate: 405deg;
		scale: 1.1;
		cursor: pointer;
		color: #eca869;
		transition: all 0.2s ease;
	}
`;

export default CloseButton;
