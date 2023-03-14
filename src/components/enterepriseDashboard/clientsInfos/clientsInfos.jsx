import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../../styles/components/card.js";
import CreateEnterprise from "../../CreateEnterpriseFrom/CreateEnterpriseFrom.jsx";

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
			console.log(response.data[0]);
			setMyClients((myClients) => response.data[0]);
		}
		fetchClients();
	}, [token]);

	return (
		<>
			{" "}
			<Card>
				<p>{myClients.firstname}</p>
				<p>{myClients.lastname}</p>
				<p>{myClients.tel}</p>
				<p>{myClients.mail}</p>
			</Card>
		</>
	);
}

export default ClientsInfos;
