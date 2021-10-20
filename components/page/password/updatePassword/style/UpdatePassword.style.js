import styled from "@emotion/styled";
import { variables } from "@/styles/styleUtils";

export const UpdatePasswordDetailContainer = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	padding: 65px 0px 0px;
	max-width: ${variables.maxWidthRestrain};
	margin: auto;
`;

export const FormUpdatePassword = styled.form`
	width: 100%;
`;

export const UpdatePasswordDetailTitle = styled.div`
	width: auto;
	margin-bottom: 20px;
	text-align: center;
`;

export const UpdatePasswordLabel = styled.label`
	padding-bottom: 10px;
`;

export const UpdatePasswordInputContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`;

export const UpdatePasswordError = styled.div`
	color: ${variables.Theme_01};
	display: inline;
	min-height: 22px;
`;

export const UpdatePasswordBtnContainer = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: row-reverse;
`;

export const UpdatePasswordBtn = styled.button`
	height: 46px;
	width: 160px;
	padding: 10px;
	border-radius: 12px;
	color: ${variables.Light_Label};
	font-size: 16px;
	font-weight: bold;
	text-align: center;
	cursor: pointer;
	border: none;
	flex: 1 1 160px;
	font-size: 16px;

	&:focus {
		outline: none;
	}

	&:first-of-type {
		margin: 10px 10px 10px 0;
		background-color: ${variables.Dark_02};
	}

	&:last-of-type {
		background-color: ${variables.Theme_01};
		margin: 10px 0px 10px 10px;
	}
`;
