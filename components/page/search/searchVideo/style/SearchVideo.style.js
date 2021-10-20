import styled from "@emotion/styled";
import { variables } from "@/styles/styleUtils";

export const SearchVideoContainer = styled.div`
	min-height: calc(
		100vh - ${variables.headerHeight} - ${variables.footerHeight} -
			${variables.paddingMainContent}
	);
	display: flex;
	flex-direction: column;
	@media screen and (max-width: ${variables.Screen_tablet}) {
		min-height: calc(
			100vh - ${variables.headerHeight} - ${variables.footerHeightMobil} -
				${variables.paddingMainContent}
		);
	}
`;

export const SearchVideoList = styled.div`
	padding: 30px 0;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: 100%;
`;

export const SearchVideoBox = styled.div`
	width: 20%;
	padding: 0 10px 40px 0;

	&:nth-of-type(5n) {
		padding-right: 0;
	}

	@media screen and (max-width: ${variables.Screen_Medium}) {
		width: 25%;
		&:nth-of-type(5n) {
			padding-right: 10px;
		}

		&:nth-of-type(4n) {
			padding-right: 0px;
		}
	}

	@media screen and (max-width: ${variables.Screen_small}) {
		width: 33.333%;
		&:nth-of-type(4n) {
			padding-right: 10px;
		}

		&:nth-of-type(3n) {
			padding-right: 0px;
		}
	}

	@media screen and (max-width: ${variables.Screen_tablet}) {
		width: 50%;
		&:nth-of-type(3n) {
			padding-right: 10px;
		}

		&:nth-of-type(2n) {
			padding-right: 0px;
		}
	}

	@media screen and (max-width: ${variables.Screen_mobil}) {
		width: 100%;
		padding-right: 0;
	}
`;

export const SearchVideoImg = styled.div`
	background-image: url(${props => props.url});
	background-size: cover;
	position: relative;
	display: inline-block;
	width: 100%;
	height: 170px;
	border-radius: 4px;
`;

export const SearchVideoText = styled.div`
	font-size: 16px;
	color: ${variables.Light_02};
`;

export const SearchVideoTextContainer = styled.div`
	width: 100%;
	padding: 0 0 30px 0;

	@media screen and (max-width: ${variables.Screen_tablet}) {
		padding: 0 0 10px 0;
	}
`;

export const SearchVideoEmptyText = styled.div`
	font-size: 16px;
	color: ${variables.Light_05};
	max-width: 200px;
	margin: auto;
`;
