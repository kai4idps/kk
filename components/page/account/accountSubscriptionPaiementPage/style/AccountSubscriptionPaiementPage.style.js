import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { variables } from "@/styles/styleUtils";

export const ColumnsContainer = styled.div`
	display: flex;
	padding: 40px 20px 40px 20px;
	align-items: center;
	@media screen and (max-width: ${variables.Screen_mobil}) {
		flex-direction: column-reverse;
		padding: 0;
	}
`;

export const LeftColumnContainer = styled.div`
	width: 50%;
	background-color: ${variables.White_color};
	margin-right: 10px;
	padding: 50px;
	border-radius: 10px;
	@media screen and (max-width: ${variables.Screen_mobil}) {
		width: 100%;
		margin-right: 0;
		border-radius: 0;
	}
`;

export const RightColumnContainer = styled.div`
	width: 50%;
	padding: 50px;
	@media screen and (max-width: ${variables.Screen_mobil}) {
		width: 100%;
		margin-left: 0;
	}
`;

export const SubscriptionContainer = styled.div`
	text-align: center;
`;

export const ButtonList = styled.div`
	padding-top: 20px;
	text-align: center;
	width: 80%;
	margin: auto;
	&.hidden {
		display: none;
	}

	@media screen and (max-width: ${variables.Screen_mobil}) {
		width: 100%;
	}
`;

export const EcpayContainer = styled.div`
	border-radius: 10px;
	overflow: hidden;
`;

export const EcpayContent = styled.div`
`;

const rotating = keyframes`
	from {
		-ms-transform: rotate(0deg);
		-moz-transform: rotate(0deg);
		-webkit-transform: rotate(0deg);
		-o-transform: rotate(0deg);
		transform: rotate(0deg);
	}

	to {
		-ms-transform: rotate(360deg);
		-moz-transform: rotate(360deg);
		-webkit-transform: rotate(360deg);
		-o-transform: rotate(360deg);
		transform: rotate(360deg);
	}
`

export const Spinner = styled.img`
	display: block;
	margin: auto;
	animation: ${rotating} 2s linear infinite;
`;

export const LoadingScreen = styled.div`
	display: ${props => props.visible ? "block" : "none"};
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(15,15,15,0.3);
	z-index: 20;
`;

export const LoadingScreenContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: #000000;
	padding: 20px 30px 30px 30px;
	border-radius: 70px;
`;

export const TvIcon = styled.div`
	margin: auto;
	width: 120px;
	height: 120px;
	position: relative;
	border-radius: 50%;
	background-color: ${props => props.background};
	svg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;

export const ColorSvg = styled.g`
	fill: ${props => props.fill};
`;

export const InformationDesktop = styled.div`
	@media screen and (max-width: ${variables.Screen_mobil}) {
		display: none;
	}
`;

export const InformationMobil = styled.div`
	display: none;
	padding: 20px;
	@media screen and (max-width: ${variables.Screen_mobil}) {
		display: block;
	}
`;

