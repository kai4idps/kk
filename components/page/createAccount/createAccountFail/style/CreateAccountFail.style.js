import styled from "@emotion/styled";
import { variables } from "@/styles/styleUtils";

export const CreateAccountFailContainer = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	padding: 65px 0px 0px;
`;

export const CreateAccountFailBlock = styled.div`
	max-width: 360px;
`;

export const CreateAccountFaildDetailTitle = styled.div`
	width: auto;
	margin-bottom: 20px;
	font-size: 22px;
	font-weight: bold;
	color: ${variables.Light_Label};
	text-align: center;
`;
