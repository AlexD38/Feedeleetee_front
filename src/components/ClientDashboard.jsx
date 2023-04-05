import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { UNSAFE_NavigationContext, useNavigate } from "react-router-dom";
import Card from "../styles/components/card";
import Greetings from "../styles/components/Greetings";
import HorizontalWrapper from "../styles/components/HorizontalWrapper";
import InteractiveCard from "../styles/components/interactiveCard";
import Logo from "../styles/components/Logo.js";
import AppointmentsInfos from "./enterepriseDashboard/appointmentsInfos/appointmentsInfos";
import Modal from "./Modal/Modal";
import moment from "moment";
import "moment/locale/fr";
import Input from "../styles/components/input";
import SideBar from "../styles/layout/sideBar.js";
import VerticalWrapper from "../styles/components/verticalWrapper.js";
import CreateClient from "../components/CreateClientForm/CreateClient.jsx";
import { TakeAppointment } from "../components/TakeAppointment.jsx";

export function ClientDashboard() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [client, setClient] = useState([]);
  const [enterprises, setEnterprises] = useState([]);
  const [availableAppointments, setAvailableAppointments] = useState(false);
  const Navigate = useNavigate();
  const inputRef = useRef(null);

  const [clientId, setClientId] = useState(localStorage.getItem("clientId"));
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  useEffect(() => {
    async function fetchClient() {
      const headers = {
        token: token,
        clientId: +clientId,
      };
      console.log(headers);
      try {
        const response = await axios.get(`http://localhost:4000/clients`, {
          headers,
        });
        console.log(response.status);
        if (response.status === 200) {
          console.log(response.data[0]);
          setClient((client) => response.data[0]);
        } else if (clientId) {
          localStorage.removeItem("clientId");
        } else {
          Navigate(`/createclient`);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchClient();
    setDate(client.rdv);
  }, []);
  const handleChange = (e) => {
    if (inputRef.current.value.length > 0) {
      console.log(inputRef.current.value);
      console.log(inputRef.current.value.length);
      const fetchEnterprise = async () => {
        const headers = {
          token: token,
        };
        try {
          const response = await axios.get(
            "http://localhost:4000/enterprises",
            { headers }
          );
          // console.log(response.data.enterprises);
          setEnterprises((enterprise) => response.data.enterprises);
          console.log(enterprises);
        } catch (error) {
          console.log(error);
        }
      };
      fetchEnterprise();
    }
    if (inputRef.current.value.length < 1) {
      setEnterprises([]);
      // console.log("whattttttttttttttttttttttttt");
    }
  };
  const handleClick = () => {
    setAvailableAppointments(true);
  };

  return (
    <>
      {" "}
      {client ? (
        <>
          <Greetings>Bonjour {client.firstname}, </Greetings>
          <h1>Bienvenue sur votre espace client.</h1>
          <VerticalWrapper>
            <label htmlFor="searchbar">Chercher un entreprise : </label>
            <Input
              ref={inputRef}
              onChange={handleChange}
              id="searchbar"
              placeholder="chercher une entreprise"
            />
          </VerticalWrapper>
          {enterprises.length > 0 && (
            <>
              {enterprises.map((enterprise) => (
                <InteractiveCard onClick={handleClick}>
                  {enterprise.name}
                  {availableAppointments && (
                    <TakeAppointment id={enterprise.id} />
                  )}
                </InteractiveCard>
              ))}
            </>
          )}

          <SideBar>
            <>
              {client.rdv && client.rdv.length < 1 ? (
                <ul>
                  {" "}
                  <h1>Vos Rendez-vous :</h1>
                  {client.rdv.map((rdv, index) => (
                    <li key={index}>
                      {moment(rdv).locale("fr").format("dddd DD/MM/YYYY")}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Aucun rendez-vous pour le moment</p>
              )}
            </>
          </SideBar>
        </>
      ) : (
        <>
          <CreateClient />
        </>
      )}
    </>
  );
}
