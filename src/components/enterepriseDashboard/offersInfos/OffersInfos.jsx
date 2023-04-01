import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Button from "../../../styles/components/Button.js";
import Card from "../../../styles/components/card.js";
import VerticalWrapper from "../../../styles/components/verticalWrapper.js";
import EditSign from "../../editSign/EditSign.jsx";
import { motion } from "framer-motion";
import Input from "../../../styles/components/input.js";
import Greetings from "../../../styles/components/Greetings.js";

function OffersInfos() {
	const [myOffers, setMyOffers] = useState("");
	const token = localStorage.getItem("token");
	const [showInput, setShowInput] = useState(false);
	const [showEditInput, setShowEditInput] = useState(false);
	const [showButtons, setShowButtons] = useState(false);
	const [showValidate, setShowValidate] = useState(false);
	const descriptionRef = useRef(null);
	const discountRef = useRef(null);

	useEffect(() => {
		async function fetchOffers() {
			const headers = {
				token: token,
			};
			const response = await axios.get(
				`http://localhost:4000/enterprises/offers`,
				{ headers }
			);
			const offers = response.data;
			if (offers) {
				setMyOffers((myOffers) => response.data);
				// console.log(response.data);
			}
		}
		fetchOffers();
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
		console.log("discount", discountRef.current.value);
		const data = {
			description: descriptionRef.current.value,
			discount: discountRef.current.value,
		};
		if (!data.description || !data.discount) {
			return;
		}
		const headers = {
			token,
		};
		try {
			const response = await axios.post(
				`http://localhost:4000/enterprises/offers`,
				{ data },
				{
					headers,
				}
			);
			console.log(response);
			console.log(response.data.offerCreated);
			setMyOffers([...myOffers, response.data.offerCreated]);
		} catch (error) {
			console.log(error);
		}
		descriptionRef.current.value = "";
		discountRef.current.value = "";
	};
	const deleteOffer = async (e) => {
		console.log(e.currentTarget.parentNode);
		console.log(myOffers);
		const id = e.currentTarget.parentNode.id;
		const headers = {
			token: token,
		};
		try {
			const response = await axios.delete(
				`http://localhost:4000/offers/${id}`,
				{
					headers,
				}
			);
			console.log(response.data.success);
			// create a new copy of myAppointments by filtering out the deleted appointment
			const updatedOffers = myOffers.filter((offer) => offer.id != id);
			// update the state with the new copy of myAppointments
			setMyOffers(updatedOffers);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<VerticalWrapper>
			{myOffers ? (
				<Card>
					<Greetings size="3rem">Mes Offres</Greetings>
					<motion.div onClick={handleClick}>
						<EditSign />
					</motion.div>

					{myOffers.map((offerInformation) => (
						<div key={offerInformation.id} id={offerInformation.id}>
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3, delay: 0.2 }}>
								<p>{offerInformation.description}</p>
								<p>-{offerInformation.discount}%</p>
							</motion.div>
							{showButtons && (
								<Button onClick={deleteOffer}>Delete</Button>
							)}
						</div>
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
								% Discount :
								<Input
									type="number"
									min="0"
									max="100"
									ref={discountRef}
								/>
							</label>
						</motion.form>
					)}
					{showButtons && <Button onClick={sendData}>Add</Button>}
				</Card>
			) : (
				<Card>
					<h1>No offers yet...</h1>
				</Card>
			)}
		</VerticalWrapper>
	);
}

export default OffersInfos;
