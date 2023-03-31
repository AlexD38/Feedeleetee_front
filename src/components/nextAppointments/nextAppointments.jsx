import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";

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
					<motion.h2
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5 }}>
						Vos 3 prochains rendez-vous sont :
					</motion.h2>
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
