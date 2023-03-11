import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Link from "../../styles/components/Link";
import axios from "axios";
import CreateEnterprise from "../CreateEnterpriseFrom/CreateEnterpriseFrom.jsx";
import HorizontalWrapper from "../../styles/components/HorizontalWrapper.js";
import VerticalWrapper from "../../styles/components/verticalWrapper.js";
import Greetings from "../../styles/components/Greetings.js";

function Home() {
	// const [userName, setUserName] = useState("");
	const userName = localStorage.getItem("user");
	// const clientId = localStorage.getItem("clientId");
	const token = localStorage.getItem("token");
	const navigate = useNavigate();

	return (
		<VerticalWrapper>
			<>
				<Greetings>Hello {userName}</Greetings>

				<Link href="http://localhost:3000/myenterprise">
					Accéder à mon entreprise
				</Link>

				<Link href="http://localhost/myclientprofile">
					Accéder à mon profil client
				</Link>
			</>
		</VerticalWrapper>
	);
}

export default Home;
