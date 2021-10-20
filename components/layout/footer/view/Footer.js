import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import allActions from "@/store/allActions";
import { useTranslation } from "next-i18next";
import { useTheme } from "@emotion/react";
import isNil from "lodash/isNil";

import * as gtag from "@/lib/gtag";
import getPublicRuntimeConfig from "@/lib/getPublicRuntimeConfig";
import { setLocalStorage, getLocalStorage } from "@/lib/localStorage";
import { KKText } from "@/common/kkText";
import { KKLink } from "@/common/kklink";
import SettingApi from "@/api/SettingApi";
import SubscriptionApi from "@/api/SubscriptionApi";

import {
	FooterContainer,
	FooterTextContainer,
	FooterCompany,
	FooterLinks,
	SecretContent,
	FooterLangContainer,
	LangText,
	LangContent
} from "../style/Footer.style";

const Footer = () => {
	const dispatch = useDispatch();
	const theme = useTheme();
	const { t, i18n } = useTranslation("common");
	const reduxState = useSelector(state => state.auth);
	const { setPersistItem } = allActions.AuthActions({
		dispatch
	});

	const { getMemberVersionNumber } = SettingApi();
	const { getPaymentVersion } = SubscriptionApi();

	const secretContainer = useRef(null);
	const langContainer = useRef(null);

	const [isVisibleSecret, setIsVisibleSecret] = useState(false);
	const [isVisiblelangType, setIsVisibleLangType] = useState(false);

	const [isSpacePress, setIsSpacePress] = useState(false);

	const { WEB_VERSION } = getPublicRuntimeConfig();
	const [memberVersion, setMemberVersion] = useState("");
	const [paymentVersion, setPaymentVersion] = useState("");

	const switchLangText = text => {
		if (isNil(text)) {
			return "";
		}
		
		const upperCaseText = text.toUpperCase();
		switch (upperCaseText) {
			case "EN-US":
				return "English";
			case "JA-JP":
				return "日本語";
			case "ZH-TW":
				return "繁體中文";
			default:
				return text;
		}
	};

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				secretContainer.current &&
				!secretContainer.current.contains(event.target)
			) {
				setIsVisibleSecret(false);
			}

			if (
				langContainer.current &&
				!langContainer.current.contains(event.target)
			) {
				setIsVisibleLangType(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [langContainer]);

	useEffect(() => {
		if (getLocalStorage("lang")) {
			i18n.changeLanguage(getLocalStorage("lang"));
		}
	}, [getLocalStorage("lang")]);

	useEffect(() => {
		function checkPress(event) {
			if (event.keyCode === 32) {
				setIsSpacePress(true);
			}
		}

		function checkRelease(event) {
			if (event.keyCode === 32) {
				setIsSpacePress(false);
			}
		}

		document.addEventListener("keydown", checkPress);
		document.addEventListener("keyup", checkRelease);

		return () => {
			document.removeEventListener("keydown", checkPress);
			document.removeEventListener("keyup", checkRelease);
		};
	}, []);

	const setLanguage = lang => {
		setIsVisibleLangType(false);
		setPersistItem("lang", lang);
		setLocalStorage("lang", lang);
	};

	const addSecretClick = () => {
		if (isSpacePress) {
			setIsVisibleSecret(true);
		}
	};

	useEffect(() => {
		const updateMemberVersion = result => {
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
				console.error("Server error: No data");
				return;
			}

			setMemberVersion(result.data.member_version);
		};

		const updatePaymentVersion = result => {
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
				console.error("Server error: No data");
				return;
			}

			setPaymentVersion(result.data.payment_version);
		};

		const updateAllVersion = async () => {
			const resultMember = await getMemberVersionNumber();
			await updateMemberVersion(resultMember);

			const resultPayment = await getPaymentVersion();
			await updatePaymentVersion(resultPayment);
		};

		updateAllVersion();
	}, []);

	return (
		<FooterContainer background={theme.colors.background}>
			<FooterTextContainer>
				<FooterCompany onClick={() => addSecretClick()}>
					<KKText classList="small" margin="0 10px 0 0">
						{reduxState.copyright}
					</KKText>
				</FooterCompany>
				<FooterLinks>
					<Link href="/privacypolicy">
						<KKLink classList="small" margin="0 10px 0 0">
							{t("privacy_policy")}
						</KKLink>
					</Link>
					<Link href="/termsofuse">
						<KKLink classList="small" margin="0 10px">
							{t("terms_of_use")}
						</KKLink>
					</Link>
					<Link href="/cookiepolicy">
						<KKLink classList="small" margin="0 10px">
							{t("cookie_policy")}
						</KKLink>
					</Link>
				</FooterLinks>
			</FooterTextContainer>

			<SecretContent
				ref={secretContainer}
				isVisible={isVisibleSecret ? "block" : "none"}
			>
				<KKText classList="small block white" padding="10px">
					{"Member version: " + memberVersion}
				</KKText>

				<KKText classList="small block white" padding="10px">
					{"Payment version: " + paymentVersion}
				</KKText>
				<KKText classList="small block white" padding="10px">
					{"Web version: " + WEB_VERSION}
				</KKText>
			</SecretContent>

			<FooterLangContainer ref={langContainer}>
				<KKLink
					classList="strong"
					onClick={() => {
						setIsVisibleLangType(!isVisiblelangType);
					}}
				>
					{switchLangText(getLocalStorage("lang"))}
				</KKLink>

				<LangContent isVisible={isVisiblelangType ? "block" : "none"}>
					{reduxState?.list_lang &&
						reduxState?.list_lang.map((lang, i) => {
							return (
								<LangText
									onClick={() => {
										setLanguage(lang);
										i18n.changeLanguage(lang);
										gtag.event({
											action: "click",
											params: {
												button: "language",
												content: lang
											}
										});
									}}
									key={i}
								>
									{switchLangText(lang)}
								</LangText>
							);
						})}
				</LangContent>
			</FooterLangContainer>
		</FooterContainer>
	);
};

export default Footer;
