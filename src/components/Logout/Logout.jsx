import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();

    const clearToken = () => {
        localStorage.clear();
        navigate("/");
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
