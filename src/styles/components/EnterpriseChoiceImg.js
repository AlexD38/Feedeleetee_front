import styled from "styled-components";
import img from "../images/EnterpriseChoiceImg.jpg";
const EnterpriseChoiceImg = styled.img`
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
	max-height: 100%;
	transition: all 0.4s;
	&:hover {
		transform: scale(1.05);
		filter: brightness(80%);
		// filter: blur(5px);
	}
	@media (max-width: 1400px) {
		height: 100vh;
	}
`;

export default EnterpriseChoiceImg;
