import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

function EnterpriseDashboard() {
  const [myEnterprise, setMyEnterprise] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [currentComponent, setCurrentComponent] = useState("Appointments");
  const [coloredNavlink, setColoredNavlink] = useState("white");
  const [modal, setModal] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
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
      const response = await axios.get("http://localhost:4000/enterprise/", {
        headers,
      });
      if (response.data[0]) {
        setMyEnterprise(response.data[0]);
        console.log(response.data[0]);
      } else if (enterpriseId) {
        // je renvoie au back enterprise Id pour qu'il le mette en arg ! si pas enterprise id, alors le prendre dans le local storage
        localStorage.removeItem("enterpriseId");
        return;
      } else {
        navigate("/createenterprise");
      }
    }
    fetchDashboard();
    // console.log(myEnterprise);
  }, []);
  const handleClick = (componentName) => {
    setColoredNavlink("white");
    setCurrentComponent(componentName);
    console.log(currentComponent);
  };
  const uploadLogo = async (e) => {
    e.preventDefault();
    if (logoFile) {
      // console.log(logoFile);
      const data = new FormData();
      const fileName = `${Date.now()}${logoFile.name}`;
      // console.log(fileName);
      data.append("name", fileName);
      data.append("logo", logoFile);
      data.fileName = fileName;
      data.file = logoFile;
      const headers = { token: token };
      try {
        const response = await axios.post("http://localhost:4000/logo", data, {
          headers,
        });
        console.log("response : ");
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
          <SideBar>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <VerticalWrapper>
                <Logo
                  src={`data:image/png;base64,${myEnterprise.logo}`}
                  alt="logo"
                />
                <form
                  //   action="/logo"
                  //   method="post"
                  encType="multipart/form-data"
                  onSubmit={uploadLogo}
                >
                  <input
                    onChange={(e) => setLogoFile(e.target.files[0])}
                    name="logo"
                    type="file"
                  />
                  <button type="submit">upload</button>
                </form>

                <EnterpriseName>{myEnterprise.name}</EnterpriseName>
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
                    onClick={(e) => handleClick(e.target.textContent)}
                    style={{
                      color:
                        currentComponent === "Coup d'oeil rapide"
                          ? "#eca869"
                          : "white",
                    }}
                  >
                    Coup d'oeil rapide
                  </LinkComp>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <LinkComp
                    onClick={(e) => handleClick(e.target.textContent)}
                    style={{
                      color:
                        currentComponent === "Appointments"
                          ? "#eca869"
                          : "white",
                    }}
                  >
                    Appointments
                  </LinkComp>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <LinkComp
                    onClick={(e) => handleClick(e.target.textContent)}
                    style={{
                      color:
                        currentComponent === "Clients" ? "#eca869" : "white",
                    }}
                  >
                    Clients
                  </LinkComp>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <LinkComp
                    onClick={(e) => handleClick(e.target.textContent)}
                    style={{
                      color:
                        currentComponent === "Offers" ? "#eca869" : "white",
                    }}
                  >
                    Offers
                  </LinkComp>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <LinkComp
                    onClick={(e) => handleClick(e.target.textContent)}
                    style={{
                      color:
                        currentComponent === "Services" ? "#eca869" : "white",
                    }}
                  >
                    Services
                  </LinkComp>
                </motion.div>
              </Navbar>
            </motion.aside>
            <Logout />
          </SideBar>
          {currentComponent === "Appointments" && <AppointmentsInfos />}
          {currentComponent === "Clients" && <ClientsInfos />}
          {currentComponent === "Offers" && <OffersInfos />}
          {currentComponent === "Services" && <ServicesInfos />}
          {currentComponent === "Coup d'oeil rapide" && <QuickView />}
        </>
      ) : (
        <>
          <LinkComp href="/createenterprise">
            You must create one first...
          </LinkComp>
        </>
      )}
    </>
  );
}

export default EnterpriseDashboard;
