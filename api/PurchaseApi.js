import axios from "axios";
import isArray from "lodash/isArray";
import { useRouter } from "next/router";
import { setLocalStorage } from "@/lib/localStorage";
import getPublicRuntimeConfig from "@/lib/getPublicRuntimeConfig";

const PurchaseApi = () => {
	const router = useRouter();
	const { CLIENT_API_ENDPOINT, ORG_ID, PROJECT_ID, PAYMENT_API_ENDPOINT } =
		getPublicRuntimeConfig();

	// custom header for none-acccess token

	const getPurchasePlan = async (token, videoId) => {
		let videoIdDetail = videoId;
		let getPurchasePlanUrl = `${CLIENT_API_ENDPOINT}/v1/organization/${ORG_ID}/project/${PROJECT_ID}/purchase/plans?video_id=${videoIdDetail}`;
		if (!videoId) {
			getPurchasePlanUrl = `${CLIENT_API_ENDPOINT}/v1/organization/${ORG_ID}/project/${PROJECT_ID}/purchase/plans`;
		}
		const result = await axios
			.get(`${getPurchasePlanUrl}`, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-type": "application/json; charset=UTF-8"
				}
			})
			.then(response => {
				if (isArray(response?.data)) {
					setLocalStorage("plan_type", response.data[0].plan_type);
				}
				return response;
			})
			.catch(async error => {
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

	const getPurchaseStatus = async (videoId, token) => {
		const result = await axios
			.get(
				`${CLIENT_API_ENDPOINT}/v1/organization/${ORG_ID}/project/${PROJECT_ID}/video/${videoId}/purchase/status`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-type": "application/json; charset=UTF-8"
					}
				}
			)
			.then(response => {
				return response;
			})
			.catch(async error => {
				if (
					error?.response?.status === 400 ||
					error?.response?.status === 403 ||
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

	const getPurchaseHistory = async (token, plan_type) => {
		const result = await axios
			.get(
				`${CLIENT_API_ENDPOINT}/v1/organization/${ORG_ID}/project/${PROJECT_ID}/purchase/histories?plan_type=${plan_type}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-type": "application/json; charset=UTF-8"
					}
				}
			)
			.then(response => {
				return response;
			})
			.catch(async error => {
				if (
					error?.response?.status === 400 ||
					error?.response?.status === 403 ||
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

	const getPurchaseInfo = async token => {
		const result = await axios
			.get(
				`${PAYMENT_API_ENDPOINT}/ec-order/organization/${ORG_ID}/project/${PROJECT_ID}/charge-info`,
				{
					headers: {
						token: `${token}`,
						"Content-type": "application/json; charset=UTF-8"
					}
				}
			)
			.then(response => {
				return response;
			})
			.catch(async error => {
				if (
					error?.response?.status === 400 ||
					error?.response?.status === 403 ||
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

	return {
		getPurchasePlan,
		getPurchaseStatus,
		getPurchaseHistory,
		getPurchaseInfo
	};
};

export default PurchaseApi;
