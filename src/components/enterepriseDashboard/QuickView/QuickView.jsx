import { useState, useEffect } from "react";
import NextAppointments from "../../nextAppointments/nextAppointments";
import axios from "axios";
import "../QuickView/index.css";

// Universal
function QuickView(props) {
	const token = localStorage.getItem("token");
	const enterpriseId = props.enterprise.id;
	const [quickView, setQuickView] = useState([]);

	useEffect(() => {
		async function fetchQuickView() {
			const headers = {
				token: token,
				enterpriseId: enterpriseId,
			};
			try {
				const response = await axios.get(
					`http://localhost:4000/quickview`,
					{ headers }
				);
				if (response.status === 200) {
					setQuickView((quickView) => response.data);
					setQuickView(response.data);
					console.log(quickView);
				}
				console.log(response);
			} catch (error) {
				console.log(error);
			}
		}
		fetchQuickView();
	}, []);
	// console.log(props.enterprise);

	return (
		<>
			{quickView && (
				<main className="quickview__container">
					<div className="quickview__title">
						{" "}
						<h1>
							<span>Coup d'oeil sur votre entreprise</span>
						</h1>{" "}
					</div>
					<div className="quickview__body">
						<div className="quickview__body--left">
							{quickView.number_of_services > 0 ? (
								<div className="quickview__card">
									<div className="card__number">
										<span>
											{quickView.number_of_services}
										</span>
									</div>
									<p>services</p>
								</div>
							) : (
								<h3>aucun service </h3>
							)}
							{quickView.number_of_offers > 0 ? (
								<div className="quickview__card">
									<div className="card__number">
										<span>
											{quickView.number_of_offers}
										</span>
									</div>
									<p>offres</p>
								</div>
							) : (
								<h3> aucune offre et</h3>
							)}
							{quickView.number_of_clients > 0 ? (
								<>
									<div className="quickview__card">
										{" "}
										<div className="card__number">
											<span>
												{quickView.number_of_clients}
											</span>
										</div>
										<p>clients</p>
									</div>
								</>
							) : (
								<p className="no-clients">
									{" "}
									vous n'avez pas encore de clients
								</p>
							)}
						</div>
						<div className="quickview__body--right">
							<div className="quickview__card quickview__card--summary">
								{props.enterprise.logo && (
									<img
										className=" card__logo"
										src={`data:image/png;base64,${props.enterprise.logo}`}
										alt="logo"
									/>
								)}
								<p className="card__title">
									{props.enterprise.name}
								</p>
								<p className="card__address">
									{props.enterprise.address}
								</p>
								<p className="card__description">
									{props.enterprise.description}
								</p>
							</div>
						</div>
					</div>
					<NextAppointments />
				</main>
			)}
		</>
	);
}

export default QuickView;
