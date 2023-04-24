import styled from "styled-components";

// Create a styled component
const Input = styled.input`
	border-radius: .3rem;
	// color : #eca869;
	padding: .8rem 8rem;
	margin: 1rem 0;
	margin-bottom: 2.2rem;
	border: none;
	font-size: 1rem;
	text-align: left;
	background-color: grey;
	transition: all 0.3s ease;
	cursor: pointer;
	max-width: fit-content;
  text-align: center;
  padding: .5rem
	&:focus {
		background-color: GhostWhite;
		transition: all 0.3s ease;
	}
	@media (max-width: 1250px) {
		width: 100%;
	}
`;

export default Input;
