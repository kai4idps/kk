import styled from "@emotion/styled";
import { variables } from "@/styles/styleUtils";

export const ResetPasswordDetailContainer = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	padding: 65px 0px 0px;
`;

export const ResetPasswordDetailTitle = styled.div`
	width: auto;
	margin-bottom: 20px;
	font-size: 22px;
	font-weight: bold;
	color: ${variables.Light_Label};
	text-align: center;
`;

export const ResetPasswordInputContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;

	h5 {
		color: ${variables.Light_Label};
	}
`;

export const ResetPasswordInput = styled.input`
	font-size: 20px;
	padding: 10px 20px;
	border-radius: 10px;
	border: none;
	width: 100%;
	display: block;
	margin: 6px 0 0;
	padding: 14px 40px 14px 14px;
	border-radius: 8px;
	/* border: ${({ hasError }) => (hasError ? "1px solid red" : null)}; */
	background-color: ${variables.Dark_Label};
	/* color: ${variables.Light_Label}; */

	&:focus {
		outline: none;
	}

	&:invalid {
		border: ${({ isSubmitting }) => (isSubmitting ? "1px solid red" : null)};
	}

	&:invalid:focus {
		border: ${({ isSubmitting }) => (isSubmitting ? "1px solid red" : null)};
	}
`;

export const ResetPasswordLabel = styled.div`
	color: ${variables.Theme_01};
	height: 20px;
	display: block;
`;
