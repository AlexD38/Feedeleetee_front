import { useRef } from "react";
import input from "../../../styles/components/input.js";
import Greetings from "../../../styles/components/Greetings";
import axios from "axios";

export function AddServices(props) {
    const descriptionRef = useRef(null);
    const priceRef = useRef(null);
    const durationRef = useRef(null);
    const token = localStorage.getItem("token");
    const enterpriseId = props.enterprise;

    const sendData = async (e) => {
        e.preventDefault();
        console.log("desc", descriptionRef.current.value);
        console.log("price", priceRef.current.value);
        console.log("Durée", durationRef.current.value);
        const data = {
            description: descriptionRef.current.value,
            price: priceRef.current.value,
            duration: durationRef.current.value,
        };
        if (!data.description || !data.price || !data.duration || data.description.length < 5 || data.price < 0 || data.duration < 0) {
            return;
        }

        const headers = {
            token,
            enterpriseId,
        };
        try {
            const response = await axios.post(
                `http://localhost:4000/enterprises/services`,
                { data },
                {
                    headers,
                }
            );
            console.log(response);
            console.log(response.data.serviceCreated);
            // setMyServices([...myServices, response.data.serviceCreated]);
        } catch (error) {
            console.log(error);
        }
        descriptionRef.current.value = "";
        priceRef.current.value = "";
        durationRef.current.value = "";
        props.onClose();
    };
    return (
        <>
            <Greetings>Ajouter un Service</Greetings>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}>
                <label>Description :</label>
                <input required minLength="5" type="text" ref={descriptionRef} />
                <label>Prix :</label>
                <input required type="number" min="1" max="100" ref={priceRef} />
                <label>Durée :</label>
                <input required type="number" min="0" max="10" ref={durationRef} />
                <button onClick={sendData}>Ajouter</button>
            </form>
        </>
    );
}
