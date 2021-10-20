import styled from "@emotion/styled";
import { variables } from "@/styles/styleUtils";

export const LinkElement = styled.a`
	width: ${props => props.width};
	height: ${props => props.height};
	margin: ${props => props.margin};
	padding: ${props => props.padding};
	font-size: ${variables.Normal_font_size};
	font-weight: ${variables.Normal_font_weight};
	color: ${props => props.color};
	cursor: pointer;

	&.block {
		display: block;
	}

	&.center {
		text-align: center;
	}

	&.inline-block {
		display: inline-block;
	}

	&.theme-2 {
		color: ${props => props.colorTheme};
	}

	&.strong {
		font-size: ${variables.Strong_font_size};
		font-weight: ${variables.Strong_font_weight};
	}

	&.small {
		font-size: ${variables.Small_font_size};
		font-weight: ${variables.Small_font_weight};
	}

	&.extra-small {
		font-size: ${variables.Extra_small_font_size};
		font-weight: ${variables.Extra_small_font_weight};
	}

	&.theme-1 {
		color: ${props => props.colorTheme};
	}

	&.big {
		font-size: ${variables.Big_font_size};
		font-weight: ${variables.Big_font_weight};
	}

	&.underline {
		text-decoration: underline;
	}

	&.overflow {
		display: block;
		max-width: 100%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
`;
