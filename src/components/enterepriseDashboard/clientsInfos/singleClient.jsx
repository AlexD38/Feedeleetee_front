import { useState } from "react";
import VerticalWrapper from "../../../styles/components/verticalWrapper.js";
import { motion } from "framer-motion";
import "../clientsInfos/index.css";

export default function SingleCLient(props) {
	const [showCredentials, setShowCredentials] = useState(false);
	const handleClick = (e) => {
		if (!showCredentials) {
			setShowCredentials(true);
		} else {
			setShowCredentials(false);
		}
	};
	// console.log(props.client.id);
	return (
		<>
			<ul onClick={handleClick}>
				<li>{props.client.firstname}</li>
				<li className="lastname">
					{props.client.lastname.toUpperCase()}
				</li>
				{showCredentials && (
					<ul>
						<li className="mail"> {props.client.mail}</li>
						<li className="tel"> {props.client.tel}</li>
					</ul>
				)}
			</ul>
		</>
	);
}
