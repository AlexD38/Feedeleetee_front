import React, { useState } from "react";
import style from "./style.css";
import axios from "axios";
import qs from "qs";

function Login() {
	const [userName, setUserName] = useState("");
	const [mail, setMail] = useState("");
	const [password, setPassword] = useState("");

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
		} catch (error) {
			console.log(error);
			alert("Erreur lors de la création de l'utilisateur");
		}
	};

	// console.log("token");

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label>
					Pseudo :
					<input
						type="text"
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
					/>
				</label>
				<label>
					mail :
					<input
						type="text"
						value={mail}
						onChange={(e) => setMail(e.target.value)}
					/>
				</label>
				<label>
					pwd :
					<input
						type="text"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>

				<button type="submit">Créer un compte</button>
			</form>
			<p>
				Already have an account ?{" "}
				<a href="http://localhost:4000/login">Login</a>{" "}
			</p>
		</>
	);
}

export default Login;
