import React from "react";
import { useTheme } from "@emotion/react";

import { 
	LoadingSuperContainer,
	LoadingContainer,
	Spinner
} from "../style/Loading.style.js";

export const Loading = () => {
	const theme = useTheme();

	return (
		<LoadingSuperContainer background={theme.colors.background}>
			<LoadingContainer background={theme.colors.background2}>
				<Spinner src="/images/Icons/spinner.svg" />
			</LoadingContainer>
		</LoadingSuperContainer>
	);
};

export default Loading;
