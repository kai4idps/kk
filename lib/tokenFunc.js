import jwtDecode from "jwt-decode";
import isNil from "lodash/isNil";

const TokenFunc = () => {
	const getTokenDetail = token => {
		if (!token) {
			return null;
		}

		try {
			return jwtDecode(token);
		} catch (error) {
			return null;
		}
	};

	const isTokenValid = tokenDetail => {
		if (Date.now() - tokenDetail?.exp * 1000 > 3000) {
			return false; // access token expired
		}

		return true;
	};

	const isTokenExist = token => {
		if (isNil(token)) {
			return false;
		}

		return true;
	};

	return {
		getTokenDetail,
		isTokenValid,
		isTokenExist
	};
};

export default TokenFunc;
