import styled from "styled-components";

// Create a styled component
const Header = styled.header`
	background-color: grey;
	padding: 1.5rem;
	text-shadow: 0 0 30px black;
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	color: white;
	font-size: 1rem;
	font-weight: bold;
	height: 10dvh;
	min-width: 100dvw;
	left: 0;
	right: 0;
	top: 0;
`;

export default Header;
