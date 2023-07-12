import axios from "axios";
import { useEffect, useState, useRef } from "react";
import VerticalWrapper from "../../../styles/components/verticalWrapper.js";
import { motion } from "framer-motion";
import Greetings from "../../../styles/components/Greetings.js";
import Modal from "../../Modal/Modal.jsx";
import LinkComp from "../../../styles/components/LinkComp.js";
import { BsFillTrash3Fill } from "react-icons/bs";
import "../offersInfos/index.css";

function OffersInfos(props) {
    const [myOffers, setMyOffers] = useState("");
    const token = localStorage.getItem("token");
    const [showInput, setShowInput] = useState(false);
    const [showEditInput, setShowEditInput] = useState(false);
    const [showbuttons, setShowbuttons] = useState(false);
    const [showValidate, setShowValidate] = useState(false);
    const descriptionRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedOfferId, setSelectedOfferId] = useState(null);
    const enterpriseId = props.enterprise.id;

    const discountRef = useRef(null);

    useEffect(() => {
        async function fetchOffers() {
            const headers = {
                token,
                enterpriseId,
            };
            const response = await axios.get(`http://localhost:4000/enterprises/offers`, { headers });
            const offers = response.data;
            if (offers) {
                setMyOffers((myOffers) => response.data);
                // console.log(response.data);
            }
        }
        fetchOffers();
    }, [token, showModal]);

    const deleteOffer = async (e) => {
        console.log("ouiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
        console.log(e.currentTarget.parentNode);
        console.log(myOffers);
        const id = e.currentTarget.parentNode.id;
        const headers = {
            token: token,
        };
        try {
            const response = await axios.delete(`http://localhost:4000/offers/${id}`, {
                headers,
            });
            console.log(response.data.success);
            // create a new copy of myAppointments by filtering out the deleted appointment
            const updatedOffers = myOffers.filter((offer) => offer.id != id);
            // update the state with the new copy of myAppointments
            setMyOffers(updatedOffers);
        } catch (error) {
            console.error(error);
        }
    };
    const handleClick = (e) => {
        if (!showbuttons) {
            // setShowbuttons(true);
            setShowModal(true);
            // setShowInput(true);
        } else {
            setShowbuttons(false);
            setShowInput(false);
            setShowEditInput(false);
        }
    };
    const closeModal = () => {
        setShowModal(false);
    };
    const handleOfferClick = (offerId) => {
        if (selectedOfferId != offerId) {
            setSelectedOfferId((id) => offerId);
        } else if (selectedOfferId === offerId) {
            setSelectedOfferId(null);
        }
    };

    return (
        <>
            {showModal && <Modal onClose={closeModal} display="Offers" enterprise={enterpriseId} />}
            {myOffers ? (
                <div className="card">
                    <h3>Mes Offres</h3>

                    <ul className="offers-container">
                        {myOffers.map((offerInformation) => (
                            <li onClick={(e) => handleOfferClick(offerInformation.id)} key={offerInformation.id} id={offerInformation.id}>
                                <ul id={offerInformation.id}>
                                    <li className="offer-title">{offerInformation.description}</li>
                                    <li className="offer-discount">-{offerInformation.discount}%</li>
                                    {selectedOfferId === offerInformation.id && (
                                        <button className="del-btn--offer" onClick={deleteOffer} id={selectedOfferId}>
                                            DELETE
                                        </button>
                                    )}
                                </ul>
                            </li>
                        ))}
                    </ul>

                    <button onClick={handleClick} type="submit">
                        ADD
                    </button>
                </div>
            ) : (
                <div className="card">
                    <h1>No offers yet...</h1>
                </div>
            )}
        </>
    );
}

export default OffersInfos;
