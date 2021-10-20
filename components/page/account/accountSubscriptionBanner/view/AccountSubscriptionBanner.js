import React from "react";
import { useTranslation } from "next-i18next";
import { Banner } from "@/layout/banner";
import { KKText } from "@/common/kkText";

import {
	AccountSubscriptionBannerContainer
} from "../style/AccountSubscriptionBanner.style";

const AccountSubscriptionBanner = () => {
	const { t } = useTranslation("common");

	return (
		<>
			<Banner>
				<AccountSubscriptionBannerContainer>
					<KKText classList="title-3">
						{t("account_Subscription")}
					</KKText>
				</AccountSubscriptionBannerContainer>
			</Banner>
		</>
	);
};

export default AccountSubscriptionBanner;
