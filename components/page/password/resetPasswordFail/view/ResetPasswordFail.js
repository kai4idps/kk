import React from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Button } from "@/common/button";
import { KKText } from "@/common/kkText";

import {
	ResetPasswordFailContainer,
	ResetPasswordFailBlock,
	ResetPasswordFaildDetailTitle
} from "../style/ResetPasswordFail.style";

const ResetPasswordFail = () => {
	const router = useRouter();
	const { t } = useTranslation("common");

	return (
		<ResetPasswordFailContainer>
			<ResetPasswordFailBlock>
				<ResetPasswordFaildDetailTitle>
					<KKText classList="title-4" padding="0 0 20px 0">
						{t("signup_fail_title")}
					</KKText>
				</ResetPasswordFaildDetailTitle>
				<KKText classList="block theme-1" padding="0 0 50px 0">
					{t("signup_fail_content")}
				</KKText>
				<Button
					text={t("signup_fail_button_text")}
					classList=""
					width="100%"
					margin="10px 0"
					iconLeftAdjustment="-4px"
					onClick={() => {
						router.push("/signin/forgotpassword/");
					}}
				></Button>
			</ResetPasswordFailBlock>
		</ResetPasswordFailContainer>
	);
};

export default ResetPasswordFail;
