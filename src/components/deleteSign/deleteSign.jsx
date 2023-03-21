import DeleteSignIcon from "../../styles/components/deleteSign.js";

function DeleteSign() {
	const deleteAction = (e) => {
		console.log(e.currentTarget.parentNode);
		e.currentTarget.parentNode.remove();
	};
	return (
		<DeleteSignIcon
			onClick={deleteAction}
			version="1.1"
			id="Capa_1"
			fill="CurrentColor"
			height="20"
			width="20"
			viewBox="0 0 485 485">
			<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
			<g
				id="SVGRepo_tracerCarrier"
				strokeLinecap="round"
				strokeLinejoin="round"></g>
			<g id="SVGRepo_iconCarrier">
				{" "}
				<g>
					{" "}
					<g>
						{" "}
						<rect
							x="67.224"
							width="350.535"
							height="71.81"></rect>{" "}
						<path d="M417.776,92.829H67.237V485h350.537V92.829H417.776z M165.402,431.447h-28.362V146.383h28.362V431.447z M256.689,431.447 h-28.363V146.383h28.363V431.447z M347.97,431.447h-28.361V146.383h28.361V431.447z"></path>{" "}
					</g>{" "}
				</g>{" "}
			</g>
		</DeleteSignIcon>
	);
}

export default DeleteSign;
