import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useTheme } from "@emotion/react";

import { Banner } from "@/layout/banner";
import { KKLink } from "@/common/kklink";
import { KKText } from "@/common/kkText";
import { Modal } from "@/common/modal";
import { getLocalStorage } from "@/lib/localStorage";
import { removeLocalStorage } from "@/lib/localStorage";
import TokenFunc from "@/lib/tokenFunc";

import {
	AccountBannerContainer,
	AccountSignOut,
	AccountBannerContent
} from "../style/AccountBanner.style";

const AccountBanner = () => {
	const theme = useTheme();
	const { t } = useTranslation("common");
	const router = useRouter();
	const [isShowingSignOutModal, setIsShowingSignOutModal] = useState(false);

	const { getTokenDetail } = TokenFunc();

	const handleConfirmSignOut = () => {
		router.push({
			pathname: "/signin"
		});

		removeLocalStorage("access_token");
		removeLocalStorage("refresh_Token");
		removeLocalStorage("connection_type");
		removeLocalStorage("plan_type");
	}

	return (
		<>
			<Modal
				isShowing={isShowingSignOutModal}
				title={t("sign_out_confirmation")}
				content={null}
				hide={() => setIsShowingSignOutModal(!isShowingSignOutModal)}
				confirm={() => handleConfirmSignOut()}
				confirmText={t("sign_out")}
			/>

			<Banner>
				<AccountBannerContainer>
					<AccountBannerContent>
						<KKText classList="title-3 word-break" padding="0 20px 0 0">
							{getTokenDetail(getLocalStorage("access_token"))?.email}
						</KKText>

						<AccountSignOut>
							<KKLink
								color={theme.background}
								classList="theme-1"
								onClick={() => {
									setIsShowingSignOutModal(true);
								}}
							>
								{t("accountpage_sign_out")}
							</KKLink>
						</AccountSignOut>
					</AccountBannerContent>
				</AccountBannerContainer>
			</Banner>
		</>
	);
};

export default AccountBanner;
