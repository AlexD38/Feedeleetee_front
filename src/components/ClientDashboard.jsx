import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Greetings from "../styles/components/Greetings";
import moment from "moment";
import "moment/locale/fr";
import VerticalWrapper from "../styles/components/verticalWrapper.js";
import CreateClient from "../components/CreateClientForm/CreateClient.jsx";
import { TakeAppointment } from "../components/TakeAppointment.jsx";
import LinkComp from "../styles/components/LinkComp";
import Card from "../styles/components/card";
export function ClientDashboard() {
    const token = localStorage.getItem("token");
    const [user, setUser] = useState(localStorage.getItem("user"));
    const [client, setClient] = useState([]);
    const [enterprises, setEnterprises] = useState([]);
    const [availableAppointments, setAvailableAppointments] = useState(false);
    const Navigate = useNavigate();
    const inputRef = useRef(null);
    const [clientId, setClientId] = useState(localStorage.getItem("clientId"));
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
    const [selectedEnterpriseId, setSelectedEnterpriseId] = useState(null);

    useEffect(() => {
        async function fetchClient() {
            const headers = {
                token: token,
                clientId: +clientId,
            };
            // console.log(headers);
            try {
                const response = await axios.get(
                    `http://localhost:4000/clients`,
                    {
                        headers,
                    }
                );
                console.log(response.data[0]);
                if (response.data[0] != undefined) {
                    console.log(response.data[0]);
                    setClient((client) => response.data[0]);
                    setClientId((clientId) => response.data[0].id);
                } else {
                    Navigate(`/createclient`);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchClient();
        setDate(client.rdv);
    }, [selectedEnterpriseId]);
    const handleClick = (e) => {
        const fetchEnterprise = async () => {
            const headers = {
                token: token,
            };
            try {
                const response = await axios.get(
                    "http://localhost:4000/enterprises",
                    {
                        headers,
                    }
                );
                // console.log(response.data.enterprises);
                setEnterprises((enterprise) => response.data.enterprises);
            } catch (error) {
                console.log(error);
            }
        };
        fetchEnterprise();

        setEnterprises([]);
    };
    const showAppointments = (e, entId) => {
        setSelectedEnterpriseId((id) => entId);
        console.log(selectedEnterpriseId);
    };
    // console.log(enterprises);

    return (
        <>
            {" "}
            {client ? (
                <>
                    <Greetings>Bonjour {client.firstname}, </Greetings>
                    <h1>Bienvenue sur votre espace client.</h1>

                    <div className="card">
                        {client.rdv && client.rdv[0] != null ? (
                            <ul>
                                {" "}
                                <h3>Voici vos prochains rendez-vous :</h3>
                                {client.rdv.map((rdv, index) => (
                                    <li
                                        key={index}
                                        style={{
                                            color: "#eca869",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {moment(rdv)
                                            .locale("fr")
                                            .format("dddd DD MMMM YYYY")}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p style={{ color: "#eca869" }}>
                                Aucun rendez-vous pour le moment
                            </p>
                        )}
                    </div>
                    <button onClick={handleClick}>
                        Prenez votre prochain rdv
                    </button>
                    {enterprises && (
                        <>
                            {enterprises.map((enterprise) => (
                                <LinkComp
                                    onClick={(e) =>
                                        showAppointments(e, enterprise.id)
                                    }
                                >
                                    {" "}
                                    {enterprise.name}
                                    <VerticalWrapper>
                                        <img
                                            style={{
                                                maxHeight: "3rem",
                                                borderRadius: "50%",
                                                aspectRatio: "1 / 1",
                                                objectFit: "cover",
                                                margin: "1rem 0 2.5rem",
                                            }}
                                            src={`data:image/png;base64,${enterprise.logo}`}
                                        ></img>
                                    </VerticalWrapper>
                                </LinkComp>
                            ))}
                            {selectedEnterpriseId && (
                                <TakeAppointment id={selectedEnterpriseId} />
                            )}
                        </>
                    )}
                </>
            ) : (
                <>
                    <CreateClient />
                </>
            )}
        </>
    );
}
