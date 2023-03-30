import Greetings from "../../styles/components/Greetings";
import ModalComp from "../../styles/components/Modal";

export default function Modal() {
	return (
		<ModalComp>
			{/* <Form> */}
			<Greetings>MODAL</Greetings>
			<label htmlFor="">OUi</label>
			<input type="text"></input>
			<label htmlFor="">NON</label>
			<input type="number"></input>
			<label htmlFor="">Maybe</label>
			<input type="date"></input>
			{/* </Form> */}
		</ModalComp>
	);
}
