import axios from "axios";
import { useEffect, useState, useReducer } from "react";
import { Link } from "react-router-dom";
import LinkComp from "../../../styles/components/LinkComp.js";
import Card from "../../../styles/components/card.js";
import HorizontalWrapper from "../../../styles/components/HorizontalWrapper.js";
import Input from "../../../styles/components/input.js";
import VerticalWrapper from "../../../styles/components/verticalWrapper.js";
import DeleteSign from "../../deleteSign/deleteSign.jsx";
import EditSign from "../../editSign/EditSign.jsx";
import Button from "../../../styles/components/Button.js";
import { motion } from "framer-motion";
import DeleteBtn from "../../buttons/deleteBtn.jsx";
function AppointmentsInfos() {
  const [myAppointments, setMyAppointments] = useState([]);
  const token = localStorage.getItem("token");
  const [showInput, setShowInput] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    async function fetchAppointments() {
      const headers = {
        token: token,
      };
      const response = await axios.get(
        `http://localhost:4000/enterprises/appointments`,
        { headers }
      );
      setMyAppointments((myAppointments) => response.data);
      //   console.log(response.data);
    }
    fetchAppointments();
  }, [token]);
  const handleClick = (e) => {
    if (!showButtons) {
      setShowButtons(true);
    } else {
      setShowButtons(false);
      setShowInput(false);
    }
  };
  const showAddInput = () => {
    if (!showInput) {
      setShowInput(true);
    } else {
      setShowInput(false);
    }
  };
  const deleteAppointment = async (e) => {
    console.log(e.currentTarget.parentNode.id);
    console.log(myAppointments);
    const id = e.currentTarget.parentNode.id;
    const headers = {
      token: token,
    };
    try {
      const response = await axios.delete(
        `http://localhost:4000/appointments/${id}`,
        {
          headers,
        }
      );
      console.log(response.data.success);
      // create a new copy of myAppointments by filtering out the deleted appointment
      const updatedAppointments = myAppointments.filter(
        (appointment) => appointment.id != id
      );
      // update the state with the new copy of myAppointments
      setMyAppointments(updatedAppointments);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <VerticalWrapper>
      <motion.h1
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        My Appointments
      </motion.h1>{" "}
      {myAppointments ? (
        <Card>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            onClick={handleClick}
          >
            <EditSign />
          </motion.div>

          {myAppointments.map((myAppointment) => (
            <HorizontalWrapper key={myAppointment.id}>
              <motion.h3
                id={myAppointment.id}
                // whileHover={{ scale: 1.1 }}
                // initial={{ opacity: 0, scale: 0.5 }}
                // animate={{ opacity: 1, scale: 1 }}
                // transition={{ duration: 0.3 }}
              >
                Le {myAppointment.day} à : {myAppointment.time_of_day}
                {showButtons && (
                  <>
                    <Button>Edit</Button>
                    <Button
                      onClick={deleteAppointment}
                      //   id={myAppointment.id}
                      //   deleteAppointment={deleteAppointment}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </motion.h3>
              {myAppointment.client_id ? (
                <h3>
                  - Rdv pris par {myAppointment.firstname}{" "}
                  {myAppointment.lastname}
                </h3>
              ) : (
                <></>
              )}
            </HorizontalWrapper>
          ))}
          {showInput && (
            <motion.form
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              action="submit"
            >
              <Input type="date"></Input>
              <Input type="text" min="1" />
            </motion.form>
          )}

          {showButtons && (
            <Button onClick={showAddInput} type="submit">
              ADD
            </Button>
          )}
        </Card>
      ) : (
        <Card>
          <h1>No Appointments...</h1>
        </Card>
      )}
    </VerticalWrapper>
  );
}

export default AppointmentsInfos;
