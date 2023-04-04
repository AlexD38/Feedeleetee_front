import styled from "styled-components";

// Create a styled component
const HorizontalWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	gap: 4rem;
	flex-wrap: wrap;
	position: relative;
	align-items: flex-start;
	min-width: 100%;
`;

export default HorizontalWrapper;
