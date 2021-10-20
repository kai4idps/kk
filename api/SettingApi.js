import axios from "axios";
import { useRouter } from "next/router";
import getPublicRuntimeConfig from "@/lib/getPublicRuntimeConfig";

const SettingApi = () => {
	const router = useRouter();

	const { CLIENT_API_ENDPOINT, MEMBER_API_ENDPOINT, ORG_ID, PROJECT_ID } =
		getPublicRuntimeConfig();

	const projectSetting = async () => {
		const result = await axios
			.get(
				`${CLIENT_API_ENDPOINT}/v1/organization/${ORG_ID}/project/${PROJECT_ID}/setting`,
				{
					headers: { "Content-type": "application/json; charset=UTF-8" }
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

	const getMemberVersionNumber = async () => {
		const result = await axios
			.get(`${MEMBER_API_ENDPOINT}/auth/version`, {
				headers: { "Content-type": "application/json; charset=UTF-8" }
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

	return { projectSetting, getMemberVersionNumber };
};

export default SettingApi;
