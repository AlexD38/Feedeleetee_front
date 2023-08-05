import axios from "axios";
import { useState } from "react";
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
        const formData = new FormData();
        formData.append("image", enterpriseLogo);
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
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/enterprise", data, {
                headers,
            });
            const result = response.data;
            console.log(result);
            if (result.enterpriseId) {
                alert(`well done ${result.userName}, you just created your enterprise with id : ${result.enterpriseId}`);
                localStorage.setItem("token", result.token);
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
                <label>
                    Nom de l'entreprise :
                    <Input required type="text" value={enterpriseName} onChange={(e) => setEnterpriseName(e.target.value)} />
                </label>
                <label>
                    Adresse de l'entreprise :
                    <Input type="text" value={enterpriseAddress} onChange={(e) => setEnterpriseAddress(e.target.value)} />
                </label>
                <label>
                    description de l'entreprise :
                    <Input required type="text" value={enterpriseDesc} onChange={(e) => setEnterpriseDesc(e.target.value)} />
                </label>
                <label>
                    Logo de l'entreprise :
                    <Input type="text" value={enterpriseLogo} onChange={(e) => setEnterpriseLogo(e.target.value)} />
                </label>

                <button type="submit">Créer mon entreprise</button>
            </Form>
        </>
    );
}

export default CreateEnterprise;
