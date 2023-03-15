import React, { useState } from "react";
import Button from "../../styles/components/Button.js";
import Form from "../../styles/components/form.js";
import Input from "../../styles/components/input.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Link from "../../styles/components/Link";

import qs from "qs";

function LoginForm() {
	const [mail, setMail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	localStorage.clear();

	const handleSubmit = async (event) => {
		const data = {
			mail,
			password,
		};

		const headers = {
			"Content-Type": "application/x-www-form-urlencoded",
		};

		console.log(data);
		event.preventDefault();

		try {
			const response = await axios.post(
				"http://localhost:4000/login",
				qs.stringify(data),
				{
					headers,
				}
			);
			console.log("reponse : ", response.data);

			if (response.data.error) {
				alert(response.data.error);
				navigate("/login");
				return;
			}
			response.data.token = localStorage.setItem(
				"token",
				response.data.token
			);
			response.data.userName = localStorage.setItem(
				"user",
				response.data.userName
			);

			navigate("/home");
		} catch (error) {
			console.log(error);
			alert("Erreur lors de la création de l'utilisateur");
		}
	};

	// console.log("token");

	return (
		<>
			<Form onSubmit={handleSubmit}>
				<label>
					mail :
					<Input
						type="mail"
						value={mail}
						onChange={(e) => setMail(e.target.value)}
					/>
				</label>
				<label>
					pwd :
					<Input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>

				<Button type="submit">Me connecter</Button>
				<p>
					Don't have an account yet ?{" "}
					<Link href="http://localhost:3000/signup">Create One</Link>{" "}
				</p>
			</Form>
		</>
	);
}

export default LoginForm;
