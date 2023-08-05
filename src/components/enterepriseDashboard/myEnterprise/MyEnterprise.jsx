import { useState, useRef } from "react";
import axios from "axios";

import "../myEnterprise/index.css";
export default function (props) {
    const [myEnterprise, setMyEnterprise] = useState(props.enterprise);
    const [showUploadInput, setShowUploadInput] = useState(false);
    const [logoFile, setLogoFile] = useState(null);
    const token = localStorage.getItem("token");
    const [showInput, setShowInput] = useState(false);
    const nameRef = useRef(null);
    const addressRef = useRef(null);
    const descriptionRef = useRef(null);

    const showInputToModify = () => {
        showInput ? setShowInput(false) : setShowInput(true);
        showUploadInput ? setShowUploadInput(false) : setShowUploadInput(true);
    };
    const uploadLogo = async (e) => {
        e.preventDefault();
        if (logoFile) {
            console.log("uplaoaded");
            const data = new FormData();
            const fileName = `${Date.now()}${logoFile.name}`;
            data.append("name", fileName);
            data.append("logo", logoFile);
            data.fileName = fileName;
            data.file = logoFile;
            const headers = { token };
            try {
                const response = await axios.post("http://localhost:3000/logo", data, {
                    headers,
                });
                console.log("response : ");
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("no file to upload");
        }
    };
    const handleClick = async () => {
        showInputToModify();
        try {
            const id = myEnterprise.id;
            console.log(id);
            const headers = {
                token: token,
            };
            const name = nameRef.current.value;
            const address = addressRef.current.value;
            const description = descriptionRef.current.value;
            const data = {
                name,
                address,
                description,
            };
            console.log(data);
            if (name.length > 0 && address.length > 0 && description.length > 0) {
                const response = await axios.patch(`http://localhost:3000/enterprises/${id}`, { data }, { headers });
                console.log(response.data);
                if (response) {
                    console.log(response);
                }
                props.onUpdate(name, address, description);
                myEnterprise.name = name;
                myEnterprise.address = address;
                myEnterprise.description = description;
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };

    console.log(myEnterprise);
    return (
        <>
            {" "}
            {showInput ? (
                <>
                    <label>Name : </label>
                    <input ref={nameRef} placeholder={myEnterprise.name}></input>
                    <label>Address : </label>
                    <input ref={addressRef} placeholder={myEnterprise.address}></input>
                    <label>Description : </label>
                    <textarea ref={descriptionRef} placeholder={myEnterprise.description}></textarea>
                </>
            ) : (
                <>
                    <h3>{myEnterprise.name}</h3>
                    <p className="address">{myEnterprise.address}</p>
                    <p className="description">Description : {myEnterprise.description}</p>
                </>
            )}
            <img className="enterprise-logo" src={`data:image/png;base64,${myEnterprise.logo}`} alt="logo" />
            {showUploadInput && (
                <form encType="multipart/form-data" onSubmit={uploadLogo}>
                    <label>Logo : </label>
                    <input onChange={(e) => setLogoFile(e.target.files[0])} name="logo" type="file" />

                    <button type="submit">Upload New Logo</button>
                </form>
            )}
            {showUploadInput ? <button onClick={handleClick}>Confirmer Changements</button> : <button onClick={handleClick}>Modifier</button>}
        </>
    );
}
