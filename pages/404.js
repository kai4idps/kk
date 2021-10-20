import React from "react";
import Head from "next/head";
import getPublicRuntimeConfig from "@/lib/getPublicRuntimeConfig";

import { ErrorPage } from "@/components/customError/errorPage";
import { GlobalContainer } from "@/layout/globalContainer";

import nextI18NextConfig from "../next-i18next.config";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function FourOhFour() {
	const { PROJECT_TITLE } = getPublicRuntimeConfig();

	return (
		<>
			<Head>
				<title>
					{PROJECT_TITLE}
				</title>
			</Head>
			<GlobalContainer>
				<ErrorPage />
			</GlobalContainer>
		</>
	);
}

export const getStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale, ["common"], nextI18NextConfig))
	}
});
