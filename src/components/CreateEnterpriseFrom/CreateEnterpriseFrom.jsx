import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../../styles/components/Button";
import Form from "../../styles/components/form";
import Input from "../../styles/components/input";
import { useNavigate } from "react-router-dom";

function CreateEnterprise() {
	const [enterpriseName, setEnterpriseName] = useState("");
	const [enterpriseAddress, setEnterpriseAddress] = useState("");
	const [enterpriseLogo, setEnterpriseLogo] = useState("");
	const [enterpriseDesc, setEnterpriseDesc] = useState("");
	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	const handleSubmit = async (event) => {
		const data = {
			enterpriseName,
			enterpriseAddress,
			enterpriseLogo,
			enterpriseDesc,
		};

		const headers = {
			"Content-Type": "application/x-www-form-urlencoded",
			token: token,
		};

		// console.log(data);
		// console.log(token);
		event.preventDefault();

		try {
			const response = await axios.post(
				"http://localhost:4000/enterprise",
				data,
				{
					headers,
				}
			);
			const result = response.data;
			console.log(result.success);
			if (result.success) {
				alert(result.success);
				navigate("/login");
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
			<Form onSubmit={handleSubmit}>
				<label>
					Nom de l'entreprise :
					<Input
						required
						type="text"
						value={enterpriseName}
						onChange={(e) => setEnterpriseName(e.target.value)}
					/>
				</label>
				<label>
					Adresse de l'entreprise :
					<Input
						type="text"
						value={enterpriseAddress}
						onChange={(e) => setEnterpriseAddress(e.target.value)}
					/>
				</label>
				<label>
					description de l'entreprise :
					<Input
						required
						type="text"
						value={enterpriseDesc}
						onChange={(e) => setEnterpriseDesc(e.target.value)}
					/>
				</label>
				<label>
					Logo de l'entreprise :
					<Input
						type="file"
						value={enterpriseLogo}
						onChange={(e) => setEnterpriseLogo(e.target.value)}
					/>
				</label>

				<Button type="submit">Créer mon entreprise</Button>
			</Form>
		</>
	);
}

export default CreateEnterprise;
