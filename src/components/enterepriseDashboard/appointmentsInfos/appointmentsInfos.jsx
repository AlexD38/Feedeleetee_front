import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../../styles/components/card.js";

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
			console.log(response.data);
		}
		fetchAppointments();
	}, [token]);

	return (
		<>
			{" "}
			Hello pou
			{myAppointments ? (
				<Card>
					<h1>My Appointment List</h1>
					{myAppointments.map((myAppointments) => (
						<div key={myAppointments.id}>
							<p>{myAppointments.day}</p>
							<p>{myAppointments.time_of_day}</p>
						</div>
					))}
				</Card>
			) : (
				<></>
			)}
		</>
	);
}

export default AppointmentsInfos;
