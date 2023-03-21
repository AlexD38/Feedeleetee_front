import axios from "axios";
import { useEffect, useState, useReducer } from "react";
import { Link } from "react-router-dom";
import LinkComp from "../../../styles/components/LinkComp.js";
import Card from "../../../styles/components/card.js";
import HorizontalWrapper from "../../../styles/components/HorizontalWrapper.js";
import Input from "../../../styles/components/input.js";
import VerticalWrapper from "../../../styles/components/verticalWrapper.js";
import DeleteSign from "../../deleteSign/deleteSign.jsx";
import EditSign from "../../editSign/EditSign.jsx";
function AppointmentsInfos() {
	const [myAppointments, setMyAppointments] = useState("");
	const token = localStorage.getItem("token");
	const [editable, setEditable] = useState(false);
	const [data, dispatch] = useReducer(dataReducer, []);
	const [showButtons, setShowButtons] = useState(false);
	const ADD_DATA = "ADD_DATA";

	function dataReducer(state, action) {
		switch (action.type) {
			case ADD_DATA:
				return [...state, action.payload];
			default:
				return state;
		}
	}

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
	const handleClick = (e) => {
		if (!showButtons) {
			setShowButtons(true);
		} else {
			setShowButtons(false);
		}
	};
	const deleteAppointment = (e) => {
		e.currentTarget.parentNode.remove();
	};

	return (
		<VerticalWrapper>
			<h1>My Appointments</h1>{" "}
			{myAppointments ? (
				<Card>
					<div onClick={handleClick}>
						<EditSign />
					</div>

					{myAppointments.map((myAppointments) => (
						<HorizontalWrapper key={myAppointments.id}>
							<h3>
								Le {myAppointments.day} à :{" "}
								{myAppointments.time_of_day}
								{showButtons && (
									<>
										<button>Edit</button>
										<button onClick={deleteAppointment}>
											Delete
										</button>
									</>
								)}
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
					{showButtons && <button>ADD</button>}
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
