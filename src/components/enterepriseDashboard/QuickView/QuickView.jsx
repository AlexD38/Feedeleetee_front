import { useState, useEffect } from "react";
import HorizontalWrapper from "../../../styles/components/HorizontalWrapper";
import axios from "axios";
import NextAppointments from "../../nextAppointments/nextAppointments";

function QuickView() {
	const token = localStorage.getItem("token");
	const [quickView, setQuickView] = useState([]);

	useEffect(() => {
		async function fetchQuickView() {
			const headers = {
				token: token,
			};
			const response = await axios.get(
				`http://localhost:4000/quickview`,
				{ headers }
			);
			console.log(response.data[0]);
			setQuickView(response.data[0]);
		}
		fetchQuickView();
	}, []);
	return (
		<>
			<HorizontalWrapper
				style={{
					display: "none",
				}}></HorizontalWrapper>
			<h1>{quickView.username}</h1>
			<h1>{quickView.entreprise}</h1>{" "}
			{quickView.services ? (
				<>
					<h2>
						Je propose acutellement {quickView.number_of_services}{" "}
						services :{" "}
					</h2>
					<ul>
						{quickView.services.map((service) => (
							<li key={service.id}>{service}</li>
						))}
					</ul>
				</>
			) : (
				<>Je ne propose aucun services pour le moment...</>
			)}
			{quickView.offers ? (
				<>
					<h2>
						J'ai acutellement {quickView.number_of_offers} offres :
					</h2>
					<ul>
						{quickView.offers.map((offer) => (
							<li key={offer.id}>{offer}</li>
						))}
					</ul>
				</>
			) : (
				<>Je n'ai aucune offre pour le moment...</>
			)}
			{quickView.clients ? (
				<>
					{" "}
					<h2>
						J'ai pour le moment {quickView.number_of_clients}{" "}
						clients
					</h2>
					<ul>
						{quickView.clients.map((client) => (
							<li key={client.id}>{client}</li>
						))}
					</ul>
				</>
			) : (
				<></>
			)}
			<NextAppointments />
		</>
	);
}

export default QuickView;
