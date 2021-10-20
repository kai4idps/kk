import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";

import {Container} from "../style/GlobalContainer.style.js";

const GlobalContainer = (props) => {
	const theme = useTheme();
	let background = theme.colors.background;

	if(props.background) {
		background = props.background;
	}

	return (
		<Container background={background}>
			{props.children}
		</Container>
	)
}

GlobalContainer.propTypes = {
	children: PropTypes.node.isRequired,
	background: PropTypes.string
};

export default GlobalContainer;
