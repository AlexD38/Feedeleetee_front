import { useState } from "react";
import VerticalWrapper from "../../../styles/components/verticalWrapper.js";
import { motion } from "framer-motion";

export default function SingleCLient(props) {
  const [showCredentials, setShowCredentials] = useState(false);
  const handleClick = (e) => {
    if (!showCredentials) {
      setShowCredentials(true);
    } else {
      setShowCredentials(false);
    }
  };
  // console.log(props.client.id);
  return (
    <>
      <ul onClick={handleClick}>
        <li>{props.client.firstname}</li>
        <li>{props.client.lastname}</li>
        {showCredentials && (
          <VerticalWrapper>
            <motion.li
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {props.client.mail}
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {props.client.tel}
            </motion.li>
          </VerticalWrapper>
        )}
      </ul>
    </>
  );
}
