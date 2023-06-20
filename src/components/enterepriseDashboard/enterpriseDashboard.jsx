import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Logout from "../Logout/Logout.jsx";
import ClientsInfos from "./clientsInfos/clientsInfos.jsx";
import ServicesInfos from "./servicesInfos/servicesInfos.jsx";
import OffersInfos from "./offersInfos/OffersInfos.jsx";
import AppointmentsInfos from "./appointmentsInfos/appointmentsInfos.jsx";
import LinkComp from "../../styles/components/LinkComp.js";
import SideBar from "../../styles/layout/sideBar.js";
import Logo from "../../styles/components/Logo.js";
import Navbar from "../../styles/components/navbar.js";
import EnterpriseName from "../../styles/components/EnterpriseName.js";
import { motion } from "framer-motion";
import VerticalWrapper from "../../../src/styles/components/verticalWrapper.js";
import QuickView from "./QuickView/QuickView.jsx";
import CreateEnterpriseForm from "../CreateEnterpriseFrom/CreateEnterpriseFrom.jsx";

function EnterpriseDashboard() {
    const [myEnterprise, setMyEnterprise] = useState("");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [currentComponent, setCurrentComponent] = useState("Appointments");
    // const [coloredNavlink, setColoredNavlink] = useState("");
    const [modal, setModal] = useState(false);
    const [logoFile, setLogoFile] = useState(null);
    const [showUploadInput, setShowUploadInput] = useState(false);
    const [enterpriseId, setEnterpriseId] = useState(
        localStorage.getItem("enterpriseId")
    );

    useEffect(() => {
        async function fetchDashboard() {
            const headers = {
                token: token,
                enterpriseId: enterpriseId,
            };
            console.log(headers);
            const response = await axios.get(
                "http://localhost:4000/enterprise/",
                {
                    headers,
                }
            );
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
        // setColoredNavlink("");
        setCurrentComponent(componentName);
        console.log(currentComponent);
    };
    const uploadLogo = async (e) => {
        e.preventDefault();
        if (logoFile) {
            console.log("uplaoaded");
            const data = new FormData();
            const fileName = `${Date.now()}${logoFile.name}`;
            // console.log(fileName);
            data.append("name", fileName);
            data.append("logo", logoFile);
            data.fileName = fileName;
            data.file = logoFile;
            const headers = { token, enterpriseId };
            try {
                const response = await axios.post(
                    "http://localhost:4000/logo",
                    data,
                    {
                        headers,
                    }
                );
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
            {" "}
            {myEnterprise.name ? (
                <>
                    <SideBar>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <VerticalWrapper>
                                <Logo
                                    onClick={
                                        showUploadInput
                                            ? () => setShowUploadInput(false)
                                            : () => setShowUploadInput(true)
                                    }
                                    src={`data:image/png;base64,${myEnterprise.logo}`}
                                    alt="logo"
                                />
                                {showUploadInput && (
                                    <form
                                        //   action="/logo"
                                        //   method="post"
                                        encType="multipart/form-data"
                                        onSubmit={uploadLogo}
                                    >
                                        <motion.input
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            onChange={(e) =>
                                                setLogoFile(e.target.files[0])
                                            }
                                            name="logo"
                                            type="file"
                                        />
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            <button type="submit">
                                                upload
                                            </button>
                                        </motion.div>
                                    </form>
                                )}

                                <EnterpriseName>
                                    {myEnterprise.name}
                                </EnterpriseName>
                            </VerticalWrapper>
                        </motion.div>
                        <motion.aside
                            initial={{ y: -300 }}
                            animate={{ y: 0 }}
                            // whileHover={{ scale: 1.1 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                            }}
                        >
                            <Navbar>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <LinkComp
                                        onClick={(e) =>
                                            handleClick(e.target.textContent)
                                        }
                                    >
                                        Coup d'oeil rapide
                                    </LinkComp>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <LinkComp
                                        onClick={(e) =>
                                            handleClick(e.target.textContent)
                                        }
                                    >
                                        Appointments
                                    </LinkComp>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <LinkComp
                                        onClick={(e) =>
                                            handleClick(e.target.textContent)
                                        }
                                    >
                                        Clients
                                    </LinkComp>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <LinkComp
                                        onClick={(e) =>
                                            handleClick(e.target.textContent)
                                        }
                                    >
                                        Offers
                                    </LinkComp>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <LinkComp
                                        onClick={(e) =>
                                            handleClick(e.target.textContent)
                                        }
                                    >
                                        Services
                                    </LinkComp>
                                </motion.div>
                            </Navbar>
                        </motion.aside>
                        <Logout linkTo="home" />
                    </SideBar>
                    <motion.header
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        // whileHover={{ scale: 1.1 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                        }}
                    ></motion.header>
                    {currentComponent === "Appointments" && (
                        <AppointmentsInfos />
                    )}
                    {currentComponent === "Clients" && <ClientsInfos />}
                    {currentComponent === "Offers" && <OffersInfos />}
                    {currentComponent === "Services" && <ServicesInfos />}
                    {currentComponent === "Coup d'oeil rapide" && <QuickView />}
                </>
            ) : (
                <>
                    <CreateEnterpriseForm />
                </>
            )}
        </>
    );
}

export default EnterpriseDashboard;
