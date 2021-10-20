import styled from "@emotion/styled";
import { variables } from "@/styles/styleUtils";
import { keyframes } from "@emotion/react";

export const Element_carousel = styled.div`
	margin: 0 ${props => props.margin} 0 0;
	overflow: hidden;
	width: ${props => props.width};
`;

export const Element_link_container = styled.a`
	display: block;
	cursor: pointer;
	margin-bottom: 8px;
`;

export const Element_carousel_img = styled.div`
	position: relative;
	display: block;
	width: 100%;
	height: 135px;
	background-image: url(${props => props.url});
	background-size: cover;
	border-radius: 4px;
	&:hover {
		background-color: ${props => props.overlay}4D;
	}

	@media screen and (max-width: ${variables.Screen_tablet}) {
		height: 113px;
	}

	@media screen and (max-width: ${variables.Screen_mobil}) {
		height: 76px;
	}
`;

const placeHolderShimmer = keyframes`
	0%{
		background-position: 90%
	}

	100%{
		background-position: 0%
	}
`

export const ElementLoading = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	border-radius: 4px;
	background: ${props=> (props.theme === "theme_black") ? 
		`linear-gradient(90deg, #343434 0%, #464646 20%, #464646 40%, #343434 60%, #343434 80%, #464646 100%)` 
	: 
		`linear-gradient(90deg, #f0f0f0 0%, #dddddd 20%, #dddddd 40%, #f0f0f0 60%, #f0f0f0 80%, #dddddd 100%)`
	};
	z-index: 5;
	background-size: 1000% 100%;
	animation: ${placeHolderShimmer} 2s linear infinite;
  	&.hidden {
  		display: none;
  	}
`;

export const ElementOverlay = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: none;
	&:hover {
		background-color: ${props => props.overlay}4D;
	}
`;

export const Element_play_button = styled.div`
	display: none;
	position: absolute;
	width: 40px;
	height: 40px;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-image: url("/images/Icons/icon-play.svg");
`;

export const Element_loadBarGrey = styled.div`
	position: absolute;
	width: 100%;
	height: 4px;
	bottom: 0;
	left: 0;
	background-color: #2a2b2c;
	border-radius: 4px;
`;

export const Element_loadBarTheme = styled.div`
	position: absolute;
	width: ${props => props.width};
	height: 4px;
	bottom: 0;
	left: 0;
	background-color: ${props => props.background};
	border-radius: 4px;
`;

export const Element_info = styled.div`
	min-height: 16px;
`;
