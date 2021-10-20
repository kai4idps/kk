import styled from "@emotion/styled";

export const InputTextContainer = styled.div``;

export const InputTextElem = styled.input`
	display: block;
	background-color: ${props => props.background};
	width: ${props => props.width};
	height: ${props => props.height};
	margin: ${props => props.margin};
	padding: ${props => props.padding};
	font-size: 14px;
	color: ${props => props.color};
	border-radius: 8px;
	border: 1px solid transparent;
	caret-color: ${props => props.defaultBackgroundColor};

	&:focus {
		outline-style: solid;
		box-shadow: 0 0 0 1px ${props => props.focusColor};
		outline: none;
	}

	&.error {
		border: 1px solid red;
	}

	&:-webkit-autofill,
	&:-webkit-autofill:hover,
	&:-webkit-autofill:active {
		-webkit-text-fill-color: ${props => props.color};
		-webkit-box-shadow: 0 0 0 1000px ${props => props.background} inset;
		box-shadow: 0 0 0 1px ${props => props.focusColor};
		transition: background-color 5000s ease-in-out 0s;
	}

	&:-webkit-autofill,
	&:-webkit-autofill:hover,
	&:-webkit-autofill:focus,
	&:-webkit-autofill:active {
		background-color: ${props => props.background};
		color: ${props => props.color};
	}
`;

export const InputClear = styled.div`
	background-image: url("/images/icon-clear.svg");
	background-size: contain;
	cursor: pointer;
	display: block;
	position: absolute;
	right: 10px;
	top: 50%;
	transform: translate(0, -50%);
	width: 20px;
	height: 20px;
	z-index: 10;
`;
