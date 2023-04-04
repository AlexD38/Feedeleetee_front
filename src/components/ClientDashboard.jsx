import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../styles/components/card";
import HorizontalWrapper from "../styles/components/HorizontalWrapper";
import InteractiveCard from "../styles/components/interactiveCard";
import Logo from "../styles/components/Logo.js";
import AppointmentsInfos from "./enterepriseDashboard/appointmentsInfos/appointmentsInfos";
import Modal from "./Modal/Modal";

export function ClientDashboard() {
	const token = localStorage.getItem("token");
	const Navigate = useNavigate();
	const [enterprises, setEnterprises] = useState([]);
	const [showAppointmens, setshowAppointments] = useState(false);
	const [availableAppointments, setAvailableAppointments] = useState([]);
	const [clientId, setClientId] = useState(localStorage.getItem("clientId"));
	useEffect(() => {
		async function fetchEnterprises() {
			const headers = {
				token: token,
				clientId: +clientId,
			};
			console.log(headers);
			try {
				const response = await axios.get(
					`http://localhost:4000/clients`,
					{ headers }
				);
				console.log(response.status);
				if (response.status === 200) {
					console.log(response.data[0]);
				} else if (clientId) {
					localStorage.removeItem("clientId");
				} else {
					Navigate(`/createclient`);
				}
			} catch (error) {
				console.log(error);
			}
		}
		fetchEnterprises();
	}, []);
	const handleclick = async (e) => {
		if (!e.target.id) {
			console.log("no target id");
			return;
		}
		localStorage.setItem("enterpriseId", e.target.id);
		const enterpriseId = localStorage.getItem("enterpriseId");
		if (!enterpriseId) {
			console.log("no id found");
			return;
		}
		Navigate("/takeAppointment");
	};
	return (
		<>
			<h1>Hello welcome to your client dashboard</h1>
			<HorizontalWrapper>
				{enterprises ? (
					<HorizontalWrapper>
						{" "}
						{enterprises.map((enterprise) => (
							<InteractiveCard
								onClick={handleclick}
								id={enterprise.id}
								style={{ cursor: "pointer" }}>
								<>
									{enterprise.logo && (
										<Logo
											style={{
												position: "relative",
												marginBottom: "3rem",
											}}
											src={`data:image/png;base64,${enterprise.logo}`}></Logo>
									)}
									<h1>{enterprise.name}</h1>
									<h4>{enterprise.description}</h4>
								</>
							</InteractiveCard>
						))}
					</HorizontalWrapper>
				) : (
					<></>
				)}
			</HorizontalWrapper>
		</>
	);
}
