import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../../styles/components/card.js";

function ClientsInfos() {
	const [myClients, setMyClients] = useState("");
	const token = localStorage.getItem("token");

	useEffect(() => {
		async function fetchClients() {
			const headers = {
				token: token,
			};
			const response = await axios.get(
				`http://localhost:4000/enterprises/clients`,
				{ headers }
			);
			setMyClients((myClients) => response.data);
			// console.log(response.data);
		}
		fetchClients();
	}, [token]);

	return (
		<>
			{myClients ? (
				<Card>
					<h1>My Clients List</h1>
					{myClients.map((clientInformation) => (
						<div key={clientInformation.id}>
							<p>
								{clientInformation.firstname}{" "}
								{clientInformation.lastname}
							</p>
							<p>{clientInformation.tel}</p>
							<p>{clientInformation.mail}</p>
						</div>
					))}
				</Card>
			) : (
				<Card>
					<h1>No clients yet ...</h1>
				</Card>
			)}
		</>
	);
}

export default ClientsInfos;
