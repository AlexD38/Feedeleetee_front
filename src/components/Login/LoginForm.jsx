import React, { useState } from "react";
import Form from "../../styles/components/form.js";
import Input from "../../styles/components/input.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Link from "../../styles/components/LinkComp";
import VerticalWrapper from "../../styles/components/verticalWrapper";
import qs from "qs";
import Greetings from "../../styles/components/Greetings.js";
import PropTypes from "prop-types";

function LoginForm(props) {
	console.log(props);
	const [mail, setMail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	localStorage.clear();
	const [inputError, setInputError] = useState(false);

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
				setInputError(true);
				inputErrDisplay();
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
			if (!response.data.enterpriseId) {
				navigate("/createenterprise");
				return;
			}

			navigate("/myenterprise");
		} catch (error) {
			console.log(error);
			alert("erreur lors de la connexion");
		}
	};
	const showPwd = (event) => {
		event.target.type = "text";
	};
	const hidePwd = (event) => {
		event.target.type = "password";
	};
	const inputErrDisplay = (event) => {
		if (inputError) {
			const inputs = document.querySelectorAll("input");
			inputs.forEach((input) => {
				input.style.border = "3px solid red";
				// console.log(event.target.style);
				console.log(inputError);
			});
		}
	};
	inputErrDisplay();

	return (
		<>
			<Form onSubmit={handleSubmit}>
				<Greetings size="2rem">Identifiez-vous</Greetings>

				<label>e-mail :</label>
				<Input
					required
					type="email"
					value={mail}
					pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
					onChange={(e) => setMail(e.target.value)}
					// onFocus={inputErrDisplay}
				/>
				<label>Mot de passe :</label>
				<Input
					onBlur={hidePwd}
					onDoubleClick={showPwd}
					required
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					// onFocus={inputErrDisplay}
				/>

				<button type="submit">Me connecter</button>
				<VerticalWrapper>
					<p>
						Don't have an account yet ?{" "}
						<Link onClick={props.changeDisplay}>Create One</Link>{" "}
					</p>
				</VerticalWrapper>
			</Form>
		</>
	);
}
LoginForm.propTypes = {
	mail: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
};

export default LoginForm;
