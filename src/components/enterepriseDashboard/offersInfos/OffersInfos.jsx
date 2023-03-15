import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../../styles/components/card.js";

function OffersInfos() {
	const [myOffers, setMyOffers] = useState("");
	const token = localStorage.getItem("token");

	useEffect(() => {
		async function fetchOffers() {
			const headers = {
				token: token,
			};
			const response = await axios.get(
				`http://localhost:4000/enterprises/offers`,
				{ headers }
			);
			const offers = response.data[0].entreprise_et_services.offers;
			if (offers) {
				setMyOffers(
					(myOffers) => response.data[0].entreprise_et_services.offers
				);
				console.log(response.data[0].entreprise_et_services.offers);
			}
		}
		fetchOffers();
	}, [token]);

	return (
		<>
			{myOffers ? (
				<Card>
					<h1>My Offers List</h1>
					{myOffers.map((offerInformation) => (
						<div key={offerInformation.id}>
							<p>{offerInformation.description} </p>
							<p>-{offerInformation.discount}%</p>
						</div>
					))}
				</Card>
			) : (
				<Card>
					<h1>No offers yet...</h1>
				</Card>
			)}
		</>
	);
}

export default OffersInfos;
