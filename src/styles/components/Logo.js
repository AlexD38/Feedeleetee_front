import styled from "styled-components";

// Create a styled component
const Logo = styled.img`
	position: absolute;
	top: 2rem;
	border-radius: 100%;
	height: 7rem;
	width: 7rem;
	margin: 0.1rem;
	object-fit: cover;
	transition: all 0.1s ease;
	&:hover {
		cursor: pointer;
		filter: brightness(0.7);
		// filter: blur(1px);
		transition: all 0.1s ease;
	}
`;

export default Logo;
