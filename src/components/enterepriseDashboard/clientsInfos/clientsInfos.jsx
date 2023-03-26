import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../../styles/components/card.js";
import VerticalWrapper from "../../../styles/components/verticalWrapper.js";
import { motion } from "framer-motion";
import LinkComp from "../../../styles/components/LinkComp.js";
import SingleCLient from "./singleClient.jsx";

function ClientsInfos() {
  const [myClients, setMyClients] = useState("");
  const token = localStorage.getItem("token");
  const [showCredentials, setShowCredentials] = useState(false);

  useEffect(() => {
    async function fetchClients() {
      const headers = {
        token: token,
      };
      const response = await axios.get(
        `http://localhost:4000/enterprises/clients`,
        { headers }
      );
      setMyClients((myClients) => response.data);
    }
    fetchClients();
  }, [token]);

  return (
    <VerticalWrapper>
      {myClients ? (
        <Card>
          <h3>My Clients List</h3>
          {myClients.map((clientInformation) => (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              key={clientInformation.id}
            >
              <motion.li
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                key={clientInformation.id}
              >
                <LinkComp>
                  <SingleCLient client={clientInformation} />
                </LinkComp>
              </motion.li>
            </motion.ul>
          ))}
        </Card>
      ) : (
        <Card>
          <h1>No clients yet ...</h1>
        </Card>
      )}
    </VerticalWrapper>
  );
}

export default ClientsInfos;
