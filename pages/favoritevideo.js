import React from "react";
import Head from "next/head";
import getConfig from "next/config";
import getPublicRuntimeConfig from "@/lib/getPublicRuntimeConfig";

import { FavoriteVideoPage } from "@/components/favorite/favoriteVideoPage";
import { GlobalContainer } from "@/layout/globalContainer";

import nextI18NextConfig from "../next-i18next.config";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function FavoriteVideo() {
	const { PROJECT_TITLE } = getPublicRuntimeConfig();

	return (
		<>
			<Head>
				<title>
					{PROJECT_TITLE}
				</title>
			</Head>
			<GlobalContainer>
				<FavoriteVideoPage />
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
