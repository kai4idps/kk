import styled from "@emotion/styled";
import { variables } from "@/styles/styleUtils";

export const SigninContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding-top: 65px;
	max-width: ${variables.maxWidthRestrain};
	margin: auto;
`;

export const SignInForm = styled.form`
	width: 100%;
`;

export const SigninTitle = styled.div`
	width: auto;
	margin-bottom: 20px;
	text-align: center;
`;

export const SignInLabel = styled.label`
	padding-bottom: 10px;
`;

export const SigninInputContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`;

export const SigninError = styled.div`
	color: ${variables.Theme_01};
	min-height: 22px;
	display: block;
`;

export const SigninSubContent = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: auto;
	flex: 1;
	margin-top: 5px;
	width: 100%;
`;

export const SigninDivider = styled.div`
	display: flex;
	align-items: center;
	text-align: center;
	color: ${variables.Light_Tertiary};
	padding: 20px 0px;
	width: 100%;

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

export const SigninGoogleBtn = styled.div`
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

export const SigninGoogleIcon = styled.div`
	background-image: url("/images/Icons/icons8-google.svg");
	height: 30px;
	background-size: contain;
`;

export const SigninGoogleText = styled.div`
	color: ${variables.Light_Label};
	margin-left: 10px;
`;
