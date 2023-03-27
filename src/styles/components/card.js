import styled from "styled-components";

// Create a styled component
const Card = styled.div`
	display: flex;
	position: relative;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: white;
	font-size: 1rem;
	padding: 3rem;
	border-radius: 1rem;
	background: #454545;
	box-shadow: 20px 20px 60px #3b3b3b, -20px -20px 60px #4f4f4f;
	margin: 5rem auto;
	min-width: 100%;
	max-height: 80vh;
`;

export default Card;
