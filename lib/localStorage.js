export const getLocalStorage = item => {
	if (typeof window !== "undefined") {
		return localStorage.getItem(item) || null;
	}

	return undefined;
};

export const setLocalStorage = (item, value) => {
	if (typeof window === "undefined") {
		return;
	}

	if (localStorage.getItem(item)) {
		localStorage.removeItem(item);
	}
	localStorage.setItem(item, value);
};

export const removeLocalStorage = item => {
	if (typeof window === "undefined") {
		return;
	}

	return localStorage.removeItem(item);
};
