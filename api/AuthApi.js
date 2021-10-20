import axios from "axios";
import { useRouter } from "next/router";
import { setLocalStorage, getLocalStorage } from "@/lib/localStorage";
import getPublicRuntimeConfig from "@/lib/getPublicRuntimeConfig";

const { MEMBER_API_ENDPOINT, ORG_ID, PROJECT_ID } = getPublicRuntimeConfig();
const authInfo = {
	organizationId: ORG_ID,
	projectId: PROJECT_ID
};

const AuthApi = () => {
	const router = useRouter();

	const handleSigninUser = async userInfo => {
		const result = await axios
			.post(
				`${MEMBER_API_ENDPOINT}/auth/local`,
				JSON.stringify({
					...userInfo,
					...authInfo
				}),
				{
					headers: { "Content-type": "application/json; charset=UTF-8" }
				}
			)
			.then(response => {
				setLocalStorage("refresh_Token", response.data.refreshToken);
				setLocalStorage("access_token", response.data.accessToken);
				setLocalStorage("connection_type", "local");

				return response;
			})
			.catch(error => {
				if (error?.response?.status === 500) {
					router.push({
						pathname: "/error",
						query: {
							code: `${error?.response?.status}`
						}
					});
					return;
				}
				return error?.response;
			});

		return result;
	};

	const handleSignupUser = async userInfo => {
		const result = await axios
			.post(
				`${MEMBER_API_ENDPOINT}/auth/signup`,
				JSON.stringify({ ...userInfo, ...authInfo }),
				{
					headers: { "Content-type": "application/json; charset=UTF-8" }
				}
			)
			.then(response => {
				return response;
			})
			.catch(error => {
				if (error?.response?.status === 500) {
					router.push({
						pathname: "/error",
						query: {
							code: `${error?.response?.status}` // 400 403 500
						}
					});
					return;
				}
				return error?.response;
			});

		return result;
	};

	const handleForgotPassword = async userInfo => {
		const result = await axios
			.post(
				`${MEMBER_API_ENDPOINT}/auth/forgotPassword`,
				JSON.stringify({ ...userInfo, ...authInfo }),
				{
					headers: { "Content-type": "application/json; charset=UTF-8" }
				}
			)
			.then(response => {
				return response;
			})
			.catch(error => {
				if (error?.response?.status === 500) {
					router.push({
						pathname: "/error",
						query: {
							code: `${error?.response?.status}` // 400 403 500
						}
					});
					return;
				}
				return error?.response;
			});

		return result;
	};

	const handleVerifyEmail = async token => {
		const result = await axios
			.get(`${MEMBER_API_ENDPOINT}/auth/${token}`, {
				headers: { "Content-type": "application/json; charset=UTF-8" }
			})
			.then(response => {
				return response;
			})
			.catch(error => {
				if (error?.response?.status === 500) {
					router.push({
						pathname: "/error",
						query: {
							code: `${error?.response?.status}` // 400 403 500
						}
					});
					return;
				}
				return error?.response;
			});

		return result;
	};

	const handleResetPassword = async (userInfo, token) => {
		const result = await axios
			.put(
				`${MEMBER_API_ENDPOINT}/auth/resetPassword`,
				JSON.stringify({ ...userInfo, ...authInfo }),
				{
					headers: {
						"Content-type": "application/json; charset=UTF-8",
						Authorization: `Bearer ${token}`
					}
				}
			)
			.then(response => {
				return response;
			})
			.catch(error => {
				if (error?.response?.status === 500) {
					router.push({
						pathname: "/error",
						query: {
							code: `${error?.response?.status}` // 400 403 500
						}
					});
					return;
				}
				return error?.response;
			});

		return result;
	};

	const handleUpdatePassword = async (
		userInfo,
		access_token,
		refresh_token
	) => {
		const result = await axios
			.put(
				`${MEMBER_API_ENDPOINT}/auth/updatePassword`,
				JSON.stringify({
					...userInfo,
					...authInfo,
					refreshToken: refresh_token
				}),
				{
					headers: {
						"Content-type": "application/json; charset=UTF-8",
						Authorization: `Bearer ${access_token}`
					}
				}
			)
			.then(response => {
				return response;
			})
			.catch(error => {
				if (error?.response?.status === 500) {
					router.push({
						pathname: "/error",
						query: {
							code: `${error?.response?.status}` // 400 403 500
						}
					});
					return;
				}
				return error?.response;
			});

		return result;
	};

	const handleResendForgotPasswordEmail = async userInfo => {
		const result = await axios
			.post(
				`${MEMBER_API_ENDPOINT}/auth/forgotPasswordResend`,
				JSON.stringify({ ...userInfo, ...authInfo }),
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
				if (error?.response?.status === 500) {
					router.push({
						pathname: "/error",
						query: {
							code: `${error?.response?.status}` // 400 403 500
						}
					});
					return;
				}
				return error?.response;
			});

		return result;
	};

	const handleResendCreateAccountEmail = async userInfo => {
		const result = await axios
			.post(
				`${MEMBER_API_ENDPOINT}/auth/signUpResend`,
				JSON.stringify({ ...userInfo, ...authInfo }),
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
				if (error?.response?.status === 500) {
					router.push({
						pathname: "/error",
						query: {
							code: `${error?.response?.status}` // 400 403 500
						}
					});
					return;
				}
				return error?.response;
			});

		return result;
	};

	const handleSigninWithGoogle = async token => {
		const result = await axios
			.post(
				`${MEMBER_API_ENDPOINT}/auth/google/verify`,
				{ ...authInfo, idToken: token },
				{
					headers: { "Content-type": "application/json; charset=UTF-8" }
				}
			)
			.then(response => {
				setLocalStorage("access_token", response?.data.accessToken);
				setLocalStorage(
					"refresh_Token",
					response?.data.decodeRefreshToken.decodeRefreshToken
				);
				setLocalStorage("connection_type", "google");
				return response;
			})
			.catch(error => {
				if (error?.response?.status === 500) {
					router.push({
						pathname: "/error",
						query: {
							code: `${error?.response?.status}` // 400 403 500
						}
					});
					return;
				}
				return error?.response;
			});

		return result;
	};

	const handleSigninWithApple = async (code, id_token) => {
		const result = await axios
			.post(
				`${MEMBER_API_ENDPOINT}/auth/apple/verify`,
				{ ...authInfo, code: code, idToken: id_token },
				{
					headers: { "Content-type": "application/json; charset=UTF-8" }
				}
			)
			.then(response => {
				setLocalStorage("access_token", response?.data.accessToken);
				setLocalStorage(
					"refresh_Token",
					response?.data.decodeRefreshToken.decodeRefreshToken
				);
				setLocalStorage("connection_type", "apple");

				return response;
			})
			.catch(error => {
				if (error?.response?.status === 500) {
					router.push({
						pathname: "/error",
						query: {
							code: `${error?.response?.status}` // 400 403 500
						}
					});
					return;
				}
				return error?.response;
			});

		return result;
	};

	const handleTokenRefresh = async member_id => {
		const result = await axios
			.post(
				`${MEMBER_API_ENDPOINT}/auth/token`,
				{
					member_id: member_id,
					organization_id: ORG_ID,
					project_id: PROJECT_ID
				},
				{
					headers: {
						"Content-type": "application/json; charset=UTF-8",
						Authorization: `Bearer ${getLocalStorage("refresh_Token")}`
					}
				}
			)
			.then(response => {
				setLocalStorage("access_token", response?.data.access_token);
				setLocalStorage("refresh_Token", response?.data.refresh_token);
				setLocalStorage("connection_type", "local");

				return response;
			})
			.catch(error => {
				if (error?.response?.status === 500) {
					router.push({
						pathname: "/error",
						query: {
							code: `${error?.response?.status}` // 400 403 500
						}
					});
					return;
				}
				return error?.response;
			});

		return result;
	};

	return {
		handleSigninUser,
		handleSignupUser,
		handleVerifyEmail,
		handleSigninWithGoogle,
		handleSigninWithApple,
		handleForgotPassword,
		handleResetPassword,
		handleUpdatePassword,
		handleTokenRefresh,
		handleResendForgotPasswordEmail,
		handleResendCreateAccountEmail
	};
};

export default AuthApi;
