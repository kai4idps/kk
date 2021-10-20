import axios from "axios";
import { useRouter } from "next/router";
import TokenFunc from "@/lib/tokenFunc";
import { getLocalStorage } from "@/lib/localStorage";
import getPublicRuntimeConfig from "@/lib/getPublicRuntimeConfig";

const GetPageApi = () => {
	const router = useRouter();
	const {getTokenDetail, isTokenValid, isTokenExist} = TokenFunc();
	const { CLIENT_API_ENDPOINT, ORG_ID, PROJECT_ID } = getPublicRuntimeConfig();

	// custom header for none-acccess token
	const setTokenInHeader = () => {
		const accessTokenDetail = getTokenDetail(getLocalStorage("access_token"));

		if (
			!isTokenExist(getLocalStorage("access_token")) ||
			!isTokenValid(accessTokenDetail)
		) {
			return;
		}
		return {
			Authorization: `Bearer ${getLocalStorage("access_token")}`
		};
	};

	const getListPages = async () => {
		if (!ORG_ID || ORG_ID === undefined) {
			router.push({
				pathname: "/error",
				query: {
					code: 404
				}
			});
		}
		const result = await axios
			.get(
				`${CLIENT_API_ENDPOINT}/v1/organization/${ORG_ID}/project/${PROJECT_ID}/pages`,
				{
					headers: {
						...setTokenInHeader(),
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
					error?.response?.status === 404 ||
					error?.response?.status === 500
				) {
					if (router.pathname !== "/error") {
						router.push({
							pathname: "/error",
							query: {
								code: `${error?.response?.status}`
							}
						});
					}
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

	const getPageDetailByName = async pageName => {
		const result = await axios
			.get(
				`${CLIENT_API_ENDPOINT}/v1/organization/${ORG_ID}/project/${PROJECT_ID}/page_name/${pageName}`,
				{
					headers: {
						"Content-type": "application/json; charset=UTF-8"
					}
				}
			)
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

	const getPageDetailById = async pageId => {
		const result = await axios
			.get(
				`${CLIENT_API_ENDPOINT}/v1/organization/${ORG_ID}/project/${PROJECT_ID}/page/${pageId}?items=30`,
				{
					headers: {
						...setTokenInHeader(),
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

	const getPolicyPageDetail = async () => {
		const result = await axios
			.get(
				`${CLIENT_API_ENDPOINT}/v1/organization/${ORG_ID}/project/${PROJECT_ID}/privacy`,
				{
					headers: {
						...setTokenInHeader(),
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

	const getTermsOfUsePageDetail = async () => {
		const result = await axios
			.get(
				`${CLIENT_API_ENDPOINT}/v1/organization/${ORG_ID}/project/${PROJECT_ID}/eula`,
				{
					headers: {
						...setTokenInHeader(),
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

	return {
		getListPages,
		getPageDetailByName,
		getPageDetailById,
		getPolicyPageDetail,
		getTermsOfUsePageDetail
	};
};

export default GetPageApi;
