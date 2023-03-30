import { useEffect, useState, useRef } from "react";
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
		<>
			{nextAppointments ? (
				<>
					{" "}
					<h2>Mes 3 prochains RDV sont :</h2>
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
				<>Je n'ai pas encore de rendez-vous de prévu...</>
			)}
		</>
	);
}
