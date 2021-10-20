import React from "react";
import { useTheme } from "@emotion/react";
import PropTypes from "prop-types";

import { BannerContainer } from "../style/Banner.style";

const Banner = ({ children }) => {
	const theme = useTheme();
	return (
		<BannerContainer background={theme.colors.background2}>
			{children}
		</BannerContainer>
	);
};

Banner.propTypes = {
	children: PropTypes.node
};

export default Banner;
