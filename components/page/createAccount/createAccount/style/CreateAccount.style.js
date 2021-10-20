import styled from "@emotion/styled";
import { variables } from "@/styles/styleUtils";

export const CreateAccountSuperContainer = styled.div`
	padding: 65px 0px 0px;
`;

export const CreateAccountContainer = styled.div`
	margin: auto;
	max-width: 350px;
`;

export const CreateAccountForm = styled.form``;

export const CreateAccountTitle = styled.div`
	width: auto;
	margin-bottom: 20px;
	text-align: center;
`;

export const CreateAccountLabel = styled.label`
	padding-bottom: 10px;
`;

export const CreateAccountInputContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`;

export const CreateAccountError = styled.div`
	color: ${variables.Theme_01};
	min-height: 22px;
	display: block;
`;

export const CreateAccountSubContent = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: auto;
	flex: 1;
`;

export const CreateAccountText = styled.div`
	color: ${variables.Light_Label};
	cursor: pointer;
	font-size: 14px;
`;

export const CreateAccountDivider = styled.div`
	display: flex;
	align-items: center;
	text-align: center;
	color: ${variables.Light_Tertiary};
	padding: 20px 0px;

	&::before,
	&::after {
		content: "";
		flex: 1;
		border-bottom: 1px solid ${variables.Dark_Secondary};
	}

	&::before {
		margin-right: 15px;
	}
	&::after {
		margin-left: 15px;
	}
`;

export const CreateAccountGoogleBtn = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding: 10px;
	border-radius: 10px;
	border: 1px solid ${variables.Light_Label};
	width: 100%;
	height: 100%;
	cursor: pointer;
`;

export const ImageBlock = styled.div`
	flex: 0 1 30px;
`;

export const CreateAccountGoogleIcon = styled.div`
	background-image: url("/images/Icons/icons8-google.svg");
	height: 30px;
	background-size: contain;
`;

export const CreateAccountGoogleText = styled.div`
	color: ${variables.Light_Label};
	margin-left: 10px;
`;
