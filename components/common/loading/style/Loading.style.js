import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

export const LoadingSuperContainer = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: ${props => props.background};
`;

export const LoadingContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-20px, -20px);
	background-color: ${props => props.background};
	border-radius: 10px;
	width: 48px;
	height: 48px;
`;

const rotating = keyframes`
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
`;

export const Spinner = styled.img`
	display: block;
	animation: ${rotating} 2s linear infinite;
	margin: 25% auto 25% auto;
`;
