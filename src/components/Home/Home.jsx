import React, { useEffect, useState } from "react";
import Button from "../../styles/components/Button.js";
import Form from "../../styles/components/form.js";
import Input from "../../styles/components/input.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Link from "../../styles/components/Link";

import qs from "qs";
import CreateEnterprise from "../CreateEnterpriseFrom/CreateEnterpriseFrom.jsx";
import HorizontalWrapper from "../../styles/components/HorizontalWrapper.js";
import verticalWrapper from "../../styles/components/verticalWrapper.js";
import Greetings from "../../styles/components/Greetings.js";

function Home() {
	const userName = localStorage.getItem("user");
	const enterpriseId = localStorage.getItem("enterpriseId");
	const clientId = localStorage.getItem("clientId");
	const navigate = useNavigate();
	useEffect(() => {
		if (!userName) {
			navigate("/login");
			alert("Please login first");
		}
		return () => {};
	}, []);

	return (
		<verticalWrapper>
			<>
				<Greetings>Hello {userName}</Greetings>
				{enterpriseId ? (
					<>
						{" "}
						<Link href="http://localhost/myenterprise">
							Accéder à mon entreprise
						</Link>
					</>
				) : (
					<>
						<HorizontalWrapper>
							<CreateEnterprise />
							{/* <CreateClient /> */}
						</HorizontalWrapper>
					</>
				)}
				{clientId ? (
					<>
						<Link href="http://localhost/myclientprofile">
							Accéder à mon profil client
						</Link>
					</>
				) : (
					<>
						<HorizontalWrapper>
							<CreateEnterprise />
							{/* <CreateClient /> */}
						</HorizontalWrapper>
					</>
				)}
			</>
		</verticalWrapper>
	);
}

export default Home;
