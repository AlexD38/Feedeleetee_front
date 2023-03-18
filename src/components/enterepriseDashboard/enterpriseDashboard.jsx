import axios from "axios";
import { useEffect, useState } from "react";
import Greetings from "../../styles/components/Greetings.js";
import { useNavigate } from "react-router-dom";
import Logout from "../Logout/Logout.jsx";
import ClientsInfos from "./clientsInfos/clientsInfos.jsx";
import EnterpriseInfos from "./enterpriseInfos/enterpriseInfos.jsx";
import ServicesInfos from "./servicesInfos/servicesInfos.jsx";
import HorizontalWrapper from "../../styles/components/HorizontalWrapper.js";
import VerticalWrapper from "../../styles/components/verticalWrapper.js";
import OffersInfos from "./offersInfos/OffersInfos.jsx";
import AppointmentsInfos from "./appointmentsInfos/appointmentsInfos.jsx";
import LinkComp from "../../styles/components/LinkComp.js";
import SideBar from "../../styles/layout/sideBar.js";
import Logo from "../../styles/components/Logo.js";
import Header from "../../styles/layout/header.js";
import EnterpriseDesc from "../../styles/components/enterpriseDesc.js";
import Navbar from "../../styles/components/navbar.js";

function EnterpriseDashboard() {
	const [myEnterprise, setMyEnterprise] = useState("");
	const token = localStorage.getItem("token");
	const navigate = useNavigate();
	const [currentComponent, setCurrentComponent] = useState("Appointments");
	const [coloredNavlink, setColoredNavlink] = useState("white");

	useEffect(() => {
		async function fetchDashboard() {
			const headers = {
				token: token,
			};
			const response = await axios.get(
				"http://localhost:4000/enterprise/",
				{ headers }
			);
			if (response.data[0]) {
				setMyEnterprise(response.data[0]);
			} else {
				navigate("/createenterprise");
			}
		}
		fetchDashboard();
	}, [navigate, token]);
	const handleClick = (componentName) => {
		setColoredNavlink("white");
		setCurrentComponent(componentName);
		console.log(currentComponent);
	};

	return (
		<>
			{" "}
			{myEnterprise.name ? (
				<>
					<Header>
						<Greetings>{myEnterprise.name}</Greetings>
						<EnterpriseDesc>
							{myEnterprise.description}
						</EnterpriseDesc>
					</Header>
					<SideBar>
						<Navbar>
							<LinkComp
								onClick={(e) =>
									handleClick(e.target.textContent)
								}
								style={{
									color:
										currentComponent === "Appointments"
											? "#eca869"
											: "white",
								}}>
								Appointments
							</LinkComp>
							<LinkComp
								onClick={(e) =>
									handleClick(e.target.textContent)
								}
								style={{
									color:
										currentComponent === "Clients"
											? "#eca869"
											: "white",
								}}>
								Clients
							</LinkComp>
							<LinkComp
								onClick={(e) =>
									handleClick(e.target.textContent)
								}
								style={{
									color:
										currentComponent === "Offers"
											? "#eca869"
											: "white",
								}}>
								Offers
							</LinkComp>
							<LinkComp
								onClick={(e) =>
									handleClick(e.target.textContent)
								}
								style={{
									color:
										currentComponent === "Offers"
											? "#eca869"
											: "white",
								}}>
								Services
							</LinkComp>
						</Navbar>
						<Logo src={myEnterprise.logo} alt="logo" />
						<Logout />
					</SideBar>
					{currentComponent === "Appointments" && (
						<AppointmentsInfos />
					)}
					{currentComponent === "Clients" && <ClientsInfos />}
					{currentComponent === "Offers" && <OffersInfos />}
					{currentComponent === "Services" && <ServicesInfos />}
				</>
			) : (
				<>
					<LinkComp href="/createenterprise">
						You must create one first...
					</LinkComp>
				</>
			)}
		</>
	);
}

export default EnterpriseDashboard;
