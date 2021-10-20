import React, { useEffect, useRef, useState } from "react";
import { useRouter, withRouter } from "next/router";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Link from "next/link";
import isNil from "lodash/isNil";
import { useTranslation } from "next-i18next";
import { useTheme } from "@emotion/react";

import { FullLayout } from "@/layout/fullLayout";
import { KKText } from "@/common/kkText";
import { KKLink } from "@/common/kklink";
import { Button } from "@/common/button";
import SubscriptionApi from "@/api/SubscriptionApi";
import PurchaseApi from "@/api/PurchaseApi";
import { Footer } from "@/layout/footer";
import getPublicRuntimeConfig from "@/lib/getPublicRuntimeConfig";
import { getLocalStorage } from "@/lib/localStorage";
import * as gtag from "@/lib/gtag";

import {
	ButtonList,
	EcpayContainer,
	EcpayContent,
	LoadingScreen,
	LoadingScreenContainer,
	Spinner,
	ColumnsContainer,
	LeftColumnContainer,
	RightColumnContainer,
	SubscriptionContainer,
	TvIcon,
	ColorSvg,
	InformationDesktop,
	InformationMobil
} from "../style/AccountSubscriptionPaiementPage.style";

const AccountSubscriptionPaiementPage = (props) => {
	const theme = useTheme();
	const { sendTransaction } = SubscriptionApi();
	const { getPurchasePlan } = PurchaseApi();
	const { t, i18n } = useTranslation("common");
	const reduxToken = useSelector(state => state.auth);
	const [isLoading, setIsLoading] = useState(false);
	const [isScriptLoaded, setIsScriptLoaded] = useState(false);
	const { ORG_ID, PROJECT_ID, ECPAY_SERVER_TYPE } = getPublicRuntimeConfig();

	let isInitialize = useRef(false);
	const router = useRouter();

	let scriptList = [
		{ src: "https://code.jquery.com/jquery-3.5.1.min.js", id: "lib-jquery" },
		{
			src: "https://cdn.jsdelivr.net/npm/node-forge@0.7.0/dist/forge.min.js",
			id: "lib-forge"
		},
		{
			src: "https://ecpg.ecpay.com.tw/Scripts/sdk-1.0.0.js?t=20210121100116",
			id: "lib-ecpay"
		}
	];
	const [buttonVisible, setButtonVisible] = useState(false);
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);

	/* Checking if the data last page was the subscription page */
	useEffect(() => {
		if (
			props.router.query &&
			Object.keys(props.router.query).length === 0 &&
			props.router.query.constructor === Object
		) {
			router.push({ pathname: "/account/subscription" });
		} else {
			loadScript(0);
		}
	}, []);

	useEffect( () => {
		getPurchasePlan(getLocalStorage("access_token"), router.query?.videoId)
	}, []);

	useEffect(async () => {
		if (!isNil(reduxToken) && isScriptLoaded) {
			isInitialize.current = true;
			openPaiement();
		}
	}, [reduxToken, isScriptLoaded]);

	useEffect(async () => {
		if (isInitialize.current) {
			window.location.reload(false);
		}
	}, [reduxToken.lang]);

	/* Load the ECpay scripts */
	function loadScript(i) {
		const script = document.createElement("script");
		script.src = scriptList[i].src;
		script.id = scriptList[i].id;
		document.body.appendChild(script);
		script.onload = () => {
			if (i < scriptList.length - 1) {
				loadScript(i + 1);
			} else {
				setIsScriptLoaded(true);
			}
		};
	}

	/* Open the ECpay modal */
	function openPaiement() {
		ECPay.initialize(ECPAY_SERVER_TYPE, 1, function (errMsg) {
			if (errMsg != null) {
				console.error(
					`ECPay initialize send back an error message, Error Time : ${new Date()},Error Message : ${errMsg}`
				);
				router.push({
					pathname: "/error",
					query: {
						code: `503`
					}
				});
				return;
			}

			try {
				let language = ECPay.Language.enUS;
				if (reduxToken.lang === "zh-TW") {
					language = ECPay.Language.zhTW;
				}

				ECPay.createPayment(
					props.router.query.merchantToken,
					language,
					function (errMsg) {
						if (errMsg != null) {
							console.error(
								`ECPay create payment send back an error message, Error Time : ${new Date()},Error Message : ${errMsg}`
							);
							router.push({
								pathname: "/error",
								query: {
									code: `503`
								}
							});
						}
					}
				);
			} catch (err) {
				console.error(
					`ECPay create payment callback return an error message, Error Time : ${new Date()},Error Message : ${errMsg}`
				);
				router.push({
					pathname: "/error",
					query: {
						code: `503`
					}
				});
			}
		});
		setButtonVisible(true);
	}

	/* When user validate paiement redirect to verification URL */
	function getVerificationUrl() {
		setIsLoading(true);
		try {
			ECPay.getPayToken(function (paymentInfo, errMsg) {
				const checkCardValid = (paymentInfo, errMsg) => {
					if (
						errMsg === "The parameter [CardNumber] Incorrect format" ||
						paymentInfo === null
					) {
						setIsLoading(false);
						return false;
					}

					if (errMsg != null) {
						console.error(
							`ECPay getPayToken send back an error message, Error Time : ${new Date()},Error Message : ${errMsg}`
						);

						router.push({
							pathname: "/error",
							query: {
								code: `503`
							}
						});

						return false;
					}

					setIsButtonDisabled(true);
					return true;
				};

				const checkResult = result => {
					if (isNil(result)) {
						return;
					}

					if (result.status === 201) {
						if (!router.query.videoId) {
							gtag.event({
								action: "subscription",
								params: {
									button: "confirm payment"
								}
							});
						}
						if (router.query.videoId) {
							gtag.event({
								action: "subscription",
								params: {
									video_id: router.query.videoId,
									video: router.query.video,
									button: "confirm payment"
								}
							});
						}

						window.location.href = result.data.threeDURL;
					}
				};

				const sendPaiementTransaction = async () => {
					const result = await sendTransaction(
						{
							orderId: props.router.query.orderId,
							payToken: paymentInfo.PayToken,
							orgId: ORG_ID,
							projectId: PROJECT_ID
						},
						getLocalStorage("access_token")
					);
					await checkResult(result);
				};

				if (checkCardValid(paymentInfo, errMsg)) {
					sendPaiementTransaction();
				}
			});
		} catch (err) {
			/* If paiement fail we hide the loading */
			setIsLoading(false);
		}
	}

	const renderFooterText = () => {
		if (i18n.language === "ja-JP") {
			return (
				<>
					<KKText classList="block theme-1 extra-small center">
						{t("agree")}&nbsp;
						<Link href="/termsofuse">
							<KKLink classList="extra-small theme-1">
								{t("terms_of_use")}
							</KKLink>
						</Link>
						{t("agree_text")} &nbsp;
						<Link href="/privacypolicy">
							<KKLink classList="extra-small theme-1">
								{t("privacy_policy")}
							</KKLink>
						</Link>
						&nbsp;{t("confirm")} &nbsp;
					</KKText>
				</>
			);
		}

		if (i18n.language === "zh-TW") {
			return (
				<>
					<KKText classList="theme-1 extra-small">
						{t("agree")} &nbsp;
						<Link href="/termsofuse">
							<KKLink classList="extra-small theme-1">
								{t("terms_of_use")}
							</KKLink>
						</Link>
						&nbsp; {t("confirm")} &nbsp;
						<Link href="/privacypolicy">
							<KKLink classList="extra-small theme-1">
								{t("privacy_policy")}
							</KKLink>
						</Link>
					</KKText>
				</>
			);
		}

		return (
			<KKText classList="block theme-1 extra-small center">
				{t("agree")}&nbsp;
				<Link href="/termsofuse">
					<KKLink classList="extra-small theme-1">{t("terms_of_use")}</KKLink>
				</Link>
				&nbsp;{t("confirm")}&nbsp;
				<Link href="/privacypolicy">
					<KKLink classList="extra-small theme-1">{t("privacy_policy")}</KKLink>
				</Link>
			</KKText>
		);
	};

	return (
		<>
			<LoadingScreen visible={isLoading}>
				<LoadingScreenContainer>
					<Spinner src="/images/Icons/spinner.svg" />

					<KKText
						classList="block center strong"
						color="#ffffff"
						padding="20px 0 20px 0"
					>
						{t("payment_process")}
					</KKText>

					<KKText classList="block center small" color="#ffffff">
						{t("payment_loading")}
					</KKText>
				</LoadingScreenContainer>
			</LoadingScreen>

			<FullLayout>
				<ColumnsContainer>
					<LeftColumnContainer>
						<SubscriptionContainer>
							<KKText
								classList="block center title-4"
								color="#343434"
								padding="0 0 10px 0"
							>
								{t("account_Subscription")}
							</KKText>

							<KKText classList="block center big-4" color="#343434">
								{i18n.language === "ja-JP" && (
									<>
										{t("payment_detail", {
											amount: router.query.amount.replace("$", "")
										})}
									</>
								)}
								{i18n.language !== "ja-JP" && (
									<>{t("payment_detail", { amount: router.query.amount })}</>
								)}
							</KKText>
						</SubscriptionContainer>
						<KKText
							classList="block center title-4"
							color="#343434"
							padding="30px 0 10px 0"
						>
							{t("payment")}
						</KKText>

						<EcpayContainer>
							<EcpayContent id="ECPayPayment"></EcpayContent>
						</EcpayContainer>

						<ButtonList className={buttonVisible ? "" : "hidden"}>
							<Button
								text={t("payment_confirm")}
								onClick={getVerificationUrl}
								disabled={isButtonDisabled}
								width="100%"
							/>
						</ButtonList>
					</LeftColumnContainer>

					<RightColumnContainer>
						<TvIcon background={theme.colors.background}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="64"
								height="64"
								viewBox="0 0 64 64"
							>
								<g fill="none" fillRule="evenodd">
									<ColorSvg fill={theme.colors.theme}>
										<g>
											<g>
												<g>
													<path
														d="M44 53.333c1.105 0 2 .896 2 2v1.334c0 1.104-.895 2-2 2H19.333c-1.104 0-2-.896-2-2v-1.334c0-1.104.896-2 2-2H44zM38.21 5.886c1.04-1.042 2.729-1.042 3.77 0 1.042 1.041 1.042 2.73 0 3.77l-3.676 3.677h12.363c4.418 0 8 3.582 8 8v21.334c0 4.418-3.582 8-8 8H13.333c-4.418 0-8-3.582-8-8V21.333c0-4.418 3.582-8 8-8h12.228l-3.675-3.676c-1.042-1.042-1.042-2.73 0-3.771 1.041-1.042 2.73-1.042 3.77 0l5.658 5.656c.284.285.491.618.62.973.127-.355.334-.688.618-.973zm12.457 12.78H13.333c-1.472 0-2.666 1.195-2.666 2.667v21.334c0 1.472 1.194 2.666 2.666 2.666h37.334c1.472 0 2.666-1.194 2.666-2.666V21.333c0-1.472-1.194-2.666-2.666-2.666z"
														transform="translate(-1048.000000, -338.000000) translate(817.000000, 310.000000) translate(203.000000, 0.000000) translate(28.000000, 28.000000)"
													/>
												</g>
											</g>
										</g>
									</ColorSvg>
								</g>
							</svg>
						</TvIcon>

						<KKText classList="block center title-2" padding="20px 0 20px 0">
							{t("payment_content")}
						</KKText>

						<InformationDesktop>
							<KKText classList="block theme-1 extra-small center">
								{t("agree")}&nbsp;
								<Link href="/termsofuse">
									<KKLink classList="extra-small theme-1">
										{t("terms_of_use")}
									</KKLink>
								</Link>
								&nbsp;{t("confirm")}&nbsp;
								<Link href="/privacypolicy">
									<KKLink classList="extra-small theme-1">
										{t("privacy_policy")}
									</KKLink>
								</Link>
							</KKText>
						</InformationDesktop>
					</RightColumnContainer>
				</ColumnsContainer>

				<InformationMobil>{renderFooterText()}</InformationMobil>
			</FullLayout>
			<Footer />
		</>
	);
};

AccountSubscriptionPaiementPage.propTypes = {
	router: PropTypes.object
};

export default withRouter(AccountSubscriptionPaiementPage);
