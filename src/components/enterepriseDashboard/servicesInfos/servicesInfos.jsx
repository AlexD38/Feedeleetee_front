import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Card from "../../../styles/components/card.js";
import VerticalWrapper from "../../../styles/components/verticalWrapper.js";
import { motion } from "framer-motion";
import EditSign from "../../editSign/EditSign.jsx";
import Input from "../../../styles/components/input.js";
import Greetings from "../../../styles/components/Greetings.js";
import Modal from "../.././Modal/Modal.jsx";
import LinkComp from "../../../styles/components/LinkComp.js";
import HorizontalWrapper from "../../../styles/components/HorizontalWrapper.js";
import { BsFillTrash3Fill } from "react-icons/bs";

function ServicesInfos() {
    const [myServices, setMyServices] = useState("");
    const token = localStorage.getItem("token");
    const [showInput, setShowInput] = useState(false);
    const [showEditInput, setShowEditInput] = useState(false);
    const [showbuttons, setShowbuttons] = useState(false);
    const descriptionRef = useRef(null);
    const priceRef = useRef(null);
    const durationRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedServiceId, setSelectedServiceId] = useState(null);
    const closeModal = () => {
        setShowModal(false);
    };
    const enterpriseId = localStorage.getItem("enterpriseId");

    useEffect(() => {
        async function fetchServices() {
            const headers = {
                token,
                enterpriseId,
            };
            const response = await axios.get(
                `http://localhost:4000/enterprises/services`,
                { headers }
            );
            const services = response.data;
            if (services) {
                setMyServices((myServices) => response.data);
            }
            // console.log(response.data);
        }
        fetchServices();
    }, [token, showModal]);
    const handleClick = (e) => {
        if (!showbuttons) {
            setShowbuttons(true);
            setShowInput(true);
            setShowModal(true);
        } else {
            setShowbuttons(false);
            setShowInput(false);
            setShowEditInput(false);
        }
    };

    const deleteService = async (e) => {
        console.log(e.currentTarget.parentNode.firstChild.id);
        console.log(myServices);
        const id = e.currentTarget.parentNode.firstChild.id;
        const headers = {
            token: token,
        };
        try {
            const response = await axios.delete(
                `http://localhost:4000/services/${id}`,
                {
                    headers,
                }
            );
            // console.log(response);
            // create a new copy of myAppointments by filtering out the deleted appointment
            const updatedServices = myServices.filter(
                (service) => service.id != id
            );
            // update the state with the new copy of myAppointments
            setMyServices(updatedServices);
        } catch (error) {
            console.error(error);
        }
    };
    const handleServiceClick = (serviceId) => {
        if (selectedServiceId != serviceId) {
            setSelectedServiceId((id) => serviceId);
        } else if (selectedServiceId === serviceId) {
            setSelectedServiceId(null);
        }
    };

    return (
        <HorizontalWrapper>
            {showModal && <Modal onClose={closeModal} display="Services" />}

            {myServices ? (
                <Card>
                    <Greetings size="3rem">Mes Services</Greetings>

                    {myServices.map((serviceInformation) => (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                            key={serviceInformation.id}
                        >
                            <LinkComp
                                onClick={(e) =>
                                    handleServiceClick(serviceInformation.id)
                                }
                                id={serviceInformation.id}
                            >
                                <li>{serviceInformation.description} : </li>
                                <li>
                                    {serviceInformation.price} € -
                                    {serviceInformation.duration}H
                                </li>
                            </LinkComp>
                            {selectedServiceId === serviceInformation.id && (
                                <button
                                    onClick={deleteService}
                                    style={{
                                        marginLeft: "1rem",
                                    }}
                                    id={selectedServiceId}
                                >
                                    <BsFillTrash3Fill />
                                </button>
                            )}
                        </motion.div>
                    ))}

                    <button onClick={handleClick} type="submit">
                        ADD
                    </button>
                </Card>
            ) : (
                <Card>
                    <h1>No services yet...</h1>
                    <button onClick={handleClick} type="submit">
                        ADD
                    </button>
                </Card>
            )}
        </HorizontalWrapper>
    );
}

export default ServicesInfos;
