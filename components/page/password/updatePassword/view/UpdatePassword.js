import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useDispatch } from "react-redux";
import allActions from "@/store/allActions";
import { Button } from "@/common/button";
import { InputText } from "@/common/inputText";
import { KKText } from "@/common/kkText";
import { Modal } from "@/common/modal";
import AuthApi from "@/api/AuthApi";
import useForm from "@/hook/useForm";
import { getLocalStorage, removeLocalStorage } from "@/lib/localStorage";

import {
	UpdatePasswordDetailContainer,
	FormUpdatePassword,
	UpdatePasswordDetailTitle,
	UpdatePasswordLabel,
	UpdatePasswordInputContainer,
	UpdatePasswordError,
	UpdatePasswordBtnContainer
} from "../style/UpdatePassword.style";

const UpdatePassWord = () => {
	const router = useRouter();
	const { t } = useTranslation("common");

	const dispatch = useDispatch({});
	const { handleUpdatePassword } = AuthApi(dispatch);
	const { removePersistItem } = allActions.AuthActions({ dispatch });

	const [internalServerError, setInternalServerError] = useState(false);

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
			currentPassword: "",
			newPassword: "",
			confirmNewPassword: ""
		}
	});

	const validateFormData = values => {
		let errors = {
			currentPassword: "",
			newPassword: "",
			confirmNewPassword: ""
		};

		if (!values.currentPassword) {
			errors.currentPassword = t("space_not_allow");
		} else if (values.currentPassword.length < 7) {
			errors.currentPassword = t("authentication_needed");
		} else if (values.currentPassword.indexOf(" ") >= 0) {
			errors.currentPassword = t("space_not_allow");
		}

		if (!values.newPassword) {
			errors.newPassword = t("space_not_allow");
		} else if (values.newPassword.length < 7) {
			errors.newPassword = t("password_format_incorrect");
		} else if (values.newPassword.indexOf(" ") >= 0) {
			errors.newPassword = t("space_not_allow");
		}

		if (!values.confirmNewPassword) {
			errors.confirmNewPassword = t("space_not_allow");
		} else if (values.confirmNewPassword.length < 7) {
			errors.confirmNewPassword = t("updatepassword_format_incorrect");
		} else if (values.confirmNewPassword.indexOf(" ") >= 0) {
			errors.confirmNewPassword = t("space_not_allow");
		} else if (values.confirmNewPassword !== values.newPassword) {
			errors.confirmNewPassword = t("different_password_and_confirm");
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
		errorRef.current = errors;
		setFormErrors(errors);

		if (
			errors.currentPassword === "" &&
			errors.newPassword === "" &&
			errors.confirmNewPassword === ""
		) {
			handleUpdatePassword(
				{
					currentPassword: formData.currentPassword,
					newPassword: formData.newPassword
				},
				getLocalStorage("access_token"),
				getLocalStorage("refresh_token")
			)
				.then(result => {
					if (result === null) {
						return;
					}
					if (result.status === 200) {
						router.push("/");
					}
					if (
						result.status !== 200 &&
						result.data.codeType === "authentication_needed"
					) {
						setFormErrors({
							...formErrors,
							currentPassword: t(result.data.codeType)
						});
						return;
					}
					if (
						result.status !== 200 &&
						result.data.codeType === "Unauthorized"
					) {
						router.push({
							pathname: "/signin"
						});
						removePersistItem();
						removeLocalStorage("access_token");
						removeLocalStorage("refresh_Token");
						removeLocalStorage("connection_type");
						removeLocalStorage("plan_type");

						return;
					}
				})
				.catch(err => console.error("handleUpdatePassword", err));
		}
	};

	return (
		<UpdatePasswordDetailContainer>
			<FormUpdatePassword onSubmit={handleSubmit}>
				<UpdatePasswordDetailTitle>
					<KKText classList="title-4">{t("account_update_password")}</KKText>
				</UpdatePasswordDetailTitle>

				<UpdatePasswordInputContainer>
					<UpdatePasswordLabel htmlFor="currentPassword">
						<KKText classList="label">{t("current_password")}</KKText>
					</UpdatePasswordLabel>
					<InputText
						id="currentPassword"
						name="currentPassword"
						type="password"
						classList={formErrors.currentPassword !== "" ? "error" : ""}
						onChange={e => {
							const { name, value } = e.target;
							setFormData({ ...formData, [name]: value });
						}}
					/>
					<UpdatePasswordError>
						{formErrors.currentPassword}
					</UpdatePasswordError>
				</UpdatePasswordInputContainer>

				<UpdatePasswordInputContainer>
					<UpdatePasswordLabel htmlFor="newPassword">
						<KKText classList="label">{t("new_password")}</KKText>
					</UpdatePasswordLabel>
					<InputText
						id="newPassword"
						name="newPassword"
						type="password"
						classList={formErrors.newPassword !== "" ? "error" : ""}
						onChange={e => {
							const { name, value } = e.target;
							setFormData({ ...formData, [name]: value });
						}}
					/>
					<UpdatePasswordError>{formErrors.newPassword}</UpdatePasswordError>
				</UpdatePasswordInputContainer>

				<UpdatePasswordInputContainer>
					<UpdatePasswordLabel htmlFor="confirmNewPassword">
						<KKText classList="label">{t("confirm_new_password")}</KKText>
					</UpdatePasswordLabel>
					<InputText
						id="confirmNewPassword"
						name="confirmNewPassword"
						type="password"
						classList={formErrors.confirmNewPassword !== "" ? "error" : ""}
						onChange={e => {
							const { name, value } = e.target;
							setFormData({ ...formData, [name]: value });
						}}
					/>
					<UpdatePasswordError>
						{formErrors.confirmNewPassword}
					</UpdatePasswordError>
				</UpdatePasswordInputContainer>

				<UpdatePasswordBtnContainer>
					<Button
						text={t("save")}
						classList=""
						width="160px"
						margin="10px 0"
						submitButton="true"
						value="save"
					/>

					<Button
						text={t("cancel_button")}
						classList="light-black"
						width="160px"
						margin="10px 10px 10px 0px"
						value="cancel"
						onClick={event => {
							event.preventDefault();
							router.push("/");
						}}
					/>
				</UpdatePasswordBtnContainer>
			</FormUpdatePassword>
			<Modal
				isShowing={internalServerError}
				isSingleButton={true}
				title={t("update_password_fail_title")}
				content={t("try_again_later")}
				hide={() => setInternalServerError(!internalServerError)}
			></Modal>
		</UpdatePasswordDetailContainer>
	);
};

export default UpdatePassWord;
