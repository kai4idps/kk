import styled from "@emotion/styled";
import { variables } from "@/styles/styleUtils";
import { keyframes } from "@emotion/react";

export const Carousel_super_container = styled.div`
	width: 100%;
	overflow: hidden;
	padding-top: 10px;
`;

export const Carousel_container = styled.div`
	position: relative;
	width: 100vw;
`;

export const Elements_container = styled.div`
	display: flex;
	width: ${props => props.containerWidth};
	transform: translate(${props => props.containerTransform}, 0);
`;

export const Element_carousel = styled.a`
	width: calc(50vw - 20px);
	margin: 0 10px;
	position: relative;
	display: block;
	cursor: pointer;
	position: relative;

	&.reduced {
		width: 0;
		margin: 0 0;
		transition: all 0.5s;
	}

	&.extend {
		transition: all 0.5s;
	}

	&.fast-reduced {
		width: 0;
		margin: 0 0;
	}

	&:before {
		width: 100%;
		height: 0;
		padding-top: 56.25%;
		content: "";
		display: block;
	}

	@media screen and (max-width: ${variables.Screen_small}) {
		width: calc(90vw - 20px);
	}

	@media screen and (max-width: ${variables.Screen_mobil}) {
		margin: 0;
		width: 100vw;
	}
`;

export const Element_carousel_img = styled.div`
	position: absolute;
    top: 0;
	width: 100%;
	height: 100%;
	background-image: url(${props => props.url});
	background-size: cover;
	background-position: center;
	border-radius: 8px;

	@media screen and (max-width: ${variables.Screen_mobil}) {
		border-radius: 0px;
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
	left: 0;
	display: inline-block;
	width: 100%;
	height: 100%;
	background: ${props=> (props.theme === "theme_black") ? 
		`linear-gradient(90deg, #343434 0%, #464646 20%, #464646 40%, #343434 60%, #343434 80%, #464646 100%)` 
	: 
		`linear-gradient(90deg, #f0f0f0 0%, #dddddd 20%, #dddddd 40%, #f0f0f0 60%, #f0f0f0 80%, #dddddd 100%)`
	};
	border-radius: 4px;
	background-size: 1000% 100%;
	animation: ${placeHolderShimmer} 2s linear infinite;
	
	@media screen and (max-width: ${variables.Screen_mobil}) {
		border-radius: 0px;
	}

	&.hidden {
		display: none;
	}
`;

export const Dot_list = styled.ul`
	position: absolute;
	display: flex;
	align-items: center;
	left: 50%;
	bottom: 10px;
	transform: translate(-50%, 0);
	list-style-type: none;
	padding: 0;
`;

export const Element_dot = styled.li`
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background-color: ${variables.Light_02};
	margin: 0 3px;
	cursor: pointer;
	&.selected {
		width: 12px;
		height: 12px;
		background-color: ${props => props.background};
	}
`;
