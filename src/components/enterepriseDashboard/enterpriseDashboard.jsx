import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../Logout/Logout.jsx";
import ClientsInfos from "./clientsInfos/clientsInfos.jsx";
import ServicesInfos from "./servicesInfos/servicesInfos.jsx";
import OffersInfos from "./offersInfos/OffersInfos.jsx";
import AppointmentsInfos from "./appointmentsInfos/appointmentsInfos.jsx";
import QuickView from "./QuickView/QuickView.jsx";
import "../enterepriseDashboard/index.css";
import MyEnterprise from "./myEnterprise/MyEnterprise.jsx";

function EnterpriseDashboard() {
	const [myEnterprise, setMyEnterprise] = useState("");
	const token = localStorage.getItem("token");
	const navigate = useNavigate();
	const [currentComponent, setCurrentComponent] =
		useState("Coup d'oeil rapide");
	const [modal, setModal] = useState(false);

	useEffect(() => {
		async function fetchDashboard() {
			const headers = {
				token: token,
			};
			try {
				const response = await axios.get(
					"http://localhost:3000/enterprise/",
					{
						headers,
					}
				);
				if (response.data[0]) {
					setMyEnterprise(response.data[0]);
					console.log(response.data[0]);
					// localStorage.setItem("enterpriseId", response.data[0].id);
				} else if (!response) {
					navigate("/createmyenterprise");
				}
			} catch (error) {
				console.log(error);
				navigate("/");
			}
		}
		fetchDashboard();
		console.log(myEnterprise);
	}, []);

	const handleClick = (componentName) => {
		setCurrentComponent(componentName);
		showNav();
	};
	const updateEnterprise = (name, address, description) => {
		myEnterprise.name = name;
		myEnterprise.address = address;
		myEnterprise.description = description;
		console.log(name, address, description);
	};
	const showNav = () => {
		const nav = document.querySelector("#nav");
		nav.classList.contains("nav-show")
			? nav.classList.remove("nav-show")
			: nav.classList.add("nav-show");
	};

	return (
		<>
			{myEnterprise.name && (
				<>
					<nav>
						<img
							className="logo"
							src={`data:image/png;base64,${myEnterprise.logo}`}
							alt="logo"
						/>

						<h1 className="enterprise-name">
							<span>{myEnterprise.name}</span>
						</h1>
						<ul id="nav">
							<div onClick={showNav} className="ham-container">
								<div className="ham-top"></div>
								<div className="ham-mid"></div>
								<div className="ham-bottom"></div>
							</div>
							<li
								onClick={(e) =>
									handleClick(e.target.textContent)
								}>
								Coup d'oeil rapide
							</li>
							<li
								onClick={(e) =>
									handleClick(e.target.textContent)
								}>
								Appointments
							</li>
							<li
								onClick={(e) =>
									handleClick(e.target.textContent)
								}>
								Clients
							</li>
							<li
								onClick={(e) =>
									handleClick(e.target.textContent)
								}>
								Offers
							</li>
							<li
								onClick={(e) =>
									handleClick(e.target.textContent)
								}>
								Services
							</li>{" "}
							<li
								onClick={(e) =>
									handleClick(e.target.textContent)
								}>
								Mon entreprise
							</li>{" "}
						</ul>

						<Logout linkTo="home" />
					</nav>
					{currentComponent === "Appointments" && (
						<AppointmentsInfos enterprise={myEnterprise} />
					)}
					{currentComponent === "Clients" && (
						<ClientsInfos enterprise={myEnterprise} />
					)}
					{currentComponent === "Offers" && (
						<OffersInfos enterprise={myEnterprise} />
					)}
					{currentComponent === "Services" && (
						<ServicesInfos enterprise={myEnterprise} />
					)}
					{currentComponent === "Coup d'oeil rapide" && (
						<QuickView enterprise={myEnterprise} />
					)}
					{currentComponent === "Mon entreprise" && (
						<MyEnterprise
							enterprise={myEnterprise}
							onUpdate={updateEnterprise}
						/>
					)}
				</>
			)}
		</>
	);
}

export default EnterpriseDashboard;
