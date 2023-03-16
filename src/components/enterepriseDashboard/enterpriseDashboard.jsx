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
import Trashcan from "../trashcan/Trashcan.jsx";
import AddSign from "../addSign/AddSign.jsx";
import CheckSign from "../checkSign/CheckSign.jsx";
import EditSign from "../editSign/EditSign.jsx";
import SideBar from "../../styles/layout/sideBar.js";
import Logo from "../../styles/components/Logo.js";

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
			setMyEnterprise((myEnterprise) => response.data[0]);
		}
		fetchDashboard();
	}, []);

	return (
		<HorizontalWrapper>
			<Greetings>{myEnterprise.name}</Greetings>
			<SideBar>
				<Logo src={myEnterprise.logo} alt="logo" />
				<Logout />
			</SideBar>
			<EnterpriseInfos />
			<ServicesInfos />
			<OffersInfos />
			<AppointmentsInfos />
			<ClientsInfos />
		</HorizontalWrapper>
	);
}

export default EnterpriseDashboard;
