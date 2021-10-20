import axios from "axios";
import { useRouter } from "next/router";
import { getLocalStorage } from "@/lib/localStorage";
import getPublicRuntimeConfig from "@/lib/getPublicRuntimeConfig";
import TokenFunc from "@/lib/tokenFunc";

const DetailApi = () => {
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

	const getVideoDetail = async video_id => {
		const result = await axios
			.get(
				`${CLIENT_API_ENDPOINT}/v1/organization/${ORG_ID}/project/${PROJECT_ID}/video/${video_id}`,
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

	return { getVideoDetail };
};

export default DetailApi;
