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
    const enterpriseId = props.enterprise;
    console.log(enterpriseId);

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
                        <button className="close-btn" onClick={closeModal}>
                            close
                        </button>
                        <AddAppointments enterprise={enterpriseId} onClose={closeModal} />
                    </>
                )}
                {props.display === "Offers" && (
                    <>
                        <button className="close-btn" onClick={closeModal}>
                            close
                        </button>
                        <AddOffers enterprise={enterpriseId} onClose={closeModal} />
                    </>
                )}
                {props.display === "Services" && (
                    <>
                        <button className="close-btn" onClick={closeModal}>
                            close
                        </button>
                        <AddServices enterprise={enterpriseId} onClose={closeModal} />
                    </>
                )}
                {props.display === "Login" && (
                    <>
                        <button className="close-btn" onClick={closeModal}>
                            close
                        </button>
                        <Login onClose={closeModal} changeDisplay={changeDisplay} />
                    </>
                )}
                {props.display === "Signup" && (
                    <>
                        <button className="close-btn" onClick={closeModal}>
                            close
                        </button>
                        <SignUp onClose={closeModal} changeDisplay={changeDisplay} />
                    </>
                )}
            </ModalComp>
        </div>
    );
}
