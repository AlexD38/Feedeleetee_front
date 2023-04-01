import { useState, useEffect } from "react";
import HorizontalWrapper from "../../../styles/components/HorizontalWrapper";
import axios from "axios";
import NextAppointments from "../../nextAppointments/nextAppointments";
import Greetings from "../../../styles/components/Greetings";
import { useAnimate, stagger, motion, delay } from "framer-motion";

// Universal
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
			if (response.status === 200) {
				setQuickView((quickView) => response.data);
				// setQuickView(response.data);
				console.log(response.data);
				console.log(quickView);
			}
		}
		fetchQuickView();
	}, []);

	return (
		<>
			{quickView && (
				<>
					{" "}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={({ duration: 0.5 }, { delay: 0.2 })}>
						<HorizontalWrapper
							style={{
								display: "none",
							}}></HorizontalWrapper>
						<Greetings>{quickView.username},</Greetings>
						<h1>
							"{quickView.entreprise}" propose actuellement :
						</h1>{" "}
						{quickView.number_of_services > 0 ? (
							<>
								<h2>
									{quickView.number_of_services} services :{" "}
								</h2>
								<ul>
									{quickView.services.map((service) => (
										<motion.li
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											delay={{ stagger: 0.5 }}
											transition={{ duration: 1 }}
											key={service.id}>
											{service}
										</motion.li>
									))}
								</ul>
							</>
						) : (
							<h2>aucun service </h2>
						)}
						{quickView.number_of_offers > 0 ? (
							<>
								<h2>{quickView.number_of_offers} offres :</h2>
								<ul>
									{quickView.offers.map((offer) => (
										<motion.li
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{ duration: 1 }}
											key={offer.id}>
											{offer}
										</motion.li>
									))}
								</ul>
							</>
						) : (
							<h2> aucune offre et</h2>
						)}
						{quickView.number_of_clients > 0 ? (
							<>
								{" "}
								<motion.h2
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.3 }}>
									Votre entreprise à pour le moment{" "}
									{quickView.number_of_clients} clients
								</motion.h2>
								<ul>
									{quickView.clients.map((client) => (
										<li key={client.id}>{client}</li>
									))}
								</ul>
							</>
						) : (
							<h2> vous n'avez pas encore de clients</h2>
						)}
						<NextAppointments />
					</motion.div>
				</>
			)}
		</>
	);
}

export default QuickView;
