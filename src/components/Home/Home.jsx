import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Link from "../../styles/components/LinkComp";

import VerticalWrapper from "../../styles/components/verticalWrapper.js";
import Greetings from "../../styles/components/Greetings.js";
import Logout from "../Logout/Logout";
import HorizontalWrapper from "../../styles/components/HorizontalWrapper";
import Card from "../../styles/components/card";

function Home() {
	const userName = localStorage.getItem("user");
	const [token, setToken] = useState(localStorage.getItem("token"));
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			alert("please login first");
			navigate("/login");
		}
	}, [token]);

	return userName ? (
		<>
			<VerticalWrapper>
				<Greetings>Hello {userName}</Greetings>
				<Card>
					<Link href="http://localhost:3000/myenterprise">
						Accéder à mon entreprise
					</Link>
				</Card>
				<Card>
					<Link href="http://localhost/myclientprofile">
						Accéder à mon profil client
					</Link>
				</Card>
				<Logout />
			</VerticalWrapper>
		</>
	) : (
		<>
			<h1>nothing to see here...</h1>
		</>
	);
}

export default Home;
