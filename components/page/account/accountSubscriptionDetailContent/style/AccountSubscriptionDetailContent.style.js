import styled from "@emotion/styled";
import { variables } from "@/styles/styleUtils";

export const AccountSubscriptionContainer = styled.div`
	display: inline-block;
`;
export const AccountSubscriptionText = styled.div`
	color: ${variables.Light_02};
	margin-right: 10px;
	font-size: 16px;
	display: inline-block;
	h3 {
		padding: 5px;
	}
`;

export const AccountSubscriptionRedText = styled.div`
	color: ${variables.Theme_01};
	font-size: 16px;
	cursor: pointer;
`;
