import styled from "@emotion/styled";
import { variables } from "@/styles/styleUtils";

export const DropDownContainer = styled.div`
	max-width: 450px;
	height: ${props => props.height};
	border: none;
	border-radius: 12px;
	margin: ${props => props.margin};
`;

export const DropDownInput = styled.div`
	font-size: ${variables.Small_font_size};
	font-weight: ${variables.Small_font_weight};
	background-color: ${props => props.background};
	color: ${props => props.color};
	padding: ${props => props.padding};
	border-radius: 8px;
	width: ${props => props.widthInput};
	max-width: 100%;
	height: 50px;
	cursor: pointer;
	&:after {
		content: "";
		display: block;
		width: 10px;
		height: 2px;
		position: absolute;
		right: 16px;
		top: 50%;
		transform: translate(0, -50%) rotate(-45deg);
		background-color: ${props => props.color};
		transition: 0.5s;
	}

	&:before {
		content: "";
		display: block;
		width: 10px;
		height: 2px;
		position: absolute;
		right: 10px;
		top: 50%;
		transform: translate(0, -50%) rotate(45deg);
		background-color: ${props => props.color};
		transition: 0.5s;
	}

	&.open {
		&:after {
			transform: translate(0, -50%) rotate(45deg);
		}

		&:before {
			transform: translate(0, -50%) rotate(-45deg);
		}
	}
`;

export const DropDownList = styled.ul`
	display: none;
	width: ${props => props.widthInput};
	max-width: 100%;
	list-style-type: none;
	padding: 0;
	margin: 10px 0 0 0;
	color: ${props => props.color};
	background-color: ${props => props.background};
	border-radius: 4px;
	overflow: hidden;
	position: absolute;
	top: 50px;
	left: 0;
	z-index: 200;
	&.open {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	&.column-3 {
		width: 450px;
		@media screen and (max-width: ${variables.Screen_mobil}) {
			width: ${props => props.widthInput};
		}
	}
`;

export const DropDownElement = styled.li`
	width: 100%;
	padding: ${props => props.padding};
	cursor: pointer;
	&:hover {
		background-color: ${props => props.hoverBackground};
	}

	&.column-3 {
		width: 33.333%;
		@media screen and (max-width: ${variables.Screen_mobil}) {
			width: 100%;
		}
	}
`;
