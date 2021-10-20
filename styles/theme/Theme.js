import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { ThemeProvider } from "@emotion/react";
import isNil from "lodash/isNil";
import { variables } from "../styleUtils";
import allActions from "../../store/allActions";
import PropTypes from "prop-types";

import GetPageApi from "@/api/GetPageApi";
import SettingApi from "@/api/SettingApi";
import AuthApi from "@/api/AuthApi";
import TokenFunc from "@/lib/tokenFunc";
import { getLocalStorage, setLocalStorage } from "@/lib/localStorage";
import { Loading } from "@/common/loading";

let themes = {
	theme_white: {
		colors: {
			background: variables.Light_01,
			background2: variables.Light_02,
			background3: variables.Light_03,
			background4: variables.Dark_01,
			text: variables.Dark_03,
			theme: variables.Theme_01,
			theme2: variables.Theme_02,
			border: variables.Dark_01
		},
		images: {
			logo: "/images/default-logo-white-theme.svg",
			favicon: "/images/Icons/icon-play.svg",
			arrowIcon: "arrow-icon-black.svg",
			arrowIconDisabled: "arrow-icon-disabled-black.svg",
			searchIcon: "search-icon-black.svg",
			personIcon: "person-icon-black.svg",
			circlePersonIcon: "circle-person-icon-black.svg",
			listIcon: "list-icon-black.svg"
		}
	},
	theme_black: {
		colors: {
			background: variables.Dark_01,
			background2: variables.Dark_02,
			background3: variables.Dark_03,
			background4: variables.Dark_01,
			text: variables.Light_02,
			theme: variables.Theme_01,
			theme2: variables.Theme_02,
			border: variables.Light_01
		},
		images: {
			logo: "/images/default-logo-black-theme.svg",
			favicon: "/images/Icons/icon-play.svg",
			arrowIcon: "arrow-icon.svg",
			arrowIconDisabled: "arrow-icon-disabled.svg",
			searchIcon: "search-icon.svg",
			personIcon: "person-icon.svg",
			circlePersonIcon: "circle-person-icon.svg",
			listIcon: "list-icon.svg"
		}
	}
};

/* pageList name need to be same as the name define in the component correspondant */
const existingPagesList = [
	{ path: "/", label: "Home", name: "home" },
	{ path: "/genre", label: "Genre", name: "genre" },
	{ path: "/favoritevideo", label: "Favorite", name: "favorite" }
];

export const ThemeComponent = ({ Component, pageProps, loading }) => {
	const dispatch = useDispatch();
	const reduxState = useSelector(state => state.auth);
	const { setPersistItem } = allActions.AuthActions({ dispatch });
	const router = useRouter();
	const { i18n } = useTranslation("common");

	const { projectSetting } = SettingApi();
	const { getListPages } = GetPageApi(dispatch);
	const { handleTokenRefresh } = AuthApi(dispatch);

	const [themesFinal, setThemesFinal] = useState(themes);
	const [isPageRenderReaddy, setIsPageRenderReaddy] = useState(false);
	const [isThemeLoaded, setIsThemeLoaded] = useState(false);

	const { getTokenDetail, isTokenValid, isTokenExist } = TokenFunc();

	useEffect(() => {
		const setSettings = result => {
			if (isNil(result)) {
				console.error("Response from server empty.");
				return;
			}

			if (result.status !== 200) {
				if (isNil(result.data)) {
					console.error("Server error");
					return;
				}

				if (isNil(result.data.error_code) || isNil(result.data.message)) {
					console.error("Server error");
					return;
				}

				console.error(
					"Server error " + result.data.error_code + " : " + result.data.message
				);
				return;
			}

			if (isNil(result.data)) {
				console.error("Server error: Return no data");
				return;
			}

			if (isNil(result.data.theme)) {
				console.error("Server error: Return no theme");
				return;
			}

			if (isNil(result.data.logo)) {
				console.error("Server error: Return no logo");
				return;
			}

			for (const theme in themes) {
				if(!Object.prototype.hasOwnProperty.call(themes, theme)) continue;

				const primary_color = result.data.theme.primary_color;
				const secondary_color = result.data.theme.secondary_color;
				const logo_url = result.data.logo.logo_url;
				const favicon_url = result.data.logo.favicon_url;

				if (!isNil(primary_color) && primary_color !== "") {
					themes[theme].colors.theme = primary_color;
				}

				if (!isNil(secondary_color) && secondary_color !== "") {
					themes[theme].colors.theme2 = secondary_color;
				}

				if (!isNil(logo_url) && logo_url !== "") {
					themes[theme].images.logo = logo_url;
				}

				if (!isNil(favicon_url) && favicon_url !== "") {
					themes[theme].images.favicon = favicon_url;
				}
			}

			setThemesFinal(themes);
			setPersistItem("theme", ApiToFeTheme(result.data.theme.mode));
			setPersistItem("copyright", result.data?.copyright);
			setPersistItem("list_lang", result.data.language.options);

			setIsThemeLoaded(true);

			if (getLocalStorage("lang")) {
				// 看瀏覽器預設的語系是否在api language options list存在
				if (getDefaultLang(result.data.language.options, getLocalStorage("lang")) < 0) {
					setLocalStorage("lang", result.data.language.default);
				} else {
					i18n.changeLanguage(getLocalStorage("lang"));
				}
			} else {
				setLocalStorage("lang", result.data.language.default);
			}
		};

		const setPageList = result => {
			if (isNil(result)) {
				console.error("Response from server empty.");
				setPersistItem("page_list", []);
				return;
			}

			if (result.status !== 200) {
				if (isNil(result.data)) {
					console.error("Server error");
					setPersistItem("page_list", []);
					return;
				}

				if (isNil(result.data.error_code) || isNil(result.data.message)) {
					console.error("Server error");
					setPersistItem("page_list", []);
					return;
				}

				console.error(
					"Server error " + result.data.error_code + " : " + result.data.message
				);
				setPersistItem("page_list", []);
				return;
			}

			if (isNil(result.data)) {
				console.error("Server error: Return no data");
				setPersistItem("page_list", []);
				return;
			}

			const tmpList = [];
			result.data.forEach(function (pageReceive) {
				if (isNil(pageReceive.name) || isNil(pageReceive.id)) {
					return;
				}

				const pageFound = existingPagesList.find(page => {
					return page.name === pageReceive.name;
				});

				if (!isNil(pageFound)) {
					tmpList.push({
						name: pageFound.name,
						label: pageFound.label,
						id: pageReceive.id,
						path: pageFound.path
					});
				}
			});

			setPersistItem("page_list", tmpList);
		};

		const loadSetting = async () => {
			const result = await projectSetting();
			await setSettings(result);
		};

		const loadPageList = async () => {
			const result = await getListPages();
			await setPageList(result);
		};

		loadSetting();
		loadPageList();
	}, []);

	/**
	 * @param {String} value Api theme value
	 * return theme to save.
	 */
	function ApiToFeTheme(value) {
		if (value === "DARK") {
			return "theme_black";
		} else if (value === "LIGHT") {
			return "theme_white";
		} else {
			return "theme_black";
		}
	}

	function getTheme(index) {
		let actualTheme = themesFinal.theme_black;
		if (index === "theme_white") {
			actualTheme = themesFinal.theme_white;
		}

		return actualTheme;
	}

	function getDefaultLang(options, lang) {
		return options.findIndex(langs => langs === lang);
	}

	/**
	 * Refresh the access token of the user. Redirect to sign in page if fail
	 * @param {String} memberId id of the user
	 */
	function refreshToken(memberId) {
		// access token expired
		handleTokenRefresh(memberId)
			.then(result => {
				if (result === null) {
					return;
				}
				if (result.status === 201 || result.status === 200) {
					setIsPageRenderReaddy(true);
					return;
				}

				if (result.status !== 201) {
					router.push({ pathname: "/signin" });
				}
			})
			.catch(err => console.error("token refresh", err));
	}

	function isPageNeedAccessToken() {
		if (
			router.pathname === "/" ||
			router.pathname === "/detailsmovie" ||
			router.pathname === "/404" ||
			router.pathname === "/error" ||
			router.pathname === "/cookiepolicy" ||
			router.pathname === "/termsofuse" ||
			router.pathname === "/privacypolicy" ||
			router.pathname === "/signin" ||
			router.pathname === "/signin/createaccount" ||
			router.pathname === "/signin/createaccountdetail" ||
			router.pathname === "/signin/createaccountsuccess" ||
			router.pathname === "/signin/createaccountfail" ||
			router.pathname === "/signin/forgotpassword" ||
			router.pathname === "/signin/forgotpassworddetail" ||
			router.pathname === "/signin/resetpassword" ||
			router.pathname === "/signin/resetpassworddone" ||
			router.pathname === "/signin/resetpasswordfail"
		) {
			return false;
		}

		return true;
	}

	/* On each page change */
	useEffect(() => {
		/* We delete the lock scroll for mobil menu */
		document.body.classList.remove("lock-scroll");

		/* Check if the page is allow to all user */
		if (!isPageNeedAccessToken()) {
			setIsPageRenderReaddy(true);
			return;
		}

		const checkAccessTokenValidity = async () => {
			const accessTokenDetail = await getTokenDetail(
				getLocalStorage("access_token")
			);
			const isAccessTokenValid = await isTokenValid(accessTokenDetail);
			if (isAccessTokenValid) {
				setIsPageRenderReaddy(true);
			} else {
				const isRefreshTokenExist = isTokenExist(
					getLocalStorage("refresh_Token")
				);

				if (isRefreshTokenExist) {
					refreshToken(accessTokenDetail?.member_id);
				} else {
					router.push({ pathname: "/signin" });
				}
			}
		}

		/* If their is no access token redirect to sign in else verfify if token is valid */
		if (!isTokenExist(getLocalStorage("access_token"))) {
			router.push({ pathname: "/signin" });
		} else {
			checkAccessTokenValidity();
		}
	}, [router.asPath]);

	return (
		<>
			<ThemeProvider theme={getTheme(reduxState.theme)}>
				{loading || !isThemeLoaded || !isPageRenderReaddy ? (
					<Loading />
				) : (
					<Component {...pageProps} />
				)}
			</ThemeProvider>
		</>
	);
};

ThemeComponent.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired
}
