import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../../styles/components/card.js";
import VerticalWrapper from "../../../styles/components/verticalWrapper.js";

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
			const offers = response.data;
			if (offers) {
				setMyOffers((myOffers) => response.data);
				// console.log(response.data);
			}
		}
		fetchOffers();
	}, [token]);

	return (
		<VerticalWrapper>
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
		</VerticalWrapper>
	);
}

export default OffersInfos;
