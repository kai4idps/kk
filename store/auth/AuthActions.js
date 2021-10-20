import {
	GET_LOCALSTORAGE,
	REMOVE_LOCALSTORAGE,
	SET_ITEM
} from "../actionTypes";

const AuthActions = ({ dispatch }) => {
	const getPersistItem = item => {
		dispatch({
			type: GET_LOCALSTORAGE,
			payload: { [item]: item },
			name: [item]
		});
	};

	const removePersistItem = () => {
		dispatch({
			type: REMOVE_LOCALSTORAGE,
			payload: null
		});
	};

	const setPersistItem = (key, item) => {
		dispatch({
			type: SET_ITEM,
			name: key,
			item: item
		});
	};

	return {
		getPersistItem,
		removePersistItem,
		setPersistItem
	};
};

export default AuthActions;
