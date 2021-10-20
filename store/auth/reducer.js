import {
	GET_LOCALSTORAGE,
	SET_LOCALSTORAGE,
	REMOVE_LOCALSTORAGE,
	SET_ITEM
} from "../actionTypes";

const initialState = {
	//access_token: getLocalStorage("access_token") || null,
	//refresh_Token: getLocalStorage("refresh_Token") || null,
	//connection_type: getLocalStorage("connection_type") || "",
	//lang: getLocalStorage("lang") || "en",
	theme: null,
	copyright: "",
	list_lang: [],
	page_list: []
};

const auth = (state = initialState, { type, payload, name, item }) => {
	switch (type) {
		case GET_LOCALSTORAGE:
			return {
				...state,
				[name]: Object.keys(payload || []).map(e => payload[e])
			};
		case SET_LOCALSTORAGE:
			return {
				...state,
				[name]: Object.keys(payload || []).map(e => payload[e])
			};
		case REMOVE_LOCALSTORAGE:
			return {
				...initialState,
				access_token: "",
				refresh_Token: "",
				connection_type: ""
			};
		case SET_ITEM:
			return {
				...state,
				[name]: item
			};
		default: {
			return state;
		}
	}
};

export default auth;
