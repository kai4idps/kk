import React from "react";
import Head from "next/head";
import { AccountSubscriptionPaiementPage } from "@/components/account/accountSubscriptionPaiementPage";
import { GlobalContainer } from "@/layout/globalContainer";
import { useTheme } from "@emotion/react";
import getConfig from "next/config";
import getPublicRuntimeConfig from "@/lib/getPublicRuntimeConfig";

import nextI18NextConfig from "../../next-i18next.config";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function AccountSubscription() {
	const { PROJECT_TITLE } = getPublicRuntimeConfig();
	const theme = useTheme();

	return (
		<>
			<Head>
				<title>{ PROJECT_TITLE }</title>
			</Head>
			<GlobalContainer background={theme.colors.background2}>
				<AccountSubscriptionPaiementPage />
			</GlobalContainer>
		</>
	);
}

export const getServerSideProps = async ({ locale }) => {
	const { publicRuntimeConfig } = getConfig();

	return {
		props: {
			publicRuntimeConfig,
			...(await serverSideTranslations(locale, ["common"], nextI18NextConfig))
		}
	};
};
