import { useEffect, useState } from "react";
import axios from "axios";
import InteractiveCard from "../styles/components/interactiveCard";
import Button from "../styles/components/Button";
import HorizontalWrapper from "../styles/components/HorizontalWrapper";
import moment from "moment";
import "moment/locale/fr";
import CloseBtn from "../styles/components/CloseBtn.js";
import Card from "../styles/components/card";
import LinkComp from "../styles/components/LinkComp";

export function TakeAppointment(props) {
  const token = localStorage.getItem("token");
  let enterpriseId = localStorage.getItem("enterpriseId") || props.id;
  const [showBtns, setShowBtns] = useState(false);

  const [availableAppointments, setAvailableAppointments] = useState([]);
  const [showAppointments, setShowAppointments] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [clientId, setClientId] = useState(props.clientId);

  useEffect(() => {
    async function fetchAvailableAppointmentsFromEnterprise() {
      const headers = {
        token: token,
      };
      try {
        const response = await axios.get(
          `http://localhost:4000/enterprises/${enterpriseId}/appointments`,
          { headers }
        );
        console.log(response.data);
        setAvailableAppointments(response.data);
      } catch (error) {
        console.error(error);
        // handle error
      }
    }
    fetchAvailableAppointmentsFromEnterprise();
  }, []);

  const handleConfirm = (appointmentId) => {
    console.log(`confirming appointment id#${appointmentId}`);
    const InsertClientIntoAppointment = async () => {
      try {
        const headers = {
          token: token,
        };
        const response = await axios.patch(
          `http://localhost:4000/appointments/${appointmentId}`,
          {},
          { headers }
        );

        alert("Votre rendez-vous à bien été pris");
        console.log(response);
      } catch (error) {
        console.error(error);
        // handle error
      }
    };
    InsertClientIntoAppointment();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      {availableAppointments.map((appointment) => (
        <LinkComp
          key={appointment.id}
          onClick={() => handleConfirm(appointment.id)}
        >
          <ul id={appointment.id}>
            <li>
              {" "}
              {moment(appointment.day)
                .locale("fr")
                .format("dddd DD/MM/YYYY")}{" "}
              {appointment.time_of_day}
            </li>
          </ul>
        </LinkComp>
      ))}
    </>
  );
}
// export default TakeAppointment;
