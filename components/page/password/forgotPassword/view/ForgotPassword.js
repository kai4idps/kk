import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useTranslation } from "next-i18next";

import AuthApi from "@/api/AuthApi";

import useForm from "@/hook/useForm";
import { Button } from "@/common/button";
import { InputText } from "@/common/inputText";
import { KKText } from "@/common/kkText";
import { Modal } from "@/common/modal";

import {
	ForgotPasswordContainer,
	FormForgotPassword,
	ForgotPasswordTitle,
	ForgotPasswordInputContainer,
	ForgotPasswordLabel,
	ForgotPasswordError
} from "../style/ForgotPassword.style";

const ForgotPassWord = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { handleForgotPassword } = AuthApi(dispatch);
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
			email: ""
		}
	});

	const [internalServerError, setInternalServerError] = useState(false);

	const validateFormData = values => {
		let errors = { email: "" };
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

		if (!values.email) {
			errors.email = t("space_not_allow");
		} else if (!regex.test(values.email)) {
			errors.email = t("email_format_incorrect");
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

	const handleSubmit = event => {
		event.preventDefault();

		setIsSubmitting(true);
		const errors = validateFormData(formData);
		setFormErrors(errors);
		errorRef.current = errors;
		if (errors.email === "") {
			handleForgotPassword({ email: `${formData.email}` })
				.then(result => {
					if (result === null) {
						return;
					}
					if (result.status !== 200) {
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

						if (result.data.codeType === "email_format_incorrect") {
							setFormErrors({
								...formErrors,
								email: t("email_format_incorrect")
							});
							return;
						}

						if (result?.data?.codeType === "mail_send_fail") {
							setInternalServerError(true);
							return;
						}

						return;
					}

					router.push({
						pathname: "/signin/forgotpassworddetail",
						query: { email: `${formData.email}` }
					});
				})
				.catch(err => console.error("handleForgotPassword", err));
		}
	};

	return (
		<ForgotPasswordContainer>
			<FormForgotPassword onSubmit={handleSubmit}>
				<ForgotPasswordTitle>
					<KKText classList="title-4">{t("forgot_password_page_title")}</KKText>
				</ForgotPasswordTitle>

				<KKText classList="theme-1">{t("forgot_password_page_content")}</KKText>

				<ForgotPasswordInputContainer>
					<ForgotPasswordLabel htmlFor="email">
						<KKText classList="label">{t("email")}</KKText>
					</ForgotPasswordLabel>

					<InputText
						id="email"
						name="email"
						classList={formErrors.email !== "" ? "error" : ""}
						onChange={e => {
							const { name, value } = e.target;
							setFormData({ ...formData, [name]: value });
						}}
					/>

					<ForgotPasswordError>{formErrors.email}</ForgotPasswordError>
				</ForgotPasswordInputContainer>
				<Button
					text={t("forgot_password_button")}
					classList=""
					width="100%"
					margin="10px 0"
					submitButton="true"
				/>
			</FormForgotPassword>

			<Modal
				isShowing={internalServerError}
				isSingleButton={true}
				title={t("resend_email_fail_title")}
				content={t("try_again_later")}
				hide={() => setInternalServerError(!internalServerError)}
			/>
		</ForgotPasswordContainer>
	);
};

export default ForgotPassWord;
