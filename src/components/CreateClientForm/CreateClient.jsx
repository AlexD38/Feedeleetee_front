import axios from "axios";
import { useRef, useState } from "react";
import Form from "../../styles/components/form";
import Input from "../../styles/components/input";
import { useNavigate } from "react-router-dom";
import Greetings from "../../styles/components/Greetings";
function CreateClientForm() {
    const clientFirstnameRef = useRef(null);
    const clientLastnameRef = useRef(null);
    const clientMailRef = useRef(null);
    const clientTelRef = useRef(null);
    const navigate = useNavigate(null);
    const token = localStorage.getItem("token");

    const handleSubmit = async (event) => {
        const firstname = clientFirstnameRef.current.value;
        const lastname = clientLastnameRef.current.value;
        const mail = clientMailRef.current.value;
        const tel = clientTelRef.current.value;

        const formData = new FormData();
        const data = {
            firstname,
            lastname,
            mail,
            tel,
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
            if (result.success) {
                alert(result.success);
                localStorage.setItem(
                    "clientId",
                    result.userCreateClient.client_id
                );
                navigate("/home");
            }
            if (result.authenticated === false) {
                navigate("/login");
                alert("You're not logged in");
            }
            return;
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
                    ref={clientFirstnameRef}
                />
                <label for="lastname">Nom du client :</label>
                <Input
                    id="lastname"
                    type="text"
                    required
                    ref={clientLastnameRef}
                />
                <label for="mail">mail :</label>
                <Input id="mail" required type="email" ref={clientMailRef} />
                <label for="tel">tel :</label>
                <Input id="tel" type="numeral" ref={clientTelRef} />

                <button type="submit">Créer mon profil client</button>
            </Form>
        </>
    );
}

export default CreateClientForm;
