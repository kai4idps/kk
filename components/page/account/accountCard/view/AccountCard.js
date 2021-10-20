import React from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import * as gtag from "@/lib/gtag";

import { KKLink } from "@/common/kklink";
import { KKText } from "@/common/kkText";
import { useTheme } from "@emotion/react";
import { getLocalStorage } from "@/lib/localStorage";
import TokenFunc from "@/lib/tokenFunc";

import {
	SectionAccountCard,
	CardContainer,
	CardContentDetail,
	CardTitleText,
	CardTitle,
	CardContent
} from "../style/AccountCard.style";

const AccountCard = () => {
	const theme = useTheme();
	const { t } = useTranslation("common");
	const { getTokenDetail } = TokenFunc();

	return (
		<SectionAccountCard>
			<CardContainer background={theme.colors.background3}>
				<CardTitle background={theme.colors.background2}>
					<CardTitleText
						className="account"
						image={theme.images.circlePersonIcon}
					>
						<KKText classList="title-1">{t("accountpage_account")}</KKText>
					</CardTitleText>
				</CardTitle>
				<CardContent>
					{getLocalStorage("connection_type") === "local" ? (
						<>
							<Link href="/signin/updatepassword">
								<KKLink padding="0 0 15px 0">
									{t("account_update_password")}
								</KKLink>
							</Link>
						</>
					) : (
						<>
							<CardContentDetail>
								<KKText classList="word-break" padding="0 0 15px 0">
									{`${t("login_in_with")}: ${getTokenDetail(getLocalStorage("access_token"))?.email}`}
								</KKText>
							</CardContentDetail>
						</>
					)}
					<Link href="/account/subscription">
						<KKLink
							padding="0 0 15px 0"
							onClick={() => {
								gtag.event({
									action: "subscription",
									params: {
										button: "subscribe"
									}
								});
							}}
						>
							{t("account_Subscription")}
						</KKLink>
					</Link>
				</CardContent>
			</CardContainer>

			<CardContainer background={theme.colors.background3}>
				<CardTitle background={theme.colors.background2}>
					<CardTitleText className="about" image={theme.images.listIcon}>
						<KKText classList="title-1">{t("accountpage_about")}</KKText>
					</CardTitleText>
				</CardTitle>
				<CardContent>
					<Link href="/privacypolicy">
						<KKLink padding="0 0 15px 0">{t("privacy_policy")}</KKLink>
					</Link>

					<Link href="/termsofuse" padding="0 0 15px 0">
						<KKLink>{t("terms_of_use")}</KKLink>
					</Link>
				</CardContent>
			</CardContainer>
		</SectionAccountCard>
	);
};

export default AccountCard;
