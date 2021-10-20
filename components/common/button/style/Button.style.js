import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { variables } from "@/styles/styleUtils";

const ButtonStyle = props =>
	css`
		width: ${props.width};
		height: ${props.height};
		border: none;
		border-radius: 12px;
		cursor: pointer;
		background-color: ${props.defaultBackgroundColor};
		color: #ffffff;
		margin: ${props.margin};
		padding: ${props.padding || "15px 20px"};
		font-weight: bold;
		font-size: 16px;
		display: ${props.display};
		-webkit-appearance: none;
		&:hover {
			background-color: ${props.defaultHoverBackground};
		}

		&.align-right {
			position: absolute;
			right: 0;
			top: 0;
		}

		&.black {
			background-color: ${variables.Dark_01};

			&:hover {
				background-color: ${variables.Dark_04};
			}
		}

		&.grey {
			background-color: ${variables.Dark_02};
		}

		&.light-black {
			background-color: ${variables.Dark_02};

			&:hover {
				background-color: ${variables.Dark_04};
			}
		}

		&.dark-gray {
			background-color: ${variables.Dark_03};
			border: 1px solid ${variables.Dark_Secondary};

			&:hover {
				background-color: ${variables.Dark_04};
			}
		}

		&.theme-with-border {
			background-color: transparent;
			color: ${props.color};
			border: 1px solid ${props.border};

			&:hover {
				background-color: ${props.border};
				color: ${props.hoverColor};
			}
		}

		&:disabled {
			pointer-events: none;
			opacity: 0.7;
		}

		&.icon {
			span {
				padding-left: 25px;
				display: inline-block;
				&:before {
					content: "";
					display: block;
					background-image: url("${props.icon}");
					background-size: contain;
					background-repeat: no-repeat;
					background-position: center;
					height: 18px;
					width: 18px;
					position: absolute;
					left: 0;
					top: 50%;
					transform: translate(0, -50%);

					margin-top: ${props.iconTopAdjustment};
					margin-left: ${props.iconLeftAdjustment};
				}
			}
		}
	`;

export const ButtonElem = styled.button`
	${ButtonStyle};
`;

export const InputElem = styled.input`
	${ButtonStyle};
`;
