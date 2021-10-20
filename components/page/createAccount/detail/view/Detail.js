import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useTranslation } from "next-i18next";
import { KKText } from "@/common/kkText";
import { KKLink } from "@/common/kklink";
import { Modal } from "@/common/modal";
import AuthApi from "@/api/AuthApi";
import * as gtag from "@/lib/gtag";

import { DetailContainer } from "../style/Detail.style";

const Detail = () => {
	const router = useRouter();
	const dispatch = useDispatch({});
	const { handleVerifyEmail, handleResendCreateAccountEmail } =
		AuthApi(dispatch);
	const token = router.asPath?.replace("/signin/createaccountdetail/?", "");

	const [isShowing, setIsShowing] = useState(false);
	const [response, setResponse] = useState({});
	const [isResendEmail, setIsResendEmail] = useState(false);
	const [isClickVerifyUrl, setIsClickVerifyUrl] = useState(false);
	const [isPrintText, setIsPrintText] = useState(true);

	const { t } = useTranslation("common");

	useEffect(() => {
		if (router?.query?.email) {
			setIsClickVerifyUrl(true);
			setResponse({ ...response, email: router?.query?.email });
			return;
		}

		if (!router?.query?.email) {
			handleVerifyEmail(token)
				.then(result => {
					if (result?.data.codeType === "jwt_unauthorized") {
						router.push({
							pathname: "/signin/createaccountfail/",
							query: {
								email: result?.data?.email,
								isValid: "false"
							}
						});
						return;
					}

					if (result?.data.codeType === "verify_code_invalid") {
						router.push({
							pathname: "/signin/createaccountfail/",
							query: {
								email: result?.data?.email,
								isValid: "true"
							}
						});
						return;
					}

					if (result?.status === 200) {
						gtag.event({
							action: "register",
							params: {
								method: "Email"
							}
						});
						gtag.setUserProperties({ userType: "signed" });

						router.push("/signin/createaccountsuccess/");
						setIsClickVerifyUrl(true);
						return;
					}
				})
				.catch(err => console.error("handleVerifyEmail", err));
		}
		return () => {};
	}, []);

	const resendEmail = async () => {
		setIsPrintText(false);
		await handleResendCreateAccountEmail({ email: response?.email })
			.then(result => {
				if (result === null) {
					return;
				}

				if (result.status !== 201) {
					setIsShowing(!isShowing);
					return;
				}

				setIsResendEmail(true);

				setTimeout(function () {
					setIsPrintText(true);
				}, 1000);
			})
			.catch(err => console.error("handleResendCreateAccountEmail", err));
	};

	const renderText = () => {
		if (!isPrintText) {
			return;
		}
		if (isResendEmail) {
			return `${t("resend_email_content", { email: response?.email })}`;
		}

		if (router?.query?.fail === "true" && !isResendEmail) {
			return ``;
		}

		if (
			router?.query?.email &&
			router?.query?.email !== "" &&
			router?.query?.fail !== "true"
		) {
			return `${t("forgot_password_detail_page_content", {
				email: router?.query?.email
			})}`;
		}

		return;
	};

	return (
		<DetailContainer>
			{router?.query?.email && isClickVerifyUrl && (
				<>
					<KKText classList="block title-4 center" padding="0 0 20px 0">
						{t("resend_email_title")}
					</KKText>

					<KKText classList="block theme-1" padding="0 0 50px 0">
						{t("create_account_detail")}
					</KKText>

					<KKText classList="block" padding="0 0 50px 0">
						{renderText()}
					</KKText>

					<KKText classList="inline-block theme-1">
						{t("Didnt_get_the_email")}
					</KKText>

					<KKLink
						padding="0 0 0 10px"
						classList="theme-1"
						onClick={() => {
							resendEmail();
						}}
					>
						{t("resend")}
					</KKLink>
				</>
			)}

			<Modal
				isShowing={isShowing}
				isSingleButton={true}
				title={t("resend_email_fail_title")}
				content={t("try_again_later")}
				hide={() => setIsShowing(!isShowing)}
			/>
		</DetailContainer>
	);
};

export default Detail;
