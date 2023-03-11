import axios from "axios";
import { useEffect, useState } from "react";

function Oui() {
	const [enterprises, setenterprises] = useState([]);

	// fetchData
	useEffect(() => {
		async function fetchData() {
			try {
				const response = await axios.get(
					"http://localhost:4000/enterprises"
				);
				setenterprises(response.data[0]);
				console.log(response.data);
			} catch (error) {
				console.error(error);
			}
		}
		fetchData();
	}, []);

	return (
		<>
			{enterprises ? (
				<>
					<p>{enterprises.name}</p>
					<p>{enterprises.description}</p>
					<p>{enterprises.address}</p>
				</>
			) : (
				<></>
			)}
		</>
	);
}
export default Oui;
