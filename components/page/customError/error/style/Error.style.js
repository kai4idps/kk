import styled from "@emotion/styled";
import { variables } from "@/styles/styleUtils";

export const ErrorContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
	width: 90%;
	max-width: 400px;
	@media screen and (max-width: ${variables.Screen_mobil}) {
		padding-top: 30px;
		position: static;
		transform: none;
		margin: auto;
	}
`;

export const ErrordDetailTitle = styled.div`
	width: 100%;
	margin-bottom: 20px;
	color: ${variables.Light_Label};
`;
