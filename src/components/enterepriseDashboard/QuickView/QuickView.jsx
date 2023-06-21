import { useState, useEffect } from "react";
import HorizontalWrapper from "../../../styles/components/HorizontalWrapper";
import axios from "axios";
import NextAppointments from "../../nextAppointments/nextAppointments";
import Greetings from "../../../styles/components/Greetings";
import "../QuickView/index.css";

// Universal
function QuickView(props) {
    const token = localStorage.getItem("token");
    const enterpriseId = localStorage.getItem("enterpriseId");
    const [quickView, setQuickView] = useState([]);

    useEffect(() => {
        async function fetchQuickView() {
            const headers = {
                token: token,
                enterpriseId: enterpriseId,
            };
            const response = await axios.get(`http://localhost:4000/quickview`, { headers });
            if (response.status === 200) {
                setQuickView((quickView) => response.data);
                setQuickView(response.data);
            }
        }
        fetchQuickView();
    }, []);
    console.log(props.enterprise);

    return (
        <>
            {quickView && (
                <main className="quickview__container">
                    <div className="quickview__title">
                        {" "}
                        {/* <Greetings>{quickView.username},</Greetings> */}
                        <h1>
                            <span>Coup d'oeil sur votre entreprise</span>
                        </h1>{" "}
                    </div>
                    <div className="quickview__body">
                        <div className="quickview__body--left">
                            {quickView.number_of_services > 0 ? (
                                <div className="quickview__card">
                                    <div className="card__number">
                                        <span>{quickView.number_of_services}</span>
                                    </div>
                                    <p>services</p>
                                </div>
                            ) : (
                                <h3>aucun service </h3>
                            )}
                            {quickView.number_of_offers > 0 ? (
                                <div className="quickview__card">
                                    <div className="card__number">
                                        <span>{quickView.number_of_offers}</span>
                                    </div>
                                    <p>offres</p>
                                </div>
                            ) : (
                                <h3> aucune offre et</h3>
                            )}
                            {quickView.number_of_clients > 0 ? (
                                <>
                                    <div className="quickview__card">
                                        {" "}
                                        <div className="card__number">
                                            <span>{quickView.number_of_clients}</span>
                                        </div>
                                        <p>clients</p>
                                    </div>
                                    <NextAppointments />
                                </>
                            ) : (
                                <h2> vous n'avez pas encore de clients</h2>
                            )}
                        </div>
                        <div className="quickview__body--right">
                            <div className="quickview__card quickview__card--summary">
                                <img className=" logo card__logo" src={`data:image/png;base64,${props.enterprise.logo}`} alt="logo" />
                                <p className="card__title">{props.enterprise.name}</p>
                                <p className="card__address">{props.enterprise.address}</p>
                                <p className="card__description">{props.enterprise.description}</p>
                            </div>
                        </div>
                    </div>
                </main>
            )}
        </>
    );
}

export default QuickView;
