import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Card from "../../../styles/components/card.js";
import HorizontalWrapper from "../../../styles/components/HorizontalWrapper.js";
import Input from "../../../styles/components/input.js";
import VerticalWrapper from "../../../styles/components/verticalWrapper.js";
import EditSign from "../../editSign/EditSign.jsx";
import Button from "../../../styles/components/Button.js";
import { delay, motion } from "framer-motion";
import EditButton from "../../buttons/editBtn.jsx";
import Greetings from "../../../styles/components/Greetings.js";
import Modal from "../.././Modal/Modal.jsx";
import moment from "moment";
import "moment/locale/fr";

function AppointmentsInfos() {
  const [myAppointments, setMyAppointments] = useState([]);
  const token = localStorage.getItem("token");
  const [showInput, setShowInput] = useState(false);
  const [showEditInput, setShowEditInput] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showValidate, setShowValidate] = useState(false);
  const [blur, setBlur] = useState(false);
  // const day = myAppointments[0].day;
  // console.log(day.split("T")[0]);
  const dayRef = useRef(null);
  const timeRef = useRef(null);

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
      console.log(response.data);
    }
    fetchAppointments();
  }, []);
  const handleClick = (e) => {
    if (!showButtons) {
      setShowButtons(true);
      setShowModal(true);
      setShowInput(true);
    } else {
      setShowButtons(false);
      setShowInput(false);
      setShowEditInput(false);
    }
  };
  const sendData = async (e) => {
    const data = {
      day: dayRef.current.value,
      timeOfDay: timeRef.current.value,
    };
    if (data.day === "" || data.timeOfDay === "") {
      return;
    }

    const headers = {
      token,
    };
    try {
      const response = await axios.post(
        `http://localhost:4000/enterprises/appointments`,
        { data },
        {
          headers,
        }
      );
      console.log(response.data);
      console.log(response.data.success);
      setMyAppointments([...myAppointments, response.data.results]);
    } catch (error) {
      console.log(error);
    }
    dayRef.current.value = "";
    timeRef.current.value = "";
  };
  const deleteAppointment = async (e) => {
    console.log(e.currentTarget.parentNode);
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
  const editAppointment = (e) => {
    myAppointments.forEach((appointment) => {
      console.log(appointment.id);
      console.log("XXXXXXXX", e.currentTarget.parentNode.id);
      const clickedElmId = +e.currentTarget.parentNode.id;
      console.log(typeof clickedElmId);
      if (+appointment.id === +e.currentTarget.parentNode.id) {
        if (!showEditInput) {
          setShowEditInput(true);
          setShowButtons(false);
          setShowValidate(true);
          setShowInput(false);
        } else {
          setShowEditInput(false);
        }
      }
    });
  };
  const updateData = () => {
    setShowButtons(true);
    setShowValidate(false);
    setShowEditInput(false);
    setShowInput(true);

    console.log("update");
  };
  const closeModal = () => {
    setShowModal(false);
  };
  console.log(AppointmentsInfos);

  return (
    <VerticalWrapper>
      {showModal && <Modal onClose={closeModal} />}

      {myAppointments ? (
        <Card>
          <Greetings size="3rem">Mes rendez-vous</Greetings>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            onClick={handleClick}
          >
            <EditSign />
          </motion.div>

          {myAppointments.map((myAppointment) => (
            <HorizontalWrapper key={myAppointment.id}>
              <motion.h3 id={myAppointment.id}>
                <motion.ul
                  transition={{
                    type: "spring",
                    bounce: 0,
                    duration: 0.7,
                    delayChildren: 0.3,
                    staggerChildren: 0.05,
                  }}
                >
                  {/* <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  > */}
                  <motion.li
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.2,
                    }}
                  >
                    Le{" "}
                    {moment(myAppointment.day)
                      .locale("fr")
                      .format("dddd DD MMMM YYYY")}{" "}
                    à{" "}
                    {myAppointment.time_of_day.includes(":")
                      ? myAppointment.time_of_day.replace(":", "h")
                      : myAppointment.time_of_day.concat("h")}
                    {myAppointment.client_id ? (
                      <motion.li
                        initial={{ opacity: 0, x: 0 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        (pris par {myAppointment.firstname}{" "}
                        {myAppointment.lastname})
                      </motion.li>
                    ) : (
                      <></>
                    )}
                  </motion.li>
                  {/* </motion.p> */}
                </motion.ul>

                {showButtons && (
                  <>
                    <EditButton
                      id={myAppointment.id}
                      day={myAppointment.day}
                      time_of_day={myAppointment.time_of_day}
                    />
                    <Button onClick={deleteAppointment}>Delete</Button>
                  </>
                )}
              </motion.h3>
            </HorizontalWrapper>
          ))}
          {showInput && (
            <motion.form
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Input type="date" ref={dayRef}></Input>
              <Input type="time" min="1" ref={timeRef} />
            </motion.form>
          )}

          {showButtons && (
            <Button onClick={sendData} type="submit">
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
