import React, { useState } from "react";
import Form from "../../styles/components/form.js";
import Input from "../../styles/components/input.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Link from "../../styles/components/LinkComp";
import VerticalWrapper from "../../styles/components/verticalWrapper";
import qs from "qs";
import Greetings from "../../styles/components/Greetings.js";
import PropTypes from "prop-types";
import { FaRegEye } from "react-icons/fa";
import "../Login/index.css";
function LoginForm(props) {
    console.log(props);
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    // localStorage.clear();
    const [inputError, setInputError] = useState(false);

    const handleSubmit = async (event) => {
        const data = {
            mail,
            password,
        };

        const headers = {
            "Content-Type": "application/x-www-form-urlencoded",
        };

        console.log(data);
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:4000/login", qs.stringify(data), {
                headers,
            });
            console.log("reponse : ", response.data);

            if (response.data.error) {
                alert(response.data.error);
                setInputError(true);
                inputErrDisplay();
                return;
            }
            response.data.token = localStorage.setItem("token", response.data.token);
            response.data.userName = localStorage.setItem("user", response.data.userName);
            if (!response.data.enterpriseId) {
                navigate("/createenterprise");
                return;
            }

            if (response.data.authenticated) {
                if (props.navigate === "client") {
                    navigate("/myclientprofile");
                } else if (props.navigate === "enterprise") {
                    navigate("/myenterprise");
                }
            }
        } catch (error) {
            console.log(error);
            alert("erreur lors de la connexion");
        }
    };
    const showPwd = () => {
        const pwd = document.querySelector("#pwd");
        console.log(pwd);
        pwd.type = "text";
    };
    const hidePwd = (event) => {
        const pwd = document.querySelector("#pwd");
        console.log(pwd);
        pwd.type = "password";
    };
    const inputErrDisplay = (event) => {
        if (inputError) {
            const inputs = document.querySelectorAll("input");
            inputs.forEach((input) => {
                input.style.border = "3px solid red";
                // console.log(event.target.style);
                console.log(inputError);
            });
        }
    };
    inputErrDisplay();

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Greetings size="2rem">Identifiez-vous</Greetings>
                <label>e-mail :</label>
                <input required type="email" value={mail} pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$' onChange={(e) => setMail(e.target.value)} />
                <label>Mot de passe :</label>
                <input onBlur={hidePwd} pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,}$" id="pwd" required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <FaRegEye className="input-eye" onMouseEnter={showPwd} onMouseLeave={hidePwd} />
                <button type="submit">Me connecter</button>
                <VerticalWrapper>
                    <p>
                        Don't have an account yet ? <Link onClick={props.changeDisplay}>Create One</Link>{" "}
                    </p>
                </VerticalWrapper>
            </form>
        </>
    );
}
LoginForm.propTypes = {
    mail: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
};

export default LoginForm;
