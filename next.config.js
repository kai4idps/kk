const { i18n } = require("./next-i18next.config");
const path = require("path");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true" 
});

const nextConfig = {
	devtool: "source-map",
	i18n,
	trailingSlash: true,
	distDir: "build",
	future: {
		webpack5: true
	},
	publicRuntimeConfig: {
		NEXT_PUBLIC_MEMBER_API_ENDPOINT:
			process.env.NEXT_PUBLIC_MEMBER_API_ENDPOINT,
		NEXT_PUBLIC_ORG_ID: process.env.NEXT_PUBLIC_ORG_ID,
		NEXT_PUBLIC_PAYMENT_API_ENDPOINT:
			process.env.NEXT_PUBLIC_PAYMENT_API_ENDPOINT,
		NEXT_PUBLIC_CLIENT_API_ENDPOINT:
			process.env.NEXT_PUBLIC_CLIENT_API_ENDPOINT,
		NEXT_PUBLIC_PLAYBACK_API_ENDPOINT:
			process.env.NEXT_PUBLIC_PLAYBACK_API_ENDPOINT,
		NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
		NEXT_PUBLIC_MERCHANT_ID: process.env.NEXT_PUBLIC_MERCHANT_ID,
		NEXT_PUBLIC_BITMOVIN_LINCENSE_KEY:
			process.env.NEXT_PUBLIC_BITMOVIN_LINCENSE_KEY,
		NEXT_PUBLIC_ECPAY_SERVER_TYPE: process.env.NEXT_PUBLIC_ECPAY_SERVER_TYPE,
		NEXT_PUBLIC_PROJECT_TITLE: process.env.NEXT_PUBLIC_PROJECT_TITLE,
		NEXT_PUBLIC_FAVICON: process.env.NEXT_PUBLIC_FAVICON,
		NEXT_PUBLIC_ENABLED_EMAIL_SIGNIN:
			process.env.NEXT_PUBLIC_ENABLED_EMAIL_SIGNIN,
		NEXT_PUBLIC_ENABLED_GOOGLE_SIGNIN:
			process.env.NEXT_PUBLIC_ENABLED_GOOGLE_SIGNIN,
		NEXT_PUBLIC_ENABLED_APPLE_SIGNIN:
			process.env.NEXT_PUBLIC_ENABLED_APPLE_SIGNIN,
		NEXT_PUBLIC_SSO_GOOGLE_CLIENT_ID:
			process.env.NEXT_PUBLIC_SSO_GOOGLE_CLIENT_ID,
		NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
		NEXT_PUBLIC_SSO_APPLE_CLIENT_ID:
			process.env.NEXT_PUBLIC_SSO_APPLE_CLIENT_ID,
		NEXT_PUBLIC_SSO_APPLE_REDIRECT_URL:
			process.env.NEXT_PUBLIC_SSO_APPLE_REDIRECT_URL,
		NEXT_PUBLIC_GOOGLE_ANALYTICS_CUSTOMER:
			process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_CUSTOMER
	},
	webpack: config => {
		config.resolve.alias = {
			...config.resolve.alias,
			lodash: path.resolve(__dirname, "node_modules/lodash"),
			"@babel/runtime": path.resolve(__dirname, "node_modules/@babel/runtime"),
			"@emotion/react": path.resolve(__dirname, "node_modules/@emotion/react"),
			"@emotion/memoize": path.resolve(
				__dirname,
				"node_modules/@emotion/memoize"
			),
			"@emotion/serialize": path.resolve(
				__dirname,
				"node_modules/@emotion/serialize"
			),
			"@emotion/utils": path.resolve(__dirname, "node_modules/@emotion/utils"),
			"@emotion/cache": path.resolve(__dirname, "node_modules/@emotion/cache"),
			"strip-ansi": path.resolve(__dirname, "node_modules/strip-ansi")
		};

		return config;
	}
};

module.exports = withBundleAnalyzer(nextConfig);
