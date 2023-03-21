import styled from "styled-components";

// Create a styled component
const EditSign = styled.svg`
	margin: 0 auto;
	width: 50px;
	height: 50px;
	position: absolute;
	top: 1rem;
	right: 1rem;
	transition: all 0.2s ease;
	&:hover {
		cursor: pointer;
		color: #eca869;
		transition: all 0.2s ease;
	}
`;

export default EditSign;
