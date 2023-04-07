import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Greetings from "../styles/components/Greetings";
import InteractiveCard from "../styles/components/interactiveCard";
import moment from "moment";
import "moment/locale/fr";
import Input from "../styles/components/input";
import SideBar from "../styles/layout/sideBar.js";
import VerticalWrapper from "../styles/components/verticalWrapper.js";
import CreateClient from "../components/CreateClientForm/CreateClient.jsx";
import { TakeAppointment } from "../components/TakeAppointment.jsx";
import LinkComp from "../styles/components/LinkComp";
import Logo from "../styles/components/Logo.js";
import Button from "../styles/components/Button";
import HorizontalWrapper from "../styles/components/HorizontalWrapper";
export function ClientDashboard() {
	const token = localStorage.getItem("token");
	const [user, setUser] = useState(localStorage.getItem("user"));
	const [client, setClient] = useState([]);
	const [enterprises, setEnterprises] = useState([]);
	const [availableAppointments, setAvailableAppointments] = useState(false);
	const Navigate = useNavigate();
	const inputRef = useRef(null);
	const [clientId, setClientId] = useState(localStorage.getItem("clientId"));
	const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
	const [selectedEnterpriseId, setSelectedEnterpriseId] = useState(null);

	useEffect(() => {
		async function fetchClient() {
			const headers = {
				token: token,
				clientId: +clientId,
			};
			console.log(headers);
			try {
				const response = await axios.get(
					`http://localhost:4000/clients`,
					{
						headers,
					}
				);
				console.log(response.status);
				if (response.status === 200) {
					console.log(response.data[0]);
					setClient((client) => response.data[0]);
					setClientId((clientId) => response.data[0].id);
				} else if (clientId) {
					localStorage.removeItem("clientId");
				} else {
					Navigate(`/createclient`);
				}
			} catch (error) {
				console.log(error);
			}
		}
		fetchClient();
		setDate(client.rdv);
	}, []);
	const handleClick = (e) => {
		const fetchEnterprise = async () => {
			const headers = {
				token: token,
			};
			try {
				const response = await axios.get(
					"http://localhost:4000/enterprises",
					{ headers }
				);
				// console.log(response.data.enterprises);
				setEnterprises((enterprise) => response.data.enterprises);
			} catch (error) {
				console.log(error);
			}
		};
		fetchEnterprise();

		setEnterprises([]);
	};
	const showAppointments = (e, entId) => {
		setSelectedEnterpriseId((id) => entId);
		console.log(selectedEnterpriseId);
	};
	// console.log(enterprises);

	return (
		<>
			{" "}
			{client ? (
				<>
					<Greetings>Bonjour {client.firstname}, </Greetings>
					<h1>Bienvenue sur votre espace client.</h1>

					<>
						{client.rdv && client.rdv.length > 0 ? (
							<ul>
								{" "}
								<h3>Voici vos prochains rendez-vous :</h3>
								{client.rdv.map((rdv, index) => (
									<li key={index}>
										{moment(rdv)
											.locale("fr")
											.format("dddd DD/MM/YYYY")}
									</li>
								))}
							</ul>
						) : (
							<p>Aucun rendez-vous pour le moment</p>
						)}
					</>
					<Button onClick={handleClick}>
						Prenez votre prochain rdv
					</Button>
					{enterprises && (
						<>
							{enterprises.map((enterprise) => (
								<LinkComp
									onClick={(e) =>
										showAppointments(e, enterprise.id)
									}>
									{" "}
									{enterprise.name}
									<VerticalWrapper>
										<img
											style={{
												maxHeight: "3rem",
												borderRadius: "50%",
												aspectRatio: "1 / 1",
												objectFit: "cover",
												margin: "1rem 0 2.5rem",
											}}
											src={`data:image/png;base64,${enterprise.logo}`}></img>
									</VerticalWrapper>
								</LinkComp>
							))}
							{selectedEnterpriseId && (
								<TakeAppointment id={selectedEnterpriseId} />
							)}
						</>
					)}
				</>
			) : (
				<>
					<CreateClient />
				</>
			)}
		</>
	);
}
