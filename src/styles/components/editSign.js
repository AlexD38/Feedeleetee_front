import styled from "styled-components";

// Create a styled component
const EditSign = styled.div`
	margin: 0;
	line-height: 0.7;
	font-size: 3rem;
	position: absolute;
	top: 1rem;
	right: 1rem;
	color: #eca869;
	transition: all 0.2s ease;
	&:hover {
		scale: 1.1;
		cursor: pointer;
		color: #eca869;
		transition: all 0.5s ease;
	}
`;

export default EditSign;
