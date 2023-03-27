import styled from "styled-components";

// Create a styled component
const Greetings = styled.h1`
	color: #eca869;
	font-size: ${(props) => props.size || "3rem"};
	font-weight: bold;
	position: relative;
	margin: 3rem 0;
`;

export default Greetings;
