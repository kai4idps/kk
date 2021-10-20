import React from "react";
import PropTypes from "prop-types";
import { Content } from "../style/MainContent.style.js";

const MainContent = ({ children }) => {
	return (
		<Content>
			{children}
		</Content>
	);
}

MainContent.propTypes = {
	children: PropTypes.node.isRequired
};

export default MainContent;
