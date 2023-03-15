import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../../styles/components/card.js";
import HorizontalWrapper from "../../../styles/components/HorizontalWrapper.js";

function AppointmentsInfos() {
	const [myAppointments, setMyAppointments] = useState("");
	const token = localStorage.getItem("token");

	useEffect(() => {
		async function fetchAppointments() {
			const headers = {
				token: token,
			};
			const response = await axios.get(
				`http://localhost:4000/enterprises/appointments`,
				{ headers }
			);
			setMyAppointments((myAppointments) => response.data);
			// console.log(response.data);
		}
		fetchAppointments();
	}, [token]);

	return (
		<>
			{" "}
			{myAppointments ? (
				<Card>
					<h1>My Appointment List</h1>
					{myAppointments.map((myAppointments) => (
						<HorizontalWrapper key={myAppointments.id}>
							<p>
								Le {myAppointments.day} à :{" "}
								{myAppointments.time_of_day}
							</p>
						</HorizontalWrapper>
					))}
				</Card>
			) : (
				<Card>
					<h1>No Appointments...</h1>
				</Card>
			)}
		</>
	);
}

export default AppointmentsInfos;
