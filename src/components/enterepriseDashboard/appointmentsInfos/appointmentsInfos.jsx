import axios from "axios";
import { useEffect, useState, useRef } from "react";
import VerticalWrapper from "../../../styles/components/verticalWrapper.js";
import Editbutton from "../../buttons/editBtn.jsx";
import Modal from "../.././Modal/Modal.jsx";
import moment from "moment";
import "moment/locale/fr";
import { BsFillTrash3Fill } from "react-icons/bs";
import "../appointmentsInfos/index.css";

function AppointmentsInfos(props) {
    const [myAppointments, setMyAppointments] = useState([]);
    const token = localStorage.getItem("token");
    const [showInput, setShowInput] = useState(false);
    const [showEditInput, setShowEditInput] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showbuttons, setShowbuttons] = useState(false);
    const [showValidate, setShowValidate] = useState(false);
    const [blur, setBlur] = useState(false);
    const [showTrashCan, setShowTrashCan] = useState(false);
    const [selectedAppId, setSelectedAppId] = useState(null);
    const enterpriseId = props.enterprise.id;
    // console.log(enterpriseId);

    // const day = myAppointments[0].day;
    // console.log(day.split("T")[0]);
    const dayRef = useRef(null);
    const timeRef = useRef(null);

    const headers = {
        token: token,
        enterpriseId,
    };

    useEffect(() => {
        async function fetchAppointments() {
            const response = await axios.get(`http://localhost:3000/enterprises/appointments`, { headers });
            setMyAppointments((myAppointments) => response.data);
            console.log(response.data);
        }
        fetchAppointments();
    }, [showModal]);
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
    const sendData = async (e) => {
        const data = {
            day: dayRef.current.value,
            timeOfDay: timeRef.current.value,
        };
        if (data.day === "" || data.timeOfDay === "") {
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:3000/enterprises/appointments`,
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
        const id = e.currentTarget.id;
        const headers = {
            token: token,
        };
        try {
            const response = await axios.delete(`http://localhost:3000/appointments/${id}`, {
                headers,
            });
            console.log(response.data.success);
            // create a new copy of myAppointments by filtering out the deleted appointment
            const updatedAppointments = myAppointments.filter((appointment) => appointment.id != id);
            // update the state with the new copy of myAppointments
            setMyAppointments(updatedAppointments);
        } catch (error) {
            console.error(error);
        }
    };
    const editAppointment = (e) => {
        myAppointments.forEach((appointment) => {
            const clickedElmId = +e.currentTarget.parentNode.id;
            if (+appointment.id === +e.currentTarget.parentNode.id) {
                if (!showEditInput) {
                    setShowEditInput(true);
                    setShowbuttons(false);
                    setShowValidate(true);
                    setShowInput(false);
                } else {
                    setShowEditInput(false);
                }
            }
        });
    };
    const updateData = () => {
        setShowbuttons(true);
        setShowValidate(false);
        setShowEditInput(false);
        setShowInput(true);

        console.log("update");
    };
    const closeModal = () => {
        setShowModal(false);
    };
    const handleAppointmentClick = (appId) => {
        if (selectedAppId != appId) {
            setSelectedAppId((id) => appId);
        } else if (selectedAppId === appId) {
            setSelectedAppId(null);
        }
    };
    return (
        <VerticalWrapper>
            {showModal && <Modal onClose={closeModal} display="Appointments" enterprise={enterpriseId} />}

            {myAppointments.length > 0 ? (
                <div className="card">
                    <h3>Mes rendez-vous</h3>

                    {myAppointments.map((myAppointment) => (
                        <div className="card-content" key={myAppointment.id}>
                            <ul>
                                <li className="appointment-infos" onClick={(e) => handleAppointmentClick(myAppointment.id)}>
                                    Le {moment(myAppointment.day).locale("fr").format("dddd DD MMMM YYYY")} à {myAppointment.time_of_day.includes(":") ? myAppointment.time_of_day.replace(":", "h") : myAppointment.time_of_day.concat("h")}
                                    {myAppointment.client_id ? (
                                        <li>
                                            (pris par {myAppointment.firstname} {myAppointment.lastname})
                                        </li>
                                    ) : (
                                        <></>
                                    )}
                                    {selectedAppId === myAppointment.id && (
                                        <button className="del-btn--appointment" onClick={deleteAppointment} id={selectedAppId}>
                                            {/* DELETE */}
                                            DELETE
                                        </button>
                                    )}
                                </li>
                            </ul>

                            {showbuttons && (
                                <>
                                    <Editbutton id={myAppointment.id} day={myAppointment.day} time_of_day={myAppointment.time_of_day} />
                                    <button>Delete</button>
                                </>
                            )}
                        </div>
                    ))}

                    <button onClick={handleClick} type="submit">
                        ADD
                    </button>
                </div>
            ) : (
                <div>
                    <h1>No Appointments...</h1>
                    <button onClick={handleClick} type="submit">
                        ADD
                    </button>
                </div>
            )}
        </VerticalWrapper>
    );
}

export default AppointmentsInfos;
