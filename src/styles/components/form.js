import styled from "styled-components";

// Create a styled component
const Form = styled.form`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: flex-start;
	background-color: none;
	color: white;
	max-width: 100%;
	padding: 1rem 4rem;
	border-radius: 50px;
	// background: #454545;
	box-shadow: 20px 20px 60px #3b3b3b, -20px -20px 60px #4f4f4f;
	@media (max-width: 600px) {
		max-width: 100%;
		box-shadow: none;
		padding: 0.5rem;
	}
`;

export default Form;
