import React from "react";
import { useTheme } from "@emotion/react";
import PropTypes from "prop-types";

import { TextElem } from "../style/KKText.style.js";

function KKText(props) {
	const theme = useTheme();
	let width = "auto";
	let height = "auto";
	let margin = "0";
	let padding = "0";
	let classList = props.classList;
	let color = theme.colors.text;

	if (props.width) {
		width = props.width;
	}

	if (props.height) {
		height = props.height;
	}

	if (props.margin) {
		margin = props.margin;
	}

	if (props.padding) {
		padding = props.padding;
	}

	if (props.color) {
		color = props.color;
	}

	return (
		<TextElem
			id={props.id}
			className={classList}
			height={height}
			width={width}
			margin={margin}
			padding={padding}
			color={color}
			colorTheme={theme.colors.theme}
		>
			{props.children}
		</TextElem>
	);
}

KKText.propTypes = {
	id: PropTypes.string,
	children: PropTypes.node,
	width: PropTypes.string,
	height: PropTypes.string,
	margin: PropTypes.string,
	padding: PropTypes.string,
	classList: PropTypes.string,
	color: PropTypes.string
};

export default KKText;
