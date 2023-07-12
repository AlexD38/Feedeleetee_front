import { useRef } from "react";
import axios from "axios";
import Greetings from "../../../styles/components/Greetings";
import Input from "../../../styles/components/input";

export default function AddAppointments(props) {
	const token = localStorage.getItem("token");
	const enterpriseId = props.enterprise;
	console.log(enterpriseId);

	const dayRef = useRef(null);
	const timeRef = useRef(null);
	const sendData = async (e) => {
		const data = {
			day: dayRef.current.value,
			timeOfDay: timeRef.current.value,
		};
		if (data.day === "" || data.timeOfDay === "") {
			return;
		}

		const headers = {
			token,
			enterpriseId: +enterpriseId,
		};
		try {
			const response = await axios.post(
				`http://localhost:4000/enterprises/appointments`,
				{ data },
				{
					headers,
				}
			);
			console.log(response.data);
			console.log(response.data.success);
			// setMyAppointments([...myAppointments, response.data.results]);
		} catch (error) {
			console.log(error);
		}
		dayRef.current.value = "";
		timeRef.current.value = "";
		props.onClose();
	};

	return (
		<>
			<Greetings>Ajouter un rendez-vous</Greetings>
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}>
				<label htmlFor="">DATE</label>
				<input required type="date" ref={dayRef}></input>
				<label htmlFor="">HEURE</label>
				<input required type="time" ref={timeRef}></input>
				<button onClick={sendData}>Ajouter</button>
			</form>
		</>
	);
}
