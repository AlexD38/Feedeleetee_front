import Business from "../styles/images/Business.jpg";
import HomePageImg from "../styles/components/HomePageImg";
import HomePageText from "../styles/components/HomePageText";
import { motion } from "framer-motion";
import Button from "../styles/components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/Login/LoginForm.jsx";
export function HomePage() {
	const [showButton, setShowButton] = useState(false);
	const [filter, setFilter] = useState(false);
	const navigate = useNavigate();

	const showLoginButton = () => {
		setTimeout(() => {
			setShowButton(true);
			setFilter(true);
			// console.log("oui");
		}, "2000");
	};
	showLoginButton();
	const navigateToLogin = () => {
		navigate("/login");
		// window.scrollTo(0, document.body.scrollHeight);
	};
	const body = document.querySelector("body");
	body.style.overflow = "hidden";
	return (
		<>
			<div style={{ overflow: "hidden", height: "100vh" }}>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						duration: 0.5,
						delay: 1,
					}}>
					<HomePageText>Hello,</HomePageText>
				</motion.div>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						duration: 0.5,
						delay: 1.5,
					}}>
					<HomePageText style={{ top: "4rem" }}>
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
				{showButton && (
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
							<Button
								onClick={navigateToLogin}
								style={{
									position: "absolute",
									bottom: "1rem",
									right: "3rem",
									margin: "0, auto",
									zIndex: "1",
									backgroundColor: "#eca869",
								}}>
								Click to enter
							</Button>
						</div>
					</motion.div>
				)}
			</div>
			{/* <div
				style={{
					height: "100vh",
					display: "grid",
					gridTemplateColumns: "repeat(2, 1fr)",
					gridTemplateRows: "1fr",
				}}>
				<LoginForm
					style={{
						position: "absolute",
						top: "0",
						left: "0",
						zIndex: "1",
						backgroundColor: "rgba(255, 255, 255, 1)",
					}}
				/>{" "}
			</div> */}
		</>
	);
}
