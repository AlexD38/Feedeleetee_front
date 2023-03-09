import React, { useState } from "react";
import Button from "../../styles/components/Button.js";
import Form from "../../styles/components/form.js";
import Input from "../../styles/components/input.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Link from "../../styles/components/Link";

import qs from "qs";

function Signup() {
  const [userName, setUserName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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

      // Redirection vers la page de login
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Erreur lors de la création de l'utilisateur");
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <label>
          <Input
            type="text"
            required
            placeholder="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <label>
          <Input
            type="email"
            required
            placeholder="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
        </label>
        <label>
          <Input
            type="text"
            required
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <Button type="submit">Créer un compte</Button>
        <p>
          Already have an account ?{" "}
          <Link href="http://localhost:3000/login">Log in</Link>{" "}
        </p>
      </Form>
    </>
  );
}

export default Signup;
