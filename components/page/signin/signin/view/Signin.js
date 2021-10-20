import React, { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter, withRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useDispatch } from "react-redux";
import isNil from "lodash/isNil";
import * as gtag from "@/lib/gtag";
import PropTypes from "prop-types";

import { Button } from "@/common/button";
import { InputText } from "@/common/inputText";
import { KKLink } from "@/common/kklink";
import { KKText } from "@/common/kkText";
import AuthApi from "@/api/AuthApi";
import useForm from "@/hook/useForm";
import getPublicRuntimeConfig from "@/lib/getPublicRuntimeConfig";

import {
	SigninContainer,
	SignInForm,
	SigninInputContainer,
	SigninTitle,
	SignInLabel,
	SigninError,
	SigninSubContent,
	SigninDivider
} from "../style/Signin.style";

const Signin = props => {
	const router = useRouter();
	const { t } = useTranslation("common");
	const dispatch = useDispatch({});
	const { handleSigninUser, handleSigninWithGoogle, handleSigninWithApple } =
		AuthApi(dispatch);
	const [redirect, setRedirect] = useState({ pathname: "/" });

	const {
		ENABLED_EMAIL_SIGNIN,
		ENABLED_GOOGLE_SIGNIN,
		ENABLED_APPLE_SIGNIN,
		SSO_GOOGLE_CLIENT_ID,
		SSO_APPLE_CLIENT_ID,
		SSO_APPLE_REDIRECT_URL
	} = getPublicRuntimeConfig();

	const DynamicImportGoogleSignin =
		ENABLED_GOOGLE_SIGNIN === "true" &&
		SSO_GOOGLE_CLIENT_ID &&
		SSO_GOOGLE_CLIENT_ID !== "" &&
		dynamic(() => import("react-google-login"));
	const DynamicImportAppleSignin =
		ENABLED_APPLE_SIGNIN === "true" &&
		SSO_APPLE_CLIENT_ID &&
		SSO_APPLE_CLIENT_ID !== "" &&
		SSO_APPLE_REDIRECT_URL &&
		SSO_APPLE_REDIRECT_URL !== "" &&
		dynamic(() => import("react-apple-login"));

	const {
		formData,
		setFormData,
		formErrors,
		setFormErrors,
		isSubmitting,
		setIsSubmitting,
		errorRef
	} = useForm({
		initialState: { email: "", password: "" }
	});

	const validateFormData = values => {
		let errors = { email: "", password: "" };
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

		if (!values.email) {
			errors.email = t("space_not_allow");
		} else if (!regex.test(values.email)) {
			errors.email = t("email_format_incorrect");
		}

		if (!values.password) {
			errors.password = t("space_not_allow");
		} else if (values.password.length < 8) {
			errors.password = t("email_or_password_incorrect");
		} else if (values.password.indexOf(" ") >= 0) {
			errors.password = t("space_not_allow");
		}

		return errors;
	};

	useEffect(() => {
		if (isSubmitting) {
			errorRef.current = validateFormData(formData);
			setFormErrors(validateFormData(formData));
		}
		return () => {};
	}, [formData]);

	//Check if their the last page was details page and redirect to it if it
	useEffect(() => {
		const videoId = props.router.query.videoId;
		const videoTitle = props.router.query.video;
		if (isNil(videoId)) {
			setRedirect({ pathname: "/" });
			return;
		}

		setRedirect({
			pathname: "/detailsmovie",
			query: { videoId: videoId, videoTitle: videoTitle }
		});
	}, []);

	const responseGoogle = response => {
		handleSigninWithGoogle(response.tokenId)
			.then(result => {
				if (result === null) {
					return;
				}
				if (result.status === 200) {
					gtag.event({
						action: "login",
						params: {
							method: "Google"
						}
					});
					gtag.setUserProperties({ userType: "signed" });

					router.push(redirect);
					return;
				}
				if (result.status !== 200) {
					setFormErrors({
						...formErrors,
						email: t(result?.data?.codeType)
					});
				}
			})
			.catch(err => console.error("handleSigninWithGoogle", err));
	};

	const handleSubmit = event => {
		event.preventDefault();

		setIsSubmitting(true);
		const errors = validateFormData(formData);
		setFormErrors(errors);
		errorRef.current = errors;

		if (errors.email === "" && errors.password === "") {
			handleSigninUser(formData)
				.then(result => {
					if (result === null) {
						return;
					}
					if (result?.status === 200) {
						gtag.event({
							action: "login",
							params: {
								method: "Email"
							}
						});
						gtag.setUserProperties({ userType: "signed" });

						router.push(redirect);
						return;
					}
					if (result?.status !== 200) {
						if (result.data.codeType === "email_not_exist") {
							setFormErrors({
								...formErrors,
								email: t("email_not_exist")
							});
							return;
						}

						if (result.data.codeType === "social_media_account") {
							setFormErrors({
								...formErrors,
								email: t("social_media_account")
							});
							return;
						}
						setFormErrors({
							...formErrors,
							password: t(result?.data?.codeType)
						});
					}
				})
				.catch(err => console.error("handleSigninUser", err));
		}
	};

	return (
		<SigninContainer>
			<SigninTitle>
				<KKText classList="title-4">{t("log_in_page_signin")}</KKText>
			</SigninTitle>
			{ENABLED_EMAIL_SIGNIN === "true" && (
				<>
					<SignInForm onSubmit={handleSubmit}>
						<SigninInputContainer>
							<SignInLabel htmlFor="email">
								<KKText classList="label">{t("email")}</KKText>
							</SignInLabel>

							<InputText
								id="email"
								name="email"
								classList={formErrors.email !== "" ? "error" : ""}
								onChange={e => {
									const { name, value } = e.target;
									setFormData({ ...formData, [name]: value });
								}}
							/>
							<SigninError>{formErrors?.email}</SigninError>
						</SigninInputContainer>
						<SigninInputContainer>
							<SignInLabel htmlFor="password">
								<KKText classList="label">{t("password")}</KKText>
							</SignInLabel>
							<InputText
								id="password"
								name="password"
								type="password"
								classList={formErrors.password !== "" ? "error" : ""}
								onChange={e => {
									const { name, value } = e.target;
									setFormData({ ...formData, [name]: value });
								}}
							/>
							<SigninError>{formErrors?.password}</SigninError>
						</SigninInputContainer>{" "}
						<Button
							text={t("log_in_page_signin")}
							classList=""
							width="100%"
							margin="10px 0"
							submitButton="true"
						/>
					</SignInForm>
					<SigninSubContent>
						<Link href="/signin/createaccount">
							<KKLink
								onClick={() => {
									gtag.event({
										action: "login",
										params: {
											button: "create account"
										}
									});
								}}
							>
								{t("log_in_page_create_account")}
							</KKLink>
						</Link>

						<Link href="/signin/forgotpassword">
							<KKLink
								onClick={() => {
									gtag.event({
										action: "login",
										params: {
											button: "forget password"
										}
									});
								}}
							>
								{t("log_in_page_forgot_password")}
							</KKLink>
						</Link>
					</SigninSubContent>
				</>
			)}
			{ENABLED_GOOGLE_SIGNIN === "false" && ENABLED_APPLE_SIGNIN === "false" ? (
				<></>
			) : (
				<SigninDivider>{t("or")}</SigninDivider>
			)}
			{ENABLED_GOOGLE_SIGNIN === "true" &&
				SSO_GOOGLE_CLIENT_ID &&
				SSO_GOOGLE_CLIENT_ID !== "" && (
					<DynamicImportGoogleSignin
						clientId={SSO_GOOGLE_CLIENT_ID}
						onSuccess={responseGoogle}
						cookiePolicy={"single_host_origin"}
						render={renderProps => (
							<Button
								classList={"theme-with-border"}
								margin="0 0 20px 0"
								text={t("continue_with_google")}
								icon="/images/Icons/icons8-google.svg"
								width="100%"
								onClick={() => {
									renderProps.onClick();
								}}
							></Button>
						)}
					/>
				)}
			{ENABLED_APPLE_SIGNIN === "true" &&
				SSO_APPLE_CLIENT_ID &&
				SSO_APPLE_CLIENT_ID !== "" &&
				SSO_APPLE_REDIRECT_URL &&
				SSO_APPLE_REDIRECT_URL !== "" && (
					<>
						<DynamicImportAppleSignin
							clientId={SSO_APPLE_CLIENT_ID}
							redirectURI={SSO_APPLE_REDIRECT_URL}
							scope={"name email"}
							responseType={"code id_token"}
							responseMode={"form_post"}
							usePopup={true}
							render={renderProps => (
								<Button
									classList={"theme-with-border"}
									text={t("continue_with_apple")}
									icon="/images/Icons/apple.svg"
									width="100%"
									iconTopAdjustment="-2px"
									iconLeftAdjustment="-4px"
									onClick={renderProps.onClick}
								></Button>
							)}
							callback={res => {
								if (res?.authorization === null) {
									return;
								}
								handleSigninWithApple(
									res?.authorization?.code,
									res?.authorization?.id_token
								)
									.then(result => {
										if (result === null) {
											return;
										}
										if (result.status === 200) {
											router.push(redirect);
											gtag.event({
												action: "login",
												params: {
													method: "Apple"
												}
											});
											gtag.setUserProperties({ userType: "signed" });
										}
										if (result.status !== 200) {
											setFormErrors({
												...formErrors,
												email: t(result?.data?.codeType)
											});
										}
									})
									.catch(err => console.error("handleSigninWithApple", err));
							}}
						/>
					</>
				)}
		</SigninContainer>
	);
};

Signin.propTypes = {
	router: PropTypes.object
};

export default withRouter(Signin);
