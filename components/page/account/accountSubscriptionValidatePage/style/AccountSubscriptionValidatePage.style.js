import styled from "@emotion/styled";
import { variables } from "@/styles/styleUtils";

export const ValidateContainer = styled.div`
	background-color: ${props => props.background};
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 90%;
	max-width: 350px;
	@media screen and (max-width: ${variables.Screen_mobil}) {
		padding-top: 30px;
		position: static;
		transform: none;
		margin: auto;
	}
`;

export const ValidateIcon = styled.div`
	margin: auto;
	width: 120px;
	height: 120px;
	position: relative;
	border-radius: 50%;
	background-color: ${props => props.background};
	&:after {
		content: "";
		position: absolute;
		background-color: ${props => props.color};
		top: 50%;
		left: 50%;
		width: 20px;
		height: 4px;
		transform: translate(calc(-50% - 10px), calc(-50% + 5px)) rotate(45deg);
	}

	&:before {
		content: "";
		position: absolute;
		background-color: ${props => props.color};
		top: 50%;
		left: 50%;
		width: 40px;
		height: 4px;
		transform: translate(calc(-50% + 10px), -50%) rotate(-45deg);
	}
`;

export const ValidateText = styled.div`
	padding: 0 0 50px 0;
	@media screen and (max-width: ${variables.Screen_mobil}) {
		padding: 0 0 20px 0;
	}
`;

export const ErrorIcon = styled.div`
	margin: auto;
	width: 120px;
	height: 120px;
	position: relative;
	border-radius: 50%;
	background-color: ${props => props.background};
	&:after {
		content: "!";
		font-size: 50px;
		position: absolute;
		color: ${props => props.color};
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;
