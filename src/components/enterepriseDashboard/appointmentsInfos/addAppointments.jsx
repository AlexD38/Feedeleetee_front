import { useRef } from "react";
import axios from "axios";
import Greetings from "../../../styles/components/Greetings";
import Input from "../../../styles/components/input";
import Button from "../../../styles/components/Button";

export default function AddAppointments(props) {
	const token = localStorage.getItem("token");

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
			<label htmlFor="">DATE</label>
			<Input type="date" ref={dayRef}></Input>
			<label htmlFor="">HEURE</label>
			<Input type="time" ref={timeRef}></Input>
			<Button onClick={sendData}>Ajouter</Button>
		</>
	);
}
