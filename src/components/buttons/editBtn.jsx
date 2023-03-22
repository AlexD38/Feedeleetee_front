import Button from "../../styles/components/Button";
import React, { useState } from "react";
import Input from "../../styles/components/input";

function EditButton(props) {
  const [showInput, setShowInput] = useState(false);
  const handleClick = (e) => {
    // je passe l'id en props
    console.log(props.id);
    console.log(props.day);
    console.log(props.time);
    if (!showInput) {
      setShowInput(true);
    } else {
      setShowInput(false);
    }
    // je peux aussi réupérer l'id depuis le parentNode.id
    // console.log((e.currentTarget.parentNode.textContent = ""));
    // pour remplacer la donnée par l'input je la passe en props a l'enfant.
    // il faut que la donnée entière soit déclarée dans ce comp.
  };
  const validate = (e) => {
    //axios.update etc ....
    setShowInput(false);
  };
  const cancel = (e) => {
    setShowInput(false);
  };
  return (
    <>
      {" "}
      {showInput ? (
        <>
          <Input type="date"></Input>
          <Input type="text"></Input>
          <Button onClick={validate}>Valider</Button>
          <Button onClick={cancel}>Annuler</Button>
        </>
      ) : (
        <Button onClick={handleClick}>Edit</Button>
      )}
    </>
  );
}

export default EditButton;
