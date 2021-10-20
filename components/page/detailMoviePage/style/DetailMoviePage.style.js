import styled from "@emotion/styled";
import { variables } from "@/styles/styleUtils";

const paddingTopHd = "240px";
const paddingTop = "200px";
const paddingTopTablet = "152px";
const paddingTopMobil = "386px";

export const DetailMovieSuperContainer = styled.div`
	position: relative;
`;

export const BackgroundContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: calc(100vh - ${variables.headerHeight});
	width: 100%;
	overflow: hidden;
`;

export const TopBackground = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-image: url("${props => props.image}");
	background-size: cover;
	background-position: top center;
	filter: blur(6px);
  	-webkit-filter: blur(6px);

	@media screen and (max-width: ${variables.Screen_mobil}) {
		filter: blur(0px);
  		-webkit-filter: blur(0px);
	}
`;

export const DetailMovieContainerRadientBackground = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: linear-gradient(
		180deg, 
		${props => props.background}33,
		${props => props.background}BD,
		${props => props.background}
	);

	@media screen and (max-width: ${variables.Screen_tablet}) {
		background: linear-gradient(
			180deg, 
			${props => props.background}1A,
			${props => props.background}33,
			${props => props.background}
		);
	}

	@media screen and (max-width: ${variables.Screen_mobil}) {
		background: linear-gradient(
			180deg, 
			${props => props.background}33,
			${props => props.background}BD 50%
			${props => props.background} 25%,
		);
	}
`;

export const PlayerContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: #000000;
	z-index: 1100;
`;

export const DetailMovieContainer = styled.div``;

export const DetailMovieColums = styled.div`
	padding-top: ${paddingTopHd};
	@media screen and (max-width: ${variables.Screen_Medium}) {
		padding-top: ${paddingTop};
	}

	@media screen and (max-width: ${variables.Screen_tablet}) {
		padding-top: ${paddingTopTablet};
	}

	@media screen and (max-width: ${variables.Screen_mobil}) {
		padding-top: ${paddingTopMobil};
	}
`;

export const DetailMoviePicture = styled.div`
	width: 100%;
	background-image: url("${props => props.image}");
	background-size: cover;
	border-radius: 20px;
	margin-right: 50px;
	height: 100%;
	margin-bottom: 20px;
	height: 270px;

	@media screen and (max-width: ${variables.Screen_Medium}) {
		height: 214px;
	}
	
	@media screen and (max-width: ${variables.Screen_tablet}) {
		margin-bottom: 10px;
		height: 240px;
	}
`;

export const DetailMovieLeft = styled.div`
	width: 480px;
	margin-right: 50px;
	display: inline-block;
	@media screen and (max-width: ${variables.Screen_Medium}) {
		width: 380px;
	}

	@media screen and (max-width: ${variables.Screen_tablet}) {
		display: block;
		width: 320px;
	}

	@media screen and (max-width: ${variables.Screen_mobil}) {
		display: none;
		width: 100%;
		&:before {
			width: 100%;
		    height: 0;
		    padding-top: 56.25%;
		    content: "";
		    display: block;
		}
	}
`;

export const ButtonList = styled.div`
	display: none;
	width: 100%;
	button {
		width: calc(50% - 5px);
	}

	@media screen and (max-width: ${variables.Screen_Medium}) {
		display: flex;
	}

	@media screen and (max-width: ${variables.Screen_tablet}) {
		margin-bottom: 30px;
		button {
			width: auto;
		}
	}
`;

export const ButtonListMobil = styled.div`
	display: none;
	width: 100%;
	margin-top: 20px;
	button {
		width: calc(50% - 5px);
	}

	@media screen and (max-width: ${variables.Screen_mobil}) {
		display: flex;
		flex-direction: column;
	}
`;

export const DetailMovieRight = styled.div`
	vertical-align: top;
	display: inline-block;
	width: calc(100% - 530px);
	@media screen and (max-width: ${variables.Screen_tablet}) {
		width: 100%;
	}
`;

export const UnderTitleBar = styled.div`
	display: flex;
	padding-top: 20px;
`;

export const UnderTitleBarItem = styled.div`
	color: ${variables.Light_02};
	margin-right: 20px;
	padding: 5px 0 5px 0;
	font-size: ${variables.Normal_font_size};
	font-weight: ${variables.Normal_font_weight};
	&:after {
		content: "";
		display: block;
		position: absolute;
		left: calc(100% + 10px);
		top: 50%;
		transform: translate(-50%, -50%);
		height: 4px;
		width: 4px;
		border-radius: 50%;
		background-color: ${variables.Light_02};
	}

	&:last-of-type:after {
		display: none;
	}
`;

export const CastList = styled.div`
	padding-top: 10px;
`;

export const CastElement = styled.div`
	display: inline-block;
	padding-right: 5px;
	&:after {
		content: "/";
		padding-left: 5px;
		color: ${variables.Light_05};
	}

	&:last-of-type:after {
		content: none;
	}
`;

export const ButtonListBigScreen = styled.div`
	display: flex;
	margin-top: 30px;
	@media screen and (max-width: ${variables.Screen_Medium}) {
		display: none;
	}
`;

export const MovieMissingContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

