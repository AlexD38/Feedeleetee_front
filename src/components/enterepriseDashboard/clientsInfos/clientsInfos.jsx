import axios from "axios";
import { useEffect, useState } from "react";
import VerticalWrapper from "../../../styles/components/verticalWrapper.js";
import { motion } from "framer-motion";
import LinkComp from "../../../styles/components/LinkComp.js";
import SingleCLient from "./singleClient.jsx";
import Greetings from "../../../styles/components/Greetings.js";

function ClientsInfos(props) {
    const [myClients, setMyClients] = useState("");
    const token = localStorage.getItem("token");
    const [showCredentials, setShowCredentials] = useState(false);
    const enterpriseId = props.enterprise.id;

    useEffect(() => {
        async function fetchClients() {
            const headers = {
                token,
                enterpriseId,
            };
            const response = await axios.get(`http://localhost:4000/enterprises/clients`, { headers });
            setMyClients((myClients) => response.data);
        }
        fetchClients();
    }, [token]);

    return (
        <VerticalWrapper>
            {myClients ? (
                <div className="card">
                    <Greetings size="3rem">Mes Clients</Greetings>

                    {myClients.map((clientInformation) => (
                        <motion.ul initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }} key={clientInformation.id}>
                            <motion.li initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }} key={clientInformation.id}>
                                <LinkComp>
                                    <SingleCLient client={clientInformation} />
                                </LinkComp>
                            </motion.li>
                        </motion.ul>
                    ))}
                </div>
            ) : (
                <div className="card">
                    <h1>No clients yet ...</h1>
                </div>
            )}
        </VerticalWrapper>
    );
}

export default ClientsInfos;
