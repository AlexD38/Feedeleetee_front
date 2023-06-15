import React, { useRef, useState } from "react";
import Input from "../../styles/components/input";
import axios from "axios";

function Editbutton(props) {
    const [showInput, setShowInput] = useState(false);
    const token = localStorage.getItem("token");
    const dayRef = useRef(null);
    const timeRef = useRef(null);
    const [appointment, setAppointment] = useState({});
    const handleClick = (e) => {
        // je passe l'id en props
        console.log(props.id);
        console.log(props.day);
        console.log(props.time_of_day);
        console.log(Object.keys(props));
        if (!showInput) {
            setShowInput(true);
        } else {
            setShowInput(false);
        }
    };
    const validate = async (e) => {
        const appointmentId = props.id;
        const dayField = Object.keys(props)[1];
        const timeField = Object.keys(props)[2];
        const dayValue = dayRef.current.value;
        const timeValue = timeRef.current.value;
        const data = {
            day: { field: dayField, value: dayValue },
            time: { field: timeField, value: timeValue },
            appointmentId,
        };
        const headers = {
            token,
        };

        if (dayRef != null) {
            const dayRefArray = dayRef.current.value.split("");
            if (dayRefArray.length === 0) {
                console.log("you need to fill up the blank for day input");
                return;
            } else {
                const timeRefArray = timeRef.current.value.split("");
                if (timeRefArray.length < 2) {
                    console.log("you need to fill up the blank for time input");
                } else {
                    try {
                        const response = await axios.patch(
                            `http://localhost:4000/appointments/${appointmentId}`,
                            { data },
                            { headers }
                        );
                        console.log(response.data.tableUpdated);
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        }

        // console.log(appointment);
        setShowInput(false);
    };

    const cancel = (e) => {
        setShowInput(false);
    };

    const updateDataFromChildComponent = (e) => {
        if (dayRef.current.value != "") {
            e.currentTarget.parentNode.firstChild.textContent = `Le ${dayRef.current.value} à : ${timeRef.current.value}`;
        } else {
            cancel();
        }
    };
    return (
        <>
            {" "}
            {showInput ? (
                <>
                    <Input ref={dayRef} type="date"></Input>
                    <Input ref={timeRef} type="text"></Input>
                    <button
                        onClick={(e) => {
                            validate();
                            updateDataFromChildComponent(e);
                        }}
                    >
                        Valider
                    </button>
                    <button onClick={cancel}>Annuler</button>
                </>
            ) : (
                <button onClick={handleClick}>Edit</button>
            )}
        </>
    );
}

export default Editbutton;
