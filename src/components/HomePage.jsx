import Business from "../styles/images/Business.jpg";
import HomePageImg from "../styles/components/HomePageImg";
import HomePageText from "../styles/components/HomePageText";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal/Modal.jsx";
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
	return (
		<>
			{showLoginModal && (
				<Modal
					onClose={closeModal}
					display="Login"
					changeDisplay={changeDisplay}></Modal>
			)}
			{showSignupModal && (
				<Modal
					onClose={closeModal}
					display="Signup"
					changeDisplay={changeDisplay}></Modal>
			)}
			<div style={{ overflow: "hidden", height: "100vh" }}>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						duration: 0.5,
						delay: 1,
					}}>
					<HomePageText style={{ bottom: "4rem" }}>
						Hello,
					</HomePageText>
				</motion.div>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						duration: 0.5,
						delay: 1.5,
					}}>
					<HomePageText>
						and Welcome to your{" "}
						<span
							style={{
								color: "#eca869",
								textShadow: " 0 0 30px black",
							}}>
							office.
						</span>
					</HomePageText>
				</motion.div>
				<HomePageImg
					src={Business}
					alt="business picture for homepage"
				/>
				{showbutton && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{
							duration: 0.5,
							delay: 1,
						}}>
						<div
							style={{
								height: "100vh",
								width: "100vw",
								backgroundColor: "rgba(0, 0, 0, .5)",
								position: "absolute",
								top: "0",
								left: "0",
								zIndex: "10",
								// borderBottom: "20rem solid #454545",
							}}>
							<button
								onClick={navigateToLogin}
								style={{
									position: "absolute",
									top: "1rem",
									right: "3rem",
									margin: "0, auto",
									zIndex: "1",
								}}>
								Login
							</button>
							<button
								onClick={navigateToSignup}
								style={{
									position: "absolute",
									top: "1rem",
									right: "12rem",
									margin: "0, auto",
									zIndex: "1",
								}}>
								Register
							</button>
						</div>
					</motion.div>
				)}
			</div>
		</>
	);
}
