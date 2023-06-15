import Greetings from "../../styles/components/Greetings";
import ModalComp from "../../styles/components/Modal";
import Input from "../../styles/components/input";
import CloseButton from "../../styles/components/CloseBtn";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import AddAppointments from "../enterepriseDashboard/appointmentsInfos/addAppointments";
import { AddOffers } from "../enterepriseDashboard/offersInfos/AddOffers";
import { AddServices } from "../enterepriseDashboard/servicesInfos/addServices";
import Login from "../Login/LoginForm.jsx";
import SignUp from "../SignUp/SignUp.jsx";

export default function Modal(props) {
    const dayRef = useRef(null);
    const timeRef = useRef(null);

    const closeModal = () => {
        props.onClose();
    };
    const changeDisplay = () => {
        props.changeDisplay();
    };

    return (
        <div className="modal" style={{ position: "relative" }}>
            <ModalComp>
                {props.display === "Appointments" && (
                    <>
                        <CloseButton onClick={closeModal}>+</CloseButton>
                        <AddAppointments onClose={closeModal} />
                    </>
                )}
                {props.display === "Offers" && (
                    <>
                        <CloseButton onClick={closeModal}>+</CloseButton>
                        <AddOffers onClose={closeModal} />
                    </>
                )}
                {props.display === "Services" && (
                    <>
                        <CloseButton onClick={closeModal}>+</CloseButton>
                        <AddServices onClose={closeModal} />
                    </>
                )}
                {props.display === "Login" && (
                    <>
                        <CloseButton onClick={closeModal}>+</CloseButton>
                        <Login
                            onClose={closeModal}
                            changeDisplay={changeDisplay}
                        />
                    </>
                )}
                {props.display === "Signup" && (
                    <>
                        <CloseButton onClick={closeModal}>+</CloseButton>
                        <SignUp
                            onClose={closeModal}
                            changeDisplay={changeDisplay}
                        />
                    </>
                )}
            </ModalComp>
        </div>
    );
}
