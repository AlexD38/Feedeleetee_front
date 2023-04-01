import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../styles/components/card";
import Logo from "../styles/components/Logo.js";

export function ClientDashboard() {
	const [enterprises, setEnterprises] = useState([]);
	useEffect(() => {
		const fetchEnterprises = async () => {
			const response = await axios.get(
				"http://localhost:4000/enterprises/"
			);
			if (response.status === 200) {
				console.log(response.data.enterprises);
				setEnterprises((enterprises) => response.data.enterprises);
			}
		};
		fetchEnterprises();
	}, []);
	return (
		<>
			<h1>Hello welcome to your client dashboard</h1>
			{enterprises ? (
				<h1>
					{" "}
					{enterprises.map((enterprise) => (
						<Card>
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
						</Card>
					))}
				</h1>
			) : (
				<></>
			)}
		</>
	);
}
