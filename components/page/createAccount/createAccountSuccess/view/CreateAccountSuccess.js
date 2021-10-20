import React from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { Button } from "@/common/button";
import { KKText } from "@/common/kkText";

import {
	CreateAccountSuccessContainer,
	CreateAccountSuccessBlock,
	CreateAccountSuccessdDetailTitle
} from "../style/CreateAccountSuccess.style";

const CreateAccountSuccess = () => {
	const router = useRouter();
	const { t } = useTranslation("common");

	return (
		<CreateAccountSuccessContainer>
			<CreateAccountSuccessBlock>
				<CreateAccountSuccessdDetailTitle>
					<KKText classList="title-4" padding="0 0 20px 0">
						{t("signup_success_title")}
					</KKText>
				</CreateAccountSuccessdDetailTitle>
				<KKText classList="block theme-1" padding="0 0 20px 0">
					{t("signup_success_content")}
				</KKText>
				<Button
					text={t("signup_success_button_text")}
					classList=""
					width="100%"
					margin="10px 0"
					iconLeftAdjustment="-4px"
					onClick={() => {
						router.push({
							pathname: "/signin"
						});
					}}
				></Button>
			</CreateAccountSuccessBlock>
		</CreateAccountSuccessContainer>
	);
};

export default CreateAccountSuccess;
