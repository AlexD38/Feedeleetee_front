import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Card from "../../../styles/components/card.js";
import VerticalWrapper from "../../../styles/components/verticalWrapper.js";
import { motion } from "framer-motion";
import EditSign from "../../editSign/EditSign.jsx";
import Input from "../../../styles/components/input.js";
import Button from "../../../styles/components/Button.js";
import Greetings from "../../../styles/components/Greetings.js";

function ServicesInfos() {
	const [myServices, setMyServices] = useState("");
	const token = localStorage.getItem("token");
	const [showInput, setShowInput] = useState(false);
	const [showEditInput, setShowEditInput] = useState(false);
	const [showButtons, setShowButtons] = useState(false);
	const descriptionRef = useRef(null);
	const priceRef = useRef(null);
	const durationRef = useRef(null);
	useEffect(() => {
		async function fetchServices() {
			const headers = {
				token: token,
			};
			const response = await axios.get(
				`http://localhost:4000/enterprises/services`,
				{ headers }
			);
			const services = response.data;
			if (services) {
				setMyServices((myServices) => response.data);
			}
			// console.log(response.data);
		}
		fetchServices();
	}, [token]);
	const handleClick = (e) => {
		if (!showButtons) {
			setShowButtons(true);
			setShowInput(true);
		} else {
			setShowButtons(false);
			setShowInput(false);
			setShowEditInput(false);
		}
	};
	const sendData = async (e) => {
		console.log("desc", descriptionRef.current.value);
		console.log("price", priceRef.current.value);
		console.log("Durée", durationRef.current.value);
		const data = {
			description: descriptionRef.current.value,
			price: priceRef.current.value,
			duration: durationRef.current.value,
		};
		if (!data.description || !data.price || !data.duration) {
			return;
		}

		const headers = {
			token,
		};
		try {
			const response = await axios.post(
				`http://localhost:4000/enterprises/services`,
				{ data },
				{
					headers,
				}
			);
			console.log(response);
			console.log(response.data.serviceCreated);
			setMyServices([...myServices, response.data.serviceCreated]);
		} catch (error) {
			console.log(error);
		}
		descriptionRef.current.value = "";
		priceRef.current.value = "";
	};
	const deleteService = async (e) => {
		console.log(e.currentTarget.parentNode.firstChild.id);
		console.log(myServices);
		const id = e.currentTarget.parentNode.firstChild.id;
		const headers = {
			token: token,
		};
		try {
			const response = await axios.delete(
				`http://localhost:4000/services/${id}`,
				{
					headers,
				}
			);
			// console.log(response);
			// create a new copy of myAppointments by filtering out the deleted appointment
			const updatedServices = myServices.filter(
				(service) => service.id != id
			);
			// update the state with the new copy of myAppointments
			setMyServices(updatedServices);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<VerticalWrapper>
			{myServices ? (
				<Card>
					<Greetings size="3rem">Mes Services</Greetings>

					<motion.div onClick={handleClick}>
						<EditSign />
					</motion.div>
					{myServices.map((serviceInformation) => (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: 0.2 }}
							key={serviceInformation.id}>
							<p id={serviceInformation.id}>
								{serviceInformation.description} :{" "}
								{serviceInformation.price} € -{" "}
								{serviceInformation.duration}H
							</p>
							{showButtons && (
								<Button onClick={deleteService}>Delete</Button>
							)}
						</motion.div>
					))}
					{showInput && (
						<motion.form
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5 }}>
							<label>
								Description :
								<Input type="text" ref={descriptionRef} />
							</label>
							<label>
								Prix :
								<Input
									type="number"
									min="1"
									max="100"
									ref={priceRef}
								/>
							</label>
							<label>
								Durée :
								<Input
									type="number"
									min="0"
									max="10"
									ref={durationRef}
								/>
							</label>
						</motion.form>
					)}
					{showButtons && <Button onClick={sendData}>Add</Button>}
				</Card>
			) : (
				<Card>
					<h1>No services yet...</h1>
				</Card>
			)}
		</VerticalWrapper>
	);
}

export default ServicesInfos;
