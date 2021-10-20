import React from "react";
import Head from "next/head";
import { HomePage } from "@/components/homePage";
import { GlobalContainer } from "@/layout/globalContainer";
import getConfig from "next/config";
import getPublicRuntimeConfig from "@/lib/getPublicRuntimeConfig";

import nextI18NextConfig from "../next-i18next.config";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home() {
	const { PROJECT_TITLE } = getPublicRuntimeConfig();

	return (
		<>
			<Head>
				<title>
					{PROJECT_TITLE +
						" - Enjoy unlimited video streaming, live streaming!"}
				</title>
				<meta
					name="Description"
					CONTENT={
						PROJECT_TITLE +
						" is a subscription based online streaming platform and provides your favorite videos and live events."
					}
				/>
			</Head>
			<GlobalContainer>
				<HomePage />
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
