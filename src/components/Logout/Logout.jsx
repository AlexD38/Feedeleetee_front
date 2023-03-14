import React from "react";
import LogoutBtn from "../../styles/components/Logout.js";
import { Navigate, useNavigate } from "react-router-dom";

function Logout() {
	const navigate = useNavigate();
	const clearToken = () => {
		localStorage.clear();
		navigate("/login");
	};
	return (
		<>
			<LogoutBtn onClick={clearToken}>Log out</LogoutBtn>
		</>
	);
}
export default Logout;
