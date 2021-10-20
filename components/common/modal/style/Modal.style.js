import styled from "@emotion/styled";

export const ModalOverLay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: ${props => props.background}60;
	z-index: 1050;
`;
export const ModalWrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1050;
	width: 100%;
	height: 100%;
	overflow-x: hidden;
	overflow-y: auto;
	outline: 0;
	display: flex;
	align-items: center;
`;

export const ModalContainer = styled.div`
	z-index: 105;
	background: ${props => props.background};
	position: relative;
	margin: 0 auto;
	width: 420px;
	max-width: 90%;
	min-height: 225px;
	padding: ${props => props.padding};
	border-radius: 8px;
	transition: all 0.3s ease-out;
	display: flex;
	flex-direction: column;
`;

export const ModalFooterSingle = styled.div`
	margin: auto 0 0 0;
`;

export const ModalFooter = styled.div`
	margin: auto 0 0 auto;
`;
