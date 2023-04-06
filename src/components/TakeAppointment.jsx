import { useEffect, useState } from "react";
import axios from "axios";
import InteractiveCard from "../styles/components/interactiveCard";
import Button from "../styles/components/Button";
import HorizontalWrapper from "../styles/components/HorizontalWrapper";
import moment from "moment";
import "moment/locale/fr";
import CloseBtn from "../styles/components/CloseBtn.js";

export function TakeAppointment(props) {
	const token = localStorage.getItem("token");
	let enterpriseId = localStorage.getItem("enterpriseId") || props.id;

	const [availableAppointments, setAvailableAppointments] = useState([]);
	const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
	const [clientId, setClientId] = useState(props.clientId);

	useEffect(() => {
		async function fetchAvailableAppointmentsFromEnterprise() {
			const headers = {
				token: token,
			};
			try {
				const response = await axios.get(
					`http://localhost:4000/enterprises/${enterpriseId}/appointments`,
					{ headers }
				);
				console.log(response.data);
				setAvailableAppointments(response.data);
			} catch (error) {
				console.error(error);
				// handle error
			}
		}
		fetchAvailableAppointmentsFromEnterprise();
	}, []);

	const handleClick = (appointmentId) => {
		console.log(`would you like to take appointment id#${appointmentId}?`);
		setSelectedAppointmentId(appointmentId);
	};

	const handleConfirm = () => {
		console.log(`confirming appointment id#${selectedAppointmentId}`);
		const InsertClientIntoAppointment = async () => {
			try {
				const headers = {
					token: token,
				};
				const response = await axios.patch(
					`http://localhost:4000/appointments/${selectedAppointmentId}`,
					{},
					{ headers }
				);
				setSelectedAppointmentId(null);
				console.log(response);
			} catch (error) {
				console.error(error);
				// handle error
			}
		};
		InsertClientIntoAppointment();
		window.location.reload();
	};

	return (
		<>
			{availableAppointments.map((appointment) => (
				<InteractiveCard
					key={appointment.id}
					onClick={() => handleClick(appointment.id)}>
					<ul id={appointment.id}>
						<li>
							{" "}
							{moment(appointment.day)
								.locale("fr")
								.format("dddd DD/MM/YYYY")}
						</li>
						<li>{appointment.time_of_day}</li>
					</ul>
					{selectedAppointmentId === appointment.id && (
						<HorizontalWrapper>
							<Button onClick={handleConfirm}>Confirm</Button>
							<Button>Cancel</Button>
						</HorizontalWrapper>
					)}
				</InteractiveCard>
			))}
		</>
	);
}
// export default TakeAppointment;
