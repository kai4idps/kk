import styled from "@emotion/styled";
import { variables } from "@/styles/styleUtils";

export const TextElem = styled.span`
	width: ${props => props.width};
	height: ${props => props.height};
	margin: ${props => props.margin};
	padding: ${props => props.padding};
	font-size: ${variables.Normal_font_size};
	font-weight: ${variables.Normal_font_weight};
	color: ${props => props.color};

	&.extra-small {
		font-size: ${variables.Extra_small_font_size};
		font-weight: ${variables.Extra_small_font_weight};
	}

	&.small {
		font-size: ${variables.Small_font_size};
		font-weight: ${variables.Small_font_weight};
	}

	&.big {
		font-size: ${variables.Big_font_size};
		font-weight: ${variables.Big_font_weight};
	}

	&.label {
		font-size: ${variables.Label_font_size};
		font-weight: ${variables.Label_font_weight};
	}

	&.strong {
		font-size: ${variables.Strong_font_size};
		font-weight: ${variables.Strong_font_weight};
	}

	&.theme-1 {
		color: ${variables.Light_Tertiary};
	}

	&.theme-2 {
		color: ${props => props.colorTheme};
	}

	&.title-1 {
		font-size: ${variables.Title1_font_size};
		font-weight: ${variables.Title1_font_weight};
	}

	&.title-2 {
		font-size: ${variables.Title2_font_size};
		font-weight: ${variables.Title2_font_weight};
	}

	&.title-3 {
		font-size: ${variables.Title3_font_size};
		font-weight: ${variables.Title3_font_weight};
	}

	&.title-4 {
		font-size: ${variables.Title4_font_size};
		font-weight: ${variables.Title4_font_weight};
	}

	&.overflow {
		display: block;
		max-width: 100%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	&.block {
		display: block;
	}

	&.inline-block {
		display: inline-block;
	}

	&.word-break {
		word-break: break-all;
	}

	&.white {
		color: ${variables.Light_02};
	}

	&.center {
		text-align: center;
	}
`;
