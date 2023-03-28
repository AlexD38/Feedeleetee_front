import styled from "styled-components";

// Create a styled component
const Modal = styled.div`
	position: fixed;
	z-index: 999;
	border-radius: 0.5rem;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	// box-shadow: 0 0 10rem 5rem black;
	backdrop-filter: blur(10px) brightness(0.6);
	width: 100%;
	max-width: 100%;
	height: 100%;
	max-height: 100%;
	padding: 30rem;
`;

export default Modal;
