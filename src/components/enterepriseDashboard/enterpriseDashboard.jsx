import axios from "axios";
import { useEffect, useState } from "react";
import Greetings from "../../styles/components/Greetings.js";
import Link from "../../styles/components/Link.js";
import CreateEnterprise from "../CreateEnterpriseFrom/CreateEnterpriseFrom.jsx";
import Logout from "../Logout/Logout.jsx";

function EnterpriseDashboard() {
	const [myEnterprise, setMyEnterprise] = useState("");
	const token = localStorage.getItem("token");

	useEffect(() => {
		async function fetchDashboard() {
			const headers = {
				token: token,
			};
			const response = await axios.get(
				`http://localhost:4000/enterprise/`,
				{ headers }
			);
			console.log(response.data[0]);
			setMyEnterprise((myEnterprise) => response.data[0]);
		}
		fetchDashboard();
	}, []);

	return (
		<>
			<Greetings>My Dashboard</Greetings>
			<Logout />
			{myEnterprise ? (
				<>
					<h3>{myEnterprise.name}</h3>
					<h3>{myEnterprise.address}</h3>
					<h3>{myEnterprise.logo}</h3>
					<h3>{myEnterprise.description}</h3>
					<Link>supprimer mon entreprise</Link>
					{/* <EnterpriseInfos /> */}
				</>
			) : (
				<>
					<h1>You need to create one first...</h1>
					<CreateEnterprise />
				</>
			)}
		</>
	);
}

export default EnterpriseDashboard;
