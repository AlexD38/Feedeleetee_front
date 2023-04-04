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
	padding: 2rem 4rem;
	border-radius: 1rem;
	background: #454545;
	box-shadow: 20px 20px 60px #3b3b3b, -20px -20px 60px #4f4f4f;
	margin: 3rem auto;
	min-width: fit-content;
	max-height: 80vh;
	transition: all 0.1s ease-in-out;
`;

export default Card;
