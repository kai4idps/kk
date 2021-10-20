import React, { useState } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Button } from "@/common/button";
import { KKText } from "@/common/kkText";
import { KKLink } from "@/common/kklink";

import {
	CreateAccountFailContainer,
	CreateAccountFailBlock,
	CreateAccountFaildDetailTitle
} from "../style/CreateAccountFail.style";

const CreateAccountFail = () => {
	const router = useRouter();
	const { t, i18n } = useTranslation("common");
	const [isValid] = useState(router.query.isValid === "true");

	if (i18n.language === "ja-JP" && isValid) {
		return (
			<>
				<CreateAccountFailContainer>
					<CreateAccountFailBlock>
						<CreateAccountFaildDetailTitle>
							<KKText classList="title-4" padding="0 0 20px 0">
								{t("invalid_link")}
							</KKText>
						</CreateAccountFaildDetailTitle>
						<KKText classList="block" padding="0 0 30px 0">
							{t("invalid_link_title")}
						</KKText>
						<KKText classList="inline-block">
							{t("invalid_link_content")}
						</KKText>
						<Link href="/signin">
							<KKLink classList="theme-2 inline-block" padding="0 0 0 5px">
								{t("log_in")}
							</KKLink>
						</Link>
						<KKText classList="inline-block">{t("please")}</KKText>
					</CreateAccountFailBlock>
				</CreateAccountFailContainer>
			</>
		);
	}

	return (
		<CreateAccountFailContainer>
			<CreateAccountFailBlock>
				{isValid && (
					<>
						<CreateAccountFaildDetailTitle>
							<KKText classList="title-4" padding="0 0 20px 0">
								{t("invalid_link")}
							</KKText>
						</CreateAccountFaildDetailTitle>
						<KKText classList="block" padding="0 0 30px 0">
							{t("invalid_link_title")}
						</KKText>
						<KKText classList="inline-block">
							{t("invalid_link_content")}
						</KKText>
						<Link href="/signin">
							<KKLink classList="theme-2 inline-block" padding="0 0 0 5px">
								{t("log_in")}
							</KKLink>
						</Link>
					</>
				)}
				{!isValid && (
					<>
						{" "}
						<CreateAccountFaildDetailTitle>
							<KKText classList="title-4" padding="0 0 20px 0">
								{t("signup_fail_title")}
							</KKText>
						</CreateAccountFaildDetailTitle>
						<KKText classList="block theme-1" padding="0 0 30px 0">
							{t("signup_fail_content")}
						</KKText>
						<Button
							text={t("accountpage_sign_up")}
							classList=""
							width="100%"
							margin="10px 0"
							iconLeftAdjustment="-4px"
							onClick={() => {
								router.push("/signin/createaccount/");
							}}
						></Button>{" "}
					</>
				)}
			</CreateAccountFailBlock>
		</CreateAccountFailContainer>
	);
};

export default CreateAccountFail;
