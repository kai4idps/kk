import styled from "@emotion/styled";
import { variables } from "@/styles/styleUtils";

export const ForgotPasswordContainer = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	padding: 65px 0px 0px;
	max-width: 360px;
	margin: auto;
`;

export const ForgotPasswordTitle = styled.div`
	margin-bottom: 20px;
	text-align: center;
`;

export const FormForgotPassword = styled.form``;

export const ForgotPasswordLabel = styled.label`
	padding-bottom: 10px;
`;

export const ForgotPasswordInputContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	max-width: 360px;
	margin-top: 10px;
`;

export const ForgotPasswordError = styled.div`
	color: ${variables.Theme_01};
	min-height: 22px;
	display: block;
`;
