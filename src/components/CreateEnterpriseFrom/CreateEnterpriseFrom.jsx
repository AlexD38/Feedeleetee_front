import Button from "../../styles/components/Button";
import Form from "../../styles/components/form";
import Input from "../../styles/components/input";

function CreateEnterprise() {
	return (
		<>
			<Form>
				<label>
					Nom de l'entreprise :
					<Input />
				</label>

				<Button type="submit">Créer mon entreprise</Button>
			</Form>
		</>
	);
}

export default CreateEnterprise;
