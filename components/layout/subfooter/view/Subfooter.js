import React from "react";
import { useTranslation } from "next-i18next";
import { useTheme } from "@emotion/react";
import { KKText } from "@/common/kkText";
import { KKLink } from "@/common/kklink";
import Link from "next/link";
import {
	SubFooterSuperContainer,
	SubFooterContainer
} from "../style/Subfooter.style";

const Subfooter = () => {
	const theme = useTheme();
	const { t, i18n } = useTranslation("common");

	const renderFooterText = () => {
		if (i18n.language === "ja-JP") {
			return (
				<KKText classList="theme-1 extra-small">
					{t("agree")}
					<Link href="/termsofuse">
						<KKLink classList="extra-small theme-1">
							{t("terms_of_use")}
						</KKLink>
					</Link>
					{t("agree_text")} &nbsp;
					<Link href="/privacypolicy">
						<KKLink classList="extra-small theme-1">
							{t("privacy_policy")}
						</KKLink>
					</Link>
					&nbsp;{t("confirm")} &nbsp;
				</KKText>
			);
		}
		if (i18n.language === "zh-TW") {
			return (
				<KKText classList="theme-1 extra-small">
					{t("agree")} &nbsp;
					<Link href="/termsofuse">
						<KKLink classList="extra-small theme-1">
							{t("terms_of_use")}
						</KKLink>
					</Link>
					&nbsp; {t("confirm")} &nbsp;
					<Link href="/privacypolicy">
						<KKLink classList="extra-small theme-1">
							{t("privacy_policy")}
						</KKLink>
					</Link>
				</KKText>
			);
		}

		return (
			<KKText classList="theme-1 extra-small">
				{t("agree")} &nbsp;
				<Link href="/termsofuse">
					<KKLink classList="extra-small theme-1">{t("terms_of_use")}</KKLink>
				</Link>
				&nbsp;{t("confirm")} &nbsp;
				<Link href="/privacypolicy">
					<KKLink classList="extra-small theme-1">
						{t("privacy_policy")}
					</KKLink>
				</Link>
			</KKText>
		);
	};

	return (
		<SubFooterSuperContainer background={theme.colors.background}>
			<SubFooterContainer>
				{renderFooterText()}
			</SubFooterContainer>
		</SubFooterSuperContainer>
	);
};

export default Subfooter;
