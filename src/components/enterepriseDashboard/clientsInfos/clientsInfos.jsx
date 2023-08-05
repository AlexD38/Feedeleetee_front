import axios from "axios";
import { useEffect, useState } from "react";
import SingleCLient from "./singleClient.jsx";

import "../clientsInfos/index.css";

function ClientsInfos(props) {
	const [myClients, setMyClients] = useState("");
	const token = localStorage.getItem("token");
	const [showCredentials, setShowCredentials] = useState(false);
	const enterpriseId = props.enterprise.id;

	useEffect(() => {
		async function fetchClients() {
			const headers = {
				token,
				enterpriseId,
			};
			const response = await axios.get(
				`http://localhost:3000/enterprises/clients`,
				{ headers }
			);
			setMyClients((myClients) => response.data);
		}
		fetchClients();
	}, [token]);

	return (
		<>
			{myClients ? (
				<div className="card">
					<h3>Mes Clients</h3>

					{myClients.map((clientInformation) => (
						<ul
							className="clients-infos"
							key={clientInformation.id}>
							<li key={clientInformation.id}>
								<SingleCLient
									className="single-client"
									client={clientInformation}
								/>
							</li>
						</ul>
					))}
				</div>
			) : (
				<div className="card">
					<h1>No clients yet ...</h1>
				</div>
			)}
		</>
	);
}

export default ClientsInfos;
