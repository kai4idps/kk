import styled from "@emotion/styled";
import { variables } from "@/styles/styleUtils";

export const SubFooterSuperContainer = styled.div`
	background-color: ${props => props.background};
	padding: 0 ${variables.paddingMainContent} 10px
		${variables.paddingMainContent};
	width: 100%;
	text-align: center;
`;

export const SubFooterContainer = styled.div`
	max-width: ${variables.maxWidthRestrain};
	margin: auto;
`;
