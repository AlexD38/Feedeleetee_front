import React, { useState } from "react";
import Button from "../../styles/components/Button.js";
import Form from "../../styles/components/form.js";
import Input from "../../styles/components/input.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Link from "../../styles/components/LinkComp";
import VerticalWrapper from "../../styles/components/verticalWrapper.js";

import qs from "qs";
import Greetings from "../../styles/components/Greetings.js";

function Signup() {
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
			navigate("/login");
		} catch (error) {
			console.log(error);
			alert("Erreur lors de la création de l'utilisateur");
		}
	};

	return (
		<>
			<Form onSubmit={handleSubmit}>
				<Greetings size="2rem">Creez votre compte</Greetings>

				<label>Pseudo :</label>
				<Input
					required
					type="text"
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
				/>
				<label>E-mail :</label>
				<Input
					required
					type="mail"
					value={mail}
					onChange={(e) => setMail(e.target.value)}
				/>
				<label>Mot de passe :</label>
				<Input
					required
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<Button type="submit">Créer un compte</Button>

				<VerticalWrapper>
					<p>
						Already have an account ?{" "}
						<Link href="http://localhost:3000/login">Log in</Link>{" "}
					</p>
				</VerticalWrapper>
			</Form>
		</>
	);
}

export default Signup;
