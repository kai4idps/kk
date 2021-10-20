import styled from "@emotion/styled";
import { variables } from "@/styles/styleUtils";

export const Content = styled.div`
	margin: 0 ${variables.paddingMainContent} ${variables.paddingMainContent}
		${variables.paddingMainContent};

	@media screen and (max-width: ${variables.Screen_mobil}) {
		margin: 0 ${variables.paddingMainContentMobil}
			${variables.paddingMainContentMobil} ${variables.paddingMainContentMobil};
	}
`;
