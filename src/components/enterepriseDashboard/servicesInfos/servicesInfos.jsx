import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../../styles/components/card.js";
import VerticalWrapper from "../../../styles/components/verticalWrapper.js";
import { motion } from "framer-motion";

function ServicesInfos() {
  const [myServices, setMyServices] = useState("");
  const token = localStorage.getItem("token");
  useEffect(() => {
    async function fetchServices() {
      const headers = {
        token: token,
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
  }, [token]);

  return (
    <VerticalWrapper>
      {myServices ? (
        <Card>
          <h1>My services</h1>
          {myServices.map((serviceInformation) => (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              key={serviceInformation.id}
            >
              <p>
                {serviceInformation.description} : {serviceInformation.price} €
              </p>
            </motion.div>
          ))}
        </Card>
      ) : (
        <Card>
          <h1>No services yet...</h1>
        </Card>
      )}
    </VerticalWrapper>
  );
}

export default ServicesInfos;
