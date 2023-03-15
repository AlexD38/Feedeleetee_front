import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../../styles/components/card.js";

function ServicesInfos() {
	const [myServices, setMyServices] = useState("");
	const token = localStorage.getItem("token");

	useEffect(() => {
		async function fetchServices() {
			const headers = {
				token: token,
			};
			const response = await axios.get(
				`http://localhost:4000/enterprises/services`,
				{ headers }
			);
			const services = response.data[0].entreprise_et_services.services;
			if (services) {
				setMyServices(
					(myServices) =>
						response.data[0].entreprise_et_services.services
				);
			}
			console.log(response.data);
		}
		fetchServices();
	}, [token]);

	return (
		<>
			{myServices ? (
				<Card>
					<h1>My services</h1>
					{myServices.map((serviceInformation) => (
						<div key={serviceInformation.id}>
							<p>
								{serviceInformation.description} :{" "}
								{serviceInformation.price} €
							</p>
						</div>
					))}
				</Card>
			) : (
				<Card>
					<h1>No services yet...</h1>
				</Card>
			)}
		</>
	);
}

export default ServicesInfos;
