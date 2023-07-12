import input from "../../../styles/components/input";
import { useRef } from "react";
import axios from "axios";
import Greetings from "../../../styles/components/Greetings";

export function AddOffers(props) {
    const descriptionRef = useRef(null);
    const discountRef = useRef(null);
    const token = localStorage.getItem("token");
    const enterpriseId = props.enterprise;

    const sendData = async (e) => {
        console.log("desc", descriptionRef.current.value);
        console.log("discount", discountRef.current.value);
        const data = {
            description: descriptionRef.current.value,
            discount: discountRef.current.value,
        };
        if (!data.description || !data.discount || data.description.length > 5 || data.discount < 5 || data.discount > 100) {
            return;
        }
        const headers = {
            token,
            enterpriseId,
        };
        try {
            const response = await axios.post(
                `http://localhost:4000/enterprises/offers`,
                { data },
                {
                    headers,
                }
            );
            console.log(response);
            console.log(response.data.offerCreated);
            // setMyOffers([...myOffers, response.data.offerCreated]);
        } catch (error) {
            console.log(error);
        }
        descriptionRef.current.value = "";
        discountRef.current.value = "";
        props.onClose();
    };

    return (
        <>
            {" "}
            <Greetings>Ajouter une offre</Greetings>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}>
                <label>Description :</label>
                <input required minLength="5" type="text" ref={descriptionRef} />
                <label>Discount : (en pourcentage)</label>
                <input required type="number" min="5" max="100" ref={discountRef} />
                <button onClick={sendData}>Ajouter</button>
            </form>
        </>
    );
}
