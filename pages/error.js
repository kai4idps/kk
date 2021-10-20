import React from "react";
import Head from "next/head";
import getConfig from "next/config";
import nextI18NextConfig from "../next-i18next.config";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { ShareErrorPage } from "@/components/customError/ShareErrorPage";
import { GlobalContainer } from "@/layout/globalContainer";
import getPublicRuntimeConfig from "@/lib/getPublicRuntimeConfig";

export default function custom500() {
	const { PROJECT_TITLE } = getPublicRuntimeConfig();

	return (
		<>
			<Head>
				<title>{ PROJECT_TITLE }</title>
			</Head>
			<GlobalContainer>
				<ShareErrorPage />
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
