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
import Button from "../../../styles/components/Button.js";
import { motion } from "framer-motion";
function AppointmentsInfos() {
	const [myAppointments, setMyAppointments] = useState("");
	const token = localStorage.getItem("token");
	const [showInput, setShowInput] = useState(false);
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
			setShowInput(false);
		}
	};
	const showAddInput = () => {
		if (!showInput) {
			setShowInput(true);
		} else {
			setShowInput(false);
		}
	};
	const deleteAppointment = (e) => {
		e.currentTarget.parentNode.remove();
	};

	return (
		<VerticalWrapper>
			<motion.h1
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}>
				My Appointments
			</motion.h1>{" "}
			{myAppointments ? (
				<Card>
					<motion.div
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5 }}
						onClick={handleClick}>
						<EditSign />
					</motion.div>

					{myAppointments.map((myAppointments) => (
						<HorizontalWrapper key={myAppointments.id}>
							<motion.h3
								whileHover={{ scale: 1.1 }}
								initial={{ opacity: 0, scale: 0.5 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.3 }}>
								Le {myAppointments.day} à :{" "}
								{myAppointments.time_of_day}
								{showButtons && (
									<>
										<Button>Edit</Button>
										<Button onClick={deleteAppointment}>
											Delete
										</Button>
									</>
								)}
							</motion.h3>
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
					{showInput && (
						<motion.form
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5 }}
							action="submit">
							<Input type="date"></Input>
							<Input type="text" min="1" />
						</motion.form>
					)}

					{showButtons && (
						<Button onClick={showAddInput} type="submit">
							ADD
						</Button>
					)}
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
