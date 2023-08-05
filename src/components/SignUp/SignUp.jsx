import React, { useState } from "react";
import Form from "../../styles/components/form.js";
import input from "../../styles/components/input.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Link from "../../styles/components/LinkComp";
import VerticalWrapper from "../../styles/components/verticalWrapper.js";
import PropTypes from "prop-types";
import qs from "qs";
import Greetings from "../../styles/components/Greetings.js";

function Signup(props) {
	const [userName, setUserName] = useState("");
	const [mail, setMail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		const data = {
			userName,
			mail,
			password,
		};

		const headers = {
			"Content-Type": "application/x-www-form-urlencoded",
		};

		console.log(userName, mail, password);
		event.preventDefault();

		try {
			const response = await axios.post(
				"http://localhost:4000/users",
				qs.stringify(data),
				{
					headers,
				}
			);
			const message = response.data.message;
			console.log(message);

			// Redirection vers la page de login
			// navigate("/login")
			props.changeDisplay();
		} catch (error) {
			console.log(error);
			alert("Erreur lors de la création de l'utilisateur");
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<Greetings size="2rem">Creez votre compte</Greetings>

				<label>Pseudo :</label>
				<input
					required
					type="text"
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
				/>
				<label>E-mail :</label>
				<input
					required
					type="mail"
					value={mail}
					onChange={(e) => setMail(e.target.value)}
				/>
				<label>Mot de passe :</label>
				<input
					required
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button type="submit">Créer un compte</button>

				<VerticalWrapper>
					<p>
						Already have an account ?{" "}
						<Link onClick={props.changeDisplay}>Log in</Link>{" "}
					</p>
				</VerticalWrapper>
			</form>
		</>
	);
}
Signup.propTypes = {
	userName: PropTypes.string.isRequired,
	mail: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
};

export default Signup;

//TODO display error message when sign up fails for example, when user already exists
