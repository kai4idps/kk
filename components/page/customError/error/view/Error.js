import React, { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { KKText } from "@/common/kkText";
import { Button } from "@/common/button";
import getPublicRuntimeConfig from "@/lib/getPublicRuntimeConfig";

import { ErrorContainer, ErrordDetailTitle } from "../style/Error.style";

const Error = () => {
	const router = useRouter();
	const { t } = useTranslation("common");
	const { PROJECT_ID } = getPublicRuntimeConfig();

	const renderErrorMessage = () => {
		if (!router.query.code) {
			return {
				errorMessageTitle: `${t("error_message")}`,
				errorMessageContent: `${t("error_code", { code: 404 })}`
			};
		}

		if (router.query.message) {
			return {
				errorMessageTitle: `${t(router.query.message)}`,
				errorMessageContent: `${t("error_code", { code: router.query.code })}`
			};
		}

		switch (router.query.code) {
			case "400":
				return {
					errorMessageTitle: `${t("error_message")}`,
					errorMessageContent: `${t("error_code", { code: 400 })}`
				};
			case "403":
				return {
					errorMessageTitle: `${t("error_message_403")}`,
					errorMessageContent: `${t("error_code", { code: 403 })}`
				};
			case "404":
				return {
					errorMessageTitle: `${t("error_message")}`,
					errorMessageContent: `${t("error_code", { code: 404 })}`
				};
			case "500":
				return {
					errorMessageTitle: `${t("error_message_500")}`,
					errorMessageContent: `${t("error_code", { code: 500 })}`
				};
			case "503":
				return {
					errorMessageTitle: `${t("error_message")}`,
					errorMessageContent: `${t("error_code", { code: 503 })}`
				};
			default:
				return {
					errorMessageTitle: `${t("error_message")}`,
					errorMessageContent: `${t("error_code", { code: 404 })}`
				};
		}
	};

	useEffect(() => {
		if (!PROJECT_ID || PROJECT_ID === undefined) {
			window?.location.reload();
		}
		return () => {};
	}, []);

	return (
		<ErrorContainer>
			<ErrordDetailTitle>
				<KKText classList="title-2">
					{renderErrorMessage().errorMessageTitle}
				</KKText>
			</ErrordDetailTitle>

			<KKText classList="block  center" padding="0 0 50px 0">
				{renderErrorMessage().errorMessageContent}
			</KKText>

			<Button
				text={t("back_to_home")}
				classList=""
				width="100%"
				margin="10px 0"
				iconLeftAdjustment="-4px"
				onClick={() => {
					router.push({
						pathname: "/"
					});
				}}
			></Button>
		</ErrorContainer>
	);
};

export default Error;
