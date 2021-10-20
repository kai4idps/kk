import styled from "@emotion/styled";
import { variables } from "@/styles/styleUtils";

export const ResetPasswordSuccessContainer = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	padding: 65px 0px 0px;
`;

export const ResetPasswordSuccessBlock = styled.div`
	max-width: 390px;
`;

export const ResetPasswordSuccessdDetailTitle = styled.div`
	width: auto;
	margin-bottom: 20px;
	font-size: 22px;
	font-weight: bold;
	color: ${variables.Light_Label};
	text-align: center;
`;
