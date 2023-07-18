import Business from "../../styles/images/Business.jpg";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal.jsx";
import "../Homepage/index.css";
import { FaFacebook, FaPinterest, FaGooglePlus } from "react-icons/fa";
export function HomePage() {
	const [showbutton, setShowbutton] = useState(false);
	const [filter, setFilter] = useState(false);
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [showSignupModal, setShowSignupModal] = useState(false);
	const navigate = useNavigate();

	const showLoginbutton = () => {
		setTimeout(() => {
			setShowbutton(true);
			setFilter(true);
		}, "2000");
	};
	showLoginbutton();

	const navigateToLogin = () => {
		setShowLoginModal(true);
	};
	const navigateToSignup = () => {
		setShowSignupModal(true);
	};
	const body = document.querySelector("body");
	// body.style.overflow = "hidden";
	const closeModal = () => {
		setShowLoginModal(false);
		setShowSignupModal(false);
	};
	const changeDisplay = () => {
		if (showLoginModal) {
			setShowLoginModal(false);
			setShowSignupModal(true);
		} else {
			setShowLoginModal(true);
			setShowSignupModal(false);
		}
	};
	const captureWhereToNavAfterLogin = (e) => {
		console.log(e.target.getAttribute("whereToNext"));
		localStorage.setItem(
			"wheretonext",
			e.target.getAttribute("whereToNext")
		);
	};
	return (
		<>
			{showLoginModal && (
				<Modal
					onClose={closeModal}
					display="Login"
					changeDisplay={changeDisplay}
					whereToNext={localStorage.getItem("wheretonext")}></Modal>
			)}
			{showSignupModal && (
				<Modal
					onClose={closeModal}
					display="Signup"
					changeDisplay={changeDisplay}
					whereToNext={localStorage.getItem("wheretonext")}></Modal>
			)}
			<>
				<header>
					<nav className="main-nav">
						<h1>
							{/* Hello, and Welcome to your{" "} */}
							<span>Feedeleetee.</span>
						</h1>
						{showbutton && (
							<div
								className="login-btn-container
							">
								<FaFacebook className="social-icon" />
								<FaGooglePlus className="social-icon" />
								<FaPinterest className="social-icon" />
							</div>
						)}
					</nav>
				</header>
				<div className="img-container">
					<div className="img-container-presentation">
						<h2>Bienvenue.</h2>
						<p className="testimonial">
							Vous êtes une entreprise qui cherche à faciliter sa
							gestion de services et de rendez-vous clients ? Vous
							êtes un client à la recherche d'un service proposé
							par des entreprises ? Nous sommes là pour vous
							faciliter la vie. Fermez cet agenda, détendez-vous.
							On s'occupe du reste.{" "}
						</p>
						<div className="img-container-btn-container">
							<button
								whereToNext="client"
								onClick={navigateToLogin}
								onMouseEnter={captureWhereToNavAfterLogin}>
								Je suis client
							</button>
							<button
								whereToNext="enterprise"
								onClick={navigateToLogin}
								onMouseEnter={captureWhereToNavAfterLogin}>
								Je suis une entreprise
							</button>
						</div>
					</div>

					<img
						className="main-img"
						src={Business}
						alt="business picture for homepage"
					/>
				</div>
				<section className="testimonial-section">
					<p>
						"Cette application simple et efficace m'a permis de
						developper ma clientèle rapidement et gérer mes
						rendez-vous en un click pour mon entreprise ! Plus de
						prise de tête, finis les agendas et calendriers par
						milliers. L'interface est simple et rapide, tout se
						passe désormais sur Feedeleetee et mes clients sont
						contents. "
					</p>
					<span>- Sophie</span>
				</section>
				<section className="services-section">
					<h2>Que proposons-nous ? </h2>
					<section className="services-container">
						<article className="main-card">
							<header>
								<img
									className="card-img"
									src="https://source.unsplash.com/400x300?meet"
									alt=""
								/>
							</header>
							<h2 className="card-title">Relation</h2>
							<p className="card-body">
								Dans notre plateforme, nous mettons l'accent sur
								l'établissement de relations solides entre les
								entreprises et leurs clients. Nous comprenons
								l'importance d'une connexion authentique et nous
								nous efforçons de faciliter des relations
								durables. Grâce à notre système convivial, les
								entreprises peuvent interagir directement avec
								leurs clients, établir une proximité et répondre
								à leurs besoins spécifiques. Nous sommes
								déterminés à créer un environnement où la
								relation entre les entreprises et leurs clients
								peut s'épanouir.
							</p>
						</article>
						<article className="main-card">
							<header>
								<img
									className="card-img"
									src="https://source.unsplash.com/400x300?communication"
									alt=""
								/>
							</header>
							<h2 className="card-title">communication</h2>
							<p className="card-body">
								La communication est essentielle pour toute
								entreprise prospère. Notre plateforme offre un
								ensemble d'outils de communication efficaces
								pour faciliter les échanges entre les
								entreprises et leurs clients. Les entreprises
								peuvent partager des informations importantes,
								envoyer des notifications personnalisées,
								répondre aux questions et offrir un support en
								temps réel. Notre plateforme de communication
								intégrée garantit une interaction fluide et
								transparente, permettant ainsi aux entreprises
								de rester connectées avec leurs clients à tout
								moment.
							</p>
						</article>
						<article className="main-card">
							<header>
								<img
									className="card-img"
									src="https://source.unsplash.com/400x300?happiness"
									alt=""
								/>
							</header>
							<h2 className="card-title">Epanouissement</h2>
							<p className="card-body">
								Nous comprenons l'importance de la gestion des
								rendez-vous dans le contexte professionnel.
								Grâce à notre plateforme, les clients peuvent
								réserver facilement des rendez-vous avec les
								entreprises en quelques clics. Notre système de
								réservation intuitif offre une flexibilité
								optimale, permettant aux clients de choisir
								l'heure et la date qui leur conviennent le
								mieux. Les entreprises bénéficient d'un aperçu
								clair de leur emploi du temps, ce qui facilite
								la planification et l'organisation de leurs
								activités. Simplifiez le processus de
								réservation avec notre plateforme conviviale et
								offrez une expérience pratique à vos clients.
							</p>
						</article>
					</section>
				</section>

				<section className="maps-section">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26457.17063880303!2d-118.27522464131278!3d34.014454675466894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2ced36d9d488f%3A0x90367e2eec330227!2sCookies%20Los%20Angeles!5e0!3m2!1sfr!2sfr!4v1688387642979!5m2!1sfr!2sfr"
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"></iframe>
					<aside className="maps-card">
						<h4>Location</h4>
						<p>East St. California, L.A.</p>
					</aside>
				</section>
				<section className="contact-section">
					<div className="left-contact">
						<h5>Contactez-nous pour plus d'informations</h5>
						<p>
							Remplissez ce formulaire pour nous dire tout ce qui
							vous passe par la tête !
						</p>
					</div>
					<div className="right-contact">
						<form className="contact-form" action="">
							<label htmlFor="mail">
								<p className="mail-label">Mail</p>
								<input
									id="mail"
									className="input-form"
									type="mail"
								/>
							</label>
							<label htmlFor="name">
								<p className="name-label">Name</p>
								<input
									id="name"
									className="input-form"
									type="text"
								/>
							</label>
							<label htmlFor="message">
								<p className="message-label">Message</p>
								<textarea
									id="message"
									className="input-form"
									rows="3"
									cols="60"
								/>
							</label>
							<button className="homepage-form-btn" type="submit">
								Envoyer
							</button>
						</form>
					</div>
				</section>
				<footer>
					<p>Feedeleetee</p>
					<p>2023</p>
				</footer>
			</>
		</>
	);
}
