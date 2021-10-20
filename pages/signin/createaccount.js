import React from "react";
import Head from "next/head";
import getConfig from "next/config";
import getPublicRuntimeConfig from "@/lib/getPublicRuntimeConfig";

import { CreateAccountPage } from "@/components/createAccount/createAccountPage";
import { GlobalContainer } from "@/layout/globalContainer";

import nextI18NextConfig from "../../next-i18next.config";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function CreateAccount() {
	const { SSO_APPLE_CLIENT_ID, SSO_APPLE_REDIRECT_URL, PROJECT_TITLE } =
		getPublicRuntimeConfig();

	return (
		<>
			<Head>
				<title>
					{"Register-" + PROJECT_TITLE}
				</title>
				<meta name="Description" CONTENT={""} />
				<meta name="robots" content="noindex , follow" />
				<meta name="appleid-signin-client-id" content={SSO_APPLE_CLIENT_ID} />
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
				<CreateAccountPage />
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
