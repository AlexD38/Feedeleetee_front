import { useEffect, useState } from "react";
import axios from "axios";

export default function NextAppointments() {
	const token = localStorage.getItem("token");
	const [nextAppointments, setNextAppointments] = useState([]);

	useEffect(() => {
		async function fetchNextAppointments() {
			const headers = {
				token: token,
			};
			const response = await axios.get(
				`http://localhost:4000/nextappointments`,
				{ headers }
			);
			console.log(response.data);
			setNextAppointments((myAppointments) => response.data);
			localStorage.setItem("NumberOfAppointments", response.data.length);
		}
		fetchNextAppointments();
	}, []);
	return (
		<div className=" quickview__card quickview__card--long">
			{nextAppointments.length > 0 ? (
				<>
					{" "}
					<h3>Vos 3 prochains rendez-vous :</h3>
					<ul>
						{nextAppointments.map((appointment) => (
							<li key={appointment.id}>
								{" "}
								le {appointment.day} à {appointment.hour}
							</li>
						))}
					</ul>
				</>
			) : (
				<h2> vous n'avez aucun rdv à venir.</h2>
			)}
		</div>
	);
}
