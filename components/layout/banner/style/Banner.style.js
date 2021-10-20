import styled from "@emotion/styled";
import { variables } from "@/styles/styleUtils";

export const BannerContainer = styled.div`
	background-color: ${props => props.background};
	width: 100%;
	padding: 30px ${variables.paddingMainContent} 30px ${variables.paddingMainContent};
	@media screen and (max-width: ${variables.Screen_mobil}) {
		padding: 30px ${variables.paddingMainContentMobil} 30px ${variables.paddingMainContentMobil};
	}
`;
