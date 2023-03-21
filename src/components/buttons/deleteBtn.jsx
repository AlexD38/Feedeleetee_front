import Button from "../../styles/components/Button";
import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";

function DeleteBtn(props) {
  const handleClick = async (e) => {
    console.log(props.id);
    const data = {
      id: props.id,
    };

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      // passer le token pour vérification
    };

    // event.preventDefault();

    try {
      const response = await axios.delete(
        `http://localhost:4000/appointments/${props.id}`,
        qs.stringify(data),
        {
          headers,
        }
      );
      console.log(response.data.success);
    } catch (error) {
      console.log(error);
    }
  };

  return <Button onClick={handleClick}>Delete</Button>;
}

export default DeleteBtn;
