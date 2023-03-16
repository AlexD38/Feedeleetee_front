import styled from "styled-components";

// Create a styled component
const SideBar = styled.aside`
	background-color: grey;
	text-shadow: 0 0 30px black;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	color: white;
	font-size: 1rem;
	font-weight: bold;
	padding: 0.5rem 1rem;
	position: fixed;
	min-height: 100dvh;
	min-width: 2dvw;
	left: 0;
	top: 0;
	transition: all 0.3s ease;
	&:hover {
		cursor: pointer;
		min-width: 10dvw;
		transition: all 0.5s ease-in-out;
	}
`;

export default SideBar;
