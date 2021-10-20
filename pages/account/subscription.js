import React from "react";
import Head from "next/head";
import { AccountSubscriptionPage } from "@/components/account/accountSubscriptionPage";
import { GlobalContainer } from "@/layout/globalContainer";
import getConfig from "next/config";
import getPublicRuntimeConfig from "@/lib/getPublicRuntimeConfig";

import nextI18NextConfig from "../../next-i18next.config";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function AccountSubscription() {
	const { PROJECT_TITLE } = getPublicRuntimeConfig();

	return (
		<>
			<Head>
				<title>{"Subscription-" + PROJECT_TITLE}</title>
				<meta name="Description" CONTENT={""} />
				<meta name="robots" content="noindex , follow" />
			</Head>
			<GlobalContainer>
				<AccountSubscriptionPage />
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
