import axios from "axios";
import { useRouter } from "next/router";
import getPublicRuntimeConfig from "@/lib/getPublicRuntimeConfig";

const SubscriptionApi = () => {
	const router = useRouter();
	const { PAYMENT_API_ENDPOINT, ORG_ID, PROJECT_ID } = getPublicRuntimeConfig();

	const projectToken = {
		projectId: PROJECT_ID,
		orgId: ORG_ID
	};

	const startTransaction = async (data, token) => {
		const result = await axios
			.post(
				`${PAYMENT_API_ENDPOINT}/ec-order`,
				JSON.stringify({
					...projectToken,
					...data
				}),
				{
					headers: {
						"Content-type": "application/json; charset=UTF-8",
						token: token
					}
				}
			)
			.then(response => {
				return response;
			})
			.catch(error => {
				if (
					error?.response?.status === 400 ||
					error?.response?.status === 403 ||
					error?.response?.status === 404 ||
					error?.response?.status === 500
				) {
					router.push({
						pathname: "/error",
						query: {
							code: `${error?.response?.status}`
						}
					});
					return;
				}

				if (error.response) {
					return error.response;
				} else if (error.request) {
					console.error(
						"Client never received a response, or request never left"
					);
				} else {
					console.error("Request Fail");
				}
			});

		return result;
	};

	const sendTransaction = async (data, token) => {
		const result = await axios
			.post(
				`${PAYMENT_API_ENDPOINT}/ec-order/payToken`,
				JSON.stringify({ ...projectToken, ...data }),
				{
					headers: {
						"Content-type": "application/json; charset=UTF-8",
						token: token
					}
				}
			)
			.then(response => {
				return response;
			})
			.catch(error => {
				if (
					error?.response?.status === 400 ||
					error?.response?.status === 403 ||
					error?.response?.status === 404 ||
					error?.response?.status === 500
				) {
					router.push({
						pathname: "/error",
						query: {
							code: `${error?.response?.status}`
						}
					});
					return;
				}

				if (error?.response?.status === 409) {
					router.push({
						pathname: "/error",
						query: {
							code: `${error?.response?.status}`,
							message: "error_message_payment_browser"
						}
					});
					return;
				}

				if (error.response) {
					return error.response;
				} else if (error.request) {
					console.error(
						"Client never received a response, or request never left"
					);
				} else {
					console.error("Request Fail");
				}
			});

		return result;
	};

	const cancelSubscription = async token => {
		const result = await axios
			.post(
				`${PAYMENT_API_ENDPOINT}/ec-order/cancel`,
				JSON.stringify(projectToken),
				{
					headers: {
						"Content-type": "application/json; charset=UTF-8",
						token: token
					}
				}
			)
			.then(response => {
				return response;
			})
			.catch(error => {
				if (
					error?.response?.status === 400 ||
					error?.response?.status === 403 ||
					error?.response?.status === 404 ||
					error?.response?.status === 500
				) {
					router.push({
						pathname: "/error",
						query: {
							code: `${error?.response?.status}`
						}
					});
					return;
				}

				if (error.response) {
					return error.response;
				} else if (error.request) {
					console.error(
						"Client never received a response, or request never left"
					);
				} else {
					console.error("Request Fail");
				}
			});

		return result;
	};

	const checkSubscription = async (token, orderId) => {
		const result = await axios
			.get(
				`${PAYMENT_API_ENDPOINT}/ec-order/organization/${ORG_ID}/project/${PROJECT_ID}/order/${orderId}/result`,
				{
					headers: {
						"Content-type": "application/json; charset=UTF-8",
						token: token
					}
				}
			)
			.then(response => {
				return response;
			})
			.catch(error => {
				if (
					error?.response?.status === 400 ||
					error?.response?.status === 403 ||
					error?.response?.status === 404 ||
					error?.response?.status === 500
				) {
					router.push({
						pathname: "/error",
						query: {
							code: `${error?.response?.status}`
						}
					});
					return;
				}

				if (error.response) {
					return error.response;
				} else if (error.request) {
					console.error(
						"Client never received a response, or request never left"
					);
				} else {
					console.error("Request Fail");
				}
			});

		return result;
	};

	const getPaymentVersion = async () => {
		const result = await axios
			.get(`${PAYMENT_API_ENDPOINT}/payment/version`, {
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			})
			.then(response => {
				return response;
			})
			.catch(error => {
				if (error.response) {
					return error.response;
				} else if (error.request) {
					console.error(
						"Client never received a response, or request never left"
					);
				} else {
					console.error("Request Fail");
				}
			});

		return result;
	};

	return {
		startTransaction,
		sendTransaction,
		cancelSubscription,
		checkSubscription,
		getPaymentVersion
	};
};

export default SubscriptionApi;
