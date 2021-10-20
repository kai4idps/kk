import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { useTranslation } from "next-i18next";
import { Button } from "@/common/button";
import { InputText } from "@/common/inputText";
import { KKLink } from "@/common/kklink";
import { KKText } from "@/common/kkText";
import { Modal } from "@/common/modal";
import useForm from "@/hook/useForm";
import AuthApi from "@/api/AuthApi";
import * as gtag from "@/lib/gtag";
import getPublicRuntimeConfig from "@/lib/getPublicRuntimeConfig";

import {
	CreateAccountSuperContainer,
	CreateAccountContainer,
	CreateAccountInputContainer,
	CreateAccountForm,
	CreateAccountTitle,
	CreateAccountLabel,
	CreateAccountError,
	CreateAccountSubContent,
	CreateAccountDivider
} from "../style/CreateAccount.style";

const CreateAccount = () => {
	const router = useRouter();
	const { t } = useTranslation("common");
	const dispatch = useDispatch({});
	const { handleSignupUser, handleSigninWithGoogle, handleSigninWithApple } =
		AuthApi(dispatch);
	const [internalServerError, setInternalServerError] = useState(false);

	const {
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
		initialState: {
			email: "",
			password: "",
			confirmPassword: ""
		}
	});

	const validateFormData = values => {
		let errors = { email: "", password: "", confirmPassword: "" };
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

		if (!values.email) {
			errors.email = t("space_not_allow");
		} else if (!regex.test(values.email)) {
			errors.email = t("email_format_incorrect");
		}

		if (!values.password) {
			errors.password = t("space_not_allow");
		} else if (values.password.length < 8) {
			errors.password = t("password_format_incorrect");
		} else if (values.password.indexOf(" ") >= 0) {
			errors.password = t("space_not_allow");
		}

		if (!values.confirmPassword) {
			errors.confirmPassword = t("space_not_allow");
		} else if (values.confirmPassword !== values.password) {
			errors.confirmPassword = t("different_password_and_confirm");
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

	const responseGoogle = response => {
		handleSigninWithGoogle(response.tokenId)
			.then(result => {
				if (result === null) {
					return;
				}

				if (result.status === 200) {
					gtag.event({
						action: "register",
						params: {
							button: "create"
						}
					});

					gtag.event({
						action: "register",
						params: {
							method: "Google"
						}
					});
					gtag.setUserProperties({ userType: "signed" });

					router.push({
						pathname: "/"
					});
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
		errorRef.current = errors;
		setFormErrors(errors);

		if (
			errors.email === "" &&
			errors.password === "" &&
			errors.confirmPassword === ""
		) {
			handleSignupUser(formData)
				.then(result => {
					if (result === null) {
						return;
					}
					if (result.status === 200) {
						gtag.event({
							action: "register",
							params: {
								button: "create"
							}
						});
						router.push({
							pathname: "/signin/createaccountdetail/",
							query: {
								email: `${formData?.email}`,
								verifyCode: result?.data?.verifyCode
							}
						});
						return;
					}
					if (result.status !== 200) {
						if (result?.data?.codeType === "mail_send_fail") {
							setInternalServerError(true);
						} else {
							setFormErrors({
								...formErrors,
								email: t(result?.data?.codeType)
							});
						}
					}
				})
				.catch(err => console.error("handleSignupUser", err));
		}
	};

	return (
		<CreateAccountSuperContainer>
			<CreateAccountContainer>
				<CreateAccountForm onSubmit={handleSubmit}>
					<CreateAccountTitle>
						<KKText classList="title-4">
							{t("create_account_page_title")}
						</KKText>
					</CreateAccountTitle>

					<CreateAccountInputContainer>
						<CreateAccountLabel htmlFor="email">
							<KKText classList="label">{t("email")}</KKText>
						</CreateAccountLabel>
						<InputText
							id="email"
							name="email"
							classList={formErrors.email !== "" ? "error" : ""}
							onChange={e => {
								const { name, value } = e.target;
								setFormData({ ...formData, [name]: value });
							}}
						/>
						<CreateAccountError>{formErrors?.email}</CreateAccountError>
					</CreateAccountInputContainer>

					<CreateAccountInputContainer>
						<CreateAccountLabel htmlFor="password">
							<KKText classList="label">{t("password")}</KKText>
						</CreateAccountLabel>
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
						<CreateAccountError>{formErrors?.password}</CreateAccountError>
					</CreateAccountInputContainer>

					<CreateAccountInputContainer>
						<CreateAccountLabel htmlFor="confirmPassword">
							<KKText classList="label">{t("confirm_password")}</KKText>
						</CreateAccountLabel>
						<InputText
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							classList={formErrors.confirmPassword !== "" ? "error" : ""}
							onChange={e => {
								const { name, value } = e.target;
								setFormData({ ...formData, [name]: value });
							}}
						/>
						<CreateAccountError>
							{formErrors?.confirmPassword}
						</CreateAccountError>
					</CreateAccountInputContainer>

					<Button
						text={t("create_button")}
						classList=""
						width="100%"
						margin="10px 0"
						submitButton="true"
					/>
				</CreateAccountForm>

				<CreateAccountSubContent>
					<Link href="/signin">
						<KKLink
							onClick={() => {
								gtag.event({
									action: "register",
									params: {
										button: "have account"
									}
								});
							}}
						>
							{t("have_an_account")}
						</KKLink>
					</Link>
				</CreateAccountSubContent>
				{ENABLED_GOOGLE_SIGNIN === "false" &&
				ENABLED_APPLE_SIGNIN === "false" ? (
					<></>
				) : (
					<CreateAccountDivider>{t("or")}</CreateAccountDivider>
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
									classList="theme-with-border"
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
												gtag.event({
													action: "register",
													params: {
														button: "create"
													}
												});
												gtag.event({
													action: "register",
													params: {
														method: "Apple"
													}
												});
												gtag.setUserProperties({ userType: "signed" });

												router.push({
													pathname: "/"
												});
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
			</CreateAccountContainer>
			<Modal
				isShowing={internalServerError}
				isSingleButton={true}
				title={t("resend_email_fail_title")}
				content={t("try_again_later")}
				hide={() => setInternalServerError(!internalServerError)}
			/>
		</CreateAccountSuperContainer>
	);
};

export default CreateAccount;
