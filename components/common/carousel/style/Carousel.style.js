import styled from "@emotion/styled";
import { variables } from "@/styles/styleUtils";

export const Carousel_super_container = styled.div`
	margin: ${props => props.margin};
	@media screen and (max-width: ${variables.Screen_tablet}) {
		margin-top: 40px;
	}

	@media screen and (max-width: ${variables.Screen_mobil}) {
		margin-top: 20px;
	}
`;

export const Carousel_container = styled.div`
	position: relative;
	width: calc(100% + ${variables.paddingMainContent});

	@media screen and (max-width: ${variables.Screen_mobil}) {
		width: calc(100% + ${variables.paddingMainContentMobil});
		margin-top: 20px;
	}
`;

export const Carousel_Title = styled.div`
	color: #ffffff;
	margin-bottom: 15px;
	position: relative;
	&.icon {
		padding-left: 25px;
		&:before {
			content: "";
			display: block;
			background-image: url("${props => props.icon}");
			background-size: contain;
			background-repeat: no-repeat;
			background-position: center;
			height: 18px;
			width: 18px;
			position: absolute;
			left: 0;
			top: 50%;
			transform: translate(0, -50%);
		}
	}

	&.small {
		font-size: 16px;
		font-weight: bold;
	}

	@media screen and (max-width: ${variables.Screen_tablet}) {
		padding-left: 0;
	}
`;

export const Carousel_arrow_right = styled.div`
	position: absolute;
	cursor: pointer;
	right: 0px;
	top: 0;
	height: 100%;
	width: 40px;
	background-image: url("images/Icons/${props => props.image}");
	background-size: 16px;
	background-position: center;
	background-repeat: no-repeat;
	background-color: ${props => props.color}B3;
	z-index:5;
	&.disabled {
		display: none;
	}

	&:hover {
		background-color: ${props => props.color}D9;
	}

	@media screen and (max-width: ${variables.Screen_tablet}) {
		display: none;
	}
`;

export const Carousel_arrow_left = styled.div`
	position: absolute;
	cursor: pointer;
	left: 0px;
	top: 0;
	height: 100%;
	width: 40px;
	background-image: url("images/Icons/${props => props.image}");
	background-size: 16px;
	background-position: center;
	background-repeat: no-repeat;
	background-color: ${props => props.color}B3;
	transform: rotate(180deg);
	z-index:5;
	&.disabled {
		display: none;
	}

	&:hover {
		background-color: ${props => props.color}D9;
	}

	@media screen and (max-width: ${variables.Screen_tablet}) {
		display: none;
	}
`;

export const Element_super_container = styled.div`
	overflow: hidden;
	position: relative;
	padding-left: 40px;
	margin-left: -40px;
	@media screen and (max-width: ${variables.Screen_tablet}) {
		overflow: auto;
		padding-left: 0;
		margin-left: 0;
	}
`;

export const Element_container = styled.div`
	width: ${props => props.width}px;
	display: flex;
	transform: translateX(${props => props.transform});
	transition: all 0.5s ease;
`;
