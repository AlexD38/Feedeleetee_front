import styled from "styled-components";
import Greetings from "./Greetings";

// Create a styled component
const EnterpriseDesc = styled(Greetings)`
	color: #eca869;
	font-size: 1.5rem;
	font-weight: bold;
	position: absolute;
	max-width: fit-content;
	left: auto;
	right: 8rem;
	margin: 0;
`;

export default EnterpriseDesc;
