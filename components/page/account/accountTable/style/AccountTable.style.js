import styled from "@emotion/styled";
import { variables } from "@/styles/styleUtils";

export const AccountSubscriptionContainer = styled.div`
	@media screen and (max-width: ${variables.Screen_tablet}) {
		display: none;
	}
`;

export const AccountSubscriptionContainerMobil = styled.div`
	display: none;
	@media screen and (max-width: ${variables.Screen_tablet}) {
		display: block;
	}
`;

export const AccountSubscriptionTitle = styled.div`
	padding-bottom: 20px;
`;

export const AccountSubscriptionElement = styled.div`
	border-top: 1px solid ${variables.Light_Tertiary};
	padding-bottom: 10px;
	&:last-of-type {
		border-bottom: 1px solid ${variables.Light_Tertiary};
	}
`;

export const Table = styled.table`
	color: #fff;
	min-width: 100%;
	border-collapse: collapse;
`;

export const Thread = styled.thead`
`;

export const Tr = styled.tr`
`;

export const Th = styled.th`
	padding: 15px;
	border-bottom: 1px solid ${variables.Light_05};
	text-align: left;
	@media screen and (max-width: ${variables.Screen_tablet}) {
		padding: 20px 0 10px 0;
		border-bottom: none;
	}
`;

export const Td = styled.td`
	padding: 15px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	@media screen and (max-width: ${variables.Screen_tablet}) {
		padding: 0 0 10px 0;
		border-bottom: none;
	}
`;

export const Tbody = styled.tbody`
`;
