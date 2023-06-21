import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../Logout/Logout.jsx";
import ClientsInfos from "./clientsInfos/clientsInfos.jsx";
import ServicesInfos from "./servicesInfos/servicesInfos.jsx";
import OffersInfos from "./offersInfos/OffersInfos.jsx";
import AppointmentsInfos from "./appointmentsInfos/appointmentsInfos.jsx";
import QuickView from "./QuickView/QuickView.jsx";

function EnterpriseDashboard() {
    const [myEnterprise, setMyEnterprise] = useState("");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [currentComponent, setCurrentComponent] = useState("Appointments");
    const [modal, setModal] = useState(false);
    const [logoFile, setLogoFile] = useState(null);
    const [showUploadInput, setShowUploadInput] = useState(false);
    const [enterpriseId, setEnterpriseId] = useState(localStorage.getItem("enterpriseId"));

    useEffect(() => {
        async function fetchDashboard() {
            const headers = {
                token: token,
                enterpriseId: enterpriseId,
            };
            console.log(headers);
            const response = await axios.get("http://localhost:4000/enterprise/", {
                headers,
            });
            if (response.data[0]) {
                setMyEnterprise(response.data[0]);
                console.log(response.data[0]);
                localStorage.setItem("enterpriseId", response.data[0].id);
            }
        }
        fetchDashboard();
        console.log(myEnterprise);
    }, []);
    const handleClick = (componentName) => {
        setCurrentComponent(componentName);
        console.log(currentComponent);
    };
    const uploadLogo = async (e) => {
        e.preventDefault();
        if (logoFile) {
            console.log("uplaoaded");
            const data = new FormData();
            const fileName = `${Date.now()}${logoFile.name}`;
            data.append("name", fileName);
            data.append("logo", logoFile);
            data.fileName = fileName;
            data.file = logoFile;
            const headers = { token, enterpriseId };
            try {
                const response = await axios.post("http://localhost:4000/logo", data, {
                    headers,
                });
                console.log("response : ");
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("no file to upload");
        }
    };
    return (
        <>
            {myEnterprise.name && (
                <>
                    <nav>
                        <img className="logo" onClick={showUploadInput ? () => setShowUploadInput(false) : () => setShowUploadInput(true)} src={`data:image/png;base64,${myEnterprise.logo}`} alt="logo" />
                        {showUploadInput && (
                            <form encType="multipart/form-data" onSubmit={uploadLogo}>
                                <input onChange={(e) => setLogoFile(e.target.files[0])} name="logo" type="file" />

                                <button type="submit">upload</button>
                            </form>
                        )}

                        <h1 className="enterprise-name">
                            <span>{myEnterprise.name}</span>
                        </h1>
                        <ul>
                            <li onClick={(e) => handleClick(e.target.textContent)}>Coup d'oeil rapide</li>
                            <li onClick={(e) => handleClick(e.target.textContent)}>Appointments</li>
                            <li onClick={(e) => handleClick(e.target.textContent)}>Clients</li>
                            <li onClick={(e) => handleClick(e.target.textContent)}>Offers</li>
                            <li onClick={(e) => handleClick(e.target.textContent)}>Services</li>{" "}
                        </ul>
                        <Logout linkTo="home" />
                    </nav>
                    {currentComponent === "Appointments" && <AppointmentsInfos />}
                    {currentComponent === "Clients" && <ClientsInfos />}
                    {currentComponent === "Offers" && <OffersInfos />}
                    {currentComponent === "Services" && <ServicesInfos />}
                    {currentComponent === "Coup d'oeil rapide" && <QuickView enterprise={myEnterprise} />}
                </>
            )}
        </>
    );
}

export default EnterpriseDashboard;
