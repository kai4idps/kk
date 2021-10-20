import React from "react";
import { useTheme } from "@emotion/react";
import PropTypes from "prop-types";

import { LinkElement } from "../style/KKLink.style.js";

const KKLink = React.forwardRef((props, ref) => {
	const theme = useTheme();
	let width = "auto";
	let height = "auto";
	let margin = "0";
	let padding = "";
	let classList = props.classList;
	let target = "_self";

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

	if (props.target) {
		target = props.target;
	}

	return (
		<LinkElement
			ref={ref}
			className={classList}
			width={width}
			height={height}
			margin={margin}
			padding={padding}
			onClick={props.onClick}
			color={theme.colors.text}
			colorTheme={theme.colors.theme}
			colorThemeHover={theme.colors.theme2}
			href={props.href}
			target={target}
		>
			{props.children}
		</LinkElement>
	);
});

KKLink.displayName = 'KKLink';

KKLink.propTypes = {
	id: PropTypes.string,
	width: PropTypes.string,
	height: PropTypes.string,
	margin: PropTypes.string,
	padding: PropTypes.string,
	target: PropTypes.string,
	onClick: PropTypes.func,
	href: PropTypes.string,
	children: PropTypes.node.isRequired,
	classList: PropTypes.string
};

export default KKLink;
