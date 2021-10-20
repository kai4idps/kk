import React, { useEffect, useState } from "react";
import Head from "next/head";
import "../styles/scss/_globals.scss";
import configureStore from "../store/configureStore";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import { appWithTranslation } from "next-i18next";
import { ThemeComponent } from "../styles/theme/Theme";
import PropTypes from "prop-types";

import { getLocalStorage } from "@/lib/localStorage";
import * as gtag from "@/lib/gtag";
import TokenFunc from "@/lib/tokenFunc";
import getPublicRuntimeConfig from "@/lib/getPublicRuntimeConfig";

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const { store } = configureStore();
	const [loading, setLoading] = useState(false);
	//const [faviconUrl, setFaviconUrl] = useState("");
	const { FAVICON } = getPublicRuntimeConfig();
	const { getTokenDetail } = TokenFunc();

	useEffect(() => {
		const handleRouteChange = url => {
			gtag.pageview({
				url,
				id: getTokenDetail(getLocalStorage("access_token"))?.member_id
			});

			gtag.setUserProperties({ userType: "normal" });
		};

		router.events.on("routeChangeComplete", handleRouteChange);
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [router.events]);

	/* Handle the loading between the pages */
	useEffect(() => {
		const handleStart = url => {
			if (url !== router.asPath) {
				setLoading(true);
			}
		};

		const handleComplete = () => {
			setLoading(false);
		};

		router.events.on("routeChangeStart", handleStart);
		router.events.on("routeChangeComplete", handleComplete);
		router.events.on("routeChangeError", handleComplete);

		return () => {
			router.events.off("routeChangeStart", handleStart);
			router.events.off("routeChangeComplete", handleComplete);
			router.events.off("routeChangeError", handleComplete);
		};
	}, [router.events]);

	return (
		<>
			<Head>
				<link id="fav1" rel="icon shortcut " href={FAVICON} />
				<link id="fav2" rel="apple-touch-icon" href={FAVICON} />
			</Head>

			<Provider store={store}>
				<ThemeComponent
					loading={loading}
					Component={Component}
					pageProps={pageProps}
				/>
			</Provider>
		</>
	);
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.object.isRequired
};

export default appWithTranslation(MyApp);
