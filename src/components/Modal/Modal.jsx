import Greetings from "../../styles/components/Greetings";
import ModalComp from "../../styles/components/Modal";
import Input from "../../styles/components/input";
import Button from "../../styles/components/Button";
import CloseButton from "../../styles/components/CloseBtn";
import { useNavigate } from "react-router-dom";

export default function Modal() {
	const navigate = useNavigate();
	const closeModal = () => {
		document.querySelector(".modal").style.display = "none";
		navigate("/myenterprise");
	};
	return (
		<div className="modal" style={{ position: "relative" }}>
			<ModalComp>
				<CloseButton onClick={closeModal}>+</CloseButton>
				<Greetings>Ajouter un rendez-vous</Greetings>
				<label htmlFor="">DATE</label>
				<Input type="date"></Input>
				<label htmlFor="">HEURE</label>
				<Input type="number"></Input>

				<Button>Ajouter</Button>
			</ModalComp>
		</div>
	);
}
