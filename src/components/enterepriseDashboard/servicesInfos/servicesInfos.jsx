import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Modal from "../.././Modal/Modal.jsx";
import { BsFillTrash3Fill } from "react-icons/bs";
import "../servicesInfos/index.css";

function ServicesInfos(props) {
	const [myServices, setMyServices] = useState("");
	const token = localStorage.getItem("token");
	const [showInput, setShowInput] = useState(false);
	const [showEditInput, setShowEditInput] = useState(false);
	const [showbuttons, setShowbuttons] = useState(false);
	const descriptionRef = useRef(null);
	const priceRef = useRef(null);
	const durationRef = useRef(null);
	const [showModal, setShowModal] = useState(false);
	const [selectedServiceId, setSelectedServiceId] = useState(null);
	const closeModal = () => {
		setShowModal(false);
	};
	const enterpriseId = props.enterprise.id;

	useEffect(() => {
		async function fetchServices() {
			const headers = {
				token,
				enterpriseId,
			};
			const response = await axios.get(
				`http://localhost:4000/enterprises/services`,
				{ headers }
			);
			const services = response.data;
			if (services) {
				setMyServices((myServices) => response.data);
			}
			console.log(response.data);
		}
		fetchServices();
	}, [token, showModal]);
	const handleClick = (e) => {
		if (!showbuttons) {
			setShowbuttons(true);
			setShowInput(true);
			setShowModal(true);
		} else {
			setShowbuttons(false);
			setShowInput(false);
			setShowEditInput(false);
		}
	};

	const deleteService = async (e) => {
		console.log(e.currentTarget.parentNode.firstChild.id);
		console.log(myServices);
		const id = e.currentTarget.parentNode.id;
		console.log(e.currentTarget.parentNode.id);
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
	const handleServiceClick = (serviceId) => {
		if (selectedServiceId != serviceId) {
			setSelectedServiceId((id) => serviceId);
		} else if (selectedServiceId === serviceId) {
			setSelectedServiceId(null);
		}
	};

	return (
		<>
			{showModal && (
				<Modal
					onClose={closeModal}
					display="Services"
					enterprise={enterpriseId}
				/>
			)}

			{myServices ? (
				<div className="card">
					<h3>Mes Services</h3>
					<ul className="services-container">
						{myServices.map((serviceInformation) => (
							<li>
								<ul
									className="service-infos"
									onClick={(e) =>
										handleServiceClick(
											serviceInformation.id
										)
									}
									id={serviceInformation.id}>
									<li className="service-description">
										{serviceInformation.description} :{" "}
									</li>
									<li className="service-price-duration-container">
										<p className="service-price">
											{serviceInformation.price} €
										</p>
										<p className="service-duration">
											{serviceInformation.duration}H
										</p>
									</li>
									{selectedServiceId ===
										serviceInformation.id && (
										<button
											className="del-btn--service"
											onClick={deleteService}
											id={selectedServiceId}>
											DELETE
										</button>
									)}
								</ul>
							</li>
						))}
					</ul>

					<button onClick={handleClick} type="submit">
						ADD
					</button>
				</div>
			) : (
				<div className="card">
					<h1>No services yet...</h1>
					<button onClick={handleClick} type="submit">
						ADD
					</button>
				</div>
			)}
		</>
	);
}

export default ServicesInfos;
