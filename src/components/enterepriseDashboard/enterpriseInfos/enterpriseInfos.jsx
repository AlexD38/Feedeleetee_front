import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../../styles/components/card.js";
import Link from "../../../styles/components/LinkComp.js";
import CreateEnterprise from "../../CreateEnterpriseFrom/CreateEnterpriseFrom.jsx";

function EnterpriseInfos() {
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
			// console.log(response.data[0]);
			setMyEnterprise((myEnterprise) => response.data[0]);
		}
		fetchDashboard();
	}, [token]);

	return (
		<>
			{myEnterprise ? (
				<>
					<div className="card">
						<h1>My enterprise :</h1>
						<h3>{myEnterprise.name}</h3>
						<h3>{myEnterprise.address}</h3>
						{myEnterprise.logo ? (
							<img alt="logo" src={myEnterprise.logo} />
						) : (
							<></>
						)}
						<h3>{myEnterprise.description}</h3>{" "}
					</div>
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

export default EnterpriseInfos;
