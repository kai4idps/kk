import styled from "@emotion/styled";
import { variables } from "@/styles/styleUtils";

export const ContentText = styled.div`
	padding: 40px 65px 0 65px;
	@media screen and (max-width: ${variables.Screen_tablet}) {
		padding: 40px 0px 0 0px;
	}
`;
