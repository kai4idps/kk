import getPublicRuntimeConfig from "@/lib/getPublicRuntimeConfig";

const { GOOGLE_ANALYTICS, MERCHANT_ID, PROJECT_ID, GOOGLE_ANALYTICS_CUSTOMER } =
	getPublicRuntimeConfig();

export const pageview = ({ url, id, userType }) => {
	window.gtag("config", GOOGLE_ANALYTICS, {
		page_path: url,
		user_id: id
	});

	window.gtag("config", GOOGLE_ANALYTICS_CUSTOMER, {
		page_path: url,
		user_id: id
	});

	window.gtag("config", MERCHANT_ID, { user_id: id });
	window.gtag("set", "user_properties", { user_type: userType, user_id: id });
};

export const event = ({ action, params }) => {
	window.gtag("event", action, {
		...params,
		project_id: PROJECT_ID
	});
};

export const setUserProperties = ({ userType }) => {
	window.gtag("set", "user_properties", { user_type: userType });
};
