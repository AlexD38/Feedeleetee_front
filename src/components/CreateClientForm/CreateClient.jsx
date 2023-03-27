import axios from "axios";
import { useRef, useState } from "react";
import Button from "../../styles/components/Button";
import Form from "../../styles/components/form";
import Input from "../../styles/components/input";
import { useNavigate } from "react-router-dom";
import Greetings from "../../styles/components/Greetings";
function CreateClientForm() {
	const clientFirstnameRef = useRef();
	const clientLastnameRef = useRef();
	const clientMailRef = useRef();
	const clientTelRef = useRef();
	const navigate = useNavigate();
	const token = localStorage.getItem("token");

	const handleSubmit = async (event) => {
		const formData = new FormData();
		const data = {
			clientFirstnameRef,
			clientLastnameRef,
			clientMailRef,
			clientTelRef,
		};

		const headers = {
			"Content-Type": "application/x-www-form-urlencoded",
			token: token,
		};

		console.log(data);
		// console.log(token);
		event.preventDefault();

		try {
			const response = await axios.post(
				"http://localhost:4000/clients",
				data,
				{
					headers,
				}
			);
			const result = response.data;
			console.log(result);
			if (result.userCreateEnterprise.success) {
				alert(result.userCreateEnterprise.success);
				localStorage.setItem(
					"enterpriseId",
					result.userCreateEnterprise.enterpriseId
				);
				navigate("/home");
			}
			if (result.authenticated === false) {
				// Redirection vers la page de login
				navigate("/login");
				alert("You're not logged in");
			}
		} catch (error) {
			console.log(error);
			alert("Erreur lors de la création de l'entreprise");
		}
	};
	return (
		<>
			<Form onSubmit={handleSubmit} enctype="multipart/form-data">
				<Greetings size="2rem">Creez votre profil client</Greetings>
				<label for="firstname">Prénom du client :</label>
				<Input
					id="firstname"
					required
					type="text"
					re={clientFirstnameRef}
				/>
				<label for="lastname">Nom du client :</label>
				<Input
					id="lastname"
					type="text"
					required
					re={clientLastnameRef}
				/>
				<label for="mail">mail :</label>
				<Input id="mail" required type="email" ref={clientMailRef} />
				<label for="tel">tel :</label>
				<Input id="tel" type="numeral" ref={clientTelRef} />

				<Button type="submit">Créer mon profil client</Button>
			</Form>
		</>
	);
}

export default CreateClientForm;
