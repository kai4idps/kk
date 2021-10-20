import React from "react";
import PropTypes from "prop-types";
import { Header } from "@/layout/header";
import {PageContainer} from "../style/FullLayout.style.js";

const FullLayout = (props) => {
	return (
		<PageContainer>
			<Header />
			{props.children}
		</PageContainer>
	)
}

FullLayout.propTypes = {
	children: PropTypes.node
}

export default FullLayout
