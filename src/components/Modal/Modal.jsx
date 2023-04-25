import Greetings from "../../styles/components/Greetings";
import ModalComp from "../../styles/components/Modal";
import Input from "../../styles/components/input";
import Button from "../../styles/components/Button";
import CloseButton from "../../styles/components/CloseBtn";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import AddAppointments from "../enterepriseDashboard/appointmentsInfos/addAppointments";
import { AddOffers } from "../enterepriseDashboard/offersInfos/AddOffers";
import { AddServices } from "../enterepriseDashboard/servicesInfos/addServices";
import Login from "../Login/LoginForm.jsx";

export default function Modal(props) {
  const dayRef = useRef(null);
  const timeRef = useRef(null);

  console.log(props.display);

  const closeModal = () => {
    props.onClose();
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
            {/* <CloseButton onClick={closeModal}>+</CloseButton> */}
            <Login onClose={closeModal} />
          </>
        )}
      </ModalComp>
    </div>
  );
}
