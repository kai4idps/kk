import React from "react";
import Head from "next/head";
import getConfig from "next/config";
import getPublicRuntimeConfig from "@/lib/getPublicRuntimeConfig";

import { SigninPage } from "../../components/page/signin/signinPage";
import { GlobalContainer } from "../../components/layout/globalContainer";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "../../next-i18next.config";

export default function Signin() {
	const { SSO_APPLE_CLIENT_ID, SSO_APPLE_REDIRECT_URL, PROJECT_TITLE } =
		getPublicRuntimeConfig();

	return (
		<>
			<Head>
				<title>
					{"Login-" + PROJECT_TITLE}
				</title>
				<meta name="appleid-signin-client-id" content={SSO_APPLE_CLIENT_ID} />
				<meta name="Description" CONTENT={""} />
				<meta name="robots" content="noindex , follow" />
				<meta
					name="appleid-signin-redirect-uri"
					content={SSO_APPLE_REDIRECT_URL}
				/>
				<meta name="appleid-signin-scope" content="name email" />
				<meta name="appleid-signin-use-popup" content="true" />
				<script
					type="text/javascript"
					src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
				></script>
			</Head>
			<GlobalContainer>
				<SigninPage />
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
