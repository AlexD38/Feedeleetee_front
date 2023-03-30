import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Link from "../../styles/components/LinkComp";

import VerticalWrapper from "../../styles/components/verticalWrapper.js";
import Greetings from "../../styles/components/Greetings.js";
import Logout from "../Logout/Logout";
import Card from "../../styles/components/card";

function Home() {
	const userName = localStorage.getItem("user");
	const [token, setToken] = useState(localStorage.getItem("token"));
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			alert("please login first");
			navigate("/login");
		}
	}, [token]);

	return userName ? (
		<>
			<VerticalWrapper>
				<Link href="http://localhost:3000/myenterprise">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.1 }}>
						<Greetings>Hello {userName}</Greetings>
					</motion.div>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						whileHover={{ scale: 1.1 }}
						transition={{
							type: "spring",
							stiffness: 400,
							damping: 10,
						}}>
						<Card>Accéder à mon entreprise</Card>
					</motion.div>
				</Link>
				<Link href="http://localhost/myclientprofile">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						whileHover={{ scale: 1.1 }}
						transition={{
							type: "spring",
							stiffness: 400,
							damping: 10,
						}}>
						<Card>Accéder à mon profil client</Card>
					</motion.div>
				</Link>
				<Logout />
			</VerticalWrapper>
		</>
	) : (
		<>
			<h1>nothing to see here...</h1>
		</>
	);
}

export default Home;
