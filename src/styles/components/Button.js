import styled from "styled-components";

// Create a styled component
const Button = styled.button`
	background-color: grey;
	text-shadow: 0 0 30px black;
	color: white;
	font-size: 1rem;
	font-weight: bold;
	padding: 0.5rem 1rem;
	border-radius: 1rem;
	border: none;
	transition: all 0.3s ease;
	&:hover {
		cursor: pointer;
		color: #eca869;
		transition: all 0.2s ease;
	}
`;

export default Button;
