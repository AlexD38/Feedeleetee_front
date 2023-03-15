import axios from "axios";
import { useEffect, useState } from "react";
import Greetings from "../../styles/components/Greetings.js";

import Logout from "../Logout/Logout.jsx";
import ClientsInfos from "./clientsInfos/clientsInfos.jsx";
import EnterpriseInfos from "./enterpriseInfos/enterpriseInfos.jsx";
import ServicesInfos from "./servicesInfos/servicesInfos.jsx";
import HorizontalWrapper from "../../styles/components/HorizontalWrapper.js";
import OffersInfos from "./offersInfos/OffersInfos.jsx";
import AppointmentsInfos from "./appointmentsInfos/appointmentsInfos.jsx";

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
			// console.log(response.data[0]);
			setMyEnterprise((myEnterprise) => response.data);
		}
		fetchDashboard();
	}, []);

	return (
		<HorizontalWrapper>
			<Greetings>My Dashboard</Greetings>
			<EnterpriseInfos />
			<ClientsInfos />
			<ServicesInfos />
			<OffersInfos />
			<AppointmentsInfos />
			<Logout />
		</HorizontalWrapper>
	);
}

export default EnterpriseDashboard;
