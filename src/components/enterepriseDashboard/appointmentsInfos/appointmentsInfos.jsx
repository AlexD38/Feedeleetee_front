import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Card from "../../../styles/components/card.js";
import HorizontalWrapper from "../../../styles/components/HorizontalWrapper.js";
import Input from "../../../styles/components/input.js";
import VerticalWrapper from "../../../styles/components/verticalWrapper.js";
import EditSign from "../../editSign/EditSign.jsx";
import Button from "../../../styles/components/Button.js";
import { motion } from "framer-motion";
import EditButton from "../../buttons/editBtn.jsx";
import Greetings from "../../../styles/components/Greetings.js";
import Modal from "../.././Modal/Modal.jsx";
import moment from "moment";
import LinkComp from "../../../styles/components/LinkComp.js";
import "moment/locale/fr";
import { BsFillTrash3Fill } from "react-icons/bs";

function AppointmentsInfos() {
	const [myAppointments, setMyAppointments] = useState([]);
	const token = localStorage.getItem("token");
	const [showInput, setShowInput] = useState(false);
	const [showEditInput, setShowEditInput] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [showButtons, setShowButtons] = useState(false);
	const [showValidate, setShowValidate] = useState(false);
	const [blur, setBlur] = useState(false);
	const [showTrashCan, setShowTrashCan] = useState(false);
	const [selectedAppId, setSelectedAppId] = useState(null);

	// const day = myAppointments[0].day;
	// console.log(day.split("T")[0]);
	const dayRef = useRef(null);
	const timeRef = useRef(null);

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
	}, [showModal]);
	const handleClick = (e) => {
		if (!showButtons) {
			// setShowButtons(true);
			setShowModal(true);
			// setShowInput(true);
		} else {
			setShowButtons(false);
			setShowInput(false);
			setShowEditInput(false);
		}
	};
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
			setMyAppointments([...myAppointments, response.data.results]);
		} catch (error) {
			console.log(error);
		}
		dayRef.current.value = "";
		timeRef.current.value = "";
	};
	const deleteAppointment = async (e) => {
		const id = e.currentTarget.id;
		const headers = {
			token: token,
		};
		try {
			const response = await axios.delete(
				`http://localhost:4000/appointments/${id}`,
				{
					headers,
				}
			);
			console.log(response.data.success);
			// create a new copy of myAppointments by filtering out the deleted appointment
			const updatedAppointments = myAppointments.filter(
				(appointment) => appointment.id != id
			);
			// update the state with the new copy of myAppointments
			setMyAppointments(updatedAppointments);
		} catch (error) {
			console.error(error);
		}
	};
	const editAppointment = (e) => {
		myAppointments.forEach((appointment) => {
			console.log(appointment.id);
			console.log("XXXXXXXX", e.currentTarget.parentNode.id);
			const clickedElmId = +e.currentTarget.parentNode.id;
			console.log(typeof clickedElmId);
			if (+appointment.id === +e.currentTarget.parentNode.id) {
				if (!showEditInput) {
					setShowEditInput(true);
					setShowButtons(false);
					setShowValidate(true);
					setShowInput(false);
				} else {
					setShowEditInput(false);
				}
			}
		});
	};
	const updateData = () => {
		setShowButtons(true);
		setShowValidate(false);
		setShowEditInput(false);
		setShowInput(true);

		console.log("update");
	};
	const closeModal = () => {
		setShowModal(false);
	};
	const handleAppointmentClick = (appId) => {
		if (selectedAppId != appId) {
			setSelectedAppId((id) => appId);
		} else if (selectedAppId === appId) {
			setSelectedAppId(null);
		}
	};
	return (
		<VerticalWrapper>
			{showModal && <Modal onClose={closeModal} display="Appointments" />}

			{myAppointments.length > 0 ? (
				<Card>
					<Greetings size="3rem">Mes rendez-vous</Greetings>

					{myAppointments.map((myAppointment) => (
						<HorizontalWrapper key={myAppointment.id}>
							<motion.h3 id={myAppointment.id}>
								<motion.ul
									transition={{
										type: "spring",
										bounce: 0,
										duration: 0.7,
										delayChildren: 0.3,
										staggerChildren: 0.05,
									}}>
									<motion.li
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											duration: 0.3,
											delay: 0.2,
										}}>
										<LinkComp
											onClick={(e) =>
												handleAppointmentClick(
													myAppointment.id
												)
											}>
											Le{" "}
											{moment(myAppointment.day)
												.locale("fr")
												.format(
													"dddd DD MMMM YYYY"
												)}{" "}
											à{" "}
											{myAppointment.time_of_day.includes(
												":"
											)
												? myAppointment.time_of_day.replace(
														":",
														"h"
												  )
												: myAppointment.time_of_day.concat(
														"h"
												  )}
											{myAppointment.client_id ? (
												<motion.li
													initial={{
														opacity: 0,
														x: 0,
													}}
													animate={{
														opacity: 1,
														x: 0,
													}}>
													(pris par{" "}
													{myAppointment.firstname}{" "}
													{myAppointment.lastname})
												</motion.li>
											) : (
												<></>
											)}
											{selectedAppId ===
												myAppointment.id && (
												<Button
													onClick={deleteAppointment}
													id={selectedAppId}>
													{/* DELETE */}
													<BsFillTrash3Fill />
												</Button>
											)}
										</LinkComp>
									</motion.li>
									{/* </motion.p> */}
								</motion.ul>

								{showButtons && (
									<>
										<EditButton
											id={myAppointment.id}
											day={myAppointment.day}
											time_of_day={
												myAppointment.time_of_day
											}
										/>
										<Button>Delete</Button>
									</>
								)}
							</motion.h3>
						</HorizontalWrapper>
					))}

					<Button onClick={handleClick} type="submit">
						ADD
					</Button>
				</Card>
			) : (
				<Card>
					<h1>No Appointments...</h1>
					<Button onClick={handleClick} type="submit">
						ADD
					</Button>
				</Card>
			)}
		</VerticalWrapper>
	);
}

export default AppointmentsInfos;
