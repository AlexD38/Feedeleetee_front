import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../../styles/components/card.js";
import HorizontalWrapper from "../../../styles/components/HorizontalWrapper.js";
import VerticalWrapper from "../../../styles/components/verticalWrapper.js";

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
		<VerticalWrapper>
			<h1>My Appointments</h1>{" "}
			{myAppointments ? (
				<Card>
					{myAppointments.map((myAppointments) => (
						<HorizontalWrapper key={myAppointments.id}>
							<h3>
								Le {myAppointments.day} à :{" "}
								{myAppointments.time_of_day}{" "}
							</h3>
							{myAppointments.client_id ? (
								<h3>
									- Rdv pris par {myAppointments.firstname}{" "}
									{myAppointments.lastname}
								</h3>
							) : (
								<></>
							)}
						</HorizontalWrapper>
					))}
				</Card>
			) : (
				<Card>
					<h1>No Appointments...</h1>
				</Card>
			)}
		</VerticalWrapper>
	);
}

export default AppointmentsInfos;
