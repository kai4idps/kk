import React, { useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { KKText } from "@/common/kkText";
import { KKLink } from "@/common/kklink";
import { Modal } from "@/common/modal";
import AuthApi from "@/api/AuthApi";

import {
	ForgotPasswordDetailContainer,
	ForgotPasswordTitle
} from "../style/ForgotPasswordDetail.style";

const ForgotPassWordDetail = () => {
	const router = useRouter();
	const [isShowing, setIsShowing] = useState(false);
	const [isResendEmail, setIsResendEmail] = useState(false);
	const [isPrintText, setIsPrintText] = useState(true);
	const { handleResendForgotPasswordEmail } = AuthApi();
	const { t } = useTranslation("common");

	const renderText = () => {
		if (!isPrintText) {
			return;
		}

		if (isResendEmail) {
			return `${t("resend_email_content", { email: router?.query?.email })}`;
		}

		if (router?.query?.fail === "true" && !isResendEmail) {
			return ``;
		}

		return `${t("forgot_password_detail_page_content", {
			email: router?.query?.email
		})}`;
	};

	const resendEmail = () => {
		setIsPrintText(false);
		handleResendForgotPasswordEmail({ email: router?.query?.email })
			.then(result => {
				if (result === null) {
					return;
				}

				if (result.status !== 201) {
					setIsShowing(!isShowing);
					return;
				}

				setTimeout(function () {
					setIsPrintText(true);
				}, 1000);
				setIsResendEmail(true);
			})
			.catch(err => console.error("handleResendForgotPasswordEmail", err));
	};

	return (
		<ForgotPasswordDetailContainer>
			<ForgotPasswordTitle>
				<KKText classList="title-4">{t("resend_email_title")}</KKText>
			</ForgotPasswordTitle>

			<KKText classList="theme-1 block" padding="0 0 40px 0">
				{t("forgot_password_page_content")}
			</KKText>

			<KKText classList="block" padding="0 0 40px 0">
				{renderText()}
			</KKText>

			<KKText classList="theme-1">{t("Didnt_get_the_email")} </KKText>

			<KKLink
				padding="0 0 0 10px"
				classList="theme-1"
				onClick={() => {
					resendEmail();
				}}
			>
				{t("resend")}
			</KKLink>

			<Modal
				isShowing={isShowing}
				isSingleButton={true}
				title={t("resend_email_fail_title")}
				content={t("try_again_later")}
				hide={() => setIsShowing(!isShowing)}
				confirm={() => setIsShowing(!isShowing)}
			></Modal>
		</ForgotPasswordDetailContainer>
	);
};

export default ForgotPassWordDetail;
