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
		<>
			<h1>Hello {userName}</h1>
			{enterpriseId ? (
				<>
					<h2>J'ai déjà une entreprise</h2>
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
					<h2>J'ai déjà un profil client</h2>
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
	);
}

export default Home;
