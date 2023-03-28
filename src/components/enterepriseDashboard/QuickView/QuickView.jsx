import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Button from "../../../styles/components/Button.js";
import Card from "../../../styles/components/card.js";
import VerticalWrapper from "../../../styles/components/verticalWrapper.js";
import EditSign from "../../editSign/EditSign.jsx";
import { motion } from "framer-motion";
import Input from "../../../styles/components/input.js";
import Greetings from "../../../styles/components/Greetings.js";
import AppointmentsInfos from "../appointmentsInfos/appointmentsInfos.jsx";
import ClientsInfos from "../clientsInfos/clientsInfos.jsx";
import OffersInfos from "../offersInfos/OffersInfos.jsx";
import ServicesInfos from "../servicesInfos/servicesInfos.jsx";
import HorizontalWrapper from "../../../styles/components/HorizontalWrapper.js";
import Form from "../../../styles/components/form.js";

function QuickView() {
	const token = localStorage.getItem("token");
	const [enterpriseId, setEnterpriseId] = useState(
		localStorage.getItem("enterpriseId")
	);
	const [numberOfAppointments, setNumberOfAppointments] = useState(
		localStorage.getItem("NumberOfAppointments")
	);
	console.log(numberOfAppointments);

	return (
		<>
			<HorizontalWrapper
				style={{
					display: "none",
				}}>
				<AppointmentsInfos />
			</HorizontalWrapper>
			<h1>Number of planned Appointments : {numberOfAppointments}</h1>
			<h1>Number of Clients : {numberOfAppointments}</h1>
		</>
	);
}

export default QuickView;
