import styled from "@emotion/styled";
import { variables } from "@/styles/styleUtils";

export const FooterContainer = styled.div`
	background-color: ${props => props.background};
	margin: auto 0 0 0;
	padding: 10px ${variables.paddingMainContent} 20px
		${variables.paddingMainContent};
	min-height: ${variables.footerHeight};
	@media screen and (max-width: ${variables.Screen_mobil}) {
		min-height: ${variables.footerHeightMobil};
		padding: 15px ${variables.paddingMainContentMobil} 15px
			${variables.paddingMainContentMobil};
	}
`;

export const FooterTextContainer = styled.div`
	display: inline-block;
	max-width: calc(100% - 100px);
	@media screen and (max-width: ${variables.Screen_tablet}) {
		max-width: none;
	}
`;

export const FooterCompany = styled.div`
	display: inline-block;
	padding-top: 10px;
	@media screen and (max-width: ${variables.Screen_tablet}) {
		max-width: calc(100% - 100px);
		
	}

	@media screen and (max-width: ${variables.Screen_mobil}) {
		padding-top: 0px;
	}
`;

export const FooterLinks = styled.div`
	display: inline-block;
	vertical-align: top;
	padding-top: 10px;
	@media screen and (max-width: ${variables.Screen_tablet}) {
		display: block;

	}
`;

export const FooterSecretContainer = styled.div`
	position: absolute;
	left: ${variables.paddingMainContent};
	top: 15px;
`;

export const SecretContent = styled.div`
	background-color: ${variables.Dark_03};
	border-radius: 4px;
	overflow: hidden;
	position: absolute;
	display: ${props => props.isVisible};
	bottom: 100%;
	left: ${variables.paddingMainContent};
`;

export const FooterThemeContainer = styled.div`
	position: absolute;
	right: calc(${variables.paddingMainContent} + 150px);
	top: 15px;
	@media screen and (max-width: ${variables.Screen_tablet}) {
		top: 15px;
		right: calc(${variables.paddingMainContent} + 100px);
	}
`;

export const ThemeText = styled.div`
	color: ${variables.Light_02};
	padding: 10px;
	text-align: left;
	cursor: pointer;
	&:hover {
		background-color: ${variables.Light_04};
	}
`;

export const ThemeContent = styled.div`
	background-color: ${variables.Dark_03};
	border-radius: 4px;
	overflow: hidden;
	position: absolute;
	display: ${props => props.isVisible};
	width: 90px;
	bottom: 30px;
	right: 10px;
`;

export const FooterLangContainer = styled.div`
	position: absolute;
	right: ${variables.paddingMainContent};
	top: 15px;
	@media screen and (max-width: ${variables.Screen_tablet}) {
		top: 15px;
	}
`;

export const LangText = styled.div`
	color: ${variables.Light_02};
	padding: 10px;
	text-align: left;
	cursor: pointer;
	&:hover {
		background-color: ${variables.Light_04};
	}
`;

export const LangContent = styled.div`
	background-color: ${variables.Dark_03};
	border-radius: 4px;
	overflow: hidden;
	position: absolute;
	display: ${props => props.isVisible};
	width: 90px;
	bottom: 30px;
	right: 10px;
	min-height: 20px;
`;
