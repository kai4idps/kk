import React from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { KKText } from "@/common/kkText";
import { Button } from "@/common/button";

import {
	ResetPasswordSuccessContainer,
	ResetPasswordSuccessBlock,
	ResetPasswordSuccessdDetailTitle
} from "../style/ResetPasswordSuccess.style";

const ResetPasswordSuccess = () => {
	const router = useRouter();
	const { t } = useTranslation("common");

	return (
		<ResetPasswordSuccessContainer>
			<ResetPasswordSuccessBlock>
				<ResetPasswordSuccessdDetailTitle>
					<KKText classList="title-4" padding="0 0 20px 0">
						{t("reset_password_page_title")}
					</KKText>
				</ResetPasswordSuccessdDetailTitle>
				<KKText classList="block theme-1" padding="0 0 50px 0">
					{t("reset_password_page_context")}
				</KKText>
				<Button
					text={t("reset_password_button")}
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
			</ResetPasswordSuccessBlock>
		</ResetPasswordSuccessContainer>
	);
};

export default ResetPasswordSuccess;
