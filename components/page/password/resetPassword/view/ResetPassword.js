import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useDispatch } from "react-redux";
import { Button } from "@/common/button";
import useForm from "@/hook/useForm";
import AuthApi from "@/api/AuthApi";
import { KKText } from "@/common/kkText";
import { InputText } from "@/common/inputText";

import {
	ResetPasswordDetailContainer,
	ResetPasswordDetailTitle,
	ResetPasswordInputContainer,
	ResetPasswordLabel
} from "../style/ResetPassword.style";

const ResetPassword = () => {
	const router = useRouter();
	const [isClickVerifyUrl, setIsClickVerifyUrl] = useState(null);
	const dispatch = useDispatch({});
	const { handleVerifyEmail, handleResetPassword } = AuthApi(dispatch);
	const token = router.asPath?.replace("/signin/resetpassword/?", "");
	const { t } = useTranslation("common");

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
			password: "",
			newPassword: ""
		}
	});

	const validateFormData = values => {
		let errors = {
			password: "",
			newPassword: ""
		};

		if (!values.password) {
			errors.password = t("space_not_allow");
		} else if (values.password.length < 8) {
			errors.password = t("password_format_incorrect");
		} else if (values.password.indexOf(" ") >= 0) {
			errors.password = t("space_not_allow");
		}

		if (!values.newPassword) {
			errors.newPassword = t("space_not_allow");
		} else if (values.newPassword.length < 7) {
			errors.newPassword = t("password_format_incorrect");
		} else if (values.newPassword.indexOf(" ") >= 0) {
			errors.newPassword = t("space_not_allow");
		} else if (values.newPassword !== values.password) {
			errors.newPassword = t("different_password_and_confirm");
		}

		return errors;
	};

	useEffect(() => {
		if (
			formData?.newPassword !== "" &&
			formData?.password !== "" &&
			isSubmitting
		) {
			errorRef.current = validateFormData(formData);

			setFormErrors(validateFormData(formData));
		}
		return () => {};
	}, [formData]);

	useEffect(() => {
		handleVerifyEmail(token)
			.then(result => {
				if (result?.status !== 200) {
					setIsClickVerifyUrl(false);
					router.push({
						pathname: "/signin/resetpasswordfail",
						query: {
							email: result?.data?.email,
							codeType: result?.data?.codeType
						}
					});
					return;
				}
				setIsClickVerifyUrl(true);
			})
			.catch(err => console.error("handleVerifyEmail", err));
		return () => {};
	}, []);

	return (
		<>
			{isClickVerifyUrl === true && (
				<ResetPasswordDetailContainer>
					<div style={{ maxWidth: "350px" }}>
						<ResetPasswordDetailTitle>
							<KKText classList="title-4" padding="0 0 20px 0">
								{t("reset_password")}
							</KKText>
						</ResetPasswordDetailTitle>
						<ResetPasswordInputContainer>
							<KKText classList="label" padding="2px 0">
								{t("new_password")}
							</KKText>
							<InputText
								id="password"
								name="password"
								type="password"
								classList={formErrors.password !== "" ? "error" : ""}
								isSubmitting={isSubmitting}
								onChange={e => {
									const { name, value } = e.target;
									setFormData({ ...formData, [name]: value });
								}}
							/>
							<ResetPasswordLabel>{formErrors?.password}</ResetPasswordLabel>
						</ResetPasswordInputContainer>

						<ResetPasswordInputContainer>
							<KKText classList="label" padding="2px 0">
								{t("confirm_new_password")}
							</KKText>
							<InputText
								id="newPassword"
								name="newPassword"
								type="password"
								classList={formErrors.newPassword !== "" ? "error" : ""}
								isSubmitting={isSubmitting}
								onChange={e => {
									const { name, value } = e.target;
									setFormData({ ...formData, [name]: value });
								}}
							/>
							<ResetPasswordLabel>{formErrors?.newPassword}</ResetPasswordLabel>
						</ResetPasswordInputContainer>
						<Button
							text={t("save")}
							classList=""
							width="350px"
							margin="10px 0"
							onClick={() => {
								if (formData?.newPassword !== "" && formData?.password !== "") {
									setIsSubmitting(true);
									setFormErrors(validateFormData(formData));
									errorRef.current = validateFormData(formData);
								}
								if (
									formData?.newPassword !== "" &&
									formData?.password !== "" &&
									errorRef.current?.password === "" &&
									errorRef.current?.newPassword === ""
								) {
									handleResetPassword(
										{ password: formData?.newPassword },
										token
									)
										.then(result => {
											if (result.status === 200) {
												router.push("/signin/resetpassworddone/");
											}
											if (result.status !== 200) {
												setFormErrors({
													...formErrors,
													password: t(result.data.codeType),
													newPassword: t(result.data.codeType)
												});
											}
										})
										.catch(err => console.error("handleResetPassword", err));
								}
							}}
						/>
					</div>
				</ResetPasswordDetailContainer>
			)}
		</>
	);
};

export default ResetPassword;
