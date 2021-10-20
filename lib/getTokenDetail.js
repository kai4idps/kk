import jwt_decode from "jwt-decode";

export const getTokenDetail = token => {
	if (!token) {
		return;
	}

	try {
		return jwt_decode(token);
	} catch (error) {
		return null;
	}
};
