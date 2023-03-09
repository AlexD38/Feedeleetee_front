import styled from "styled-components";

// Create a styled component
const Link = styled.a`
	color: white;
	text-decoration: none;
	font-weight: bolder;
	transition: all 0.3s ease;
	&:hover {
		color: #eca869;
		transition: all 0.2s ease;
	}
`;

export default Link;
