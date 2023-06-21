import React from "react";
import { useNavigate } from "react-router-dom";

function Logout(props) {
    const navisvgate = useNavigate();

    const clearToken = () => {
        if (props.linkTo === "home") {
            navisvgate(`/${props.linkTo}`);
        } else if (props.linkTo === "") {
            navisvgate(`/${props.linkTo}`);
            localStorage.clear();
        }
    };
    return (
        <>
            <button className="logout-btn-dashboard" onClick={clearToken}>
                Log out
            </button>
            {/* <LosvgoutBtn onClick={clearToken}>Losvg out</LosvgoutBtn> */}
        </>
    );
}
export default Logout;
