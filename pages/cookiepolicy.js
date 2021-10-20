import React from "react";
import Head from "next/head";
import { CookiePolicyPage } from "@/components/cookiePolicyPage";
import { GlobalContainer } from "@/layout/globalContainer";
import getConfig from "next/config";
import getPublicRuntimeConfig from "@/lib/getPublicRuntimeConfig";

import nextI18NextConfig from "../next-i18next.config";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Cookiepolicy() {
	const { PROJECT_TITLE } = getPublicRuntimeConfig();

	return (
		<>
			<Head>
				<title>{"Cookie Policy-" + PROJECT_TITLE}</title>
				<meta name="Description" CONTENT={""} />
			</Head>
			<GlobalContainer>
				<CookiePolicyPage />
			</GlobalContainer>
		</>
	);
}

export const getServerSideProps = async ({ locale }) => {
	const { publicRuntimeConfig } = getConfig();

	return {
		props: {
			publicRuntimeConfig,
			...(await serverSideTranslations(
				locale,
				["common", "cookiePolicy"],
				nextI18NextConfig
			))
		}
	};
};
