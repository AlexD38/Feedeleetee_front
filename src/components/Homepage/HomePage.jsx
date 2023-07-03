import Business from "../../styles/images/Business.jpg";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal.jsx";
import "../Homepage/index.css";
import { FaFacebook, FaPinterest, FaGooglePlus } from "react-icons/fa";
export function HomePage() {
    const [showbutton, setShowbutton] = useState(false);
    const [filter, setFilter] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const navigate = useNavigate();

    const showLoginbutton = () => {
        setTimeout(() => {
            setShowbutton(true);
            setFilter(true);
        }, "2000");
    };
    showLoginbutton();

    const navigateToLogin = () => {
        setShowLoginModal(true);
    };
    const navigateToSignup = () => {
        setShowSignupModal(true);
    };
    const body = document.querySelector("body");
    // body.style.overflow = "hidden";
    const closeModal = () => {
        setShowLoginModal(false);
        setShowSignupModal(false);
    };
    const changeDisplay = () => {
        if (showLoginModal) {
            setShowLoginModal(false);
            setShowSignupModal(true);
        } else {
            setShowLoginModal(true);
            setShowSignupModal(false);
        }
    };
    return (
        <>
            {showLoginModal && <Modal onClose={closeModal} display="Login" changeDisplay={changeDisplay}></Modal>}
            {showSignupModal && <Modal onClose={closeModal} display="Signup" changeDisplay={changeDisplay}></Modal>}
            <>
                <header>
                    <nav className="main-nav">
                        <h1>
                            {/* Hello, and Welcome to your{" "} */}
                            <span>Feedeleetee.</span>
                        </h1>
                        {showbutton && (
                            <div
                                className="login-btn-container
							">
                                <FaFacebook className="social-icon" />
                                <FaGooglePlus className="social-icon" />
                                <FaPinterest className="social-icon" />
                            </div>
                        )}
                    </nav>
                </header>
                <div className="img-container">
                    <div className="img-container-presentation">
                        <h2>Welcome Home.</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta autem quibusdam exercitationem ea eveniet consequatur quasi maiores, sit nisi aliquid. Odit accusantium, cupiditate reprehenderit cumque non a vitae totam vel.</p>
                        <div className="img-container-btn-container">
                            <button onClick={navigateToLogin}>Je suis client</button>
                            <button onClick={navigateToLogin}>Je suis une entreprise</button>
                        </div>
                    </div>

                    <img className="main-img" src={Business} alt="business picture for homepage" />
                </div>
                <section className="testimonial-section">
                    <p>"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo neque pariatur dolorem dolor fuga temporibus, ipsum, beatae incidunt architecto, esse voluptatem ab! Minus, sapiente asperiores eius quas veritatis expedita nam."</p>
                    <span>- Sophie</span>
                </section>
                <section className="services-section">
                    <h2>What do we do here ? </h2>
                    <section className="services-container">
                        <article className="main-card">
                            <header>
                                <img className="card-img" src="https://source.unsplash.com/400x300?meet" alt="" />
                            </header>
                            <h2 className="card-title">Relation</h2>
                            <p className="card-body">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut sint dolo. Lorem ipsum dolor sit, amet consectetur adipisicing elit. A</p>
                        </article>
                        <article className="main-card">
                            <header>
                                <img className="card-img" src="https://source.unsplash.com/400x300?communication" alt="" />
                            </header>
                            <h2 className="card-title">communication</h2>
                            <p className="card-body">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut sint doloribus voluptates eligendi eveniet ratione magnam rep</p>
                        </article>
                        <article className="main-card">
                            <header>
                                <img className="card-img" src="https://source.unsplash.com/400x300?work" alt="" />
                            </header>
                            <h2 className="card-title">Happiness</h2>
                            <p className="card-body">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut sint doloribus voluptates eligendi eveniet ratione magnam repellendus</p>
                        </article>
                    </section>
                </section>

                <section className="maps-section">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26457.17063880303!2d-118.27522464131278!3d34.014454675466894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2ced36d9d488f%3A0x90367e2eec330227!2sCookies%20Los%20Angeles!5e0!3m2!1sfr!2sfr!4v1688387642979!5m2!1sfr!2sfr" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    <aside className="maps-card">
                        <h4>Location</h4>
                        <p>East St. California, L.A.</p>
                    </aside>
                </section>
                <section className="contact-section">
                    <div className="left-contact">
                        <h5>Contactez-nous pour plus d'informations</h5>
                        <p>Remplissez ce formulaire pour nous dire tout ce qui vous passe par la tête !</p>
                    </div>
                    <div className="right-contact">
                        <form className="contact-form" action="">
                            <label htmlFor="mail">
                                <p className="mail-label">Mail</p>
                                <input id="mail" className="input-form" type="mail" />
                            </label>
                            <label htmlFor="name">
                                <p className="name-label">Name</p>
                                <input id="name" className="input-form" type="text" />
                            </label>
                            <label htmlFor="message">
                                <p className="message-label">Message</p>
                                <textarea id="message" className="input-form" rows="3" cols="60" />
                            </label>
                            <button type="submit">Envoyer</button>
                        </form>
                    </div>
                </section>
                <footer>
                    <p>Feedeleetee</p>
                    <p>2023</p>
                </footer>
            </>
        </>
    );
}
