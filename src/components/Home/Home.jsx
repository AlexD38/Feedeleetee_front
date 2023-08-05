import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Link from "../../styles/components/LinkComp";
import HorizontalWrapper from "../../styles/components/HorizontalWrapper.js";
import Greetings from "../../styles/components/Greetings.js";
import Logout from "../Logout/Logout";
import EnterpriseChoiceImg from "../../styles/components/EnterpriseChoiceImg.js";
import EnterpriseImg from "../../styles/images/EnterpriseChoiceImg.jpg";
import ClientImg from "../../styles/images/client.jpg";
import "../Home/index.css";

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
		<div className="home-container">
			<Greetings style={{ position: "absolute", top: "0rem" }}>
				Bonjour <span>{userName}</span>
			</Greetings>
			<Link href="http://localhost:3000/myenterprise">
				<div
					style={{
						height: "20rem",
						position: "relative",
						width: "30rem",
						overflow: "hidden",
					}}>
					<span
						style={{
							position: "absolute",
							zIndex: "3",
							top: "0",
							left: ".5rem",
							fontSize: "3rem",
							textAlign: "left",
							textShadow: "0px 0px 10px black",
						}}>
						Accéder à mon entreprise
					</span>
					<EnterpriseChoiceImg src={EnterpriseImg} />
				</div>
			</Link>
			<Link href="http://localhost:3000/myclientprofile">
				<div
					style={{
						height: "20rem",
						position: "relative",
						width: "30rem",
						overflow: "hidden",
					}}>
					<span
						style={{
							position: "absolute",
							zIndex: "3",
							bottom: "0",
							right: ".5rem",
							fontSize: "3rem",
							textAlign: "right",
							textShadow: "0px 0px 10px black",
						}}>
						Accéder à mon espace client
					</span>
					<EnterpriseChoiceImg src={ClientImg} />
				</div>
			</Link>

			<Logout linkTo="" />
		</div>
	) : (
		<>
			<h1>nothing to see here...</h1>
		</>
	);
}

export default Home;
