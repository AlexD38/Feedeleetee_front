import React, { useState } from "react";
import Button from "../../styles/components/Button.js";
import axios from "axios";
import qs from "qs";
import styled from "styled-components";

// Create a styled form
const Form = styled.form`
  background-color: none;
  color: grey;
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Login() {
  const [userName, setUserName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    const data = {
      userName,
      mail,
      password,
    };

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    console.log(userName, mail, password);
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/users",
        qs.stringify(data),
        {
          headers,
        }
      );
      const message = response.data.message;
      console.log(message);
    } catch (error) {
      console.log(error);
      alert("Erreur lors de la création de l'utilisateur");
    }
  };

  // console.log("token");

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <label>
          Pseudo :
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <label>
          mail :
          <input
            type="text"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
        </label>
        <label>
          pwd :
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <Button type="submit">Créer un compte</Button>
      </Form>
      <p>
        Already have an account ?{" "}
        <a href="http://localhost:4000/login">Login</a>{" "}
      </p>
    </>
  );
}

export default Login;
