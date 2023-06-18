import ModalComp from "../../styles/components/Modal";
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
                        <button onClick={closeModal}>+</button>
                        <AddAppointments onClose={closeModal} />
                    </>
                )}
                {props.display === "Offers" && (
                    <>
                        <button onClick={closeModal}>+</button>
                        <AddOffers onClose={closeModal} />
                    </>
                )}
                {props.display === "Services" && (
                    <>
                        <button onClick={closeModal}>+</button>
                        <AddServices onClose={closeModal} />
                    </>
                )}
                {props.display === "Login" && (
                    <>
                        <button onClick={closeModal}>+</button>
                        <Login
                            onClose={closeModal}
                            changeDisplay={changeDisplay}
                        />
                    </>
                )}
                {props.display === "Signup" && (
                    <>
                        <button onClick={closeModal}>+</button>
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
